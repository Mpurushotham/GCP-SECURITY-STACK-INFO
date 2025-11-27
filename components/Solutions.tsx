
import React, { useState } from 'react';
import { SECURITY_SOLUTIONS, SECURITY_PRODUCTS } from '../constants';
import { IngressFlow, EncryptionFlow, IdentityFlow, DetectionFlow, ZeroTrustFlow, DLPFlow, SIEMFlow, SupplyChainFlow, AISecurityFlow, GovernanceFlow, RansomwareFlow, OTSecurityFlow, CybershieldFlow, SovereigntyFlow } from './Visualizations';
import { ChevronRight, Fingerprint, Box, ShieldCheck, Activity, CheckCircle, ArrowRight, Zap, Database, Cpu, AlertTriangle, Shield, Share2, Lock, Eye, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.FC<any>> = {
  Fingerprint, Box, ShieldCheck, Activity, Zap, Database, CheckCircle, Cpu, AlertTriangle, Shield, Share2, Lock, Eye
};

const Solutions = () => {
  const [openSolutionId, setOpenSolutionId] = useState<string>('zero-trust');
  const navigate = useNavigate();

  // Group solutions by section
  const sections = Array.from(new Set(SECURITY_SOLUTIONS.map(s => s.section)));
  const groupedSolutions = sections.reduce((acc, section) => {
    acc[section] = SECURITY_SOLUTIONS.filter(s => s.section === section);
    return acc;
  }, {} as Record<string, typeof SECURITY_SOLUTIONS>);

  const renderVisual = (type: string) => {
      switch(type) {
          case 'INGRESS': return <IngressFlow />;
          case 'ENCRYPTION': return <EncryptionFlow />;
          case 'IDENTITY': return <IdentityFlow />;
          case 'DETECTION': return <DetectionFlow />;
          case 'ZERO_TRUST': return <ZeroTrustFlow />;
          case 'DATA_SECURITY': return <DLPFlow />;
          case 'SIEM': return <SIEMFlow />;
          case 'SUPPLY_CHAIN': return <SupplyChainFlow />;
          case 'AI_SECURITY': return <AISecurityFlow />;
          case 'GOVERNANCE': return <GovernanceFlow />;
          case 'RANSOMWARE': return <RansomwareFlow />;
          case 'OT_SECURITY': return <OTSecurityFlow />;
          case 'CYBERSHIELD': return <CybershieldFlow />;
          case 'SOVEREIGNTY': return <SovereigntyFlow />;
          default: return null;
      }
  };

  const activeSolution = SECURITY_SOLUTIONS.find(s => s.id === openSolutionId)!;

  return (
    <div className="max-w-[1600px] mx-auto p-6 lg:p-12 h-full flex flex-col">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Security Solutions</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl text-lg">
           Architectural patterns and comprehensive solutions to solve complex security challenges.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start h-full">
          {/* Solutions Sidebar Navigation */}
          <div className="w-full lg:w-1/4 lg:sticky lg:top-4 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar pr-2">
              <div className="space-y-8">
                  {sections.map(section => (
                      <div key={section}>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 pl-3">
                              {section}
                          </h4>
                          <div className="space-y-1">
                              {groupedSolutions[section].map((solution) => {
                                  const Icon = iconMap[solution.iconName] || ShieldCheck;
                                  const isActive = openSolutionId === solution.id;
                                  return (
                                    <button
                                        key={solution.id}
                                        onClick={() => setOpenSolutionId(solution.id)}
                                        className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                            isActive 
                                            ? 'bg-blue-50 dark:bg-blue-900/30 text-gcp-blue' 
                                            : 'text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/5'
                                        }`}
                                    >
                                        <Icon size={18} className={isActive ? 'text-gcp-blue' : 'text-slate-400'} />
                                        <span className="truncate">{solution.title}</span>
                                        {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gcp-blue" />}
                                    </button>
                                  )
                              })}
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Solution Detail View */}
          <div className="flex-1 w-full lg:w-3/4">
              <motion.div 
                key={openSolutionId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-[#2D2E31] rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl overflow-hidden min-h-[600px] flex flex-col"
              >
                  {/* Header & Visual */}
                  <div className="p-8 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-black/20">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-white dark:bg-white/10 rounded-xl shadow-sm">
                            {React.createElement(iconMap[activeSolution.iconName] || ShieldCheck, { size: 32, className: "text-gcp-blue" })}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{activeSolution.title}</h2>
                            <p className="text-slate-600 dark:text-slate-400">{activeSolution.description}</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#202124] border border-gray-200 dark:border-white/10 rounded-xl p-4 shadow-inner">
                        <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                            <Layers size={14} /> Architecture Diagram
                        </div>
                        {renderVisual(activeSolution.architectureType)}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-8 flex-1 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <CheckCircle className="text-gcp-green" size={20} /> Key Benefits
                            </h3>
                            <ul className="space-y-4">
                                {activeSolution.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gcp-green mt-2 shrink-0" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <Box className="text-gcp-blue" size={20} /> Products Included
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {activeSolution.productsIncluded.length > 0 ? (
                                    activeSolution.productsIncluded.map(prodId => {
                                        const product = SECURITY_PRODUCTS.find(p => p.id === prodId);
                                        // If product not found (e.g. general service), display generic card
                                        if (!product) {
                                            return (
                                                <div key={prodId} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 opacity-75">
                                                    <div className="w-8 h-8 rounded bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-500">
                                                        <Box size={16} /> 
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400 capitalize">{prodId.replace('-', ' ')}</span>
                                                </div>
                                            )
                                        }
                                        return (
                                            <div 
                                                key={prodId}
                                                onClick={() => navigate('/products')}
                                                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer group transition-colors bg-white dark:bg-transparent"
                                            >
                                                <div className="w-8 h-8 rounded bg-blue-50 dark:bg-white/10 flex items-center justify-center text-gcp-blue">
                                                     {/* Icon placeholder since we don't have direct access to mapped icons here easily without re-importing map */}
                                                     <Box size={16} />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{product.name}</span>
                                                <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 text-gcp-blue transition-opacity" />
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="text-sm text-slate-500 italic p-4 bg-gray-50 dark:bg-white/5 rounded-lg">
                                        This solution is a strategic framework or service engagement that utilizes a custom mix of Google Cloud capabilities.
                                    </div>
                                )}
                            </div>
                        </div>
                  </div>
              </motion.div>
          </div>
      </div>
    </div>
  );
};

export default Solutions;
