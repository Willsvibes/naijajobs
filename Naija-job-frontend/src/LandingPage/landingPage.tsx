import PublicNavbar from "./PublicNavbar";
import HeroSection from "./HeroSection";
import StatsBar from "./StatsBar";
import FeaturesSection from "./FeaturesSection";
import HowItWorks from "./HowItWorks";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="bg-[#0a0a0a] text-white overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      <PublicNavbar />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
