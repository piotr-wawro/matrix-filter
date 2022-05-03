import { ReactNode } from 'react';
import styled from 'styled-components';

interface ContainerProps {
  sizeX: number;
  sizeY: number;
}

const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-rows: repeat(${(p) => p.sizeY}, 25px);
  grid-template-columns: repeat(${(p) => p.sizeX}, 25px);
`;

const Box = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface KernelProps {
  arr: number[][];
}

const KernelOverview = ({ arr }: KernelProps) => {
  const kernelBoxes: ReactNode[] = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      kernelBoxes.push(<Box key={`${i}${j}`}>{Math.round(arr[i][j])}</Box>);
    }
  }

  return (
    <Container sizeY={arr.length} sizeX={arr[0].length}>
      {kernelBoxes}
    </Container>
  );
};

export default KernelOverview;
