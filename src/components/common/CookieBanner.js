import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info } from "lucide-react";
import { Link } from "react-router-dom";
import CookiePreferencesModal from "./CookiePreferencesModal";
import { loadEssentialCookies } from "../../hooks/useCookieTracking";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Load essential cookies first (these don't require consent)
    loadEssentialCookies();
    // Check if user has already accepted/rejected cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      personalization: true,
    };
    localStorage.setItem("cookiePreferences", JSON.stringify(allAccepted));
    localStorage.setItem("cookieConsent", "all");
    setShowBanner(false);
    console.log("All cookies accepted");
    // Tracking scripts will load on next page reload or as configured
  };

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      marketing: false,
      personalization: false,
    };
    localStorage.setItem("cookiePreferences", JSON.stringify(onlyEssential));
    localStorage.setItem("cookieConsent", "essential-only");
    setShowBanner(false);
    console.log("Only essential cookies enabled");
  };

  const handleCustomize = () => {
    setShowModal(true);
  };

  return (
    <>
      <CookiePreferencesModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setShowBanner(false);
        }}
      />

      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-trust-200 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Message Section */}
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-trust-900 mb-1">
                        We use cookies to enhance your experience
                      </h3>
                      <p className="text-sm text-trust-600 leading-relaxed">
                        We use essential cookies for security and functionality,
                        and optional cookies for analytics and personalization.
                        You can customize your preferences or review our{" "}
                        <Link
                          to="/cookie-policy"
                          className="text-brand-primary hover:text-brand-primary/80 font-medium underline"
                        >
                          Cookie Policy
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-brand-primary hover:text-brand-primary/80 font-medium underline"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions Section */}
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleRejectAll}
                    className="px-4 py-2 text-sm font-medium text-trust-700 bg-trust-100 hover:bg-trust-200 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Reject
                  </button>
                  <button
                    onClick={handleCustomize}
                    className="px-4 py-2 text-sm font-medium text-brand-primary border border-brand-primary hover:bg-brand-primary/5 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Customize
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-brand-primary to-orange-600 hover:shadow-lg rounded-lg transition-shadow whitespace-nowrap"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={() => setShowBanner(false)}
                    className="p-2 text-trust-500 hover:text-trust-700 transition-colors flex-shrink-0"
                    aria-label="Close cookie banner"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
