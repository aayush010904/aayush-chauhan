export const profile = {
  name: 'Aayush Chauhan',
  role: 'Undergraduate Engineer · AI/ML & Backend',
  greeting: 'Hello, I am',
  location: 'Delhi, India',
  summary:
    'I love making machines do the job for me.',
  bio: `I am an engineer who has always been fond of machines. Growing up around computers and electronics gadgets made me fascinated about how machines, in this case, computers work. And here I am, diving into the sea of codes and circuits, finding my way towards the end of the iceberg. Hit me up to join me in!`,
  education: [
    {
      institution: 'Faculty of Technology, University of Delhi',
      degree: 'B.Tech in Electronics and Communication Engineering',
      duration: '2023 — 2027',
      highlights: 'Minor in AI/ML · CGPA: 8.03/10 · Coursework: Deep Learning, Signal & Image Processing, Data Analytics',
    },
  ],
  experience: [
    {
      company: 'Vectura Fertin Pharma',
      role: 'Sales & Marketing Executive',
      duration: 'Summer 2024',
      impact: 'Drove a 15% market penetration increase and 30% uplift in customer engagement by developing data-driven strategies and analyzing user feedback for the "Tobacco-Free India" initiative.',
    },
  ],
  skills: [
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Python',
    'PyTorch',
    'TensorFlow',
  ],
  skillCategories: {
    'Languages': [
      { name: 'Python', value: 92 },
      { name: 'C++', value: 65 },
      { name: 'SQL', value: 72 },
      { name: 'HTML/CSS', value: 80 },
      { name: 'LaTeX', value: 70 },
    ],
    'ML / DL': [
      { name: 'PyTorch', value: 88 },
      { name: 'TensorFlow', value: 80 },
      { name: 'Scikit-learn', value: 85 },
      { name: 'OpenCV', value: 78 },
      { name: 'HF Transformers', value: 82 },
    ],
    'Data Science': [
      { name: 'Pandas', value: 88 },
      { name: 'NumPy', value: 90 },
      { name: 'Matplotlib', value: 85 },
      { name: 'Seaborn', value: 78 },
    ],
    'Tools': [
      { name: 'Git', value: 82 },
      { name: 'Docker', value: 70 },
      { name: 'Flask', value: 72 },
      { name: 'FastAPI', value: 78 },
      { name: 'Streamlit', value: 75 },
      { name: 'Google Cloud', value: 65 },
    ],
  },
  timeline: [
    { year: '2023', title: 'Started Engineering Journey', description: 'Began B.Tech at University of Delhi, focused on electronics and software foundations.' },
    { year: '2024', title: 'ML Specialization & Internship', description: 'Completed Stanford ML Specialization. Interned at Vectura Fertin Pharma. Won D3 Hackathon & HackLLM.' },
    { year: '2025', title: 'Research & Deep Learning', description: 'Published AI/ML research. Built production-grade deep learning projects. Recieved NITORI Scholarship.' },
  ],
  proficiency: [
    { name: 'Machine Learning', value: 88 },
    { name: 'Deep Learning', value: 85 },
    { name: 'Computer Vision', value: 80 },
    { name: 'NLP', value: 82 },
    { name: 'Data Analytics', value: 86 },
    { name: 'Backend Development', value: 72 },
  ],
  stats: [
    { label: 'Projects Built', value: '4+' },
    { label: 'Hackathons Won', value: '2' },
    { label: 'CGPA', value: '8.03' },
  ],
  contact: {
    email: 'aayushchauhan019@gmail.com',
    phone: '+91 99581 06338',
    linkedin: 'https://www.linkedin.com/in/aayushchauhan019',
    github: 'https://github.com/aayush010904',
    resumeUrl: '/docs/resume.pdf',
  },
};

