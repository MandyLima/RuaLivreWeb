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
import { LayoutDashboard, Map as MapIcon, BarChart2, History } from 'lucide-react';

type MobileTab = 'inicio' | 'mapa' | 'dados' | 'historico';

export default function DashboardPage() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [mediaData, setMediaData] = useState<{ name: string; media: number }[]>([]);
  const [historico, setHistorico] = useState<Historico[]>([]);
  const [activeTab, setActiveTab] = useState<MobileTab>('inicio');

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
    return <div className={styles.loading}>Carregando...</div>;
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

  //mobile
  const renderMobileContent = () => {
    switch (activeTab) {
      case 'mapa':
        return (
          <div style={{ height: 'calc(100vh - 64px)', marginTop: '-16px', marginLeft: '-16px', marginRight: '-16px' }}>
            <MapWidget />
          </div>
        );
      case 'dados':
        return (
          <>
            <div id="menu" className={styles.topGrid}>
              <div className={styles.statCards}>
                <StatCard title="Alagamentos Ativos" value={dashboardStats.total_alagamentos_ativos} />
                <StatCard title="Câmeras Ativas" value={dashboardStats.total_cameras_ativas} />
                <StatCard title="Alertas Hoje" value={dashboardStats.total_alertas_hoje} />
                <StatCard title="Bairros Monitorados" value={dashboardStats.total_bairros_monitorados} />
              </div>
              <DonutChart data={PIE_DATA} />
            </div>
            <div id="media" className={styles.barChartCard}>
              <h3 className={styles.chartTitleCenter}>Média dos locais de alagamento</h3>
              <div className={styles.barChartWrapper}>
                <BarChartComponent data={mediaData} />
              </div>
            </div>
          </>
        );
      case 'historico':
        return (
          <div id="historico" className={styles.historyCard}>
            <h3 className={styles.chartTitleCenter}>Histórico de Registros</h3>
            <div className={styles.tableWrapper}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th className={styles.textRight}>Ocorrências</th>
                    <th className={styles.textRight}>Nível Médio</th>
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
                        <td>{new Date(item.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                        <td className={styles.textRight}>{item.total_ocorrencias ?? '-'}</td>
                        <td className={styles.textRight}>{item.nivel_agua_medio ?? '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      default: 
        return (
          <>
            <div id="menu" className={styles.topGrid}>
              <div className={styles.statCards}>
                <StatCard title="Alagamentos Ativos" value={dashboardStats.total_alagamentos_ativos} />
                <StatCard title="Câmeras Ativas" value={dashboardStats.total_cameras_ativas} />
                <StatCard title="Alertas Hoje" value={dashboardStats.total_alertas_hoje} />
                <StatCard title="Bairros Monitorados" value={dashboardStats.total_bairros_monitorados} />
              </div>
              <DonutChart data={PIE_DATA} />
            </div>
          </>
        );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebarWrapper}>
        <Sidebar />
      </div>

      <main className={styles.mainSection}>
        <header className={styles.header}>
          <h1 className={styles.title}>DASHBOARD</h1>
        </header>

        <div className={styles.desktopContent}>
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
                    <th className={styles.textRight}>Ocorrências</th>
                    <th className={styles.textRight}>Nível Médio</th>
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
                        <td>{new Date(item.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                        <td className={styles.textRight}>{item.total_ocorrencias ?? '-'}</td>
                        <td className={styles.textRight}>{item.nivel_agua_medio ?? '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className={styles.mobileContent}>
          {renderMobileContent()}
        </div>
      </main>

      <nav className={styles.bottomNav}>
        <button
          className={`${styles.bottomNavItem} ${activeTab === 'inicio' ? styles.active : ''}`}
          onClick={() => setActiveTab('inicio')}
        >
          <LayoutDashboard />
          Início
        </button>
        <button
          className={`${styles.bottomNavItem} ${activeTab === 'mapa' ? styles.active : ''}`}
          onClick={() => setActiveTab('mapa')}
        >
          <MapIcon />
          Mapa
        </button>
        <button
          className={`${styles.bottomNavItem} ${activeTab === 'dados' ? styles.active : ''}`}
          onClick={() => setActiveTab('dados')}
        >
          <BarChart2 />
          Dados
        </button>
        <button
          className={`${styles.bottomNavItem} ${activeTab === 'historico' ? styles.active : ''}`}
          onClick={() => setActiveTab('historico')}
        >
          <History />
          Histórico
        </button>
      </nav>
    </div>
  );
}