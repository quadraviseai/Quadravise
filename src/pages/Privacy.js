import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Users, Zap } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      description:
        "We collect information that you provide directly to us, including:",
      items: [
        "Name and contact information",
        "Account credentials",
        "Payment information",
        "Communications with us",
      ],
      color: "from-brand-primary to-orange-600",
    },
    {
      icon: Zap,
      title: "How We Use Your Information",
      description: "We use the information we collect to:",
      items: [
        "Provide and maintain our services",
        "Process your transactions",
        "Send you notifications and updates",
        "Improve our services",
        "Comply with legal obligations",
      ],
      color: "from-brand-accent to-blue-600",
    },
    {
      icon: Users,
      title: "Information Sharing",
      description:
        "We do not sell or rent your personal information to third parties. We may share your information with:",
      items: [
        "Service providers and business partners",
        "Law enforcement when required by law",
        "Other parties with your consent",
      ],
      color: "from-purple-500 to-purple-700",
    },
    {
      icon: Lock,
      title: "Data Security",
      description:
        "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or destruction.",
      items: [],
      color: "from-brand-success to-green-600",
    },
    {
      icon: Shield,
      title: "Your Rights",
      description: "You have the right to:",
      items: [
        "Access your personal information",
        "Correct inaccurate data",
        "Request deletion of your data",
        "Opt-out of marketing communications",
      ],
      color: "from-red-500 to-pink-600",
    },
    {
      icon: FileText,
      title: "Changes to This Policy",
      description:
        "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
      items: [],
      color: "from-indigo-500 to-indigo-700",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy — Your Data, Your Control</title>
        <meta
          name="description"
          content="Understand how Quadravise collects, uses, and protects your personal information. Your privacy is our priority."
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
              Your Data, Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                Control.
              </span>
            </h1>
            <p className="text-xl text-trust-200 max-w-2xl mx-auto">
              We're transparent about how we collect, use, and protect your
              information.
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

      {/* CONTACT SECTION */}
      <section className="bg-white py-24 sm:py-32 border-t border-trust-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-trust-900 mb-4">
              Questions About Your Privacy?
            </h2>
            <p className="text-xl text-trust-600">
              We're here to help and answer any questions you might have.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-trust-50 rounded-lg p-8 text-center"
            >
              <h3 className="font-semibold text-trust-900 mb-2">Email</h3>
              <a
                href="mailto:support@quadravise.com"
                className="text-brand-primary font-medium hover:text-brand-primary/80 transition-colors"
              >
                support@quadravise.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-trust-50 rounded-lg p-8 text-center"
            >
              <h3 className="font-semibold text-trust-900 mb-2">Phone</h3>
              <a
                href="tel:+91-9538631238"
                className="text-brand-primary font-medium hover:text-brand-primary/80 transition-colors"
              >
                +91-9538631238
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-trust-50 rounded-lg p-8 text-center"
            >
              <h3 className="font-semibold text-trust-900 mb-2">
                Last Updated
              </h3>
              <p className="text-brand-primary font-medium">
                {new Date().toLocaleDateString()}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