export const projects = [
  {
    id: 'prj-1',
    slug: 'betrayalnet',
    title: 'BetrayalNet',
    subtitle: 'Deception Detection in Diplomacy',
    year: 2025,
    featured: true,
    tech: ['PyTorch', 'Transformers', 'NLP', 'Game Theory'],
    cover: '/img/betrayal1.png',
    // cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=8',
    overview:
      'A hybrid neural model for detecting deception in strategic multi-agent dialogue (Diplomacy), combining intent embeddings, power dynamics, and contextual lie detection.',
    problem:
      'Detecting deception in natural language is notoriously difficult — especially in strategic games where players actively craft misleading messages to gain an advantage.',
    solution:
      'Designed a hybrid architecture fusing a fine-tuned BERT encoder with power-dynamic features and a game-theoretic intent classifier. Trained on the DIPLOMACY dataset with multi-task learning.',
    impact:
      'Achieved Macro F1 of 0.5847, ranking competitively against published benchmarks. Model runs at sub-second inference for real-time analysis.',
    achievements: [
      'Macro F1 score of 0.5847 on DIPLOMACY benchmark',
      'Sub-second inference for real-time deception detection',
      'Multi-task learning with intent + deception heads',
    ],
    links: {
      github: 'https://github.com/aayush010904/BetrayalNet',
    },
    gallery: [
      '/img/betrayal2.png',
    ],
  },
  {
    id: 'prj-2',
    slug: 'sam-ai',
    title: 'SAM AI',
    subtitle: 'Smart Shopping Assistant',
    year: 2025,
    featured: true,
    tech: ['Python', 'FastAPI', 'LLM', 'NLP', 'TTS/STT', 'Fuzzy Matching'],
    cover: '/img/sam1.png',
    // cover: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
    overview:
      'An AI-powered shopping assistant with real-time voice interaction, natural language product search, and conversational recommendations.',
    problem:
      'Online shoppers face decision fatigue and information overload when browsing large catalogs, leading to abandoned sessions and poor product discovery.',
    solution:
      'Built an end-to-end voice-enabled assistant using FastAPI, LLM-powered intent parsing, fuzzy product matching, and real-time TTS/STT for hands-free conversational shopping.',
    impact:
      'Delivered a seamless voice-first shopping experience with instant product recommendations and natural conversational flow.',
    achievements: [
      'Voice-first interaction with real-time TTS/STT',
      'LLM-powered intent classification and slot filling',
      'Fuzzy matching for robust product search',
    ],
    links: {
      github: 'https://github.com/codeitnav/Optium',
    },
    gallery: [
      '/img/sam2.png',
    ],
  },
  {
    id: 'prj-3',
    slug: 'haritax',
    title: 'HaritaX',
    subtitle: 'Plant Disease Classifier',
    year: 2025,
    featured: true,
    tech: ['PyTorch', 'TensorFlow', 'CNN', 'Vision Transformer'],
    cover: '/img/haritax1.png',
    // cover: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
    overview:
      'A deep ensemble classifier combining CNN and Vision Transformer architectures for high-accuracy plant disease detection from leaf images.',
    problem:
      'Farmers in developing regions lack access to expert plant pathologists. Early detection of leaf diseases can prevent crop loss, but manual identification is slow and error-prone.',
    solution:
      'Engineered a deep ensemble of VGG16, ResNet50, ViT, and Swin Transformer trained on the PlantVillage dataset with data augmentation and weighted voting.',
    impact:
      'Achieved 99.76% classification accuracy, making it a reliable tool for real-world agricultural use.',
    achievements: [
      '99.76% accuracy on PlantVillage dataset',
      'Deep ensemble: VGG16 + ResNet50 + ViT + Swin',
      'Efficient inference pipeline for edge deployment',
    ],
    links: {
      github: 'https://github.com/aayush010904/HaritaX',
    },
    gallery: [
      '/img/haritax2.png',
      
    ],
  },
  {
    id: 'prj-4',
    slug: 'saferoad-ai',
    title: 'Saferoad AI',
    subtitle: 'Real-Time Accident Detection',
    year: 2024,
    featured: true,
    tech: ['YOLOv8', 'OpenCV', 'Computer Vision', 'OLA Maps API'],
    cover: '/img/saferoad1.png',
    // cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=900&q=80',
    overview:
      'A real-time crash detection system analyzing CCTV footage using YOLOv8 object detection with automated emergency alerting via the OLA Maps API.',
    problem:
      'Traffic accidents often go undetected for critical minutes, especially on less-monitored stretches, delaying emergency response and costing lives.',
    solution:
      'Developed a real-time video analysis pipeline using YOLOv8 for crash frame detection from CCTV feeds, integrated with OLA Maps API for instant location-aware emergency alerts.',
    impact:
      'Enables sub-second accident detection from live CCTV streams, significantly reducing emergency response delay.',
    achievements: [
      'Real-time crash detection from CCTV feeds',
      'OLA Maps API integration for instant emergency alerts',
      'Optimized YOLOv8 pipeline for low-latency inference',
    ],
    links: {
      github: 'https://github.com/aayush010904/SaferoadAI',
    },
    gallery: [
      '/img/saferoad2.png',
    ],
  },
];

