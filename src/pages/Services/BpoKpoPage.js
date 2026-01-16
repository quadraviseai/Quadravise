import { Helmet } from "react-helmet-async";
import { Headphones, Clock, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../../components/ui/Button";

export default function BpoKpoPage() {
  const services = [
    {
      title: "24/7 Support Operations",
      description: "Round-the-clock operational support with dedicated teams ensuring your business never sleeps.",
      features: [
        "24/7 availability",
        "Multi-channel support",
        "SLA-driven operations",
        "Escalation management"
      ],
      icon: Clock,
      color: "from-brand-primary to-orange-600",
    },
    {
      title: "Process Optimization",
      description: "Streamline your business processes with intelligent automation and continuous improvement methodologies.",
      features: [
        "Process automation",
        "Workflow optimization",
        "Quality assurance",
        "Performance metrics"
      ],
      icon: Users,
      color: "from-brand-accent to-blue-600",
    },
    {
      title: "Customer Support",
      description: "Exceptional customer service that builds loyalty and drives satisfaction through every interaction.",
      features: [
        "Omnichannel support",
        "CRM integration",
        "Ticket management",
        "Customer analytics"
      ],
      icon: Headphones,
      color: "from-purple-500 to-purple-700",
    },
  ];

  return (
    <>
      <Helmet>
        <title>BPO & KPO Services — Quadravise</title>
        <meta
          name="description"
          content="24/7 operational support, process optimization, and customer service excellence. Scale your operations with Quadravise."
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
          const support = new Service();
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="absolute top-48 right-8 text-brand-accent/30 font-mono text-sm hidden lg:block"
        >
          support.availability = '24/7';
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="absolute bottom-32 left-1/4 text-purple-400/30 font-mono text-sm hidden lg:block"
        >
          excellence.optimize();
        </motion.div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-base font-semibold leading-7 text-brand-primary mb-4">
              BPO & KPO Services
            </h2>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
              Operational Excellence
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                Around the Clock
              </span>
            </h1>
            <p className="text-xl text-trust-300 max-w-3xl mx-auto">
              24/7 operational support and process optimization that scales with your business needs.
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
                    Key Features
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
              Service Excellence
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-trust-900 mb-2">24/7</div>
              <div className="text-trust-600">Support Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-trust-900 mb-2">98%</div>
              <div className="text-trust-600">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-trust-900 mb-2">&lt;2min</div>
              <div className="text-trust-600">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-trust-900 mb-2">500K+</div>
              <div className="text-trust-600">Tickets Resolved</div>
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
              Scale Your Operations
            </h2>
            <p className="text-xl text-trust-300 max-w-3xl mx-auto mb-10">
              Let's optimize your business processes and deliver exceptional customer experiences together.
            </p>
            <a href="/contact">
              <Button className="bg-brand-primary hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}