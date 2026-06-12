import { NavLink } from 'react-router-dom';
import { Leaf, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="container w-full flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>
          <Leaf className="text-accent" size={28} />
          <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>EcoTrack</span>
        </NavLink>
        
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/calculator" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Calculator
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Dashboard
          </NavLink>
        </div>

        <button 
          onClick={toggleTheme} 
          className="btn-icon"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </nav>
  );
};
