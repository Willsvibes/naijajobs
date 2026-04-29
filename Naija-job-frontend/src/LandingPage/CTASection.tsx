import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/4 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-12 md:p-20 rounded-[32px] bg-linear-to-b from-white/4 to-white/1 border border-white/6 backdrop-blur-sm"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.03em] mb-6 leading-tight">
            Ready to make
            <br />
            <span className="bg-linear-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              your move?
            </span>
          </h2>
          <p className="text-lg text-white/35 max-w-lg mx-auto mb-10 font-light">
            Join thousands of Nigerians who found their path.
            Your next opportunity is one click away.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/auth/signup")}
              className="group relative px-10 py-5 bg-linear-to-r from-amber-400 to-amber-500 text-black font-bold text-[16px] rounded-2xl hover:from-amber-300 hover:to-amber-400 active:scale-[0.97] transition-all duration-300 shadow-2xl shadow-amber-500/20 flex items-center gap-3"
            >
              Create free account
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => navigate("/auth/login")}
              className="px-10 py-5 text-white/50 hover:text-white font-medium text-[16px] rounded-2xl border border-white/8 hover:border-white/15 hover:bg-white/3 transition-all duration-200"
            >
              Sign in instead
            </button>
          </div>

          {/* Trust line */}
          <p className="mt-10 text-[13px] text-white/20">
            Free forever · No credit card required · Start in 60 seconds
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
