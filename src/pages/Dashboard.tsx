import { useFootprint } from '../context/FootprintContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export const Dashboard = () => {
  const { emissions } = useFootprint();

  const data = [
    { name: 'Transport', value: emissions.transport, color: '#3b82f6' },
    { name: 'Diet', value: emissions.diet, color: '#10b981' },
    { name: 'Energy', value: emissions.energy, color: '#f59e0b' },
  ];

  const formatValue = (value: number) => `${Math.round(value)} kg CO₂`;

  return (
    <div className="container main-content animate-fade-in delay-100">
      <div className="text-center mb-8">
        <h2>Your Impact Dashboard</h2>
        <p>Total Annual Emissions: <strong className="text-accent">{Math.round(emissions.total)} kg CO₂</strong></p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-panel" style={{ height: '400px' }}>
          <h3 className="text-center mb-4">Emissions Breakdown</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Tooltip formatter={(value: any) => formatValue(Number(value))} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel">
          <h3 className="mb-4">Actionable Steps</h3>
          <ul style={{ listStyle: 'none', padding: 0 }} className="flex flex-col gap-4">
            <li className="glass-panel" style={{ padding: '1rem' }}>
              <strong>🚗 Transport:</strong> Reduce driving by 10% to save ~{(emissions.transport * 0.1).toFixed(0)} kg CO₂ annually.
            </li>
            <li className="glass-panel" style={{ padding: '1rem' }}>
              <strong>🥗 Diet:</strong> Consider a plant-based meal twice a week to lower dietary impact.
            </li>
            <li className="glass-panel" style={{ padding: '1rem' }}>
              <strong>💡 Energy:</strong> Switch to LED bulbs and unplug unused appliances to cut energy emissions by up to 15%.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
