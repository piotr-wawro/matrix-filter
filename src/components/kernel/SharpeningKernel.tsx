import { Sharpening } from 'kernel-functions/Sharpening';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const Label = styled.label``;

const RangeInput = styled.input.attrs({
  type: 'range',
})`
  width: 100%;
`;

interface SharpeningKernelProps {
  setKernel: React.Dispatch<React.SetStateAction<number[][]>>;
}

const SharpeningKernel = ({ setKernel }: SharpeningKernelProps) => {
  useEffect(() => {
    setKernel(Sharpening());
  }, []);

  return <Container></Container>;
};

export default SharpeningKernel;
