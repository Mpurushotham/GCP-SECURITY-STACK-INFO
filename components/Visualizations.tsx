import React from 'react';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

// Hierarchy Visualization using Recharts Treemap approach (simplified for tree structure)
const HierarchyData = [
  {
    name: 'Organization',
    children: [
      { name: 'Folder: Finance', size: 100 },
      { name: 'Folder: HR', size: 100 },
      { 
        name: 'Folder: Engineering', 
        children: [
            { name: 'Proj: App-Dev', size: 50 },
            { name: 'Proj: App-Prod', size: 50 }
        ] 
      }
    ]
  }
];

export const HierarchyDiagram = () => {
    return (
        <div className="h-96 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
            <h4 className="absolute top-2 left-2 text-xs text-slate-400">Resource Hierarchy Visualization</h4>
            {/* Custom SVG Tree for better control than Treemap for this specific concept */}
            <svg width="100%" height="100%" viewBox="0 0 400 200">
                {/* Lines */}
                <motion.line x1="200" y1="30" x2="100" y2="100" stroke="#475569" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
                <motion.line x1="200" y1="30" x2="300" y2="100" stroke="#475569" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
                <motion.line x1="300" y1="100" x2="250" y2="170" stroke="#475569" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
                <motion.line x1="300" y1="100" x2="350" y2="170" stroke="#475569" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />

                {/* Nodes */}
                <g>
                    <rect x="160" y="10" width="80" height="40" rx="4" fill="#4285F4" />
                    <text x="200" y="35" textAnchor="middle" fill="white" fontSize="12">Organization</text>
                </g>

                <g>
                    <rect x="60" y="100" width="80" height="40" rx="4" fill="#34A853" />
                    <text x="100" y="125" textAnchor="middle" fill="white" fontSize="12">Folder: HR</text>
                </g>

                <g>
                    <rect x="260" y="100" width="80" height="40" rx="4" fill="#34A853" />
                    <text x="300" y="125" textAnchor="middle" fill="white" fontSize="12">Folder: Eng</text>
                </g>

                <g>
                    <rect x="210" y="170" width="80" height="30" rx="4" fill="#EA4335" />
                    <text x="250" y="190" textAnchor="middle" fill="white" fontSize="10">Proj: Dev</text>
                </g>

                <g>
                    <rect x="310" y="170" width="80" height="30" rx="4" fill="#EA4335" />
                    <text x="350" y="190" textAnchor="middle" fill="white" fontSize="10">Proj: Prod</text>
                </g>
            </svg>
        </div>
    );
};

