import { useMemo } from 'react';

interface PieChartProps {
  data: { name: string; value: number; color: string }[];
}

export const PieChart = ({ data }: PieChartProps) => {
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);

  const slices = useMemo(() => {
    if (total === 0) return [];
    
    let currentAngle = 0;
    
    return data.map((item) => {
      const percentage = item.value / total;
      const angle = percentage * 360;
      
      // Calculate start and end coordinates
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      // Convert angles to radians and calculate SVG coordinates (assuming radius 1, center 0,0)
      const startX = Math.cos((startAngle - 90) * Math.PI / 180);
      const startY = Math.sin((startAngle - 90) * Math.PI / 180);
      const endX = Math.cos((endAngle - 90) * Math.PI / 180);
      const endY = Math.sin((endAngle - 90) * Math.PI / 180);

      const largeArcFlag = percentage > 0.5 ? 1 : 0;

      // Create SVG path data
      // For a donut chart, we draw an outer arc, line to inner arc, inner arc back, and close
      const outerRadius = 1;
      const innerRadius = 0.6; // Creates the donut hole

      const startXOuter = startX * outerRadius;
      const startYOuter = startY * outerRadius;
      const endXOuter = endX * outerRadius;
      const endYOuter = endY * outerRadius;

      const startXInner = startX * innerRadius;
      const startYInner = startY * innerRadius;
      const endXInner = endX * innerRadius;
      const endYInner = endY * innerRadius;

      const pathData = [
        `M ${startXOuter} ${startYOuter}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endXOuter} ${endYOuter}`,
        `L ${endXInner} ${endYInner}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startXInner} ${startYInner}`,
        'Z'
      ].join(' ');

      return {
        ...item,
        pathData,
        percentage
      };
    });
  }, [data, total]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-6">
      {total > 0 ? (
        <svg viewBox="-1.2 -1.2 2.4 2.4" style={{ width: '100%', maxHeight: '250px', overflow: 'visible' }}>
          {slices.map((slice, i) => (
            <g key={i}>
              <path 
                d={slice.pathData} 
                fill={slice.color} 
                className="transition-all duration-300 hover:opacity-80"
                style={{ transformOrigin: 'center', transform: 'scale(1)' }}
              >
                <title>{`${slice.name}: ${Math.round(slice.value)} kg CO₂ (${Math.round(slice.percentage * 100)}%)`}</title>
              </path>
            </g>
          ))}
        </svg>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          No emissions data available
        </div>
      )}
      
      <div className="flex flex-wrap justify-center gap-4 mt-4 w-full">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
