import { useState } from "react";
import { AppstoreAddOutlined, CloseOutlined } from "@ant-design/icons";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";

export default function CreateStageModal({ isOpen, onClose, onCreate }) {
    const [stageName, setStageName] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (stageName.trim() && onCreate) {
            onCreate(stageName.trim());
            setStageName("");
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/60 backdrop-blur-sm transition-all duration-300">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all scale-100">

                {/* Header */}
                <div className="relative h-16 bg-gradient-to-r from-neutral-800 to-neutral-900 flex justify-between items-center px-6">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <AppstoreAddOutlined /> Add Pipeline Stage
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-1.5 h-7 w-7 flex items-center justify-center backdrop-blur-md border border-white/10"
                    >
                        <CloseOutlined className="text-xs" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase">Stage Name</label>
                        <Input
                            placeholder="e.g. Legal Review"
                            className="bg-neutral-50 border-neutral-200 focus:bg-white"
                            value={stageName}
                            onChange={(e) => setStageName(e.target.value)}
                            autoFocus
                        />
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3">
                        <Button variant="ghost" onClick={onClose} className="text-neutral-500 hover:text-neutral-900 font-medium">Cancel</Button>
                        <Button onClick={handleSubmit} className="shadow-lg shadow-brand-primary/30 px-6 bg-brand-primary hover:bg-brand-primary/90">Add Stage</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
