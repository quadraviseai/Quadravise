import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Cookie,
  Settings,
  Shield,
  BarChart3,
  Clock,
  AlertCircle,
  Sliders,
} from "lucide-react";
import CookiePreferencesModal from "../components/common/CookiePreferencesModal";

export default function CookiePolicy() {
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const sections = [
    {
      icon: Cookie,
      title: "What Are Cookies?",
      description:
        "Cookies are small text files stored on your device that help us remember your preferences and improve your experience.",
      items: [
        "First-party cookies set by Quadravise",
        "Third-party cookies from analytics providers",
        "Session cookies for temporary functionality",
        "Persistent cookies for long-term preferences",
      ],
      color: "from-brand-primary to-orange-600",
    },
    {
      icon: BarChart3,
      title: "Types of Cookies We Use",
      description: "We use different types of cookies for specific purposes:",
      items: [
        "Essential cookies for core functionality",
        "Performance cookies to optimize loading",
        "Functional cookies for personalization",
        "Marketing cookies for targeted content",
      ],
      color: "from-brand-accent to-blue-600",
    },
    {
      icon: Settings,
      title: "Cookie Management",
      description:
        "You have full control over cookie preferences in your browser settings. You can:",
      items: [
        "Accept or reject cookies at any time",
        "Clear existing cookies from your device",
        "Set browser preferences for cookie handling",
        "Opt-out of specific cookie categories",
      ],
      color: "from-purple-500 to-purple-700",
    },
    {
      icon: Shield,
      title: "Third-Party Cookies",
      description:
        "We work with trusted partners who may set cookies for analytics, advertising, and user experience improvements.",
      items: [
        "Google Analytics for traffic analysis",
        "Advertising partners for targeted campaigns",
        "Social media platforms for integration",
        "Security providers for protection",
      ],
      color: "from-brand-success to-green-600",
    },
    {
      icon: Clock,
      title: "Cookie Duration",
      description:
        "Different cookies have different lifespans depending on their purpose:",
      items: [
        "Session cookies expire when you close your browser",
        "Persistent cookies remain for specified periods",
        "Analytics cookies typically last 12-24 months",
        "Marketing cookies vary by provider",
      ],
      color: "from-red-500 to-pink-600",
    },
    {
      icon: AlertCircle,
      title: "Your Consent",
      description:
        "We respect your privacy and will request your consent before placing non-essential cookies.",
      items: [
        "Explicit opt-in for marketing cookies",
        "Easy opt-out options available anytime",
        "Clear disclosure of cookie purposes",
        "Respect your privacy preferences",
      ],
      color: "from-indigo-500 to-indigo-700",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Cookie Policy — Transparency & Control</title>
        <meta
          name="description"
          content="Learn about how Quadravise uses cookies to enhance your experience and how to manage your preferences."
        />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-trust-900 via-trust-800 to-trust-900 py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.2] mb-8">
              Cookie
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                Policy.
              </span>
            </h1>
            <p className="text-xl text-trust-200 max-w-2xl mx-auto">
              Transparent information about how we use cookies and how you can
              manage them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="bg-trust-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 border border-trust-100"
                >
                  <div
                    className={`inline-flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br ${section.color} mb-6`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-trust-900 mb-4">
                    {section.title}
                  </h3>

                  <p className="text-trust-600 mb-6 leading-relaxed">
                    {section.description}
                  </p>

                  {section.items.length > 0 && (
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brand-primary/10 mr-3 flex-shrink-0 mt-0.5">
                            <svg
                              className="h-4 w-4 text-brand-primary"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <span className="text-trust-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PREFERENCES SECTION */}
      <section className="bg-white py-24 sm:py-32 border-t border-trust-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-trust-900 mb-4">
              Manage Your Cookie Preferences
            </h2>
            <p className="text-xl text-trust-600">
              You have complete control over your cookie experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-trust-50 rounded-lg p-8 text-center"
            >
              <h3 className="font-semibold text-trust-900 mb-2">
                Browser Settings
              </h3>
              <p className="text-trust-600">
                Adjust cookie preferences directly in your browser's privacy
                settings to manage all cookies globally.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-trust-50 rounded-lg p-8 text-center"
            >
              <h3 className="font-semibold text-trust-900 mb-2">
                Cookie Banner
              </h3>
              <p className="text-trust-600">
                Use our cookie preference center to customize which types of
                cookies you want to accept on our site.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-trust-50 rounded-lg p-8 text-center"
            >
              <h3 className="font-semibold text-trust-900 mb-2">
                Manage Preferences
              </h3>
              <p className="text-trust-600 mb-4">
                Open the preferences modal to customize your cookie settings.
              </p>
              <button
                onClick={() => setShowPreferencesModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary to-orange-600 text-white rounded-lg hover:shadow-lg transition-shadow text-sm font-medium"
              >
                <Sliders className="h-4 w-4" />
                Open Preferences
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <CookiePreferencesModal
        isOpen={showPreferencesModal}
        onClose={() => setShowPreferencesModal(false)}
      />
    </>
  );
}