export const research = [
  {
    id: 'res-1',
    slug: 'spotify-hits-prediction',
    title: 'Cracking the Code of Spotify Hits',
    year: 2025,
    featured: true,
    domain: ['AI', 'ML', 'Data Science'],
    cover: '/img/spotify.png',
    abstract:
      'Comprehensive analysis of 40,000+ Spotify tracks using PCA-derived audio features and ensemble classification to predict hit potential with high accuracy.',
    methodology:
      'Extracted and engineered audio features from the Spotify API, applied PCA for dimensionality reduction, and trained Random Forest, Gradient Boosting, and SVM classifiers.',
    results:
      'Achieved 83.17% accuracy with Random Forest, successfully identifying key audio feature patterns that distinguish hit tracks.',
    publication: 'Under Review',
    links: {
      paper: '#',
      code: 'https://github.com/aayush010904/spotify_hits_predictor',
    },
  },
  {
    id: 'res-2',
    slug: 'deep-learning-malware-analysis',
    title: 'Deep Learning for Malware Analysis and Classification',
    year: 2025,
    featured: true,
    domain: ['AI', 'Deep Learning', 'Cybersecurity'],
    cover: '/img/malware.png',
    abstract:
      'A book chapter exploring modern deep learning approaches for automated malware detection and classification, covering CNN, RNN, and hybrid architectures.',
    methodology:
      'Surveyed and benchmarked state-of-the-art deep learning architectures applied to static and dynamic malware analysis, including feature extraction from PE headers, API call sequences, and opcode graphs.',
    results:
      'Provided a comprehensive taxonomy of DL-based malware classifiers and identified directions for future research in adversarial robustness.',
    publication: 'Book Chapter — In Press',
    links: {
      paper: '#',
    },
  },
];

export const tracks = [
  {
    id: 'trk-1',
    title: 'Latest Single',
    description: 'My newest release — give it a spin.',
    spotifyUri: 'https://open.spotify.com/embed/track/41pIXZxFAghGAwunrizgky?utm_source=generator&theme=0',
    type: 'track',
  },
  {
    id: 'trk-2',
    title: 'Latest EP',
    description: 'My latest album / EP — a full body of work.',
    spotifyUri: 'https://open.spotify.com/embed/album/5Tj54ncAzhxNDgMy43J7zU?utm_source=generator&theme=0',
    type: 'album',
  },
];

export const artistProfile = {
  name: 'Aayush Chauhan',
  spotifyUri: 'https://open.spotify.com/embed/artist/3TSz0LrqCB4Ly60OdtRslG?utm_source=generator&theme=0',
  profileUrl: 'https://open.spotify.com/artist/3TSz0LrqCB4Ly60OdtRslG',
};

export const topSuggestions = [
  { label: 'All', to: '/home' },
  { label: 'Projects', to: '/projects' },
  { label: 'Research', to: '/research' },
  { label: 'Contact', to: '/contact' },
  { label: 'Something More', to: '/other-side', accent: true },
];

/** Returns 4 random pinned items from all projects + research (shuffled per call). */
export function getPinnedLibrary() {
  const allItems = [
    ...projects.map((p) => ({
      id: `pin-prj-${p.id}`,
      title: p.title,
      subtitle: `Project · ${p.tech.slice(0, 2).join(' / ')}`,
      to: `/projects/${p.slug}`,
      cover: p.cover,
    })),
    ...research.map((r) => ({
      id: `pin-res-${r.id}`,
      title: r.title,
      subtitle: `Research · ${r.domain.slice(0, 2).join(' / ')}`,
      to: `/research/${r.slug}`,
      cover: r.cover,
    })),
  ];

  // Fisher-Yates shuffle
  for (let i = allItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allItems[i], allItems[j]] = [allItems[j], allItems[i]];
  }

  return allItems.slice(0, 4);
}
