import styles from './style/StatItem.module.css';
const StatItem = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className={styles.statItem}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
};

export default StatItem;
