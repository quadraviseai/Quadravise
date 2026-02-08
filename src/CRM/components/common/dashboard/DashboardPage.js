import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import styles from './Dashboard.module.css';
import { dashboardAPI } from '../../../../services/dashboardAPI';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip as AntTooltip } from 'antd';

/**
 * Premium Dashboard Page Redesign
 * Matching the provided reference image with realistic data.
 */

// Configuration
const ACCOUNT_GROWTH_TARGET = 10; // Set your monthly account growth target here

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [pipelineData, setPipelineData] = useState([]);
  const [taskData, setTaskData] = useState({ by_status: [], by_priority: [] });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [summaryRes, salesRes, pipelineRes, taskRes] = await Promise.all([
        dashboardAPI.getSummary(),
        dashboardAPI.getSalesChart(),
        dashboardAPI.getPipelineStatus(),
        dashboardAPI.getTaskOverview()
      ]);

      setSummary(summaryRes);
      setSalesData(salesRes);
      setPipelineData(pipelineRes);
      setTaskData(taskRes);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // --- Process Data for Charts ---

  // 1. Right List (Stats Overview)
  const topStats = [
    { label: "Total Accounts", value: summary?.accounts?.total || 0 },
    { label: "New Accounts", value: summary?.accounts?.new_this_month || 0 },
    { label: "Open Deals", value: summary?.deals?.open_count || 0 },
    { label: "Pending Tasks", value: summary?.tasks?.pending_my_tasks || 0 },
    { label: "Won Revenue", value: `$${(summary?.revenue?.total_won || 0).toLocaleString()}` },
  ];

  // 2. Task Status Donut
  const taskStatusData = taskData.by_status.map(item => ({
    name: item.status,
    value: item.count
  }));
  const COLORS_DONUT_1 = ['#f59e0b', '#22c55e', '#ef4444', '#0ea5e9']; // Orange, Green, Red, Blue

  // 3. Task Priority Bar
  const taskPriorityData = taskData.by_priority.map(item => ({
    name: item.priority,
    v: item.count,
    fill: item.priority === 'High' ? '#ef4444' : (item.priority === 'Medium' ? '#f59e0b' : '#22c55e')
  }));

  // 4. Pipeline By Value (Progress Bars)
  // Use pipelineData, sort by value descending
  const pipelineByValue = [...pipelineData].sort((a, b) => b.total_value - a.total_value);
  const maxPipelineValue = Math.max(...pipelineByValue.map(i => i.total_value), 1);

  // 5. Colors helper
  const getProgressColor = (idx) => {
    const colors = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];
    return colors[idx % colors.length];
  };

  // --- Helpers ---
  const renderHeader = (title, tooltipText) => (
    <div className={styles.cardHeader}>
      <div className={styles.cardTitle}>{title}</div>
      <AntTooltip title={tooltipText} placement="top">
        <InfoCircleOutlined style={{ color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }} />
      </AntTooltip>
    </div>
  );

  const NoData = ({ message = "No Data Available" }) => (
    <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
      <span>{message}</span>
    </div>
  );

  return (
    <div className={styles.dashboardContainer}>

        {/* --- ROW 1 --- */}

        {/* Main Chart: Revenue History */}
        <div className={`${styles.card} ${styles.mainChartSection}`}>
          {renderHeader("Revenue Analytics", "Total revenue from 'Won' deals, grouped by month (last 6 months).")}
          {salesData.length === 0 || salesData.every(d => d.revenue === 0) ? (
            <div style={{ height: 250 }}><NoData message="No successful deals yet" /></div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Right List: Summary Stats */}
        <div className={`${styles.card} ${styles.statsListSection}`}>
          {renderHeader("Stats Overview", "Key performance metrics for your CRM.")}
          <div>
            {topStats.map((stat, idx) => (
              <div key={idx} className={styles.statItem}>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statValue}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>


        {/* --- ROW 2 --- */}

        {/* Donut Chart: Task Status */}
        <div className={styles.card}>
          {renderHeader("Task Status", "Breakdown of your assigned tasks by status.")}
          {taskStatusData.length === 0 ? <div style={{ height: 180 }}><NoData /></div> : (
            <div style={{ position: 'relative', height: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    innerRadius={50}
                    outerRadius={70}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_DONUT_1[index % COLORS_DONUT_1.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, "Tasks"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className={styles.donutLabelContainer}>
                <span className={styles.donutPercentage} style={{ color: '#22c55e' }}>
                  {summary?.tasks?.pending_my_tasks || 0}
                </span>
                <span className="text-[10px] text-gray-400 block text-center">Pending</span>
              </div>
            </div>
          )}
        </div>

        {/* Line Chart: Deals Volume */}
        <div className={styles.card}>
          {renderHeader("Deals Volume", "Count of deals closed (Won) over the last 6 months.")}
          {salesData.length === 0 || salesData.every(d => d.deals_count === 0) ? <div style={{ height: 180 }}><NoData /></div> : (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <Tooltip contentStyle={{ fontSize: '12px' }} formatter={(value) => [value, "Deals Closed"]} />
                <Line type="monotone" dataKey="deals_count" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3, fill: '#0ea5e9' }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bar Chart: Task Priorities */}
        <div className={styles.card}>
          {renderHeader("Task Priorities", "Pending tasks grouped by priority level.")}
          {taskPriorityData.length === 0 ? <div style={{ height: 180 }}><NoData /></div> : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={taskPriorityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="v" radius={[4, 4, 0, 0]}>
                  {taskPriorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>


        {/* --- ROW 3 --- */}

        {/* Progress Bars: Pipeline Value */}
        <div className={styles.card}>
          {renderHeader("Pipeline Value", "Total potential revenue in each deal stage.")}
          <div className="flex flex-col justify-center h-full gap-2 overflow-auto custom-scrollbar">
            {pipelineByValue.length === 0 ? <NoData message="No active deals" /> :
              pipelineByValue.map((item, idx) => (
                <div key={idx} className={styles.progressItem}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{item.stage}</span>
                    <span className="font-bold">${item.total_value.toLocaleString()}</span>
                  </div>
                  <div className={styles.progressBarTrack}>
                    <div
                      className={styles.progressBarFill}
                      style={{
                        width: `${Math.min((item.total_value / maxPipelineValue) * 100, 100)}%`,
                        backgroundColor: getProgressColor(idx)
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Horizontal Bars: Pipeline Count (replacing Server Load) */}
        <div className={styles.card}>
          {renderHeader("Pipeline Count", "Number of deals currently in each stage.")}
          <div className="flex flex-col justify-center h-full gap-3 overflow-auto custom-scrollbar">
            {pipelineData.length === 0 ? <NoData /> : pipelineData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-20 text-xs text-gray-500 font-medium text-right truncate" title={item.stage}>{item.stage}</div>
                <div className={styles.progressBarTrack}>
                  <div
                    className={styles.progressBarFill}
                    style={{ width: `${Math.min((item.count / 10) * 100, 100)}%`, backgroundColor: getProgressColor(idx) }}
                  />
                </div>
                <div className="w-8 text-xs text-black font-bold">{item.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Growth (Donut replacer) */}
        <div className={styles.card}>
          {renderHeader("Account Growth", "New accounts created this month vs target.")}
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{summary?.accounts?.new_this_month || 0}</div>
              <div className="text-xs text-gray-500">New Accounts / Month</div>
            </div>

            <div className="w-full px-8">
              <div className="flex justify-between text-xs mb-1">
                <span>Growth Target</span>
                <span>{Math.min(((summary?.accounts?.new_this_month || 0) / ACCOUNT_GROWTH_TARGET) * 100, 100).toFixed(0)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${Math.min(((summary?.accounts?.new_this_month || 0) / ACCOUNT_GROWTH_TARGET) * 100, 100)}%` }}></div>
              </div>
              <div className="text-[10px] text-gray-400 mt-1 text-center">Target: {ACCOUNT_GROWTH_TARGET}/month</div>
            </div>
          </div>
        </div>

      </div>
      );
}
