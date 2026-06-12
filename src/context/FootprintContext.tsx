import { createContext, useContext, useState, useMemo, useCallback } from 'react';
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

const LOCAL_STORAGE_KEY = 'ecotrack_footprint_data';

const getInitialData = (): FootprintData => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e: unknown) {
    console.error('Failed to load from local storage', e instanceof Error ? e.message : String(e));
  }
  return defaultData;
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
  const [data, setData] = useState<FootprintData>(getInitialData);

  const updateData = useCallback((newData: Partial<FootprintData>) => {
    setData((prev: FootprintData) => {
      const updated = { ...prev, ...newData };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (e: unknown) {
        console.error('Failed to save to local storage', e instanceof Error ? e.message : String(e));
      }
      return updated;
    });
  }, []);

  const emissions = useMemo(() => calculateEmissions(data), [data]);

  const value = useMemo(() => ({ data, emissions, updateData }), [data, emissions, updateData]);

  return (
    <FootprintContext.Provider value={value}>
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
