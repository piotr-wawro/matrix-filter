export const Sharpening = () => {
  const kernel: number[][] = [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0],
  ];

  return kernel;
};
