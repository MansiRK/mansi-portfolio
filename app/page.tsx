import About from "./components/About";
import Banner from "./components/Banner";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import EducationExperience from "./components/EducationExperience";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Numbers from "./components/Numbers";
import Process from "./components/Process";
import ScrollAnimations from "./components/ScrollAnimations";
import ScrollToTop from "./components/ScrollToTop";
import Skills from "./components/Skills";
import SmoothScroll from "./components/SmoothScroll";
import WhatIDo from "./components/WhatIDo";
import Works from "./components/Works";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Loader />
      <Header />
      <Banner />
      <About />
      <Numbers />
      <Works />
      <EducationExperience />
      <Skills />
      <WhatIDo />
      <Process />
      <Contact />
      <ScrollToTop />
      <SmoothScroll />
      <ScrollAnimations />
      <CustomCursor />
    </main>
  );
}
