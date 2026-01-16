import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code,
  Brain,
  ShoppingCart,
  TestTube,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Button from "../components/ui/Button";

export default function Services() {
  const capabilities = [
    {
      title: "Custom Web Applications",
      challenge:
        "Off-the-shelf software is rigid and bloated. You need a tool that maps 1:1 to your workflow.",
      solution:
        "Bespoke React architectures with Node.js/Go backends. Zero bloat, maximum velocity.",
      tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
      icon: Code,
      color: "from-brand-primary to-orange-600",
    },
    {
      title: "AI Integration & Agents",
      challenge:
        "AI is often a gimmick. You need it to drive actual business value.",
      solution:
        "We embed LLMs directly into your data pipelines for automated reasoning and content generation.",
      tags: ["Transformers", "RAG", "Python", "LangChain"],
      icon: Brain,
      color: "from-brand-accent to-blue-600",
    },
    {
      title: "High-Scale E-Commerce",
      challenge: "Slow stores kill conversion. Security flaws kill trust.",
      solution:
        "Headless commerce engines that load in milliseconds and withstand Black Friday spikes.",
      tags: ["Headless", "Stripe", "Redis", "CDN Edge"],
      icon: ShoppingCart,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Automated QA Pipelines",
      challenge: "Manual testing is slow and error-prone.",
      solution:
        "Self-healing E2E test suites that run on every commit. If it breaks, you know instantly.",
      tags: ["Playwright", "Allure", "CI/CD", "Docker"],
      icon: TestTube,
      color: "from-brand-success to-green-600",
    },
  ];

  const engagementModels = [
    {
      title: "The Sprint",
      subtitle: "Project-Based",
      description:
        "Perfect for defined scopes. We scope, architect, and deliver a specific module or MVP within a fixed timeline.",
      features: [
        "Fixed Budget & Timeline",
        "Full PM & QA Inclusion",
        "Weekly Deliverables",
        "IP Transfer on Day 1",
      ],
      cta: "Start a Project",
      popular: false,
    },
    {
      title: "The Squad",
      subtitle: "Dedicated Team",
      description:
        "Scale your engineering capacity instantly. We provide a pre-vetted team that integrates directly into your Slack/Jira.",
      features: [
        "Senior-Only Engineers",
        "Direct Communication",
        "Scale Up/Down Monthly",
        "Zero Hiring Overhead",
      ],
      cta: "Hire a Squad",
      popular: true,
    },
    {
      title: "The Architect",
      subtitle: "Strategic Retainer",
      description:
        "Ongoing CTO-level advisory for teams that have developers but lack high-level architectural direction.",
      features: [
        "Code Reviews & Audits",
        "Architecture Planning",
        "DevOps Strategy",
        "Vendor Selection",
      ],
      cta: "Get Advisory",
      popular: false,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Services — Engineering Your Digital Future</title>
        <meta
          name="description"
          content="Custom AI integrations, web applications, e-commerce platforms, and QA automation. Flexible engagement models for every need."
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

        {/* Floating Code Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-10 bg-trust-800/50 backdrop-blur-sm border border-trust-700 rounded-lg p-3 text-xs text-brand-accent font-mono"
          >
            const services = new Architecture()
          </motion.div>
          <motion.div
            animate={{ y: [20, -20, 20], rotate: [0, -3, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            className="absolute bottom-32 right-16 bg-trust-800/50 backdrop-blur-sm border border-trust-700 rounded-lg p-3 text-xs text-brand-primary font-mono"
          >
            deploy.scale = "infinite"
          </motion.div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.2] mb-8">
              Engineering Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                Digital Future.
              </span>
            </h1>

            <p className="text-xl text-trust-300 max-w-3xl mx-auto">
              From bespoke AI integrations to high-scale e-commerce
              architectures, we build systems that scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES SECTION */}
      <section className="bg-trust-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-trust-900 mb-6">
              Capabilities
            </h2>
            <p className="text-xl text-trust-600 max-w-3xl mx-auto">
              We solve the hardest technical challenges with
              precision-engineered solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg shadow-trust-200/20 hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${capability.color} mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <capability.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-trust-900 mb-4">
                  {capability.title}
                </h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm font-semibold text-trust-500 mb-2">
                      The Challenge:
                    </p>
                    <p className="text-trust-600">{capability.challenge}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-trust-500 mb-2">
                      Our Solution:
                    </p>
                    <p className="text-trust-600">{capability.solution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {capability.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                      className="bg-trust-100 text-trust-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODELS SECTION */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-trust-900 mb-6">
              Flexible Engagement Models
            </h2>
            <p className="text-xl text-trust-600 max-w-3xl mx-auto">
              We adapt to your velocity. Whether you need a sniper team for a
              specific feature or a full department for long-term growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {engagementModels.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative bg-white rounded-2xl p-8 shadow-lg shadow-trust-200/20 hover:shadow-xl transition-all duration-300 ${
                  model.popular
                    ? "ring-2 ring-brand-primary"
                    : "border border-trust-200"
                }`}
              >
                {model.popular && (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  >
                    <span className="bg-brand-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      POPULAR
                    </span>
                  </motion.div>
                )}

                <h3 className="text-2xl font-bold text-trust-900 mb-2">
                  {model.title}
                </h3>

                <p className="text-brand-primary font-semibold mb-4">
                  {model.subtitle}
                </p>

                <p className="text-trust-600 mb-6 leading-relaxed">
                  {model.description}
                </p>

                <div className="space-y-3 mb-8">
                  {model.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                      className="flex items-center space-x-2"
                    >
                      <CheckCircle className="h-4 w-4 text-brand-success flex-shrink-0" />
                      <span className="text-trust-700 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <Link to="/contact">
                  <Button className="w-full justify-center bg-brand-primary hover:bg-orange-600 text-white">
                    {model.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-trust-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Stop building Legacy Code. Start building Assets.
            </h2>
            <p className="text-xl text-trust-300 max-w-3xl mx-auto">
              Join the innovative companies processing over $500M+ annually on
              Quadravise architectures.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: "$500M+", label: "Annual Processing" },
              { value: "10x", label: "Faster Development" },
              { value: "99.9%", label: "System Uptime" },
              { value: "24/7", label: "Support Coverage" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-trust-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative bg-trust-50 py-24 sm:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-trust-900 mb-8">
              Book a Technical Audit
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-brand-primary hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                  Start Technical Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link to="/products">
                <Button
                  variant="outline"
                  className="px-8 py-4 text-lg font-semibold"
                >
                  View Products
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
