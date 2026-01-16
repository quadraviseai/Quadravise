import { Helmet } from "react-helmet-async";
import { Smartphone, Globe, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../../components/ui/Button";

export default function WebMobilePage() {
  const services = [
    {
      title: "Custom Web Applications",
      description: "Bespoke React architectures with Node.js/Go backends. Zero bloat, maximum velocity.",
      features: [
        "React & Next.js",
        "Node.js & Go backends", 
        "PostgreSQL & Redis",
        "Tailwind CSS styling"
      ],
      icon: Globe,
      color: "from-brand-primary to-orange-600",
    },
    {
      title: "Mobile Development",
      description: "Native-quality mobile apps built with React Native and Flutter for cross-platform excellence.",
      features: [
        "React Native & Flutter",
        "iOS & Android native",
        "Cross-platform deployment",
        "App Store optimization"
      ],
      icon: Smartphone,
      color: "from-brand-accent to-blue-600",
    },
    {
      title: "Performance Optimization",
      description: "Lightning-fast applications that load in milliseconds and scale to millions of users.",
      features: [
        "Sub-second load times",
        "CDN edge deployment",
        "Auto-scaling infrastructure", 
        "Performance monitoring"
      ],
      icon: Zap,
      color: "from-purple-500 to-purple-700",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Web & Mobile Development — Quadravise</title>
        <meta
          name="description"
          content="Custom web applications and mobile development with React, Next.js, React Native, and Flutter. Built for scale and performance."
        />
      </Helmet>

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-trust-900 via-trust-800 to-trust-900 py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.8)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>
        
        {/* Floating Code Elements */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-32 left-8 text-brand-primary/30 font-mono text-sm hidden lg:block"
        >
          const app = new WebApp();
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="absolute top-48 right-8 text-brand-accent/30 font-mono text-sm hidden lg:block"
        >
          app.deploy().scale('infinite');
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="absolute bottom-32 left-1/4 text-purple-400/30 font-mono text-sm hidden lg:block"
        >
          performance.optimize = true;
        </motion.div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-base font-semibold leading-7 text-brand-primary mb-4">
              Web & Mobile Development
            </h2>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
              Scalable Digital Platforms
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                Built for Growth
              </span>
            </h1>
            <p className="text-xl text-trust-300 max-w-3xl mx-auto">
              From bespoke web applications to native mobile experiences, we build digital platforms that scale with your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-trust-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg shadow-trust-200/20 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <service.icon className="h-7 w-7 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-trust-900 mb-4">
                  {service.title}
                </h3>

                <p className="text-trust-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-6 border-t border-trust-200">
                  <h4 className="text-sm font-semibold text-trust-500 mb-4">
                    Technologies
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-trust-600">
                        <span className="mt-2 mr-3 h-1.5 w-1.5 rounded-full bg-brand-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-trust-900 mb-6">
              Performance That Matters
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-trust-900 mb-2">&lt;1s</div>
              <div className="text-trust-600">Load Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-trust-900 mb-2">99.9%</div>
              <div className="text-trust-600">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-trust-900 mb-2">10M+</div>
              <div className="text-trust-600">Users Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-trust-900 mb-2">24/7</div>
              <div className="text-trust-600">Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
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
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Build Your Platform?
            </h2>
            <p className="text-xl text-trust-300 max-w-3xl mx-auto mb-10">
              Let's create a digital experience that scales with your ambitions.
            </p>
            <a href="/contact">
              <Button className="bg-brand-primary hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}