export const VPCDiagram = () => {
    return (
        <div className="h-96 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 relative shadow-sm">
             <h4 className="absolute top-2 left-2 text-xs text-slate-400">VPC Service Perimeter</h4>
             <svg width="100%" height="100%" viewBox="0 0 400 200">
                {/* Perimeter */}
                <motion.rect 
                    x="50" y="20" width="300" height="160" rx="10" 
                    fill="none" stroke="#F4B400" strokeWidth="4" strokeDasharray="10 5"
                    animate={{ strokeDashoffset: -200 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <text x="200" y="15" textAnchor="middle" fill="#F4B400" fontSize="12">Service Perimeter Boundary</text>

                {/* Resources inside */}
                <circle cx="120" cy="100" r="30" fill="#4285F4" opacity="0.8" />
                <text x="120" y="105" textAnchor="middle" fill="white" fontSize="10">VM</text>
                
                <rect x="220" y="70" width="60" height="60" fill="#EA4335" opacity="0.8" />
                <text x="250" y="105" textAnchor="middle" fill="white" fontSize="10">BigQuery</text>

                {/* External Threat */}
                <motion.g
                     initial={{ x: -40, opacity: 0 }}
                     animate={{ x: 30, opacity: 1 }}
                     transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                    <circle cx="10" cy="100" r="10" fill="#94a3b8" />
                    <text x="10" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">Hacker</text>
                    <line x1="20" y1="100" x2="45" y2="100" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arrow)" />
                </motion.g>
                
                {/* Block Symbol */}
                <circle cx="50" cy="100" r="8" fill="none" stroke="#EF4444" strokeWidth="2" />
                <line x1="44" y1="106" x2="56" y2="94" stroke="#EF4444" strokeWidth="2" />

             </svg>
        </div>
    )
}

export const KMSDiagram = () => {
  return (
    <div className="h-96 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 flex items-center justify-center p-4 shadow-sm">
      <div className="text-center text-slate-500">
         <div className="flex gap-8 items-center justify-center">
             <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-600">
                 <div className="font-bold text-gcp-blue">Cloud KMS</div>
                 <div className="text-xs">Stores KEK</div>
             </div>
             <div className="h-0.5 w-16 bg-slate-300 dark:bg-slate-600 relative">
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-slate-400">Wraps</div>
             </div>
             <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-600">
                 <div className="font-bold text-gcp-green">Data Key</div>
                 <div className="text-xs">DEK (Plaintext)</div>
             </div>
             <div className="h-0.5 w-16 bg-slate-300 dark:bg-slate-600 relative">
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-slate-400">Encrypts</div>
             </div>
             <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-600">
                 <div className="font-bold text-gcp-red">Database</div>
                 <div className="text-xs">Storage</div>
             </div>
         </div>
         <p className="mt-6 text-sm italic">Envelope Encryption Flow</p>
      </div>
    </div>
  )
}

export const SCCDashboard = () => {
    return (
        <div className="h-96 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 shadow-sm">
            <h4 className="text-xs text-slate-400 mb-2">Simulated SCC Finding Distribution</h4>
            <div className="flex h-full gap-2 items-end pb-6">
                <div className="w-1/4 bg-red-500/80 h-[80%] rounded-t flex flex-col justify-end p-2 text-center text-xs text-white">High</div>
                <div className="w-1/4 bg-orange-500/80 h-[50%] rounded-t flex flex-col justify-end p-2 text-center text-xs text-white">Medium</div>
                <div className="w-1/4 bg-yellow-500/80 h-[30%] rounded-t flex flex-col justify-end p-2 text-center text-xs text-white">Low</div>
                <div className="w-1/4 bg-blue-500/80 h-[10%] rounded-t flex flex-col justify-end p-2 text-center text-xs text-white">Info</div>
            </div>
        </div>
    )
}

export const EnterpriseArchDiagram = () => {
    return (
        <div className="h-96 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 relative overflow-hidden shadow-sm flex items-center justify-center select-none">
             <h4 className="absolute top-4 left-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Enterprise Landing Zone</h4>
             <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
                
                {/* Organization Root */}
                <g transform="translate(400, 40)">
                     <rect x="-80" y="-20" width="160" height="40" rx="6" fill="#1e293b" stroke="#4285F4" strokeWidth="2" />
                     <text x="0" y="5" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="sans-serif">Organization</text>
                     <motion.line 
                        x1="0" y1="20" x2="0" y2="60" stroke="#94a3b8" strokeWidth="2" 
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
                     />
                </g>

                {/* Folders */}
                <g transform="translate(200, 100)">
                     <rect x="-60" y="-20" width="120" height="40" rx="4" fill="#334155" stroke="#34A853" strokeWidth="2" />
                     <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12" fontWeight="medium">Security</text>
                </g>
                <g transform="translate(400, 100)">
                     <rect x="-60" y="-20" width="120" height="40" rx="4" fill="#334155" stroke="#F4B400" strokeWidth="2" />
                     <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12" fontWeight="medium">Infrastructure</text>
                </g>
                <g transform="translate(600, 100)">
                     <rect x="-60" y="-20" width="120" height="40" rx="4" fill="#334155" stroke="#EA4335" strokeWidth="2" />
                     <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12" fontWeight="medium">Workloads</text>
                </g>

                {/* Hierarchy Lines */}
                <motion.path d="M 400 60 L 400 80 L 200 80 L 200 100" stroke="#64748b" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
                <motion.path d="M 400 60 L 400 100" stroke="#64748b" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
                <motion.path d="M 400 60 L 400 80 L 600 80 L 600 100" stroke="#64748b" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />

                {/* Infrastructure Details (Shared VPC) */}
                <g transform="translate(400, 200)">
                    <rect x="-90" y="-40" width="180" height="140" rx="8" fill="#1e293b" stroke="#4285F4" strokeWidth="2" strokeDasharray="6 4" />
                    <text x="0" y="-25" textAnchor="middle" fill="#4285F4" fontSize="11" fontWeight="bold">Shared VPC Host</text>
                    
                    {/* Interconnect */}
                    <g transform="translate(0, 10)">
                        <rect x="-70" y="-15" width="140" height="30" rx="4" fill="#0f172a" stroke="#64748b" />
                        <text x="0" y="5" textAnchor="middle" fill="#94a3b8" fontSize="10">Cloud Interconnect</text>
                    </g>
                     {/* Cloud Router */}
                    <g transform="translate(0, 50)">
                        <circle cx="0" cy="0" r="15" fill="#0f172a" stroke="#F4B400" />
                        <text x="0" y="30" textAnchor="middle" fill="#F4B400" fontSize="9">Router</text>
                    </g>
                    
                    <line x1="0" y1="-40" x2="0" y2="-20" stroke="#64748b" strokeWidth="1" />
                </g>

                {/* Workload Details */}
                 <g transform="translate(600, 200)">
                    <rect x="-60" y="-20" width="120" height="40" rx="4" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" />
                    <text x="0" y="5" textAnchor="middle" fill="#e2e8f0" fontSize="11">Service Project A</text>
                    <line x1="0" y1="-20" x2="0" y2="-40" stroke="#64748b" strokeWidth="1" />
                </g>
                 <g transform="translate(600, 260)">
                    <rect x="-60" y="-20" width="120" height="40" rx="4" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" />
                    <text x="0" y="5" textAnchor="middle" fill="#e2e8f0" fontSize="11">Service Project B</text>
                </g>

                {/* Peering Connections */}
                <motion.path 
                    d="M 490 200 C 540 200 550 200 600 200" stroke="#4285F4" strokeWidth="2" fill="none" 
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 1 }}
                />
                <motion.path 
                    d="M 490 200 C 540 200 550 260 600 260" stroke="#4285F4" strokeWidth="2" fill="none" 
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 1 }}
                />

                {/* Traffic Animation */}
                <circle r="3" fill="#fff">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M 490 200 C 540 200 550 200 600 200" />
                </circle>

             </svg>
        </div>
    )
}

