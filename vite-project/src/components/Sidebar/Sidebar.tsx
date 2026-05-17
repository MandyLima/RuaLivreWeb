import { LayoutDashboard, Map as MapIcon, BarChart2, User, LogOut } from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Rua Livre</div>

      <nav className={styles.nav}>
        <div className={styles.menuItem}><LayoutDashboard className={styles.icon}/> Menu</div>
        <div className={styles.menuItem}><MapIcon className={styles.icon}/> Mapa</div>
        <div className={styles.menuItem}><BarChart2 className={styles.icon}/> Média</div>
      </nav>

      <div className={styles.footer}>
        <div className={styles.userAction}><User className={styles.icon}/> USER</div>
        <div className={styles.userAction}><LogOut className={styles.icon}/> LOGOUT</div>
      </div>
    </aside>
  );
}