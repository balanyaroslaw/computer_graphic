import React, { useRef, useEffect } from 'react';

const Oscilloscope: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;

    for (let x = 0; x <= width; x += width / 10) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += height / 8) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
  };

  const drawWaves = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number): void => {
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#00FF00';
    ctx.shadowBlur = 10;

    ctx.beginPath();
    for (let x = 0; x < width; x += 2) {
      const y = height / 2 + Math.sin((x * 0.02) + (time * 0.01)) * 50;
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    ctx.strokeStyle = '#00FF00';
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    for (let x = 0; x < width; x += 2) {
      const y = height / 2 + Math.cos((x * 0.03) + (time * 0.015)) * 30;
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    ctx.strokeStyle = '#00FF00';
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    for (let x = 0; x < width; x += 2) {
      const y = height / 2 + Math.sin((x * 0.01) + (time * 0.02)) * Math.cos((x * 0.05) + (time * 0.01)) * 40;
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  };

  const drawText = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
    ctx.fillStyle = '#00FF00';
    ctx.font = '12px "Press Start 2P", monospace';
    ctx.textAlign = 'left';
    
    ctx.fillText('CH1: 1V/div', 10, 20);
    ctx.fillText('TIME: 1ms/div', 10, 35);
    
    ctx.textAlign = 'right';
    ctx.fillText('FREQ: 1kHz', width - 10, 20);
    ctx.fillText('TRIG: AUTO', width - 10, 35);
    
    ctx.textAlign = 'center';
    ctx.font = '16px "Press Start 2P", monospace';
    ctx.fillText('OSCILLOSCOPE', width / 2, height - 10);
  };

  const animate = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const time = Date.now();

    ctx.clearRect(0, 0, width, height);

    drawGrid(ctx, width, height);

    drawWaves(ctx, width, height, time);

    drawText(ctx, width, height);

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);


  return (
    <div className="space-y-4">
      <div className="text-center">
        
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            className="border border-oscilloscope border-glow"
          />
        </div>
      </div>
    </div>
  );
};

export default Oscilloscope;
