import styles from './DashboardPage.module.css';
import Sidebar from '../components/Sidebar/Sidebar';
import StatCard from '../components/StatCard/StatCard';
import DonutChart from '../components/Charts/DonutChart';
import MapWidget from '../components/MapWidget/MapWidget';
import BarChartComponent from '../components/Charts/BarChart';

const PIE_DATA = [
  { name: 'Alagamentos', value: 10, color: '#ff4d4d' },
  { name: 'Poucos afetados', value: 40, color: '#ffcc00' },
  { name: 'Não afetados', value: 50, color: '#a55eea' },
];

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainSection}>
        <header className={styles.header}>
          <h1 className={styles.title}>DASHBOARD</h1>
        </header>

        <div className={styles.topGrid}>
          <StatCard title="Bairros Alagados:" value={15} />
          <DonutChart data={PIE_DATA} />
        </div>

        <div className={styles.mapWrapper}>
          <MapWidget />
        </div>

        <div className={styles.barChartCard}>
          <h3 className={styles.chartTitleCenter}>Média dos locais de alagamento</h3>
          <div className={styles.barChartWrapper}>
            <BarChartComponent />
          </div>
        </div>
      </main>
    </div>
  );
}