import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FootprintProvider } from './context/FootprintContext';
import { Navbar } from './components/Navbar';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CookieConsent } from './components/CookieConsent';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Calculator = lazy(() => import('./pages/Calculator').then(m => ({ default: m.Calculator })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));
const EducationalHub = lazy(() => import('./pages/EducationalHub').then(m => ({ default: m.EducationalHub })));

function App() {
  return (
    <ThemeProvider>
      <FootprintProvider>
        <Router>
          <Navbar />
          <main id="main-content">
            <ErrorBoundary>
              <Suspense fallback={<div className="container main-content text-center" style={{ padding: '4rem 0' }}>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/calculator" element={<Calculator />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/learn" element={<EducationalHub />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>
          <footer className="container text-center" style={{ padding: '2rem 0', opacity: 0.7, borderTop: '1px solid var(--glass-border)', marginTop: '2rem' }}>
            <p>&copy; {new Date().getFullYear()} EcoTrack. All rights reserved.</p>
          </footer>
          <CookieConsent />
        </Router>
      </FootprintProvider>
    </ThemeProvider>
  );
}

export default App;
