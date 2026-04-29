import { motion } from "framer-motion";
import { UserPlus, FileSearch, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create your profile",
    description: "Sign up in under 60 seconds. Tell us who you are, what you do, and what you're looking for.",
    accent: "from-amber-400 to-orange-500",
  },
  {
    number: "02",
    icon: FileSearch,
    title: "Discover opportunities",
    description: "Browse curated listings or let our smart matching engine surface the best opportunities for you.",
    accent: "from-emerald-400 to-teal-500",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Land the gig",
    description: "Apply with one tap. Track your applications. Get hired by Nigeria's top companies.",
    accent: "from-blue-400 to-indigo-500",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-32">
      {/* Divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[13px] font-semibold text-amber-400 uppercase tracking-[0.2em] mb-4"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold tracking-[-0.02em]"
          >
            Three steps.
            <br />
            <span className="text-white/30">Zero friction.</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[72px] left-[16%] right-[16%] h-px bg-linear-to-r from-amber-500/20 via-emerald-500/20 to-blue-500/20" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative text-center group"
            >
              {/* Step number circle */}
              <div className="relative mx-auto mb-8">
                <div className={`w-[72px] h-[72px] rounded-2xl bg-linear-to-br ${step.accent} flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                  <step.icon size={28} className="text-black" />
                </div>
                {/* Step number badge */}
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#0a0a0a] border-2 border-white/10 flex items-center justify-center">
                  <span className="text-[11px] font-bold text-white/50">{step.number}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="text-[14px] text-white/30 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
