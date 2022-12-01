export function normalizeArrayIndex(array, index) {
  const { length } = array;
  const correction = Math.ceil(Math.abs(index) / length) * length;
  return (index + correction) % length;
}