// --- New Visualizations for Product Glossary ---

export const IngressFlow = () => (
    <div className="h-80 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 flex items-center justify-center shadow-sm">
        <svg viewBox="0 0 500 150" className="w-full">
            <g transform="translate(50, 75)">
                <circle r="20" fill="#94a3b8" />
                <text y="35" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 text-xs">User</text>
            </g>
            <motion.path d="M 80 75 L 140 75" stroke="#475569" strokeWidth="3" markerEnd="url(#arrow)" />
            
            <g transform="translate(180, 50)">
                <rect width="80" height="50" rx="4" fill="#1e293b" stroke="#4285F4" strokeWidth="2" />
                <text x="40" y="25" textAnchor="middle" className="fill-white text-xs font-bold" dominantBaseline="middle">Cloud Armor</text>
                <text x="40" y="40" textAnchor="middle" className="fill-gcp-blue text-[8px]" dominantBaseline="middle">Filtering</text>
            </g>
            
             <motion.path d="M 270 75 L 330 75" stroke="#475569" strokeWidth="3" markerEnd="url(#arrow)" />

             <g transform="translate(350, 50)">
                <rect width="80" height="50" rx="4" fill="#1e293b" stroke="#34A853" strokeWidth="2" />
                <text x="40" y="25" textAnchor="middle" className="fill-white text-xs font-bold" dominantBaseline="middle">Load Balancer</text>
                <text x="40" y="40" textAnchor="middle" className="fill-gcp-green text-[8px]" dominantBaseline="middle">Backend</text>
            </g>
        </svg>
    </div>
);

