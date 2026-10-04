import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  FileDown, 
  Menu, 
  X, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { resumeData } from '../data/resume';

interface NavbarProps {
  onOpenResumePreview: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumePreview }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'beyond', label: 'Pursuits' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#050914]/90 backdrop-blur-xl border-b border-slate-800 shadow-xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 group focus:outline-none cursor-pointer"
            aria-label="Faisal Rehman - Back to top"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-slate-900 to-indigo-500/20 border border-cyan-500/40 flex items-center justify-center font-display font-bold text-sm text-cyan-300 group-hover:border-cyan-400 group-hover:scale-105 transition-all shadow-md">
              FR
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-sm font-bold tracking-tight text-slate-100 group-hover:text-cyan-300 transition-colors">
                Faisal Rehman
              </span>
              <span className="text-[11px] text-cyan-400 font-medium tracking-wide flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AI &amp; Software Engineer
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 px-3.5 py-1.5 rounded-2xl border border-slate-800/90 shadow-lg text-xs font-medium">
            {navItems.map(item => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Preview Resume Modal CTA */}
            <button
              onClick={onOpenResumePreview}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-200 glass-panel border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-300 transition-all hover:scale-105 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Preview CV</span>
            </button>

            {/* Download Resume Button */}
            <a
              href={resumeData.personal.resumeUrl}
              download="FAISAL_REHMAN_Resume.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden pt-20 px-4 bg-[#050914]/98 backdrop-blur-2xl overflow-y-auto animate-fade-in border-b border-slate-800">
          <div className="flex flex-col gap-2 py-6">
            <div className="px-3 pb-3 border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Portfolio Sections
              </span>
              <span className="text-slate-400">Bangalore, IN</span>
            </div>

            {navItems.map(item => {
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm transition-colors cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-60" />
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResumePreview();
                }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-semibold text-slate-200 glass-panel border border-slate-700"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Preview Resume PDF</span>
              </button>

              <a
                href={resumeData.personal.resumeUrl}
                download="FAISAL_REHMAN_Resume.pdf"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 shadow-lg text-sm"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>

              <a
                href={resumeData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800"
              >
                <span>github.com/faisalrehman07</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
