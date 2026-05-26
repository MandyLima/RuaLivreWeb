import styles from './DashboardPage.module.css';
import Sidebar from '../components/Sidebar/Sidebar';
import StatCard from '../components/StatCard/StatCard';
import DonutChart from '../components/Charts/DonutChart';
import MapWidget from '../components/MapWidget/MapWidget';
import BarChartComponent from '../components/Charts/BarChart';
import type { DashboardStats } from '../types/api.types';
import { useEffect, useState } from 'react';
import dashboardService from '../services/dashboardService';

export default function DashboardPage() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const stats = await dashboardService.getStats(); // ← minúsculo
        setDashboardStats(stats);
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard', error);
      }
    };

    fetchDashboardStats();
  }, []);

  if (!dashboardStats) {
    return <div>Carregando...</div>;
  }

  const PIE_DATA = [
    {
      name: 'Alagamentos Ativos',
      value: dashboardStats.total_alagamentos_ativos,
      color: '#F08E33'
    },
    {
      name: 'Câmeras Ativas',
      value: dashboardStats.total_cameras_ativas,
      color: '#5D9CEC'
    },
    {
      name: 'Alertas Hoje',
      value: dashboardStats.total_alertas_hoje,
      color: '#E74C3C'
    },
    {
      name: 'Bairros Monitorados',
      value: dashboardStats.total_bairros_monitorados,
      color: '#2ECC71'
    },
  ];

  const barData = dashboardStats.alagamentos_por_regiao.map((item) => ({
    name: item.regiao,
    anterior: 0,
    atual: item.quantidade,
  }));

  return (
    <div className={styles.container}>
      <Sidebar/>
      <main className={styles.mainSection}>
        <header className={styles.header}>
          <h1 className={styles.title}>DASHBOARD</h1>
        </header>

        <div className={styles.topGrid}>
          <div className={styles.statCards}>
            <StatCard title="Alagamentos Ativos" value={dashboardStats.total_alagamentos_ativos} />
            <StatCard title="Câmeras Ativas" value={dashboardStats.total_cameras_ativas} />
            <StatCard title="Alertas Hoje" value={dashboardStats.total_alertas_hoje} />
            <StatCard title="Bairros Monitorados" value={dashboardStats.total_bairros_monitorados} />
          </div>
          <DonutChart data={PIE_DATA} /> {/* ← fora do statCards */}
        </div>

        <div className={styles.mapWrapper}>
          <MapWidget />
        </div>

        <div className={styles.barChartCard}>
          <h3 className={styles.chartTitleCenter}>Média dos locais de alagamento</h3>
          <div className={styles.barChartWrapper}>
            <BarChartComponent data={barData} /> {/* ← passando dados reais */}
          </div>
        </div>
      </main>
    </div>
    
  );
}