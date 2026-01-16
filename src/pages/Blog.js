import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  // Calendar,
  // Clock,
  // User,
  // Tag,
  // TrendingUp,
} from "lucide-react";
import Button from "../components/ui/Button";

export default function BlogPage() {
  // const blogPosts = [
  //   {
  //     title: "The Future of AI in Enterprise: Beyond the Hype",
  //     excerpt:
  //       "Exploring practical AI implementations that drive real business value, from automated workflows to intelligent decision-making systems.",
  //     author: "Quadravise Team",
  //     date: "March 15, 2024",
  //     readTime: "8 min read",
  //     category: "AI & Machine Learning",
  //     image:
  //       "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
  //     featured: true,
  //   },
  //   {
  //     title: "Building Scalable Data Pipelines: Lessons from the Field",
  //     excerpt:
  //       "Key architectural decisions and best practices for creating data pipelines that handle millions of records while maintaining reliability.",
  //     author: "Quadravise Team",
  //     date: "March 10, 2024",
  //     readTime: "12 min read",
  //     category: "Data Engineering",
  //     image:
  //       "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  //     featured: false,
  //   },
  //   {
  //     title: "Microservices vs Monoliths: Making the Right Choice",
  //     excerpt:
  //       "A practical guide to choosing the right architecture for your project, with real-world examples and decision frameworks.",
  //     author: "Quadravise Team",
  //     date: "March 5, 2024",
  //     readTime: "10 min read",
  //     category: "Software Architecture",
  //     image:
  //       "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
  //     featured: false,
  //   },
  //   {
  //     title: "Automating Business Processes: ROI and Implementation",
  //     excerpt:
  //       "How to identify automation opportunities, calculate ROI, and implement solutions that deliver measurable business impact.",
  //     author: "Quadravise Team",
  //     date: "February 28, 2024",
  //     readTime: "6 min read",
  //     category: "Business Automation",
  //     image:
  //       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  //     featured: false,
  //   },
  //   {
  //     title: "Security-First Development: Building Trust from Day One",
  //     excerpt:
  //       "Essential security practices for modern applications, from secure coding to deployment strategies and ongoing monitoring.",
  //     author: "Quadravise Team",
  //     date: "February 20, 2024",
  //     readTime: "9 min read",
  //     category: "Security",
  //     image:
  //       "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
  //     featured: false,
  //   },
  //   {
  //     title: "The Economics of Technical Debt: When to Pay It Down",
  //     excerpt:
  //       "Understanding technical debt's impact on velocity and making data-driven decisions about when and how to address it.",
  //     author: "Quadravise Team",
  //     date: "February 15, 2024",
  //     readTime: "7 min read",
  //     category: "Engineering Management",
  //     image:
  //       "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
  //     featured: false,
  //   },
  // ];

  // const categories = [
  //   "All Posts",
  //   "AI & Machine Learning",
  //   "Data Engineering",
  //   "Software Architecture",
  //   "Business Automation",
  //   "Security",
  //   "Engineering Management",
  // ];

  return (
    <>
      <Helmet>
        <title>Blog — Insights from the Quadravise Team</title>
        <meta
          name="description"
          content="Thoughtful articles, case studies, and practical guides on AI, product development, data platforms, and scalable operations."
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
            blog.insights = "practical"
          </motion.div>
          <motion.div
            animate={{ y: [20, -20, 20], rotate: [0, -3, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            className="absolute bottom-32 right-16 bg-trust-800/50 backdrop-blur-sm border border-trust-700 rounded-lg p-3 text-xs text-brand-primary font-mono"
          >
            knowledge.share()
          </motion.div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.2] mb-8">
              Insights from the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                Quadravise Team.
              </span>
            </h1>

            <p className="text-xl text-trust-300 max-w-3xl mx-auto">
              Thoughtful articles, case studies, and practical guides on AI,
              product development, data platforms, and scalable operations.
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
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-3xl font-bold text-trust-900 mb-6">
                Blog Coming Soon
              </h2>
              <p className="text-xl text-trust-600 mb-8">
                We're preparing in-depth articles and real-world insights around
                AI, SaaS platforms, data engineering, and operational scale.
                Stay tuned for practical guides and industry insights.
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
              Ready to Transform Your Business?
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
