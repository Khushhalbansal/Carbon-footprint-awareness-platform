import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="container main-content animate-fade-in text-center" style={{ paddingTop: '8rem' }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p className="mt-4 mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <button className="btn btn-primary" onClick={() => navigate('/')}>
        Go to Homepage
      </button>
    </div>
  );
};
