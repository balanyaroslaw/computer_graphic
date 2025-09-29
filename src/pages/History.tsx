import React from 'react';
import OscilloscopeHistory from '../components/OscilloscopeHistory';

const History: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-xl md:text-5xl font-bold text-glow text-center font-press-start">
        Історія комп'ютерної графіки
      </h1>
      
      <OscilloscopeHistory />
    </div>
  );
};

export default History;
