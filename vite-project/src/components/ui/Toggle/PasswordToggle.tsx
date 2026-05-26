import { FiEye, FiEyeOff } from 'react-icons/fi';
import styles from './PasswordToggle.module.css';

interface PasswordToggleProps {
  mostrar: boolean;
  onClick: () => void;
}

export default function PasswordToggle({ mostrar, onClick }: PasswordToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.toggleBtn}
      aria-label={mostrar ? 'Ocultar senha' : 'Mostrar senha'}
    >
      {mostrar ? <FiEyeOff size={20} /> : <FiEye size={20} />}
    </button>
  );
}