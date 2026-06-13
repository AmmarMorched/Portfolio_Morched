import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { 
  FaGithub, FaLinkedin, FaSun, FaMoon, FaGlobe
} from 'react-icons/fa';
import { 
  FiExternalLink, FiCode, FiCpu, FiTerminal, FiChevronDown, FiCpu as FiProcessor, FiDatabase, FiHardDrive, FiTool, FiServer, FiCheckCircle, FiMonitor, FiBriefcase
} from 'react-icons/fi';

// --- Translation Context ---
const LanguageContext = createContext();

const translations = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      contact: "Contact",
      resume: "Resume",
      resumeEn: "English Resume",
      resumeFr: "French Resume"
    },
    hero: {
      greeting: "Hi, my name is",
      name: "Morched Ammar.",
      tagline: "I build intelligent, real-time embedded systems.",
      description: "Firmware and Embedded AI Engineer with a track record of shipping hardware that works. I specialize in bridging the gap between low-level C/FreeRTOS firmware and Edge AI (YOLOv8, PPO), building deterministic systems for automotive, industrial IoT, and computer vision.",
      viewProjects: "View Projects",
      github: "GitHub"
    },
    skills: {
      title: "Skills",
      categories: {
        coreLanguages: "Core Languages",
        edgeEmbedded: "Edge & Embedded",
        aiMl: "AI / ML",
        protocols: "Protocols",
        hardware: "Hardware",
        tools: "Tools"
      }
    },
    experience: {
      title: "Professional Experience"
    },
    projects: {
      title: "Projects",
      inDevelopment: "In Development"
    },
    education: {
      title: "Education"
    },
    contact: {
      title: "What's Next?",
      heading: "Get In Touch",
      description: "I am currently open to new opportunities in Embedded Systems, Firmware Engineering, and Edge AI. Whether you have a question or just want to say hi, my inbox is always open!",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      messagePlaceholder: "Your message...",
      sendButton: "Send Message",
      sending: "Sending...",
      successTitle: "Message Sent!",
      successMessage: "Thank you for reaching out! I'll get back to you as soon as possible."
    },
    footer: {
      builtBy: "Designed & Built by Morched Ammar",
      location: "Ariana, Tunis | Open to Relocate & Remote"
    }
  },
  fr: {
    nav: {
      about: "À propos",
      skills: "Compétences",
      experience: "Expérience",
      projects: "Projets",
      education: "Formation",
      contact: "Contact",
      resume: "CV",
      resumeEn: "CV Anglais",
      resumeFr: "CV Français"
    },
    hero: {
      greeting: "Salut, je m'appelle",
      name: "Morched Ammar.",
      tagline: "Je construis des systèmes embarqués intelligents en temps réel.",
      description: "Ingénieur en firmware et IA embarquée avec une expérience prouvée dans la livraison de matériel fonctionnel. Je me spécialise dans le pont entre firmware C/FreeRTOS de bas niveau et IA de bord (YOLOv8, PPO), construisant des systèmes déterministes pour l'automobile, l'IoT industriel et la vision par ordinateur.",
      viewProjects: "Voir les projets",
      github: "GitHub"
    },
    skills: {
      title: "Compétences",
      categories: {
        coreLanguages: "Langages de base",
        edgeEmbedded: "Edge & Embarqué",
        aiMl: "IA / ML",
        protocols: "Protocoles",
        hardware: "Matériel",
        tools: "Outils"
      }
    },
    experience: {
      title: "Expérience Professionnelle"
    },
    projects: {
      title: "Projets",
      inDevelopment: "En Développement"
    },
    education: {
      title: "Formation"
    },
    contact: {
      title: "Quoi de neuf?",
      heading: "Contactez-moi",
      description: "Je suis actuellement ouvert à de nouvelles opportunités en systèmes embarqués, ingénierie firmware et IA de bord. Que vous ayez une question ou juste envie de dire bonjour, ma boîte de réception est toujours ouverte!",
      nameLabel: "Nom",
      emailLabel: "Email",
      messageLabel: "Message",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "votre@email.com",
      messagePlaceholder: "Votre message...",
      sendButton: "Envoyer le message",
      sending: "Envoi...",
      successTitle: "Message envoyé!",
      successMessage: "Merci de m'avoir contacté! Je vous répondrai dès que possible."
    },
    footer: {
      builtBy: "Conçu et développé par Morched Ammar",
      location: "Ariana, Tunis | Ouvert à la relocalisation et au télétravail"
    }
  },
  ar: {
    nav: {
      about: "عني",
      skills: "المهارات",
      experience: "الخبرة",
      projects: "المشاريع",
      education: "التعليم",
      contact: "اتصل",
      resume: "السيرة الذاتية",
      resumeEn: "السيرة الذاتية بالإنجليزية",
      resumeFr: "السيرة الذاتية بالفرنسية"
    },
    hero: {
      greeting: "مرحباً، اسمي",
      name: "مرشد عمار.",
      tagline: "أبني أنظمة مدمجة ذكية في الوقت الفعلي.",
      description: "مهندس برامج ثابتة وذكاء اصطناعي مدمج مع سجل حافل في تسليم أجهزة تعمل. أتخصص في سد الفجوة بين البرامج الثابتة C/FreeRTOS منخفضة المستوى والذكاء الاصطناعي على الحافة (YOLOv8, PPO)، وبناء أنظمة حتمية للسيارات، وإنترنت الأشياء الصناعي، ورؤية الكمبيوتر.",
      viewProjects: "عرض المشاريع",
      github: "GitHub"
    },
    skills: {
      title: "المهارات",
      categories: {
        coreLanguages: "اللغات الأساسية",
        edgeEmbedded: "الحافة والمدمجة",
        aiMl: "الذكاء الاصطناعي",
        protocols: "البروتوكولات",
        hardware: "الأجهزة",
        tools: "الأدوات"
      }
    },
    experience: {
      title: "الخبرة المهنية"
    },
    projects: {
      title: "المشاريع",
      inDevelopment: "قيد التطوير"
    },
    education: {
      title: "التعليم"
    },
    contact: {
      title: "ماذا بعد؟",
      heading: "تواصل معي",
      description: "أنا حالياً منفتح لفرص جديدة في الأنظمة المدمجة، وهندسة البرامج الثابتة، والذكاء الاصطناعي على الحافة. سواء كان لديك سؤال أو تريد فقط أن تقول مرحباً، صندوق الوارد الخاص بي مفتوح دائماً!",
      nameLabel: "الاسم",
      emailLabel: "البريد الإلكتروني",
      messageLabel: "الرسالة",
      namePlaceholder: "اسمك",
      emailPlaceholder: "بريدك@الإلكتروني.com",
      messagePlaceholder: "رسالتك...",
      sendButton: "إرسال الرسالة",
      sending: "جاري الإرسال...",
      successTitle: "تم إرسال الرسالة!",
      successMessage: "شكراً لتواصلك معي! سأرد عليك في أقرب وقت ممكن."
    },
    footer: {
      builtBy: "صمم وبني بواسطة مرشيد عمار",
      location: "أريانة، تونس | متاح للانتقال والعمل عن بعد"
    }
  }
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('language');
    return savedLang || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, isRTL: language === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// --- Theme Context ---
