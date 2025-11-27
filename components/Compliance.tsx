import React from 'react';
import { COMPLIANCE_ITEMS } from '../constants';
import { Lock, Eye, CheckCircle, Map, ExternalLink, Shield } from 'lucide-react';

const iconMap: Record<string, React.FC<any>> = {
  Lock, Eye, CheckCircle, Map
};

const Compliance = () => {
  return (
    <div className="max-w-7xl mx-auto p-8">
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-gcp-blue text-sm font-medium mb-4">
                <Shield size={16} /> Trust & Compliance Center
            </div>
            <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">Trusted Cloud</h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                Google Cloud is designed to support your security, privacy, and compliance requirements.
                You own your data, and we provide the controls to prove it.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {COMPLIANCE_ITEMS.map((item) => {
                const Icon = iconMap[item.iconName] || CheckCircle;
                return (
                    <div key={item.id} className="bg-white dark:bg-[#2D2E31] rounded-xl p-8 border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-100 to-transparent dark:from-white/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none group-hover:scale-110 transition-transform"></div>
                        
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-gcp-blue">
                                <Icon size={28} />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{item.category}</span>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                            </div>
                        </div>
                        
                        <p className="text-slate-600 dark:text-slate-300 mb-6 min-h-[3rem] relative z-10">{item.description}</p>
                        
                        <ul className="space-y-3 relative z-10">
                            {item.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                                    <CheckCircle size={16} className="text-gcp-green shrink-0 mt-0.5" />
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            })}
        </div>

        <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-32 bg-gcp-blue opacity-10 blur-[80px] rounded-full"></div>
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                 <div>
                     <h2 className="text-2xl font-bold mb-3">Compliance Resource Center</h2>
                     <p className="text-blue-200 max-w-xl">
                         Access audit reports, certificates, and whitepapers for SOC, ISO, PCI, and FedRAMP directly via the Compliance Reports Manager.
                     </p>
                 </div>
                 <a 
                    href="https://cloud.google.com/security/compliance/offerings" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-lg"
                 >
                     View Compliance Offerings <ExternalLink size={18} />
                 </a>
             </div>
        </div>
    </div>
  );
};

export default Compliance;