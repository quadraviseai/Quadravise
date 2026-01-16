import { Link } from "react-router-dom";
import {
  Linkedin,
  // Twitter,
  Github,
  Mail,
  MapPin,
  Phone,
  // Shield,
  // Award,
  // Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import CookiePreferencesLink from "../common/CookiePreferencesLink";

const navigation = {
  solutions: [
    { name: "AI Solutions", href: "/services/ai" },
    { name: "Web & Mobile", href: "/services/web-mobile" },
    { name: "Data Solutions", href: "/services/data" },
    { name: "BPO & KPO", href: "/services/bpo-kpo" },
  ],
  products: [
    { name: "QuadraCRM", href: "/products#crm" },
    { name: "QuadraHealth", href: "/products#health" },
    { name: "QuadraHR", href: "/products#hr" },
    { name: "QuadraAI", href: "/products#ai" },
  ],
  company: [
    { name: "About Us", href: "/aboutUs" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/api" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
  social: [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/quadravise/",
      icon: Linkedin,
    },
    // { name: "Twitter", href: "#", icon: Twitter },
    { name: "GitHub", href: "https://github.com/quadraviseai", icon: Github },
  ],
};

// const certifications = [
//   { name: "SOC 2 Type II", icon: Shield },
//   { name: "ISO 27001", icon: Award },
//   { name: "GDPR Compliant", icon: Globe },
// ];

export default function Footer() {
  return (
    <footer className="bg-trust-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-accent/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Floating Code Elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="absolute top-20 left-10 text-brand-primary/20 font-mono text-sm hidden lg:block"
      >
        footer.connect();
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="absolute top-32 right-10 text-brand-accent/20 font-mono text-sm hidden lg:block"
      >
        network.global = true;
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-40 left-1/3 text-purple-400/20 font-mono text-sm hidden lg:block"
      >
        security.enterprise();
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl from-brand-primary to-brand-accent shadow-lg"
              >
                <img
                  src={"./logo01.png"}
                  alt="Quadravise Logo"
                  className="h-10 w-10"
                />
              </motion.div>
              <div className="flex flex-col">
                <span
                  className="text-2xl font-bold text-white group-hover:text-brand-primary transition-colors"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Quadravise
                </span>
                <span className="text-xs text-trust-400 group-hover:text-brand-accent transition-colors">
                  Your Vision. Powered By Us.
                </span>
              </div>
            </Link>

            <p className="text-trust-300 leading-relaxed max-w-md">
              Enterprise-grade SaaS solutions that transform business operations
              through AI-powered automation, data intelligence, and scalable
              infrastructure.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-trust-300">
                <Mail className="h-4 w-4 text-brand-primary" />
                <a
                  href="mailto:support@quadravise.com"
                  className="hover:text-white transition-colors"
                >
                  support@quadravise.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-trust-300">
                <Phone className="h-4 w-4 text-brand-primary" />
                <a
                  href="tel:+91-9538631238"
                  className="hover:text-white transition-colors"
                >
                  +91-9538631238
                </a>
              </div>
              <div className="flex items-start space-x-3 text-trust-300">
                <MapPin className="h-4 w-4 text-brand-primary mt-1 flex-shrink-0" />
                <span>
                  Konappana Agrahara, Electronic City, 560100 Bengaluru,
                  Karnataka, India
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-trust-800 hover:bg-brand-primary transition-colors group"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5 text-trust-300 group-hover:text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Solutions
            </h3>
            <ul className="space-y-4">
              {navigation.solutions.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-trust-300 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Products
            </h3>
            <ul className="space-y-4">
              {navigation.products.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-trust-300 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Company
            </h3>
            <ul className="space-y-4 mb-8">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-trust-300 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Resources
            </h3>
            <ul className="space-y-4">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-trust-300 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul> */}
          </div>
        </div>

        {/* Certifications */}
        {/* <div className="border-t border-trust-800 pt-12 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Security & Compliance
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 bg-trust-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-trust-700/30"
                >
                  <cert.icon className="h-4 w-4 text-brand-success" />
                  <span className="text-sm text-trust-300">{cert.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div> */}

        {/* Bottom Bar */}
        <div className="border-t border-trust-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-trust-400">
              © {new Date().getFullYear()} Quadravise Inc. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-trust-400">
              <Link
                to="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookie-policy"
                className="hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
              <CookiePreferencesLink />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
