import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from "../assets/Logo.png";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-black text-oscilloscope font-press-start">
      <nav className="border-b border-oscilloscope border-glow">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-5">
              <img src={Logo} alt="Logo" className='w-10 h-10'/>
              <h1 className="text-xl font-bold text-glow">
                Комп'ютерна графіка
              </h1>
            </div>
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === '/'
                    ? 'text-oscilloscope text-glow'
                    : 'text-oscilloscope hover:text-glow'
                }`}
              >
                Головна
              </Link>
              <Link
                to="/history"
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === '/history'
                    ? 'text-oscilloscope text-glow'
                    : 'text-oscilloscope hover:text-glow'
                }`}
              >
                Історія
              </Link>
              <Link
                to="/fractals"
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === '/fractals'
                    ? 'text-oscilloscope text-glow'
                    : 'text-oscilloscope hover:text-glow'
                }`}
              >
                Фрактали
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
