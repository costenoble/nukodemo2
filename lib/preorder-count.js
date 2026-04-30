// Update PREORDER_COUNT env var to reflect the real number of reservations.
export function getPreorderCount() {
  const count = parseInt(process.env.PREORDER_COUNT ?? "84", 10);
  return isNaN(count) ? 84 : count;
}

export const PREORDER_TOTAL = 100;
