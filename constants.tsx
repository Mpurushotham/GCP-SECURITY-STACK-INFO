
import { Module, ModuleStatus, SecurityProduct, Solution, ComplianceItem } from './types';

export const APP_NAME = "GCP Security Zero to Hero";
export const AUTHOR_NAME = "Purushotham Muktha";
export const AUTHOR_LINKEDIN = "https://www.linkedin.com/in/purushotham-muktha/";
export const AUTHOR_GITHUB = "https://github.com/Mpurushotham";

export const SECURITY_PRODUCTS: SecurityProduct[] = [
  { 
    id: 'iam', 
    name: 'Cloud IAM & Identity', 
    category: 'Identity', 
    description: 'Fine-grained access control and visibility for centrally managing cloud resources.', 
    iconName: 'UserCheck', 
    docsUrl: 'https://cloud.google.com/iam/docs',
    tagline: 'Fine-Grained Access Control & Identity',
    color: 'from-blue-600 to-blue-800',
    priority: 'Critical',
    setupTime: '2-4 weeks',
    businessValue: 'Reduces identity-related breaches by 85% with context-aware Zero Trust policies',
    components: [
        'Cloud IAM Roles & Permissions',
        'Identity Platform',
        'Identity-Aware Proxy (IAP)',
        'BeyondCorp Enterprise',
        'Workload Identity Federation',
        'Service Account Management'
    ],
    problems: [
        'Eliminates standing privileges with Just-in-Time access',
        'Prevents lateral movement with micro-segmentation',
        'Stops credential theft with identity-centric security'
    ],
    integrates: ['scc', 'chronicle', 'vpc-sc', 'armor'],
    whatIsIt: 'Cloud Identity and Access Management (IAM) is the heart of GCP security. It lets you authorize who (identity) can do what (role) on which resources.',
    whyImportant: 'Without IAM, you have no control. It is the first line of defense against unauthorized access and data breaches.',
    problemSolved: 'Solves the challenge of managing permissions at scale. Instead of managing permissions for every single file or VM, you manage policies on Projects, Folders, and Organizations.',
    whenToUse: [
        'Always. Every GCP project uses IAM.',
        'When you need to delegate administration duties.',
        'When you need to grant granular access to resources.'
    ],
    howToUse: '1. Identify the Principal (User/Service Account). 2. Select a predefined Role (e.g., "Storage Object Viewer"). 3. Bind them on a Resource (Bucket/Project).',
    bestPractices: [
        'Principle of Least Privilege: Grant only necessary permissions.',
        'Use Groups for managing users, not individual emails.',
        'Use Custom Roles if Predefined roles are too broad.'
    ],
    architectureType: 'IDENTITY',
    simulator: {
        title: 'Configure Secure Access',
        steps: [
            {
                question: 'A developer needs to debug code on a VM but should not be able to change IAM policies. Which role do you assign?',
                options: [
                    { label: 'Owner', isCorrect: false, feedback: 'Too risky! Owners can do anything, including deleting the project.' },
                    { label: 'Compute Admin', isCorrect: false, feedback: 'Better, but Admin might be able to change permissions.' },
                    { label: 'Compute Instance Admin (v1)', isCorrect: true, feedback: 'Correct. Allows full control of instances without IAM privilege.' }
                ]
            },
            {
                question: 'You have a team of 50 developers. How do you grant them access efficiently?',
                options: [
                    { label: 'Add each user individually', isCorrect: false, feedback: 'Hard to maintain.' },
                    { label: 'Create a Google Group, add users to Group, grant Role to Group', isCorrect: true, feedback: 'Correct. This is the scalable best practice.' }
                ]
            }
        ]
    }
  },
  { 
    id: 'scc', 
    name: 'Security Command Center', 
    category: 'Detection', 
    description: 'Centralized vulnerability and threat reporting service.', 
    iconName: 'Shield', 
    docsUrl: 'https://cloud.google.com/security-command-center/docs',
    tagline: 'Unified Security & Risk Management',
    color: 'from-green-600 to-green-800',
    priority: 'Critical',
    setupTime: '1-3 weeks',
    businessValue: 'Reduces security misconfigurations by 70% with automated detection',
    components: [
        'Security Health Analytics',
        'Event Threat Detection',
        'Container Threat Detection',
        'Web Security Scanner',
        'VM Threat Detection',
        'Risk Overview',
        'Continuous Threat Exposure Management'
    ],
    problems: [
        'Provides unified visibility across Google Cloud',
        'Detects advanced threats with built-in ML',
        'Identifies misconfigurations and compliance gaps'
    ],
    integrates: ['chronicle', 'iam', 'vpc-sc', 'armor', 'dlp'],
    whatIsIt: 'The centralized dashboard for security visibility. It aggregates findings from various scanners and threat detectors.',
    whyImportant: 'You cannot secure what you cannot see. SCC provides the visibility into your security posture.',
    problemSolved: 'Solves fragmented security alerts. SCC brings misconfigurations, vulnerabilities, and threats into one view.',
    whenToUse: [
        'To monitor compliance (CIS benchmarks, PCI-DSS).',
        'To detect active threats (crypto mining, SSH brute force).'
    ],
    howToUse: '1. Enable SCC at the Organization level. 2. Select Services (ETD, SHA). 3. View Findings. 4. Configure Exports to Pub/Sub for automation.',
    bestPractices: [
        'Enable Premium tier for Event Threat Detection.',
        'Integrate with ticketing systems (Jira/ServiceNow).',
        'Regularly review and mute/resolve findings.'
    ],
    architectureType: 'DETECTION',
    simulator: {
        title: 'Triaging Threats',
        steps: [
            {
                question: 'SCC reports a "Compute Instance with Public IP" finding. Why might this be critical?',
                options: [
                    { label: 'It costs more money.', isCorrect: false, feedback: 'Cost is a factor, but not the security risk.' },
                    { label: 'It increases the attack surface to the internet.', isCorrect: true, feedback: 'Correct. Unnecessary public IPs are a common entry point for attackers.' }
                ]
            }
        ]
    }
  },
  { 
    id: 'vpc-sc', 
    name: 'VPC Service Controls', 
    category: 'Network', 
    description: 'Configurable security perimeters to control communication between Google Cloud services.', 
    iconName: 'Network', 
    docsUrl: 'https://cloud.google.com/vpc-service-controls/docs',
    tagline: 'Data Exfiltration Protection',
    color: 'from-purple-600 to-purple-800',
    priority: 'High',
    setupTime: '2-4 weeks',
    businessValue: 'Prevents 95% of data exfiltration attempts with service perimeters',
    components: [
        'Service Perimeters',
        'Access Level Conditions',
        'Ingress/Egress Rules',
        'Context-Aware Service Perimeters',
        'VPC Flow Logs'
    ],
    problems: [
        'Prevents data exfiltration from compromised resources',
        'Isolates sensitive workloads with service perimeters',
        'Blocks lateral movement between projects'
    ],
    integrates: ['scc', 'iam', 'armor', 'chronicle'],
    whatIsIt: 'VPC-SC creates a security perimeter around Google managed services (like BigQuery, Cloud Storage) to control data movement.',
    whyImportant: 'It prevents data exfiltration. Even if an attacker steals credentials, they cannot move data out of the perimeter.',
    problemSolved: 'Mitigates data exfiltration risks from compromised identities or malicious insiders.',
    whenToUse: [
        'For storing highly sensitive data (PII, PHI).',
        'When you need to comply with strict data residency or isolation regulations.'
    ],
    howToUse: '1. Create an Access Policy. 2. Define a Service Perimeter. 3. Add Projects and Services. 4. Configure Ingress/Egress rules.',
    bestPractices: [
        'Use Dry Run mode first to identify blocked legitimate traffic.',
        'Configure Ingress/Egress rules to allow specific communication bridges.'
    ],
    architectureType: 'PERIMETER',
    simulator: {
        title: 'Build a Data Perimeter',
        steps: [
            {
                question: 'You want to protect a BigQuery dataset from being copied to a personal Gmail account. What do you do?',
                options: [
                    { label: 'Use IAM to deny Gmail users', isCorrect: false, feedback: 'IAM handles access, not data movement destinations.' },
                    { label: 'Create a VPC Service Perimeter including the Project', isCorrect: true, feedback: 'Correct. This blocks API calls that try to move data outside the boundary.' }
                ]
            }
        ]
    }
  },
  { 
    id: 'armor', 
    name: 'Cloud Armor', 
    category: 'Network', 
    description: 'DDoS protection and WAF (Web Application Firewall) policies for your applications.', 
    iconName: 'ShieldCheck', 
    docsUrl: 'https://cloud.google.com/armor/docs',
    tagline: 'DDoS Protection & Web Application Firewall',
    color: 'from-orange-600 to-orange-800',
    priority: 'High',
    setupTime: '1-2 weeks',
    businessValue: 'Mitigates DDoS attacks up to 1.5 Tbps with global protection',
    components: [
        'Cloud Armor Standard',
        'Managed Protection Plus',
        'WAF Rules Engine',
        'Rate Limiting',
        'IP Allow/Deny Lists'
    ],
    problems: [
        'Blocks DDoS attacks with global scale protection',
        'Prevents OWASP Top 10 web vulnerabilities',
        'Stops bot traffic and automated attacks'
    ],
    integrates: ['scc', 'chronicle', 'load-balancing'],
    whatIsIt: 'Cloud Armor is the WAF and DDoS protection service that sits at the global edge of Google’s network.',
    whyImportant: 'It stops attacks before they reach your infrastructure. It filters traffic at the Google Global Load Balancer level.',
    problemSolved: 'Protects against OWASP Top 10 attacks (SQLi, XSS) and Volumetric DDoS attacks.',
    whenToUse: [
        'For any public-facing HTTP(S) application.',
        'To restrict access to your Load Balancer by Geo-location.'
    ],
    howToUse: '1. Create a Security Policy. 2. Add Rules (allow/deny based on IP, Geo, or Preconfigured WAF rules). 3. Attach the policy to a Backend Service target.',
    bestPractices: [
        'Enable Adaptive Protection to learn baseline traffic patterns.',
        'Use Preview Mode to test rules before enforcing blocking.'
    ],
    architectureType: 'INGRESS',
    simulator: {
        title: 'Defend a Web App',
        steps: [
            {
                question: 'You are noticing SQL Injection attempts in your logs. How do you block them?',
                options: [
                    { label: 'Update the application code', isCorrect: false, feedback: 'Good for long term, but too slow for immediate defense.' },
                    { label: 'Apply a Cloud Armor pre-configured WAF rule for SQLi', isCorrect: true, feedback: 'Correct. This blocks the attack at the edge immediately.' }
                ]
            }
        ]
    }
  },
  { 
    id: 'dlp', 
    name: 'Cloud Data Loss Prevention', 
    category: 'Data', 
    description: 'Fully managed service to discover, classify, and protect sensitive data.', 
    iconName: 'FileSearch', 
    docsUrl: 'https://cloud.google.com/dlp/docs',
    tagline: 'Sensitive Data Protection & Classification',
    color: 'from-teal-600 to-teal-800',
    priority: 'High',
    setupTime: '2-5 weeks',
    businessValue: 'Reduces data breach risk by 80% with automated sensitive data protection',
    components: [
        'Data Discovery & Classification',
        'De-identification & Masking',
        'Inspection & Transformation',
        'InfoType Detectors',
        'Data Risk Analysis'
    ],
    problems: [
        'Discovers and classifies sensitive data automatically',
        'Prevents data leakage with content-aware policies',
        'Reduces PII/PHI exposure risk'
    ],
    integrates: ['scc', 'chronicle', 'iam', 'vpc-sc'],
    whatIsIt: 'Data Loss Prevention (DLP) scans text, images, and storage for sensitive info like Credit Cards, SSNs, or Custom patterns.',
    whyImportant: 'Accidental exposure of PII is a top cloud risk. DLP automates the discovery of this "Shadow Data".',
    problemSolved: 'Identifying what sensitive data you actually have, and de-identifying it for analytics (e.g., masking names).',
    whenToUse: [
        'Before migrating data to the cloud (sanitize it).',
        'Real-time scanning of user input in chat apps.',
        'Periodically scanning BigQuery/Storage for compliance.'
    ],
    howToUse: '1. Create an Inspection Template (InfoTypes). 2. Create a Job Trigger (Schedule & Target). 3. View Findings. 4. Use De-identification Templates.',
    bestPractices: [
        'Use "Sampling" for large datasets to save costs.',
        'Combine with VPC-SC to lock down data once found.'
    ],
    architectureType: 'DATA_SECURITY',
    simulator: {
        title: 'De-identify Sensitive Data',
        steps: [
            {
                question: 'You want to share a dataset with analysts but hide the "Email" column while preserving the ability to join rows. Which method do you use?',
                options: [
                    { label: 'Masking (replace with *)', isCorrect: false, feedback: 'Masking destroys the unique identifier needed for joins.' },
                    { label: 'Pseudonymization (Deterministic Encryption)', isCorrect: true, feedback: 'Correct. The same email always maps to the same token.' }
                ]
            }
        ]
    }
  },
  { 
    id: 'chronicle', 
    name: 'Chronicle Security', 
    category: 'Detection', 
    description: 'Cloud-native SIEM (Security Information and Event Management).', 
    iconName: 'Eye', 
    docsUrl: 'https://cloud.google.com/chronicle/docs',
    tagline: 'Cloud-Native SIEM with AI/ML',
    color: 'from-red-600 to-red-800',
    priority: 'Critical',
    setupTime: '4-8 weeks',
    businessValue: 'Reduces mean time to respond (MTTR) by 65% with automated SOAR',
    components: [
        'Chronicle SIEM',
        'SOAR Engine',
        'Threat Intelligence',
        'YARA-L Rule Engine',
        'Unified Data Model',
        'Google Threat Intelligence'
    ],
    problems: [
        'Correlates security events across multi-cloud',
        'Reduces false positives with ML-powered detection',
        'Automates incident response workflows'
    ],
    integrates: ['scc', 'iam', 'vpc-sc', 'armor'],
    whatIsIt: 'Chronicle is a planet-scale telemetry analysis platform. It ingests massive amounts of logs and allows sub-second searching.',
    whyImportant: 'Traditional SIEMs are slow and expensive. Chronicle allows you to store petabytes of logs and search them instantly.',
    problemSolved: 'Solves "Security Big Data" problems. Finding a needle in a haystack of logs across years of data.',
    whenToUse: [
        'For incident investigation and threat hunting.',
        'When you need to retain logs for long periods.'
    ],
    howToUse: '1. Ingest logs via Forwarders. 2. Logs are parsed to UDM. 3. Write YARA-L detection rules. 4. Use Case Management for response.',
    bestPractices: [
        'Send EVERYTHING. DNS logs, EDR logs, VPC Flow logs.',
        'Use Context Enrichment to make logs meaningful.'
    ],
    architectureType: 'SIEM',
    simulator: {
        title: 'Threat Hunting',
        steps: [
            {
                question: 'You need to find if a specific malicious IP accessed ANY system in your company over the last 12 months. Which tool is best?',
                options: [
                    { label: 'Cloud Logging', isCorrect: false, feedback: 'Cloud Logging is great for recent ops debugging, but slow for year-long searches.' },
                    { label: 'Chronicle', isCorrect: true, feedback: 'Correct. Chronicle is designed specifically for high-speed historical search.' }
                ]
            }
        ]
    }
  },
  { 
    id: 'kms', 
    name: 'Cloud Key Management', 
    category: 'Data', 
    description: 'Manage encryption keys on Google Cloud. Create, import, and view keys.', 
    iconName: 'Key', 
    docsUrl: 'https://cloud.google.com/kms/docs',
    tagline: 'Encryption Key Management & HSM',
    color: 'from-indigo-600 to-indigo-800',
    priority: 'High',
    setupTime: '1-3 weeks',
    businessValue: 'Ensures 100% compliance with encryption regulations and standards',
    components: [
        'Cloud KMS',
        'Cloud HSM',
        'External Key Manager',
        'Key Rotation Automation',
        'Key Access Justification'
    ],
    problems: [
        'Centralizes encryption key management',
        'Prevents cryptographic key exposure',
        'Ensures regulatory compliance for encryption'
    ],
    integrates: ['iam', 'scc', 'dlp'],
    whatIsIt: 'A centralized cloud service for managing cryptographic keys for your cloud services.',
    whyImportant: 'It allows you to control the "keys to the kingdom". Even Google cannot decrypt your data if you revoke the key in KMS.',
    problemSolved: 'Solves the "Trust" issue in cloud. Meets compliance requirements for managing your own encryption keys (CMEK).',
    whenToUse: [
        'When compliance requires Customer Managed Encryption Keys (CMEK).',
        'When you need to encrypt application secrets.'
    ],
    howToUse: '1. Create a Key Ring. 2. Create a CryptoKey. 3. Grant "CryptoKey Encrypter/Decrypter" role to the service agent.',
    bestPractices: [
        'Enable automatic key rotation (e.g., every 90 days).',
        'Use "Least Privilege" on the Key permissions.'
    ],
    architectureType: 'ENCRYPTION',
    simulator: {
        title: 'Lifecycle of a Key',
        steps: [
            {
                question: 'You need to ensure that if a key is compromised, only a limited amount of data is at risk. What feature do you enable?',
                options: [
                    { label: 'Key Export', isCorrect: false, feedback: 'Exporting keys increases risk.' },
                    { label: 'Automatic Key Rotation', isCorrect: true, feedback: 'Correct. Frequent rotation limits the blast radius of a compromised key version.' }
                ]
            }
        ]
    }
  },
  { 
    id: 'secret-manager', 
    name: 'Secret Manager', 
    category: 'Data', 
    description: 'Secure and convenient storage system for API keys, passwords, and certificates.', 
    iconName: 'Lock', 
    docsUrl: 'https://cloud.google.com/secret-manager/docs',
    tagline: 'Secure Secrets Storage',
    color: 'from-pink-600 to-pink-800',
    priority: 'Medium',
    setupTime: '1 day',
    businessValue: 'Eliminates credential leakage in source code and config files',
    components: [
        'Secret Versions',
        'IAM Integration',
        'Audit Logging',
        'Automatic Replication'
    ],
    problems: [
        'Eliminates "Secret Sprawl" across codebases',
        'Allows rotation of credentials without redeploying code',
        'Centralizes audit of secret access'
    ],
    integrates: ['iam', 'cloud-build', 'cloud-run'],
    whatIsIt: 'A fully managed service that allows you to store, version, and manage access to secrets (API keys, DB passwords) securely.',
    whyImportant: 'Hardcoding secrets in source code is a major security flaw. Env variables are often leaked. Secret Manager centralizes them.',
    problemSolved: 'Eliminates "Secret Sprawl" and allows you to rotate credentials without redeploying code.',
    whenToUse: [
        'To store database passwords.',
        'To store third-party API keys.'
    ],
    howToUse: '1. Create a Secret. 2. Add a Secret Version. 3. Grant "Secret Accessor" role to the application Service Account.',
    bestPractices: [
        'Enable Automatic Replication for high availability.',
        'Use IAM conditions to restrict access to specific versions.'
    ],
    architectureType: 'ENCRYPTION',
    simulator: {
        title: 'Secure App Secrets',
        steps: [
            {
                question: 'Your application code currently reads the DB_PASSWORD from an environment variable. How do you improve this?',
                options: [
                    { label: 'Encrypt the environment variable', isCorrect: false, feedback: 'Better, but the key to decrypt still needs storage.' },
                    { label: 'Move the password to Secret Manager', isCorrect: true, feedback: 'Correct. This keeps the secret out of the code and config files.' }
                ]
            }
        ]
    }
  },
  { 
    id: 'binauth', 
    name: 'Binary Authorization', 
    category: 'DevSecOps', 
    description: 'Deploy-time security control for GKE.', 
    iconName: 'CheckCircle', 
    docsUrl: 'https://cloud.google.com/binary-authorization/docs',
    tagline: 'Secure Software Supply Chain',
    color: 'from-cyan-600 to-cyan-800',
    priority: 'Medium',
    setupTime: '1-2 weeks',
    businessValue: 'Prevents deployment of unauthorized or compromised container images',
    components: [
        'Policy Engine',
        'Attestors',
        'KMS Signing',
        'Dry Run Mode'
    ],
    problems: [
        'Prevents "Shadow IT" or compromised images from running in production',
        'Ensures that code running in prod actually passed your CI/CD tests'
    ],
    integrates: ['artifact-registry', 'cloud-build', 'kms'],
    whatIsIt: 'A service that enforces a policy on Google Kubernetes Engine (GKE). It acts as a gatekeeper, checking for digital signatures before allowing a pod to start.',
    whyImportant: 'Prevents "Shadow IT" or compromised images from running in production.',
    problemSolved: 'Secure Software Supply Chain. Ensures that code running in prod actually passed your CI/CD tests and security scans.',
    whenToUse: [
        'For all Production GKE clusters.',
        'To enforce that images must be scanned by a vulnerability scanner.'
    ],
    howToUse: '1. Create Attestors. 2. In CI/CD, "sign" the image digest. 3. Configure Policy to "Require Attestations".',
    bestPractices: [
        'Block "Latest" tag deployments.',
        'Use separate keys for different stages (QA vs Prod).'
    ],
    architectureType: 'SUPPLY_CHAIN',
    simulator: {
        title: 'Secure Deployment Pipeline',
        steps: [
            {
                question: 'An attacker gains access to your GKE cluster credentials and tries to deploy a malicious bitcoin miner image. What happens if Binary Authorization is enabled?',
                options: [
                    { label: 'The pod runs but is isolated.', isCorrect: false, feedback: 'BinAuth prevents deployment entirely.' },
                    { label: 'The deployment is blocked.', isCorrect: true, feedback: 'Correct. The malicious image lacks the cryptographic signature.' }
                ]
            }
        ]
    }
  },
  {
    id: 'gti',
    name: 'Google Threat Intelligence',
    category: 'Operations',
    description: 'Unmatched visibility from Mandiant, VirusTotal, and Google.',
    iconName: 'Globe',
    docsUrl: 'https://cloud.google.com/security/products/threat-intelligence',
    tagline: 'Frontline Intel & AI Attribution',
    color: 'from-emerald-600 to-teal-800',
    priority: 'Critical',
    setupTime: 'Instant',
    businessValue: 'Identify and mitigate threats before they impact your organization with 500+ tracked threat actors.',
    components: [
        'Mandiant Threat Intelligence',
        'VirusTotal Enterprise',
        'Gemini Security AI',
        'Attack Path Simulation',
        'Dark Web Monitoring'
    ],
    problems: [
        'Identifies WHO is attacking you (Attribution)',
        'Provides IOCs (Indicators of Compromise) to block attacks',
        'Correlates internal alerts with global campaigns'
    ],
    integrates: ['chronicle', 'scc', 'siemplify'],
    whatIsIt: 'A unified platform combining the breadth of VirusTotal, the depth of Mandiant, and the scale of Google visibility to track threat actors.',
    whyImportant: 'Knowing you are being attacked is good. Knowing WHO is attacking you allows you to predict their next move.',
    problemSolved: 'Solving the "Attribution" problem. Is this a script kiddie or a Nation State? The response strategy differs vastly.',
    whenToUse: [
        'During active incident response.',
        'To proactively hunt for threats in your environment.',
        'To vet 3rd party software hashes.'
    ],
    howToUse: '1. Access the GTI Portal. 2. Search for IP/Hash/Domain. 3. View the "Card" for attribution (e.g., APT29). 4. Export YARA rules to Chronicle.',
    bestPractices: [
        'Automate IOC ingestion into your Firewall/WAF.',
        'Regularly review "Threat Landscape" reports for your industry.'
    ],
    architectureType: 'CYBERSHIELD',
    simulator: {
        title: 'Attribute an Attack',
        steps: [
            {
                question: 'You found a suspicious file hash in a server log. What is your first step in GTI?',
                options: [
                    { label: 'Delete the file immediately', isCorrect: false, feedback: 'You lose evidence!' },
                    { label: 'Search the hash in Threat Intelligence', isCorrect: true, feedback: 'Correct. Determine if it is known malware and who uses it.' }
                ]
            }
        ]
    }
  }
];