const ThemeContext = createContext();

const themes = {
  dark: {
    primary: '#0a0a0a',
    secondary: '#1a1a1a',
    text: '#e2e8f0',
    textMuted: '#94a3b8',
    accent: '#64ffda',
    accentHover: '#4ade80',
    border: '#334155'
  },
  light: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    text: '#1e293b',
    textMuted: '#64748b',
    accent: '#059669',
    accentHover: '#047857',
    border: '#e2e8f0'
  }
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// --- Data from Resume ---
const experiences = {
  en: [
    {
      title: "Final Year Intern - Mobile app development",
      company: "Capgemini",
      date: "Feb 2025 - Aug 2025",
      points: [
        "Built a Flutter/Dart OBD-II client supporting 6 real-time PIDs (RPM, speed, coolant temp, etc.) with live data streaming from real ECUs.",
        "Developed a Flask-based ECU simulator capable of injecting, reading, and clearing active/pending DTC fault codes, validated with 100% retrieval accuracy.",
        "Integrated a Wi-Fi/TCP-IP telemetry extraction pipeline tested on real ECUs using an ELM327 hardware dongle."
      ]
    },
    {
      title: "Embedded Systems Intern",
      company: "Sofrecom",
      date: "Jul 2024 - Aug 2024",
      points: [
        "Developed a REST API leveraging the 51Degrees device detection engine to identify smartphone models and retrieve 14 environmental sustainability metrics.",
        "Built a Raspberry Pi backend that processed 14-parameter sustainability profiles and transmitted structured data to an ESP8266 over Wi-Fi."
      ]
    }
  ],
  fr: [
    {
      title: "Stagiaire de dernière année - Développement d'applications mobiles",
      company: "Capgemini",
      date: "Fév 2025 - Août 2025",
      points: [
        "Développé un client OBD-II Flutter/Dart supportant 6 PID en temps réel (RPM, vitesse, température du liquide de refroidissement, etc.) avec diffusion de données en direct à partir d'ECU réels.",
        "Développé un simulateur ECU basé sur Flask capable d'injecter, de lire et d'effacer les codes de défaut DTC actifs/en attente, validé avec une précision de récupération de 100%.",
        "Intégré un pipeline d'extraction de télémétrie Wi-Fi/TCP-IP testé sur des ECU réels à l'aide d'un dongle matériel ELM327."
      ]
    },
    {
      title: "Stagiaire en Systèmes Embarqués",
      company: "Sofrecom",
      date: "Juil 2024 - Août 2024",
      points: [
        "Développé une API REST exploitant le moteur de détection d'appareils 51Degrees pour identifier les modèles de smartphones et récupérer 14 métriques de durabilité environnementale.",
        "Construit un backend Raspberry Pi qui a traité des profils de durabilité à 14 paramètres et transmis des données structurées à un ESP8266 via Wi-Fi."
      ]
    }
  ],
  ar: [
    {
      title: "متدرب سنة نهائية - تطوير تطبيقات الجوال",
      company: "كابجيميني",
      date: "فبراير 2025 - أغسطس 2025",
      points: [
      "تطوير عميل OBD-II باستخدام Flutter/Dart يدعم 6 معلمات PID في الوقت الحقيقي (عدد دورات المحرك، السرعة، درجة حرارة سائل التبريد، وغيرها) مع تدفق بيانات مباشر من وحدات ECU فعلية.",
      "تصميم وتنفيذ محاكي ECU باستخدام Flask يتيح حقن وقراءة ومسح أكواد الأعطال التشخيصية (DTC) النشطة والمعلقة، مع تحقيق دقة استرجاع تصل إلى 100%.",
      "دمج واختبار خط معالجة بيانات عبر بروتوكولي Wi-Fi وTCP/IP مع وحدات ECU حقيقية باستخدام جهاز ELM327."
    ]
    },
    {
      title: "متدرب في الأنظمة المدمجة",
      company: "سوفريكوم",
      date: "يوليو 2024 - أغسطس 2024",
      points: [
      "تطوير واجهة برمجة تطبيقات REST تعتمد على محرك اكتشاف الأجهزة 51Degrees لتحديد نماذج الهواتف الذكية واستخراج 14 مؤشرًا خاصًا بالاستدامة البيئية.",
      "تصميم خلفية تعمل على Raspberry Pi لمعالجة بيانات الاستدامة وإعادة هيكلتها قبل إرسالها إلى وحدة ESP8266 عبر شبكة Wi-Fi."
    ]
    }
  ]
};

