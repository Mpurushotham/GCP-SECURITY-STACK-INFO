import React, { useState } from 'react';
import { SecurityProduct } from '../types';
import { Check, X, ArrowRight, RotateCcw } from 'lucide-react';

interface ProductSimulatorProps {
  product: SecurityProduct;
}

const ProductSimulator: React.FC<ProductSimulatorProps> = ({ product }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [completed, setCompleted] = useState(false);

  const currentStep = product.simulator.steps[stepIndex];

  const handleSelect = (option: { label: string; isCorrect: boolean; feedback: string }) => {
    setFeedback({ isCorrect: option.isCorrect, text: option.feedback });
  };

  const handleNext = () => {
    setFeedback(null);
    if (stepIndex < product.simulator.steps.length - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setStepIndex(0);
    setFeedback(null);
    setCompleted(false);
  };

  if (completed) {
      return (
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-16 h-16 bg-gcp-green/20 rounded-full flex items-center justify-center mb-4">
                  <Check className="text-gcp-green" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Simulation Complete!</h3>
              <p className="text-slate-400 mb-6">You have successfully configured {product.name} according to best practices.</p>
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                  <RotateCcw size={16} /> Restart Simulation
              </button>
          </div>
      )
  }

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900/50 p-4 border-b border-slate-700 flex justify-between items-center">
        <h3 className="font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gcp-blue text-xs flex items-center justify-center text-white">{stepIndex + 1}</span>
            {product.simulator.title}
        </h3>
        <span className="text-xs text-slate-500">Step {stepIndex + 1} of {product.simulator.steps.length}</span>
      </div>

      {/* Body */}
      <div className="p-6">
        <h4 className="text-lg text-slate-200 mb-6 font-medium">{currentStep.question}</h4>
        
        <div className="space-y-3">
            {currentStep.options.map((opt, idx) => (
                <button
                    key={idx}
                    onClick={() => handleSelect(opt)}
                    disabled={!!feedback}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                        feedback 
                        ? (opt.isCorrect ? 'bg-gcp-green/10 border-gcp-green/50' : 'bg-slate-900 border-slate-700 opacity-50')
                        : 'bg-slate-900 border-slate-700 hover:bg-slate-700 hover:border-slate-500'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-300">{opt.label}</span>
                        {feedback && opt.isCorrect && <Check size={16} className="text-gcp-green" />}
                        {feedback && !opt.isCorrect && feedback.text === opt.feedback && <X size={16} className="text-gcp-red" />}
                    </div>
                </button>
            ))}
        </div>

        {/* Feedback Area */}
        {feedback && (
            <div className={`mt-6 p-4 rounded-lg border ${feedback.isCorrect ? 'bg-gcp-green/10 border-gcp-green/30' : 'bg-gcp-red/10 border-gcp-red/30'}`}>
                <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${feedback.isCorrect ? 'text-gcp-green' : 'text-gcp-red'}`}>
                        {feedback.isCorrect ? <Check size={18} /> : <X size={18} />}
                    </div>
                    <div>
                        <p className={`font-bold text-sm ${feedback.isCorrect ? 'text-gcp-green' : 'text-gcp-red'}`}>
                            {feedback.isCorrect ? 'Correct' : 'Incorrect'}
                        </p>
                        <p className="text-sm text-slate-300 mt-1">{feedback.text}</p>
                    </div>
                </div>
                {feedback.isCorrect && (
                    <div className="mt-4 flex justify-end">
                        <button 
                            onClick={handleNext}
                            className="bg-gcp-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
                        >
                            Next Step <ArrowRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default ProductSimulator;