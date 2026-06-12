import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFootprint } from '../context/FootprintContext';

export const Calculator = () => {
  const { data, updateData } = useFootprint();
  const navigate = useNavigate();
  
  const [localData, setLocalData] = useState(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateData(localData);
    navigate('/dashboard');
  };

  return (
    <div className="container main-content animate-fade-in">
      <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 className="text-center mb-8">Footprint Calculator</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="transport">Miles Driven Per Week</label>
            <input 
              type="number" 
              id="transport" 
              min="0"
              value={localData.transport}
              onChange={(e) => setLocalData({ ...localData, transport: Number(e.target.value) })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="diet">Dietary Preference</label>
            <select 
              id="diet" 
              value={localData.diet}
              onChange={(e) => setLocalData({ ...localData, diet: e.target.value as any })}
            >
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="omnivore">Omnivore</option>
              <option value="meat-heavy">Meat-Heavy</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="energy">Monthly Electricity Bill ($)</label>
            <input 
              type="number" 
              id="energy" 
              min="0"
              value={localData.energy}
              onChange={(e) => setLocalData({ ...localData, energy: Number(e.target.value) })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Calculate Impact
          </button>
        </form>
      </div>
    </div>
  );
};
