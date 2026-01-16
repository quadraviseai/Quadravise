import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  // TrendingUp,
  // Users,
  // Clock,
  // CheckCircle,
  // ExternalLink,
} from "lucide-react";
import Button from "../components/ui/Button";

export default function CaseStudiesPage() {
  // const caseStudies = [
  //   {
  //     title: "AI-Powered Customer Analytics Platform",
  //     client: "Fortune 500 Retail Chain",
  //     industry: "Retail & E-commerce",
  //     challenge:
  //       "Manual customer segmentation taking weeks, limited personalization capabilities",
  //     solution:
  //       "Built real-time ML pipeline processing 10M+ customer interactions daily",
  //     results: [
  //       "40% increase in conversion rates",
  //       "60% reduction in analysis time",
  //       "300% improvement in personalization accuracy",
  //     ],
  //     technologies: ["Python", "TensorFlow", "Apache Kafka", "PostgreSQL"],
  //     timeline: "8 weeks",
  //     image:
  //       "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  //   },
  //   {
  //     title: "Scalable Healthcare Data Platform",
  //     client: "Regional Healthcare Network",
  //     industry: "Healthcare",
  //     challenge:
  //       "Fragmented patient data across 15+ systems, compliance requirements",
  //     solution:
  //       "Unified HIPAA-compliant data lake with real-time analytics dashboard",
  //     results: [
  //       "90% faster patient data retrieval",
  //       "100% HIPAA compliance maintained",
  //       "50% reduction in administrative overhead",
  //     ],
  //     technologies: ["AWS", "React", "Node.js", "MongoDB"],
  //     timeline: "12 weeks",
  //     image:
  //       "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
  //   },
  //   {
  //     title: "Automated Financial Reporting System",
  //     client: "Mid-Market Financial Services",
  //     industry: "Financial Services",
  //     challenge:
  //       "Manual report generation taking 40+ hours monthly, error-prone processes",
  //     solution:
  //       "Automated reporting pipeline with real-time data validation and alerts",
  //     results: [
  //       "95% reduction in report generation time",
  //       "Zero manual errors in financial reports",
  //       "24/7 automated compliance monitoring",
  //     ],
  //     technologies: ["Python", "FastAPI", "PostgreSQL", "Docker"],
  //     timeline: "6 weeks",
  //     image:
  //       "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
  //   },
  // ];

  return (
    <>
      <Helmet>
        <title>Case Studies — Real Results, Measurable Impact</title>
        <meta
          name="description"
          content="Discover how Quadravise has helped organizations achieve measurable results through AI, automation, and scalable solutions."
        />
      </Helmet>

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
            results.impact = "measurable"
          </motion.div>
          <motion.div
            animate={{ y: [20, -20, 20], rotate: [0, -3, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            className="absolute bottom-32 right-16 bg-trust-800/50 backdrop-blur-sm border border-trust-700 rounded-lg p-3 text-xs text-brand-primary font-mono"
          >
            success.stories = true
          </motion.div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.2] mb-8">
              Real Results,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                Measurable Impact.
              </span>
            </h1>

            <p className="text-xl text-trust-300 max-w-3xl mx-auto">
              Discover how we've helped organizations achieve breakthrough
              results through AI, automation, and scalable solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* COMING SOON SECTION */}
      <section className="bg-trust-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl p-12 shadow-xl shadow-trust-200/20 max-w-3xl mx-auto">
              <div className="text-6xl mb-6">📊</div>
              <h2 className="text-3xl font-bold text-trust-900 mb-6">
                Case Studies Coming Soon
              </h2>
              <p className="text-xl text-trust-600 mb-8">
                We're preparing detailed case studies showcasing how we've
                helped organizations achieve breakthrough results. Stay tuned
                for real-world examples and measurable impact stories.
              </p>
              <Link to="/contact">
                <Button className="bg-brand-primary hover:bg-orange-600 text-white px-8 py-4">
                  Get Notified
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-trust-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-trust-900 mb-8">
              Ready to Create Your Success Story?
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-brand-primary hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link to="/services">
                <Button
                  variant="outline"
                  className="px-8 py-4 text-lg font-semibold border-trust-300 text-trust-700 hover:bg-trust-100"
                >
                  View Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
