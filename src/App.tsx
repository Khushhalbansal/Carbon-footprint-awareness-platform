import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FootprintProvider } from './context/FootprintContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Calculator } from './pages/Calculator';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <FootprintProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </FootprintProvider>
    </ThemeProvider>
  );
}

export default App;