const projects = {
  en: [
    {
      title: "TrafficOS: Deep RL Intersection Controller",
      date: "Feb 2026 - Mar 2026",
      desc: "Engineered a custom OpenAI Gymnasium environment. Trained a PPO agent achieving a 30-35% reduction in average vehicle wait time. Exported policy to ONNX for edge deployment on Raspberry Pi 5.",
      tech: ["Python", "Stable Baselines3", "ONNX", "Raspberry Pi"],
      icon: <FiCpu className="w-8 h-8 text-accent" />,
      linkedin: "https://linkedin.com/posts/your-linkedin-post-1",
      github: "https://github.com/AmmarMorched/Deep-RL-Traffic-Control.git"
    },
    {
      title: "FreeRTOS Smart Sensor Monitor",
      date: "Jan 2026",
      desc: "Architected a 3-task FreeRTOS system on ESP32 using a producer-consumer queue pipeline. Engineered threshold-based alert logic triggering outputs within a single scheduler tick.",
      tech: ["C", "FreeRTOS", "ESP32", "MQTT"],
      icon: <FiCpu className="w-8 h-8 text-accent" />,
      linkedin: "https://linkedin.com/posts/your-linkedin-post-2",
      github: "https://github.com/AmmarMorched/Smart-Sensor-Monitor-using-ESP32-FreeRTOS-Wokwi-Simulation-.git"
    },
    {
      title: "Padel Player Tracking (CV & IoT)",
      date: "Mar 2024 - May 2024",
      desc: "Deployed a YOLOv8 model achieving ~80% detection accuracy at ~40 FPS on Raspberry Pi. Implemented multi-source fusion synchronizing piezoelectric impact events with vision tracking.",
      tech: ["YOLOv8", "OpenCV", "Raspberry Pi", "C++"],
      icon: <FiCode className="w-8 h-8 text-accent" />,
      linkedin: "https://linkedin.com/posts/your-linkedin-post-3",
      github: "https://github.com/AmmarMorched/Padel_Players_Traking.git"
    },
    {
      title: "IoT Energy Monitoring System",
      date: "Jan 2024",
      desc: "Engineered modular embedded firmware in C on STM32F407VG managing 3 sensors across I2C/SPI with a layered driver architecture enabling sensor hot-swapping without core changes.",
      tech: ["Embedded C", "STM32", "I2C/SPI", "MQTT"],
      icon: <FiCpu className="w-8 h-8 text-accent" />,
      linkedin: "https://linkedin.com/posts/your-linkedin-post-4",
      github: "https://github.com/AmmarMorched/STM32_EnergyMonitor_IoT.git"
    },
    {
      title: "CI/CD Pipeline & Observability System",
      date: "Dec 2023",
      desc: "Architected a full CI/CD platform for a Spring Boot system using Jenkins and GitHub, enabling automated build, test, and delivery pipelines across the entire development lifecycle. Implemented a robust quality and security workflow integrating JUnit, Mockito, and SonarQube (SAST), enforcing continuous testing and code governance at every commit. Designed a fully containerized DevOps stack with Docker, Nexus, Prometheus, and Grafana, enabling scalable artifact management, observability, and reproducible deployments.",
      tech: ["Spring Boot", "Jenkins", "GitHub", "JUnit", "Mockito", "SonarQube", "Docker", "Nexus", "Prometheus", "Grafana"],
      icon: <FiCpu className="w-8 h-8 text-accent" />,
      linkedin: "https://linkedin.com/posts/your-linkedin-post-5",
      github: "https://github.com/AmmarMorched"
    },
    {
      title: "Learning Management System (LMS) – Full-Stack Platform",
      date: "In Development",
      status: "active",
      desc: "Currently developing a scalable Learning Management System designed to support end-to-end digital education workflows for students and instructors. The platform focuses on a modular architecture with a React-based student interface and a Spring Boot backend connected to a PostgreSQL database for structured data management. The system already integrates Cloudflare for media and asset storage, ensuring efficient and secure content delivery. Ongoing development focuses on enhancing the student experience and expanding core platform capabilities. Upcoming features include real-time live learning sessions using Jitsi integration, as well as a secure payment system to support premium courses and subscriptions, moving the platform toward a full SaaS-based e-learning solution.",
      tech: ["React", "Spring Boot", "PostgreSQL", "Cloudflare", "Jitsi", "Payment Systems"],
      icon: <FiCpu className="w-8 h-8 text-accent" />,
      linkedin: "https://linkedin.com/posts/your-linkedin-post-6",
      github: "https://github.com/AmmarMorched"
    }
  ],
  fr: [
    {
      title: "TrafficOS: Contrôleur d'Intersection RL Profond",
      date: "Fév 2026 - Mar 2026",
      desc: "Conçu un environnement personnalisé OpenAI Gymnasium. Entraîné un agent PPO atteignant une réduction de 30-35% du temps d'attente moyen des véhicules. Exporté la politique vers ONNX pour le déploiement sur Raspberry Pi 5.",
      tech: ["Python", "Stable Baselines3", "ONNX", "Raspberry Pi"],
      icon: <FiCpu className="w-8 h-8 text-accent" />,
      linkedin: "https://linkedin.com/posts/your-linkedin-post-1",
      github: "https://github.com/AmmarMorched/Deep-RL-Traffic-Control.git"
    },
    {
      title: "Moniteur de Capteur Intelligent FreeRTOS",
      date: "Jan 2026",
      desc: "Conçu un système FreeRTOS à 3 tâches sur ESP32 utilisant un pipeline de file producteur-consommateur. Conçu une logique d'alerte basée sur des seuils déclenchant des sorties dans un seul tick du planificateur.",
      tech: ["C", "FreeRTOS", "ESP32", "MQTT"],
      icon: <FiCpu className="w-8 h-8 text-accent" />,
      linkedin: "https://linkedin.com/posts/your-linkedin-post-2",
      github: "https://github.com/AmmarMorched/Smart-Sensor-Monitor-using-ESP32-FreeRTOS-Wokwi-Simulation-.git"
    },
    {
      title: "Suivi des Joueurs de Padel (CV & IoT)",
      date: "Mar 2024 - Mai 2024",
      desc: "Déployé un modèle YOLOv8 atteignant ~80% de précision de détection à ~40 FPS sur Raspberry Pi. Implémenté une fusion multi-source synchronisant les événements d'impact piézoélectriques avec le suivi visuel.",
      tech: ["YOLOv8", "OpenCV", "Raspberry Pi", "C++"],
      icon: <FiCode className="w-8 h-8 text-accent" />,
      linkedin: "https://linkedin.com/posts/your-linkedin-post-3",
      github: "https://github.com/AmmarMorched/Padel_Players_Traking.git"
    },
    {
      title: "Système de Surveillance d'Énergie IoT",
      date: "Jan 2024",
      desc: "Conçu un micrologiciel embarqué modulaire en C sur STM32F407VG gérant 3 capteurs sur I2C/SPI avec une architecture de pilotes en couches permettant le remplacement à chaud des capteurs sans modifications du noyau.",
      tech: ["Embedded C", "STM32", "I2C/SPI", "MQTT"],
      icon: <FiCpu className="w-8 h-8 text-accent" />,
      linkedin: "https://linkedin.com/posts/your-linkedin-post-4",
      github: "https://github.com/AmmarMorched/STM32_EnergyMonitor_IoT.git"
    },
    {
      title: "Pipeline CI/CD et Système d'Observabilité",
      date: "Déc 2023",
      desc: "Conçu une plateforme CI/CD complète pour un système Spring Boot utilisant Jenkins et GitHub, permettant des pipelines de construction, de test et de livraison automatisés sur tout le cycle de développement. Implémenté un workflow de qualité et de sécurité robuste intégrant JUnit, Mockito et SonarQube (SAST), appliquant des tests continus et une gouvernance du code à chaque commit. Conçu une pile DevOps entièrement conteneurisée avec Docker, Nexus, Prometheus et Grafana, permettant une gestion d'artefacts évolutive, une observabilité et des déploiements reproductibles.",
      tech: ["Spring Boot", "Jenkins", "GitHub", "JUnit", "Mockito", "SonarQube", "Docker", "Nexus", "Prometheus", "Grafana"],
      icon: <FiCpu className="w-8 h-8 text-accent" />,
      linkedin: "https://linkedin.com/posts/your-linkedin-post-5",
      github: "https://github.com/AmmarMorched"
    },
    {
      title: "Système de Gestion de l'Apprentissage (LMS) – Plateforme Full-Stack",
      date: "En Développement",
      status: "active",
      desc: "Développement actuel d'un système de gestion de l'apprentissage évolutif conçu pour soutenir les flux de travail d'éducation numérique de bout en bout pour les étudiants et les instructeurs. La plateforme se concentre sur une architecture modulaire avec une interface étudiante basée sur React et un backend Spring Boot connecté à une base de données PostgreSQL pour la gestion structurée des données. Le système intègre déjà Cloudflare pour le stockage de médias et d'actifs, assurant une livraison de contenu efficace et sécurisée. Le développement en cours se concentre sur l'amélioration de l'expérience étudiante et l'expansion des capacités de base de la plateforme. Les fonctionnalités à venir incluent des sessions d'apprentissage en direct en temps réel avec l'intégration Jitsi, ainsi qu'un système de paiement sécurisé pour soutenir les cours et abonnements premium, faisant passer la plateforme vers une solution d'apprentissage en ligne SaaS complète.",
      tech: ["React", "Spring Boot", "PostgreSQL", "Cloudflare", "Jitsi", "Systèmes de Paiement"],
      icon: <FiCpu className="w-8 h-8 text-accent" />,
      linkedin: "https://linkedin.com/posts/your-linkedin-post-6",
      github: "https://github.com/AmmarMorched"
    }
  ],
  ar: [
    {
      title: "TrafficOS: وحدة تحكم تقاطع بالتعلم العميق",
      date: "فبراير 2026 - مارس 2026",
      desc: "صمم بيئة مخصصة OpenAI Gymnasium. درب وكيل PPO حقق تقليل 30-35% في متوسط وقت انتظار المركبات. صدّر السياسة إلى ONNX للنشر على Raspberry Pi 5.",
      tech: ["Python", "Stable Baselines3", "ONNX", "Raspberry Pi"],
      icon: <FiCpu className="w-8 h-8 text-accent" />,
      linkedin: "https://linkedin.com/posts/your-linkedin-post-1",
      github: "https://github.com/AmmarMorched/Deep-RL-Traffic-Control.git"
    },
    {
      title: "مراقب مستشعر ذكي FreeRTOS",
      date: "يناير 2026",
      desc: "صمم نظام FreeRTOS بـ 3 مهام على ESP32 باستخدام خط أنابيب قائمة المنتج-المستهلك. صمم منطق تنبيه يعتمد على العتبات يطلق مخرجات داخل علامة جدولة واحدة.",
      tech: ["C", "FreeRTOS", "ESP32", "MQTT"],
      icon: <FiCpu className="w-8 h-8 text-accent" />,
      linkedin: "https://linkedin.com/posts/your-linkedin-post-2",
      github: "https://github.com/AmmarMorched/Smart-Sensor-Monitor-using-ESP32-FreeRTOS-Wokwi-Simulation-.git"
    },
    {
      title: "تتبع لاعبي البادل (الرؤية الحاسوبية وإنترنت الأشياء)",
      date: "مارس 2024 - مايو 2024",
      desc: "نشر نموذج YOLOv8 حقق دقة كشف ~80% عند ~40 FPS على Raspberry Pi. نفد دمجًا متعدد المصادر يزامن أحداث التأثير الكهروضغطية مع التتبع البصري.",
      tech: ["YOLOv8", "OpenCV", "Raspberry Pi", "C++"],
      icon: <FiCode className="w-8 h-8 text-accent" />,
      linkedin: "https://linkedin.com/posts/your-linkedin-post-3",
      github: "https://github.com/AmmarMorched/Padel_Players_Traking.git"
    },
    {
      title: "نظام مراقبة الطاقة IoT",
      date: "يناير 2024",
      desc: "صمم برامج ثابتة مدمجة معيارية في C على STM32F407VG تدير 3 مستشعرات عبر I2C/SPI مع بنية سائق متعددة الطبقات تتيح استبدال المستشعرات دون تغييرات في النواة.",
      tech: ["Embedded C", "STM32", "I2C/SPI", "MQTT"],
      icon: <FiCpu className="w-8 h-8 text-accent" />,
      linkedin: "https://linkedin.com/posts/your-linkedin-post-4",
      github: "https://github.com/AmmarMorched/STM32_EnergyMonitor_IoT.git"
    },
    {
      title: "خط أنابيب CI/CD ونظام المراقبة",
      date: "ديسمبر 2023",
      desc: "صمم منصة CI/CD كاملة لنظام Spring Boot باستخدام Jenkins وGitHub، مما يتيح خطوط أنابيب آلية للبناء والاختبار والتسليم عبر دورة التطوير بأكملها. نفذ سير عمل قوي للجودة والأمان يدمج JUnit وMockito وSonarQube (SAST)، مما يفرز الاختبارات المستمرة وحوكمة الكود في كل التزام. صمم مكدس DevOps بالكامل في حاويات مع Docker وNexus وPrometheus وGrafana، مما يتيح إدارة الملفات القابلة للتطوير والمراقبة والنشر القابل للتكرار.",
      tech: ["Spring Boot", "Jenkins", "GitHub", "JUnit", "Mockito", "SonarQube", "Docker", "Nexus", "Prometheus", "Grafana"],
      icon: <FiCpu className="w-8 h-8 text-accent" />,
      linkedin: "https://linkedin.com/posts/your-linkedin-post-5",
      github: "https://github.com/AmmarMorched"
    },
    {
      title: "نظام إدارة التعلم (LMS) – منصة Full-Stack",
      date: "قيد التطوير",
      status: "active",
      desc: "التطوير الحالي لنظام إدارة تعلم قابل للتوسع مصمم لدعم سير عمل التعليم الرقمي من البداية إلى النهاية للطلاب والمعلمين. تركز المنصة على بنية معيارية مع واجهة طالب قائمة على React وbackend Spring Boot متصل بقاعدة بيانات PostgreSQL لإدارة البيانات المنظمة. يدمج النظام بالفعل Cloudflare لتخزين الوسائط والأصول، مما يضمن تسليم محتوى فعال وآمن. يركز التطوير الجاري على تحسين تجربة الطالب وتوسيع قدرات المنصة الأساسية. تشمل الميزات القادمة جلسات تعلم مباشرة في الوقت الفعلي مع تكامل Jitsi، بالإضافة إلى نظام دفع آمن لدعم الدورات والاشتراكات المميزة، مما ينقل المنصة نحو حل تعليم إلكتروني SaaS كامل.",
      tech: ["React", "Spring Boot", "PostgreSQL", "Cloudflare", "Jitsi", "أنظمة الدفع"],
      icon: <FiCpu className="w-8 h-8 text-accent" />,
      linkedin: "https://linkedin.com/posts/your-linkedin-post-6",
      github: "https://github.com/AmmarMorched"
    }
  ]
};

