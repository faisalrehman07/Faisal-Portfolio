import React from 'react';
import { 
  ArrowUp, 
  Mail, 
  Phone, 
  FileDown
} from 'lucide-react';
import { resumeData } from '../data/resume';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-800/80 bg-slate-950/90 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80 items-start">
          {/* Brand & Identity */}
          <div className="md:col-span-6 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center font-display font-bold text-xs text-cyan-400 shadow-md">
                FR
              </div>
              <span className="text-xl font-bold font-display tracking-tight text-white">
                FAISAL REHMAN
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              AI &amp; Data Science Graduate building at the intersection of Artificial Intelligence, Data Science, Software Engineering, and Modern Systems.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Bangalore, India &bull; Available for Opportunities</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-300 block mb-2">
              Navigation
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#about" className="hover:text-cyan-300 transition-colors">About &amp; Overview</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-cyan-300 transition-colors">Skill Architecture</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-300 transition-colors">Engineering Projects</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-cyan-300 transition-colors">Experience Timeline</a>
              </li>
              <li>
                <a href="#education" className="hover:text-cyan-300 transition-colors">Education &amp; VTU Degree</a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-cyan-300 transition-colors">Certifications &amp; Training</a>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-3 space-y-3.5">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-300 block mb-2">
              Direct Channels
            </span>
            <div className="flex flex-col gap-2.5">
              <a
                href={resumeData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-slate-400" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub (faisalrehman07)</span>
              </a>
              <a
                href={resumeData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-blue-400 transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-blue-400" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 1.64-1.64c0-.91-.73-1.64-1.64-1.64a1.64 1.64 0 0 0-1.64 1.64c0 .91.73 1.64 1.64 1.64m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                </svg>
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={`mailto:${resumeData.personal.email}`}
                className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>{resumeData.personal.email}</span>
              </a>
              <a
                href={`tel:${resumeData.personal.phone}`}
                className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-indigo-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>{resumeData.personal.phone}</span>
              </a>
              <a
                href={resumeData.personal.resumeUrl}
                download="FAISAL_REHMAN_Resume.pdf"
                className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 hover:underline mt-1 font-semibold"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>&copy; {currentYear} Faisal Rehman.</span>
            <span>&bull;</span>
            <span className="text-slate-300">AI &bull; Data &bull; Software &bull; Systems</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors group cursor-pointer"
            aria-label="Back to top of page"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
