
import { LucideIcon } from 'lucide-react';

export enum ModuleStatus {
  LOCKED = 'LOCKED',
  AVAILABLE = 'AVAILABLE',
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS'
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LabStep {
  id: string;
  instruction: string;
  expectedAction: string; // Internal identifier for logic
  hint?: string;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
  steps: LabStep[];
  successMessage: string;
}

export interface SubModule {
  id: string;
  title: string;
  content: string; // Markdown-like content
  diagramType?: 'HIERARCHY' | 'VPC_PERIMETER' | 'KMS_flow' | 'SCC_DASHBOARD' | 'ENTERPRISE_ARCH' | 'CYBERSHIELD' | 'AI_SECURITY';
}

export interface Module {
  id: string;
  title: string;
  description: string;
  iconName: string; // Mapping string to Lucide icon in component
  status: ModuleStatus;
  duration: string;
  subModules: SubModule[];
  quiz: QuizQuestion[];
  lab?: Lab;
}

export interface SimulatorStep {
  question: string;
  options: { label: string; isCorrect: boolean; feedback: string }[];
}

export interface SecurityProduct {
  id: string;
  name: string;
  category: string;
  description: string; // Short description
  iconName: string;
  docsUrl: string;
  
  // Design Fields
  tagline: string;
  color: string; // Taildwind gradient class
  priority: 'Critical' | 'High' | 'Medium';
  setupTime: string;
  businessValue: string;
  components: string[];
  problems: string[];
  integrates: string[];

  // Deep Dive Content
  whatIsIt: string;
  whyImportant: string;
  problemSolved: string;
  whenToUse: string[];
  howToUse: string; // Conceptual workflow
  bestPractices: string[];
  
  // Visuals & Interactivity
  architectureType: 'INGRESS' | 'ENCRYPTION' | 'IDENTITY' | 'DETECTION' | 'PERIMETER' | 'ZERO_TRUST' | 'DATA_SECURITY' | 'SIEM' | 'SUPPLY_CHAIN' | 'AI_SECURITY' | 'GOVERNANCE' | 'OT_SECURITY' | 'RANSOMWARE' | 'CYBERSHIELD' | 'SOVEREIGNTY';
  simulator: {
    title: string;
    steps: SimulatorStep[];
  };
}

export interface Solution {
    id: string;
    title: string;
    description: string;
    iconName: string;
    section: string; // NEW: Categorization for the UI
    productsIncluded: string[]; // IDs of products
    architectureType: 'INGRESS' | 'ENCRYPTION' | 'IDENTITY' | 'DETECTION' | 'PERIMETER' | 'ZERO_TRUST' | 'DATA_SECURITY' | 'SIEM' | 'SUPPLY_CHAIN' | 'AI_SECURITY' | 'GOVERNANCE' | 'OT_SECURITY' | 'RANSOMWARE' | 'CYBERSHIELD' | 'SOVEREIGNTY';
    benefits: string[];
}

export interface ComplianceItem {
    id: string;
    title: string;
    category: 'TRUST' | 'REGULATION' | 'CONTROL';
    description: string;
    iconName: string;
    details: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface UserProgress {
  completedModuleIds: string[];
  currentModuleId: string | null;
  securityScore: number;
  certificateGenerated: boolean;
}