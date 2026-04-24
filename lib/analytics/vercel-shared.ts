type VercelValue = string | number | boolean | null | undefined;
export type VercelEventProperties = Record<string, VercelValue>;

function toVercelValue(value: unknown): VercelValue {
  if (value == null) return null;
  if (typeof value === "string") return value.slice(0, 255);
  if (typeof value === "number" || typeof value === "boolean") return value;
  if (Array.isArray(value)) return value.join(",").slice(0, 255);

  return String(value).slice(0, 255);
}

export function sanitizeVercelProperties(
  properties?: Record<string, unknown>
): VercelEventProperties {
  const sanitized: VercelEventProperties = {};

  for (const [key, value] of Object.entries(properties || {})) {
    sanitized[key.slice(0, 255)] = toVercelValue(value);
  }

  return sanitized;
}
