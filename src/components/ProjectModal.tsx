import React, { useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Layers, 
  Building, 
  Award,
  Tag
} from 'lucide-react';
import type { ProjectItem } from '../data/resume';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-100 dark:text-slate-100 flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {project.type}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Title & Affiliation */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-100 dark:text-white mb-2 leading-snug">
              {project.title}
            </h3>
            {project.affiliation && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-cyan-400 font-mono">
                <Building className="w-4 h-4" />
                <span>Affiliation: {project.affiliation}</span>
              </div>
            )}
          </div>

          {/* Full Narrative */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-sm sm:text-base text-slate-300 leading-relaxed space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Project Overview</h4>
            <p className="whitespace-pre-line">{project.fullDescription}</p>
          </div>

          {/* Technologies Used */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              <span>Technology Stack & Methodologies</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-800 text-cyan-300 border border-slate-700/80 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Engineering Features */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>Core Architectural Features</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feature, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Outcomes */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>Engineering Deliverables & Outcomes</span>
            </h4>
            <div className="space-y-2">
              {project.outcomes.map((outcome, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-xs sm:text-sm text-slate-300 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            Documented in FAISAL_REHMAN.pdf
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
