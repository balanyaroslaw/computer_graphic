import React, { useState, useRef, useEffect } from 'react';
import Vr from "../assets/vr.png";
import ToyStory from "../assets/toy story.png";
import Gpu from "../assets/gpu.png";
import Oscilloscope from "../assets/osciloscope.png";
import Face from "../assets/face.png";
import SpaceWar from "../assets/spacewar.png";
import Computer from "../assets/computer.png";
import Fractal from "../assets/fractal.png";
import Farcry from "../assets/farcry.jpg";
import Blender from "../assets/blender.jpg";

interface HistoryData {
  title: string;
  content: string;
  first_image: string;
  second_image: string;
}

const OscilloscopeHistory: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [loadedImages, setLoadedImages] = useState<Map<string, HTMLImageElement>>(new Map());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const historyData: HistoryData[] = [
    {
      title: "1950-ті роки",
      content: `Комп'ютерна графіка зародилася як спосіб представлення наукових даних. У цей час використовувалася переважно векторна графіка: на екранах осцилографів та спеціальних дисплеях відображалися лінії, точки й прості геометричні фігури. Це дозволяло вченим візуалізувати результати розрахунків. Поступово виник інтерес до інтерактивних систем. Одним із перших експериментів стала гра Spacewar! (1962), яка показала, що комп'ютери можна застосовувати не тільки для науки, а й для розваг.`,
      first_image: Oscilloscope,
      second_image: Face,
    },
    {
      title: "1960–1970-ті роки",
      content: `У 1960–70-х роках комп'ютери стали доступнішими, і з'явилися перші аркадні автомати. Легендарна гра Pong (1972) довела, що навіть кілька прямокутників і крапка можуть створювати захопливий ігровий процес. Векторні дисплеї цього часу дозволяли швидко оновлювати зображення, що стало основою для динамічних ігор, як-от Asteroids (1979). Незважаючи на простоту графіки, інноваційні ігрові механіки приваблювали гравців.`,
      first_image: SpaceWar,
      second_image: Fractal,
    },
    {
      title: "1980–1990-ті роки",
      content: `Цей період став справжньою революцією для комп'ютерної графіки. Поширення персональних комп'ютерів дало змогу мільйонам людей вперше працювати з графічними інтерфейсами. З'явилися перші графічні редактори та ігрові консолі з кольоровою графікою. Наприкінці 1980-х і на початку 1990-х років розпочався розвиток 3D-графіки. З'явилися графічні процесори, алгоритми рендерингу, текстурування та освітлення, які зробили ігри й візуалізації більш реалістичними.`,
      first_image: ToyStory,
      second_image: Computer,
    },
    {
      title: "2000–2010-ті роки",
      content: `У 2000-х роках почалася ера програмованих шейдерів, які дозволили розробникам створювати складні візуальні ефекти. Графічні процесори стали потужними інструментами не тільки для ігор, але й для наукових обчислень. Завдяки розвитку рендерингу з глобальним освітленням та алгоритмам трасування променів графіка досягла нових висот реалістичності. У цей же час активно розвивалася мобільна графіка та веб-технології, а кіноіндустрія подарувала світу перші по-справжньому реалістичні 3D-фільми.`,
      first_image: Gpu,
      second_image: Farcry,
    },
    {
      title: "Сучасність (2020-ті)",
      content: `Сьогодні ми живемо в епоху, коли комп'ютерна графіка тісно поєднана з штучним інтелектом. Нейронні мережі здатні генерувати реалістичні зображення, відео та навіть 3D-сцени. Технології реального часу дозволяють відтворювати вражаючий рендеринг у VR та AR. Дослідження у сфері квантових обчислень і машинного навчання відкривають нові горизонти для майбутнього графіки. Також активно розвивається інтеграція з блокчейн-технологіями та метавсесвітами.`,
      first_image: Blender,
      second_image: Vr,
    },
  ];

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const imageMap = new Map<string, HTMLImageElement>();
    const imagesToLoad = [
      { key: Oscilloscope, src: Oscilloscope },
      { key: Face, src: Face },
      { key: SpaceWar, src: SpaceWar },
      { key: Computer, src: Computer },
      { key: ToyStory, src: ToyStory },
      { key: Gpu, src: Gpu },
      { key: Vr, src: Vr },
      { key: Fractal, src: Fractal },
      { key: Farcry, src: Farcry },
      { key: Blender, src: Blender}
    ];

    let loadedCount = 0;

    imagesToLoad.forEach(({ key, src }) => {
      const img = new Image();
      img.onload = () => {
        imageMap.set(key, img);
        loadedCount++;
        if (loadedCount === imagesToLoad.length) {
          setLoadedImages(new Map(imageMap));
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        loadedCount++;
        if (loadedCount === imagesToLoad.length) {
          setLoadedImages(new Map(imageMap));
        }
      };
      img.src = src;
    });
  }, []);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.2;

    for (let x = 0; x <= width; x += width / 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += height / 15) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
  };

  const drawText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number = 12): void => {
    ctx.fillStyle = '#00FF00';
    ctx.font = `${fontSize}px "Press Start 2P", monospace`;
    ctx.textAlign = 'left';
    ctx.fillText(text, x, y);
  };

  const drawTextContent = (ctx: CanvasRenderingContext2D, width: number): void => {
    const currentData = historyData[currentIndex];
    
    drawText(ctx, currentData.title, 40, 80, 20);
    
    const words = currentData.content.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    const maxWidth = width - 80;
    
    words.forEach(word => {
      const testLine = currentLine + word + ' ';
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine !== '') {
        lines.push(currentLine);
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    });
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    const startY = 120;
    const lineHeight = 30;
    const maxLines = 8;
    
    for (let i = 0; i < Math.min(lines.length, maxLines); i++) {
      drawText(ctx, lines[i], 40, startY + i * lineHeight, 14);
    }
    
    const imageY = startY + Math.min(lines.length, maxLines) * lineHeight + 40;
    const imageWidth = 250;
    const imageHeight = 180;
    const imageSpacing = 60;
    const totalImagesWidth = imageWidth * 2 + imageSpacing;
    const startX = (width - totalImagesWidth) / 2;
    
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#00FF00';
    ctx.shadowBlur = 10;

    const firstImg = loadedImages.get(currentData.first_image);
    if (firstImg && firstImg.complete) {
      ctx.drawImage(firstImg, startX, imageY, imageWidth, imageHeight);
    }
    ctx.strokeRect(startX, imageY, imageWidth, imageHeight);
    
    const secondImg = loadedImages.get(currentData.second_image);
    if (secondImg && secondImg.complete) {
      ctx.drawImage(secondImg, startX + imageWidth + imageSpacing, imageY, imageWidth, imageHeight);
    }
    ctx.strokeRect(startX + imageWidth + imageSpacing, imageY, imageWidth, imageHeight);
    
    ctx.shadowBlur = 0;
  };

  const drawFrame = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#00FF00';
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.roundRect(5, 5, width - 10, height - 10, 20); 
    ctx.stroke();

    ctx.beginPath();
    ctx.roundRect(15, 15, width - 30, height - 30, 15); 
    ctx.stroke();

    ctx.shadowBlur = 0;
  };

  const animate = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    drawFrame(ctx, width, height);
    drawGrid(ctx, width, height);
    drawTextContent(ctx, width);

    if (isAnimating) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isAnimating && loadedImages.size > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, currentIndex, loadedImages]);

  const handleUp = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsAnimating(true);
    }
  };

  const handleDown = (): void => {
    if (currentIndex < historyData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsAnimating(true);
    }
  };

  if (isMobile) {
    const currentData = historyData[currentIndex];
    return (
      <div className="space-y-6 px-4">
        <div className="p-4 bg-black border border-oscilloscope rounded text-oscilloscope font-mono space-y-2">
          <h4 className="font-bold">{currentData.title}</h4>
          <p>{currentData.content}</p>
          <div className="flex justify-between">
            <button onClick={handleUp} disabled={currentIndex === 0} className="px-4 py-2 border rounded text-oscilloscope disabled:opacity-50">Назад</button>
            <button onClick={handleDown} disabled={currentIndex === historyData.length - 1} className="px-4 py-2 border rounded text-oscilloscope disabled:opacity-50">Далі</button>
          </div>
          <div className="text-right text-sm">{currentIndex + 1} / {historyData.length}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-glow mb-4 font-press-start">
          Осцилограф історії комп'ютерної графіки
        </h3>
        
        {!isMobile && <div className="flex justify-center">
          <div className="relative w-full max-w-7xl">
            <canvas
              ref={canvasRef}
              width={1200}
              height={600}
              className="border border-oscilloscope border-glow w-full h-auto rounded-[24px]"
            />
            
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
              <button
                onClick={handleUp}
                disabled={currentIndex === 0}
                className={`w-12 h-12 border-2 border-oscilloscope rounded-full flex items-center justify-center text-oscilloscope font-press-start text-lg ${
                  currentIndex === 0 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-oscilloscope hover:text-black transition-all duration-300'
                }`}
              >
                ↑
              </button>
              <button
                onClick={handleDown}
                disabled={currentIndex === historyData.length - 1}
                className={`w-12 h-12 border-2 border-oscilloscope rounded-full flex items-center justify-center text-oscilloscope font-press-start text-lg ${
                  currentIndex === historyData.length - 1 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-oscilloscope hover:text-black transition-all duration-300'
                }`}
              >
                ↓
              </button>
            </div>
            
            <div className="absolute right-8 top-8 bg-black border border-oscilloscope p-4 rounded">
              <div className="text-oscilloscope font-press-start text-sm">
                {currentIndex + 1} / {historyData.length}
              </div>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default OscilloscopeHistory;