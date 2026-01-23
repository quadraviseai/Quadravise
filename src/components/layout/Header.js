import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Code,
  Brain,
  Smartphone,
  Database,
  // ArrowRight,
  // Phone,
  // Mail,
} from "lucide-react";
import Button from "../ui/Button";

export default function Header() {
  const logo = "./logo01.png";
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      name: "AI Solutions",
      href: "/services/ai",
      icon: Brain,
      desc: "Computer Vision, NLP, Analytics",
    },
    {
      name: "Web & Mobile",
      href: "/services/web-mobile",
      icon: Code,
      desc: "React, Next.js, React Native",
    },
    {
      name: "Data Solutions",
      href: "/services/data",
      icon: Database,
      desc: "Data Engineering, BI, Analytics",
    },
    {
      name: "BPO & KPO",
      href: "/services/bpo-kpo",
      icon: Smartphone,
      desc: "24/7 Support, Process Optimization",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-trust-900/95 backdrop-blur-md shadow-lg shadow-trust-900/20 border-b border-trust-700"
          : "bg-transparent"
        }`}
    >

      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl from-brand-primary to-brand-accent shadow-lg group-hover:shadow-xl transition-all duration-100"
            >
              <img src={logo} alt="Quadravise Logo" className="h-10 w-10" />
            </motion.div>
            <div className="flex flex-col">
              <span
                className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors"
                style={{ fontFamily: "Montserrat-bold, sans-serif" }}
              >
                Quadravise
              </span>
              <span className="text-xs text-trust-400 group-hover:text-brand-accent transition-colors">
                Your Vision. Powered By Us.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to="/services"
                className="flex items-center space-x-1 text-sm font-medium text-trust-300 hover:text-brand-primary transition-colors"
              >
                <span>Services</span>
                <ChevronDown className="h-4 w-4" />
              </Link>

              <AnimatePresence>
                {activeDropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-trust-800/95 backdrop-blur-md rounded-2xl shadow-xl shadow-trust-900/20 border border-trust-700/50 p-6"
                  >
                    <div className="grid grid-cols-1 gap-4">
                      {services.map((service) => (
                        <Link
                          key={service.name}
                          to={service.href}
                          className="flex items-start space-x-3 p-3 rounded-xl hover:bg-trust-700 transition-colors group"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors">
                            <service.icon className="h-5 w-5 text-brand-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white group-hover:text-brand-primary transition-colors">
                              {service.name}
                            </p>
                            <p className="text-xs text-trust-400">
                              {service.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/products"
              className={`text-sm font-medium transition-colors hover:text-brand-primary ${isActive("/products") ? "text-brand-primary" : "text-trust-300"
                }`}
            >
              Products
            </Link>

            <Link
              to="/aboutUs"
              className={`text-sm font-medium transition-colors hover:text-brand-primary ${isActive("/aboutUs") ? "text-brand-primary" : "text-trust-300"
                }`}
            >
              About
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {/* <div className="flex items-center space-x-4 text-sm text-trust-400">
              <a
                href="tel:+91-98765-43210"
                className="flex items-center space-x-1 hover:text-brand-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </a>
            </div> */}
            <Link to="/contact">
              <Button className="bg-brand-primary hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Start Project
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-trust-300 hover:bg-trust-800 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-trust-700 bg-trust-900/95 backdrop-blur-md"
            >
              <div className="px-4 py-6 space-y-4">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="block text-base font-medium text-trust-300 hover:text-brand-primary transition-colors"
                >
                  Home
                </Link>
                <div className="space-y-2">
                  <Link
                    to="/services"
                    onClick={() => setIsOpen(false)}
                    className="block text-sm font-semibold text-white hover:text-brand-primary transition-colors"
                  >
                    All Services
                  </Link>
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      to={service.href}
                      onClick={() => setIsOpen(false)}
                      className="block pl-4 text-sm text-trust-400 hover:text-brand-primary transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
                <Link
                  to="/products"
                  onClick={() => setIsOpen(false)}
                  className="block text-base font-medium text-trust-300 hover:text-brand-primary transition-colors"
                >
                  Products
                </Link>
                <Link
                  to="/aboutUs"
                  onClick={() => setIsOpen(false)}
                  className="block text-base font-medium text-trust-300 hover:text-brand-primary transition-colors"
                >
                  About
                </Link>
                <div className="pt-4 border-t border-trust-700">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-brand-primary hover:bg-orange-600 text-white">
                      Start Project
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
