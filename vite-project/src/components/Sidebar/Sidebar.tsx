import { LayoutDashboard, Map as MapIcon, BarChart2, User, LogOut } from 'lucide-react';
import authService from '../../services/authService';
import styles from './Sidebar.module.css';

export default function Sidebar() {
<<<<<<< HEAD
  const getName = (): string => {
  const token = localStorage.getItem('token');
  if (!token) return 'Usuario';
=======
  const nome = authService.getUserName();
>>>>>>> c24df17 (feat: refactor Sidebar to use authService for user name retrieval and improve display logic)

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Rua Livre</div>

      <nav className={styles.nav}>
        <div className={styles.menuItem}><LayoutDashboard className={styles.icon}/> Menu</div>
        <div className={styles.menuItem}><MapIcon className={styles.icon}/> Mapa</div>
        <div className={styles.menuItem}><BarChart2 className={styles.icon}/> Média</div>
      </nav>

      <div className={styles.footer}>
<<<<<<< HEAD
        <div className={styles.userAction}><User className={styles.icon} />Oi, {getName()}</div>
=======
        <div className={styles.userAction}><User className={styles.icon}/> Oi, {nome?.split('@')[0]}</div>
>>>>>>> c24df17 (feat: refactor Sidebar to use authService for user name retrieval and improve display logic)
        <div className={styles.userAction}><LogOut className={styles.icon}/> LOGOUT</div>
      </div>
    </aside>
  );
}