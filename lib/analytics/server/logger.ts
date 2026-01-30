// Server-side analytics event logger

/**
 * Server-side event data structure
 */
export interface ServerEvent {
  event_name: string;
  event_data?: Record<string, unknown>;
  timestamp?: string;
  user_agent?: string;
  ip_address?: string;
}

/**
 * Log an analytics event on the server
 * Currently logs to console, can be extended to use GA4 Measurement Protocol
 *
 * @param eventName - Name of the event
 * @param eventData - Event parameters
 * @param context - Optional request context (headers, IP, etc.)
 *
 * @example
 * logServerEvent('checkout_session_created', {
 *   plan: 'Starter',
 *   total_value: 497,
 * });
 */
export function logServerEvent(
  eventName: string,
  eventData?: Record<string, unknown>,
  context?: {
    userAgent?: string;
    ipAddress?: string;
  }
): void {
  const serverEvent: ServerEvent = {
    event_name: eventName,
    event_data: eventData,
    timestamp: new Date().toISOString(),
    user_agent: context?.userAgent,
    ip_address: context?.ipAddress,
  };

  // Log to console in development/staging
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Server Analytics]', JSON.stringify(serverEvent, null, 2));
  } else {
    // In production, log with minimal formatting
    console.log('[Server Analytics]', JSON.stringify(serverEvent));
  }

  // Future enhancement: Send to GA4 Measurement Protocol
  // This would require implementing the GA4 Measurement Protocol API
  // https://developers.google.com/analytics/devguides/collection/protocol/ga4
}

/**
 * Log a checkout event on the server
 *
 * @param sessionId - Stripe session ID
 * @param plan - Selected plan
 * @param totalValue - Total checkout value
 * @param addons - Selected add-ons
 */
export function logCheckoutEvent(
  sessionId: string,
  plan: string,
  totalValue: number,
  addons?: string[]
): void {
  logServerEvent('checkout_session_created', {
    session_id: sessionId,
    plan,
    total_value: totalValue,
    addons,
    currency: 'USD',
  });
}

/**
 * Log an error event on the server
 *
 * @param errorType - Type of error
 * @param errorMessage - Error message
 * @param errorContext - Additional context
 */
export function logErrorEvent(
  errorType: string,
  errorMessage: string,
  errorContext?: Record<string, unknown>
): void {
  logServerEvent('server_error', {
    error_type: errorType,
    error_message: errorMessage,
    ...errorContext,
  });
}

/**
 * Log a form submission event on the server
 *
 * @param formName - Name of the form
 * @param success - Whether submission was successful
 * @param errorMessage - Error message if failed
 */
export function logFormSubmission(
  formName: string,
  success: boolean,
  errorMessage?: string
): void {
  logServerEvent('form_submission_server', {
    form_name: formName,
    success,
    error_message: errorMessage,
  });
}
