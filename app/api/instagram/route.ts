import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { google, sheets_v4 } from 'googleapis';

export const runtime = 'nodejs';

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return char;
    }
  });

const normalize = (value: unknown) =>
  typeof value === 'string' ? value.replace(/\r\n/g, '\n').trim() : '';

const SHEET_ID =
  process.env.GOOGLE_SHEET_ID ||
  process.env.GOOGLE_SHEET_SPREADSHEET_ID ||
  '1Gjrr-vCjz2IS4Me5ECGUfhdGfgrC4A59y-3K2bidHZA';
const SHEET_RANGE_INPUT = process.env.GOOGLE_SHEET_RANGE || 'Sheet1!A:L';

const LEAD_HEADERS = [
  'Timestamp',
  'Name',
  'Business',
  'Business Type',
  'Phone',
  'Email',
  'Source',
  'UTM Source',
  'UTM Medium',
  'UTM Campaign',
  'UTM Content',
  'UTM Term',
  'Contacted?',
  'Follow Up?',
  'Response?',
  'Demo Booked?',
  'Next Steps?',
  'Closed?',
] as const;

const CHECKBOX_COLUMNS = [12, 13, 15, 17] as const;

const getSheetName = (rangeOrSheet: string) => {
  const raw = rangeOrSheet.includes('!') ? rangeOrSheet.split('!')[0] : rangeOrSheet;
  return raw.replace(/^'/, '').replace(/'$/, '').trim() || 'Sheet1';
};

const toSheetColumn = (oneBasedIndex: number) => {
  let index = oneBasedIndex;
  let out = '';
  while (index > 0) {
    const rem = (index - 1) % 26;
    out = String.fromCharCode(65 + rem) + out;
    index = Math.floor((index - 1) / 26);
  }
  return out;
};

const PREFERRED_SHEET_NAME = getSheetName(SHEET_RANGE_INPUT);
const END_COLUMN = toSheetColumn(LEAD_HEADERS.length);
type SheetTarget = { title: string; id: number };
type SheetAppendResult = {
  synced: boolean;
  tabTitle?: string;
  rangeA1?: string;
};

const RETRIABLE_STATUS_CODES = new Set([429, 500, 502, 503, 504]);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const quoteSheetTitle = (title: string) => `'${title.replace(/'/g, "''")}'`;

const a1Range = (sheetTitle: string, cells: string) =>
  `${quoteSheetTitle(sheetTitle)}!${cells}`;

const getGoogleErrorStatus = (error: unknown): number | undefined => {
  const maybeError = error as {
    code?: number | string;
    response?: { status?: number };
  };

  if (typeof maybeError.code === 'number') return maybeError.code;
  if (typeof maybeError.response?.status === 'number') return maybeError.response.status;
  return undefined;
};

const getGoogleErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
};

const isRetriableGoogleError = (error: unknown) => {
  const status = getGoogleErrorStatus(error);
  if (status && RETRIABLE_STATUS_CODES.has(status)) return true;

  const message = getGoogleErrorMessage(error).toLowerCase();
  return (
    message.includes('rate limit') ||
    message.includes('temporarily unavailable') ||
    message.includes('timeout') ||
    message.includes('econnreset')
  );
};

const isRangeResolutionError = (error: unknown) => {
  const status = getGoogleErrorStatus(error);
  if (status === 400 || status === 404) return true;

  const message = getGoogleErrorMessage(error).toLowerCase();
  return (
    message.includes('unable to parse range') ||
    message.includes('requested entity was not found') ||
    message.includes('sheet') && message.includes('not found')
  );
};

const isHeaderMatch = (header: string[]) =>
  LEAD_HEADERS.every((expected, index) => (header[index] || '').trim() === expected);

const getHeaderMatchScore = (header: string[]) => {
  let score = 0;
  for (let i = 0; i < LEAD_HEADERS.length; i++) {
    if ((header[i] || '').trim() === LEAD_HEADERS[i]) {
      score++;
    }
  }
  return score;
};