const education = {
  en: [
    {
      degree: "Engineering degree in Computer Science",
      school: "ESPRIT – Private Higher School of Engineering and Technology",
      date: "Sep 2022 - Oct 2025"
    },
    {
      degree: "Bachelor's degree in electronics and automation",
      school: "ISGIS - Higher Institute of Industrial Management",
      date: "Sep 2018 - May 2022"
    }
  ],
  fr: [
    {
      degree: "Diplôme d'ingénieur en informatique",
      school: "ESPRIT – École Privée d'Ingénieurs et de Technologies",
      date: "Sep 2022 - Oct 2025"
    },
    {
      degree: "Licence en électronique et automatique",
      school: "ISGIS - Institut Supérieur de Gestion Industrielle",
      date: "Sep 2018 - Mai 2022"
    }
  ],
  ar: [
    {
      degree: "شهادة هندسة في علوم الحاسوب",
      school: "ESPRIT – المدرسة الخاصة للهندسة والتكنولوجيا",
      date: "سبتمبر 2022 - أكتوبر 2025"
    },
    {
      degree: "إجازة في الإلكترونيات والتحكم الآلي",
      school: "ISGIS - المعهد العالي للإدارة الصناعية",
      date: "سبتمبر 2018 - مايو 2022"
    }
  ]
};

