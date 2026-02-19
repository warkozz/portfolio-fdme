import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// Navigation items with icons
const navItems = [
  { 
    path: '/', 
    label: 'Accueil', 
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  { 
    path: '/about', 
    label: 'À propos', 
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  { 
    path: '/projects', 
    label: 'Projets', 
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
      </svg>
    )
  },
  { 
    path: '/veille', 
    label: 'Veille', 
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  { 
    path: '/technologies', 
    label: 'Technologies', 
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  { 
    path: '/cv', 
    label: 'CV', 
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  { 
    path: '/contact', 
    label: 'Contact', 
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
];

const navLinkClass = ({ isActive }) =>
  `group relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
    isActive
      ? 'text-primary-700 dark:text-primary-400'
      : 'text-gray-700 hover:text-primary-700 dark:text-gray-300 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
  }`;

// Desktop Navigation Item Component
const DesktopNavItem = React.memo(({ item }) => (
  <NavLink to={item.path} className={navLinkClass}>
    {({ isActive }) => (
      <>
        {item.icon}
        <span>{item.label}</span>
        {isActive && (
          <>
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></span>
            <span className="sr-only">(page actuelle)</span>
          </>
        )}
      </>
    )}
  </NavLink>
));
DesktopNavItem.displayName = 'DesktopNavItem';

// Mobile Navigation Item Component
const MobileNavItem = React.memo(({ item, index, mobileOpen }) => (
  <NavLink 
    to={item.path} 
    className={navLinkClass}
    style={{ 
      transitionDelay: mobileOpen ? `${index * 30}ms` : '0ms' 
    }}
  >
    {({ isActive }) => (
      <>
        {item.icon}
        <span>{item.label}</span>
        {isActive && (
          <>
            <span className="ml-auto">
              <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="sr-only">(page actuelle)</span>
          </>
        )}
      </>
    )}
  </NavLink>
));
MobileNavItem.displayName = 'MobileNavItem';

// Theme Toggle Button Component
const ThemeToggleButton = React.memo(({ dark, onToggle }) => (
  <button
    aria-label={dark ? "Activer le mode clair" : "Activer le mode sombre"}
    onClick={onToggle}
    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
  >
    <div className="relative w-5 h-5">
      <div className={`absolute inset-0 transition-all duration-300 ${dark ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M21.64 13A9 9 0 1 1 11 2.36a7 7 0 1 0 10.66 10.64Z"/>
        </svg>
      </div>
      <div className={`absolute inset-0 transition-all duration-300 ${dark ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm10 7h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM3 12H2a1 1 0 1 1 0-2h1a1 1 0 0 1 0 2Zm15.66 7.66a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 1 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41ZM7.46 6.05a1 1 0 0 1-1.41 0l-.71-.71A1 1 0 1 1 6.75 3.93l.71.71a1 1 0 0 1 0 1.41ZM4.34 19.66a1 1 0 0 1 0-1.41l.71-.71A1 1 0 1 1 6.46 19l-.71.71a1 1 0 0 1-1.41 0Zm13.31-13.31a1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1-1.41 0Z"/>
        </svg>
      </div>
    </div>
  </button>
));
ThemeToggleButton.displayName = 'ThemeToggleButton';

// Mobile Menu Button Component
const MobileMenuButton = React.memo(({ mobileOpen, onToggle }) => (
  <button
    type="button"
    className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
    aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
    aria-expanded={mobileOpen}
    aria-controls="mobile-nav"
    onClick={onToggle}
  >
    <div className="relative w-5 h-5">
      <div className={`absolute inset-0 transition-all duration-300 ${mobileOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
        </svg>
      </div>
      <div className={`absolute inset-0 transition-all duration-300 ${mobileOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  </button>
));
MobileMenuButton.displayName = 'MobileMenuButton';

const Header = ({ dark, toggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);

  // Memoized handlers for performance
  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((o) => !o);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [mobileOpen]);

  // Handle ESC key and click outside to close mobile menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        closeMobileMenu();
      }
    };

    const handleClickOutside = (e) => {
      if (mobileOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        // Check if click is not on the burger button
        const burgerButton = document.querySelector('[aria-controls="mobile-nav"]');
        if (burgerButton && !burgerButton.contains(e.target)) {
          closeMobileMenu();
        }
      }
    };

    if (mobileOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileOpen, closeMobileMenu]);

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container max-w-6xl flex items-center justify-between py-3">
        <div className="flex items-center gap-3 group">
          <div className="relative">
            <img 
              src="/logo.png" 
              alt="Rayane Portfolio" 
              className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700 transition-transform duration-300 group-hover:scale-110 group-hover:ring-primary-500"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className="text-sm font-semibold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Rayane Portfolio
          </span>
        </div>
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <DesktopNavItem key={item.path} item={item} />
          ))}
          <NavLink to="/admin" className={navLinkClass}>
            {({ isActive }) => (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="hidden lg:inline">Admin</span>
                {isActive && (
                  <>
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></span>
                    <span className="sr-only">(page actuelle)</span>
                  </>
                )}
              </>
            )}
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggleButton dark={dark} onToggle={toggleTheme} />
          <MobileMenuButton mobileOpen={mobileOpen} onToggle={toggleMobileMenu} />
        </div>
      </div>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-black/40 md:hidden z-20 backdrop-blur-sm"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
      {/* Mobile navigation panel with slide animation */}
      <div 
        ref={mobileMenuRef}
        id="mobile-nav" 
        className={`md:hidden border-t border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 ease-in-out relative z-20 ${
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container max-w-6xl py-2 flex flex-col gap-1 bg-white dark:bg-gray-900">
          {navItems.map((item, index) => (
            <MobileNavItem 
              key={item.path} 
              item={item} 
              index={index} 
              mobileOpen={mobileOpen} 
            />
          ))}
          <div className="my-1 border-t border-gray-200 dark:border-gray-700"></div>
          <NavLink 
            to="/admin" 
            className={navLinkClass}
            style={{ 
              transitionDelay: mobileOpen ? `${navItems.length * 30}ms` : '0ms' 
            }}
          >
            {({ isActive }) => (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Admin</span>
                <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">
                  Privé
                </span>
                {isActive && (
                  <>
                    <span className="ml-2">
                      <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="sr-only">(page actuelle)</span>
                  </>
                )}
              </>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
