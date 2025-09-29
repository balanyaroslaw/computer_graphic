import React from 'react';
import Oscilloscope from '../components/Oscilloscope';


const Home: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6 px-4 md:px-6">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-oscilloscope">
        Що таке комп'ютерна графіка?
      </h1>
      <div className="flex flex-col lg:flex-row w-full justify-between gap-6 md:gap-10">
        <div className="prose prose-sm md:prose-lg max-w-none text-oscilloscope">
          <p className="text-sm md:text-lg leading-relaxed mb-4 md:mb-6">
            Комп'ютерна графіка — це галузь інформатики, яка займається створенням, 
            обробкою та відображенням зображень за допомогою комп'ютерів. Вона охоплює 
            широкий спектр технологій від простих 2D малюнків до складних 3D моделей 
            та анімації.
          </p>
          
          <p className="text-sm md:text-lg leading-relaxed mb-4 md:mb-6">
            Сучасна комп'ютерна графіка знаходить застосування в різних сферах: 
            відеоігри, кіноіндустрія, архітектурне проектування, медична візуалізація, 
            наукові дослідження та багато інших. Вона дозволяє створювати реалістичні 
            зображення, симулювати фізичні процеси та візуалізувати складні дані.
          </p>
          
          <p className="text-sm md:text-lg leading-relaxed">
            Одним з найцікавіших аспектів комп'ютерної графіки є фрактали — математичні 
            об'єкти, які демонструють самоподібність на різних масштабах. Фрактал Мандельброта 
            є одним з найвідоміших прикладів таких об'єктів, який можна побачити на сторінці 
            "Фрактали" цього додатку.
          </p>
        </div>
        
        <div className="w-full lg:w-auto lg:min-w-[400px]">
          <Oscilloscope />
        </div>
      </div>
    </div>
  );
};

export default Home;
