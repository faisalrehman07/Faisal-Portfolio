import React, { useState } from 'react';
import { 
  Briefcase, 
  Building, 
  MapPin, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2
} from 'lucide-react';
import { resumeData } from '../data/resume';

export const ExperienceTimeline: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedIds, setExpandedIds] = useState<string[]>([resumeData.experience[0].id, resumeData.experience[1].id]);

  const categories = ['All', 'Internships', 'Expos', 'Workshops & Training'];

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredExperience = resumeData.experience.filter(exp => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Internships') return exp.category === 'Internship';
    if (activeCategory === 'Expos') return exp.category === 'Expo';
    if (activeCategory === 'Workshops & Training') return exp.category === 'Workshop' || exp.category === 'Training';
    return true;
  });

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'Internship': return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      case 'Expo': return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Workshop': return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      case 'Training': return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300 mb-3 backdrop-blur-md">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white">
            Experience, Internships &amp; <span className="tech-gradient-text">Expos</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            A chronological timeline documenting hands-on full-stack development, cybersecurity VAPT internships, technical project exhibitions, and corporate engineering training.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-12 pb-4 border-b border-slate-800">
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)] scale-105'
                    : 'glass-panel border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Vertical Interactive Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-8">
          {filteredExperience.map(exp => {
            const isExpanded = expandedIds.includes(exp.id);
            return (
              <div key={exp.id} className="relative group">
                {/* Glowing Node Dot on the timeline spine */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-6 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:border-cyan-300 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                </span>

                {/* Timeline Card */}
                <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 interactive-card card-shine">
                  {/* Card Header & Summary Bar */}
                  <div
                    onClick={() => toggleExpand(exp.id)}
                    className="cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full border ${getCategoryBadgeColor(exp.category)}`}>
                          {exp.badge}
                        </span>
                        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{exp.period}</span>
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                        {exp.title}
                      </h3>

                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1.5">
                        <Building className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="font-semibold text-slate-200">{exp.organization}</span>
                        {exp.location && (
                          <>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1 text-slate-400">
                              <MapPin className="w-3 h-3 text-slate-500" />
                              {exp.location}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <button
                        className="p-2.5 rounded-2xl bg-slate-800/80 text-slate-400 group-hover:text-white group-hover:bg-slate-700 transition-colors"
                        aria-label={isExpanded ? 'Collapse milestone details' : 'Expand milestone details'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Summary Text */}
                  <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed">
                    {exp.summary}
                  </p>

                  {/* Expandable Highlighted Bullets & Gained Skills */}
                  {isExpanded && (
                    <div className="mt-5 pt-5 border-t border-slate-800 space-y-4 animate-fade-in">
                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                          Documented Contributions &amp; Exposure:
                        </span>
                        {exp.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Skills Gained Tags */}
                      <div className="pt-3 flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-medium text-slate-400 mr-1">Skills Gained:</span>
                        {exp.skillsGained.map((sk, skIdx) => (
                          <span
                            key={skIdx}
                            className="px-3 py-1 rounded-xl text-xs font-medium bg-slate-900 text-cyan-300 border border-slate-800"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
