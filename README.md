# GCP Security Mastery: Zero to Hero

The definitive, interactive learning platform for mastering Google Cloud Platform (GCP) Security. Built with love by **Purushotham Muktha**.

![GCP Security Mastery Dashboard](https://via.placeholder.com/800x400?text=GCP+Security+Mastery+Dashboard)

## 🚀 Overview

**GCP Security Mastery** is a React-based educational application designed to take IT professionals from basic cloud concepts to expert-level security architecture. It combines modular lessons, interactive console simulations, animated visualizations, and an AI-powered tutor to provide a holistic learning experience.

The app follows the **"Zero to Hero"** methodology, covering everything from the Shared Responsibility Model to advanced topics like BeyondCorp Zero Trust, Confidential Computing, and the Secure AI Framework (SAIF).

## ✨ Key Features

### 📚 Interactive Learning Path
*   **Structured Curriculum**: 7+ Comprehensive Modules covering IAM, Infrastructure, Data Protection, Detection, Threat Intel, and AI Security.
*   **Deep Dives**: Detailed "What", "Why", "How" guides with implementation steps and best practices.
*   **Knowledge Checks**: Quizzes with explanations to reinforce learning.

### 🧪 Hands-On Labs & Simulators
*   **Console Simulation**: A realistic mock interface of the Google Cloud Console.
*   **Scenario-Based Labs**: Practice configuring IAM Roles, Firewall Rules, DLP Templates, and Binary Authorization policies without incurring cloud costs.
*   **Immediate Feedback**: Real-time validation of your configuration actions.

### 🎨 Architecture Visualizations
*   **Animated Diagrams**: Complex concepts like *VPC Service Controls*, *Envelope Encryption*, *BeyondCorp*, and *Chronicle Log Ingestion* explained through Framer Motion animations.
*   **Enterprise Blueprints**: Visual guides for Landing Zones, Shared VPC, and Hub-and-Spoke topologies.

### 🤖 Gemini AI Security Tutor
*   **Personalized Assistance**: An integrated AI chat assistant powered by **Google Gemini 1.5 Flash**.
*   **Context-Aware**: The tutor knows which module you are studying and provides relevant answers.

### 🛠️ Service Catalog & Solutions
*   **Product Glossary**: A comprehensive "Master-Detail" view of GCP security products (Cloud Armor, SCC, KMS, etc.).
*   **Solution Architectures**: Reference designs for common use cases like *Ransomware Defense*, *Sovereign Cloud*, and *OT Security*.
*   **Compliance Center**: Information on Trusted Cloud principles, Access Transparency, and Sovereignty controls.

## 🛠️ Tech Stack

*   **Frontend Framework**: React 18
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS (Custom GCP Color Palette, Dark/Light Mode)
*   **Animations**: Framer Motion
*   **Icons**: Lucide React
*   **AI Integration**: Google GenAI SDK (`@google/genai`)
*   **Routing**: React Router DOM

## 📂 Project Structure

```
├── src/
│   ├── components/         # UI Components
│   │   ├── Home.tsx        # Dashboard with "Stack" visualization
│   │   ├── Layout.tsx      # Main layout (Sidebar, Header, Footer)
│   │   ├── InteractiveLab.tsx # Console Simulator Logic
│   │   ├── Visualizations.tsx # Animated SVG Diagrams
│   │   ├── GeminiTutor.tsx    # AI Chat Interface
│   │   ├── Products.tsx       # Service Catalog
│   │   └── ...
│   ├── services/
│   │   └── geminiService.ts   # Google GenAI API integration
│   ├── types.ts            # TypeScript Interfaces
│   ├── constants.tsx       # Curriculum Content & Data
│   ├── App.tsx             # Routing & State Management
│   └── index.tsx           # Entry Point
├── index.html              # HTML Template & Tailwind Config
└── metadata.json           # App Metadata
```

## 🚀 How to Run

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure API Key**:
    *   Create a `.env` file or set the environment variable `API_KEY` with your Google Gemini API Key.
    *   *Note: In the demo environment, this is assumed to be handled by the platform.*
4.  **Start the development server**:
    ```bash
    npm start
    ```

## 👨‍💻 Author

**Purushotham Muktha**
*   **Role**: Cloud Security Architect
*   **Mission**: To share knowledge globally and help professionals secure the cloud.
*   [LinkedIn Profile](https://www.linkedin.com/in/purushotham-muktha/)
*   [GitHub Profile](https://github.com/Mpurushotham)

---

*Built with ❤️ for the Cloud Security Community.*
