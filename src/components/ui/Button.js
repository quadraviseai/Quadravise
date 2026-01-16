import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const base =
  "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-brand-primary text-white hover:bg-orange-600 focus-visible:ring-brand-primary shadow-lg hover:shadow-xl",
  secondary: "bg-trust-800 text-white hover:bg-trust-700 focus-visible:ring-trust-800 shadow-lg hover:shadow-xl",
  outline: "bg-transparent text-trust-700 border-2 border-trust-300 hover:bg-trust-50 hover:border-trust-400 focus-visible:ring-trust-700",
  ghost: "bg-transparent text-trust-700 hover:bg-trust-100 focus-visible:ring-trust-700",
  danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600 shadow-lg hover:shadow-xl",
  success: "bg-brand-success text-white hover:bg-green-600 focus-visible:ring-brand-success shadow-lg hover:shadow-xl",
  gradient: "bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:opacity-90 shadow-lg shadow-brand-primary/25 border-0",
  "outline-white": "border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50"
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
  xl: "h-14 px-10 text-lg",
};

const Button = React.forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? "span" : motion.button;

    return (
      <Comp
        ref={ref}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className={clsx(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export default Button;
