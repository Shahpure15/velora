import { Server, BrainCircuit, Link as LinkIcon, HandCoins, BookOpen, Stethoscope, Lightbulb } from 'lucide-react';

export const tracks = [
  {
    id: 'universe-1',
    universeLabel: 'Domain-01',
    name: 'Cybersecurity',
    tagline: 'Defend the grid. Break the unbreachable.',
    primaryColor: '#FF2D55',
    accentColor: '#FFE600',
    icon: Server,
    problemStatements: [
      {
        id: 'CYB-01',
        title: 'Problem Statement: Adaptive Phishing Defense Network',
        description: "Develop a real-time phishing detection system that uses machine learning to analyze email metadata, sender behavior patterns, and embedded links, then dynamically generates personalized user training simulations based on detected threats. The system should integrate with common email clients via API and simulate phishing attacks tailored to the user's role (e.g., student, faculty) to improve organizational resilience without disrupting workflows.",
        deliverables: [
          'Integrate ML models (e.g., using scikit-learn or TensorFlow) to classify phishing with >95% accuracy on diverse datasets like PhishTank.',
          'Create adaptive simulations that evolve based on user interaction history, tracking metrics like click rates and response times.',
          'Deploy as a browser extension or API service with a dashboard visualizing threat trends and training efficacy.'
        ]
      },
      {
        id: 'CYB-02',
        title: 'Problem Statement: IoT Device Vulnerability Scanner',
        description: 'Build a lightweight, open-source scanner for common IoT devices (e.g., smart bulbs, cameras) that identifies firmware vulnerabilities, weak encryption, and unauthorized network access points. It should scan local networks, prioritize risks using CVSS scores, and suggest automated patches or isolation rules enforceable via a simple firewall script.',
        deliverables: [
          'Perform network discovery and vulnerability assessment using tools like Nmap and custom scripts, outputting JSON reports.',
          'Implement risk scoring with visualizations (e.g., heatmaps) and one-click mitigation scripts compatible with Raspberry Pi or similar.',
          'Ensure scalability for 50+ devices, with privacy-focused local processing to avoid cloud dependencies.'
        ]
      },
      {
        id: 'CYB-03',
        title: 'Problem Statement: Privacy-Preserving Incident Response Platform',
        description: 'Create a collaborative platform for cybersecurity teams to share anonymized incident data (e.g., malware signatures, attack vectors) using homomorphic encryption, enabling federated learning across institutions without exposing sensitive logs. Include a query interface for pattern matching and automated alert generation.',
        deliverables: [
          'Use libraries like PySEAL for encryption and federated learning frameworks like Flower to train models on shared data.',
          'Build a web dashboard for querying encrypted datasets and generating real-time alerts via WebSockets.',
          'Demonstrate end-to-end privacy with test cases showing zero data leakage during cross-org simulations.'
        ]
      }
    ],
  },
  {
    id: 'universe-2',
    universeLabel: 'Domain-02',
    name: 'Agentic AI',
    tagline: 'Beyond prompt engineering. Build entities that think.',
    primaryColor: '#00D4FF',
    accentColor: '#0A0A0A',
    icon: BrainCircuit,
    problemStatements: [
      {
        id: 'AI-01',
        title: 'Problem Statement: Autonomous Hackathon Idea Generator',
        description: 'Build a multi-agent system where specialized agents (researcher, coder, designer) collaborate to generate, prototype, and pitch full hackathon ideas based on themes like "Sustainable India." Agents self-debate feasibility using tools like web search and code execution.',
        deliverables: [
          'Orchestrate agents with LangChain/CrewAI, integrating SerpAPI for research and GitHub for prototyping.',
          'Output interactive prototypes (e.g., Streamlit apps) with auto-generated pitch decks.',
          'Evaluate agent performance via metrics like idea novelty scores from human judges.'
        ]
      },
      {
        id: 'AI-02',
        title: 'Problem Statement: Personal Research Assistant Swarm',
        description: 'Design a swarm of AI agents that decomposes complex queries (e.g., "Latest AI ethics in India") into subtasks—literature review, summarization, visualization—then synthesizes outputs into a report with citations. Agents negotiate conflicting sources autonomously.',
        deliverables: [
          'Implement with AutoGen, using vector DBs (Pinecone) for knowledge sharing.',
          'Deploy as a Gradio web UI with export to Markdown/PDF.',
          'Demonstrate on 5 query types, measuring response coherence >90%.'
        ]
      },
      {
        id: 'AI-03',
        title: 'Problem Statement: Adaptive Gaming Companion Agent',
        description: 'Create an agent that plays mobile games (e.g., Ludo, Clash Royale) alongside users, learning strategies via observation and providing real-time tips or auto-adjusting difficulty. Extend to coaching mode for skill-building.',
        deliverables: [
          'Use computer vision (OpenCV) and RL (Gym) for gameplay analysis and decision-making.',
          'Build Android integration via Termux/Flutter with voice commands.',
          'Track win-rate improvements and generate replay analyses.'
        ]
      }
    ],
  },
  {
    id: 'universe-3',
    universeLabel: 'Domain-03',
    name: 'Blockchain',
    tagline: 'Decentralized futures. Trustless mechanisms.',
    primaryColor: '#FFE600',
    accentColor: '#0A0A0A',
    icon: LinkIcon,
    problemStatements: [
      {
        id: 'WEB3-01',
        title: 'Problem Statement: Decentralized Academic Credential Verifier',
        description: 'Develop a blockchain-based system for issuing and verifying tamper-proof academic credentials (e.g., hackathon certs, grades) using NFTs or soulbound tokens. Include a dApp for instant verification by employers, with zero-knowledge proofs for privacy.',
        deliverables: [
          'Use Polygon for low-gas minting and zk-SNARKs (circom) for selective disclosure.',
          'Build frontend with Next.js and wallet connect (MetaMask).',
          'Simulate 1000+ verifications with QR code integration.'
        ]
      },
      {
        id: 'WEB3-02',
        title: 'Problem Statement: Carbon Credit Trading Marketplace',
        description: 'Create a Web3 marketplace for trading tokenized carbon credits from Indian renewable projects, using oracles for real emission data and smart contracts for fractional ownership. Include gamified offsets for users via daily challenges.',
        deliverables: [
          'Integrate Chainlink oracles for off-chain data and ERC-1155 for credits.',
          'Deploy React dApp with impact dashboards showing CO2 reductions.',
          'Model trades with testnet DEX integration like Uniswap.'
        ]
      },
      {
        id: 'WEB3-03',
        title: 'Problem Statement: DAO for Campus Event Funding',
        description: 'Build a student-run DAO where proposals for events/hackathons are voted on via quadratic voting, funded from pooled crypto/micro-donations. Smart contracts handle transparent disbursals with milestone checks.',
        deliverables: [
          'Implement with Aragon or custom Solidity contracts on Sepolia testnet.',
          'Frontend in Svelte with wallet voting and proposal dashboards.',
          'Simulate 10 proposals with governance metrics like voter turnout.'
        ]
      }
    ],
  },
  {
    id: 'universe-4',
    universeLabel: 'Domain-04',
    name: 'FinTech',
    tagline: 'The future of finance is built here.',
    primaryColor: '#FF6B35',
    accentColor: '#0A0A0A',
    icon: HandCoins,
    problemStatements: [
      {
        id: 'FIN-01',
        title: 'Problem Statement: Micro-Insurance Claim Predictor',
        description: 'Design an AI-driven app that predicts and automates micro-insurance claims for low-income users (e.g., crop failure, gadget damage) by analyzing smartphone sensor data, weather APIs, and transaction history. Integrate UPI for instant payouts upon high-confidence predictions, targeting underserved rural/urban fringes in India.',
        deliverables: [
          'Fuse data from phone accelerometers, GPS, and public APIs (e.g., IMD weather) with ML models for 90%+ claim accuracy.',
          'Implement a Flutter-based mobile UI with UPI Razorpay integration for sub-5-minute payouts.',
          'Include fraud detection via anomaly scoring and a dashboard for insurers tracking portfolio risks.'
        ]
      },
      {
        id: 'FIN-02',
        title: 'Problem Statement: Sustainable Investment Tracker',
        description: 'Develop a blockchain-anchored portfolio tracker that scores investments on ESG (Environmental, Social, Governance) metrics using real-time data from APIs like NSE/BSE and satellite imagery for environmental impact. Users can simulate "green" rebalancing with DeFi yield farming options.',
        deliverables: [
          'Aggregate ESG data via APIs and compute scores with custom algorithms, visualizing via interactive charts.',
          'Use Ethereum testnets for transparent transaction logging of portfolio changes.',
          'Provide simulation tools showing 1-year ROI projections under carbon-tax scenarios.'
        ]
      },
      {
        id: 'FIN-03',
        title: 'Problem Statement: Peer-to-Peer Lending Risk Engine',
        description: 'Build a P2P lending platform prototype with a graph neural network that assesses borrower risk by analyzing social graphs, transaction networks, and alternative data (e.g., mobile recharge patterns). Enable smart contract-based disbursals with dynamic interest rates.',
        deliverables: [
          'Construct borrower graphs using Neo4j or NetworkX, training GNNs for default prediction >85% AUC.',
          'Integrate with mock UPI for lending flows and deploy as a FastAPI backend with React frontend.',
          'Generate explainable AI reports highlighting key risk factors for lenders.'
        ]
      }
    ],
  },
  {
    id: 'universe-5',
    universeLabel: 'Domain-05',
    name: 'EdTech',
    tagline: 'Reimagining the way we learn.',
    primaryColor: '#A200FF',
    accentColor: '#FFE600',
    icon: BookOpen,
    problemStatements: [
      {
        id: 'ED-01',
        title: 'Problem Statement: Multilingual Code Mentor AI',
        description: 'Create an interactive coding tutor that supports regional Indian languages (e.g., Hindi, Tamil) via speech-to-code translation, providing real-time feedback on Python/C programs submitted via voice or text. It should adapt difficulty based on student branch/year and generate project ideas tied to local curricula.',
        deliverables: [
          'Use Whisper for multilingual speech recognition and CodeT5-like models for code explanation/generation.',
          'Build a web app with WebRTC for voice input and progressive difficulty ladders tracking student progress.',
          'Include gamified leaderboards and exportable certificates for hackathon submissions.'
        ]
      },
      {
        id: 'ED-02',
        title: 'Problem Statement: Collaborative Skill Gap Analyzer',
        description: 'Develop a platform that scans student resumes, GitHub repos, and course syllabi to identify skill gaps across engineering branches, then matches them to peer study groups or micro-courses. Use NLP to recommend personalized learning paths with integrated quiz generators.',
        deliverables: [
          'Employ BERT for resume/parsing and clustering algorithms to form dynamic study groups.',
          'Create a Django/Flutter dashboard with real-time chat and auto-generated quizzes from open edX content.',
          'Visualize gaps via Sankey diagrams, targeting 20% skill uplift in simulated 30-day challenges.'
        ]
      },
      {
        id: 'ED-03',
        title: 'Problem Statement: AR Campus Navigator for Accessibility',
        description: 'Build an AR app using phone cameras to guide visually impaired students through campuses, overlaying audio descriptions of paths, classrooms, and events while detecting obstacles via computer vision. Integrate with college calendars for dynamic event routing.',
        deliverables: [
          'Leverage ARCore/ARKit with YOLO for obstacle detection and TTS for Hindi/English navigation.',
          'Sync with Google Calendar APIs for personalized routes, tested on sample campus maps.',
          'Include accessibility metrics dashboard for admins, like navigation success rates.'
        ]
      }
    ],
  },
  {
    id: 'universe-6',
    universeLabel: 'Domain-06',
    name: 'MedTech',
    tagline: 'Healthcare meets radical innovation.',
    primaryColor: '#00E676',
    accentColor: '#0A0A0A',
    icon: Stethoscope,
    problemStatements: [
      {
        id: 'MED-01',
        title: 'Problem Statement: Wearable Stress Biomarker Predictor',
        description: 'Engineer a mobile app that processes data from affordable wearables (e.g., Mi Band) to predict stress biomarkers (cortisol proxies) using heart rate variability and sleep patterns. Provide intervention plans with biofeedback games and doctor referral triggers.',
        deliverables: [
          'Train lightweight ML models (e.g., LSTM on Edge TPU) for real-time predictions with 85% accuracy.',
          'Design Flutter UI with gamified breathing exercises and exportable PDF reports.',
          'Integrate Twilio for SMS alerts to caregivers, anonymizing data for privacy.'
        ]
      },
      {
        id: 'MED-02',
        title: 'Problem Statement: Tele-Dermatology Triage Bot',
        description: 'Create a WhatsApp-integrated bot that uses image analysis to triage skin conditions, prioritizing urgent cases (e.g., melanoma) via CNNs trained on open datasets. It generates preliminary reports in local languages and schedules virtual consults.',
        deliverables: [
          'Fine-tune EfficientNet on ISIC datasets for >90% triage accuracy, handling low-light images.',
          'Build with FastAPI and WhatsApp Business API, including consent flows and doctor dashboards.',
          'Track outcomes with metrics like false positive rates in demo consultations.'
        ]
      },
      {
        id: 'MED-03',
        title: 'Problem Statement: Personalized Nutrition Planner for Diabetics',
        description: 'Develop an app that generates weekly meal plans for Type-2 diabetics by integrating blood glucose logs, grocery APIs (e.g., BigBasket), and cultural Indian recipes. Use RL to optimize for taste preferences and glycemic index.',
        deliverables: [
          'Use reinforcement learning (e.g., Stable Baselines) to adapt plans from user feedback and CGM data.',
          'Create a React Native interface with barcode scanning for real foods and nutritional visualizations.',
          'Simulate 3-month adherence improvements with A/B testing dashboards.'
        ]
      }
    ],
  },
  {
    id: 'universe-7',
    universeLabel: 'Domain-07',
    name: 'Open Innovation',
    tagline: 'Got a unique idea outside these tracks? Build it here!',
    primaryColor: '#FFFFFF',
    accentColor: '#0A0A0A',
    icon: Lightbulb,
    problemStatements: [
      {
        id: 'OI-01',
        title: 'Wildcard: Your Vision, Your Build',
        description: "Have a groundbreaking idea that doesn't fit neatly into the other domains? This is your playground. Propose and build any innovative solution to a real-world problem of your choosing. Originality, technical depth, feasibility, and impact will be the key judging criteria.",
        deliverables: [
          'Problem statement & solution proposal document',
          'Working prototype or MVP',
          'Demo video showcasing the solution'
        ]
      }
    ],
  },
]
