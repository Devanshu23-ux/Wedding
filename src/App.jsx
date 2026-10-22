import React, { useState, useEffect, useCallback } from 'react';
import VideoIntro from './components/VideoIntro';
import PetalsCanvas from './components/PetalsCanvas';
import HeroSection from './components/HeroSection';
import ScratchSection from './components/ScratchSection';
import CountdownSection from './components/CountdownSection';
import StorySection from './components/StorySection';
import VenueSection from './components/VenueSection';
import EventsSection from './components/EventsSection';
import FooterSection from './components/FooterSection';
import { AudioPlayer } from './components/FloatingControls';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Prevent scrolling while video gate intro is active
    if (!hasEntered) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [hasEntered]);

  const handleOpenIntro = useCallback(() => {
    setHasEntered(true);
    document.body.classList.remove('no-scroll');

    setTimeout(() => {
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.classList.add('visible');
      }
    }, 200);
  }, []);

  const handleScratchComplete = useCallback(() => {
    setIsUnlocked(true);
    setTimeout(() => {
      window.scrollBy({
        top: window.innerHeight * 0.35,
        behavior: 'smooth'
      });
    }, 300);
  }, []);

  return (
    <>
      {/* Background Audio Player Toggle */}
      <AudioPlayer />

      {/* Intro Video Portal */}
      {!hasEntered && <VideoIntro onOpen={handleOpenIntro} />}

      {/* Floating Flower Petals Canvas */}
      {hasEntered && <PetalsCanvas active={true} />}

      {/* Main Content Area */}
      <div id="main-content" className={hasEntered ? 'visible' : ''}>
        <HeroSection />

        <ScratchSection onCompleteAll={handleScratchComplete} />

        {isUnlocked && (
          <div className="locked-content unlocked">
            <CountdownSection />
            <StorySection />
            <VenueSection />
            <EventsSection />
            <FooterSection />
          </div>
        )}
      </div>
    </>
  );
}
