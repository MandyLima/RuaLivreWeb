import styles from './DashboardPage.module.css';
import Sidebar from '../components/Sidebar/Sidebar';
import StatCard from '../components/StatCard/StatCard';
import DonutChart from '../components/Charts/DonutChart';
import MapWidget from '../components/MapWidget/MapWidget';
import BarChartComponent from '../components/Charts/BarChart';
import type { DashboardStats, Historico } from '../types/api.types';
import { useEffect, useState } from 'react';
import dashboardService from '../services/dashboardService';
import api from '../services/api';

export default function DashboardPage() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [mediaData, setMediaData] = useState<{ name: string; media: number }[]>([]);
  const [historico, setHistorico] = useState<Historico[]>([]);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const stats = await dashboardService.getStats();
        setDashboardStats(stats);
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard', error);
      }
    };

    const fetchMediaPorRegiao = async () => {
      try {
        const res = await api.get('/dashboard/alagamento/media-por-regiao');
        const formatted = res.data.map((item: any) => ({
          name: item.nome,
          media: item.media,
        }));
        setMediaData(formatted);
      } catch (error) {
        console.error('Erro ao buscar média por região', error);
      }
      dashboardService.getHistorico(30)
        .then(data => setHistorico(data.historico ?? data))
        .catch(console.error);
    };

    fetchDashboardStats();
    fetchMediaPorRegiao();
  }, []);

  if (!dashboardStats) {
    return <div>Carregando...</div>;
  }

  const PIE_DATA = [
    { name: 'Alagamentos Ativos', value: dashboardStats.total_alagamentos_ativos, color: '#F08E33' },
    { name: 'Câmeras Ativas', value: dashboardStats.total_cameras_ativas, color: '#5D9CEC' },
    { name: 'Alertas Hoje', value: dashboardStats.total_alertas_hoje, color: '#E74C3C' },
    { name: 'Bairros Monitorados', value: dashboardStats.total_bairros_monitorados, color: '#2ECC71' },
  ];

  const historicoOrdenado = [...historico].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainSection}>
        <header className={styles.header}>
          <h1 className={styles.title}>DASHBOARD</h1>
        </header>

        <div id="menu" className={styles.topGrid}>
          <div className={styles.statCards}>
            <StatCard title="Alagamentos Ativos" value={dashboardStats.total_alagamentos_ativos} />
            <StatCard title="Câmeras Ativas" value={dashboardStats.total_cameras_ativas} />
            <StatCard title="Alertas Hoje" value={dashboardStats.total_alertas_hoje} />
            <StatCard title="Bairros Monitorados" value={dashboardStats.total_bairros_monitorados} />
          </div>
          <DonutChart data={PIE_DATA} />
        </div>

        <div id="mapa" className={styles.mapWrapper}>
          <MapWidget />
        </div>

        <div id="media" className={styles.barChartCard}>
          <h3 className={styles.chartTitleCenter}>Média dos locais de alagamento</h3>
          <div className={styles.barChartWrapper}>
            <BarChartComponent data={mediaData} />
          </div>
        </div>

        <div id="historico" className={styles.historyCard}>
          <h3 className={styles.chartTitleCenter}>Histórico de Registros</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Data</th>
                  <th className={styles.textRight}>Nível da Água</th>
                  <th className={styles.textRight}>Risco</th>
                </tr>
              </thead>
              <tbody>
                {historicoOrdenado.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', padding: '20px', color: '#6B7280' }}>
                      Nenhum registro encontrado
                    </td>
                  </tr>
                ) : (
                  historicoOrdenado.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {new Date(item.data).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </td>
                      <td className={styles.textRight}>{item.total_ocorrencias ?? '-'}</td>
                      <td className={styles.textRight}>{item.nivel_agua_medio ?? '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}