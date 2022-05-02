import GaussanKernel from 'components/kernel/GaussanKernel';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [srcImage, setSrcImage] = useState('');
  const [kernel, setKernel] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setSrcImage(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const handleOnChangeFile = (event) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleOnLoad = () => {
    const anchor = window.cv.Point(-1, -1);
    const ker = window.cv.matFromArray(
      kernel.length,
      kernel[0].length,
      window.cv.CV_8UC1,
      kernel
    );

    const src = window.cv.imread(ref.current);
    const dst = new window.cv.Mat();

    window.cv.filter2D(
      src,
      dst,
      window.cv.CV_8U,
      ker,
      anchor,
      0,
      window.cv.BORDER_DEFAULT
    );
    window.cv.imshow('canvas', dst);
    src.delete();
  };

  return (
    <div className='App'>
      <GaussanKernel setKernel={setKernel} />
      <img ref={ref} alt='No srcImage' src={srcImage} onLoad={handleOnLoad} />
      <input type='file' accept='image/*' onChange={handleOnChangeFile} />
      <canvas id='canvas' width={400} height={400}></canvas>
    </div>
  );
}

export default App;
