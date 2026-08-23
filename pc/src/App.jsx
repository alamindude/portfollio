import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Journey from "./components/Journey";
import Services from "./components/Services";
import TechStack from "./components/TechStack";
import WhyChooseMe from "./components/WhyChooseMe";
import Process from "./components/Process";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import ScrollFrameAnimation from "./components/ScrollFrameAnimation";
import useReducedMotion from "./hooks/useReducedMotion";
import useIsTouch from "./hooks/useIsTouch";

export default function App() {
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouch();

  return (
    <div className="relative bg-void">
      {/* Full-page cinematic background — plays across the ENTIRE site's
          scroll (top to bottom), not just the hero section. Every section
          below renders on top of it with a translucent/glass background
          so the animation stays visible throughout. */}
      <ScrollFrameAnimation
        framesPath="frames/hero"
        frameCount={240}
        format="jpg"
        reducedMotion={reducedMotion}
        isTouch={isTouch}
      />

      <div className="grain" />
      <ScrollProgress />
      <CustomCursor isTouch={isTouch} reducedMotion={reducedMotion} />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Journey />
          <About />
          <Services />
          <TechStack />
          <WhyChooseMe />
          <Process />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
