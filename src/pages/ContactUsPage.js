import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  // Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  Users,
  Wrench,
  HelpCircle,
} from "lucide-react";
import Button from "../components/ui/Button";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setIsSubmitted(false);

    // Only send the exact fields that work
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    console.log("Sending payload:", payload);

    try {
      const res = await fetch(
        "https://quadravise.com/api/submit_contact_form.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      console.log("Response status:", res.status);

      if (!res.ok) {
        const errBody = await res.text();
        console.log("Error response:", errBody);
        throw new Error(`Server error: ${res.status}`);
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;

    // Format phone number as (123)-456789 with 10 digit limit
    if (e.target.name === "phone") {
      value = value.replace(/\D/g, ""); // Remove non-digits
      if (value.length > 10) value = value.slice(0, 10); // Limit to 10 digits
      if (value.length >= 6) {
        value = `(${value.slice(0, 3)})-${value.slice(3)}`;
      } else if (value.length >= 3) {
        value = `(${value.slice(0, 3)})-${value.slice(3)}`;
      }
    }

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email Us",
      value: "support@quadravise.com",
      href: "mailto:support@quadravise.com",
    },
    // {
    //   icon: Phone,
    //   label: "Call Us",
    //   value: "+91 98765 43210",
    //   href: "tel:+91-98765-43210",
    // },
    {
      icon: MapPin,
      label: "Headquarters",
      value:
        "Konnapana Agharaha, Electronic City, 560100 Bengaluru, Karnataka, India",
      href: null,
    },
  ];

  const faqs = [
    {
      question: "Do you work with startups?",
      answer:
        "Absolutely. We love working with founders to build MVPs that are scalable from day one.",
    },
    {
      question: "What is your typical timeline?",
      answer:
        "A typical custom web application takes 4-8 weeks, depending on complexity. QuadraiLearn integration can be done in under 2 weeks.",
    },
    {
      question: "Do you offer post-launch support?",
      answer:
        "Yes, we offer comprehensive maintenance packages, including server monitoring, security patches, and feature updates.",
    },
  ];

  // const subjects = [
  //   "AI Consulting",
  //   "Web/App Development",
  //   "Product Inquiry",
  //   "Other",
  // ];

  return (
    <>
      <Helmet>
        <title>Contact — Ready to Accelerate?</title>
        <meta
          name="description"
          content="Get in touch with Quadravise. Whether you have a specific project or just a vague idea, we're here to help you scope, design, and build it."
        />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-trust-900 via-trust-800 to-trust-900 py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl" />
        </div>

        {/* Subtle Communication Waves */}
        <div className="absolute inset-0 opacity-8">
          <svg className="w-full h-full">
            <defs>
              <radialGradient id="commGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Gentle wave patterns */}
            <motion.circle
              cx="30%"
              cy="40%"
              r="20"
              fill="none"
              stroke="#f97316"
              strokeWidth="1"
              opacity="0.3"
              animate={{ r: [20, 40, 20] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.circle
              cx="70%"
              cy="60%"
              r="15"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="1"
              opacity="0.3"
              animate={{ r: [15, 35, 15] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />
            {/* Message flow line */}
            <motion.path
              d="M10,50 Q50,30 90,50"
              stroke="#f97316"
              strokeWidth="1"
              opacity="0.2"
              fill="none"
              strokeDasharray="3,6"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-brand-primary/10 backdrop-blur-sm border border-brand-primary/20 rounded-full px-4 py-2 mb-8">
              <Send className="h-4 w-4 text-brand-primary" />
              <span className="text-sm font-medium text-brand-primary">
                Get in Touch
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.2] mb-8">
              Ready to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                Accelerate?
              </span>
            </h1>

            <p className="text-xl text-trust-300 max-w-3xl mx-auto">
              Whether you have a specific project or just a vague idea, we are
              here to help you scope, design, and build it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT FORM & INFO SECTION */}
      <section className="bg-trust-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl shadow-trust-200/20 border border-trust-200">
                <h2 className="text-2xl font-bold text-trust-900 mb-8">
                  Start Your Project
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                      <p className="text-red-800 font-medium">{error}</p>
                    </div>
                  )}
                  {isSubmitted && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <p className="text-green-800 font-medium">
                          Message sent successfully! We'll get back to you soon.
                        </p>
                      </div>
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-trust-900 mb-2"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-trust-300 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-trust-900 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-trust-300 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-trust-900 mb-2"
                    >
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-trust-300 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-300"
                      placeholder="(123)-456789"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-trust-900 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-trust-300 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-brand-primary hover:bg-orange-600 disabled:bg-gray-400 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info & Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Information */}
              <div className="bg-white rounded-2xl p-8 shadow-xl shadow-trust-200/20 border border-trust-200">
                <h3 className="text-xl font-bold text-trust-900 mb-6">
                  Contact Details
                </h3>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 flex-shrink-0">
                        <info.icon className="h-6 w-6 text-brand-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-trust-900 mb-1">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-trust-600 hover:text-brand-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-trust-600">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-trust-900 mb-6">
                  Why Choose Us?
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 mx-auto mb-3">
                      <Clock className="h-6 w-6 text-brand-primary" />
                    </div>
                    <div className="text-2xl font-bold text-trust-900 mb-1">
                      10x
                    </div>
                    <div className="text-sm text-trust-600">
                      Faster Development
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent/10 mx-auto mb-3">
                      <Users className="h-6 w-6 text-brand-accent" />
                    </div>
                    <div className="text-2xl font-bold text-trust-900 mb-1">
                      24/7
                    </div>
                    <div className="text-sm text-trust-600">
                      Support Available
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 mx-auto mb-3">
                      <Wrench className="h-6 w-6 text-purple-500" />
                    </div>
                    <div className="text-2xl font-bold text-trust-900 mb-1">
                      99.9%
                    </div>
                    <div className="text-sm text-trust-600">System Uptime</div>
                  </div>

                  <div className="text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-success/10 mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-brand-success" />
                    </div>
                    <div className="text-2xl font-bold text-trust-900 mb-1">
                      100%
                    </div>
                    <div className="text-sm text-trust-600">Code Ownership</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-trust-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-trust-600">
              Quick answers to common questions about our services and process.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-trust-50 rounded-2xl p-8 hover:bg-trust-100 transition-all duration-300"
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

      {/* RESPONSE TIME SECTION */}
      <section className="bg-trust-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              We Respond Fast
            </h2>

            <p className="text-xl text-trust-300 max-w-3xl mx-auto mb-12">
              Expect a response within 24 hours. For urgent projects, we're
              available for same-day consultations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  &lt; 24h
                </div>
                <div className="text-trust-400">Response Time</div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  Same Day
                </div>
                <div className="text-trust-400">Urgent Consultations</div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  2-4 weeks
                </div>
                <div className="text-trust-400">Typical MVP Timeline</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
