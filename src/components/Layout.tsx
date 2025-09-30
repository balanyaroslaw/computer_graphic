import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from "../assets/Logo.png";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Головна' },
    { to: '/history', label: 'Історія' },
    { to: '/fractals', label: 'Фрактали' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-oscilloscope font-press-start">
      <nav className="border-b border-oscilloscope border-glow">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 sm:gap-5">
              <img src={Logo} alt="Logo" className='w-8 h-8 sm:w-10 sm:h-10'/>
              <h1 className="text-xs sm:text-sm md:text-xl font-bold">
                Комп'ютерна графіка
              </h1>
            </div>

            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.to
                      ? 'text-oscilloscope text-glow'
                      : 'text-oscilloscope hover:text-glow'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-oscilloscope hover:bg-oscilloscope/10 rounded transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3 border-t border-oscilloscope/30 animate-fadeIn">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMobileMenu}
                  className={`block px-4 py-2 text-sm font-medium transition-all duration-200 rounded ${
                    location.pathname === link.to
                      ? 'text-oscilloscope bg-oscilloscope/10 text-glow'
                      : 'text-oscilloscope hover:text-glow hover:bg-oscilloscope/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;