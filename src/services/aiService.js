import axios from 'axios';

// const GROQ_API_KEY = 'REDACTED';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * Service for AI operations
 */
export const aiService = {
    /**
     * Analyzes meeting minutes and extracts action items
     * @param {string} content - The meeting minutes content
     * @returns {Promise<{summary: string, tasks: string[]}>}
     */
    analyzeMoM: async (content) => {
        try {
            const response = await axios.post(GROQ_API_URL, {
                model: "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert CRM assistant. Analyze the provided meeting minutes and extract a list of concrete action items. Return the result in JSON format with two keys: 'summary' (a brief overview) and 'tasks' (an array of specific task titles)."
                    },
                    {
                        role: "user",
                        content: `Analyze these meeting minutes:\n\n${content}`
                    }
                ],
                response_format: { type: "json_object" }
            }, {
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            const result = JSON.parse(response.data.choices[0].message.content);

            // Normalize tasks to be an array of strings
            let tasks = [];
            if (Array.isArray(result.tasks)) {
                tasks = result.tasks.map(t => {
                    if (typeof t === 'string') return t;
                    if (t && typeof t === 'object' && t.title) return t.title;
                    if (t && typeof t === 'object' && t.task) return t.task;
                    return String(t);
                });
            }

            return {
                summary: result.summary || "Analysis complete.",
                tasks: tasks
            };
        } catch (error) {
            console.error('AI Analysis Error:', error);
            throw new Error('Failed to analyze meeting minutes');
        }
    },

    /**
     * Provides financial predictions and survival plans
     * @param {Array} transactions - Recent list of transactions
     * @param {Object} summary - Current financial totals
     * @returns {Promise<Object>}
     */
    analyzeFinance: async (transactions, summary) => {
        try {
            const txSummary = transactions.slice(0, 10).map(t => `${t.date}: ${t.description} (${t.type}) ₹${t.amount}`).join('\n');
            const userPrompt = `
                Current Financial State:
                - Total Income: ₹${summary.totalIncome}
                - Total Expenses: ₹${summary.totalExpenses}
                - Net Balance: ₹${summary.balance}

                Recent Transactions:
                ${txSummary}

                Based on this data, provide:
                1. A prediction for the next 3, 6, and 12 months.
                2. A "Survival & Growth Plan" focusing on cash flow management.
                3. Key financial risks to watch out for.

                Return the result in JSON format with keys: 'predictions' (object with 3, 6, 12 month keys), 'survivalPlan' (string or array), 'risks' (array).
            `;

            const response = await axios.post(GROQ_API_URL, {
                model: "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "system",
                        content: "You are a senior financial advisor and business strategist. analyze the financial data and provide strategic projections and action plans. Return only valid JSON."
                    },
                    {
                        role: "user",
                        content: userPrompt
                    }
                ],
                response_format: { type: "json_object" }
            }, {
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            const result = JSON.parse(response.data.choices[0].message.content);

            // Normalize survivalPlan to be a string or array of strings
            if (result.survivalPlan && typeof result.survivalPlan === 'object' && !Array.isArray(result.survivalPlan)) {
                // If it's an object with keys like {cashFlowManagement: '...'}, flatten it
                result.survivalPlan = Object.entries(result.survivalPlan)
                    .map(([key, val]) => `${key.replace(/([A-Z])/g, ' $1').trim()}: ${val}`)
                    .join(' ');
            }

            // Normalize risks to be an array of strings
            if (Array.isArray(result.risks)) {
                result.risks = result.risks.map(r => {
                    if (typeof r === 'string') return r;
                    if (r && typeof r === 'object') {
                        // Handle {risk: '...', description: '...'} or similar
                        const values = Object.values(r).filter(v => typeof v === 'string');
                        return values.length > 0 ? values.join(': ') : JSON.stringify(r);
                    }
                    return String(r);
                });
            }

            return result;
        } catch (error) {
            console.error('AI Finance Analysis Error:', error);
            throw new Error('Failed to generate financial predictions');
        }
    }
};

export default aiService;
