import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FootprintProvider } from './context/FootprintContext';
import { Navbar } from './components/Navbar';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Calculator = lazy(() => import('./pages/Calculator').then(m => ({ default: m.Calculator })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));

function App() {
  return (
    <ThemeProvider>
      <FootprintProvider>
        <Router>
          <Navbar />
          <Suspense fallback={<div className="container main-content text-center" style={{ padding: '4rem 0' }}>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Suspense>
        </Router>
      </FootprintProvider>
    </ThemeProvider>
  );
}

export default App;
