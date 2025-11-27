
import React, { useState } from 'react';
import { SECURITY_PRODUCTS } from '../constants';
import { Search, Shield, Key, Lock, Activity, Eye, FileSearch, UserCheck, ExternalLink, ChevronRight, BookOpen, Layers, Terminal, AlertTriangle, ShieldCheck, Fingerprint, CheckCircle, Share2, Box } from 'lucide-react';
import { IngressFlow, EncryptionFlow, IdentityFlow, DetectionFlow, ZeroTrustFlow, DLPFlow, SIEMFlow, SupplyChainFlow } from './Visualizations';
import ProductSimulator from './ProductSimulator';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.FC<any>> = {
  Shield, 
  Key, 
  Lock, 
  Activity, 
  Eye, 
  FileSearch, 
  UserCheck, 
  ShieldCheck, 
  Fingerprint, 
  CheckCircle, 
  Search,
  Network: Share2, // VPC-SC uses Network alias
  Box
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'best-practices' | 'simulator'>('overview');

  const filteredProducts = SECURITY_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedProduct = SECURITY_PRODUCTS.find(p => p.id === selectedProductId);

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
          default: return <div className="p-12 text-center text-slate-500 border border-dashed border-gray-300 dark:border-slate-700 rounded-lg">Architecture diagram pending...</div>
      }
  }

  // Master View
  if (!selectedProductId) {
      return (
        <div className="p-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Security Product Knowledge Base</h1>
                <p className="text-slate-600 dark:text-slate-400">Deep dive into the essential GCP security stack. Select a product to master it.</p>
            </div>
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-gcp-blue transition-colors"
                />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => {
              const Icon = iconMap[product.iconName] || Shield;
              return (
                <motion.div 
                    whileHover={{ y: -5 }}
                    key={product.id} 
                    onClick={() => { setSelectedProductId(product.id); setActiveTab('overview'); }}
                    className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-6 hover:border-slate-400 dark:hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 group cursor-pointer relative overflow-hidden"
                >
                   <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity text-gcp-blue">
                       <ChevronRight />
                   </div>
                   <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-lg bg-gray-50 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-slate-700 transition-colors">
                          <Icon className="text-gcp-blue" size={24} />
                      </div>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-500 bg-gray-100 dark:bg-slate-950 px-2 py-1 rounded uppercase tracking-wider">{product.category}</span>
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">{product.name}</h3>
                   <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 h-12 overflow-hidden">{product.description}</p>
                   <div className="w-full bg-gray-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                       <div className="bg-gradient-to-r from-gcp-blue to-purple-500 w-0 group-hover:w-full transition-all duration-700 h-full" />
                   </div>
                </motion.div>
              )
            })}
          </div>

          {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                  <p className="text-slate-500">No products found matching "{searchTerm}"</p>
              </div>
          )}
        </div>
      );
  }

  // Detail View
  if (!selectedProduct) return null;

  const Icon = iconMap[selectedProduct.iconName] || Shield;

  return (
      <div className="flex flex-col min-h-full">
          {/* Header */}
          <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 p-8 pb-0">
              <button 
                onClick={() => setSelectedProductId(null)} 
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 text-sm mb-6"
              >
                  <ChevronRight className="rotate-180" size={14} /> Back to Glossary
              </button>
              
              <div className="flex items-center gap-6 mb-8">
                  <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
                      <Icon size={40} className="text-gcp-blue" />
                  </div>
                  <div>
                      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{selectedProduct.name}</h1>
                      <p className="text-xl text-slate-600 dark:text-slate-400">{selectedProduct.description}</p>
                  </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-8">
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className={`pb-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'overview' ? 'border-gcp-blue text-slate-900 dark:text-white' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                  >
                      <BookOpen size={16} /> Overview
                  </button>
                  <button 
                    onClick={() => setActiveTab('architecture')}
                    className={`pb-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'architecture' ? 'border-gcp-blue text-slate-900 dark:text-white' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                  >
                      <Layers size={16} /> Architecture
                  </button>
                   <button 
                    onClick={() => setActiveTab('best-practices')}
                    className={`pb-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'best-practices' ? 'border-gcp-blue text-slate-900 dark:text-white' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                  >
                      <Shield size={16} /> Best Practices
                  </button>
                  <button 
                    onClick={() => setActiveTab('simulator')}
                    className={`pb-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'simulator' ? 'border-gcp-yellow text-slate-900 dark:text-white' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                  >
                      <Terminal size={16} /> Simulator
                  </button>
              </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-8 bg-gray-50 dark:bg-slate-950">
              <div className="max-w-4xl mx-auto">
                  {activeTab === 'overview' && (
                      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                          <section>
                              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">What is it?</h3>
                              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">{selectedProduct.whatIsIt}</p>
                          </section>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
                                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                      <AlertTriangle className="text-gcp-red" size={20} /> Problem Solved
                                  </h3>
                                  <p className="text-slate-600 dark:text-slate-300">{selectedProduct.problemSolved}</p>
                              </section>
                              <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
                                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                      <Activity className="text-gcp-green" size={20} /> Why it matters
                                  </h3>
                                  <p className="text-slate-600 dark:text-slate-300">{selectedProduct.whyImportant}</p>
                              </section>
                          </div>

                          <section>
                              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">When to use it?</h3>
                              <ul className="grid grid-cols-1 gap-3">
                                  {selectedProduct.whenToUse.map((item, idx) => (
                                      <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-900/50 p-3 rounded-lg border border-gray-200 dark:border-slate-800">
                                          <div className="w-1.5 h-1.5 rounded-full bg-gcp-blue mt-2.5 shrink-0" />
                                          {item}
                                      </li>
                                  ))}
                              </ul>
                          </section>
                      </div>
                  )}

                  {activeTab === 'architecture' && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                           <div>
                               <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Visual Workflow</h3>
                               {renderVisual(selectedProduct.architectureType)}
                           </div>
                           <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
                               <h4 className="font-bold text-slate-900 dark:text-white mb-2">How it works</h4>
                               <p className="text-slate-600 dark:text-slate-300">{selectedProduct.howToUse}</p>
                           </div>
                      </div>
                  )}

                  {activeTab === 'best-practices' && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Security Best Practices</h3>
                          {selectedProduct.bestPractices.map((practice, idx) => (
                              <div key={idx} className="flex gap-4 p-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl hover:border-gcp-green/30 transition-colors shadow-sm">
                                  <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-gcp-green/10 flex items-center justify-center shrink-0">
                                      <Shield className="text-gcp-green" size={20} />
                                  </div>
                                  <div>
                                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Recommendation {idx + 1}</h4>
                                      <p className="text-slate-600 dark:text-slate-300">{practice}</p>
                                  </div>
                              </div>
                          ))}
                          <div className="mt-8">
                                <a 
                                    href={selectedProduct.docsUrl} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 text-gcp-blue hover:text-blue-700 dark:hover:text-white font-medium transition-colors"
                                >
                                    Read Official Documentation <ExternalLink size={16} />
                                </a>
                          </div>
                      </div>
                  )}

                  {activeTab === 'simulator' && (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Interactive Configuration</h3>
                          <p className="text-slate-600 dark:text-slate-400 mb-8">Test your knowledge by configuring {selectedProduct.name} in this simulated scenario.</p>
                          <ProductSimulator product={selectedProduct} />
                      </div>
                  )}
              </div>
          </div>
      </div>
  );
};

export default Products;
