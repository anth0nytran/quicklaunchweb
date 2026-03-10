import { google, sheets_v4 } from 'googleapis';

// =============================================================================
// Lightweight Google Sheets append utility
// =============================================================================

const SHEET_ID =
  process.env.GOOGLE_SHEET_ID ||
  process.env.GOOGLE_SHEET_SPREADSHEET_ID ||
  '1Gjrr-vCjz2IS4Me5ECGUfhdGfgrC4A59y-3K2bidHZA';

const BRAND_COLOR = { red: 0.06, green: 0.45, blue: 0.42 };

function getSheetsClient(): sheets_v4.Sheets | null {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyRaw =
    process.env.GOOGLE_PRIVATE_KEY ||
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const privateKey = privateKeyRaw?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) return null;

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

async function findOrCreateTab(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  tabName: string
): Promise<{ title: string; id: number }> {
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: 'sheets.properties(sheetId,title)',
  });

  const existing = spreadsheet.data.sheets?.find(
    (s) => s.properties?.title === tabName
  );

  if (existing?.properties?.sheetId != null) {
    return { title: tabName, id: existing.properties.sheetId };
  }

  // Create the tab
  const result = await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [{ addSheet: { properties: { title: tabName } } }],
    },
  });

  const newSheet = result.data.replies?.[0]?.addSheet?.properties;
  if (newSheet?.sheetId == null) {
    throw new Error(`Failed to create tab "${tabName}".`);
  }

  return { title: tabName, id: newSheet.sheetId };
}

async function ensureHeaders(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  tab: { title: string; id: number },
  headers: string[]
) {
  const endCol = String.fromCharCode(64 + headers.length);
  const range = `'${tab.title}'!A1:${endCol}1`;

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const row = existing.data.values?.[0] || [];
  const matches = headers.every((h, i) => (row[i] || '').toString().trim() === h);
  if (matches) return;

  // Only write if row is empty
  const hasContent = row.some((v: unknown) => typeof v === 'string' && v.trim());
  if (hasContent) return;

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    requestBody: { values: [headers] },
  });

  // Style the header row
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          updateSheetProperties: {
            properties: {
              sheetId: tab.id,
              gridProperties: { frozenRowCount: 1 },
            },
            fields: 'gridProperties.frozenRowCount',
          },
        },
        {
          repeatCell: {
            range: {
              sheetId: tab.id,
              startRowIndex: 0,
              endRowIndex: 1,
              startColumnIndex: 0,
              endColumnIndex: headers.length,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: BRAND_COLOR,
                textFormat: {
                  bold: true,
                  fontSize: 10,
                  foregroundColor: { red: 1, green: 1, blue: 1 },
                },
                horizontalAlignment: 'CENTER',
                verticalAlignment: 'MIDDLE',
              },
            },
            fields:
              'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)',
          },
        },
        {
          autoResizeDimensions: {
            dimensions: {
              sheetId: tab.id,
              dimension: 'COLUMNS',
              startIndex: 0,
              endIndex: headers.length,
            },
          },
        },
      ],
    },
  });
}

export type AppendResult = {
  synced: boolean;
  tabTitle?: string;
};

/**
 * Append a row to a named tab in the shared Google Sheet.
 * Auto-creates the tab and writes branded headers on first use.
 */
export async function appendToGoogleSheet(
  tabName: string,
  headers: string[],
  row: string[]
): Promise<AppendResult> {
  const sheets = getSheetsClient();
  if (!sheets) {
    console.warn(`[Google Sheets] Skipping — missing credentials`);
    return { synced: false };
  }

  const tab = await findOrCreateTab(sheets, SHEET_ID, tabName);

  try {
    await ensureHeaders(sheets, SHEET_ID, tab, headers);
  } catch (err) {
    console.warn(`[Google Sheets] Header setup skipped for "${tabName}":`, err);
  }

  const endCol = String.fromCharCode(64 + headers.length);
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `'${tab.title}'!A:${endCol}`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  });

  return { synced: true, tabTitle: tab.title };
}
