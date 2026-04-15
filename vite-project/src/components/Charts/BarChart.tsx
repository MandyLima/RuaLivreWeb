import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './BarChart.module.css';

const DEFAULT_DATA = [
  { name: 'Ponto 1', anterior: 15, atual: 18 },
  { name: 'Ponto 2', anterior: 16, atual: 19 },
  { name: 'Ponto 3', anterior: 18, atual: 21 },
  { name: 'Ponto 4', anterior: 20, atual: 24 },
  { name: 'Ponto 5', anterior: 22, atual: 26 },
];

type Props = {
  data?: { name: string; anterior: number; atual: number }[];
};

export default function BarChartComponent({ data }: Props) {
  const chartData = data && data.length > 0 ? data : DEFAULT_DATA;

  return (
    <div className={styles.fullWidthHeight}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            hide={false} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
          />
          <Bar dataKey="anterior" fill="#5D9CEC" radius={[4, 4, 0, 0]} barSize={30} />
          <Bar dataKey="atual" fill="#F08E33" radius={[4, 4, 0, 0]} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}