export const EncryptionFlow = () => (
    <div className="h-80 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 flex items-center justify-center shadow-sm">
         <svg viewBox="0 0 500 200" className="w-full">
             {/* Key Manager */}
             <g transform="translate(50, 50)">
                 <rect width="100" height="100" rx="8" fill="#1e293b" stroke="#F4B400" strokeWidth="2" />
                 <text x="50" y="30" textAnchor="middle" className="fill-gcp-yellow font-bold text-sm">KMS</text>
                 <path d="M 35 50 L 65 50 M 50 50 L 50 80" stroke="#F4B400" strokeWidth="4" />
             </g>
             
             <motion.path 
                d="M 160 100 L 240 100" 
                stroke="#475569" strokeWidth="2" strokeDasharray="5"
                animate={{ strokeDashoffset: -20 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             />

             {/* Application */}
             <g transform="translate(250, 50)">
                 <rect width="120" height="100" rx="8" fill="#1e293b" stroke="#4285F4" strokeWidth="2" />
                 <text x="60" y="30" textAnchor="middle" className="fill-gcp-blue font-bold text-sm">Application</text>
                 <text x="60" y="60" textAnchor="middle" className="fill-slate-400 text-xs">Request Key</text>
                 <text x="60" y="80" textAnchor="middle" className="fill-slate-400 text-xs">Encrypt Data</text>
             </g>

              {/* Storage */}
              <g transform="translate(420, 70)">
                 <path d="M 0 0 C 0 -10 40 -10 40 0 L 40 60 C 40 70 0 70 0 60 Z" fill="#334155" />
                 <text x="20" y="35" textAnchor="middle" className="fill-slate-300 text-xs">Encrypted DB</text>
             </g>
         </svg>
    </div>
);

export const IdentityFlow = () => (
    <div className="h-80 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 flex items-center justify-center shadow-sm">
        <svg viewBox="0 0 500 150" className="w-full">
            <g transform="translate(20, 50)">
                <circle r="25" cx="25" cy="25" fill="#34A853" />
                <text x="25" y="30" textAnchor="middle" className="fill-white font-bold">Who</text>
                <text x="25" y="90" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 text-xs">Identity</text>
            </g>
             
             <motion.line x1="80" y1="75" x2="140" y2="75" stroke="#64748b" strokeWidth="2" />

             <g transform="translate(150, 50)">
                <rect width="80" height="50" rx="4" fill="#1e293b" stroke="#F4B400" strokeWidth="2" />
                <text x="40" y="30" textAnchor="middle" className="fill-white font-bold text-sm">Role</text>
                <text x="40" y="80" textAnchor="middle" className="fill-slate-400 text-xs">Permissions</text>
            </g>

            <motion.line x1="240" y1="75" x2="300" y2="75" stroke="#64748b" strokeWidth="2" />

            <g transform="translate(310, 50)">
                <rect width="80" height="50" rx="4" fill="#1e293b" stroke="#EA4335" strokeWidth="2" />
                <text x="40" y="30" textAnchor="middle" className="fill-white font-bold text-sm">Where</text>
                <text x="40" y="80" textAnchor="middle" className="fill-slate-400 text-xs">Resource</text>
            </g>
        </svg>
    </div>
);

export const DetectionFlow = () => (
    <div className="h-80 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 flex items-center justify-center shadow-sm">
        <svg viewBox="0 0 500 200" className="w-full">
            <g transform="translate(50, 20)">
                <rect width="60" height="40" fill="#334155" rx="4" />
                <text x="30" y="25" textAnchor="middle" className="fill-white text-xs">Logs</text>
            </g>
            <g transform="translate(50, 80)">
                <rect width="60" height="40" fill="#334155" rx="4" />
                <text x="30" y="25" textAnchor="middle" className="fill-white text-xs">Assets</text>
            </g>
            <g transform="translate(50, 140)">
                <rect width="60" height="40" fill="#334155" rx="4" />
                <text x="30" y="25" textAnchor="middle" className="fill-white text-xs">Network</text>
            </g>

            <path d="M 120 40 L 180 100" stroke="#64748b" strokeWidth="1" />
            <path d="M 120 100 L 180 100" stroke="#64748b" strokeWidth="1" />
            <path d="M 120 160 L 180 100" stroke="#64748b" strokeWidth="1" />

            <g transform="translate(190, 50)">
                <circle cx="50" cy="50" r="50" fill="#1e293b" stroke="#EA4335" strokeWidth="4" />
                 <text x="50" y="45" textAnchor="middle" className="fill-white font-bold text-sm">SCC</text>
                 <text x="50" y="65" textAnchor="middle" className="fill-slate-400 text-xs">Analysis</text>
                 <motion.circle r="4" fill="#EA4335" cx="50" cy="50">
                     <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                 </motion.circle>
            </g>

             <path d="M 300 100 L 360 100" stroke="#EA4335" strokeWidth="2" strokeDasharray="4" />

             <g transform="translate(370, 80)">
                <rect width="100" height="40" rx="4" fill="#EA4335" />
                <text x="50" y="25" textAnchor="middle" className="fill-white font-bold">Alert!</text>
             </g>
        </svg>
    </div>
);

// --- Newly Added Advanced Visuals ---

export const ZeroTrustFlow = () => (
    <div className="h-80 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 flex items-center justify-center shadow-sm">
        <svg viewBox="0 0 600 200" className="w-full">
            {/* User */}
            <g transform="translate(20, 80)">
                <circle r="15" cx="15" cy="15" fill="#94a3b8" />
                <text x="15" y="45" textAnchor="middle" className="fill-slate-500 text-xs">User</text>
            </g>

            {/* Context Check */}
            <g transform="translate(150, 50)">
                <rect width="100" height="80" rx="4" fill="#1e293b" stroke="#4285F4" strokeWidth="2" />
                <text x="50" y="30" textAnchor="middle" className="fill-gcp-blue font-bold text-xs">Access Context</text>
                <text x="50" y="50" textAnchor="middle" className="fill-slate-400 text-[10px]">Device Health</text>
                <text x="50" y="65" textAnchor="middle" className="fill-slate-400 text-[10px]">IP / Geo</text>
            </g>

            {/* IAP Gate */}
            <g transform="translate(350, 50)">
                 <path d="M 0 0 L 40 0 L 40 80 L 0 80 Z" fill="#F4B400" />
                 <text x="20" y="45" textAnchor="middle" className="fill-white font-bold text-xs rotate-90" dominantBaseline="middle">IAP Proxy</text>
            </g>

            {/* Application */}
            <g transform="translate(450, 60)">
                <rect width="80" height="60" rx="4" fill="#34A853" opacity="0.8" />
                <text x="40" y="35" textAnchor="middle" className="fill-white text-xs font-bold">Internal App</text>
            </g>

            {/* Paths */}
            <motion.path 
                d="M 60 95 L 140 95" stroke="#64748b" strokeWidth="2" 
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
            />
             <motion.path 
                d="M 250 95 L 340 95" stroke="#64748b" strokeWidth="2" 
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }}
            />
             <motion.path 
                d="M 400 95 L 440 95" stroke="#34A853" strokeWidth="2" 
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }}
            />
            
            {/* Status Icons */}
            <circle cx="300" cy="95" r="8" fill="#34A853" />
            <path d="M 296 95 L 299 98 L 304 92" stroke="white" strokeWidth="2" fill="none" />
        </svg>
    </div>
);

