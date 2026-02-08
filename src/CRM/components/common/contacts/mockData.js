export const MOCK_CONTACTS = [
    {
        id: "1",
        firstName: "Virat",
        lastName: "Kohli",
        jobTitle: "CEO",
        status: "Active",
        isPrimary: true,
        account: { id: "a1", name: "Sports Inc.", type: "Partner" },
        overview: {
            roleInAccount: "Decision Maker",
            seniority: "Executive",
            relationship: "Strong",
            language: "English",
            bestTime: "Morning",
        },
        info: {
            email: "virat@sportsinc.com",
            phone: "+91 98765 43210",
            mobile: "+91 99999 88888",
            linkedin: "linkedin.com/in/vkohli",
            location: "Mumbai, India",
        },
        communication: {
            preferred: "Email",
            optIn: true,
            dnc: false,
            timezone: "IST (GMT+5:30)",
        },
        finance: {
            isFinanceContact: true,
            billingAuthority: true,
            invoiceRecipient: true,
        },
        timeline: [
            { id: 1, type: "call", title: "Quarterly Review", date: "2026-01-20", note: "Discussed Q1 roadmap." },
            { id: 2, type: "email", title: "Invoice Sent", date: "2026-01-18", note: "Sent invoice #INV-2026-001" },
        ],
        deals: [
            { id: "d1", name: "Q1 Campaign", stage: "Negotiation", value: "₹50L" },
        ],
        tasks: [
            { id: "t1", title: "Send contract draft", due: "2026-01-25", priority: "High" },
        ],
        health: {
            score: 95,
            lastInteraction: "2 days ago",
            trend: "up",
        },
        privacy: {
            gdpr: true,
            consentDate: "2025-12-01",
        }
    },
    {
        id: "2",
        firstName: "Elena",
        lastName: "D'Costa",
        jobTitle: "CTO",
        status: "Away",
        isPrimary: false,
        account: { id: "a2", name: "Techify", type: "Customer" },
        overview: {
            roleInAccount: "Technical",
            seniority: "Executive",
            relationship: "Medium",
            language: "English",
            bestTime: "Afternoon",
        },
        info: {
            email: "elena@techify.com",
            phone: "+91 91234 56789",
            linkedin: "linkedin.com/in/elenad",
            location: "Bangalore, India",
        },
        communication: {
            preferred: "WhatsApp",
            optIn: true,
            dnc: false,
            timezone: "IST (GMT+5:30)",
        },
        finance: {
            isFinanceContact: false,
            billingAuthority: false,
            invoiceRecipient: false,
        },
        timeline: [
            { id: 3, type: "meeting", title: "Tech Demo", date: "2026-01-15", note: "Demoed new API features." },
        ],
        deals: [
            { id: "d2", name: "SaaS Subscription", stage: "Closed Won", value: "₹12L" },
        ],
        tasks: [],
        health: {
            score: 70,
            lastInteraction: "1 week ago",
            trend: "stable",
        },
        privacy: {
            gdpr: true,
            consentDate: "2025-11-15",
        }
    },
];
