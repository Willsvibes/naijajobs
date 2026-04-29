import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CounterProps {
  end: number;
  suffix: string;
  label: string;
}

const AnimatedCounter = ({ end, suffix, label }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [end, inView]);

  return (
    <motion.div
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true }}
      className="text-center"
    >
      <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
        {count.toLocaleString()}
        <span className="text-amber-400">{suffix}</span>
      </p>
      <p className="text-[13px] text-white/30 mt-1 font-medium">{label}</p>
    </motion.div>
  );
};

const StatsBar = () => {
  return (
    <section className="relative py-16 border-y border-white/4">
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-amber-500/2 to-transparent" />
      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          <AnimatedCounter end={12000} suffix="+" label="Active Job Listings" />
          <AnimatedCounter end={4500} suffix="+" label="Companies Hiring" />
          <AnimatedCounter end={98} suffix="%" label="Client Satisfaction" />
          <AnimatedCounter end={25000} suffix="+" label="Hires Made" />
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