async function findBestHeaderTab(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetProps: NonNullable<sheets_v4.Schema$SheetProperties>[]
) {
  if (sheetProps.length === 0) return undefined;

  const ranges = sheetProps.map((props) =>
    a1Range(props.title?.trim() || 'Sheet1', `A1:${END_COLUMN}1`)
  );

  const headerBatch = await withRetries(() =>
    sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges,
    })
  );

  const valueRanges = headerBatch.data.valueRanges || [];
  let best: { props: NonNullable<sheets_v4.Schema$SheetProperties>; score: number } | undefined;

  for (let i = 0; i < sheetProps.length; i++) {
    const props = sheetProps[i];
    const header = (valueRanges[i]?.values?.[0] || []).map((value: unknown) =>
      typeof value === 'string' ? value : ''
    );

    if (isHeaderMatch(header)) {
      return props;
    }

    const score = getHeaderMatchScore(header);
    if (score > 0 && (!best || score > best.score)) {
      best = { props, score };
    }
  }

  return best?.score && best.score >= 4 ? best.props : undefined;
}

async function withRetries<T>(task: () => Promise<T>, maxAttempts = 3): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      if (attempt >= maxAttempts || !isRetriableGoogleError(error)) {
        throw error;
      }
      await sleep(250 * attempt);
    }
  }
  throw lastError instanceof Error ? lastError : new Error('Retry operation failed.');
}

async function resolveSheetTarget(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string
): Promise<SheetTarget> {
  const spreadsheet = await withRetries(() =>
    sheets.spreadsheets.get({
      spreadsheetId,
      fields: 'sheets.properties(sheetId,title)',
    })
  );

  const sheetProps = spreadsheet.data.sheets
    ?.map((sheet) => sheet.properties)
    .filter((props): props is NonNullable<typeof props> => !!props);

  if (!sheetProps || sheetProps.length === 0) {
    throw new Error('No tabs found in the target spreadsheet.');
  }

  const preferred = sheetProps.find((props) => props.title === PREFERRED_SHEET_NAME);
  if (preferred) {
    const title = preferred.title?.trim() || 'Sheet1';
    const id = preferred.sheetId;
    if (id == null) {
      throw new Error(`Sheet "${title}" has no sheetId.`);
    }
    return { title, id };
  }

  let selected = await findBestHeaderTab(sheets, spreadsheetId, sheetProps);
  if (!selected) {
    selected = sheetProps[0];
    const fallbackTitle = selected.title?.trim() || 'Sheet1';
    console.warn(
      `[IG Lead API] Sheet tab "${PREFERRED_SHEET_NAME}" not found and no header match detected. Falling back to first tab "${fallbackTitle}".`
    );
  } else {
    const matchedTitle = selected.title?.trim() || 'Sheet1';
    console.warn(
      `[IG Lead API] Sheet tab "${PREFERRED_SHEET_NAME}" not found. Using header-matched tab "${matchedTitle}".`
    );
  }

  const title = selected.title?.trim() || 'Sheet1';
  const id = selected.sheetId;
  if (id == null) {
    throw new Error(`Sheet "${title}" has no sheetId.`);
  }

  return { title, id };
}

