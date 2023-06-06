export const clamp = (value: number, min?: number, max?: number): number => {
  if (min != null && value < min) {
    value = min;
  }
  if (max != null && value > max) {
    value = max;
  }
  return value;
};