const skills = {
  "Core Languages": ["C", "Embedded C", "C++", "Python", "Java", "JavaScript"],
  "Frontend": ["React", "Flutter/Dart"],
  "Backend": ["Spring Boot", "Flask", "ExpressJS"],
  "Databases": ["MySQL", "PostgreSQL", "MongoDB"],
  "Edge & Embedded": ["STM32", "ESP32", "Raspberry Pi", "FreeRTOS", "Embedded Linux", "ONNX Runtime"],
  "AI / ML": ["Deep RL (PPO/SB3)", "YOLOv8", "MediaPipe", "OpenCV", "Gymnasium"],
  "DevOps & CI/CD": ["Jenkins", "GitHub Actions", "Docker", "Nexus", "Prometheus", "Grafana", "Cloudflare"],
  "Testing": ["JUnit", "Mockito", "SonarQube"],
  "Protocols": ["I2C", "SPI", "UART", "CAN", "OBD-II", "MQTT", "BLE", "Wi-Fi", "TCP/IP"],
  "Hardware": ["PCB Design (EasyEDA, Altium)", "sensor integration"],
  "Tools": ["Git", "STM32CubeIDE", "Arduino IDE", "VS Code", "Jitsi", "Payment Systems"]
};

const categoryIcons = {
  "Core Languages": FiCode,
  "Frontend": FiMonitor,
  "Backend": FiServer,
  "Databases": FiDatabase,
  "Edge & Embedded": FiProcessor,
  "AI / ML": FiCpu,
  "DevOps & CI/CD": FiCpu,
  "Testing": FiCheckCircle,
  "Protocols": FiDatabase,
  "Hardware": FiHardDrive,
  "Tools": FiTool
};

