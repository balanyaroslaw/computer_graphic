import React from 'react';
import Oscilloscope from '../components/Oscilloscope';


const Home: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-4xl md:text-5xl font-bold text-glow text-center">
        Що таке комп'ютерна графіка?
      </h1>
      <div className="flex w-full justify-between gap-10">
        <div className="prose prose-lg max-w-none text-oscilloscope font-press-start">
          <p className="text-lg leading-relaxed mb-6">
            Комп'ютерна графіка — це галузь інформатики, яка займається створенням, 
            обробкою та відображенням зображень за допомогою комп'ютерів. Вона охоплює 
            широкий спектр технологій від простих 2D малюнків до складних 3D моделей 
            та анімації.
          </p>
          
          <p className="text-lg leading-relaxed mb-6">
            Сучасна комп'ютерна графіка знаходить застосування в різних сферах: 
            відеоігри, кіноіндустрія, архітектурне проектування, медична візуалізація, 
            наукові дослідження та багато інших. Вона дозволяє створювати реалістичні 
            зображення, симулювати фізичні процеси та візуалізувати складні дані.
          </p>
          
          <p className="text-lg leading-relaxed">
            Одним з найцікавіших аспектів комп'ютерної графіки є фрактали — математичні 
            об'єкти, які демонструють самоподібність на різних масштабах. Фрактал Мандельброта 
            є одним з найвідоміших прикладів таких об'єктів, який можна побачити на сторінці 
            "Фрактали" цього додатку.
          </p>
        </div>
        
        <div>
          <Oscilloscope />
        </div>
      </div>
    </div>
  );
};

export default Home;
