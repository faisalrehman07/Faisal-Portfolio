import React, { useState } from 'react';
import { 
  Code2, 
  Bot, 
  Hospital, 
  HeartPulse, 
  BadgePercent, 
  Car, 
  Wallet, 
  ArrowRight, 
  Building,
  Sparkles
} from 'lucide-react';
import { resumeData } from '../data/resume';
import type { ProjectItem } from '../data/resume';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterOptions = [
    'All',
    'Featured Internship Case Study',
    'AI & Deep Learning',
    'Full Stack',
    'IoT / Hardware'
  ];

  const getProjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Hospital': return <Hospital className="w-6 h-6 text-cyan-400" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-rose-400" />;
      case 'BadgePercent': return <BadgePercent className="w-6 h-6 text-emerald-400" />;
      case 'Bot': return <Bot className="w-6 h-6 text-purple-400" />;
      case 'Car': return <Car className="w-6 h-6 text-amber-400" />;
      case 'Wallet': return <Wallet className="w-6 h-6 text-indigo-400" />;
      default: return <Code2 className="w-6 h-6 text-cyan-400" />;
    }
  };

  const filteredProjects = resumeData.projects.filter(p => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Featured Internship Case Study') return p.category === 'Internship Case Study';
    return p.category === activeFilter;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300 mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Case Studies &amp; Projects</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white">
            Featured Systems &amp; <span className="tech-gradient-text">Engineering Projects</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Full-stack systems, deep learning research architectures, IoT robotics, and enterprise software built during academic studies and industry internships.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-12 pb-4 border-b border-slate-800">
          {filterOptions.map(filter => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)] scale-105'
                    : 'glass-panel border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Featured Case Study: Hospital Management System */}
        {activeFilter === 'All' || activeFilter === 'Featured Internship Case Study' || activeFilter === 'Full Stack' ? (
          <div className="mb-12">
            {resumeData.projects.filter(p => p.id === 'hospital-management-system').map(hospitalProj => (
              <div
                key={hospitalProj.id}
                className="p-8 sm:p-11 rounded-3xl glass-panel border border-cyan-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-cyan-950/30 hover:border-cyan-400/70 transition-all duration-300 group shadow-2xl relative overflow-hidden interactive-card card-shine"
              >
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 shadow-md">
                      <Hospital className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[11px] font-semibold uppercase px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                          Featured Case Study
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {hospitalProj.type}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {hospitalProj.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectProject(hospitalProj)}
                    className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer"
                  >
                    <span>View Technical Dossier</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                      <Building className="w-4 h-4" />
                      <span>Conducted at CifTech Solutions Pvt. Ltd., Bangalore</span>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {hospitalProj.shortDescription}
                    </p>

                    <div className="space-y-2 pt-2">
                      <span className="text-xs uppercase font-bold tracking-wider text-slate-300 block">Key Deliverables:</span>
                      {hospitalProj.features.slice(0, 3).map((f, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                          <span className="leading-relaxed">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <div>
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
                        Tech Stack &amp; Database Architecture
                      </span>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hospitalProj.technologies.map((t, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-xl text-xs font-medium bg-slate-900 text-cyan-300 border border-cyan-500/30">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400">
                      <span className="text-emerald-400 font-bold">Outcome:</span> Demonstrated end-to-end full-stack software architecture, relational database integrity, and production IT execution.
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects
            .filter(p => p.id !== 'hospital-management-system' || activeFilter !== 'All')
            .map(project => (
              <div
                key={project.id}
                className="p-7 rounded-3xl glass-panel border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between group interactive-card card-shine"
              >
                <div>
                  {/* Category & Type */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                      {project.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {project.type.replace('Project', '')}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3.5 mb-3.5">
                    <div className="p-3 rounded-2xl bg-slate-800/80 group-hover:bg-cyan-500/15 group-hover:scale-110 transition-all shrink-0 shadow-sm">
                      {getProjectIcon(project.iconName)}
                    </div>
                    <h3 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {project.title}
                    </h3>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 line-clamp-3">
                    {project.shortDescription}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-slate-800/80">
                    {project.technologies.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 rounded-lg text-[10px] font-medium bg-slate-900 text-slate-400 border border-slate-800">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => onSelectProject(project)}
                    className="w-full py-3 rounded-2xl text-xs font-semibold glass-panel border border-slate-700 group-hover:border-cyan-500/50 group-hover:text-cyan-300 group-hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
