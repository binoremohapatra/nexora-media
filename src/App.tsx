import React, { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { Preloader } from './components/sections/Preloader';
import { Navigation } from './components/layout/Navigation';
import { Hero } from './components/sections/Hero';
import { Marquee } from './components/sections/Marquee';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Work } from './components/sections/Work';
import { Process } from './components/sections/Process';
import { Faq } from './components/sections/Faq';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { SkipLink } from './components/ui/SkipLink';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      <SkipLink />
      {!preloaderDone && <Preloader onDone={() => setPreloaderDone(true)} />}
      
      {/* Scroll progress bar */}
      <div className="scroll-progress">
        <div className="scroll-progress-bar" id="scroll-progress-bar" />
      </div>

      <Navigation theme={theme} onToggleTheme={toggleTheme} />
      
      <main id="main-content">
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <About />
        <Process />
        <Faq />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
