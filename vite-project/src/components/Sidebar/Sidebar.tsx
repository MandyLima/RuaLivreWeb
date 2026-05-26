import { LayoutDashboard, Map as MapIcon, BarChart2, User, LogOut } from 'lucide-react';
import authService from '../../services/authService';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const getName = (): string => {
  const token = localStorage.getItem('token');
  if (!token) return 'Usuario';

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const email = payload.sub || payload.email || '';
    const nome = email.split('@')[0].replace(/[._]/g, ' ');
    return nome.charAt(0).toUpperCase() + nome.slice(1) || 'Usuário';
  } catch {
    return 'Usuário';
  }
}
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Rua Livre</div>

      <nav className={styles.nav}>
        <div className={styles.menuItem}><LayoutDashboard className={styles.icon}/> Menu</div>
        <div className={styles.menuItem}><MapIcon className={styles.icon}/> Mapa</div>
        <div className={styles.menuItem}><BarChart2 className={styles.icon}/> Média</div>
      </nav>

      <div className={styles.footer}>
        <div className={styles.userAction}><User className={styles.icon} />Oi, {getName()}</div>
        <div className={styles.userAction}><LogOut className={styles.icon}/> LOGOUT</div>
      </div>
    </aside>
  );
}