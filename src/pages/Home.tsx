import { useNavigate } from 'react-router-dom';
import { ArrowRight, Activity, Globe, Zap } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container main-content animate-fade-in">
      <div className="text-center" style={{ padding: '4rem 0' }}>
        <h1 className="mb-4">Measure. Understand. Reduce.</h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Take the first step towards a sustainable future. Calculate your carbon footprint 
          and discover actionable ways to minimize your environmental impact.
        </p>
        <button 
          className="btn btn-primary" 
          onClick={() => navigate('/calculator')}
          aria-label="Start calculating your footprint"
        >
          Calculate Your Footprint <ArrowRight size={20} />
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-8 delay-200 animate-fade-in">
        <div className="glass-panel text-center">
          <div className="flex justify-center mb-4 text-accent">
            <Activity size={48} />
          </div>
          <h3>Track Emissions</h3>
          <p>Accurately measure your carbon output from transport, diet, and household energy.</p>
        </div>
        
        <div className="glass-panel text-center delay-300">
          <div className="flex justify-center mb-4 text-accent">
            <Globe size={48} />
          </div>
          <h3>Global Impact</h3>
          <p>See how your daily choices compare globally and learn the real impact of your habits.</p>
        </div>
        
        <div className="glass-panel text-center delay-300">
          <div className="flex justify-center mb-4 text-accent">
            <Zap size={48} />
          </div>
          <h3>Actionable Insights</h3>
          <p>Get personalized, high-impact recommendations to lower your footprint efficiently.</p>
        </div>
      </div>
    </div>
  );
};
