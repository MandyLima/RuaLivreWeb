import styles from './StatCard.module.css';

type Props = { title: string; value: number | string; };

export default function StatCard({ title, value }: Props) {
  return (
    <div className={styles.statCard}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <span className={styles.bigNumber}>{value}</span>
    </div>
  );
}