export const INTEGRATION_FLOW = [
    { step: 1, title: 'Identity Foundation', description: 'Implement Cloud IAM and BeyondCorp Zero Trust', products: ['iam'] },
    { step: 2, title: 'Security Visibility', description: 'Deploy Security Command Center for assessment', products: ['scc'] },
    { step: 3, title: 'Network Segmentation', description: 'Configure VPC Service Controls and Armor', products: ['vpc-sc', 'armor'] },
    { step: 4, title: 'Data Protection', description: 'Enable Cloud DLP and Key Management', products: ['dlp', 'kms'] },
    { step: 5, title: 'Security Operations', description: 'Implement Chronicle SIEM and SOAR', products: ['chronicle'] }
];

export const ZERO_TRUST_CARDS = [
    { title: 'Identity-Centric', icon: 'UserCheck', desc: 'Access based on user and device identity, not network location', color: 'from-blue-600 to-blue-800' },
    { title: 'Context-Aware', icon: 'Lock', desc: 'Dynamic access policies based on real-time risk assessment', color: 'from-green-600 to-green-800' },
    { title: 'Adaptive Security', icon: 'Activity', desc: 'Continuous verification and automated response to threats', color: 'from-purple-600 to-purple-800' }
];

export const SECURITY_SOLUTIONS: Solution[] = [
    {
        id: 'security-ai',
        title: 'AI for Security (Gemini)',
        section: 'AI Security',
        description: 'Revolutionize security. Detect threats faster, automate tasks, and gain valuable insights with Gemini.',
        iconName: 'Zap',
        productsIncluded: ['scc', 'chronicle'],
        architectureType: 'AI_SECURITY',
        benefits: [
            'Reduce toil and manual work for analysts.',
            'Help detect, contain, and stop threats from spreading.',
            'Save time by streamlining security workflows with natural language.'
        ]
    },
    {
        id: 'securing-ai',
        title: 'Securing AI (SAIF)',
        section: 'AI Security',
        description: 'Secure the entire AI stack and life cycle. Confidently build, run, and govern your AI workloads.',
        iconName: 'Cpu',
        productsIncluded: ['iam', 'vpc-sc'],
        architectureType: 'AI_SECURITY',
        benefits: [
            'Secure AI workloads and AI agents.',
            'Discover and manage AI risks throughout its life cycle.',
            'Safely develop AI apps and AI agents and securely scale them.'
        ]
    },
    {
        id: 'autonomic-secops',
        title: 'Security Analytics & Operations',
        section: 'Threat Detection & Response',
        description: 'Modernize your SOC with speed, scale, and intelligence using Chronicle and autonomic principles.',
        iconName: 'Activity',
        productsIncluded: ['chronicle', 'scc'],
        architectureType: 'SIEM',
        benefits: [
            'Store and analyze petabytes of telemetry at fixed price.',
            'Continuous IoC matching and retrospective analysis.',
            'Painless scalability with elastic storage.'
        ]
    },
    {
        id: 'ctem',
        title: 'Continuous Threat Exposure Management',
        section: 'Threat Detection & Response',
        description: 'Proactively reduce exposures before adversaries act on them by validating your attack surface.',
        iconName: 'Eye',
        productsIncluded: ['scc'],
        architectureType: 'DETECTION',
        benefits: [
            'Identifying and mitigating risk proactively.',
            'Improving risk prioritization based on real-world exploitability.',
            'Hardening multicloud environment continuously.'
        ]
    },
    {
        id: 'ransomware',
        title: 'Ransomware Defense',
        section: 'Threat Detection & Response',
        description: 'Heighten your cyber defenses against increasingly sophisticated ransomware attacks.',
        iconName: 'AlertTriangle',
        productsIncluded: ['chronicle', 'scc', 'dlp'],
        architectureType: 'RANSOMWARE',
        benefits: [
            'Prepare your defenses with Mandiant consulting.',
            'Identify attacks before ransomware deployment.',
            'Respond to a ransomware incident quickly to minimize business impact.'
        ]
    },
    {
        id: 'digital-risk',
        title: 'Digital Risk Protection',
        section: 'Threat Detection & Response',
        description: 'Focus on what is most important to mitigate digital risk from the deep and dark web.',
        iconName: 'Eye',
        productsIncluded: ['chronicle'],
        architectureType: 'DETECTION',
        benefits: [
            'Broaden the aperture of your threat landscape.',
            'Identify high-risk attack vectors and malicious orchestration.',
            'Know the threat actors tactics, techniques, and procedures (TTPs).'
        ]
    },
    {
        id: 'zero-trust',
        title: 'Zero Trust Architecture',
        section: 'Cloud Infrastructure',
        description: 'Move away from perimeter-based security to a model that assumes no implicit trust. Verify every request based on identity and context.',
        iconName: 'Fingerprint',
        productsIncluded: ['iam', 'vpc-sc'],
        architectureType: 'ZERO_TRUST',
        benefits: [
            'Enable secure remote work without VPNs using BeyondCorp Enterprise.',
            'Protect against lateral movement attacks with Identity-Aware Proxy.',
            'Granular access based on device health and identity via Access Context Manager.'
        ]
    },
    {
        id: 'supply-chain',
        title: 'Software Supply Chain Security',
        section: 'Cloud Infrastructure',
        description: 'Secure your code from development to deployment using the SLSA framework. Prevent code injection and unauthorized deployments.',
        iconName: 'Box',
        productsIncluded: ['binauth', 'kms', 'secret-manager'],
        architectureType: 'SUPPLY_CHAIN',
        benefits: [
            'Shift security left by identifying risks earlier in SDLC.',
            'Automate security enforcement with Cloud Build & Artifact Registry.',
            'Ensure only trusted, signed images run in production.'
        ]
    },
    {
        id: 'waap',
        title: 'Web App & API Protection (WAAP)',
        section: 'Cloud Infrastructure',
        description: 'Comprehensive edge security to protect internet-facing applications and APIs from DDoS, bot attacks, and fraud.',
        iconName: 'ShieldCheck',
        productsIncluded: ['armor'],
        architectureType: 'INGRESS',
        benefits: [
            'Guard apps and APIs in the cloud, on-premises, or in hybrid deployments.',
            'Simplify operations with consolidated management and visibility.',
            'Potentially save 50–70% over competing solutions.'
        ]
    },
    {
        id: 'security-foundation',
        title: 'Security Foundation',
        section: 'Governance, Risk & Compliance',
        description: 'Recommended products and guidance to help achieve a strong security posture from day one.',
        iconName: 'CheckCircle',
        productsIncluded: ['iam', 'scc'],
        architectureType: 'GOVERNANCE',
        benefits: [
            'Easily consume security capabilities.',
            'Alignment with security best practices.',
            'Cost-effective package of security products.'
        ]
    },
    {
        id: 'resilience-framework',
        title: 'Security & Resilience Framework',
        section: 'Governance, Risk & Compliance',
        description: 'Ensure continuity and protect your business against adverse cyber events with comprehensive resilience solutions.',
        iconName: 'Shield',
        productsIncluded: ['scc', 'chronicle'],
        architectureType: 'RANSOMWARE',
        benefits: [
            'Address each phase of the cybersecurity life cycle.',
            'Help protect critical assets in cloud and on-premises.',
            'Enable rapid recovery wherever your assets reside.'
        ]
    },
    {
        id: 'sovereign-cloud',
        title: 'Sovereign Cloud',
        section: 'Governance, Risk & Compliance',
        description: 'Supporting digital sovereignty with robust power of choice and control over data access.',
        iconName: 'Lock',
        productsIncluded: ['kms', 'iam'],
        architectureType: 'SOVEREIGNTY',
        benefits: [
            'Get complete control without compromising functionality.',
            'Engage with independent regional operating partners.',
            'Go air-gapped with isolated operations for survivability.'
        ]
    },
     {
        id: 'governance-risk',
        title: 'Risk & Compliance as Code',
        section: 'Governance, Risk & Compliance',
        description: 'Transform your security and compliance function through automation to gain the speed of DevOps.',
        iconName: 'CheckCircle',
        productsIncluded: ['iam', 'scc'],
        architectureType: 'GOVERNANCE',
        benefits: [
            'Assert infrastructure and policies as code.',
            'Establish secure guardrails to prevent drift.',
            'Continuously evaluate risk and noncompliance.'
        ]
    },
    {
        id: 'ot-security',
        title: 'Mandiant OT Solutions',
        section: 'Specialized Environments',
        description: 'Strengthen your critical operational technology (OT) and industrial control systems (ICS) security.',
        iconName: 'Cpu',
        productsIncluded: ['chronicle'],
        architectureType: 'OT_SECURITY',
        benefits: [
            'A path to a better OT/ICS security posture.',
            'Evaluate your OT/ICS security program.',
            'Assess and test your OT/ICS environment.'
        ]
    },
    {
        id: 'cybershield',
        title: 'Google Cloud Cybershield',
        section: 'Specialized Environments',
        description: 'Protect critical national infrastructure by uniting national cyber defense with near real-time knowledge sharing.',
        iconName: 'Shield',
        productsIncluded: ['chronicle', 'scc'],
        architectureType: 'CYBERSHIELD',
        benefits: [
            'Provides AI and intel-driven cyber defense at national scale.',
            'Enables governments to build an enhanced cyber threat capability.',
            'Equip governments with real-time, actionable insights.'
        ]
    },
     {
        id: 'mandiant-crisis',
        title: 'Mandiant Crisis Communications',
        section: 'Threat Detection & Response',
        description: 'Protect stakeholders and prepare for the organization-wide impact of modern multifaceted attacks.',
        iconName: 'Share2',
        productsIncluded: [],
        architectureType: 'RANSOMWARE',
        benefits: [
            'Align crisis communications with technical response activities.',
            'Develop communication playbooks for incidents.',
            'Evaluate communication processes in advance of a breach.'
        ]
    }
];

