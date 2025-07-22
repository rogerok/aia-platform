export function isNumber(value: unknown): value is number {
  const converted = Number(value);

  return typeof converted === 'number' && isFinite(converted);
}
