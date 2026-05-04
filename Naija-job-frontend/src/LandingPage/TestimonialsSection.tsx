import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Adaeze Okonkwo",
    role: "Frontend Developer",
    company: "Hired at Paystack",
    avatar: "AO",
    content: "I landed my dream role within two weeks of signing up. The application process was seamless — it felt like the platform was designed just for me.",
    stars: 5,
  },
  {
    name: "Chidi Nnamdi",
    role: "CEO & Founder",
    company: "TechHive Lagos",
    avatar: "CN",
    content: "As an employer, finding quality talent in Nigeria used to be a nightmare. NaijaJobs completely changed that. We've hired 12 engineers through it.",
    stars: 5,
  },
  {
    name: "Fatima Ibrahim",
    role: "Product Designer",
    company: "Freelancing via NaijaJobs",
    avatar: "FI",
    content: "The gig listings are incredible. I went from struggling to find clients to being fully booked in under a month. This platform truly gets Nigerians.",
    stars: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative py-32">
      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />
      {/* Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/3 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[13px] font-semibold text-amber-400 uppercase tracking-[0.2em] mb-4"
          >
            Real Stories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold tracking-[-0.02em]"
          >
            Don't take our word.
            <br />
            <span className="text-white/30">Take theirs.</span>
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative p-7 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/4 hover:border-white/10 transition-all duration-500 flex flex-col"
            >
              {/* Quote icon */}
              <Quote size={32} className="text-amber-500/10 mb-4" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-[15px] text-white/50 leading-relaxed flex-1 mb-6">
                "{t.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
                  <span className="text-[12px] font-bold text-black">{t.avatar}</span>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-white">{t.name}</p>
                  <p className="text-[12px] text-white/30">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
