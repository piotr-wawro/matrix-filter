import GaussanKernel from 'components/kernel/GaussanKernel';
import { useEffect, useRef, useState } from 'react';

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [srcImage, setSrcImage] = useState('');
  const [kernel, setKernel] = useState<number[][]>([]);

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
    if (contex) {
      contex.drawImage(imgRef.current as CanvasImageSource, 0, 0);
    }
  };

  const handleOnButtonClick = () => {
    const contex = canvasRef.current?.getContext('2d');

    if (canvasRef.current && contex) {
      contex.drawImage(imgRef.current as CanvasImageSource, 0, 0);

      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;
      const imageData = contex.getImageData(0, 0, canvasWidth, canvasHeight);
      const pixels = imageData.data;
      const newPixels = new Uint8ClampedArray(canvasWidth * canvasHeight * 4);

      const kernelX = kernel[0].length;
      const kernelY = kernel.length;
      const kernelCenterColumn = Math.floor(kernel[0].length / 2);
      const kernelCenterRow = Math.floor(kernel.length / 2);

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
              kernelSum += kernel[row][col];
              sumR += pixels[k + offset] * kernel[row][col];
              sumG += pixels[k + offset + 1] * kernel[row][col];
              sumB += pixels[k + offset + 2] * kernel[row][col];
              sumA += pixels[k + offset + 3] * kernel[row][col];
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

  return (
    <div className='App'>
      <GaussanKernel setKernel={setKernel} />
      <img ref={imgRef} src={srcImage} onLoad={handleOnLoad} />
      <input type='file' accept='image/*' onChange={handleOnChangeFile} />
      <canvas ref={canvasRef} width={400} height={400}></canvas>
      <button onClick={handleOnButtonClick}>apply</button>
    </div>
  );
}

export default App;
