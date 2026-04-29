import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const PublicNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How it works", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-white/6 shadow-2xl shadow-black/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 max-sm:px-4">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-xl bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-shadow duration-300">
                <span className="text-black font-black text-sm absolute">NJ</span>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Naija<span className="text-amber-400">Jobs</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-1 bg-white/2 p-1 rounded-xl border border-white/4 backdrop-blur-md">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="px-4 py-2 text-[14px] text-white/60 hover:text-white font-medium rounded-lg hover:bg-white/4 transition-all duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate("/auth/login")}
                className="px-5 py-2.5 text-[14px] text-white/80 hover:text-white font-medium rounded-xl hover:bg-white/6 transition-all duration-200"
              >
                Sign in
              </button>
              <button
                onClick={() => navigate("/auth/signup")}
                className="px-5 py-2.5 text-[14px] font-semibold rounded-xl bg-white text-black hover:bg-white/90 active:scale-[0.97] transition-all duration-200 shadow-lg shadow-white/10"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/6 transition-colors"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a]/98 backdrop-blur-xl md:hidden pt-[80px]"
          >
            <div className="px-6 flex flex-col h-full">
              <div className="flex flex-col gap-4 pt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-semibold text-white/70 hover:text-white py-4 border-b border-white/6 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <div className="mt-auto pb-12 flex flex-col gap-4">
                <button
                  onClick={() => { setMobileMenuOpen(false); navigate("/auth/login"); }}
                  className="w-full py-4 text-lg font-semibold rounded-2xl border border-white/10 text-white hover:bg-white/4 transition-all"
                >
                  Sign in
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); navigate("/auth/signup"); }}
                  className="w-full py-4 text-lg font-semibold rounded-2xl bg-white text-black active:scale-[0.98] transition-all"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PublicNavbar;
