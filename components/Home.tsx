
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, UserCheck, Lock, Activity, CheckCircle, Clock, Zap, Target, Award, ChevronDown, ChevronUp, Share2, Key, Eye, FileSearch, ShieldCheck } from 'lucide-react';
import { SECURITY_PRODUCTS, INTEGRATION_FLOW, ZERO_TRUST_CARDS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { SecurityProduct } from '../types';

const iconMap: Record<string, React.FC<any>> = {
  UserCheck, 
  Lock, 
  Activity, 
  Shield, 
  CheckCircle,
  Network: Share2, // VPC-SC
  Key,             // KMS
  Eye,             // Chronicle
  FileSearch,      // DLP
  ShieldCheck      // Armor
};

const Home = () => {
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const selectedProduct = SECURITY_PRODUCTS.find(p => p.id === selectedProductId);

  // Helper to render product details inline
  const renderProductDetail = (product: SecurityProduct) => {
      const Icon = iconMap[product.iconName] || Shield;
      return (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-lg p-8 mb-12 border border-white/20"
          >
              <div className="flex items-center mb-6">
                  <div className={`bg-gradient-to-br ${product.color} rounded-lg p-4 mr-4 shadow-lg`}>
                      <Icon size={48} className="text-white" />
                  </div>
                  <div>
                      <h2 className="text-3xl font-bold text-white">{product.name}</h2>
                      <p className="text-xl text-gray-300">{product.tagline}</p>
                  </div>
              </div>

              {/* Business Value */}
              <div className="bg-green-500/20 border-l-4 border-green-500 rounded p-4 mb-6">
                  <div className="flex items-start">
                      <CheckCircle className="text-green-400 w-6 h-6 mr-3 flex-shrink-0" />
                      <div>
                          <h4 className="font-bold text-white mb-1">Business Value</h4>
                          <p className="text-gray-200">{product.businessValue}</p>
                      </div>
                  </div>
              </div>

              {/* Components Toggle */}
              <div className="mb-6">
                  <button 
                    onClick={() => setExpandedSection(expandedSection === 'components' ? null : 'components')}
                    className="flex items-center text-xl font-bold text-white mb-4 hover:text-blue-300 transition-colors"
                  >
                      {expandedSection === 'components' ? <ChevronUp className="mr-2"/> : <ChevronDown className="mr-2"/>}
                      Components & Capabilities
                  </button>
                  <AnimatePresence>
                    {expandedSection === 'components' && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-3"
                        >
                            {product.components.map((component, idx) => (
                                <div key={idx} className="bg-white/5 rounded p-3 flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                                    <span className="text-sm text-gray-300">{component}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}
                  </AnimatePresence>
              </div>

               {/* Problems Solved Toggle */}
               <div className="mb-6">
                  <button 
                    onClick={() => setExpandedSection(expandedSection === 'problems' ? null : 'problems')}
                    className="flex items-center text-xl font-bold text-white mb-4 hover:text-blue-300 transition-colors"
                  >
                      {expandedSection === 'problems' ? <ChevronUp className="mr-2"/> : <ChevronDown className="mr-2"/>}
                      Problems Solved for Companies
                  </button>
                  <AnimatePresence>
                    {expandedSection === 'problems' && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-3"
                        >
                            {product.problems.map((problem, idx) => (
                                <div key={idx} className="bg-blue-500/10 rounded p-3 flex items-start border-l-2 border-blue-400">
                                    <Shield className="w-4 h-4 mr-2 mt-0.5 text-blue-400 flex-shrink-0" />
                                    <span className="text-sm text-gray-300">{problem}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}
                  </AnimatePresence>
              </div>
              
              <div className="flex justify-end mt-6">
                   <button 
                      onClick={() => navigate('/products')}
                      className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-bold border border-white/20 transition-all flex items-center gap-2"
                   >
                       View Full Catalog <ArrowRight size={16} />
                   </button>
              </div>
          </motion.div>
      )
  };

  return (
    <div className="min-h-full p-8 max-w-[1600px] mx-auto text-white">
        
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500 bg-clip-text text-transparent drop-shadow-sm font-display pb-2">
                Google Cloud Security Stack
            </h1>
            <p className="text-xl text-blue-200">Unified Security Architecture (2025)</p>
            <p className="text-sm text-gray-400 mt-2">Based on Google Cloud Security Foundations & BeyondCorp Zero Trust</p>
        </div>

        {/* Security Framework */}
        <div className="mb-12 bg-white/5 rounded-2xl p-8 backdrop-blur-md border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold mb-8 flex items-center text-white">
                <Shield className="mr-3 text-blue-400" />
                BeyondCorp Zero Trust Framework
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ZERO_TRUST_CARDS.map((card, idx) => {
                    const Icon = iconMap[card.icon];
                    return (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`bg-gradient-to-br ${card.color} rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300`}
                        >
                            <div className="text-3xl mb-4 text-center text-white/90">
                                <Icon size={36} className="mx-auto" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-center text-white">{card.title}</h3>
                            <p className="text-blue-100 text-sm text-center leading-relaxed">{card.desc}</p>
                        </motion.div>
                    )
                })}
            </div>
        </div>

        {/* Implementation Sequence */}
        <div className="mb-12 bg-white/5 rounded-2xl p-8 backdrop-blur-md border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold mb-8 flex items-center text-white">
                <ArrowRight className="mr-3 text-green-400" />
                Implementation Sequence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {INTEGRATION_FLOW.map((flow) => (
                    <div key={flow.step} className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-6 relative border border-white/10 hover:border-white/30 transition-colors">
                        <div className="absolute top-4 right-4 w-10 h-10 bg-white text-blue-900 rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                            {flow.step}
                        </div>
                        <h3 className="text-xl font-bold mb-2 pr-12 text-white">{flow.title}</h3>
                        <p className="text-sm text-gray-300 mb-4 h-10">{flow.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {flow.products.map(pid => {
                                const prod = SECURITY_PRODUCTS.find(p => p.id === pid);
                                const Icon = prod ? (iconMap[prod.iconName] || Shield) : Shield;
                                return (
                                    <div key={pid} className="flex items-center bg-white/10 rounded px-2 py-1 text-xs text-blue-200">
                                        <Icon size={12} className="mr-1" />
                                        {prod?.name.replace('Google Cloud ', '').replace('Cloud ', '')}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {SECURITY_PRODUCTS.map((product) => {
                const Icon = iconMap[product.iconName] || Shield;
                const isSelected = selectedProductId === product.id;
                
                return (
                    <motion.div 
                        key={product.id}
                        layoutId={`product-${product.id}`}
                        onClick={() => {
                            setSelectedProductId(isSelected ? null : product.id);
                            setExpandedSection(null);
                        }}
                        className={`cursor-pointer rounded-xl p-6 relative transition-all duration-300 ${
                            isSelected 
                            ? 'ring-4 ring-white/50 shadow-[0_0_30px_rgba(66,133,244,0.5)] transform scale-105 z-10' 
                            : 'hover:scale-105 hover:shadow-xl'
                        } bg-gradient-to-br ${product.color}`}
                    >
                         <div className="flex items-start justify-between mb-4">
                            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                                <Icon size={32} className="text-white" />
                            </div>
                            <span className={`text-xs px-2 py-1 rounded font-bold shadow-sm ${
                                product.priority === 'Critical' ? 'bg-red-500 text-white' :
                                product.priority === 'High' ? 'bg-orange-500 text-white' : 'bg-yellow-500 text-black'
                            }`}>
                                {product.priority}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-white">{product.name}</h3>
                        <p className="text-sm text-blue-50 mb-4 h-10 overflow-hidden">{product.tagline}</p>
                        <div className="flex items-center justify-between text-xs text-blue-100 font-mono bg-black/20 p-2 rounded">
                            <span className="flex items-center gap-1"><Clock size={12}/> {product.setupTime}</span>
                            <span>{product.components.length} Components</span>
                        </div>
                    </motion.div>
                )
            })}
        </div>

        {/* Detailed Product View (Inline Expansion) */}
        <AnimatePresence>
            {selectedProduct && renderProductDetail(selectedProduct)}
        </AnimatePresence>

        {/* Security Architecture Diagram */}
        <div className="mb-12 bg-white/5 rounded-2xl p-8 backdrop-blur-md border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
                <Activity className="mr-3 text-purple-400" />
                Unified Security Architecture
            </h2>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 border border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                    <div className="bg-blue-500/20 p-6 rounded-xl border border-blue-500/30">
                        <UserCheck className="text-blue-400 w-8 h-8 mx-auto mb-3" />
                        <h4 className="font-bold text-white">Identity & Access</h4>
                        <p className="text-xs text-gray-400 mt-2">IAM, Identity Platform, BeyondCorp</p>
                    </div>
                    <div className="bg-green-500/20 p-6 rounded-xl border border-green-500/30">
                        <Shield className="text-green-400 w-8 h-8 mx-auto mb-3" />
                        <h4 className="font-bold text-white">Infrastructure</h4>
                        <p className="text-xs text-gray-400 mt-2">VPC-SC, Armor, Security Command Center</p>
                    </div>
                    <div className="bg-yellow-500/20 p-6 rounded-xl border border-yellow-500/30">
                        <Lock className="text-yellow-400 w-8 h-8 mx-auto mb-3" />
                        <h4 className="font-bold text-white">Data Security</h4>
                        <p className="text-xs text-gray-400 mt-2">Cloud DLP, HSM, Encryption Keys</p>
                    </div>
                    <div className="bg-red-500/20 p-6 rounded-xl border border-red-500/30">
                        <Activity className="text-red-400 w-8 h-8 mx-auto mb-3" />
                        <h4 className="font-bold text-white">Operations</h4>
                        <p className="text-xs text-gray-400 mt-2">Chronicle, Siemplify, Log Analytics</p>
                    </div>
                </div>
                <div className="mt-8 text-center text-gray-400 text-sm font-mono border-t border-white/10 pt-4">
                    <span className="mx-2">&larr; Integrated Threat Intelligence & AI/ML Security &rarr;</span>
                </div>
            </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/5 rounded-xl p-6 text-center backdrop-blur-sm border border-white/10">
                <div className="text-3xl font-bold text-blue-400 mb-2">{SECURITY_PRODUCTS.length}</div>
                <div className="text-sm text-gray-300">Security Products</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center backdrop-blur-sm border border-white/10">
                <div className="text-3xl font-bold text-green-400 mb-2">200+</div>
                <div className="text-sm text-gray-300">Compliance Certifications</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center backdrop-blur-sm border border-white/10">
                <div className="text-3xl font-bold text-yellow-400 mb-2">99.99%</div>
                <div className="text-sm text-gray-300">Uptime SLA</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center backdrop-blur-sm border border-white/10">
                <div className="text-3xl font-bold text-red-400 mb-2">24/7</div>
                <div className="text-sm text-gray-300">Global Threat Intelligence</div>
            </div>
        </div>
    </div>
  );
};

export default Home;
