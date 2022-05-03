import { Gaussian } from 'kernel-functions/Gaussian';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const Label = styled.label``;

const RangeInput = styled.input.attrs({
  type: 'range',
})`
  width: 100%;
`;

interface GaussanKernelProps {
  setKernel: React.Dispatch<React.SetStateAction<number[][]>>;
}

const GaussanKernel = ({ setKernel }: GaussanKernelProps) => {
  const [size, setSize] = useState('3');
  const [centerX, setCenterX] = useState('1');
  const [centerY, setCenterY] = useState('1');
  const [sigmaX, setSigmaX] = useState('1');
  const [sigmaY, setSigmaY] = useState('1');
  const [aplitude, setAplitude] = useState('1');

  useEffect(() => {
    setKernel(
      Gaussian(
        parseInt(size),
        parseInt(centerX),
        parseInt(centerY),
        parseInt(sigmaX),
        parseInt(sigmaY),
        parseInt(aplitude)
      )
    );
  }, [size, centerX, centerY, sigmaX, sigmaY, aplitude]);

  return (
    <Container>
      <Label htmlFor='size'>size</Label>
      <RangeInput
        id='size'
        min={3}
        max={7}
        step={2}
        value={size}
        onChange={(event) => setSize(event.target.value)}
      />

      <Label htmlFor='centerX'>centerX</Label>
      <RangeInput
        id='centerX'
        min={0}
        max={parseInt(size) - 1}
        step={1}
        value={centerX}
        onChange={(event) => setCenterX(event.target.value)}
      />

      <Label htmlFor='centerY'>centerY</Label>
      <RangeInput
        id='centerY'
        min={0}
        max={parseInt(size) - 1}
        step={1}
        value={centerY}
        onChange={(event) => setCenterY(event.target.value)}
      />

      <Label htmlFor='sigmaX'>sigmaX</Label>
      <RangeInput
        id='sigmaX'
        min={0}
        max={parseInt(size) - 1}
        step={1}
        value={sigmaX}
        onChange={(event) => setSigmaX(event.target.value)}
      />

      <Label htmlFor='sigmaY'>sigmaY</Label>
      <RangeInput
        id='sigmaY'
        min={0}
        max={parseInt(size) - 1}
        step={1}
        value={sigmaY}
        onChange={(event) => setSigmaY(event.target.value)}
      />

      <Label htmlFor='aplitude'>aplitude</Label>
      <RangeInput
        id='aplitude'
        min={0}
        max={parseInt(size) - 1}
        step={1}
        value={aplitude}
        onChange={(event) => setAplitude(event.target.value)}
      />
    </Container>
  );
};

export default GaussanKernel;
