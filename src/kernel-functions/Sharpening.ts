import { Point2D } from './Datamodel';

export const Sharpening = (
  size: number,
  center: Point2D,
  sigmaX: number,
  sigmaY: number,
  aplitude: number
) => {
  const kernel: number[][] = [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0],
  ];

  return kernel;
};
