import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";

import ParticleField from "../ui/ParticleField";

export default function HeroSection({
  title,
  subtitle,
  ctaText = "Get started",
  ctaLink = "/contact",
}) {
  const ref = useRef(null);

  // 3D TILT LOGIC
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2.5deg", "-2.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2.5deg", "2.5deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      className="relative overflow-hidden bg-white px-6 py-32 sm:py-40 lg:px-8 perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={ref}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,102,0,0.15),rgba(255,255,255,0))]" />
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#000046_1px,transparent_1px),linear-gradient(to_bottom,#000046_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_10%,transparent_100%)] opacity-10" />
        <ParticleField />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center perspective-1000">
        {/* 3D TILT CONTAINER */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, z: 50 }}
            animate={{ opacity: 1, z: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mx-auto mb-8 flex w-fit items-center justify-center rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(255,102,0,0.3)] transform-gpu"
            style={{ transform: "translateZ(60px)" }}
          >
            <Sparkles className="mr-2 h-4 w-4 text-brand-primary animate-pulse" />
            <span className="text-sm font-medium text-brand-secondary">
              New: Enterprise AI Suite 2.0
            </span>
            <ChevronRight className="ml-1 h-3 w-3 text-brand-secondary/50" />
          </motion.div>

          {/* Title - Word Staggered Reveal */}
          <div className="mb-8 text-5xl font-bold tracking-tight text-brand-secondary sm:text-7xl leading-[1.1]">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12, delayChildren: 0.2 },
                },
              }}
              style={{ transform: "translateZ(40px)" }}
              className="flex flex-wrap justify-center gap-x-3 gap-y-2"
            >
              {title.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { y: 20, opacity: 0, filter: "blur(8px)" },
                    visible: { y: 0, opacity: 1, filter: "blur(0px)" },
                  }}
                  className="inline-block bg-gradient-to-br from-brand-secondary via-brand-secondary to-orange-600 bg-clip-text pb-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ transform: "translateZ(30px)" }}
            className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl"
          >
            {subtitle}
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{ transform: "translateZ(50px)" }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link to={ctaLink}>
              <button className="group relative z-20 inline-flex items-center justify-center overflow-hidden rounded-xl bg-brand-primary px-8 py-4 font-bold text-black transition-all duration-300 hover:bg-orange-600 hover:scale-105 hover:shadow-[0_0_40px_-5px_rgba(255,102,0,0.5)] ring-1 ring-white/20">
                <span className="mr-2">{ctaText}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity group-hover:animate-shimmer" />
              </button>
            </Link>

            <Link to="/contact">
              <button className="inline-flex items-center justify-center rounded-xl border border-brand-secondary/20 bg-white px-8 py-4 font-semibold text-brand-secondary backdrop-blur-md transition-all hover:bg-slate-50 hover:border-brand-primary/50 hover:shadow-lg">
                Request Demo
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
