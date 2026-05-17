import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from './DonutChart.module.css';

type Props = {
  data: { name: string; value: number; color: string }[];
};

export default function DonutChart({ data }: Props) {
  return (
    <div className={styles.donutCard}>
      <div className={styles.legend}>
        {data.map((item) => (
          <div key={item.name} className={styles.legendItem}>
            <div className={styles.dot} style={{ backgroundColor: item.color }} />
            <span className={styles.legendText}>{item.value}% {item.name}</span>
          </div>
        ))}
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={40} outerRadius={55} dataKey="value" stroke="none">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}