export const DLPFlow = () => (
    <div className="h-80 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 flex items-center justify-center shadow-sm">
        <svg viewBox="0 0 600 200" className="w-full">
             {/* Input */}
             <g transform="translate(20, 80)">
                <rect width="60" height="40" fill="#ef4444" opacity="0.2" stroke="#ef4444" />
                <text x="30" y="25" textAnchor="middle" className="fill-red-500 text-xs font-mono">CC: 4111...</text>
                <text x="30" y="55" textAnchor="middle" className="fill-slate-500 text-[10px]">Input Data</text>
             </g>

             {/* DLP Engine */}
             <g transform="translate(150, 40)">
                 <rect width="120" height="120" rx="60" fill="#1e293b" stroke="#4285F4" strokeWidth="2" />
                 <text x="60" y="55" textAnchor="middle" className="fill-white font-bold">Cloud DLP</text>
                 <text x="60" y="75" textAnchor="middle" className="fill-slate-400 text-xs">Inspect & Transform</text>
                 <circle cx="60" cy="60" r="50" stroke="#4285F4" strokeWidth="1" strokeDasharray="4">
                    <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="10s" repeatCount="indefinite"/>
                 </circle>
             </g>

             {/* Output */}
             <g transform="translate(350, 80)">
                <rect width="60" height="40" fill="#22c55e" opacity="0.2" stroke="#22c55e" />
                <text x="30" y="25" textAnchor="middle" className="fill-green-600 text-xs font-mono">CC: ****</text>
                <text x="30" y="55" textAnchor="middle" className="fill-slate-500 text-[10px]">Redacted</text>
             </g>

             {/* Flow */}
             <motion.path d="M 90 100 L 140 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
             <motion.path d="M 280 100 L 340 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
        </svg>
    </div>
);

