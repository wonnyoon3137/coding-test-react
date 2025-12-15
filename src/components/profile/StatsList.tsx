import styles from './style/StatList.module.css';

const StatsList = ({ children }: { children: React.ReactNode }) => {
  return <section className={styles.statsSection}>{children}</section>;
};

export default StatsList;
