import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Brain,
  Rocket,
  Play,
  CheckCircle,
  Compass,
  Cpu,
  Wrench,
  GraduationCap,
  Building2,
  ShoppingCart,
  Quote,
  HelpCircle,
} from "lucide-react";
import Button from "../components/ui/Button";

export default function HomePage() {
  // Hero Section Data
  const features = [
    "AI-Native Architecture",
    "Self-Healing Code",
    "10x Development Velocity",
    "Enterprise-Grade Security",
  ];

  // Value Proposition Data
  const valueFeatures = [
    {
      icon: Brain,
      title: "AI-Native Architecture",
      description:
        "LLMs aren't just a feature; they're the core. We embed intelligence directly into your business logic, creating systems that adapt and optimize themselves.",
      color: "from-brand-primary to-orange-600",
    },
    {
      icon: Wrench,
      title: "Self-Healing Code",
      description:
        "Automated healing pipelines that detect and patch bugs before users even notice.",
      color: "from-brand-accent to-blue-600",
    },
    {
      icon: Zap,
      title: "10x Velocity",
      description:
        "Weeks of sprint work compressed into days through Vibe Coding methodologies.",
      color: "from-purple-500 to-purple-700",
    },
  ];

  // Process Data
  const processSteps = [
    {
      icon: Compass,
      title: "Blueprint",
      description: 'Architects define the "Soul": Security, UX, and Logic.',
      color: "from-brand-primary to-orange-600",
    },
    {
      icon: Cpu,
      title: "Generative",
      description: "AI agents generate 80% of the boilerplate & opacity.",
      color: "from-brand-accent to-blue-600",
    },
    {
      icon: Wrench,
      title: "Refinement",
      description: 'Experts audit, optimize, and polish the "Last Mile".',
      color: "from-purple-500 to-purple-700",
    },
    {
      icon: Rocket,
      title: "Launch",
      description: "Automated CI/CD pipelines deploy to edge networks.",
      color: "from-brand-success to-green-600",
    },
  ];

  // Industries Data
  const industries = [
    {
      icon: GraduationCap,
      title: "EdTech & Learning",
      description:
        "Generative books, automated quizzes, and student analytics.",
      context: "Interactive learning platforms like QuadraiLearn",
    },
    {
      icon: Building2,
      title: "SaaS & Startups",
      description:
        "Multi-tenant architecture, subscription billing, and scalable cloud infra.",
      context: "Rapid MVP development",
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce",
      description:
        "Real-time inventory, secure payment gateways, and AI support agents.",
      context: "High-trust platforms like VTrust",
    },
  ];

  // Testimonials Data
  const testimonials = [
    {
      quote:
        "Working with our website creator was a smooth and professional experience. They clearly understood our vision and translated IRF Geometry’s services into a clean, structured, and user-friendly website. The final result truly reflects our work quality and brand identity",
      author: "Irfan Shaikh",
      role: "Founder, IRF Geometry",
    },
    {
      quote:
        "Most agencies build legacy code. Quadravise builds self-healing systems. It's the most robust platform we've ever launched.",
      author: "Varsha M",
      role: "Founder, Phoenix Innerbalance",
    },
    {
      quote:
        "The velocity is insane. We went from concept to enterprise MVP in 3 weeks. Highly recommended.",
      author: "Vignesh",
      role: "Owner, VTrust Carz",
    },
  ];

  // FAQ Data
  const faqs = [
    {
      question: 'Is "Vibe Coding" secure?',
      answer:
        "Yes. In fact, it's more secure. Our AI agents are trained to strictly follow OWASP security guidelines. Plus, every line of code goes through a human-led security audit before deployment.",
    },
    {
      question: "Do I own the code?",
      answer:
        "100%. Once we hand over the repository, you own the IP, the AI prompts, and the documentation.",
    },
    {
      question: "What if I need to scale?",
      answer:
        'Our systems are "Cloud Native." We build on AWS/Vercel architecture that auto-scales. Whether you have 100 users or 1 million, the system holds up.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Quadravise — We Build Software That Thinks</title>
        <meta
          name="description"
          content="AI-powered development with Vibe Coding. 10x faster, self-healing systems that adapt and optimize themselves."
        />
      </Helmet>

      {/* Futuristic Grid Overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f97316_1px,transparent_1px),linear-gradient(to_bottom,#f97316_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-trust-900 via-trust-800 to-trust-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-brand-primary/10 backdrop-blur-sm border border-brand-primary/20 rounded-full px-4 py-2"
              >
                <Brain className="h-4 w-4 text-brand-primary" />
                <span className="text-sm font-medium text-brand-primary">
                  Powered by Vibe Coding AI
                </span>
              </motion.div>

              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl lg:text-7xl font-bold text-white leading-[1.2]"
                >
                  We Build Software
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                    That Thinks.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-trust-300 leading-relaxed max-w-2xl"
                >
                  Quadravise is rewriting the rules of development. We combine
                  human architectural mastery with
                  <span className="text-brand-primary font-semibold">
                    {" "}
                    Vibe Coding
                  </span>{" "}
                  AI to ship robust, self-healing systems{" "}
                  <span className="text-brand-accent font-semibold">
                    10x faster
                  </span>
                  .
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 gap-3"
              >
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-brand-success flex-shrink-0" />
                    <span className="text-sm text-trust-300">{feature}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/contact">
                  <Button className="group bg-brand-primary hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <button className="group flex items-center space-x-3 px-8 py-0 text-lg font-semibold text-trust-300 hover:text-white transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-trust-800 border border-trust-700 group-hover:border-brand-primary transition-all duration-300">
                    <Play className="h-5 w-5 text-brand-primary ml-1" />
                  </div>
                  <span>Explore The Tech</span>
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-trust-800 rounded-2xl shadow-2xl shadow-trust-900/50 border border-trust-700 overflow-hidden">
                <div className="bg-trust-900 px-6 py-4 border-b border-trust-700">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                    </div>
                    <div className="text-trust-300 text-sm font-medium">
                      vibe-coding.ai
                    </div>
                  </div>
                </div>

                <div className="p-6 font-mono text-sm space-y-4">
                  <div className="text-trust-500">
                    {/* // AI-Generated Architecture */}
                  </div>
                  <div className="text-brand-accent">
                    const <span className="text-white">intelligentSystem</span>{" "}
                    = {`{`}
                  </div>
                  <div className="pl-4 space-y-2">
                    <div className="text-trust-300">
                      <span className="text-brand-primary">selfHealing</span>:{" "}
                      <span className="text-green-400">true</span>,
                    </div>
                    <div className="text-trust-300">
                      <span className="text-brand-primary">velocity</span>:{" "}
                      <span className="text-yellow-400">"10x"</span>,
                    </div>
                    <div className="text-trust-300">
                      <span className="text-brand-primary">architecture</span>:{" "}
                      <span className="text-yellow-400">"AI-Native"</span>
                    </div>
                  </div>
                  <div className="text-brand-accent">{`}`}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION SECTION */}
      <section className="bg-trust-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight text-trust-900 sm:text-5xl mb-6">
              The Old Way is Broken.
            </h2>
            <p className="text-xl text-trust-600 leading-relaxed">
              Traditional dev shops bill by the hour. We bill by impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {valueFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg shadow-trust-200/20 hover:shadow-xl hover:shadow-trust-300/30 transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} mb-6 shadow-lg`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-trust-900 mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-trust-600 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="relative bg-trust-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center mb-20"
          >
            <h2 className="text-base font-semibold leading-7 text-brand-primary mb-4">
              The Vibe Coding Lifecycle
            </h2>
            <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
              How we deliver enterprise-grade software at startup speed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="bg-trust-800/50 backdrop-blur-sm border border-trust-700 rounded-2xl p-8 hover:border-brand-primary/50 transition-all duration-300 group-hover:bg-trust-800/70">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} mb-6 shadow-lg`}
                  >
                    <step.icon className="h-8 w-8 text-white" />
                  </div>

                  <div className="absolute -top-4 -right-4 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-white text-sm font-bold">
                    {index + 1}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-trust-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES SECTION */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight text-trust-900 sm:text-5xl mb-6">
              Solutions for Every Sector.
            </h2>
            <p className="text-xl text-trust-600 leading-relaxed">
              Whether you are disrupting education or streamlining retail, our
              architecture adapts to your domain.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-trust-50 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 mb-6">
                  <industry.icon className="h-6 w-6 text-brand-primary" />
                </div>

                <h3 className="text-xl font-bold text-trust-900 mb-3">
                  {industry.title}
                </h3>

                <p className="text-trust-600 mb-4 leading-relaxed">
                  {industry.description}
                </p>

                <p className="text-sm text-trust-500 italic">
                  Context: {industry.context}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-trust-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
              Building for the Best
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-trust-800 rounded-2xl p-8 border border-trust-700"
              >
                <Quote className="h-8 w-8 text-brand-primary mb-4" />

                <p className="text-trust-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                <div>
                  <p className="text-white font-semibold">
                    {testimonial.author}
                  </p>
                  <p className="text-trust-400 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-trust-50 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight text-trust-900 sm:text-5xl mb-6">
              You Have Questions. We Have Answers.
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg shadow-trust-200/20"
              >
                <div className="flex items-start space-x-4">
                  <HelpCircle className="h-6 w-6 text-brand-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-trust-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-trust-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
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
              Ready to Code at the Speed of AI?
            </h2>

            <div className="mt-10">
              <Link to="/contact">
                <Button className="bg-brand-primary hover:bg-orange-600 text-white px-12 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300">
                  Book a Consultation
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
