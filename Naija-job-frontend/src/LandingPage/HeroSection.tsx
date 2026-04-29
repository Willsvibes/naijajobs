import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[72px]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Primary radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-amber-500/7 rounded-full blur-[120px]" />
        {/* Secondary accent */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/4 rounded-full blur-[100px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        {/* Gradient border at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/4 border border-white/8 mb-8 backdrop-blur-sm"
        >
          <Sparkles size={14} className="text-amber-400" />
          <span className="text-[13px] font-medium text-white/60 tracking-wide">
            Nigeria's #1 Job Platform
          </span>
          <div className="w-1 h-1 bg-amber-400 rounded-full" />
          <span className="text-[13px] font-medium text-amber-400">Now Live</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as any }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-[-0.03em] mb-8"
        >
          <span className="block text-white">Find your</span>
          <span className="block mt-2">
            <span className="bg-linear-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              next hustle.
            </span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed mb-12 font-light"
        >
          The platform connecting ambitious Nigerians with real opportunities.
          From freelance gigs to full-time careers — your next chapter starts here.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate("/auth/signup")}
            className="group relative px-8 py-4 bg-white text-black font-semibold text-[15px] rounded-2xl hover:bg-white/90 active:scale-[0.97] transition-all duration-200 shadow-2xl shadow-white/10 flex items-center gap-3"
          >
            Start for free
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </button>
          <button
            onClick={() => navigate("/auth/login")}
            className="px-8 py-4 text-white/60 hover:text-white font-medium text-[15px] rounded-2xl border border-white/8 hover:border-white/15 hover:bg-white/3 transition-all duration-200"
          >
            I already have an account
          </button>
        </motion.div>

        {/* Floating Glass Cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] as any }}
          className="mt-24 relative"
        >
          {/* Ambient glow behind cards */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[200px] bg-amber-500/6 rounded-full blur-[80px]" />

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { title: "UI/UX Designer", company: "Paystack", location: "Lagos", pay: "₦800K", tag: "Full-time", tagColor: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
              { title: "Backend Developer", company: "Flutterwave", location: "Remote", pay: "₦1.2M", tag: "Contract", tagColor: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
              { title: "Marketing Lead", company: "Kuda Bank", location: "Abuja", pay: "₦650K", tag: "Freelance", tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
            ].map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + i * 0.12 }}
                className="group p-5 rounded-2xl bg-white/3 border border-white/6 backdrop-blur-xl hover:bg-white/6 hover:border-white/12 transition-all duration-500 text-left cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${job.tagColor}`}>
                    {job.tag}
                  </span>
                  <span className="text-[13px] font-bold text-amber-400">{job.pay}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-1 group-hover:text-amber-100 transition-colors">
                  {job.title}
                </h3>
                <p className="text-[13px] text-white/30">
                  {job.company} • {job.location}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