// --- Components ---

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'AR' }
  ];

  return (
    <nav className="fixed top-0 w-full bg-primary/90 backdrop-blur-md border-b border-slate-800 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-mono text-accent font-bold text-xl">MA.</a>
        <div className="hidden md:flex gap-8 font-mono text-sm text-text-muted">
          <a href="#hero" className="hover:text-accent transition-colors">
            <span className="text-accent mr-1">01.</span>{t('nav.about')}
          </a>
          <a href="#about" className="hover:text-accent transition-colors">
            <span className="text-accent mr-1">02.</span>{t('nav.skills')}
          </a>
          <a href="#experience" className="hover:text-accent transition-colors">
            <span className="text-accent mr-1">03.</span>{t('nav.experience')}
          </a>
          <a href="#education" className="hover:text-accent transition-colors">
            <span className="text-accent mr-1">04.</span>{t('nav.education')}
          </a>
          <a href="#projects" className="hover:text-accent transition-colors">
            <span className="text-accent mr-1">05.</span>{t('nav.projects')}
          </a>
          <a href="#contact" className="hover:text-accent transition-colors">
            <span className="text-accent mr-1">06.</span>{t('nav.contact')}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                  language === lang.code
                    ? 'bg-accent text-primary'
                    : 'text-text-muted hover:text-accent'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded border border-accent text-accent transition-colors hover:opacity-80"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
          <div className="relative">
            <button
              onClick={() => setResumeDropdownOpen(!resumeDropdownOpen)}
              className="px-4 py-2 border border-accent text-accent rounded font-mono text-sm hover:bg-accent/10 transition-all"
            >
              {t('nav.resume')}
            </button>
            {resumeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-secondary border border-slate-700 rounded shadow-lg">
                <a
                  href="/resume-en.pdf"
                  download
                  className="block px-4 py-2 text-text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                  onClick={() => setResumeDropdownOpen(false)}
                >
                  {t('nav.resumeEn')}
                </a>
                <a
                  href="/resume-fr.pdf"
                  download
                  className="block px-4 py-2 text-text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                  onClick={() => setResumeDropdownOpen(false)}
                >
                  {t('nav.resumeFr')}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 px-6">
      <div className="max-w-4xl w-full">
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="font-mono text-accent mb-4"
        >
          {t('hero.greeting')}
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold text-text mb-4"
        >
          {t('hero.name')}
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="text-3xl md:text-5xl font-bold text-text-muted mb-6"
        >
          {t('hero.tagline')}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="text-text-muted text-lg max-w-2xl mb-10 leading-relaxed"
        >
          {t('hero.description')}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="flex gap-4"
        >
          <a href="#projects" className="px-6 py-3 bg-accent text-primary font-bold rounded hover:bg-accent-hover transition-colors">
            {t('hero.viewProjects')}
          </a>
          <a href="https://github.com/AmmarMorched" target="_blank" rel="noreferrer" className="px-6 py-3 border border-text-muted text-text rounded font-mono hover:border-accent hover:text-accent transition-colors flex items-center gap-2">
            <FaGithub size={18} /> {t('hero.github')}
          </a>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-text-muted"
        >
          <FiChevronDown size={32} />
        </motion.div>
      </div>
    </section>
  );
};

