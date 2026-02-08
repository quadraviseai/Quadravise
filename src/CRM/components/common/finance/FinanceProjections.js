import React, { useState, useEffect } from 'react';
import { RocketOutlined, LoadingOutlined, InfoCircleOutlined, SyncOutlined, HistoryOutlined } from '@ant-design/icons';
import aiService from '../../../../services/aiService';
import { financeService } from '../../../../services/financeService';
import styles from './Finance.module.css';

/**
 * Finance Projections Component - Showing AI predictions and plans
 * @param {Array} transactions - Recent transactions
 * @param {Object} summary - Financial summary
 */
export default function FinanceProjections({ transactions, summary }) {
    const [projections, setProjections] = useState(null);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    // Initial load: Fetch latest report from DB
    useEffect(() => {
        const loadLatestReport = async () => {
            setLoading(true);
            try {
                const latest = await financeService.getLatestAIReport();
                if (latest) {
                    setProjections(latest.report_data);
                    setLastUpdated(latest.created_at);
                }
            } catch (err) {} finally {
                setLoading(false);
            }
        };

        if (summary) {
            loadLatestReport();
        }
    }, [summary]);

    /**
     * Trigger fresh AI analysis and save to DB
     */
    const handleGenerate = async () => {
        setGenerating(true);
        setError(null);
        try {
            // 1. Get raw data from AI
            const result = await aiService.analyzeFinance(transactions || [], summary);

            // 2. Save result to DB
            const saved = await financeService.saveAIReport(result);

            // 3. Update state
            setProjections(saved.report_data);
            setLastUpdated(saved.created_at);
        } catch (err) {setError('The AI service is currently busy or unavailable. Using cached report if available.');
        } finally {
            setGenerating(false);
        }
    };

    const formatCurrency = (val) => {
        if (!val) return '---';
        if (typeof val === 'string' && val.includes('₹')) return val;
        return `₹${Number(val).toLocaleString('en-IN')}`;
    };

    if (loading) {
        return (
            <div className={styles.projectionCard}>
                <div className={styles.aiLoading}>
                    <LoadingOutlined style={{ fontSize: 24, color: '#8b5cf6' }} />
                    <span>Fetching latest projections...</span>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.projectionCard}>
            <div className="flex justify-between items-center mb-6">
                <div className={styles.projectionHeader}>
                    <RocketOutlined className={styles.projectionIcon} />
                    <span>AI Financial Projections</span>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={generating}
                    className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-violet-200"
                >
                    {generating ? <LoadingOutlined /> : <SyncOutlined />}
                    {generating ? 'ANALYZING...' : 'GENERATE FRESH REPORT'}
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600 text-xs">
                    <InfoCircleOutlined />
                    {error}
                </div>
            )}

            {!projections ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400 gap-4">
                    <InfoCircleOutlined style={{ fontSize: 32 }} />
                    <div>
                        <p className="font-semibold text-slate-600">No Report Generated</p>
                        <p className="text-xs max-w-xs mx-auto mt-1">
                            Generate your first AI-powered growth report to see future predictions and survival plans.
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    <div className={styles.projectionGrid}>
                        <div className={styles.projBox}>
                            <div className={styles.projBoxTitle}>3 Months Projection</div>
                            <div className={styles.projBoxValue}>{formatCurrency(projections.predictions?.['3'])}</div>
                        </div>
                        <div className={styles.projBox}>
                            <div className={styles.projBoxTitle}>6 Months Projection</div>
                            <div className={styles.projBoxValue}>{formatCurrency(projections.predictions?.['6'])}</div>
                        </div>
                        <div className={styles.projBox}>
                            <div className={styles.projBoxTitle}>12 Months Projection</div>
                            <div className={styles.projBoxValue}>{formatCurrency(projections.predictions?.['12'])}</div>
                        </div>
                    </div>

                    <div className={styles.projectionPlan}>
                        <div className={styles.planTitle}>Survival & Growth Strategy</div>
                        <div className="space-y-4">
                            <div className={styles.planText}>
                                {Array.isArray(projections.survivalPlan)
                                    ? projections.survivalPlan.join(' ')
                                    : typeof projections.survivalPlan === 'object'
                                        ? JSON.stringify(projections.survivalPlan)
                                        : projections.survivalPlan || 'Strategy data missing.'}
                            </div>

                            {projections.risks && projections.risks.length > 0 && (
                                <div>
                                    <div className="text-xs font-bold text-red-500 uppercase mb-2">Critical Risks</div>
                                    <ul className="list-disc list-inside text-sm text-slate-600 gap-1.5 flex flex-col">
                                        {projections.risks.map((risk, idx) => (
                                            <li key={idx} className="leading-tight">
                                                {typeof risk === 'object' ? JSON.stringify(risk) : String(risk)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {lastUpdated && (
                        <div className="mt-4 flex items-center gap-1.5 text-[10px] text-slate-400 font-medium italic border-t border-slate-50 pt-3">
                            <HistoryOutlined size={10} />
                            Last generated: {new Date(lastUpdated).toLocaleString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
