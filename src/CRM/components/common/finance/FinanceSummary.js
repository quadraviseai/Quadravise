import React from 'react';
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    WalletOutlined,
} from '@ant-design/icons';
import styles from './Finance.module.css';

/**
 * Finance Summary Component - Balance Sheet Overview
 * @param {Object} summary - Total income, expenses, and balance
 */
export default function FinanceSummary({ summary }) {
    const { totalIncome, totalExpenses, balance } = summary;

    const cards = [
        {
            label: 'Total Income',
            value: totalIncome,
            icon: <ArrowUpOutlined />,
            iconClass: styles.incomeIcon,
            cardClass: styles.incomeCard,
            prefix: '+₹',
        },
        {
            label: 'Total Expenses',
            value: totalExpenses,
            icon: <ArrowDownOutlined />,
            iconClass: styles.expenseIcon,
            cardClass: styles.expenseCard,
            prefix: '-₹',
        },
        {
            label: 'Net Balance',
            value: balance,
            icon: <WalletOutlined />,
            iconClass: styles.balanceIcon,
            cardClass: styles.balanceCard,
            prefix: '₹',
        },
    ];

    return (
        <div className={styles.summaryGrid}>
            {cards.map((card, index) => (
                <div key={index} className={`${styles.summaryCard} ${card.cardClass}`}>
                    <div className={styles.cardContent}>
                        <div className={`${styles.cardIcon} ${card.iconClass}`}>
                            {card.icon}
                        </div>
                        <div className={styles.cardTextWrapper}>
                            <div className={styles.cardLabel}>{card.label}</div>
                            <div className={styles.cardValue}>
                                {card.prefix}{card.value.toLocaleString('en-IN')}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
