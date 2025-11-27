import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import { CURRICULUM, APP_NAME } from './constants';
import ModuleCard from './components/ModuleCard';
import { ModuleDetail } from './components/ModuleDetail';
import Layout from './components/Layout';
import Home from './components/Home';
import Products from './components/Products';
import Solutions from './components/Solutions';
import Compliance from './components/Compliance';
import Certificate from './components/Certificate';
import { UserProgress } from './types';
import { Lock } from 'lucide-react';

function App() {
  const [progress, setProgress] = useState<UserProgress>({
    completedModuleIds: [],
    currentModuleId: null,
    securityScore: 0,
    certificateGenerated: false
  });

  const handleModuleComplete = (id: string) => {
      if (!progress.completedModuleIds.includes(id)) {
          setProgress(prev => ({
              ...prev,
              completedModuleIds: [...prev.completedModuleIds, id],
              securityScore: prev.securityScore + 100,
              certificateGenerated: [...prev.completedModuleIds, id].length === CURRICULUM.length
          }));
      }
  };

  return (
    <HashRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="learn" element={
                    <LearningPath progress={progress} />
                } />
                <Route path="learn/:moduleId" element={
                    <ModuleWrapper progress={progress} onComplete={handleModuleComplete} />
                } />
                <Route path="products" element={<Products />} />
                <Route path="solutions" element={<Solutions />} />
                <Route path="compliance" element={<Compliance />} />
                <Route path="certificate" element={
                    progress.certificateGenerated 
                    ? <Certificate userName="Security Engineer" />
                    : <LockedCertificate />
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    </HashRouter>
  );
}

// Sub-components for Routing Logic

const LearningPath = ({ progress }: { progress: UserProgress }) => {
    const navigate = useNavigate();
    
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-white mb-4">Your Learning Path</h2>
            <p className="text-slate-400 mb-12 max-w-2xl">
                Follow the structured modules to build your expertise. Complete all modules to unlock your certification.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {CURRICULUM.map(module => (
                    <ModuleCard 
                        key={module.id} 
                        module={module} 
                        onClick={(id) => navigate(`/learn/${id}`)}
                        isCompleted={progress.completedModuleIds.includes(module.id)}
                    />
                ))}
            </div>
            
            <div className="mt-12 p-6 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white">Current XP: {progress.securityScore}</h3>
                    <p className="text-slate-500 text-sm">Modules Completed: {progress.completedModuleIds.length} / {CURRICULUM.length}</p>
                </div>
                <div className="w-1/3 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-gcp-blue to-gcp-green transition-all duration-500" 
                        style={{ width: `${(progress.completedModuleIds.length / CURRICULUM.length) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    )
}

const ModuleWrapper = ({ progress, onComplete }: { progress: UserProgress, onComplete: (id: string) => void }) => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const module = CURRICULUM.find(m => m.id === moduleId);

    if (!module) return <Navigate to="/learn" />;

    return (
        <ModuleDetail 
            module={module}
            onBack={() => navigate('/learn')}
            onComplete={() => {
                onComplete(module.id);
                navigate('/learn');
            }}
        />
    )
}

const LockedCertificate = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-6">
            <Lock size={40} className="text-slate-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Certificate Locked</h2>
        <p className="text-slate-400 max-w-md">
            You must complete all modules in the Learning Path to unlock your Certificate of Mastery.
        </p>
    </div>
)

export default App;