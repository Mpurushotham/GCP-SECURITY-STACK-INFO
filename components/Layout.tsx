
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Search, Settings, ChevronDown, User, Grid, LayoutDashboard, Database, Briefcase, FileCheck, BookOpen, Shield, Lock, Eye, Zap, Share2, Map, Cpu, Globe } from 'lucide-react';
import { AUTHOR_NAME, CURRICULUM } from '../constants';
import GeminiTutor from './GeminiTutor';
import Footer from './Footer';

const iconMap: Record<string, React.FC<any>> = {
  'BookOpen': BookOpen,
  'Shield': Shield,
  'Network': Share2, // Map 'Network' to Share2 icon
  'Lock': Lock,
  'Eye': Eye,
  'Zap': Zap,
  'Cpu': Cpu,
  'Share2': Share2,
  'Map': Map,
  'Globe': Globe
};

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Default to dark mode for the new design preference
    if (localStorage.getItem('theme') === 'light') {
        setIsDarkMode(false);
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    } else {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className={`flex h-screen flex-col transition-colors duration-200 font-sans overflow-hidden ${isDarkMode ? 'gradient-bg text-white' : 'bg-[#F8F9FA] text-[#202124]'}`}>
      
      {/* Rainbow Top Border */}
      <div className="rainbow-border-top h-1 w-full bg-white dark:bg-[#202124] shrink-0 z-[60]"></div>

      {/* Header */}
      <header className={`h-16 flex items-center px-4 justify-between shrink-0 shadow-sm z-50 border-b relative backdrop-blur-md ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-[#5f6368]'}`}>
          <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!isSidebarOpen)} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                  <Menu size={24} />
              </button>
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.hash = '/'}>
                  <div className="flex gap-1 mr-2">
                      <span className="text-xl font-display font-bold text-gcp-blue">G</span>
                      <span className="text-xl font-display font-bold text-gcp-red">C</span>
                      <span className="text-xl font-display font-bold text-gcp-yellow">P</span>
                      <span className="text-xl font-display font-bold text-gcp-green">.</span>
                  </div>
                  <span className={`font-display font-medium text-lg tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Security Mastery</span>
              </div>
              
              <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer ml-4 transition-colors border border-transparent ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  <span className="text-sm font-medium">zero-to-hero-prod</span>
                  <ChevronDown size={14} />
              </div>
          </div>

          <div className="flex-1 max-w-2xl px-8 hidden lg:block">
              <div className={`transition-all rounded-lg flex items-center px-4 py-2.5 cursor-text group border border-transparent ${isDarkMode ? 'bg-black/20 focus-within:bg-black/40 focus-within:border-gray-500' : 'bg-gray-100 focus-within:bg-white focus-within:shadow-md focus-within:border-gray-200'}`}>
                  <Search size={18} className={`mr-3 ${isDarkMode ? 'text-gray-400 group-focus-within:text-white' : 'text-gray-500 group-focus-within:text-gcp-blue'}`} />
                  <input 
                    type="text" 
                    placeholder="Search for resources, docs, products, and more" 
                    className={`bg-transparent border-none outline-none w-full text-sm ${isDarkMode ? 'placeholder-gray-400 text-white' : 'placeholder-gray-500 text-black'}`}
                  />
                  <div className="ml-auto flex items-center gap-1 opacity-60">
                     <span className={`text-xs px-1.5 py-0.5 rounded ${isDarkMode ? 'bg-white/10 text-gray-300' : 'bg-gray-200 text-gray-500'}`}>/</span>
                  </div>
              </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
               <button 
                onClick={() => setIsTutorOpen(true)} 
                className={`p-2 rounded-full relative group ${isDarkMode ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`} 
                title="AI Tutor"
              >
                  <Grid size={22} className="group-hover:text-gcp-blue transition-colors" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-gcp-green border-2 border-transparent rounded-full"></span>
              </button>

              <button 
                onClick={toggleTheme} 
                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`} 
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                   {isDarkMode ? <span className="text-gcp-yellow"><Settings size={22} /></span> : <Settings size={22} />}
              </button>

              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gcp-blue to-purple-600 ml-2 flex items-center justify-center text-sm font-bold text-white shadow-md cursor-pointer border-2 border-white/20 hover:scale-105 transition-transform">
                  PM
              </div>
          </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Sidebar */}
        <aside 
            className={`${isSidebarOpen ? 'w-[280px]' : 'w-0'} flex flex-col transition-all duration-300 overflow-hidden shrink-0 z-30 border-r backdrop-blur-md ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}
        >
            <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
                <div className={`px-6 py-2 text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-blue-300' : 'text-gray-500'}`}>
                    Security Stack
                </div>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => `relative flex items-center gap-4 px-6 py-2.5 text-[14px] font-medium transition-colors mb-1 ${
                        isActive 
                        ? (isDarkMode ? 'bg-blue-600/30 text-blue-300 border-r-2 border-blue-400' : 'bg-blue-50 text-gcp-blue border-r-2 border-gcp-blue')
                        : (isDarkMode ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-100')
                    }`}
                >
                    <LayoutDashboard size={20} />
                    Unified Dashboard
                </NavLink>
                <NavLink 
                    to="/products" 
                    className={({ isActive }) => `relative flex items-center gap-4 px-6 py-2.5 text-[14px] font-medium transition-colors mb-6 ${
                         isActive 
                        ? (isDarkMode ? 'bg-blue-600/30 text-blue-300 border-r-2 border-blue-400' : 'bg-blue-50 text-gcp-blue border-r-2 border-gcp-blue')
                        : (isDarkMode ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-100')
                    }`}
                >
                    <Database size={20} />
                    Service Catalog
                </NavLink>

                 <div className={`px-6 py-2 text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-blue-300' : 'text-gray-500'}`}>
                    Solutions & Trust
                </div>
                <NavLink 
                    to="/solutions" 
                    className={({ isActive }) => `relative flex items-center gap-4 px-6 py-2.5 text-[14px] font-medium transition-colors mb-1 ${
                         isActive 
                        ? (isDarkMode ? 'bg-blue-600/30 text-blue-300 border-r-2 border-blue-400' : 'bg-blue-50 text-gcp-blue border-r-2 border-gcp-blue')
                        : (isDarkMode ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-100')
                    }`}
                >
                    <Briefcase size={20} />
                    Security Solutions
                </NavLink>
                 <NavLink 
                    to="/compliance" 
                    className={({ isActive }) => `relative flex items-center gap-4 px-6 py-2.5 text-[14px] font-medium transition-colors mb-6 ${
                         isActive 
                        ? (isDarkMode ? 'bg-blue-600/30 text-blue-300 border-r-2 border-blue-400' : 'bg-blue-50 text-gcp-blue border-r-2 border-gcp-blue')
                        : (isDarkMode ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-100')
                    }`}
                >
                    <FileCheck size={20} />
                    Compliance Center
                </NavLink>

                <div className={`px-6 py-2 text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-blue-300' : 'text-gray-500'}`}>
                    Learning Modules
                </div>
                {CURRICULUM.map((module) => {
                    const Icon = iconMap[module.iconName] || BookOpen;
                    return (
                        <NavLink 
                            key={module.id} 
                            to={`/learn/${module.id}`}
                            className={({ isActive }) => `relative flex items-center gap-4 px-6 py-2.5 text-[14px] font-medium transition-colors ${
                                isActive 
                                ? (isDarkMode ? 'bg-blue-600/30 text-blue-300 border-r-2 border-blue-400' : 'bg-blue-50 text-gcp-blue border-r-2 border-gcp-blue')
                                : (isDarkMode ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-100')
                            }`}
                        >
                            <Icon size={20} />
                            <span className="truncate">{module.title.replace(/^\d+\.\s*/, '')}</span>
                        </NavLink>
                    )
                })}
            </div>
            
            <div className={`p-6 border-t ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                   <div className={`w-8 h-8 rounded flex items-center justify-center ${isDarkMode ? 'bg-white/10 text-gray-300' : 'bg-gray-200 text-gray-500'}`}>
                      <User size={16} />
                   </div>
                   <div>
                       <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{AUTHOR_NAME}</p>
                       <p className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Security Architect</p>
                   </div>
                </div>
            </div>
        </aside>

        {/* Content Scroll Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col scroll-smooth">
            <div className="flex-1">
               <Outlet />
            </div>
            <Footer />
        </main>

        {/* Tutor Overlay */}
        {isTutorOpen && (
             <div className={`absolute right-0 top-0 bottom-0 w-[400px] shadow-2xl z-50 border-l flex flex-col animate-in slide-in-from-right duration-200 backdrop-blur-xl ${isDarkMode ? 'bg-[#0f172a]/95 border-white/10' : 'bg-white border-gray-200'}`}>
                 <div className={`p-4 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
                     <div className="flex items-center gap-2">
                         <div className="p-1.5 bg-gcp-blue/10 rounded text-gcp-blue">
                            <Grid size={18} />
                         </div>
                         <span className={`font-medium font-display ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Gemini Assistant</span>
                     </div>
                     <button onClick={() => setIsTutorOpen(false)} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}><X size={18} /></button>
                 </div>
                 <div className="flex-1 overflow-hidden">
                     <GeminiTutor context={`User is navigating ${location.pathname}.`} />
                 </div>
             </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