async function ensureSheetSetup(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  target: SheetTarget
) {
  const headerRange = a1Range(target.title, `A1:${END_COLUMN}1`);
  const headerResponse = await withRetries(() =>
    sheets.spreadsheets.values.get({
      spreadsheetId,
      range: headerRange,
    })
  );

  const existingHeader = (headerResponse.data.values?.[0] || []).map((value: unknown) =>
    typeof value === 'string' ? value.trim() : ''
  );
  const headerMatches = LEAD_HEADERS.every(
    (header, index) => existingHeader[index] === header
  );
  const headerHasAnyValue = existingHeader.some((value) => value.length > 0);

  if (headerMatches) {
    return;
  }

  if (headerHasAnyValue) {
    console.warn(
      `[IG Lead API] Existing header differs in "${target.title}". Skipping auto-header overwrite.`
    );
    return;
  }

  await withRetries(() =>
    sheets.spreadsheets.values.update({
      spreadsheetId,
      range: headerRange,
      valueInputOption: 'RAW',
      requestBody: { values: [Array.from(LEAD_HEADERS)] },
    })
  );

  const requests: sheets_v4.Schema$Request[] = [
    {
      updateSheetProperties: {
        properties: {
          sheetId: target.id,
          gridProperties: {
            frozenRowCount: 1,
          },
        },
        fields: 'gridProperties.frozenRowCount',
      },
    },
    {
      repeatCell: {
        range: {
          sheetId: target.id,
          startRowIndex: 0,
          endRowIndex: 1,
          startColumnIndex: 0,
          endColumnIndex: LEAD_HEADERS.length,
        },
        cell: {
          userEnteredFormat: {
            backgroundColor: { red: 0.06, green: 0.45, blue: 0.42 },
            textFormat: {
              bold: true,
              fontSize: 10,
              foregroundColor: { red: 1, green: 1, blue: 1 },
            },
            horizontalAlignment: 'CENTER',
            verticalAlignment: 'MIDDLE',
            wrapStrategy: 'WRAP',
          },
        },
        fields:
          'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment,wrapStrategy)',
      },
    },
    {
      repeatCell: {
        range: {
          sheetId: target.id,
          startRowIndex: 1,
          startColumnIndex: 0,
          endColumnIndex: LEAD_HEADERS.length,
        },
        cell: {
          userEnteredFormat: {
            verticalAlignment: 'MIDDLE',
            wrapStrategy: 'WRAP',
          },
        },
        fields: 'userEnteredFormat(verticalAlignment,wrapStrategy)',
      },
    },
    {
      autoResizeDimensions: {
        dimensions: {
          sheetId: target.id,
          dimension: 'COLUMNS',
          startIndex: 0,
          endIndex: LEAD_HEADERS.length,
        },
      },
    },
  ];

  for (const columnIndex of CHECKBOX_COLUMNS) {
    requests.push({
      setDataValidation: {
        range: {
          sheetId: target.id,
          startRowIndex: 1,
          startColumnIndex: columnIndex,
          endColumnIndex: columnIndex + 1,
        },
        rule: {
          condition: { type: 'BOOLEAN' },
          strict: true,
          showCustomUi: true,
        },
      },
    });
  }

  try {
    await withRetries(() =>
      sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: { requests },
      })
    );
  } catch (error) {
    console.warn(
      `[IG Lead API] Header formatting skipped for "${target.title}": ${getGoogleErrorMessage(error)}`
    );
  }
}

async function appendLeadRow(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  target: SheetTarget,
  row: string[]
) {
  const writeRange = a1Range(target.title, `A2:${END_COLUMN}2`);

  // Keep newest leads immediately visible under the header.
  await withRetries(() =>
    sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            insertDimension: {
              range: {
                sheetId: target.id,
                dimension: 'ROWS',
                startIndex: 1,
                endIndex: 2,
              },
              inheritFromBefore: false,
            },
          },
        ],
      },
    })
  );

  await withRetries(() =>
    sheets.spreadsheets.values.update({
      spreadsheetId,
      range: writeRange,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [row] },
    })
  );

  return writeRange;
}

