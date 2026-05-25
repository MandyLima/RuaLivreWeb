import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styles from './DonutChart.module.css';

type Props = {
  data: { name: string; value: number; color: string }[];
};

export default function DonutChart({ data }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const active = activeIndex !== null ? data[activeIndex] : null;

  return (
    <div className={styles.donutCard}>
      <div className={styles.legend}>
        {data.map((item, index) => (
          <div
            key={item.name}
            className={`${styles.legendItem} ${activeIndex === index ? styles.active : ''}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className={styles.dot} style={{ backgroundColor: item.color }} />
            <span className={styles.legendText}>{item.name}</span>
            <span className={styles.legendValue}>{item.value}%</span>
          </div>
        ))}
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={55}
              outerRadius={75}
              dataKey="value"
              stroke="none"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.3}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>

        <div className={styles.chartCenter}>
          <div className={styles.chartCenterValue}>
            {active ? `${active.value}%` : `${total}%`}
          </div>
          <div className={styles.chartCenterLabel}>
            {active ? active.name.split(' ')[0] : 'Total'}
          </div>
        </div>
      </div>
    </div>
  );
}