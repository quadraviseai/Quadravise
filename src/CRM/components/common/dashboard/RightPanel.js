import styles from './Dashboard.module.css';

const activities = [
  { text: "New lead added: Tech Solutions Inc", time: "2 minutes ago", type: "blue" },
  { text: "Meeting scheduled with Alice Johnson", time: "15 minutes ago", type: "purple" },
  { text: "Deal closed: Acme Corp - ₹2.5L", time: "1 hour ago", type: "green" },
  { text: "Task completed: Send proposal to client", time: "2 hours ago", type: "orange" },
  { text: "Follow-up call with John Doe", time: "3 hours ago", type: "blue" },
];

/**
 * Enhanced Activity Timeline Panel
 */
export default function RightPanel() {
  const getDotClass = (type) => {
    const classes = {
      blue: styles.activityDotBlue,
      green: styles.activityDotGreen,
      orange: styles.activityDotOrange,
      purple: styles.activityDotPurple,
    };
    return `${styles.activityDot} ${classes[type] || classes.blue}`;
  };

  return (
    <div className={styles.activityTimeline}>
      <h2 className={styles.panelTitle}>Recent Activity</h2>
      <div className="space-y-2">
        {activities.map((item, idx) => (
          <div key={idx} className={styles.activityItem}>
            <div className={getDotClass(item.type)} />
            <div className={styles.activityContent}>
              <p className={styles.activityText}>{item.text}</p>
              <p className={styles.activityTime}>{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