async function appendToSheet(row: string[]): Promise<SheetAppendResult> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyRaw =
    process.env.GOOGLE_PRIVATE_KEY ||
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const privateKey = privateKeyRaw?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    console.warn('[IG Lead API] Skipping Google Sheet — missing credentials');
    return { synced: false };
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  let target = await resolveSheetTarget(sheets, SHEET_ID);

  try {
    await ensureSheetSetup(sheets, SHEET_ID, target);
  } catch (error) {
    console.warn(
      `[IG Lead API] Sheet setup skipped for "${target.title}": ${getGoogleErrorMessage(error)}`
    );
  }

  try {
    const rangeA1 = await appendLeadRow(sheets, SHEET_ID, target, row);
    return { synced: true, tabTitle: target.title, rangeA1 };
  } catch (error) {
    if (!isRangeResolutionError(error)) {
      throw error;
    }

    console.warn(
      `[IG Lead API] Append failed for "${target.title}". Retrying with refreshed tab target. Reason: ${getGoogleErrorMessage(error)}`
    );

    target = await resolveSheetTarget(sheets, SHEET_ID);

    try {
      await ensureSheetSetup(sheets, SHEET_ID, target);
    } catch (setupError) {
      console.warn(
        `[IG Lead API] Retry setup skipped for "${target.title}": ${getGoogleErrorMessage(setupError)}`
      );
    }

    const rangeA1 = await appendLeadRow(sheets, SHEET_ID, target, row);
    return { synced: true, tabTitle: target.title, rangeA1 };
  }
}

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
    if (!data || typeof data !== 'object') throw new Error();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  // ── Honeypot ──
  const honeypotFields = ['website', 'company_url', 'fax', 'address2'];
  for (const field of honeypotFields) {
    if (normalize(data[field])) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }
  }

  // ── Time-based validation ──
  const formTimestamp = normalize(data._ts);
  if (formTimestamp) {
    const submissionTime = parseInt(formTimestamp, 10);
    const timeDiff = Date.now() - submissionTime;
    if (!isNaN(submissionTime) && timeDiff < 3000) {
      console.warn(`[IG Lead API] Fast submit detected (${timeDiff}ms). Continuing instead of dropping.`);
    }
  }

  // ── Extract fields ──
  const name = normalize(data.name);
  const phone = normalize(data.phone);
  const email = normalize(data.email);
  const business = normalize(data.business_name);
  const businessType = normalize(data.business_type) || 'Not specified';
  const source = normalize(data.source) || 'instagram_landing';

  // UTM params
  const utmSource = normalize(data.utm_source);
  const utmMedium = normalize(data.utm_medium);
  const utmCampaign = normalize(data.utm_campaign);
  const utmContent = normalize(data.utm_content);
  const utmTerm = normalize(data.utm_term);

  // ── Validation ──
  if (!name || !phone || !email || !business) {
    return NextResponse.json(
      { ok: false, error: 'Name, business, phone, and email are required.' },
      { status: 400 }
    );
  }

  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    return NextResponse.json(
      { ok: false, error: 'Invalid phone number.' },
      { status: 400 }
    );
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { ok: false, error: 'Invalid email address.' },
      { status: 400 }
    );
  }

  // ── Spam content filtering ──
  const combinedText = `${name} ${email} ${business}`.toLowerCase();
  const spamKeywords = [
    'crypto', 'bitcoin', 'casino', 'poker', 'gambling',
    'viagra', 'cialis', 'pharmacy',
    'seo services', 'backlinks', 'web traffic',
    'click here now', 'act now', 'make money fast',
  ];
  if (spamKeywords.some(kw => combinedText.includes(kw))) {
    console.warn('[IG Lead API] Keyword spam flag triggered. Continuing submission for review.');
  }

  // ── Build email ──
  const timestamp = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  }).format(new Date());

  const phoneLink = (() => {
    if (phone.trim().startsWith('+')) return phone.replace(/[^\d+]/g, '');
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) return `+1${digits}`;
    if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
    return digits;
  })();

  const hasUtm = utmSource || utmMedium || utmCampaign || utmContent || utmTerm;

  const brandPrimary = '#0f766e';
  const brandAccent = '#14b8a6';

  const subject = `[IG Lead] ${escapeHtml(business)} — ${escapeHtml(businessType)}`;

  const html = `
  <div style="background-color:#0a0a0c;margin:0;padding:24px 12px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f1f5f9;">
    <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">
      New Instagram lead from ${escapeHtml(name)} at ${escapeHtml(business)}. Respond fast.
    </span>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:580px;margin:0 auto;background:#111113;border:1px solid #222;border-radius:16px;overflow:hidden;">
      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg, ${brandPrimary}, #0d9488);padding:18px 20px;border-bottom:3px solid ${brandAccent};">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="font-size:16px;font-weight:800;color:#ffffff;letter-spacing:0.5px;">
                Quick<span style="color:#5eead4;">Launch</span>Web
              </td>
              <td align="right">
                <span style="display:inline-block;background:#f59e0b;color:#000;font-weight:800;font-size:10px;padding:6px 10px;border-radius:999px;letter-spacing:1.2px;">INSTAGRAM LEAD</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Lead summary -->
      <tr>
        <td style="padding:24px 20px 14px;">
          <div style="font-size:24px;font-weight:800;line-height:1.2;margin:0 0 4px;color:#ffffff;">${escapeHtml(name)}</div>
          <div style="font-size:15px;color:${brandAccent};font-weight:700;margin:0 0 2px;">${escapeHtml(business)}</div>
          <div style="font-size:13px;color:#94a3b8;">${escapeHtml(businessType)} &nbsp;·&nbsp; ${escapeHtml(timestamp)}</div>
        </td>
      </tr>

      <!-- Action buttons -->
      <tr>
        <td style="padding:4px 20px 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding:0 4px 8px 0;width:50%;">
                <a href="tel:${escapeHtml(phoneLink)}" style="display:block;background:${brandAccent};color:#000;text-decoration:none;font-weight:800;font-size:14px;text-align:center;padding:14px 12px;border-radius:10px;">
                  Call ${escapeHtml(name.split(' ')[0])}
                </a>
              </td>
              <td style="padding:0 0 8px 4px;width:50%;">
                <a href="mailto:${escapeHtml(email)}" style="display:block;background:#1e293b;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;text-align:center;padding:14px 12px;border-radius:10px;border:1px solid #334155;">
                  Email Lead
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Lead details table -->
      <tr>
        <td style="padding:0 20px 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #1e293b;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:#0f172a;padding:12px 16px;font-weight:800;font-size:12px;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid #1e293b;color:${brandAccent};">Lead Details</td>
            </tr>
            <tr>
              <td style="padding:0 16px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;">
                  <tr>
                    <td style="padding:12px 0;color:#64748b;width:110px;border-bottom:1px solid #1a1a1f;">Name</td>
                    <td style="padding:12px 0;color:#ffffff;font-weight:700;border-bottom:1px solid #1a1a1f;">${escapeHtml(name)}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;color:#64748b;border-bottom:1px solid #1a1a1f;">Business</td>
                    <td style="padding:12px 0;color:#ffffff;font-weight:700;border-bottom:1px solid #1a1a1f;">${escapeHtml(business)}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;color:#64748b;border-bottom:1px solid #1a1a1f;">Type</td>
                    <td style="padding:12px 0;color:#ffffff;font-weight:600;border-bottom:1px solid #1a1a1f;">${escapeHtml(businessType)}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;color:#64748b;border-bottom:1px solid #1a1a1f;">Phone</td>
                    <td style="padding:12px 0;border-bottom:1px solid #1a1a1f;">
                      <a href="tel:${escapeHtml(phoneLink)}" style="color:${brandAccent};text-decoration:none;font-weight:700;">${escapeHtml(phone)}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;color:#64748b;border-bottom:1px solid #1a1a1f;">Email</td>
                    <td style="padding:12px 0;border-bottom:1px solid #1a1a1f;">
                      <a href="mailto:${escapeHtml(email)}" style="color:${brandAccent};text-decoration:none;font-weight:700;">${escapeHtml(email)}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;color:#64748b;">Source</td>
                    <td style="padding:12px 0;color:#f59e0b;font-weight:700;">${escapeHtml(source)}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      ${hasUtm ? `
      <!-- UTM tracking -->
      <tr>
        <td style="padding:0 20px 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #1e293b;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:#0f172a;padding:12px 16px;font-weight:800;font-size:12px;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid #1e293b;color:#64748b;">Campaign Tracking</td>
            </tr>
            <tr>
              <td style="padding:0 16px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:13px;">
                  ${utmSource ? `<tr><td style="padding:10px 0;color:#64748b;width:110px;border-bottom:1px solid #1a1a1f;">Source</td><td style="padding:10px 0;color:#cbd5e1;border-bottom:1px solid #1a1a1f;">${escapeHtml(utmSource)}</td></tr>` : ''}
                  ${utmMedium ? `<tr><td style="padding:10px 0;color:#64748b;border-bottom:1px solid #1a1a1f;">Medium</td><td style="padding:10px 0;color:#cbd5e1;border-bottom:1px solid #1a1a1f;">${escapeHtml(utmMedium)}</td></tr>` : ''}
                  ${utmCampaign ? `<tr><td style="padding:10px 0;color:#64748b;border-bottom:1px solid #1a1a1f;">Campaign</td><td style="padding:10px 0;color:#cbd5e1;border-bottom:1px solid #1a1a1f;">${escapeHtml(utmCampaign)}</td></tr>` : ''}
                  ${utmContent ? `<tr><td style="padding:10px 0;color:#64748b;border-bottom:1px solid #1a1a1f;">Content</td><td style="padding:10px 0;color:#cbd5e1;border-bottom:1px solid #1a1a1f;">${escapeHtml(utmContent)}</td></tr>` : ''}
                  ${utmTerm ? `<tr><td style="padding:10px 0;color:#64748b;">Term</td><td style="padding:10px 0;color:#cbd5e1;">${escapeHtml(utmTerm)}</td></tr>` : ''}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      ` : ''}

      <!-- Footer -->
      <tr>
        <td style="padding:0 20px 22px;">
          <div style="border-left:3px solid ${brandAccent};padding:12px;background:#0c0c0f;border-radius:8px;font-size:12px;color:#64748b;line-height:1.5;">
            This lead came from the <strong style="color:#94a3b8;">QuickLaunchWeb Instagram landing page</strong>.
            <span style="display:block;margin-top:4px;color:#475569;">Respond within 5 minutes for best conversion.</span>
          </div>
        </td>
      </tr>
    </table>
  </div>
  `;

  const text = [
    `NEW INSTAGRAM LEAD — ${timestamp}`,
    '',
    `Name: ${name}`,
    `Business: ${business}`,
    `Type: ${businessType}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Source: ${source}`,
    hasUtm ? `\nUTM: ${[utmSource, utmMedium, utmCampaign, utmContent, utmTerm].filter(Boolean).join(' / ')}` : '',
  ].filter(Boolean).join('\n');

  // ── Send via Resend ──
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL;

  if (!resendApiKey || !toEmail) {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { ok: false, error: 'Server misconfigured.' },
        { status: 500 }
      );
    }
    // Dev dry run
    console.log('[IG Lead API] Dry run — missing RESEND_API_KEY or LEAD_TO_EMAIL');
    console.log(text);
    return NextResponse.json({ ok: true, mode: 'dry-run' }, { status: 200 });
  }

  const fromEmail = process.env.LEAD_FROM_EMAIL || 'QuickLaunchWeb <leads@quicklaunchweb.us>';

  try {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject,
      html,
      text,
      replyTo: email,
    });

    if (error) {
      console.error('[IG Lead API] Resend error:', error);
      return NextResponse.json({ ok: false, error: 'Failed to send. Try again.' }, { status: 500 });
    }

    // ── Append to Google Sheet (fire-and-forget) ──
    const sheetRow = [
      timestamp, name, business, businessType, phone, email, source,
      utmSource, utmMedium, utmCampaign, utmContent, utmTerm,
      '', '', '', '', '', '',
    ];
    let sheetSynced = false;
    let sheetTab: string | undefined;
    let sheetRange: string | undefined;
    try {
      const appendResult = await appendToSheet(sheetRow);
      sheetSynced = appendResult.synced;
      sheetTab = appendResult.tabTitle;
      sheetRange = appendResult.rangeA1;
      if (!sheetSynced) {
        console.warn('[IG Lead API] Email sent, but Google Sheet sync was skipped.');
      }
    } catch (err) {
      console.error('[IG Lead API] Google Sheet error:', err);
    }

    return NextResponse.json(
      { ok: true, sheetSynced, sheetTab: sheetTab || null, sheetRange: sheetRange || null },
      { status: 200 }
    );
  } catch (err) {
    console.error('[IG Lead API] Error:', err);
    return NextResponse.json({ ok: false, error: 'Failed to send. Try again.' }, { status: 500 });
  }
}
