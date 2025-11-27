import React, { useRef } from 'react';
import { APP_NAME, AUTHOR_NAME } from '../constants';
import { Award, Printer } from 'lucide-react';

interface CertificateProps {
  userName: string;
}

const Certificate: React.FC<CertificateProps> = ({ userName }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-12 px-4">
      <div className="mb-8 print:hidden">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gcp-blue hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg"
          >
              <Printer size={20} /> Print Certificate
          </button>
      </div>

      <div 
        ref={certificateRef}
        className="w-full max-w-4xl aspect-[1.4/1] bg-white text-slate-900 p-12 relative border-[16px] border-double border-slate-900 shadow-2xl print:shadow-none print:w-[100%] print:h-[100%] print:absolute print:top-0 print:left-0 print:m-0"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none flex items-center justify-center">
            <Award size={400} />
        </div>

        <div className="h-full border-4 border-gcp-blue p-8 flex flex-col items-center justify-between text-center">
            
            <div className="mt-8">
                <div className="text-gcp-blue font-black text-4xl uppercase tracking-[0.2em] mb-4">Certificate of Mastery</div>
                <div className="w-32 h-1 bg-gcp-red mx-auto"></div>
            </div>

            <div className="space-y-6">
                <p className="text-xl text-slate-500 font-serif italic">This certifies that</p>
                <h2 className="text-5xl font-bold text-slate-900 font-serif border-b-2 border-slate-300 pb-2 px-12 inline-block">
                    {userName || "Security Engineer"}
                </h2>
                <p className="text-xl text-slate-500 font-serif italic">has successfully completed the comprehensive training curriculum for</p>
                <h3 className="text-3xl font-bold text-gcp-blue">{APP_NAME}</h3>
            </div>

            <div className="w-full flex justify-between items-end mt-12 px-12">
                <div className="text-center">
                    <div className="text-sm text-slate-500 mb-1">{new Date().toLocaleDateString()}</div>
                    <div className="w-40 h-px bg-slate-900"></div>
                    <div className="text-xs font-bold uppercase mt-2 text-slate-400">Date</div>
                </div>

                <div className="w-24 h-24 rounded-full border-4 border-gcp-yellow flex items-center justify-center">
                    <Award size={48} className="text-gcp-yellow" />
                </div>

                <div className="text-center">
                    <div className="text-lg font-signature text-slate-900 mb-1 font-serif italic">{AUTHOR_NAME}</div>
                    <div className="w-40 h-px bg-slate-900"></div>
                    <div className="text-xs font-bold uppercase mt-2 text-slate-400">Author & Instructor</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;