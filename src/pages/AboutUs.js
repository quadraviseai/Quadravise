import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Users,
  Code,
  Cog,

  MapPin,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Button from "../components/ui/Button";

export default function AboutUs() {
  const pillars = [
    {
      title: "Democratize Elite Engineering",
      description: "High-end tech for startups & enterprises.",
      icon: Users,
      color: "from-brand-primary to-orange-600",
    },
    {
      title: "Eliminate Technical Debt",
      description: "We don't just ship, we ship clean.",
      icon: Code,
      color: "from-brand-accent to-blue-600",
    },
    {
      title: "Speed of Thought",
      description: "Intent > Syntax.",
      icon: Target,
      color: "from-purple-500 to-purple-700",
    },
  ];

  const teamRoles = [
    {
      title: "Full-Stack Developers",
      description: "Masters of React, Node.js, Python, and modern frameworks",
      icon: Code,
      color: "from-brand-primary to-orange-600",
    },
    {
      title: "Backend Systems Engineers",
      description: "Architects of scalable APIs, microservices, and high-performance databases",
      icon: Cog,
      color: "from-brand-accent to-blue-600",
    },
    {
      title: "AI Integration Specialists",
      description: "Experts in LLMs, RAG pipelines, and intelligent agent systems",
      icon: Eye,
      color: "from-purple-500 to-purple-700",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About — It Started with a Focus on Quality</title>
        <meta
          name="description"
          content="Founded in India in 2025, Quadravise was built to fix the industry's quality problem. We architect intelligent, self-evolving software."
        />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-trust-900 via-trust-800 to-trust-900 py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl" />
        </div>

        {/* Subtle Team Connection Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <defs>
              <radialGradient id="teamGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Subtle connection nodes */}
            <circle cx="20%" cy="30%" r="3" fill="#f97316" opacity="0.4" />
            <circle cx="80%" cy="25%" r="3" fill="#0ea5e9" opacity="0.4" />
            <circle cx="70%" cy="70%" r="3" fill="#a855f7" opacity="0.4" />
            <circle cx="30%" cy="75%" r="3" fill="#10b981" opacity="0.4" />
            <circle cx="50%" cy="50%" r="4" fill="url(#teamGradient)" />
            {/* Subtle connecting lines */}
            <path
              d="M20,30 Q50,50 80,25"
              stroke="#f97316"
              strokeWidth="1"
              opacity="0.2"
              fill="none"
              strokeDasharray="2,4"
            />
            <path
              d="M80,25 Q50,50 70,70"
              stroke="#0ea5e9"
              strokeWidth="1"
              opacity="0.2"
              fill="none"
              strokeDasharray="2,4"
            />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-brand-primary/10 backdrop-blur-sm border border-brand-primary/20 rounded-full px-4 py-4 mb-8">
              <Calendar className="h-4 w-4 text-brand-primary" />
              <span className="text-sm font-medium text-brand-primary">
                Est. 2025, India
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.2] mb-8">
              It Started with a Focus on
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                Quality.
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ORIGIN STORY SECTION */}
      <section className="bg-trust-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-trust-900 mb-8">
                Origin Story
              </h2>

              <div className="space-y-6 text-lg text-trust-600 leading-relaxed">
                <p>
                  Quadravise was founded in India in 2025, but our roots go
                  deeper. Our leadership team spent years in the trenches of
                  Software Quality Control and Automation Architecture.
                </p>

                <p>
                  We saw a recurring pattern in the industry: agencies would
                  rush to deliver code, only for the client to suffer through
                  months of bugs and crashes later.
                </p>

                <p className="text-brand-primary font-semibold">
                  We started Quadravise to fix that. We wanted to build a
                  company where "robustness" wasn't an afterthought. When we
                  deliver a project, it works. Period.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl shadow-trust-200/20 border border-trust-200">
                <div className="flex items-center space-x-3 mb-6">
                  <MapPin className="h-6 w-6 text-brand-primary" />
                  <span className="text-lg font-semibold text-trust-900">
                    Konappana Agrahara, Electronic City, 560100 Bengaluru, Karnataka, India
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-trust-100">
                    <span className="text-trust-600">Founded</span>
                    <span className="font-semibold text-trust-900">2025</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-trust-100">
                    <span className="text-trust-600">Focus</span>
                    <span className="font-semibold text-trust-900">
                      Quality & Robustness
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-trust-100">
                    <span className="text-trust-600">Specialty</span>
                    <span className="font-semibold text-trust-900">
                      AI-Augmented Engineering
                    </span>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-trust-900 mb-6">
              Core Philosophy
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 rounded-2xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Eye className="h-8 w-8 text-brand-primary" />
                <h3 className="text-2xl font-bold text-trust-900">
                  The Vision
                </h3>
                <span className="text-sm text-trust-500">(Our North Star)</span>
              </div>

              <blockquote className="text-lg text-trust-700 leading-relaxed italic mb-6">
                "To architect a digital world where software is no longer static
                or brittle, but intelligent, self-evolving, and universally
                accessible."
              </blockquote>

              <p className="text-trust-600">
                We aim to become the global benchmark for{" "}
                <strong>AI-Augmented Engineering</strong>. We foresee a future
                where "Legacy Code" doesn't exist because systems heal and
                update themselves automatically.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-500/5 to-brand-success/5 rounded-2xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Target className="h-8 w-8 text-brand-accent" />
                <h3 className="text-2xl font-bold text-trust-900">
                  The Mission
                </h3>
                <span className="text-sm text-trust-500">
                  (Our Daily Purpose)
                </span>
              </div>

              <blockquote className="text-lg text-trust-700 leading-relaxed italic mb-6">
                "To democratize elite software engineering by fusing human
                architectural mastery with the velocity of AI."
              </blockquote>

              <p className="text-trust-600">
                We exist to eliminate technical debt, delivering robust,
                self-healing systems that allow businesses to innovate at the{" "}
                <strong>speed of thought</strong>—not the speed of typing.
              </p>
            </motion.div>
          </div>

          {/* Three Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-trust-900 mb-8">
              Three Pillars
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-trust-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.color} mx-auto mb-6 shadow-lg`}
                >
                  <pillar.icon className="h-8 w-8 text-white" />
                </div>

                <h4 className="text-xl font-bold text-trust-900 mb-3">
                  {pillar.title}
                </h4>

                <p className="text-trust-600">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="bg-trust-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Engineers, Architects, and Dreamers.
            </h2>
            <p className="text-xl text-trust-300 max-w-4xl mx-auto">
              We are a team of full-stack developers, UI/UX designers, and
              automation engineers. We work remotely, we work hard, and we are
              constantly learning. Whether we are experimenting with the latest
              3D libraries (like Three.js) or fine-tuning a PHP backend, we love
              what we do.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamRoles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-trust-800/50 backdrop-blur-sm border border-trust-700 rounded-2xl p-8 hover:border-brand-primary/50 transition-all duration-300"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${role.color} mb-6 shadow-lg`}
                >
                  <role.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {role.title}
                </h3>

                <p className="text-trust-300 leading-relaxed">
                  {role.description}
                </p>
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
            <h2 className="text-4xl font-bold text-trust-900 mb-6">
              Ready to Build the Future Together?
            </h2>

            <p className="text-xl text-trust-600 max-w-3xl mx-auto mb-10">
              Join us in creating software that thinks, adapts, and evolves.
              Let's architect your digital transformation.
            </p>

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
                  className="px-8 py-4 text-lg font-semibold"
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
