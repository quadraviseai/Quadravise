import api from './api';

/**
 * AI Service
 * Connects to the backend AI endpoints.
 */

export const aiService = {
  analyzeMoM: async (content) => {
    try {
      const { data } = await api.post('/ai/analyze_mom/', { content });
      return data;
    } catch (error) {
      throw new Error("Failed to analyze meeting minutes");
    }
  },

  analyzeFinance: async (transactions, summary) => {
    try {
      const { data } = await api.post('/ai/analyze_finance/', {
        transactions,
        summary,
      });
      return data;
    } catch (error) {
      throw new Error("Failed to generate financial predictions");
    }
  },
};

export default aiService;

