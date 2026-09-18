import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import OriginSequence from './components/OriginSequence'
import Navigation from './components/Navigation'
import ScrollProgress from './components/ScrollProgress'
import PortalTransition from './components/PortalTransition'
import CommandTerminal from './components/CommandTerminal'

import Hero from './components/Hero'
import About from './components/About'
import StoryTimeline from './components/StoryTimeline'
import FiveWorlds from './components/FiveWorlds'
import HowIThink from './components/HowIThink'
import CyberUniverse from './components/CyberUniverse'
import SOCCommandCenter from './components/SOCCommandCenter'
import AIUniverse from './components/AIUniverse'
import FullStackEngine from './components/FullStackEngine'
import PromptEngineering from './components/PromptEngineering'
import VibeCodingLab from './components/VibeCodingLab'
import { SkillsSection, ToolsSection } from './components/SkillsAndTools'
import ProjectStack from './components/ProjectStack'
import CurrentWork from './components/CurrentWork'
import { ExperienceTimeline, TrainerSection } from './components/ExperienceTimeline'
import Credentials from './components/Credentials'
import ResumeVault from './components/ResumeVault'
import Outro from './components/Outro'

/**
 * The run order is the story:
 *
 *   ORIGIN → THE ENGINEER → HOW I THINK → the five worlds →
 *   SYSTEMS → PROJECTS → CURRENTLY BUILDING → EXPERIENCE →
 *   CREDENTIALS → CONTACT → back to Earth
 */
export default function App() {
  // Reduced-motion visitors skip the cinematic entirely and land on the page.
  const [booting, setBooting] = useState(() => {
    if (typeof window === 'undefined') return false
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  // Phones and touch devices get the map-only cut: same story, no WebGL, no
  // satellite imagery, a third of the running time.
  const [lite] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(max-width: 767px), (pointer: coarse)').matches
  })

  useEffect(() => {
    if (booting) window.scrollTo(0, 0)
  }, [booting])

  return (
    <>
      <AnimatePresence>
        {booting && <OriginSequence lite={lite} onComplete={() => setBooting(false)} />}
      </AnimatePresence>

      <ScrollProgress />
      <PortalTransition />
      <CommandTerminal />
      <Navigation />

      <main id="main">
        <Hero />

        <About />
        <StoryTimeline />
        <FiveWorlds />

        <HowIThink />

        <CyberUniverse />
        <SOCCommandCenter />

        <AIUniverse />
        <FullStackEngine />
        <PromptEngineering />
        <VibeCodingLab />

        <SkillsSection />
        <ToolsSection />

        <ProjectStack />
        <CurrentWork />

        <ExperienceTimeline />
        <TrainerSection />

        <Credentials />
        <ResumeVault />
      </main>

      <Outro />
    </>
  )
}
