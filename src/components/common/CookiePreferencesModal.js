import { useState } from "react";
import { motion } from "framer-motion";
import { X, ToggleRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CookiePreferencesModal({ isOpen, onClose }) {
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem("cookiePreferences");
    return saved
      ? JSON.parse(saved)
      : {
          essential: true, // Always true, can't be disabled
          analytics: false,
          marketing: false,
          personalization: false,
        };
  });

  const categories = [
    {
      id: "essential",
      name: "Essential Cookies",
      description:
        "Required for basic functionality and security. Always enabled.",
      example: "Security, session management, CSRF protection",
      required: true,
    },
    {
      id: "analytics",
      name: "Analytics Cookies",
      description:
        "Help us understand how you use our site to improve performance.",
      example: "Google Analytics, page views, user behavior tracking",
      required: false,
      placeholder: "// TODO: Add Google Analytics tag here",
    },
    {
      id: "marketing",
      name: "Marketing Cookies",
      description:
        "Used to track you across sites for personalized advertising.",
      example: "Meta Pixel, Google Ads, retargeting campaigns",
      required: false,
      placeholder: "// TODO: Add Meta Pixel and Google Ads tags here",
    },
    {
      id: "personalization",
      name: "Personalization Cookies",
      description: "Remember your preferences for a personalized experience.",
      example: "Theme preference, language, saved settings",
      required: false,
      placeholder: "// TODO: Add personalization tracking here",
    },
  ];

  const handleToggle = (id) => {
    if (id === "essential") return; // Essential can't be disabled
    setPreferences({
      ...preferences,
      [id]: !preferences[id],
    });
  };

  const handleSave = () => {
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    localStorage.setItem("cookieConsent", "custom");
    onClose();
    console.log("Cookie preferences saved:", preferences);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      personalization: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem("cookiePreferences", JSON.stringify(allAccepted));
    localStorage.setItem("cookieConsent", "all");
    onClose();
    console.log("All cookies accepted");
  };

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      marketing: false,
      personalization: false,
    };
    setPreferences(onlyEssential);
    localStorage.setItem("cookiePreferences", JSON.stringify(onlyEssential));
    localStorage.setItem("cookieConsent", "essential-only");
    onClose();
    console.log("Only essential cookies enabled");
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Hide scrollbar for webkit browsers */}
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-trust-900 to-trust-800 px-6 py-6 flex items-center justify-between border-b border-trust-700">
          <h2 className="text-2xl font-bold text-white">Cookie Preferences</h2>
          <button
            onClick={onClose}
            className="p-2 text-trust-300 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-trust-600 leading-relaxed">
            Customize which cookies we can use. Essential cookies are always
            enabled and cannot be disabled. Review our{" "}
            <Link
              to="/cookie-policy"
              className="text-brand-primary hover:underline font-medium"
            >
              Cookie Policy
            </Link>{" "}
            for more information.
          </p>

          {/* Cookie Categories */}
          <div className="space-y-4">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-trust-200 rounded-lg p-4 hover:border-brand-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-trust-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-trust-600 mb-2">
                      {category.description}
                    </p>
                    <p className="text-xs text-trust-500 italic">
                      Example: {category.example}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle(category.id)}
                    disabled={category.required}
                    className={`ml-4 flex-shrink-0 ${
                      category.required ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    <ToggleRight
                      className={`h-6 w-6 transition-colors ${
                        preferences[category.id]
                          ? "text-brand-primary"
                          : "text-trust-300"
                      }`}
                    />
                  </button>
                </div>

                {/* Placeholder for tracking code */}
                {category.placeholder && (
                  <div className="mt-3 bg-trust-50 rounded p-3 border border-trust-200">
                    <p className="text-xs font-mono text-trust-500">
                      {category.placeholder}
                    </p>
                  </div>
                )}

                {category.required && (
                  <p className="text-xs text-brand-primary font-medium mt-2">
                    ✓ Always enabled
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-trust-50 px-6 py-4 border-t border-trust-200 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={handleRejectAll}
            className="px-4 py-2 text-sm font-medium text-trust-700 bg-white border border-trust-300 hover:bg-trust-100 rounded-lg transition-colors"
          >
            Reject All
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 text-sm font-medium text-trust-700 bg-trust-200 hover:bg-trust-300 rounded-lg transition-colors"
          >
            Accept All
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-brand-primary to-orange-600 hover:shadow-lg rounded-lg transition-shadow"
          >
            Save Preferences
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
