export const Gaussian = (
  size: number,
  centerX: number,
  centery: number,
  sigmaX: number,
  sigmaY: number,
  aplitude: number
): number[][] => {
  const kernel: number[][] = [];

  for (let i = 0; i < size; i++) {
    kernel.push([]);
    for (let j = 0; j < size; j++) {
      const x = Math.pow(j - centerX, 2) / (2 * sigmaX * sigmaX);
      const y = Math.pow(i - centery, 2) / (2 * sigmaY * sigmaY);
      const val = aplitude * Math.exp(-(x + y));
      kernel[i].push(Math.round(val));
    }
  }

  return kernel;
};
