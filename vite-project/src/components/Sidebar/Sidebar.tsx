import { useState } from 'react';
import { LayoutDashboard, Map as MapIcon, BarChart2, History, User, LogOut } from 'lucide-react';
import authService from '../../services/authService';
import styles from './Sidebar.module.css';
import SettingsPage from '../../pages/SettingsPage';

export default function Sidebar() {
  const nome = authService.getUserName();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Rua Livre</div>

        <nav className={styles.nav}>
          <div className={styles.menuItem} onClick={() => scrollTo('menu')} style={{ cursor: 'pointer' }}>
            <LayoutDashboard className={styles.icon} /> Menu
          </div>
          <div className={styles.menuItem} onClick={() => scrollTo('mapa')} style={{ cursor: 'pointer' }}>
            <MapIcon className={styles.icon} /> Mapa
          </div>
          <div className={styles.menuItem} onClick={() => scrollTo('media')} style={{ cursor: 'pointer' }}>
            <BarChart2 className={styles.icon} /> Média
          </div>
          <div className={styles.menuItem} onClick={() => scrollTo('historico')} style={{ cursor: 'pointer' }}>
            <History className={styles.icon} /> Histórico
          </div>
        </nav>

        <div className={styles.footer}>
          <div className={styles.userAction} onClick={() => setShowProfile(true)} style={{ cursor: 'pointer' }}>
            <User className={styles.icon} /> Oi, {nome?.split('@')[0] ?? 'Usuário'}
          </div>
          <div className={styles.userAction} onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <LogOut className={styles.icon} /> LOGOUT
          </div>
        </div>
      </aside>

      {showProfile && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setShowProfile(false)}
        >
          <div onClick={e => e.stopPropagation()}>
            <SettingsPage onClose={() => setShowProfile(false)} />
          </div>
        </div>
      )}
    </>
  );
}