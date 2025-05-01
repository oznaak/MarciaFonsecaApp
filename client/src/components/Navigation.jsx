import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoGold from '../images/mf_gold.png';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      return;
    }
    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/*<div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DEA54B]/90 to-[#D27D2D]/80 flex items-center justify-center text-white font-bold text-xl">
              MF
            </div>
            <span className="text-xl font-bold bg-gradient-to-br from-[#DEA54B]/90 to-[#D27D2D]/80 bg-clip-text text-transparent">
              Márcia Fonseca
            </span>*/}
            <img src={logoGold} alt="Logo" className="h-16" /> {/* Replace with your logo image path */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-semibold text-gray-700 hover:text-[#DEA54B] transition-colors">
              Página Inicial
            </Link>
            <Link to="/about" className="font-semibold text-gray-700 hover:text-[#DEA54B] transition-colors">
              Sobre Mim
            </Link>
            <Link to="/contact" className="font-semibold text-gray-700 hover:text-[#DEA54B] transition-colors">
              Contactos
            </Link>
            <Link to="/courses" className="font-semibold text-gray-700 hover:text-[#DEA54B] transition-colors">
              Formações
            </Link>
            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/userDashboard"
                  className="font-semibold px-4 py-2 rounded-full bg-gradient-to-br from-[#DEA54B]/90 to-[#D27D2D]/80 text-white hover:opacity-90 transition-all duration-300 shadow-sm"
                >
                  Área de Membros
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-1 text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8v8" />
                  </svg>
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="font-semibold px-4 py-2 rounded-full bg-gradient-to-br from-[#DEA54B]/90 to-[#D27D2D]/80 text-white hover:opacity-90 transition-all duration-300 shadow-sm"
              >
                Área de Membros
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-between">
              <span className={`block w-full h-0.5 bg-[#DEA54B]/90 transform transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
              <span className={`block w-full h-0.5 bg-[#DEA54B]/90 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-full h-0.5 bg-[#DEA54B]/90 transform transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="py-4 space-y-4">
            <Link to="/" className="block text-gray-700 hover:text-[#DEA54B] transition-colors">
              Home
            </Link>
            <Link to="/courses" className="block text-gray-700 hover:text-[#DEA54B] transition-colors">
              Courses
            </Link>
            <Link to="/about" className="block text-gray-700 hover:text-[#DEA54B] transition-colors">
              About
            </Link>
            <Link to="/contact" className="block text-gray-700 hover:text-[#DEA54B] transition-colors">
              Contact
            </Link>
            {user ? (
              <>
                <Link 
                  to="/userDashboard" 
                  className="block px-4 py-2 rounded-full bg-gradient-to-br from-[#DEA54B]/90 to-[#D27D2D]/80 text-white hover:opacity-90 transition-all duration-300 shadow-sm text-center"
                >
                  Área de Membros
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="inline h-6 w-6 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8v8" />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block px-4 py-2 rounded-full bg-gradient-to-br from-[#DEA54B]/90 to-[#D27D2D]/80 text-white hover:opacity-90 transition-all duration-300 shadow-sm text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;