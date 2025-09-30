import React from 'react';
import MandelbrotCanvas from '../components/MandelbrotCanvas';


const Fractals: React.FC = () => {

  return (
    <div className="space-y-8">
      <h1 className="text-xl md:text-5xl font-bold text-center">
        Фрактал Мандельброта
      </h1>
      
      <div className="space-y-6">
        <div className="border border-oscilloscope border-glow p-6 rounded-lg font-press-start">
          <h2 className="text-2xl font-bold text-glow mb-4">Що таке фрактал Мандельброта?</h2>
          <p className="text-base md:text-lg leading-relaxed mb-4">
            Фрактал Мандельброта — це математична множина, названа на честь 
            Бенуа Мандельброта, який її вивчав. Це один з найвідоміших фракталів, 
            який демонструє складну та красиву структуру на різних масштабах.
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-4">
            Множина Мандельброта визначається як множина комплексних чисел c, 
            для яких послідовність z₀ = 0, zₙ₊₁ = zₙ² + c не розходиться до 
            нескінченності.
          </p>
          <p className="text-base md:text-lg leading-relaxed">
            Кожна точка на площині має свій колір залежно від того, як швидко 
            послідовність розходиться. Це створює унікальні візерунки та структури.
          </p>
        </div>

        <div className="flex justify-center">
          <MandelbrotCanvas />
        </div>
      </div>
    </div>
  );
};

export default Fractals;
