import { LayoutDashboard, Map as MapIcon, BarChart2, User, LogOut } from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Rua Livre</div>

      <nav className={styles.nav}>
        <div className={styles.menuItem}><LayoutDashboard size={20} /> Menu</div>
        <div className={styles.menuItem}><MapIcon size={20} /> Mapa</div>
        <div className={styles.menuItem}><BarChart2 size={20} /> Média</div>
      </nav>

      <div className={styles.footer}>
        <div className={styles.userAction}><User size={18} /> USER</div>
        <div className={styles.userAction}><LogOut size={18} /> LOGOUT</div>
      </div>
    </aside>
  );
}