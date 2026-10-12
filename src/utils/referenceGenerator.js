/**
 * Generates a memorable, unique reference code for donation & sales submissions.
 * Example: RRR-BTR-2026-4821
 */
export function generateReferenceNumber() {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `RRR-BTR-${year}-${randomSuffix}`;
}
