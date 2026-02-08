import styles from './Dashboard.module.css';

/**
 * Premium Dashboard Card Component
 * @param {string} title - Card title
 * @param {string|number} value - Main stat value
 * @param {string} subtitle - Optional subtitle
 * @param {React.Element} icon - Ant Design icon component
 * @param {string} variant - Color variant (blue, purple, orange, green)
 * @param {object} trend - Trend data {direction: 'up'|'down', value: '12%'}
 */
export default function DashboardCard({
  title,
  value,
  subtitle,
  icon = "📊",
  variant = "blue",
  trend
}) {
  const variantClass = {
    blue: styles.statCardBlue,
    purple: styles.statCardPurple,
    orange: styles.statCardOrange,
    green: styles.statCardGreen,
  }[variant] || styles.statCardBlue;

  return (
    <div className={`${styles.statCard} ${variantClass}`}>
      <div className={styles.statCardHeader}>
        <div className={styles.statIcon}>{icon}</div>
        {trend && (
          <div className={`${styles.statTrend} ${trend.direction === 'up' ? styles.statTrendUp : styles.statTrendDown}`}>
            <span>{trend.direction === 'up' ? '↑' : '↓'}</span>
            <span>{trend.value}</span>
          </div>
        )}
      </div>

      <div className={styles.statContent}>
        <div className={styles.statTitle}>{title}</div>
        <div className={styles.statValue}>{value}</div>
        {subtitle && <div className={styles.statSubtitle}>{subtitle}</div>}
      </div>
    </div>
  );
}
