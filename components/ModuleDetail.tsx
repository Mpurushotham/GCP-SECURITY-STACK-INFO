
import React, { useState } from 'react';
import { Module } from '../types';
import { BookOpen, HelpCircle, ChevronLeft, CheckCircle, Terminal, Lightbulb, FileText, ArrowRight, Settings } from 'lucide-react';
import { HierarchyDiagram, VPCDiagram, KMSDiagram, SCCDashboard, EnterpriseArchDiagram, CybershieldFlow, AISecurityFlow } from './Visualizations';
import InteractiveLab from './InteractiveLab';
import GeminiTutor from './GeminiTutor';
import { motion, AnimatePresence } from 'framer-motion';

interface ModuleDetailProps {
  module: Module;
  onBack: () => void;
  onComplete: () => void;
}

export const ModuleDetail: React.FC<ModuleDetailProps> = ({ module, onBack, onComplete }) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'visualize' | 'lab' | 'quiz'>('learn');
  const [currentSubModuleIndex, setCurrentSubModuleIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(false);
  const [isLabCompleted, setIsLabCompleted] = useState(false);

  const currentSubModule = module.subModules[currentSubModuleIndex];

  const handleNextLesson = () => {
    if (currentSubModuleIndex < module.subModules.length - 1) {
      setCurrentSubModuleIndex(prev => prev + 1);
      setActiveTab('learn');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        setActiveTab('visualize');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleQuizAnswer = (qId: string, optionIdx: number) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    setShowExplanation(prev => ({...prev, [qId]: true }));
  };

  const renderVisualization = (type?: string) => {
      switch(type) {
          case 'HIERARCHY': return <HierarchyDiagram />;
          case 'VPC_PERIMETER': return <VPCDiagram />;
          case 'KMS_flow': return <KMSDiagram />;
          case 'SCC_DASHBOARD': return <SCCDashboard />;
          case 'ENTERPRISE_ARCH': return <EnterpriseArchDiagram />;
          case 'CYBERSHIELD': return <CybershieldFlow />;
          case 'AI_SECURITY': return <AISecurityFlow />;
          default: return (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <p>No specific diagram for this lesson.</p>
                  <button onClick={() => setActiveTab('quiz')} className="mt-4 text-gcp-blue hover:underline">Proceed to Quiz</button>
              </div>
          );
      }
  };

  const isQuizDone = Object.keys(quizAnswers).length === module.quiz.length;
  const canComplete = isQuizDone && (module.lab ? isLabCompleted : true);

  return (
    <div className="flex flex-col min-h-full bg-white dark:bg-[#202124]">
      
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 h-16 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-6 bg-white/95 dark:bg-[#202124]/95 backdrop-blur-sm">
          <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full text-gray-600 dark:text-gray-300 transition-colors">
                <ChevronLeft size={20} />
              </button>
              <h1 className="text-lg font-normal text-gray-800 dark:text-white truncate max-w-[200px] md:max-w-none">{module.title}</h1>
          </div>
          
          <div className="flex gap-1 md:gap-6 text-sm font-medium">
             {['learn', 'visualize', 'lab', 'quiz'].map((tab) => {
                 if (tab === 'lab' && !module.lab) return null;
                 return (
                    <button 
                        key={tab}
                        onClick={() => { setActiveTab(tab as any); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className={`relative py-4 px-3 md:px-4 transition-colors capitalize ${
                            activeTab === tab 
                            ? 'text-gcp-blue' 
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div 
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gcp-blue"
                            />
                        )}
                    </button>
                 )
             })}
          </div>

          <button 
            onClick={() => setIsAiSidebarOpen(!isAiSidebarOpen)}
            className="hidden md:block text-gcp-blue border border-gray-200 dark:border-white/20 px-3 py-1.5 rounded-sm hover:bg-blue-50 dark:hover:bg-white/5 text-sm transition-colors"
          >
            {isAiSidebarOpen ? 'Hide Assistant' : 'AI Assistant'}
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 bg-[#F8F9FA] dark:bg-[#202124]">
            <AnimatePresence mode="wait">
            {activeTab === 'learn' && (
                <motion.div 
                    key="learn"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-4xl mx-auto p-8 bg-white dark:bg-[#2D2E31] my-8 rounded-xl shadow-sm border border-gray-200 dark:border-white/5"
                >
                    <div className="flex items-center justify-between mb-8 border-b border-gray-100 dark:border-white/5 pb-6">
                        <h2 className="text-3xl font-display font-medium text-gray-900 dark:text-white">{currentSubModule.title}</h2>
                        <span className="bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-3 py-1 rounded text-sm whitespace-nowrap">
                            Lesson {currentSubModuleIndex + 1} / {module.subModules.length}
                        </span>
                    </div>
                    
                    <div className="space-y-6">
                        {currentSubModule.content.split('\n').map((line, i) => {
                            const trimmed = line.trim();
                            if (line.startsWith('# ')) return null; // Skip H1 (handled by title)
                            
                            // H3 Headers
                            if (line.startsWith('### ')) {
                                // Check if it's an Implementation header
                                if (line.includes('Implementation') || line.includes('How to')) {
                                     return (
                                        <div key={i} className="flex items-center gap-3 mt-12 mb-6 border-b border-gray-200 dark:border-white/10 pb-2">
                                            <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded text-gcp-blue">
                                                <Settings size={20} />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{line.replace('### ', '')}</h3>
                                        </div>
                                    );
                                }
                                return (
                                    <div key={i} className="flex items-center gap-3 mt-10 mb-6 group">
                                        <div className="w-1.5 h-6 bg-gcp-blue rounded-full group-hover:h-8 transition-all"></div>
                                        <h3 className="text-xl font-medium text-gray-800 dark:text-white">{line.replace('### ', '')}</h3>
                                    </div>
                                );
                            }

                            // Lists
                            if (trimmed.startsWith('* ')) return (
                                <li key={i} className="ml-6 text-gray-700 dark:text-gray-300 list-none my-3 leading-relaxed relative pl-4">
                                    <span className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-gcp-blue rounded-full"></span>
                                    <span dangerouslySetInnerHTML={{ __html: line.replace('* ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white font-semibold">$1</strong>') }} />
                                </li>
                            );
                            
                            // Numbered Lists
                            if (trimmed.startsWith('1. ') || /^\d+\./.test(trimmed)) return (
                                <li key={i} className="ml-6 text-gray-700 dark:text-gray-300 list-decimal my-3 leading-relaxed pl-2 font-medium">
                                     <span dangerouslySetInnerHTML={{ __html: line.replace(/^\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white font-bold">$1</strong>').replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-gcp-blue dark:text-blue-300">$1</code>') }} />
                                </li>
                            );

                            // Callouts (Key Takeaway)
                            if (line.startsWith('**Key Takeaway')) return (
                                <div key={i} className="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-gcp-blue p-6 my-8 rounded-r-lg shadow-sm transform hover:scale-[1.01] transition-transform">
                                    <div className="flex items-start gap-3">
                                        <Lightbulb className="text-gcp-blue shrink-0 mt-1" size={20} />
                                        <div>
                                            <h4 className="font-bold text-gcp-blue text-sm uppercase tracking-wide mb-1">Key Takeaway</h4>
                                            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                                                {line.replace(/\*\*Key Takeaway.*?\*\*:?/, '').trim()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                            
                            // Code Blocks (Basic single line detection for gcloud/sql)
                            if (line.includes('gcloud') || line.includes('CREATE ROW ACCESS POLICY') || line.includes('member:') || line.includes('constraints/')) return (
                                <div key={i} className="bg-[#1e293b] text-gray-200 p-4 rounded-lg font-mono text-sm my-4 border border-gray-700 overflow-x-auto shadow-inner group relative">
                                    {line}
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 px-2 py-1 rounded text-xs text-gray-400">bash</div>
                                </div>
                            );

                            // Empty lines
                            if (!trimmed) return <div key={i} className="h-2"></div>;

                            // Paragraphs
                            return (
                                <p key={i} className="text-gray-600 dark:text-gray-300 leading-7 text-lg mb-4 font-normal">
                                    <span dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white font-bold">$1</strong>').replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-gcp-red dark:text-red-300">$1</code>') }} />
                                </p>
                            )
                        })}
                    </div>

                    <div className="mt-16 flex justify-between border-t border-gray-200 dark:border-white/10 pt-8">
                         <button 
                            disabled={currentSubModuleIndex === 0}
                            onClick={() => {
                                setCurrentSubModuleIndex(p => p - 1);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-gray-600 dark:text-gray-400 hover:text-gcp-blue disabled:opacity-30 font-medium flex items-center gap-2 transition-colors"
                         >
                             <ChevronLeft size={16} /> Previous Lesson
                         </button>
                         <button 
                            onClick={handleNextLesson}
                            className="bg-gcp-blue hover:bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-blue-500/20 font-medium flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                         >
                            Next Lesson <ChevronLeft className="rotate-180" size={16} />
                         </button>
                    </div>

                    {/* Footer Section specific to Module */}
                    <div className="mt-12 p-6 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                             <BookOpen size={18} /> Additional Resources
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <a href="#" className="flex items-center gap-2 text-sm text-gcp-blue hover:underline">
                                <ArrowRight size={14} /> Official Documentation
                            </a>
                             <a href="#" className="flex items-center gap-2 text-sm text-gcp-blue hover:underline">
                                <ArrowRight size={14} /> Architecture Framework
                            </a>
                        </div>
                    </div>
                </motion.div>
            )}

            {activeTab === 'visualize' && (
                <motion.div 
                    key="visualize"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col p-8 items-center justify-center bg-[#F8F9FA] dark:bg-[#202124] min-h-[calc(100vh-200px)]"
                >
                    <div className="w-full max-w-5xl bg-white dark:bg-[#2D2E31] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <FileText className="text-purple-600" size={24} />
                            </div>
                            <h2 className="text-xl font-medium text-gray-900 dark:text-white">Architecture Visualization</h2>
                        </div>
                        <div className="flex-1 border border-gray-100 dark:border-white/5 rounded-lg bg-gray-50 dark:bg-[#202124] relative overflow-hidden flex items-center justify-center min-h-[500px]">
                            {renderVisualization(currentSubModule.diagramType)}
                        </div>
                    </div>
                </motion.div>
            )}

            {activeTab === 'lab' && module.lab && (
                <motion.div 
                    key="lab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="min-h-[calc(100vh-100px)]"
                >
                    <InteractiveLab lab={module.lab} onComplete={() => setIsLabCompleted(true)} />
                </motion.div>
            )}

            {activeTab === 'quiz' && (
                <motion.div 
                    key="quiz"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-3xl mx-auto p-8 min-h-[calc(100vh-200px)]"
                >
                    <div className="flex items-center gap-3 mb-8">
                         <div className="p-2 bg-gcp-green/10 rounded-lg">
                            <CheckCircle className="text-gcp-green" size={24} />
                         </div>
                        <h2 className="text-2xl font-normal text-gray-900 dark:text-white">Knowledge Check</h2>
                    </div>

                    <div className="space-y-6">
                        {module.quiz.map((q, idx) => (
                            <motion.div 
                                key={q.id} 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white dark:bg-[#2D2E31] p-6 rounded-xl shadow-sm border border-gray-200 dark:border-white/5 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                            >
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 leading-relaxed">
                                    <span className="text-gcp-blue mr-3 font-bold">Q{idx + 1}.</span>{q.question}
                                </h3>
                                <div className="space-y-3">
                                    {q.options.map((opt, optIdx) => (
                                        <button
                                            key={optIdx}
                                            onClick={() => handleQuizAnswer(q.id, optIdx)}
                                            className={`w-full text-left p-4 rounded-lg border transition-all text-sm flex items-center justify-between group ${
                                                quizAnswers[q.id] === optIdx 
                                                    ? (optIdx === q.correctAnswer 
                                                        ? 'bg-green-50 dark:bg-green-900/20 border-gcp-green text-green-900 dark:text-green-300' 
                                                        : 'bg-red-50 dark:bg-red-900/20 border-gcp-red text-red-900 dark:text-red-300')
                                                    : 'bg-white dark:bg-transparent border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
                                            }`}
                                        >
                                            <span className="flex-1">{opt}</span>
                                            {quizAnswers[q.id] === optIdx && (
                                                <span className="shrink-0 ml-2">
                                                    {optIdx === q.correctAnswer ? <CheckCircle size={18} /> : <Terminal size={18} />}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <AnimatePresence>
                                {showExplanation[q.id] && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className={`mt-4 p-4 rounded-lg text-sm border-l-4 ${quizAnswers[q.id] === q.correctAnswer ? 'bg-green-50 dark:bg-green-900/10 border-gcp-green text-green-900 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/10 border-gcp-red text-red-900 dark:text-red-300'}`}
                                    >
                                        <strong className="font-bold block mb-1">Explanation:</strong> {q.explanation}
                                    </motion.div>
                                )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="mt-12 flex justify-end pb-12">
                        {canComplete ? (
                            <button 
                                onClick={onComplete}
                                className="bg-gcp-green hover:bg-green-600 text-white px-8 py-4 rounded-lg shadow-lg font-bold flex items-center gap-2 animate-bounce hover:animate-none transition-transform hover:scale-105"
                            >
                                <CheckCircle size={20} /> Complete Module
                            </button>
                        ) : (
                            <div className="bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 px-6 py-3 rounded-lg text-sm flex items-center gap-3">
                                <HelpCircle size={18} /> 
                                <span>Complete the {module.lab ? 'lab and' : ''} quiz to finish.</span>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
            </AnimatePresence>

      {/* AI Sidebar */}
      <AnimatePresence>
      {isAiSidebarOpen && (
        <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-16 bottom-0 right-0 w-[400px] border-l border-gray-200 dark:border-white/10 bg-white dark:bg-[#202124] shadow-2xl z-50 flex flex-col"
        >
            <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between bg-gcp-lightBlue dark:bg-blue-900/20">
                <span className="font-medium text-gcp-blue dark:text-blue-300 flex items-center gap-2">
                    <Terminal size={16} /> Security Tutor
                </span>
                <button onClick={() => setIsAiSidebarOpen(false)}><ChevronLeft className="rotate-180" size={18} /></button>
            </div>
            <div className="flex-1 overflow-hidden">
                <GeminiTutor context={`Current Module: ${module.title}. Topic: ${currentSubModule.title}.`} />
            </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  </div>
  );
};
