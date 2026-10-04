import React, { useEffect } from 'react';
import { 
  X, 
  FileDown, 
  ExternalLink, 
  FileText
} from 'lucide-react';
import { resumeData } from '../data/resume';

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-5xl h-[92vh] bg-slate-900 dark:bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-display text-white">
                  Faisal Rehman — Official Curriculum Vitae
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
                  PDF Preview
                </span>
              </div>
              <p className="text-xs text-slate-400">
                FAISAL_REHMAN.pdf • Verified Source of Truth
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={resumeData.personal.resumeUrl}
              download="FAISAL_REHMAN_Resume.pdf"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF</span>
            </a>

            <a
              href={resumeData.personal.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Close resume preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer Frame */}
        <div className="flex-1 w-full bg-slate-950 relative overflow-hidden">
          <iframe
            src={`${resumeData.personal.resumeUrl}#toolbar=1&navpanes=0`}
            title="Faisal Rehman Resume Preview"
            className="w-full h-full border-0"
          />
        </div>

        {/* Bottom Footer Actions */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Direct PDF stream verified</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${resumeData.personal.email}`}
              className="text-cyan-400 hover:underline"
            >
              {resumeData.personal.email}
            </a>
            <span>•</span>
            <span>+91 9620532473</span>
          </div>
        </div>
      </div>
    </div>
  );
};
