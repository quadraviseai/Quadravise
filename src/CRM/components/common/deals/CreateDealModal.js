import { useState, useEffect } from "react";
import { DatePicker } from "antd";
import { DollarOutlined, ShopOutlined, CloseOutlined, LockOutlined } from "@ant-design/icons";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";

export default function CreateDealModal({ isOpen, onClose, onCreate, initialAccount = null }) {
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        company: initialAccount ? initialAccount.name : "",
        date: "",
        owner: "Me" // Default or dynamic
    });

    useEffect(() => {
        if (isOpen && initialAccount) {
            setFormData(prev => ({ ...prev, company: initialAccount.name }));
        } else if (isOpen && !initialAccount) {
            setFormData(prev => ({ ...prev, company: "" }));
        }
    }, [isOpen, initialAccount]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (onCreate) {
            onCreate({
                ...formData,
                id: `d${Date.now()}`, // Temporary ID generation
                stage: 'New' // Default stage must match backend choices
            });
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/60 backdrop-blur-sm transition-all duration-300">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100">

                {/* Header */}
                <div className="relative h-20 bg-gradient-to-r from-neutral-800 to-neutral-900 flex justify-between items-center px-6">
                    <h2 className="text-xl font-bold text-white">Create New Deal</h2>
                    <button
                        onClick={onClose}
                        className="text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2 h-8 w-8 flex items-center justify-center backdrop-blur-md border border-white/10"
                    >
                        <CloseOutlined />
                    </button>
                </div>

                <div className="p-8 space-y-5">
                    <div>
                        <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase">Deal Title</label>
                        <Input
                            placeholder="e.g. Acme Corp Expansion"
                            className="bg-neutral-50 border-neutral-200 focus:bg-white"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase">Value</label>
                            <div className="relative">
                                <div className="absolute left-3 top-3 text-neutral-400 z-10"><DollarOutlined /></div>
                                <Input
                                    placeholder="10,000"
                                    className="pl-10 bg-neutral-50 border-neutral-200 focus:bg-white"
                                    value={formData.amount}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        // Only allow digits and a single decimal point
                                        if (/^\d*\.?\d*$/.test(val)) {
                                            setFormData({ ...formData, amount: val });
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase">Close Date</label>
                            <div className="relative">
                                <DatePicker
                                    className="w-full h-[42px] bg-neutral-50 border-neutral-200 hover:bg-white focus:bg-white hover:border-brand-primary focus:border-brand-primary transition-all rounded-lg"
                                    placeholder="Select Date"
                                    format="MMM DD, YYYY"
                                    suffixIcon={null}
                                    onChange={(date, dateString) => setFormData({ ...formData, date: dateString })}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase">Related Company</label>
                        <div className="relative">
                            <div className="absolute left-3 top-3 text-neutral-400 z-10">
                                {initialAccount ? <LockOutlined /> : <ShopOutlined />}
                            </div>
                            <Input
                                placeholder="Search accounts..."
                                className={`pl-10 border-neutral-200 focus:bg-white ${initialAccount ? "bg-neutral-100/50 text-neutral-500 cursor-not-allowed" : "bg-neutral-50"}`}
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                disabled={!!initialAccount}
                            />
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-8 pt-6 border-t border-neutral-100 flex justify-end gap-3">
                        <Button variant="ghost" onClick={onClose} className="text-neutral-500 hover:text-neutral-900 font-medium">Cancel</Button>
                        <Button onClick={handleSubmit} className="shadow-lg shadow-brand-primary/30 px-8 bg-brand-primary hover:bg-brand-primary/90">Create Deal</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
