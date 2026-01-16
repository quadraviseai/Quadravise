import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  Heart,
  ArrowRight,
  Zap,
  Shield,
  Brain,
} from "lucide-react";
import Button from "../components/ui/Button";

export default function Products() {
  const products = [
    {
      name: "QuadraiLearn",
      subtitle: "The AI-Powered Study Companion",
      description:
        "Imagine a textbook that writes itself. QuadraiLearn uses Generative UI to structure comprehensive learning paths, chapters, and mock tests for any niche topic instantly.",
      tags: ["Generative UI", "Adaptive Learning", "Instant Mock Tests"],
      icon: GraduationCap,
      color: "from-brand-primary to-orange-600",
      workflow: [
        {
          step: "Input Topic",
          desc: 'User enters "Advanced Java Garbage Collection".',
        },
        {
          step: "Generative Structuring",
          desc: "AI Architect outlines chapters and sub-modules.",
        },
        {
          step: "Validation & Testing",
          desc: "System generates mock tests to verify mastery.",
        },
      ],
    },
    {
      name: "QuadraCRM",
      subtitle: "Customer Intelligence Redefined",
      description:
        "Stop guessing what your customers want. QuadraiCRM analyzes every interaction—emails, calls, tickets—to predict churn risk and identify upsell opportunities with 94% accuracy.",
      tags: ["Sentiment Analysis", "Churn Prediction", "Auto-Drafting"],
      icon: Users,
      color: "from-brand-accent to-blue-600",
      workflow: [
        {
          step: "Data Ingestion",
          desc: "Syncs emails, Slack, and support tickets in real-time.",
        },
        {
          step: "Sentiment Architecture",
          desc: "LLMs analyze tone and intent behind every message.",
        },
        {
          step: "Actionable Insights",
          desc: 'Alerts sales team to "High Risk" accounts instantly.',
        },
      ],
    },
    {
      name: "QuadraMedical",
      subtitle: "Diagnostic Assistant for Pros",
      description:
        "Supporting doctors with second opinions. QuadraiMedical scans X-rays, MRIs, and patient history to flag anomalies that the human eye might miss, reducing diagnostic errors by 30%.",
      tags: ["Tele-Radiology", "HIPAA Compliant", "Anomaly Detection"],
      icon: Heart,
      color: "from-purple-500 to-purple-700",
      workflow: [
        {
          step: "Secure Upload",
          desc: "End-to-end encrypted transfer of DICOM images.",
        },
        {
          step: "Computer Vision Scan",
          desc: "Convolutional Neural Networks identify micro-fractures.",
        },
        {
          step: "Physician Review",
          desc: "Generates a preliminary report for doctor approval.",
        },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Products — Quadravise Innovation Lab</title>
        <meta
          name="description"
          content="AI-powered products: QuadraiLearn for education, QuadraiCRM for business intelligence, and QuadraiMedical for healthcare diagnostics."
        />
      </Helmet>

      {/* Futuristic Grid Overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f97316_1px,transparent_1px),linear-gradient(to_bottom,#f97316_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-trust-900 via-trust-800 to-trust-900 py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl" />
        </div>

        {/* Subtle Product Constellation */}
        <div className="absolute inset-0 opacity-8">
          <svg className="w-full h-full">
            <defs>
              <radialGradient id="productGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Product constellation points */}
            <circle cx="25%" cy="35%" r="4" fill="#f97316" opacity="0.4" />
            <circle cx="75%" cy="30%" r="4" fill="#0ea5e9" opacity="0.4" />
            <circle cx="65%" cy="65%" r="4" fill="#a855f7" opacity="0.4" />
            <circle cx="50%" cy="50%" r="6" fill="url(#productGradient)" />
            {/* Gentle connecting arcs */}
            <motion.path
              d="M25,35 Q50,25 75,30"
              stroke="#f97316"
              strokeWidth="1"
              opacity="0.2"
              fill="none"
              strokeDasharray="2,4"
              animate={{ strokeDashoffset: [0, -10] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.path
              d="M75,30 Q70,50 65,65"
              stroke="#0ea5e9"
              strokeWidth="1"
              opacity="0.2"
              fill="none"
              strokeDasharray="2,4"
              animate={{ strokeDashoffset: [0, -10] }}
              transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            />
          </svg>
        </div>

        {/* Floating Code Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [-15, 15, -15], rotate: [0, 3, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute top-32 left-16 bg-trust-800/50 backdrop-blur-sm border border-trust-700 rounded-lg p-3 text-xs text-brand-accent font-mono"
          >
            products.ai.learn()
          </motion.div>
          <motion.div
            animate={{ y: [15, -15, 15], rotate: [0, -2, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
            className="absolute bottom-40 right-20 bg-trust-800/50 backdrop-blur-sm border border-trust-700 rounded-lg p-3 text-xs text-brand-primary font-mono"
          >
            intelligence.level = "max"
          </motion.div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-brand-primary/10 backdrop-blur-sm border border-brand-primary/20 rounded-full px-4 py-2 mb-8">
              <Brain className="h-4 w-4 text-brand-primary" />
              <span className="text-sm font-medium text-brand-primary">
                Innovation Lab
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.3] mb-8">
              Building for the Future of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                Everything.
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="bg-trust-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-24">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Content */}
                <motion.div
                  className={index % 2 === 1 ? "lg:col-start-2" : ""}
                  whileHover={{ x: index % 2 === 1 ? -10 : 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${product.color} mb-8 shadow-lg`}
                  >
                    <product.icon className="h-8 w-8 text-white" />
                  </div>

                  <h2 className="text-4xl font-bold text-trust-900 mb-4">
                    {product.name}
                  </h2>

                  <p className="text-xl text-brand-primary font-semibold mb-6">
                    {product.subtitle}
                  </p>

                  <p className="text-lg text-trust-600 leading-relaxed mb-8">
                    {product.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {product.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 + tagIndex * 0.1 }}
                        className="bg-white border border-trust-200 rounded-full px-4 py-2 text-sm font-medium text-trust-700"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <Link to="/contact">
                    <Button className="bg-brand-primary hover:bg-orange-600 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                      Request Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>

                {/* Workflow Visualization */}
                <motion.div
                  className={index % 2 === 1 ? "lg:col-start-1" : ""}
                  whileHover={{ x: index % 2 === 1 ? 10 : -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-xl shadow-trust-200/20 border border-trust-200">
                    <h3 className="text-xl font-bold text-trust-900 mb-6">
                      Workflow
                    </h3>

                    <div className="space-y-6">
                      {product.workflow.map((step, stepIndex) => (
                        <motion.div
                          key={stepIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 + stepIndex * 0.1 }}
                          className="flex items-start space-x-4"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10 flex-shrink-0">
                            <span className="text-sm font-bold text-brand-primary">
                              {stepIndex + 1}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-trust-900 mb-1">
                              {step.step}
                            </h4>
                            <p className="text-trust-600 text-sm leading-relaxed">
                              {step.desc}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Status Indicator */}
                    <div className="mt-8 pt-6 border-t border-trust-200">
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 bg-green-400 rounded-full"
                        />
                        <span className="text-sm text-trust-600">
                          AI System Active
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES COMPARISON */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-trust-900 mb-6">
              Why Choose Quadravise Products?
            </h2>
            <p className="text-xl text-trust-600 max-w-3xl mx-auto">
              Every product is built with our core AI-native architecture,
              ensuring scalability, intelligence, and reliability from day one.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Native",
                desc: "Intelligence embedded at the core, not bolted on as an afterthought.",
              },
              {
                icon: Zap,
                title: "Self-Healing",
                desc: "Automated systems that detect and fix issues before users notice.",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                desc: "HIPAA, SOC 2, and enterprise-grade security built into every product.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-8 bg-trust-50 rounded-2xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 mx-auto mb-6">
                  <feature.icon className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold text-trust-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-trust-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative bg-trust-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
              Ready to Experience the Future?
            </h2>

            <p className="text-xl text-trust-300 max-w-3xl mx-auto mb-10">
              See how our AI-powered products can transform your industry. Book
              a personalized demo today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-brand-primary hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                  Book Product Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link to="/services">
                <Button
                  variant="outline-white"
                  className="px-8 py-4 text-lg font-semibold"
                >
                  Custom Development
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
