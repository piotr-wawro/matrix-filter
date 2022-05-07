import { RidgeDetection } from 'kernel-functions/RidgeDetection';
import { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div``;

interface RidgeDetectionKernel {
  setKernel: React.Dispatch<React.SetStateAction<number[][]>>;
}

const RidgeDetectionKernel = ({ setKernel }: RidgeDetectionKernel) => {
  useEffect(() => {
    setKernel(RidgeDetection());
  }, []);

  return <Container></Container>;
};

export default RidgeDetectionKernel;
