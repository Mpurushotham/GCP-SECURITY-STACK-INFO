
import React, { useState } from 'react';
import { Lab } from '../types';
import { CheckCircle2, AlertCircle, RefreshCcw, Info, ExternalLink, Terminal, ChevronRight, Search, FileText, ShieldAlert } from 'lucide-react';

interface InteractiveLabProps {
  lab: Lab;
  onComplete: () => void;
}

const InteractiveLab: React.FC<InteractiveLabProps> = ({ lab, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const handleAction = (actionType: string, value: any) => {
    const step = lab.steps[currentStep];
    let isValid = false;

    // Validation Logic
    if (step.expectedAction === 'PRINCIPAL_SELECTED' && value.includes('@')) isValid = true;
    if (step.expectedAction === 'ROLE_SELECTED' && value === 'roles/storage.objectViewer') isValid = true;
    if (step.expectedAction === 'ROLE_SELECTED' && (value === 'roles/owner' || value === 'roles/editor')) {
        setFeedback("Stop! Basic roles (Owner/Editor) violate Least Privilege. Choose a specific service role.");
        return;
    }
    if (step.expectedAction === 'CONDITION_ADDED' && value === true) isValid = true;
    if (step.expectedAction === 'SOURCE_FILTER' && value === 'IP_RANGES') isValid = true;
    if (step.expectedAction === 'IP_ENTERED' && value === '35.235.240.0/20') isValid = true;
    if (step.expectedAction === 'PORT_SET' && value === 'tcp:22') isValid = true;
    
    // DLP Lab
    if (step.expectedAction === 'INFOTYPE_SELECTED' && value === 'CREDIT_CARD_NUMBER') isValid = true;
    if (step.expectedAction === 'TRANSFORM_SELECTED' && value === 'MASK') isValid = true;
    if (step.expectedAction === 'TEST_RUN' && value.length > 5) isValid = true;

    // SCC Lab (Lab 5)
    if (step.expectedAction === 'ENABLE_SHA' && value === true) isValid = true;
    if (step.expectedAction === 'FILTER_FINDINGS' && value === 'HIGH') isValid = true;
    if (step.expectedAction === 'REMEDIATE_FINDING' && value === true) isValid = true;

    // Threat Intel Lab (Lab 6)
    if (step.expectedAction === 'SEARCH_HASH' && value.length > 5) isValid = true;
    if (step.expectedAction === 'IDENTIFY_ACTOR' && value === true) isValid = true;
    if (step.expectedAction === 'GENERATE_YARA' && value === true) isValid = true;

    // BinAuth Lab
    if (step.expectedAction === 'CREATE_ATTESTOR' && value.length > 2) isValid = true;
    if (step.expectedAction === 'SET_DEFAULT_DENY' && value === 'DISALLOW') isValid = true;
    if (step.expectedAction === 'ALLOW_SIGNED' && value === true) isValid = true;

    // AI Lab (Lab 7)
    if (step.expectedAction === 'NAV_ORG_POLICIES' && value === true) isValid = true;
    if (step.expectedAction === 'SEARCH_POLICY' && value.includes('genai')) isValid = true;
    if (step.expectedAction === 'ENFORCE_POLICY' && value === true) isValid = true;

    if (isValid) {
        setFeedback(null);
        if (currentStep < lab.steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setIsSuccess(true);
            onComplete();
        }
    } else {
        if (!feedback) setFeedback("That setting doesn't match the lab requirements. Read the hint.");
    }
    
    // Update State
    setFormData({...formData, [actionType]: value});
  };

  if (isSuccess) {
      return (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-[#202124]">
              <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300 ring-4 ring-green-100 dark:ring-green-900/10">
                  <CheckCircle2 size={48} className="text-gcp-green" />
              </div>
              <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">Lab Completed Successfully</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed text-lg">{lab.successMessage}</p>
              <button 
                onClick={() => { setIsSuccess(false); setCurrentStep(0); setFormData({}) }} 
                className="bg-gcp-blue text-white px-6 py-2.5 rounded shadow-sm font-medium hover:bg-blue-600 flex items-center gap-2 transition-colors"
              >
                  <RefreshCcw size={18} /> Restart Scenario
              </button>
          </div>
      )
  }

  return (
    <div className="flex h-full border-t border-gray-200 dark:border-white/10">
       {/* Sidebar Instructions */}
       <div className="w-[350px] bg-white dark:bg-[#202124] border-r border-gray-200 dark:border-white/10 flex flex-col shrink-0">
          <div className="p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#25262a]">
            <div className="flex items-center gap-2 mb-3 text-gcp-blue text-xs font-bold uppercase tracking-wider">
                <Terminal size={14} /> Interactive Scenario
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-display">{lab.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{lab.description}</p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {lab.steps.map((step, idx) => (
                  <div key={step.id} className={`relative pl-8 transition-all duration-300 ${idx === currentStep ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                      {/* Step Connector */}
                      {idx !== lab.steps.length - 1 && (
                          <div className="absolute left-[11px] top-6 bottom-[-32px] w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                      )}
                      
                      <div className={`absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 shadow-sm z-10 ${idx < currentStep ? 'bg-gcp-green border-gcp-green text-white' : (idx === currentStep ? 'bg-white dark:bg-[#202124] border-gcp-blue text-gcp-blue' : 'bg-white dark:bg-[#202124] border-gray-300 text-gray-500')}`}>
                          {idx < currentStep ? <CheckCircle2 size={14} /> : idx + 1}
                      </div>
                      
                      <h4 className={`text-sm font-bold mb-1 ${idx === currentStep ? 'text-gcp-blue' : 'text-gray-900 dark:text-white'}`}>
                          Step {idx + 1}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">{step.instruction}</p>
                      
                      {idx === currentStep && (
                          <div className="mt-3 flex items-center text-xs text-blue-600 dark:text-blue-400 font-medium animate-pulse">
                              <ChevronRight size={12} /> Pending Action...
                          </div>
                      )}
                  </div>
              ))}
          </div>
          
          {feedback && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border-t border-red-100 dark:border-red-900/30 text-red-800 dark:text-red-200 text-sm flex gap-3 animate-in slide-in-from-bottom-2">
                  <AlertCircle size={18} className="shrink-0" />
                  <p>{feedback}</p>
              </div>
          )}
       </div>

       {/* Console Simulation Area */}
       <div className="flex-1 bg-[#F8F9FA] dark:bg-[#1a1b1e] p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto bg-white dark:bg-[#202124] shadow-md border border-gray-200 dark:border-white/10 rounded min-h-[600px] flex flex-col">
              {/* Fake Console Header */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center gap-4">
                  <div className="text-gcp-blue font-bold text-xl tracking-tight">Google Cloud</div>
                  <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
                  <h2 className="text-lg text-gray-700 dark:text-gray-300">
                      {lab.id === 'lab_1' && 'IAM Admin > Edit Permissions'}
                      {lab.id === 'lab_2' && 'VPC Network > Firewall Rules > Create'}
                      {lab.id === 'lab_3' && 'Data Loss Prevention > Create Inspection Template'}
                      {lab.id === 'lab_4' && 'Security > Binary Authorization'}
                      {lab.id === 'lab_5' && 'Security Command Center > Dashboard'}
                      {lab.id === 'lab_6' && 'Google Threat Intelligence > IOC Search'}
                      {lab.id === 'lab_7' && 'IAM & Admin > Organization Policies'}
                  </h2>
              </div>
              
              {/* Form Content */}
              <div className="p-8 space-y-8 flex-1">
                  
                  {/* IAM Lab */}
                  {lab.id === 'lab_1' && (
                      <div className="animate-in fade-in duration-500">
                        <div className="space-y-2">
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300">New principals</label>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    placeholder="name@example.com"
                                    className="w-full max-w-md border border-gray-300 dark:border-gray-600 rounded-sm h-9 px-3 text-sm focus:border-gcp-blue focus:ring-1 focus:ring-gcp-blue outline-none bg-white dark:bg-[#2d2e31]"
                                    onChange={(e) => handleAction('PRINCIPAL_SELECTED', e.target.value)}
                                />
                            </div>
                            <p className="text-xs text-gray-500">Enter the email address of the user or service account.</p>
                        </div>

                        <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-white/5">
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300">Assign roles</label>
                            <select 
                                className="w-full max-w-md border border-gray-300 dark:border-gray-600 rounded-sm h-9 px-2 text-sm bg-white dark:bg-[#2d2e31] focus:border-gcp-blue outline-none"
                                onChange={(e) => handleAction('ROLE_SELECTED', e.target.value)}
                            >
                                <option>Select a role</option>
                                <option value="roles/owner">Owner (Basic)</option>
                                <option value="roles/editor">Editor (Basic)</option>
                                <option value="roles/storage.objectViewer">Storage Object Viewer</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">Role limits access to specific resources.</p>
                        </div>

                        <div className="pt-2">
                            <button 
                                onClick={() => handleAction('CONDITION_ADDED', true)}
                                className="text-gcp-blue text-sm font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1.5 rounded -ml-3 transition-colors uppercase tracking-wide"
                            >
                                + Add IAM condition
                            </button>
                        </div>
                      </div>
                  )}

                  {/* Firewall Lab */}
                  {lab.id === 'lab_2' && (
                       <div className="animate-in fade-in duration-500 space-y-6">
                        <div className="space-y-2">
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300">Source filter</label>
                            <select 
                                className="w-full max-w-md border border-gray-300 dark:border-gray-600 rounded-sm h-9 px-2 text-sm bg-white dark:bg-[#2d2e31]"
                                onChange={(e) => handleAction('SOURCE_FILTER', e.target.value)}
                            >
                                <option>IPv4 ranges</option>
                                <option value="IP_RANGES">IPv4 ranges</option>
                            </select>
                        </div>

                         <div className="space-y-2">
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300">Source IP ranges</label>
                            <input 
                                type="text" 
                                placeholder="0.0.0.0/0"
                                className="w-full max-w-md border border-gray-300 dark:border-gray-600 rounded-sm h-9 px-3 text-sm focus:border-gcp-blue outline-none bg-white dark:bg-[#2d2e31]"
                                onChange={(e) => handleAction('IP_ENTERED', e.target.value)}
                            />
                             <p className="text-xs text-gray-500">Use CIDR notation.</p>
                        </div>

                        <div className="space-y-2">
                             <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300">Protocols and ports</label>
                             <div className="flex gap-3 items-start p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-white/5">
                                 <input type="checkbox" checked readOnly className="mt-1" />
                                 <div className="flex-1">
                                     <span className="text-sm font-medium">Specified protocols and ports</span>
                                     <input 
                                        type="text" 
                                        placeholder="tcp:80, udp:5000"
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-sm h-9 px-3 text-sm mt-2 focus:border-gcp-blue outline-none bg-white dark:bg-[#2d2e31]"
                                        onChange={(e) => handleAction('PORT_SET', e.target.value)}
                                     />
                                 </div>
                             </div>
                        </div>
                       </div>
                  )}

                  {/* DLP Lab */}
                  {lab.id === 'lab_3' && (
                      <div className="animate-in fade-in duration-500 space-y-6">
                        <div className="space-y-2">
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300">InfoTypes to inspect</label>
                            <div className="border border-gray-300 dark:border-gray-600 p-4 rounded-sm text-sm bg-white dark:bg-[#2d2e31]">
                                <div className="flex items-center gap-3 mb-3">
                                    <input type="checkbox" onChange={() => handleAction('INFOTYPE_SELECTED', 'CREDIT_CARD_NUMBER')} className="w-4 h-4 text-gcp-blue rounded" />
                                    <span>CREDIT_CARD_NUMBER</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input type="checkbox" className="w-4 h-4 text-gcp-blue rounded" />
                                    <span>US_SOCIAL_SECURITY_NUMBER</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300">Transformation</label>
                            <select 
                                className="w-full max-w-md border border-gray-300 dark:border-gray-600 rounded-sm h-9 px-2 text-sm bg-white dark:bg-[#2d2e31]"
                                onChange={(e) => handleAction('TRANSFORM_SELECTED', e.target.value)}
                            >
                                <option>Select transformation</option>
                                <option value="MASK">Mask with character</option>
                                <option value="REDACT">Redact</option>
                            </select>
                        </div>
                        <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-white/5">
                            <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300">Test Input</label>
                            <textarea 
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-sm p-3 text-sm bg-white dark:bg-[#2d2e31] focus:border-gcp-blue outline-none font-mono"
                                rows={4}
                                onChange={(e) => handleAction('TEST_RUN', e.target.value)}
                                placeholder="Enter text containing sensitive data to test..."
                            ></textarea>
                        </div>
                      </div>
                  )}

                  {/* SCC Lab (Lab 5) */}
                  {lab.id === 'lab_5' && (
                      <div className="animate-in fade-in duration-500 space-y-6">
                          {/* Services Config */}
                          <div className="bg-gray-50 dark:bg-white/5 p-4 rounded border border-gray-200 dark:border-white/10">
                              <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-3">Service Settings</h4>
                              <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-600 dark:text-gray-300">Security Health Analytics</span>
                                  <div className="flex items-center gap-2">
                                      <span className="text-xs text-gray-500">Disabled</span>
                                      <button 
                                        onClick={() => handleAction('ENABLE_SHA', true)}
                                        className={`w-10 h-5 rounded-full relative transition-colors ${formData.ENABLE_SHA ? 'bg-gcp-green' : 'bg-gray-300'}`}
                                      >
                                          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.ENABLE_SHA ? 'left-6' : 'left-1'}`}></div>
                                      </button>
                                  </div>
                              </div>
                          </div>

                          {/* Findings Table Simulation */}
                          <div className="border border-gray-200 dark:border-white/10 rounded overflow-hidden">
                              <div className="bg-gray-100 dark:bg-white/5 p-3 flex justify-between items-center border-b border-gray-200 dark:border-white/10">
                                  <span className="font-bold text-sm">Findings</span>
                                  <select 
                                    className="text-xs bg-white dark:bg-black border border-gray-300 dark:border-gray-600 rounded p-1"
                                    onChange={(e) => handleAction('FILTER_FINDINGS', e.target.value)}
                                  >
                                      <option>Filter by Severity</option>
                                      <option value="HIGH">High</option>
                                      <option value="MEDIUM">Medium</option>
                                  </select>
                              </div>
                              <div className="bg-white dark:bg-[#2d2e31] min-h-[150px]">
                                  {formData.FILTER_FINDINGS === 'HIGH' ? (
                                      <div className="p-0">
                                          <div className="flex items-center p-3 border-b border-gray-100 dark:border-white/5 hover:bg-blue-50 dark:hover:bg-white/5 cursor-pointer group">
                                               <div className="w-2 h-full bg-red-500 mr-3 rounded-full"></div>
                                               <div className="flex-1">
                                                   <div className="text-sm font-bold text-red-600">Open Firewall: 0.0.0.0/0</div>
                                                   <div className="text-xs text-gray-500">Compute Engine • instance-1</div>
                                               </div>
                                               <button 
                                                  onClick={() => handleAction('REMEDIATE_FINDING', true)}
                                                  className="opacity-0 group-hover:opacity-100 bg-gcp-blue text-white text-xs px-3 py-1 rounded transition-opacity"
                                               >
                                                   Remediate
                                               </button>
                                          </div>
                                      </div>
                                  ) : (
                                      <div className="p-8 text-center text-gray-400 text-sm italic">
                                          {formData.ENABLE_SHA ? "Select a filter to view specific findings." : "Enable Security Health Analytics to see findings."}
                                      </div>
                                  )}
                              </div>
                          </div>
                      </div>
                  )}

                  {/* Threat Intel Lab (Lab 6) */}
                  {lab.id === 'lab_6' && (
                      <div className="animate-in fade-in duration-500 space-y-8">
                          {/* Search Bar */}
                          <div className="flex gap-2">
                              <div className="flex-1 relative">
                                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                  <input 
                                    type="text" 
                                    placeholder="Search IP, Domain, Hash..." 
                                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#2d2e31] border border-gray-300 dark:border-gray-600 rounded-sm text-sm focus:border-gcp-blue outline-none"
                                    onChange={(e) => handleAction('SEARCH_HASH', e.target.value)}
                                  />
                              </div>
                              <button className="bg-gcp-blue text-white px-4 py-2 rounded-sm text-sm font-bold">SEARCH</button>
                          </div>

                          {/* Result Card */}
                          {formData.SEARCH_HASH && formData.SEARCH_HASH.length > 5 ? (
                             <div className="bg-white dark:bg-[#2d2e31] border border-red-200 dark:border-red-900/30 rounded-lg p-6 shadow-sm relative overflow-hidden group">
                                 <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                                 <div className="flex justify-between items-start mb-4">
                                     <div>
                                         <div className="flex items-center gap-2 mb-1">
                                             <ShieldAlert className="text-red-500" size={20} />
                                             <h3 className="text-lg font-bold text-gray-900 dark:text-white">Malicious Hash</h3>
                                         </div>
                                         <p className="text-xs font-mono text-gray-500">{formData.SEARCH_HASH}</p>
                                     </div>
                                     <span className="bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded font-bold">CRITICAL</span>
                                 </div>

                                 <div className="grid grid-cols-2 gap-4 mb-6">
                                     <div 
                                        onClick={() => handleAction('IDENTIFY_ACTOR', true)}
                                        className="p-3 bg-gray-50 dark:bg-white/5 rounded border border-gray-200 dark:border-white/10 cursor-pointer hover:border-gcp-blue transition-colors"
                                     >
                                         <span className="text-xs text-gray-500 block mb-1">Threat Actor</span>
                                         <span className="font-bold text-gcp-blue">APT-29 (Cozy Bear)</span>
                                     </div>
                                     <div className="p-3 bg-gray-50 dark:bg-white/5 rounded border border-gray-200 dark:border-white/10">
                                         <span className="text-xs text-gray-500 block mb-1">Malware Family</span>
                                         <span className="font-bold text-gray-700 dark:text-gray-200">HAMMERTOSS</span>
                                     </div>
                                 </div>

                                 <div className="flex justify-end">
                                     <button 
                                        onClick={() => handleAction('GENERATE_YARA', true)}
                                        className="text-gcp-blue text-sm font-bold flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1.5 rounded transition-colors"
                                     >
                                         <FileText size={16} /> Generate YARA Rule
                                     </button>
                                 </div>
                             </div>
                          ) : (
                              <div className="h-40 flex items-center justify-center text-gray-400 text-sm italic border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                                  Enter a hash to search global intelligence.
                              </div>
                          )}

                          {/* Rule Preview */}
                          {formData.GENERATE_YARA && (
                              <div className="bg-[#1e293b] p-4 rounded-lg border border-gray-700 font-mono text-xs text-green-400">
                                  <p>rule apt29_backdoor &#123;</p>
                                  <p className="pl-4">meta: description = "Detects APT29 malware"</p>
                                  <p className="pl-4">strings: $s1 = "drunken_bear"</p>
                                  <p className="pl-4">condition: all of them</p>
                                  <p>&#125;</p>
                              </div>
                          )}
                      </div>
                  )}
                  
                  {/* BinAuth Lab */}
                  {lab.id === 'lab_4' && (
                      <div className="animate-in fade-in duration-500 space-y-6">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-gcp-blue text-blue-800 dark:text-blue-300 text-sm mb-4">
                            Binary Authorization ensures only trusted images are deployed. This policy mimics a production-grade restriction.
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[13px] font-bold mb-2 text-gray-800 dark:text-gray-200">Global Policy Evaluation Mode</label>
                                <select 
                                    className="w-full max-w-md border border-gray-300 dark:border-gray-600 rounded-sm h-9 px-2 text-sm bg-white dark:bg-[#2d2e31]"
                                    onChange={(e) => handleAction('SET_DEFAULT_DENY', e.target.value)}
                                >
                                    <option>Allow all images</option>
                                    <option value="DISALLOW">Disallow all images</option>
                                </select>
                            </div>
                            
                            <div className="border-t border-gray-200 dark:border-white/10 pt-6">
                                <label className="block text-[13px] font-bold mb-2 text-gray-800 dark:text-gray-200">Create Attestor Authority</label>
                                <input 
                                    type="text" 
                                    placeholder="Attestor Name (e.g., qa-signer)"
                                    className="w-full max-w-md border border-gray-300 dark:border-gray-600 rounded-sm h-9 px-3 text-sm bg-white dark:bg-[#2d2e31] focus:border-gcp-blue outline-none"
                                    onChange={(e) => handleAction('CREATE_ATTESTOR', e.target.value)}
                                />
                                <p className="text-xs text-gray-500 mt-1">This authority verifies the digital signature.</p>
                            </div>

                             <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded border border-gray-200 dark:border-white/10">
                                <input type="checkbox" onChange={(e) => handleAction('ALLOW_SIGNED', e.target.checked)} className="w-4 h-4 text-gcp-blue rounded" />
                                <span className="text-sm font-medium">Exempt images signed by this attestor</span>
                            </div>
                        </div>
                      </div>
                  )}

                  {/* AI Lab (Lab 7) */}
                  {lab.id === 'lab_7' && (
                      <div className="animate-in fade-in duration-500 space-y-6">
                          {!formData.NAV_ORG_POLICIES ? (
                             <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                                 <button 
                                    onClick={() => handleAction('NAV_ORG_POLICIES', true)}
                                    className="bg-gcp-blue text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-600 transition-colors"
                                 >
                                     Go to Organization Policies
                                 </button>
                             </div>
                          ) : (
                              <div className="space-y-6">
                                  <div className="relative">
                                      <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                      <input 
                                        type="text" 
                                        placeholder="Filter policies..." 
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm text-sm bg-white dark:bg-[#2d2e31]"
                                        onChange={(e) => handleAction('SEARCH_POLICY', e.target.value)}
                                      />
                                  </div>
                                  
                                  {formData.SEARCH_POLICY && formData.SEARCH_POLICY.includes('genai') && (
                                      <div className="border border-gray-200 dark:border-white/10 rounded-sm">
                                          <div className="bg-gray-50 dark:bg-white/5 p-3 font-bold text-sm border-b border-gray-200 dark:border-white/10">
                                              constraints/google.genai.restrictUsage
                                          </div>
                                          <div className="p-4 bg-white dark:bg-[#2d2e31]">
                                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                                  Restrict the set of Generative AI features available to users.
                                              </p>
                                              
                                              <div className="flex items-center gap-4">
                                                  <label className="text-sm font-bold">Policy Enforcement:</label>
                                                  <div className="flex gap-2">
                                                      <button 
                                                        onClick={() => handleAction('ENFORCE_POLICY', true)}
                                                        className={`px-4 py-1.5 rounded text-xs font-bold transition-colors ${formData.ENFORCE_POLICY ? 'bg-gcp-blue text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400'}`}
                                                      >
                                                          Enforce
                                                      </button>
                                                      <button className="px-4 py-1.5 rounded text-xs font-bold bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400">
                                                          Off
                                                      </button>
                                                  </div>
                                              </div>
                                              
                                              {formData.ENFORCE_POLICY && (
                                                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm rounded flex items-center gap-2">
                                                      <CheckCircle2 size={16} /> Policy Enforced successfully.
                                                  </div>
                                              )}
                                          </div>
                                      </div>
                                  )}
                              </div>
                          )}
                      </div>
                  )}

              </div>

              {/* Footer Actions */}
              <div className="px-8 py-4 bg-gray-50 dark:bg-[#25262a] border-t border-gray-200 dark:border-white/10 flex gap-4">
                  <button className="bg-gcp-blue hover:bg-blue-600 text-white px-6 py-1.5 rounded-sm text-sm font-bold shadow-sm transition-colors uppercase tracking-wide">
                      {lab.id === 'lab_1' ? 'Save Policy' : (lab.id === 'lab_6' ? 'Analyze' : 'Create')}
                  </button>
                  <button className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 px-4 py-1.5 rounded-sm text-sm font-medium transition-colors uppercase tracking-wide">
                      Cancel
                  </button>
              </div>
          </div>
       </div>
    </div>
  );
};

export default InteractiveLab;