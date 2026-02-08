import axios from "axios";

/**
 * All AI calls must go through backend to keep keys secret.
 * Configure REACT_APP_API_URL like: https://quadrailearn.quadravise.com (or your API domain)
 */
const API_BASE = process.env.REACT_APP_API_URL || "";

export const aiService = {
  analyzeMoM: async (content) => {
    try {
      const { data } = await axios.post(`${API_BASE}/api/ai/analyze-mom`, { content });
      return data;
    } catch (error) {throw new Error("Failed to analyze meeting minutes");
    }
  },

  analyzeFinance: async (transactions, summary) => {
    try {
      const { data } = await axios.post(`${API_BASE}/api/ai/analyze-finance`, {
        transactions,
        summary,
      });
      return data;
    } catch (error) {throw new Error("Failed to generate financial predictions");
    }
  },
};

export default aiService;
