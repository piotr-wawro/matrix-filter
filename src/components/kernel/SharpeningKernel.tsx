import { Sharpening } from 'kernel-functions/Sharpening';
import { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div``;

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
