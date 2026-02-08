import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeftOutlined,
    CheckCircleOutlined,
    MailOutlined,
    PhoneOutlined,
    GlobalOutlined,
    EnvironmentOutlined,
    FileProtectOutlined,
    SafetyCertificateOutlined,
    EditOutlined,
    UserOutlined,
    DollarOutlined,
    CalendarOutlined,
    FileTextOutlined,
    TeamOutlined,
    BellOutlined,
    HistoryOutlined,
    MoreOutlined,
    RiseOutlined,
    WarningOutlined,
    ClockCircleOutlined,
    TagsOutlined,
    FilePdfOutlined,
    ExperimentOutlined,
    RobotOutlined,
    TrophyOutlined,
    DislikeOutlined
} from "@ant-design/icons";
import Button from "../../../../components/ui/Button";
import Card from "../../ui/Card";
import { Tag, Progress, Steps, Timeline, Badge, Tooltip } from "antd";

export default function DealDetailsPage() {
    const { id } = useParams();

    // -- MOCK DATA STORE --
    const [deal] = useState({
        // 1. Header Info
        id: "101",
        name: "Acme Corp Enterprise Expansion",
        value: 120000,
        currency: "USD",
        stage: "Negotiation",
        status: "Open", // Open, Won, Lost, On Hold
        probability: 75,
        closeDate: "2026-03-31",
        owner: "Sarah Jenkins",
        account: { id: "1", name: "Acme Corp" },

        // 2. Overview
        type: "Upsell", // New Business, Renewal, Upsell, Cross-sell
        cycleLength: 45, // days
        source: "Referral",
        priority: "High",
        health: "Green",

        // 3. Financials
        oneTimeCharges: 20000,
        recurringCharges: 100000,
        discount: 5000,
        netValue: 115000,

        // 4. Products
        products: [
            { id: 1, name: "Enterprise License", quantity: 500, price: 200, discount: 0, total: 100000, type: "Recurring" },
            { id: 2, name: "Implementation Pack", quantity: 1, price: 20000, discount: 5000, total: 15000, type: "One-time" }
        ],

        // 5. Stakeholders
        contacts: [
            { id: 1, name: "John Doe", role: "Decision Maker", influence: "High", title: "CTO" },
            { id: 2, name: "Jane Smith", role: "Finance", influence: "Medium", title: "CFO" }
        ],

        // 6. Pipeline History
        stageHistory: [
            { stage: "Qualified", date: "2026-01-15", duration: "10 days" },
            { stage: "Demo", date: "2026-01-25", duration: "5 days" },
            { stage: "Proposal", date: "2026-01-30", duration: "12 days" },
            { stage: "Negotiation", date: "2026-02-11", duration: "Current" }
        ],

        // 11. Forecasting
        forecastCategory: "Commit",
        revenueMonth: "March 2026",

        // 12. Health Score
        healthScore: 82,
        riskFactors: ["Competitor aggressive pricing"],

        // 14. Competitor
        competitor: "Globex Corp",
        pricingComparison: "We are 10% higher but offer better support.",

        // 15. Access
        accessLevel: "Private Team",

        // 16. Audit
        lastModified: "2 hours ago by Sarah Jenkins"
    });

    const getStageColor = (stage) => {
        const map = {
            "Qualified": "blue",
            "Demo": "cyan",
            "Proposal": "orange",
            "Negotiation": "purple",
            "Closed Won": "green",
            "Closed Lost": "red"
        };
        return map[stage] || "default";
    };

    return (
        <div className="space-y-6 pb-20">

            {/* 1. STICKY HEADER */}
            <div className="sticky top-0 z-20 -mx-4 -mt-4 mb-6 border-b border-neutral-200 bg-white px-4 py-4 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
                            <Link to="/crm/deals" className="hover:text-neutral-700"><ArrowLeftOutlined /> Back to Pipeline</Link>
                            <span>/</span>
                            <Link to={`/crm/accounts/${deal.account.id}`} className="text-blue-600 hover:underline">{deal.account.name}</Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-neutral-900">{deal.name}</h1>
                            <Tag color={getStageColor(deal.stage)}>{deal.stage}</Tag>
                            <div className="flex items-center gap-1 bg-neutral-50 px-2 py-1 rounded border border-neutral-200">
                                <div className="text-sm font-semibold text-neutral-900">{deal.currency} {deal.value.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <div className="text-xs text-neutral-500">Probability</div>
                            <div className="text-lg font-bold text-green-600">{deal.probability}%</div>
                        </div>
                        <div className="h-8 w-[1px] bg-neutral-200 hidden sm:block"></div>

                        {/* 17. Lifecycle Actions */}
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">Lost</Button>
                            <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm">Won</Button>
                            <button className="p-2 hover:bg-neutral-100 rounded-full"><MoreOutlined className="text-lg" /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN (Main Context) - 2/3 Width */}
                <div className="lg:col-span-2 space-y-6">

                    {/* 6. PIPELINE VISUAL */}
                    <Card>
                        <h3 className="font-semibold mb-4 text-sm uppercase text-neutral-500 tracking-wider">Pipeline Progress</h3>
                        <Steps
                            current={3}
                            size="small"
                            items={[
                                { title: 'Qualified', description: '10 days' },
                                { title: 'Demo', description: '5 days' },
                                { title: 'Proposal', description: '12 days' },
                                { title: 'Negotiation', description: 'Current' },
                                { title: 'Closed' },
                            ]}
                        />
                    </Card>

                    {/* 2. OVERVIEW SUMMARY */}
                    <Card>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <div className="text-xs text-neutral-500 mb-1">Deal Type</div>
                                <div className="font-medium flex items-center gap-2">
                                    <Tag color="geekblue">{deal.type}</Tag>
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-neutral-500 mb-1">Sales Cycle</div>
                                <div className="font-medium"><ClockCircleOutlined /> {deal.cycleLength} Days</div>
                            </div>
                            <div>
                                <div className="text-xs text-neutral-500 mb-1">Source</div>
                                <div className="font-medium">{deal.source}</div>
                            </div>
                            <div>
                                <div className="text-xs text-neutral-500 mb-1">Health</div>
                                <div className="font-medium text-green-600 flex items-center gap-1"><CheckCircleOutlined /> {deal.health}</div>
                            </div>
                        </div>
                    </Card>

                    {/* 4. PRODUCTS & 3. FINANCIAL BREAKDOWN */}
                    <Card>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2"><DollarOutlined /> Products & Financials</h3>
                            <Tag color="gold">Approval Pending</Tag>
                        </div>

                        <table className="w-full text-sm mb-6">
                            <thead className="bg-neutral-50 text-left border-b border-neutral-100">
                                <tr>
                                    <th className="p-2 font-medium">Product / Service</th>
                                    <th className="p-2 font-medium">Type</th>
                                    <th className="p-2 font-medium text-right">Qty</th>
                                    <th className="p-2 font-medium text-right">Unit Price</th>
                                    <th className="p-2 font-medium text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deal.products.map(p => (
                                    <tr key={p.id} className="border-b border-neutral-50">
                                        <td className="p-2 font-medium">{p.name}</td>
                                        <td className="p-2 text-neutral-500">{p.type}</td>
                                        <td className="p-2 text-right">{p.quantity}</td>
                                        <td className="p-2 text-right">${p.price}</td>
                                        <td className="p-2 text-right font-medium">${p.total.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex justify-end">
                            <div className="w-64 space-y-2 text-sm bg-neutral-50 p-4 rounded-lg">
                                <div className="flex justify-between text-neutral-500">
                                    <span>Subtotal</span>
                                    <span>${deal.value.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-neutral-500">
                                    <span>Discount</span>
                                    <span className="text-red-500">-${deal.discount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t border-neutral-200">
                                    <span>Net Deal Value</span>
                                    <span>${deal.netValue.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* 7. ACTIVITIES & TIMELINE */}
                    <Card>
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><HistoryOutlined /> Activity Timeline</h3>
                        <Timeline
                            items={[
                                {
                                    color: 'green',
                                    children: (
                                        <div className="pb-4">
                                            <div className="font-medium">Stage moved to Negotiation</div>
                                            <div className="text-xs text-neutral-500">Today - Sarah Jenkins</div>
                                        </div>
                                    ),
                                },
                                {
                                    dot: <MailOutlined className="text-blue-500" />,
                                    children: (
                                        <div className="pb-4">
                                            <div className="font-medium">Sent Updated Proposal v2</div>
                                            <div className="text-xs text-neutral-500">Yesterday - System</div>
                                        </div>
                                    ),
                                },
                                {
                                    dot: <TeamOutlined className="text-purple-500" />,
                                    children: (
                                        <div className="pb-4">
                                            <div className="font-medium">Stakeholder Meeting with John Doe</div>
                                            <div className="text-xs text-neutral-500">2 days ago - Sarah Jenkins</div>
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    </Card>

                    {/* 9. DOCUMENTS */}
                    <Card>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2"><FileProtectOutlined /> Documents</h3>
                            <Button size="sm" variant="outline">Upload</Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer">
                                <FilePdfOutlined className="text-2xl text-red-500" />
                                <div>
                                    <div className="text-sm font-medium">Proposal_v2.pdf</div>
                                    <div className="text-xs text-neutral-400">2.4 MB • Uploaded Yesterday</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer">
                                <FileTextOutlined className="text-2xl text-blue-500" />
                                <div>
                                    <div className="text-sm font-medium">MSA_Draft.docx</div>
                                    <div className="text-xs text-neutral-400">1.1 MB • Uploaded 2 days ago</div>
                                </div>
                            </div>
                        </div>
                    </Card>

                </div>


                {/* RIGHT COLUMN (Sidebar Info) - 1/3 Width */}
                <div className="space-y-6">

                    {/* 11. FORECASTING & 12. HEALTH */}
                    <Card className="bg-gradient-to-b from-white to-neutral-50">
                        <h3 className="font-semibold mb-4">Forecast & Health</h3>

                        <div className="mb-6">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-neutral-500">Deal Health</span>
                                <span className="font-bold text-green-600">{deal.healthScore}/100</span>
                            </div>
                            <Progress percent={deal.healthScore} showInfo={false} strokeColor="#52c41a" size="small" />
                            <div className="mt-2 text-xs text-neutral-500 flex items-start gap-1">
                                <WarningOutlined className="text-amber-500 mt-0.5" />
                                <span>Risk: {deal.riskFactors[0]}</span>
                            </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-neutral-200">
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-500">Forecast Category</span>
                                <Tag color="cyan">{deal.forecastCategory}</Tag>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-500">Expected Close</span>
                                <span className="font-medium text-neutral-900">{deal.closeDate}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-500">Revenue Month</span>
                                <span>{deal.revenueMonth}</span>
                            </div>
                        </div>
                    </Card>

                    {/* 5. STAKEHOLDERS */}
                    <Card>
                        <h3 className="font-semibold mb-3 flex items-center gap-2"><TeamOutlined /> Stakeholders</h3>
                        <div className="space-y-3">
                            {deal.contacts.map(c => (
                                <div key={c.id} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                                        {c.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium">{c.name}</div>
                                        <div className="text-xs text-neutral-500">{c.title}</div>
                                    </div>
                                    <Tag>{c.role}</Tag>
                                </div>
                            ))}
                            <Button variant="ghost" size="sm" className="w-full text-blue-600">Map Contact</Button>
                        </div>
                    </Card>

                    {/* 8. TASKS & NEXT ACTIONS */}
                    <Card>
                        <h3 className="font-semibold mb-3 flex items-center gap-2"><CheckCircleOutlined /> Next Actions</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-2 bg-amber-50 border border-amber-100 rounded">
                                <input type="checkbox" className="mt-1" />
                                <div>
                                    <div className="text-sm font-medium text-neutral-900">Review Legal Comments</div>
                                    <div className="text-xs text-red-500">Due Tomorrow</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-2 bg-white border border-neutral-200 rounded">
                                <input type="checkbox" className="mt-1" />
                                <div>
                                    <div className="text-sm font-medium text-neutral-900">Schedule Tech Implementation Call</div>
                                    <div className="text-xs text-neutral-500">Due in 3 days</div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* 14. COMPETITOR ANALYSIS */}
                    <Card>
                        <h3 className="font-semibold mb-3 flex items-center gap-2"><TrophyOutlined /> Competition</h3>
                        <div className="text-sm">
                            <div className="mb-2">
                                <span className="text-neutral-500 block text-xs">Primary Competitor</span>
                                <span className="font-medium text-neutral-900">{deal.competitor}</span>
                            </div>
                            <div className="bg-neutral-100 p-2 rounded text-xs text-neutral-600 italic">
                                "{deal.pricingComparison}"
                            </div>
                        </div>
                    </Card>

                    {/* 13. AUTOMATION */}
                    <Card>
                        <h3 className="font-semibold mb-3 flex items-center gap-2"><RobotOutlined /> Automation</h3>
                        <div className="space-y-2">
                            <div className="text-xs flex items-center gap-2 text-neutral-600">
                                <CheckCircleOutlined className="text-green-500" /> Auto-task created on stage change
                            </div>
                            <div className="text-xs flex items-center gap-2 text-neutral-600">
                                <CheckCircleOutlined className="text-green-500" /> Inactivity alert enabled
                            </div>
                        </div>
                    </Card>

                    {/* 15. & 16. OWNERSHIP & AUDIT */}
                    <div className="text-xs text-neutral-400 space-y-1 px-1">
                        <div>Owner: {deal.owner} ({deal.accessLevel})</div>
                        <div>Last modified: {deal.lastModified}</div>
                        <div className="text-blue-500 cursor-pointer hover:underline">View Full Audit Log</div>
                    </div>

                </div>
            </div>
        </div>
    );
}
