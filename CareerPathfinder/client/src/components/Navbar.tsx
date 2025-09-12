import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, Home, Info } from 'lucide-react';
import LoginSignupModal from './LoginSignupModal';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const [location, navigate] = useLocation();

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToHero = () => {
    const hero = document.getElementById('home');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleHomeClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    closeMobileMenu();
    if (location === '/') {
      scrollToHero();
    } else {
      navigate('/');
      setTimeout(scrollToHero, 60);
    }
  };

  const scrollToAbout = () => {
    const about = document.getElementById('about');
    if (about) {
      about.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAboutClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    closeMobileMenu();
    if (location === '/') {
      scrollToAbout();
    } else {
      navigate('/');
      setTimeout(scrollToAbout, 80);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 glass" data-testid="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={isAuthenticated ? "/dashboard" : "/"} onClick={closeMobileMenu}>
              <span className="text-2xl font-bold gradient-text cursor-pointer" data-testid="logo">
                CareerGuide
              </span>
            </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-1">
            {!isAuthenticated ? (
              <>
                {/* Left side - Home and About */}
                <div className="flex items-center space-x-8 ml-8">
                  <a href="#home" onClick={handleHomeClick} className={`text-gray-300 hover:text-white transition-colors duration-200 ${location === '/' ? 'text-white' : ''}`} data-testid="nav-home">
                    Home
                  </a>
                  <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200" data-testid="nav-about" onClick={handleAboutClick}>
                    About
                  </a>
                  <Link href="/awareness">
                    <a className={`text-gray-300 hover:text-white transition-colors duration-200 ${location?.startsWith('/awareness') ? 'text-white' : ''}`} data-testid="nav-awareness">
                      Awareness
                    </a>
                  </Link>
                </div>
                
                {/* Right side - Sign In button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 px-6 py-2.5 rounded-lg font-medium text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  data-testid="nav-login"
                >
                  Sign In / Sign Up
                </button>
              </>
            ) : (
              <>
                {/* Left side - Career and Roadmaps */}
                <div className="flex items-center space-x-8 ml-8">
                  <Link href="/careers">
                    <a className={`text-gray-300 hover:text-white transition-colors duration-200 ${location === '/careers' ? 'text-white' : ''}`} data-testid="nav-careers">
                      Careers
                    </a>
                  </Link>
                  <Link href="/roadmaps">
                    <a className={`text-gray-300 hover:text-white transition-colors duration-200 ${location === '/roadmaps' ? 'text-white' : ''}`} data-testid="nav-roadmaps">
                      Roadmaps
                    </a>
                  </Link>
                  <Link href="/awareness">
                    <a className={`text-gray-300 hover:text-white transition-colors duration-200 ${location?.startsWith('/awareness') ? 'text-white' : ''}`} data-testid="nav-awareness">
                      Awareness
                    </a>
                  </Link>
                </div>
                
                {/* Right side - Quiz and Logout */}
                <div className="flex items-center space-x-6">
                  <Link href="/quiz">
                    <a className="bg-gradient-to-r from-cyan-600 to-green-500 hover:from-cyan-700 hover:to-green-600 px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" data-testid="nav-quiz">
                      Quiz
                    </a>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 transition-colors duration-200 flex items-center"
                    data-testid="nav-logout"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white"
              data-testid="mobile-menu-button"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-16 right-0 w-64 h-full bg-gray-800/95 backdrop-blur-md md:hidden z-40"
            data-testid="mobile-menu"
          >
            <div className="p-4 space-y-4">
              {!isAuthenticated ? (
                <div className="space-y-4">
                  <a href="#home" onClick={handleHomeClick} className="block text-gray-300 hover:text-white transition-colors duration-200 p-3" data-testid="mobile-nav-home">
                    Home
                  </a>
                  <a href="#about" onClick={handleAboutClick} className="block text-gray-300 hover:text-white transition-colors duration-200 p-3" data-testid="mobile-nav-about">
                    About
                  </a>
                  <Link href="/awareness" onClick={closeMobileMenu}>
                    <a className="block text-gray-300 hover:text-white transition-colors duration-200 p-3" data-testid="mobile-nav-awareness">
                      Awareness
                    </a>
                  </Link>
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      closeMobileMenu();
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 px-4 py-2 rounded-lg transition-all duration-200 text-center"
                    data-testid="mobile-nav-login"
                  >
                    Sign In / Sign Up
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Link href="/careers" onClick={closeMobileMenu}>
                    <a className="block text-gray-300 hover:text-white transition-colors duration-200 p-3" data-testid="mobile-nav-careers">
                      Careers
                    </a>
                  </Link>
                  <Link href="/roadmaps" onClick={closeMobileMenu}>
                    <a className="block text-gray-300 hover:text-white transition-colors duration-200 p-3" data-testid="mobile-nav-roadmaps">
                      Roadmaps
                    </a>
                  </Link>
                  <Link href="/awareness" onClick={closeMobileMenu}>
                    <a className="block text-gray-300 hover:text-white transition-colors duration-200 p-3" data-testid="mobile-nav-awareness">
                      Awareness
                    </a>
                  </Link>
                  <Link href="/quiz" onClick={closeMobileMenu}>
                    <a className="block text-gray-300 hover:text-white transition-colors duration-200 p-3" data-testid="mobile-nav-quiz">
                      Quiz
                    </a>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-red-400 hover:text-red-300 transition-colors duration-200 text-left flex items-center p-3"
                    data-testid="mobile-nav-logout"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
      
      {/* Login Modal */}
      <LoginSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