export const SIEMFlow = () => (
    <div className="h-80 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 flex items-center justify-center shadow-sm">
         <svg viewBox="0 0 600 200" className="w-full">
            {/* Logs Sources */}
            <g transform="translate(20, 40)">
                <rect width="20" height="20" fill="#64748b" />
                <rect width="20" height="20" y="30" fill="#64748b" />
                <rect width="20" height="20" y="60" fill="#64748b" />
                <text x="30" y="15" className="fill-slate-500 text-[10px]">EDR</text>
                <text x="30" y="45" className="fill-slate-500 text-[10px]">Network</text>
                <text x="30" y="75" className="fill-slate-500 text-[10px]">Cloud</text>
            </g>

            {/* Ingestion Funnel */}
            <path d="M 100 20 L 100 120 L 150 70 Z" fill="#1e293b" stroke="#475569" />

            {/* Chronicle Core */}
            <g transform="translate(200, 40)">
                <rect width="150" height="100" rx="8" fill="#1e293b" stroke="#34A853" strokeWidth="2" />
                <text x="75" y="30" textAnchor="middle" className="fill-white font-bold text-sm">Chronicle</text>
                <line x1="20" y1="50" x2="130" y2="50" stroke="#34A853" strokeWidth="1" />
                <text x="75" y="70" textAnchor="middle" className="fill-slate-400 text-xs">Normalize (UDM)</text>
                <text x="75" y="85" textAnchor="middle" className="fill-slate-400 text-xs">Rule Engine (YARA-L)</text>
            </g>

            {/* Detection */}
            <g transform="translate(420, 60)">
                 <circle r="30" cx="30" cy="30" fill="#EA4335" opacity="0.2" />
                 <text x="30" y="35" textAnchor="middle" className="fill-red-500 font-bold">Threat!</text>
            </g>

            <motion.path d="M 360 90 L 410 90" stroke="#EA4335" strokeWidth="2" strokeDasharray="4" animate={{ strokeDashoffset: -20 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
         </svg>
    </div>
);

export const SupplyChainFlow = () => (
    <div className="h-80 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 flex items-center justify-center shadow-sm">
        <svg viewBox="0 0 600 200" className="w-full">
            {/* Code */}
            <g transform="translate(20, 80)">
                <rect width="40" height="40" rx="4" fill="#334155" />
                <text x="20" y="25" textAnchor="middle" className="fill-white text-[10px]">Code</text>
            </g>
            <path d="M 70 100 L 100 100" stroke="#64748b" markerEnd="url(#arrow)" />

            {/* CI/CD & Sign */}
            <g transform="translate(110, 60)">
                <rect width="100" height="80" rx="4" fill="#1e293b" stroke="#F4B400" strokeWidth="2" />
                <text x="50" y="30" textAnchor="middle" className="fill-white text-xs font-bold">CI/CD Build</text>
                <text x="50" y="50" textAnchor="middle" className="fill-slate-400 text-[10px]">Test Passed</text>
                <g transform="translate(35, 60)">
                    <path d="M 0 0 L 10 0 L 10 5 L 15 5 L 15 10 L 0 10 Z" fill="#F4B400" />
                    <text x="20" y="8" className="fill-gcp-yellow text-[10px]">Signed</text>
                </g>
            </g>
            <path d="M 220 100 L 250 100" stroke="#64748b" markerEnd="url(#arrow)" />

            {/* BinAuth Policy */}
            <g transform="translate(260, 50)">
                 <rect width="10" height="100" fill="#EA4335" />
                 <text x="5" y="-10" textAnchor="middle" className="fill-red-500 text-[10px] font-bold">BinAuth</text>
            </g>
            
            {/* GKE */}
            <g transform="translate(320, 40)">
                 <path d="M 0 60 L 60 60 L 60 100 L 0 100 Z" fill="#4285F4" opacity="0.2" />
                 <text x="30" y="85" textAnchor="middle" className="fill-gcp-blue font-bold">GKE</text>
            </g>

            {/* Check Animation */}
            <motion.circle cx="265" cy="100" r="15" fill="#1e293b" stroke="#22c55e" strokeWidth="2">
                <animate attributeName="stroke" values="#22c55e;#EA4335;#22c55e" dur="4s" repeatCount="indefinite" />
            </motion.circle>
        </svg>
    </div>
);

export const AISecurityFlow = () => (
    <div className="h-80 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 flex items-center justify-center shadow-sm">
        <svg viewBox="0 0 600 200" className="w-full">
            {/* User Query */}
            <g transform="translate(30, 80)">
                <circle r="20" fill="#4285F4" opacity="0.2" />
                <text x="0" y="5" textAnchor="middle" className="fill-gcp-blue text-xs font-bold">Analyst</text>
            </g>

            {/* Arrow */}
            <motion.path d="M 60 80 L 120 80" stroke="#64748b" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />

            {/* Gemini Brain */}
            <g transform="translate(140, 40)">
                <rect width="160" height="100" rx="10" fill="url(#geminiGradient)" stroke="#fff" strokeWidth="1" />
                <defs>
                    <linearGradient id="geminiGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#1e3a8a" />
                        <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                </defs>
                <text x="80" y="40" textAnchor="middle" className="fill-white font-bold text-lg">Gemini</text>
                <text x="80" y="60" textAnchor="middle" className="fill-blue-200 text-xs">Reasoning Engine</text>
                
                {/* Floating sparkles */}
                <circle cx="20" cy="20" r="3" fill="white" className="animate-pulse" />
                <circle cx="140" cy="80" r="2" fill="white" className="animate-pulse" />
            </g>

            {/* Data Sources */}
            <g transform="translate(200, 160)">
                <rect x="-30" y="0" width="60" height="20" rx="4" fill="#334155" />
                <text x="0" y="14" textAnchor="middle" className="fill-slate-300 text-[10px]">Threat Intel</text>
                <line x1="0" y1="0" x2="0" y2="-20" stroke="#64748b" />
            </g>

            {/* Output Arrow */}
            <motion.path d="M 320 80 L 380 80" stroke="#64748b" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />

            {/* Result */}
            <g transform="translate(400, 60)">
                <rect width="140" height="60" rx="6" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
                <text x="70" y="25" textAnchor="middle" className="fill-white font-bold text-sm">Summary</text>
                <text x="70" y="45" textAnchor="middle" className="fill-slate-400 text-xs">Attack Path Analysis</text>
            </g>
        </svg>
    </div>
);

export const GovernanceFlow = () => (
    <div className="h-80 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 flex items-center justify-center shadow-sm">
        <svg viewBox="0 0 600 200" className="w-full">
            {/* Policy Source */}
            <g transform="translate(50, 20)">
                <rect width="100" height="40" rx="4" fill="#EA4335" />
                <text x="50" y="25" textAnchor="middle" className="fill-white font-bold text-xs">Org Policy</text>
            </g>

            <motion.path d="M 100 60 L 100 100" stroke="#64748b" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />

            {/* Folder Level */}
            <g transform="translate(50, 100)">
                 <rect width="100" height="40" rx="4" fill="#F4B400" />
                 <text x="50" y="25" textAnchor="middle" className="fill-white font-bold text-xs">Folder</text>
                 <text x="120" y="25" className="fill-gcp-green text-xs font-mono">Inherit</text>
            </g>
            
            <motion.path d="M 100 140 L 100 180" stroke="#64748b" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />

            {/* Project Level */}
            <g transform="translate(20, 180)">
                <rect width="160" height="20" rx="4" fill="#4285F4" opacity="0.2" />
                <text x="80" y="14" textAnchor="middle" className="fill-gcp-blue text-[10px]">Project Resources</text>
            </g>

            {/* Constraint Visualization */}
            <g transform="translate(250, 80)">
                <rect width="200" height="80" rx="8" fill="#1e293b" stroke="#EA4335" strokeWidth="2" strokeDasharray="4 4" />
                <text x="100" y="30" textAnchor="middle" className="fill-white font-bold text-sm">Constraint</text>
                <text x="100" y="50" textAnchor="middle" className="fill-red-400 text-xs">constraints/compute.vmExternalIpAccess</text>
            </g>

            <path d="M 160 40 L 250 80" stroke="#EA4335" strokeWidth="1" strokeDasharray="2" />
        </svg>
    </div>
);

export const RansomwareFlow = () => (
    <div className="h-80 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 flex items-center justify-center shadow-sm">
        <svg viewBox="0 0 600 200" className="w-full">
            {/* Steps: Identify, Protect, Respond, Recover */}
            <g transform="translate(50, 80)">
                <circle r="40" fill="#1e293b" stroke="#4285F4" strokeWidth="2" />
                <text x="0" y="5" textAnchor="middle" className="fill-white font-bold text-xs">Identify</text>
            </g>
            <path d="M 90 80 L 130 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <g transform="translate(170, 80)">
                <circle r="40" fill="#1e293b" stroke="#34A853" strokeWidth="2" />
                <text x="0" y="5" textAnchor="middle" className="fill-white font-bold text-xs">Protect</text>
            </g>
            <path d="M 210 80 L 250 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <g transform="translate(290, 80)">
                <circle r="40" fill="#1e293b" stroke="#EA4335" strokeWidth="2" />
                <text x="0" y="5" textAnchor="middle" className="fill-white font-bold text-xs">Respond</text>
            </g>
            <path d="M 330 80 L 370 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

             <g transform="translate(410, 80)">
                <circle r="40" fill="#1e293b" stroke="#F4B400" strokeWidth="2" />
                <text x="0" y="5" textAnchor="middle" className="fill-white font-bold text-xs">Recover</text>
            </g>

            {/* Labels under bubbles */}
            <text x="50" y="140" textAnchor="middle" className="fill-slate-500 text-[10px]">Asset Inventory</text>
            <text x="170" y="140" textAnchor="middle" className="fill-slate-500 text-[10px]">Zero Trust</text>
            <text x="290" y="140" textAnchor="middle" className="fill-slate-500 text-[10px]">Mandiant</text>
            <text x="410" y="140" textAnchor="middle" className="fill-slate-500 text-[10px]">Backup & DR</text>
        </svg>
    </div>
);

export const OTSecurityFlow = () => (
    <div className="h-80 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 flex items-center justify-center shadow-sm">
        <svg viewBox="0 0 600 200" className="w-full">
            {/* Purdue Model Layers */}
            <g transform="translate(100, 20)">
                <rect width="400" height="30" fill="#4285F4" opacity="0.2" rx="4" />
                <text x="200" y="20" textAnchor="middle" className="fill-gcp-blue font-bold text-xs">Enterprise (IT)</text>
            </g>
            
            <g transform="translate(100, 60)">
                <rect width="400" height="30" fill="#F4B400" opacity="0.2" rx="4" />
                <text x="200" y="20" textAnchor="middle" className="fill-gcp-yellow font-bold text-xs">DMZ / IDMZ</text>
            </g>

            <g transform="translate(100, 100)">
                <rect width="400" height="30" fill="#34A853" opacity="0.2" rx="4" />
                <text x="200" y="20" textAnchor="middle" className="fill-gcp-green font-bold text-xs">Control Level (OT)</text>
            </g>

             <g transform="translate(100, 140)">
                <rect width="400" height="30" fill="#EA4335" opacity="0.2" rx="4" />
                <text x="200" y="20" textAnchor="middle" className="fill-gcp-red font-bold text-xs">Field Devices (IIoT)</text>
            </g>

            {/* Mandiant Overlay */}
            <g transform="translate(20, 40)">
                <rect width="60" height="120" rx="8" fill="#1e293b" stroke="#94a3b8" />
                <text x="30" y="60" textAnchor="middle" className="fill-white text-[10px] writing-mode-vertical" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Mandiant Assessment</text>
            </g>

             <path d="M 80 100 L 100 100" stroke="#94a3b8" strokeDasharray="4" />

        </svg>
    </div>
);

export const CybershieldFlow = () => (
    <div className="h-80 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 flex items-center justify-center shadow-sm">
        <svg viewBox="0 0 600 200" className="w-full">
            {/* Nation */}
            <g transform="translate(300, 100)">
                <circle r="60" fill="none" stroke="#4285F4" strokeWidth="2" strokeDasharray="4 4" />
                <text x="0" y="0" textAnchor="middle" className="fill-gcp-blue font-bold">National Cyber Defense</text>
            </g>

            {/* Nodes */}
            <g transform="translate(150, 100)">
                <circle r="20" fill="#1e293b" stroke="#34A853" strokeWidth="2" />
                <text x="0" y="5" textAnchor="middle" className="fill-white text-[10px]">Gov</text>
                <path d="M 20 0 L 90 0" stroke="#34A853" strokeWidth="2" />
            </g>

             <g transform="translate(450, 100)">
                <circle r="20" fill="#1e293b" stroke="#EA4335" strokeWidth="2" />
                <text x="0" y="5" textAnchor="middle" className="fill-white text-[10px]">Critical Infra</text>
                 <path d="M -20 0 L -90 0" stroke="#EA4335" strokeWidth="2" />
            </g>

             <g transform="translate(300, 30)">
                <rect x="-40" y="-15" width="80" height="30" rx="4" fill="#F4B400" />
                <text x="0" y="5" textAnchor="middle" className="fill-black text-[10px] font-bold">Intel Sharing</text>
                <path d="M 0 15 L 0 40" stroke="#F4B400" strokeWidth="2" />
            </g>

            {/* Shield */}
            <path d="M 300 80 L 320 100 L 300 130 L 280 100 Z" fill="#4285F4" opacity="0.5" />
        </svg>
    </div>
);

export const SovereigntyFlow = () => (
     <div className="h-80 w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 flex items-center justify-center shadow-sm">
        <svg viewBox="0 0 600 200" className="w-full">
            {/* Cloud Region */}
            <g transform="translate(300, 100)">
                <rect x="-100" y="-60" width="200" height="120" rx="8" fill="none" stroke="#4285F4" strokeWidth="2" />
                <text x="0" y="-70" textAnchor="middle" className="fill-gcp-blue font-bold text-xs">Google Cloud Region (Sovereign)</text>
                
                {/* Data */}
                <rect x="-30" y="-20" width="60" height="40" fill="#1e293b" stroke="#fff" />
                <text x="0" y="5" textAnchor="middle" className="fill-white text-xs">Encrypted Data</text>
            </g>

            {/* External Key Manager */}
            <g transform="translate(100, 100)">
                <rect x="-40" y="-30" width="80" height="60" rx="4" fill="#F4B400" />
                <text x="0" y="0" textAnchor="middle" className="fill-black font-bold text-xs">EKM</text>
                <text x="0" y="15" textAnchor="middle" className="fill-black text-[8px]">Partner / On-Prem</text>
            </g>

             <motion.path 
                d="M 140 100 L 200 100" 
                stroke="#F4B400" strokeWidth="4" 
                strokeDasharray="4"
             />

             {/* Lock */}
             <circle cx="200" cy="100" r="10" fill="#1e293b" stroke="#F4B400" strokeWidth="2" />
             <path d="M 196 100 L 204 100 M 200 96 L 200 104" stroke="#F4B400" strokeWidth="2" />

             {/* Operator Access */}
             <g transform="translate(500, 100)">
                 <circle r="20" fill="#EA4335" opacity="0.2" />
                 <text x="0" y="35" textAnchor="middle" className="fill-red-500 text-xs">Google SRE</text>
                 <path d="M -20 0 L -100 0" stroke="#EA4335" strokeWidth="2" />
                 
                 {/* Blocked */}
                 <line x1="-60" y1="-10" x2="-60" y2="10" stroke="#EA4335" strokeWidth="4" />
             </g>
        </svg>
    </div>
);