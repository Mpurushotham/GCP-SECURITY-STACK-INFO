import React, { useState, useEffect, useRef } from 'react';
import { generateTutorResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface GeminiTutorProps {
  context: string;
}

const GeminiTutor: React.FC<GeminiTutorProps> = ({ context }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm your GCP Security Tutor. I can explain concepts, debug policies, or simulate scenarios. How can I help?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await generateTutorResponse(input, context);
    
    const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'model' ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
              {msg.role === 'model' ? <Bot size={16} className="text-white" /> : <User size={16} className="text-slate-600 dark:text-white" />}
            </div>
            <div className={`p-3 rounded-2xl text-sm max-w-[85%] ${msg.role === 'model' ? 'bg-gray-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none' : 'bg-blue-600 text-white rounded-tr-none'}`}>
              {msg.text.split('\n').map((line, i) => (
                  <p key={i} className="mb-1 last:mb-0">{line}</p>
              ))}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
               <Bot size={16} className="text-white" />
             </div>
             <div className="bg-gray-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none flex items-center">
                <Loader2 className="animate-spin text-slate-400" size={16} />
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your security question..."
            className="flex-1 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl disabled:opacity-50 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiTutor;