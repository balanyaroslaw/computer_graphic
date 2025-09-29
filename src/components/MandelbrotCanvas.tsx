import React, { useRef, useEffect, useState } from 'react';

const MandelbrotCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  
  const getDefaultSize = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? Math.min(window.innerWidth - 40, 400) : 400;
    }
    return 400;
  };
  
  const [width, setWidth] = useState<number>(getDefaultSize());
  const [height, setHeight] = useState<number>(getDefaultSize());
  const [maxIterations, setMaxIterations] = useState<number>(100);
  const [zoom, setZoom] = useState<number>(1);
  const [centerX, setCenterX] = useState<number>(-0.5);
  const [centerY, setCenterY] = useState<number>(0);
  const [colorScheme, setColorScheme] = useState<string>('rainbow');
  
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(true);

  const mandelbrotIterations = (real: number, imag: number, maxIterations: number = 100): number => {
    let zReal = 0;
    let zImag = 0;
    
    for (let i = 0; i < maxIterations; i++) {
      const zRealNew = zReal * zReal - zImag * zImag + real;
      const zImagNew = 2 * zReal * zImag + imag;
      
      zReal = zRealNew;
      zImag = zImagNew;
      
      if (zReal * zReal + zImag * zImag > 4) {
        return i;
      }
    }
    
    return maxIterations;
  };

  const getColor = (iterations: number, maxIterations: number): string => {
    if (iterations === maxIterations) {
      return '#000000';
    }
    
    const intensity = iterations / maxIterations;
    
    switch (colorScheme) {
      case 'rainbow':
        const hue = (intensity * 360) % 360;
        return `hsl(${hue}, 100%, 50%)`;
      
      case 'fire':
        const red = Math.floor(255 * intensity);
        const green = Math.floor(255 * intensity * 0.5);
        return `rgb(${red}, ${green}, 0)`;
      
      case 'ocean':
        const blue = Math.floor(255 * intensity);
        const oceanGreen = Math.floor(255 * intensity * 0.3);
        return `rgb(0, ${oceanGreen}, ${blue})`;
      
      case 'oscilloscope':
        const oscilloscopeGreen = Math.floor(255 * intensity);
        return `rgb(0, ${oscilloscopeGreen}, 0)`;
      
      default:
        return `rgb(0, ${Math.floor(255 * intensity)}, 0)`;
    }
  };

  const drawMandelbrot = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = width;
    canvas.height = height;
    
    setIsGenerating(true);
    setProgress(0);

    const zoomFactor = zoom;
    
    const realMin = centerX - 2 / zoomFactor;
    const realMax = centerX + 2 / zoomFactor;
    const imagMin = centerY - 2 / zoomFactor;
    const imagMax = centerY + 2 / zoomFactor;

    let pixelCount = 0;
    const totalPixels = width * height;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const real = realMin + (x / width) * (realMax - realMin);
        const imag = imagMin + (y / height) * (imagMax - imagMin);
        
        const iterations = mandelbrotIterations(real, imag, maxIterations);
        
        const color = getColor(iterations, maxIterations);
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
        
        pixelCount++;
        
        if (pixelCount % 1000 === 0) {
          setProgress(Math.floor((pixelCount / totalPixels) * 100));
        }
      }
    }

    setIsGenerating(false);
    setProgress(100);
  };

  useEffect(() => {
    if (isConfigured && isGenerated) {
      drawMandelbrot();
    }
  }, [width, height, maxIterations, zoom, centerX, centerY, colorScheme, isConfigured, isGenerated]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!isGenerated) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newCenterX = centerX + (x / width - 0.5) * (4 / zoom);
    const newCenterY = centerY + (y / height - 0.5) * (4 / zoom);
    
    setCenterX(newCenterX);
    setCenterY(newCenterY);
    setZoom(zoom * 2); 
  };

  const handleConfigure = (): void => {
    setIsConfigured(true);
    setShowSettings(false);
  };

  const handleGenerate = (): void => {
    setIsGenerated(true);
  };

  const handleDelete = (): void => {
    setIsGenerated(false);
    setIsConfigured(false);
    setShowSettings(true);
    
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const handleEditSettings = (): void => {
    setShowSettings(true);
  };

  const handleReset = (): void => {
    const defaultSize = getDefaultSize();
    setWidth(defaultSize);
    setHeight(defaultSize);
    setMaxIterations(100);
    setZoom(1);
    setCenterX(-0.5);
    setCenterY(0);
    setColorScheme('rainbow');
  };

  return (
    <div className="min-h-screen bg-black text-green-500 p-2 sm:p-4">
      <style>{`
        .text-oscilloscope { color: #00ff00; }
        .border-oscilloscope { border-color: #00ff00; }
        .bg-oscilloscope { background-color: #00ff00; }
        .text-glow { text-shadow: 0 0 10px #00ff00; }
        .border-glow { box-shadow: 0 0 10px #00ff00; }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #00ff00;
          cursor: pointer;
          border-radius: 50%;
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #00ff00;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }
      `}</style>
      
      <div className="space-y-4 max-w-4xl mx-auto">
        {showSettings && (
          <div className="border border-oscilloscope border-glow p-3 sm:p-4 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold text-glow mb-3 sm:mb-4 text-center">
              Налаштування фрактала
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-oscilloscope mb-2">
                  Ширина: {width}px
                </label>
                <input
                  type="range"
                  min="200"
                  max="800"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value))}
                  className="w-full h-2 bg-black border border-oscilloscope rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-oscilloscope mb-2">
                  Висота: {height}px
                </label>
                <input
                  type="range"
                  min="200"
                  max="800"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="w-full h-2 bg-black border border-oscilloscope rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-oscilloscope mb-2">
                  Ітерації: {maxIterations}
                </label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  value={maxIterations}
                  onChange={(e) => setMaxIterations(parseInt(e.target.value))}
                  className="w-full h-2 bg-black border border-oscilloscope rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-oscilloscope mb-2">
                  Зум: {zoom.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full h-2 bg-black border border-oscilloscope rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-oscilloscope mb-2">
                  Центр X: {centerX.toFixed(3)}
                </label>
                <input
                  type="range"
                  min="-2"
                  max="1"
                  step="0.001"
                  value={centerX}
                  onChange={(e) => setCenterX(parseFloat(e.target.value))}
                  className="w-full h-2 bg-black border border-oscilloscope rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-oscilloscope mb-2">
                  Центр Y: {centerY.toFixed(3)}
                </label>
                <input
                  type="range"
                  min="-1.5"
                  max="1.5"
                  step="0.001"
                  value={centerY}
                  onChange={(e) => setCenterY(parseFloat(e.target.value))}
                  className="w-full h-2 bg-black border border-oscilloscope rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            
            <div className="mt-3 sm:mt-4">
              <label className="block text-xs sm:text-sm font-medium text-oscilloscope mb-2">
                Кольорова схема:
              </label>
              <select
                value={colorScheme}
                onChange={(e) => setColorScheme(e.target.value)}
                className="w-full sm:w-auto bg-black border border-oscilloscope text-oscilloscope px-3 py-2 rounded-lg text-sm sm:text-base"
              >
                <option value="rainbow">Веселка</option>
                <option value="fire">Вогонь</option>
                <option value="ocean">Океан</option>
                <option value="oscilloscope">Осцилограф</option>
              </select>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-3 sm:mt-4">
              <button
                onClick={handleReset}
                className="bg-transparent border border-oscilloscope text-oscilloscope px-4 py-2 rounded-lg transition-all duration-300 text-sm sm:text-base hover:bg-oscilloscope hover:text-black"
              >
                Скинути
              </button>
              <button
                onClick={handleConfigure}
                className="bg-transparent border-2 border-oscilloscope text-oscilloscope px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold rounded-lg hover:bg-oscilloscope hover:text-black transition-all duration-300"
              >
                Підтвердити налаштування
              </button>
            </div>
          </div>
        )}
      
        {isConfigured && !showSettings && (
          <div className="border border-oscilloscope border-glow p-3 sm:p-4 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold text-glow mb-3 sm:mb-4 text-center">
              Управління фракталом
            </h3>
            
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
              {!isGenerated ? (
                <button
                  onClick={handleGenerate}
                  className="bg-transparent border-2 border-oscilloscope text-oscilloscope px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold rounded-lg hover:bg-oscilloscope hover:text-black transition-all duration-300"
                >
                  Згенерувати фрактал
                </button>
              ) : (
                <>
                  <button
                    onClick={handleEditSettings}
                    className="bg-transparent border border-oscilloscope text-oscilloscope px-3 sm:px-4 py-2 rounded-lg hover:bg-oscilloscope hover:text-black transition-all duration-300 text-xs sm:text-base"
                  >
                    Редагувати
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 border border-red-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 text-xs sm:text-base"
                  >
                    Видалити
                  </button>
                  <button
                    onClick={() => {
                      setIsGenerated(false);
                      setTimeout(() => setIsGenerated(true), 100);
                    }}
                    className="bg-transparent border border-oscilloscope text-oscilloscope px-3 sm:px-4 py-2 rounded-lg hover:bg-oscilloscope hover:text-black transition-all duration-300 text-xs sm:text-base"
                  >
                    Перегенерувати
                  </button>
                </>
              )}
            </div>
            
            {isGenerated && (
              <div className="mt-3 sm:mt-4 text-center">
                <p className="text-oscilloscope text-xs sm:text-sm">
                  Клікніть по фракталу для зуму
                </p>
                <p className="text-oscilloscope text-xs sm:text-sm mt-1">
                  Зум: {zoom.toFixed(1)}x | Центр: ({centerX.toFixed(3)}, {centerY.toFixed(3)})
                </p>
              </div>
            )}
          </div>
        )}
        
        {isGenerating && (
          <div className="w-full max-w-md mx-auto px-2">
            <p className="text-oscilloscope mb-2 text-sm sm:text-base text-center">Генерація фрактала... {progress}%</p>
            <div className="w-full bg-black border border-oscilloscope rounded-lg overflow-hidden">
              <div 
                className="bg-oscilloscope h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {isConfigured && isGenerated && (
          <div className="w-full flex justify-center">
            <canvas
              ref={canvasRef}
              width={width}
              height={height}
              onClick={handleCanvasClick}
              className={`border border-oscilloscope border-glow max-w-full h-auto ${
                isGenerated ? 'cursor-crosshair' : 'cursor-default'
              }`}
              style={{ touchAction: 'none' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MandelbrotCanvas;