
import React from 'react';
import { Module } from '../types';
import { CheckCircle2, PlayCircle, Shield, Share2, Lock, Eye, Zap, Database, Map, ArrowUpRight, BookOpen, Cpu, Globe } from 'lucide-react';

interface ModuleCardProps {
  module: Module;
  onClick: (id: string) => void;
  isCompleted: boolean;
}

const iconMap: Record<string, React.FC<any>> = {
  'BookOpen': BookOpen,
  'Shield': Shield,
  'Network': Share2,
  'Lock': Lock,
  'Eye': Eye,
  'Zap': Zap,
  'Cpu': Cpu,
  'Share2': Share2,
  'Map': Map,
  'Globe': Globe
};

const ModuleCard: React.FC<ModuleCardProps> = ({ module, onClick, isCompleted }) => {
  const Icon = iconMap[module.iconName] || BookOpen;

  return (
    <div 
      onClick={() => onClick(module.id)}
      className={`group bg-white dark:bg-[#0F172A] border ${isCompleted ? 'border-green-500/50 dark:border-green-900/50' : 'border-gray-200 dark:border-slate-800'} rounded-2xl p-6 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-lg dark:hover:bg-slate-800/50 transition-all cursor-pointer relative overflow-hidden`}
    >
      <div className="absolute top-4 right-4 text-slate-400 dark:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-white transition-colors">
          {isCompleted ? <CheckCircle2 className="text-green-500" size={20} /> : <ArrowUpRight size={20} />}
      </div>
      
      <div className={`w-12 h-12 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 flex items-center justify-center mb-6 ${isCompleted ? 'text-green-600 dark:text-green-500' : 'text-blue-600 dark:text-blue-400'} group-hover:text-slate-900 dark:group-hover:text-white transition-colors`}>
          <Icon size={24} />
      </div>

      <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">{module.title}</h4>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 min-h-[40px]">{module.description}</p>
      
      <div className="flex items-center text-xs font-mono text-slate-500 uppercase tracking-wide">
          <span>{module.duration}</span>
          <span className="mx-2">•</span>
          <span>{module.subModules.length} Lessons</span>
      </div>
    </div>
  );
};

export default ModuleCard;
