import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Leaf, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <nav className="navbar" aria-label="Main Navigation">
        <div className="container w-full flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>
          <Leaf className="text-accent" size={28} />
          <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>EcoTrack</span>
        </NavLink>
        
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/calculator" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
            Calculator
          </NavLink>
          <NavLink to="/learn" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
            Learn
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
            Dashboard
          </NavLink>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme} 
            className="btn-icon"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button 
            className="btn-icon menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </nav>
    </>
  );
};
