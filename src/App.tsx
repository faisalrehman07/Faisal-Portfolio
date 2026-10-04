import { useState } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { ResumePreviewModal } from './components/ResumePreviewModal';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SkillConstellation } from './components/SkillConstellation';
import { ToolsEcosystem } from './components/ToolsEcosystem';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { BeyondCode } from './components/BeyondCode';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import type { ProjectItem } from './data/resume';

export function App() {
  const [resumePreviewOpen, setResumePreviewOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200 antialiased">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Dynamic Cosmic Starfield, Nebulae, and Meteors Canvas */}
      <CosmicBackground />

      {/* Sticky Header Navigation */}
      <Navbar
        onOpenResumePreview={() => setResumePreviewOpen(true)}
      />

      {/* Resume PDF Interactive Preview Modal */}
      <ResumePreviewModal
        isOpen={resumePreviewOpen}
        onClose={() => setResumePreviewOpen(false)}
      />

      {/* Technical Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Main Cosmic Portfolio Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section with 3D Skill Universal Globe */}
        <Hero 
          onNavigate={handleNavigate} 
          onOpenResumePreview={() => setResumePreviewOpen(true)}
        />

        {/* 2. Executive About Section */}
        <About />

        {/* 3. Skill Architecture & Core Stacks */}
        <SkillConstellation onNavigateProjects={() => handleNavigate('projects')} />

        {/* 4. Tools & Software Ecosystem */}
        <ToolsEcosystem />

        {/* 5. Projects & Case Studies */}
        <Projects
          onSelectProject={proj => {
            setSelectedProject(proj);
          }}
        />

        {/* 6. Experience Timeline & Chronicles */}
        <ExperienceTimeline />

        {/* 7. Education & VTU Degree */}
        <Education />

        {/* 8. Certifications & Training */}
        <Certifications />

        {/* 9. Beyond Code & Astronomy Pursuits */}
        <BeyondCode />

        {/* 10. Contact Transmission Terminal */}
        <Contact />
      </main>

      {/* Cosmic Footer */}
      <Footer />
    </div>
  );
}

export default App;
