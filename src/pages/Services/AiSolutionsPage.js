import { Helmet } from "react-helmet-async";
import { Bot, Network, ScanLine, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../../components/ui/Button";

export default function AiSolutionsPage() {
  const sections = [
    {
      title: "Computer Vision",
      description: "We build computer vision systems that enable machines to interpret and understand visual information. Our solutions improve automation, accuracy, and security across industries.",
      useCases: [
        "Image & video analysis",
        "Object detection and tracking", 
        "Facial recognition systems",
        "Automated quality inspection",
      ],
      icon: ScanLine,
      color: "from-brand-primary to-orange-600",
    },
    {
      title: "Predictive Analytics", 
      description: "Our AI models analyze historical and real-time data to forecast outcomes, identify risks, and uncover opportunities for proactive decision-making.",
      useCases: [
        "Demand forecasting",
        "Customer churn prediction",
        "Risk & anomaly detection", 
        "Operational performance insights",
      ],
      icon: Network,
      color: "from-brand-accent to-blue-600",
    },
    {
      title: "Natural Language Processing",
      description: "We design NLP solutions that allow systems to understand and generate human language, enabling smarter automation and better customer engagement.",
      useCases: [
        "Chatbots & virtual assistants",
        "Text classification & sentiment analysis",
        "Document processing & summarization",
        "Search and knowledge extraction",
      ],
      icon: Bot,
      color: "from-purple-500 to-purple-700",
    },
  ];

  return (
    <>
      <Helmet>
        <title>AI Solutions — Quadravise</title>
        <meta
          name="description"
          content="Explore Quadravise AI solutions including computer vision, predictive analytics, and natural language processing to automate workflows and drive smarter decisions."
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
          const ai = new Intelligence();
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="absolute top-48 right-8 text-brand-accent/30 font-mono text-sm hidden lg:block"
        >
          ai.learn().predict().optimize();
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="absolute bottom-32 left-1/4 text-purple-400/30 font-mono text-sm hidden lg:block"
        >
          vision.detect = 'everything';
        </motion.div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-base font-semibold leading-7 text-brand-primary mb-4">
              AI Solutions
            </h2>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
              Intelligent Systems That Drive
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                Business Impact
              </span>
            </h1>
            <p className="text-xl text-trust-300 max-w-3xl mx-auto">
              We leverage artificial intelligence to automate workflows, unlock insights, and enhance digital experiences across industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI CAPABILITIES */}
      <section className="bg-trust-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((sec, index) => (
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
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${sec.color} mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <sec.icon className="h-7 w-7 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-trust-900 mb-4">
                  {sec.title}
                </h3>

                <p className="text-trust-600 mb-6 leading-relaxed">
                  {sec.description}
                </p>

                <div className="pt-6 border-t border-trust-200">
                  <h4 className="text-sm font-semibold text-trust-500 mb-4">
                    Use Cases
                  </h4>
                  <ul className="space-y-2">
                    {sec.useCases.map((useCase, idx) => (
                      <li key={idx} className="flex items-start text-sm text-trust-600">
                        <span className="mt-2 mr-3 h-1.5 w-1.5 rounded-full bg-brand-primary flex-shrink-0" />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
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
              Build Intelligent Systems with Quadravise
            </h2>
            <p className="text-xl text-trust-300 max-w-3xl mx-auto mb-10">
              Let's explore how AI can solve real business problems for your organization.
            </p>
            <a href="/contact">
              <Button className="bg-brand-primary hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                Talk to an AI Expert
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}