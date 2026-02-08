import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FinanceDashboard from '../../CRM/components/common/finance/FinanceDashboard';
import * as financeService from '../../services/financeService';

// Mock the service
jest.mock('../../services/financeService');

describe('FinanceDashboard', () => {
    const mockTransactions = [
        { id: 1, date: '2026-01-20', description: 'Consulting', category: 'Income', amount: 1000, type: 'income' },
        { id: 2, date: '2026-01-21', description: 'Rent', category: 'Fixed', amount: 500, type: 'expense' },
    ];

    const mockSummary = {
        totalIncome: 1000,
        totalExpenses: 500,
        balance: 500
    };

    beforeEach(() => {
        financeService.getTransactions.mockResolvedValue(mockTransactions);
        financeService.getFinanceSummary.mockResolvedValue(mockSummary);
    });

    test('renders finance management title', async () => {
        render(<FinanceDashboard />);
        expect(screen.getByText(/Finance Management/i)).toBeInTheDocument();
    });

    test('renders summary cards with correct values', async () => {
        render(<FinanceDashboard />);
        await waitFor(() => {
            expect(screen.getByText(/Total Income/i)).toBeInTheDocument();
            expect(screen.getByText(/\+₹1,000/i)).toBeInTheDocument();
        });
    });

    test('filters transactions by search query', async () => {
        render(<FinanceDashboard />);
        await waitFor(() => {
            expect(screen.getByText('Consulting')).toBeInTheDocument();
            expect(screen.getByText('Rent')).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText(/Search records.../i);
        fireEvent.change(searchInput, { target: { value: 'Consulting' } });

        expect(screen.getByText('Consulting')).toBeInTheDocument();
        expect(screen.queryByText('Rent')).not.toBeInTheDocument();
    });
});