const SectionHeading = ({ number, title }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-text mb-12 flex items-center gap-4">
    <span className="font-mono text-accent text-xl">{number}.</span>
    {title}
    <span className="h-px bg-slate-700 flex-grow max-w-xs"></span>
  </h2>
);

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading number="02" title={t('skills.title')} />
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
      >
        {Object.entries(skills).map(([category, items]) => (
          <motion.div key={category} variants={fadeInUp} className="bg-secondary p-6 rounded-lg border border-slate-700 hover:border-accent/50 transition-colors">
            <h3 className="font-mono text-accent mb-4 flex items-center gap-2">
              <FiTerminal size={18} /> {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-primary text-text-muted text-sm rounded border border-slate-700 hover:border-accent hover:text-accent transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const Experience = () => {
  const { t, language } = useLanguage();

  return (
    <section id="experience" className="py-24 px-6 max-w-4xl mx-auto">
      <SectionHeading number="03" title={t('experience.title')} />
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-12"
      >
        {experiences[language].map((exp, index) => (
          <motion.div key={index} variants={fadeInUp} className="relative pl-8 border-l-2 border-slate-700 hover:border-accent transition-colors group">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-700 group-hover:bg-accent transition-colors"></div>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
              <h3 className="text-xl font-bold text-text">
                {exp.title} <span className="text-accent">@ {exp.company}</span>
              </h3>
              <span className="font-mono text-sm text-text-muted mt-1 md:mt-0">{exp.date}</span>
            </div>
            <ul className="space-y-3 mt-4">
              {exp.points.map((point, i) => (
                <li key={i} className="text-text-muted flex items-start gap-3">
                  <span className="text-accent mt-1.5">▹</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const Education = () => {
  const { t, language } = useLanguage();

  return (
    <section id="education" className="py-24 px-6 max-w-4xl mx-auto">
      <SectionHeading number="04" title={t('education.title')} />
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-12"
      >
        {education[language].map((edu, index) => (
          <motion.div key={index} variants={fadeInUp} className="relative pl-8 border-l-2 border-slate-700 hover:border-accent transition-colors group">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-700 group-hover:bg-accent transition-colors"></div>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
              <h3 className="text-xl font-bold text-text">
                {edu.degree}
              </h3>
              <span className="font-mono text-sm text-text-muted mt-1 md:mt-0">{edu.date}</span>
            </div>
            <p className="text-text-muted mt-2">{edu.school}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const Projects = () => {
  const { t, language } = useLanguage();

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading number="05" title={t('projects.title')} />
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {projects[language].map((project, index) => (
          <motion.div 
            key={index} 
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            className="bg-secondary p-8 rounded-lg border border-slate-700 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-primary rounded-lg border border-slate-700">
                {project.icon}
              </div>
              <div className="flex gap-4 text-text-muted">
                <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors"><FaGithub size={20} /></a>
              </div>
            </div>
            <h3 className="text-xl font-bold text-text mb-2 group-hover:text-accent">{project.title}</h3>
            <div className="flex items-center gap-3 mb-4">
              <p className="font-mono text-xs text-accent">{project.date}</p>
              {project.status === 'active' && (
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs font-mono rounded border border-green-500/30">
                  {t('projects.inDevelopment')}
                </span>
              )}
            </div>
            <p className="text-text-muted mb-6 flex-grow leading-relaxed">
              {project.desc}
            </p>
            <div className="flex flex-wrap gap-3 mt-auto">
              {project.tech.map((tech) => (
                <span key={tech} className="font-mono text-xs text-text-muted">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const Contact = () => {
  const { t } = useLanguage();
  const [state, handleSubmit] = useForm("mzdqkgbn");

  if (state.succeeded) {
    return (
      <section id="contact" className="py-32 px-6 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-accent mb-4">06. {t('contact.title')}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">{t('contact.successTitle')}</h2>
          <p className="text-text-muted text-lg mb-10 leading-relaxed">
            {t('contact.successMessage')}
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-32 px-6 max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-accent mb-4">05. {t('contact.title')}</p>
        <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">{t('contact.heading')}</h2>
        <p className="text-text-muted text-lg mb-10 leading-relaxed">
          {t('contact.description')}
        </p>
        <form onSubmit={handleSubmit} className="text-left space-y-4">
          <div>
            <label htmlFor="name" className="block font-mono text-accent text-sm mb-2">{t('contact.nameLabel')}</label>
            <input
              id="name"
              type="text"
              name="name"
              className="w-full px-4 py-3 bg-primary text-text rounded border border-slate-700 focus:border-accent focus:outline-none transition-colors"
              placeholder={t('contact.namePlaceholder')}
              required
            />
            <ValidationError prefix={t('contact.nameLabel')} field="name" errors={state.errors} />
          </div>
          <div>
            <label htmlFor="email" className="block font-mono text-accent text-sm mb-2">{t('contact.emailLabel')}</label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full px-4 py-3 bg-primary text-text rounded border border-slate-700 focus:border-accent focus:outline-none transition-colors"
              placeholder={t('contact.emailPlaceholder')}
              required
            />
            <ValidationError prefix={t('contact.emailLabel')} field="email" errors={state.errors} />
          </div>
          <div>
            <label htmlFor="message" className="block font-mono text-accent text-sm mb-2">{t('contact.messageLabel')}</label>
            <textarea
              id="message"
              name="message"
              className="w-full px-4 py-3 bg-primary text-text rounded border border-slate-700 focus:border-accent focus:outline-none transition-colors resize-none"
              rows="5"
              placeholder={t('contact.messagePlaceholder')}
              required
            />
            <ValidationError prefix={t('contact.messageLabel')} field="message" errors={state.errors} />
          </div>
          <button
            type="submit"
            disabled={state.submitting}
            className="w-full px-8 py-4 border border-accent text-accent font-mono rounded hover:bg-accent/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state.submitting ? t('contact.sending') : t('contact.sendButton')}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-8 text-center text-text-muted font-mono text-sm">
      <div className="flex justify-center gap-6 mb-4">
        <a href="https://www.linkedin.com/in/morched-ammar-805407197/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors"><FaLinkedin size={20} /></a>
        <a href="https://github.com/AmmarMorched" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors"><FaGithub size={20} /></a>
        <a href="https://www.upwork.com/freelancers/~0195bd19ed2b85beed" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors"><FiBriefcase size={20} /></a>
      </div>
      <p>{t('footer.builtBy')}</p>
      <p className="mt-2 text-xs text-slate-600">{t('footer.location')}</p>
    </footer>
  );
};

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="bg-primary min-h-screen text-text selection:bg-accent/30 selection:text-accent">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Experience />
            <Education />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;