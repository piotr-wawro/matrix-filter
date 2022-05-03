import GaussanKernel from 'components/kernel/GaussanKernel';
import KernelOverview from 'components/kernel/KernelOverview';
import SharpeningKernel from 'components/kernel/SharpeningKernel';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

enum KernelType {
  GAUSSAN_KERNEL = 'GAUSSAN_KERNEL',
  SHARPENING_KERNEL = 'SHARPENING_KERNEL',
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
`;

const ControlPanel = styled.div`
  height: 100vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImagePanel = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 50vh;
  object-fit: contain;
`;

const Canvas = styled.canvas``;

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [srcImage, setSrcImage] = useState('');
  const [kernelArr, setKernelArr] = useState<number[][]>([[]]);
  const [kernelComponent, setKernelComponent] = useState<React.ReactNode>(
    <GaussanKernel setKernel={setKernelArr} />
  );

  const handleOnChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setSrcImage(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const handleOnLoad = () => {
    const contex = canvasRef.current?.getContext('2d');
    if (contex && canvasRef.current && imgRef.current) {
      const minProportion = Math.min(
        (imgRef.current.clientWidth - 1) / imgRef.current.naturalWidth,
        (imgRef.current.clientHeight - 1) / imgRef.current.naturalHeight
      );
      canvasRef.current.width = imgRef.current.naturalWidth * minProportion;

      canvasRef.current.height = imgRef.current.naturalHeight * minProportion;

      canvasRef.current.setAttribute(
        'style',
        `width: ${canvasRef.current.width}px;
        height: ${canvasRef.current.height}px`
      );
      contex.drawImage(
        imgRef.current as CanvasImageSource,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
  };

  const handleOnButtonClick = () => {
    const contex = canvasRef.current?.getContext('2d');

    if (canvasRef.current && contex) {
      contex.drawImage(
        imgRef.current as CanvasImageSource,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;
      const imageData = contex.getImageData(0, 0, canvasWidth, canvasHeight);
      const pixels = imageData.data;
      const newPixels = new Uint8ClampedArray(canvasWidth * canvasHeight * 4);

      const kernelX = kernelArr[0].length;
      const kernelY = kernelArr.length;
      const kernelCenterColumn = Math.floor(kernelArr[0].length / 2);
      const kernelCenterRow = Math.floor(kernelArr.length / 2);

      for (let k = 0; k <= pixels.length; k += 4) {
        let kernelSum = 0;
        let sumR = 0;
        let sumG = 0;
        let sumB = 0;
        let sumA = 0;

        for (let row = 0; row < kernelY; row++) {
          for (let col = 0; col < kernelX; col++) {
            const kerColOffset = col - kernelCenterColumn;
            const kerRowOffset = row - kernelCenterRow;

            const offset = kerRowOffset * 4 * canvasWidth + kerColOffset * 4;

            if (k + offset >= 0 && k + offset + 3 < pixels.length) {
              kernelSum += kernelArr[row][col];
              sumR += pixels[k + offset] * kernelArr[row][col];
              sumG += pixels[k + offset + 1] * kernelArr[row][col];
              sumB += pixels[k + offset + 2] * kernelArr[row][col];
              sumA += pixels[k + offset + 3] * kernelArr[row][col];
            }
          }
        }

        newPixels[k] = sumR / kernelSum;
        newPixels[k + 1] = sumG / kernelSum;
        newPixels[k + 2] = sumB / kernelSum;
        newPixels[k + 3] = sumA / kernelSum;
      }

      const newImage = new ImageData(newPixels, canvasWidth, canvasHeight);
      contex.putImageData(newImage, 0, 0);
    }
  };

  const handleKernelChange = (kernelType: KernelType) => {
    if (kernelType === KernelType.GAUSSAN_KERNEL) {
      setKernelComponent(<GaussanKernel setKernel={setKernelArr} />);
    } else if (kernelType === KernelType.SHARPENING_KERNEL) {
      setKernelComponent(<SharpeningKernel setKernel={setKernelArr} />);
    }
  };

  return (
    <Container>
      <ControlPanel>
        <ButtonContainer>
          {(Object.keys(KernelType) as Array<keyof typeof KernelType>).map(
            (val, key) => (
              <button
                key={key}
                onClick={() => {
                  handleKernelChange(val as KernelType);
                }}
              >
                {val}
              </button>
            )
          )}
        </ButtonContainer>
        {kernelComponent}
        <KernelOverview arr={kernelArr} />
        <input type='file' accept='image/*' onChange={handleOnChangeFile} />
        <button onClick={handleOnButtonClick}>apply</button>
      </ControlPanel>
      <ImagePanel>
        <Image ref={imgRef} src={srcImage} onLoad={handleOnLoad} />
        <Canvas ref={canvasRef} />
      </ImagePanel>
    </Container>
  );
}

export default App;
