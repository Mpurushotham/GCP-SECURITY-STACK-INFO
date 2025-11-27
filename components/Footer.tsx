
import React from 'react';
import { Heart } from 'lucide-react';
import { AUTHOR_NAME, AUTHOR_GITHUB, AUTHOR_LINKEDIN } from '../constants';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#202124] border-t border-gray-200 dark:border-white/10 mt-auto shrink-0 z-10 py-4 px-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-4">
             <span className="font-bold text-gray-700 dark:text-gray-300">GCP Security Mastery</span>
             <span className="hidden md:inline text-gray-300 dark:text-gray-600">|</span>
             <span>&copy; {new Date().getFullYear()} {AUTHOR_NAME}</span>
        </div>
        <div className="flex items-center gap-6 mt-2 md:mt-0">
            <a href={AUTHOR_LINKEDIN} target="_blank" rel="noreferrer" className="hover:text-gcp-blue transition-colors">LinkedIn</a>
            <a href={AUTHOR_GITHUB} target="_blank" rel="noreferrer" className="hover:text-gcp-blue transition-colors">GitHub</a>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <span className="flex items-center gap-1">Built with <Heart size={10} className="text-gcp-red fill-gcp-red"/></span>
        </div>
    </footer>
  );
};

export default Footer;