export const COMPLIANCE_ITEMS: ComplianceItem[] = [
    {
        id: 'trust-principles',
        title: 'Trusted Cloud Principles',
        category: 'TRUST',
        description: 'Transparency, Sovereignty, and Control over your data.',
        iconName: 'Lock',
        details: [
            'You own your data, not Google.',
            'Google never uses your data for ads.',
            'We provide detailed transparency reports on government requests.'
        ]
    },
    {
        id: 'access-transparency',
        title: 'Access Transparency',
        category: 'CONTROL',
        description: 'Near real-time logs when Google admins access your content.',
        iconName: 'Eye',
        details: [
            'Justification provided for every access (e.g., Support Ticket #123).',
            'Cryptographically signed logs.',
            'Integration with Cloud Logging for alerts.'
        ]
    },
    {
        id: 'compliance-standards',
        title: 'Global Compliance',
        category: 'REGULATION',
        description: 'Meeting the strictest standards across industries and regions.',
        iconName: 'CheckCircle',
        details: [
            'ISO 27001, 27017, 27018',
            'SOC 1, 2, and 3',
            'FedRAMP High',
            'PCI DSS',
            'HIPAA'
        ]
    }
];

export const CURRICULUM: Module[] = [
  {
    id: 'mod_1',
    title: '1. Foundation',
    description: 'Shared Responsibility, Resource Hierarchy & Trusted Cloud Principles.',
    iconName: 'BookOpen',
    status: ModuleStatus.AVAILABLE,
    duration: '35 min',
    subModules: [
        {
            id: '1_1',
            title: 'Trusted Cloud & Shared Responsibility',
            content: `
# Trusted Cloud Principles
Google Cloud is built on a foundation of trust.
*   **You own your data:** Google does not process your data for advertising purposes. You retain full ownership and intellectual property rights.
*   **Transparency:** With **Access Transparency**, you see near real-time logs when Google administrators access your content (e.g., during a support ticket).
*   **Sovereign Cloud:** For highly regulated industries, Google offers Sovereign Cloud solutions that allow you to control data residency, access (via EKM), and operations with local partners.

### Secure by Design Infrastructure
*   **Titan Chips:** Custom-built security chips on both servers and peripherals to ensure hardware root-of-trust. It validates the BIOS/firmware before the machine even boots.
*   **Shielded VMs:** Uses the same Titan principles for virtual machines. Enables Secure Boot (verifies kernel signature) and vTPM (virtual Trusted Platform Module).

### The Shared Responsibility Model
Security is a shared fate, not just a shared responsibility.
*   **Lower Layers (Google):** Hardware, Physical Security (Biometrics, lasers, custom Titan chips), Host OS, Hypervisor, Global Network (Fiber, encryption in transit).
*   **Upper Layers (You):**
    *   **Data:** Classification, Encryption (CMEK), Backup & DR.
    *   **Identity:** Access policies, MFA, Service Account management.
    *   **Configuration:** Firewall rules, bucket permissions, OS patching (for GCE).
            `,
            diagramType: 'HIERARCHY'
        }
    ],
    quiz: [
        {
            id: 'q1',
            question: "Who is responsible for patching the guest Operating System on a Compute Engine VM?",
            options: ["Google", "The Customer", "It is automated by default", "The Network Admin"],
            correctAnswer: 1,
            explanation: "In IaaS (Infrastructure as a Service), the customer is responsible for the Guest OS, including patching and securing it."
        }
    ]
  },
  {
    id: 'mod_2',
    title: '2. Identity (IAM)',
    description: 'Policies, Roles, Auth Logic & Workload Identity.',
    iconName: 'Shield',
    status: ModuleStatus.AVAILABLE,
    duration: '50 min',
    subModules: [
      {
        id: '2_1',
        title: 'Policy Intelligence & Hierarchy',
        content: `
# Advanced IAM Concepts
Policies flow down: **Org -> Folder -> Project -> Resource**.
*   **Allow Policies are Additive:** If the Org level allows "User A" to be a Viewer, a Project Admin *cannot* block "User A" via standard IAM.
*   **IAM Deny (V2):** Google Cloud now supports explicit Deny rules that override Allow rules, useful for regulatory guardrails.
        `,
        diagramType: 'HIERARCHY'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: "A policy is applied at the Organization node denying public IP creation. A Project Owner attempts to create a VM with a public IP. What happens?",
        options: [
          "The VM is created because Project Owner overrides Org policy.",
          "The VM creation fails.",
          "The VM is created but the IP is disabled.",
          "The Organization Admin receives an email to approve."
        ],
        correctAnswer: 1,
        explanation: "Org Policies are inherited constraints. A Project Owner cannot override a restriction set at a higher level in the hierarchy."
      }
    ],
    lab: {
      id: 'lab_1',
      title: 'Lab: Enforce Least Privilege',
      description: 'Configure an IAM policy binding that grants the "Storage Object Viewer" role to a user for a specific bucket, avoiding basic roles.',
      steps: [
        { id: 's1', instruction: 'Select the "Principal" (User email).', expectedAction: 'PRINCIPAL_SELECTED' },
        { id: 's2', instruction: 'Choose the Role "Storage Object Viewer". Do NOT use "Editor" or "Viewer".', expectedAction: 'ROLE_SELECTED' },
        { id: 's3', instruction: 'Add a condition: Grant access only if request time < 2025-01-01.', expectedAction: 'CONDITION_ADDED' }
      ],
      successMessage: "Excellent! You avoided Basic roles (Owner/Editor) and applied a predefined role with a Time-based condition."
    }
  },
  {
    id: 'mod_3',
    title: '3. Infrastructure',
    description: 'VPC, WAF, Shield & Zero Trust Networking.',
    iconName: 'Network',
    status: ModuleStatus.AVAILABLE,
    duration: '60 min',
    subModules: [
      {
        id: '3_1',
        title: 'VPC Service Controls & Zero Trust',
        content: `
# Network Security & Zero Trust
### 1. VPC Service Controls (VPC-SC)
The "Air Gap" for the cloud.
*   **Perimeters:** Define a boundary around your projects. API calls from outside (even with valid credentials) are blocked.
*   **Data Exfiltration Defense:** Prevents a rogue insider from copying data from your corporate bucket to their personal Gmail bucket.

### Real-World Use Cases
1.  **Protecting PII in BigQuery:**
    *   **Scenario:** Your "Customer Data" project holds BigQuery datasets with sensitive PII.
    *   **Solution:** Wrap the project in a VPC Service Perimeter. Only VMs inside the same perimeter (or authorized via Access Levels) can query the data. Even if a user exports a Service Account key, they cannot use it from their laptop.

2.  **Isolating Development Environments:**
    *   **Scenario:** Developers need sandbox environments that cannot access production data.
    *   **Solution:** Place "Prod" projects in one perimeter and "Dev" projects in another. Configure a **VPC-SC Bridge** only if specific data sharing is required and authorized.

### Implementation Steps
1.  **Dry Run Mode:** Always start here. It logs violations without blocking traffic.
2.  **Analyze Logs:** Look for \`vpcServiceControlsUniqueIdentifier\` in Cloud Logging to identify legitimate traffic that would be blocked.
3.  **Enforce:** Once legitimate traffic is accounted for (via Access Levels or Ingress Rules), switch to Enforced mode.
        `,
        diagramType: 'VPC_PERIMETER'
      },
      {
          id: '3_2',
          title: 'Landing Zones, Fabric & Shared VPC',
          content: `
# Google Cloud Fabric & Landing Zones
### 1. What is a Landing Zone?
A pre-configured, scalable environment that provides a secure foundation for workloads. It sets up the Org structure, Networking, Log Sinks, and Identity before any app is deployed.
          `,
          diagramType: 'ENTERPRISE_ARCH'
      }
    ],
    quiz: [
      {
        id: 'q2',
        question: "Which feature prevents a compromised VM from uploading data to an external, unauthorized Cloud Storage bucket?",
        options: [
          "Cloud Armor",
          "VPC Firewall Rules",
          "VPC Service Controls",
          "Identity-Aware Proxy"
        ],
        correctAnswer: 2,
        explanation: "VPC Service Controls (VPC-SC) define a perimeter that restricts data movement (egress) across the boundary of projects, preventing exfiltration to unauthorized Google resources."
      }
    ],
    lab: {
      id: 'lab_2',
      title: 'Lab: Configure Firewall & IAP',
      description: 'Create a firewall rule to allow SSH via Identity-Aware Proxy (IAP) only, securing your VMs from the public internet.',
      steps: [
        { id: 's1', instruction: 'Set Source Filter to "IP Ranges".', expectedAction: 'SOURCE_FILTER' },
        { id: 's2', instruction: 'Enter the IAP IP Range: 35.235.240.0/20.', expectedAction: 'IP_ENTERED' },
        { id: 's3', instruction: 'Set Specified Protocols and Ports to "tcp:22".', expectedAction: 'PORT_SET' }
      ],
      successMessage: "Perfect. By allowing 35.235.240.0/20, you enable browser-based SSH via IAP without exposing port 22 to the entire internet."
    }
  },
  {
    id: 'mod_4',
    title: '4. Data Protection',
    description: 'Cloud DLP, KMS & Confidential Computing.',
    iconName: 'Lock',
    status: ModuleStatus.AVAILABLE,
    duration: '45 min',
    subModules: [
      {
        id: '4_1',
        title: 'Data Loss Prevention (DLP) & Keys',
        content: `
# Protecting Sensitive Data
### Cloud Data Loss Prevention (DLP)
DLP discovers, classifies, and protects sensitive data (PII).
*   **InfoTypes:** Built-in detectors for Credit Cards, SSNs, Passports, etc.
*   **De-identification:** Masking, tokenization, or bucketing data to make it safe for analytics.

### Cloud KMS (Key Management Service)
Manage cryptographic keys in the cloud.
*   **CMEK (Customer Managed Encryption Keys):** You control the key used to encrypt data in Storage, BigQuery, etc.
*   **Key Rotation:** Automatically generate new key versions to limit the impact of a potential compromise.
        `,
        diagramType: 'KMS_flow'
      }
    ],
    quiz: [
      {
        id: 'q3',
        question: "You need to share a dataset for analytics but must hide the credit card numbers. You also need to be able to join this dataset with another table based on the credit card number. Which transformation do you use?",
        options: [
          "Redaction (Delete)",
          "Masking (replace with *)",
          "Deterministic Encryption (Pseudonymization)",
          "Date Shifting"
        ],
        correctAnswer: 2,
        explanation: "Deterministic encryption replaces the data with a token that is consistent (same input = same token), allowing for joins while keeping the original data hidden."
      }
    ],
    lab: {
      id: 'lab_3',
      title: 'Lab: De-identify with DLP',
      description: 'Create a DLP Inspection Template to find Credit Card numbers and transform them using masking.',
      steps: [
        { id: 's1', instruction: 'Select InfoType "CREDIT_CARD_NUMBER".', expectedAction: 'INFOTYPE_SELECTED' },
        { id: 's2', instruction: 'Set Transformation to "Mask with character".', expectedAction: 'TRANSFORM_SELECTED' },
        { id: 's3', instruction: 'Run a test with sample data.', expectedAction: 'TEST_RUN' }
      ],
      successMessage: "Great job! You successfully configured a DLP template to automatically mask sensitive credit card data."
    }
  },
  {
    id: 'mod_5',
    title: '5. Detection & Response',
    description: 'Security Command Center (SCC) & Security Health Analytics.',
    iconName: 'Eye',
    status: ModuleStatus.AVAILABLE,
    duration: '55 min',
    subModules: [
      {
        id: '5_1',
        title: 'Security Command Center (SCC)',
        content: `
# Security Health Analytics (SHA)
Integrated into Security Command Center, SHA automatically detects common misconfigurations.

### Key Capabilities:
*   **Continuous Threat Exposure Management (CTEM):** SCC helps identify and mitigate risks proactively before adversaries can exploit them, validating your attack surface continuously.
*   **Vulnerability Detection:** Finds open firewalls, public buckets, disabled logging, and missing MFA.
*   **Compliance Monitoring:** Checks your environment against standards like CIS Benchmarks, PCI-DSS, and NIST.
*   **Asset Discovery:** Automatically inventories all assets (VMs, Buckets, Databases) to provide a complete view of your attack surface.

### Mandiant Threat Intelligence
Google Cloud integrates Mandiant's frontline intelligence directly into SCC and Chronicle, allowing you to know *who* is targeting you and *how*.
        `,
        diagramType: 'SCC_DASHBOARD'
      }
    ],
    quiz: [
      {
        id: 'q4',
        question: "Security Health Analytics reports a finding: 'MFA not enforced for root account'. What is the risk?",
        options: [
          "Billing costs will increase.",
          "The account is vulnerable to credential stuffing and takeover.",
          "The account cannot access BigQuery.",
          "It causes latency in the console."
        ],
        correctAnswer: 1,
        explanation: "Root accounts (and all user accounts) without MFA are highly susceptible to compromise via phishing or credential leaks. MFA adds a critical layer of defense."
      }
    ],
    lab: {
      id: 'lab_5',
      title: 'Lab: Remediate Misconfigurations',
      description: 'Use Security Command Center to identify a high-severity misconfiguration (Open Firewall) and remediate it.',
      steps: [
        { id: 's1', instruction: 'Enable "Security Health Analytics" in settings.', expectedAction: 'ENABLE_SHA' },
        { id: 's2', instruction: 'Filter findings by Severity: "HIGH".', expectedAction: 'FILTER_FINDINGS' },
        { id: 's3', instruction: 'Select the "Open Firewall: 0.0.0.0/0" finding and click "Remediate".', expectedAction: 'REMEDIATE_FINDING' }
      ],
      successMessage: "Excellent! You used SCC to identify a critical risk and applied a remediation to close the open firewall port."
    }
  },
  {
    id: 'mod_6',
    title: '6. Threat Intelligence',
    description: 'Mandiant, VirusTotal & Gemini AI for Security Ops.',
    iconName: 'Globe',
    status: ModuleStatus.AVAILABLE,
    duration: '45 min',
    subModules: [
      {
        id: '6_1',
        title: 'Unified Threat Intelligence',
        content: `
# Google Threat Intelligence
The unification of **Mandiant**, **VirusTotal**, and **Google's** massive visibility.

### The Power of Attribution
Knowing *that* you are being attacked is good. Knowing *who* is attacking you (Attribution) is better.
*   **Mandiant:** Provides deep knowledge of Threat Actors (e.g., APT42, UNC1234), their TTPs (Tactics, Techniques, Procedures), and motives.
*   **VirusTotal:** The world's largest crowdsourced malware telemetry.

### Gemini in Security Operations
AI is not just a buzzword; it's a force multiplier for SOC analysts.
*   **Summarization:** Gemini can read a 50-page threat report and summarize "How does this affect my organization?" in seconds.
*   **Search-to-Query:** Instead of writing complex YARA-L or SQL, you can ask "Show me all logins from North Korea in the last 24h" and Gemini generates the query.
*   **Attack Path Analysis:** Gemini explains complex attack chains: "The attacker Phished User A -> Stole Cookie -> Accessed BigQuery."
        `,
        diagramType: 'CYBERSHIELD'
      }
    ],
    quiz: [
      {
        id: 'q6',
        question: "Why is Attribution (identifying the specific Threat Actor) important in incident response?",
        options: [
          "It allows you to arrest the hackers immediately.",
          "It helps predict their next moves and TTPs based on past behavior.",
          "It is required by GDPR for all breaches.",
          "It automatically refunds any stolen money."
        ],
        correctAnswer: 1,
        explanation: "If you know you are fighting 'APT29' vs a 'Script Kiddie', your response strategy changes completely. You know their preferred backdoors, persistence mechanisms, and targets."
      }
    ],
    lab: {
      id: 'lab_6',
      title: 'Lab: Threat Attribution',
      description: 'Analyze a suspicious file hash using the Google Threat Intelligence portal to identify the threat actor and generate a defense rule.',
      steps: [
        { id: 's1', instruction: 'Enter the suspicious hash "a1b2c3d4..." in the search bar.', expectedAction: 'SEARCH_HASH' },
        { id: 's2', instruction: 'Identify the Threat Actor (e.g., APT-29) from the Intel Card.', expectedAction: 'IDENTIFY_ACTOR' },
        { id: 's3', instruction: 'Click "Generate YARA Rule" to create a detection signature.', expectedAction: 'GENERATE_YARA' }
      ],
      successMessage: "Excellent work. You successfully attributed the attack to a known APT group and generated a YARA rule to block it across your environment."
    }
  },
  {
      id: 'mod_7',
      title: '7. Securing AI (SAIF)',
      description: 'Secure AI Framework, AI Risk Management & GenAI Security.',
      iconName: 'Cpu',
      status: ModuleStatus.AVAILABLE,
      duration: '50 min',
      subModules: [
          {
              id: '7_1',
              title: 'Secure AI Framework (SAIF)',
              content: `
# The Secure AI Framework (SAIF)
Google introduced SAIF to help organizations secure their AI systems. It is based on 6 core pillars:

1.  **Expand strong security foundations:** Leverage existing controls like IAM, VPC-SC, and encryption. Don't reinvent the wheel; adapt what works.
2.  **Extend detection and response:** Bring AI into the threat horizon. Monitor for prompt injection, model poisoning, and data extraction attacks.
3.  **Automate defenses:** Use AI to defend AI. Automation is the only way to keep pace with the speed of AI-driven attacks.
4.  **Harmonize platform level controls:** Ensure consistent security across the organization. AI shouldn't be a "Shadow IT" island.
5.  **Adapt controls:** Adjust mitigations and create faster feedback loops. AI models change rapidly; security must too.
6.  **Contextualize AI system risks:** Understand the business context. A chatbot for public support has different risks than an internal code assistant.

### AI Supply Chain Security
Just like software, AI models have a supply chain.
*   **Model Signing:** Use **Sigstore** to sign models and ensure their integrity from training to deployment.
*   **Data Provenance:** Track the lineage of your training data to prevent poisoning.

### Generative AI Risks
*   **Prompt Injection:** Manipulating inputs to bypass safety filters.
*   **Data Exfiltration:** Users pasting sensitive PII into public GenAI models.
*   **Hallucinations:** Models generating plausible but false information.
              `,
              diagramType: 'AI_SECURITY'
          }
      ],
      quiz: [
          {
              id: 'q7',
              question: "What is 'Prompt Injection' in the context of Generative AI?",
              options: [
                  "Injecting SQL code into the model database.",
                  "Manipulating the input prompt to bypass the model's safety filters or instructions.",
                  "Increasing the speed of the prompt response.",
                  "Injecting training data into the model to poison it."
              ],
              correctAnswer: 1,
              explanation: "Prompt injection attacks involve crafting inputs that trick the LLM into ignoring its original instructions (like 'Do not reveal system details') and executing the attacker's commands."
          }
      ],
      lab: {
          id: 'lab_7',
          title: 'Lab: Secure GenAI Usage',
          description: 'Enforce an Organization Policy to restrict which Generative AI features can be used to prevent data exfiltration.',
          steps: [
              { id: 's1', instruction: 'Navigate to Organization Policies.', expectedAction: 'NAV_ORG_POLICIES' },
              { id: 's2', instruction: 'Search for "constraints/google.genai.restrictUsage".', expectedAction: 'SEARCH_POLICY' },
              { id: 's3', instruction: 'Click "Enforce" to block unauthorized GenAI features.', expectedAction: 'ENFORCE_POLICY' }
          ],
          successMessage: "Secure! You have successfully applied a guardrail to prevent unauthorized or risky usage of Generative AI features across the organization."
      }
  }
];