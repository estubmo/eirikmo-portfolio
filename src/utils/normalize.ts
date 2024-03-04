export function normalize(val: number, min: number, max: number) {
  if (min < 0) {
    max += 0 - min;
    val += 0 - min;
    min = 0;
  }
  val = val - min;
  max = max - min;
  return Math.max(0, Math.min(1, val / max));
}
