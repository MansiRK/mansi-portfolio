import About from "./components/About";
import Banner from "./components/Banner";
import Header from "./components/Header";
import Process from "./components/Process";
import Skills from "./components/Skills";
import WhatIDo from "./components/WhatIDo";
import Works from "./components/Works";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Banner />
      <About />
      <WhatIDo />
      <Skills />
      <Process />
      <Works />
    </main>
  );
}
