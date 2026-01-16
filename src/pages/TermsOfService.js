import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FileText, Scale, AlertTriangle, Lock, Zap, Users } from "lucide-react";

export default function TermsOfService() {
  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      description:
        "By accessing and using Quadravise services, you accept and agree to be bound by the terms and provision of this agreement.",
      items: [
        "You must be at least 18 years old",
        "You accept our Terms of Service in full",
        "You agree to our Privacy Policy",
        "You agree to our Cookie Policy",
      ],
      color: "from-brand-primary to-orange-600",
    },
    {
      icon: Scale,
      title: "Use License",
      description:
        "We grant you a limited license to access and use our services for lawful purposes only.",
      items: [
        "Non-exclusive, non-transferable license",
        "For personal or internal business use only",
        "You may not modify or copy content",
        "You may not use for commercial purposes without permission",
      ],
      color: "from-brand-accent to-blue-600",
    },
    {
      icon: AlertTriangle,
      title: "User Responsibilities",
      description:
        "You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.",
      items: [
        "Keep your password secure and confidential",
        "Notify us of unauthorized access immediately",
        "Use the service in compliance with all laws",
        "Not engage in unauthorized access or use",
      ],
      color: "from-purple-500 to-purple-700",
    },
    {
      icon: Lock,
      title: "Intellectual Property Rights",
      description:
        "All content, features, and functionality on our site are owned by Quadravise or our licensors.",
      items: [
        "All software and code are protected by copyright",
        "Trademarks and logos are our property",
        "You cannot use our IP without permission",
        "Respect our intellectual property rights",
      ],
      color: "from-brand-success to-green-600",
    },
    {
      icon: Zap,
      title: "Limitation of Liability",
      description:
        "In no event shall Quadravise or its suppliers be liable for damages arising out of the use of services.",
      items: [
        "Indirect or consequential damages excluded",
        "Service provided 'as is' without warranties",
        "We are not liable for data loss",
        "Maximum liability limited to service fees",
      ],
      color: "from-red-500 to-pink-600",
    },
    {
      icon: Users,
      title: "Termination of Service",
      description:
        "We reserve the right to terminate or suspend your account and access to services at any time.",
      items: [
        "Termination for violation of terms",
        "Immediate termination for unlawful use",
        "Refunds processed per our refund policy",
        "Consequences of termination explained upfront",
      ],
      color: "from-indigo-500 to-indigo-700",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Terms of Service — Legal Agreement</title>
        <meta
          name="description"
          content="Read our comprehensive Terms of Service to understand the rules and responsibilities governing your use of Quadravise services."
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
              Terms of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                Service.
              </span>
            </h1>
            <p className="text-xl text-trust-200 max-w-2xl mx-auto">
              Please read our Terms of Service carefully before using our
              platform and services.
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
              Questions About Our Terms?
            </h2>
            <p className="text-xl text-trust-600">
              Our legal team is here to help clarify any concerns.
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
