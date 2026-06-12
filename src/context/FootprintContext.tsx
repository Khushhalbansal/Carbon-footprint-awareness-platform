import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface FootprintData {
  transport: number; // miles driven per week
  diet: 'vegan' | 'vegetarian' | 'omnivore' | 'meat-heavy';
  energy: number; // electricity bill in USD per month
}

export interface Emissions {
  transport: number;
  diet: number;
  energy: number;
  total: number;
}

interface FootprintContextType {
  data: FootprintData;
  emissions: Emissions;
  updateData: (newData: Partial<FootprintData>) => void;
}

const defaultData: FootprintData = {
  transport: 100,
  diet: 'omnivore',
  energy: 100,
};

// Very basic calculation formulas for demonstration
const calculateEmissions = (data: FootprintData): Emissions => {
  // Transport: ~0.4 kg CO2 per mile
  const transport = data.transport * 0.4 * 52; 
  
  // Diet: kg CO2 per year
  const dietFactors = {
    'vegan': 1500,
    'vegetarian': 1700,
    'omnivore': 2500,
    'meat-heavy': 3300
  };
  const diet = dietFactors[data.diet];

  // Energy: ~$0.13 per kWh, ~0.4 kg CO2 per kWh -> approx 3kg per $1 (rough estimate) * 12 months
  const energy = data.energy * 3 * 12;

  return {
    transport,
    diet,
    energy,
    total: transport + diet + energy
  };
};

const FootprintContext = createContext<FootprintContextType | undefined>(undefined);

export const FootprintProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FootprintData>(defaultData);

  const updateData = (newData: Partial<FootprintData>) => {
    setData((prev: FootprintData) => ({ ...prev, ...newData }));
  };

  const emissions = calculateEmissions(data);

  return (
    <FootprintContext.Provider value={{ data, emissions, updateData }}>
      {children}
    </FootprintContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFootprint = () => {
  const context = useContext(FootprintContext);
  if (context === undefined) {
    throw new Error('useFootprint must be used within a FootprintProvider');
  }
  return context;
};
