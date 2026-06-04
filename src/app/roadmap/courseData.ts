export interface LearningItem {
  title: string;
  source: string;
}

export interface RoadmapTier {
  foundation: LearningItem[];
  skillMapping: LearningItem[];
  interestDiscovery: LearningItem[];
}

export interface ArchetypeData {
  beginner: RoadmapTier;
  intermediate: RoadmapTier;
}

export const roadmapData: Record<string, ArchetypeData> = {
  Hacker: {
    beginner: {
      foundation: [
        { title: "Introduction to Software Engineering Logic", source: "YouTube - Harvard CS50 / Khan Academy" },
        { title: "Git & Version Control Setup", source: "YouTube - Web Programming UNPAS / Pro Git Book" }
      ],
      skillMapping: [
        { title: "HTML5 & CSS3 Layouts", source: "YouTube - Web Programming UNPAS / FreeCodeCamp" },
        { title: "Tailwind CSS Essentials", source: "Official Docs - tailwindcss.com / Udemy" },
        { title: "Basic JavaScript/TypeScript", source: "Coursera - Meta Front-End Developer / Dicoding" }
      ],
      interestDiscovery: [
        { title: "Exploring Web3 Solana vs Web2 Tech", source: "YouTube - Solana Labs / Whitepapers" },
        { title: "Frontend vs Backend Paths", source: "Roadmap.sh / YouTube - TechLead" }
      ],
    },
    intermediate: {
      foundation: [
        { title: "Building Fullstack Apps with Next.js & shadcn ui", source: "Official Docs - nextjs.org / YouTube - JavaScript Mastery" },
        { title: "Database Architecture with Prisma ORM", source: "Prisma Quickstart Guide / Udemy" }
      ],
      skillMapping: [
        { title: "Industry Certification: Fullstack Developer", source: "FreeCodeCamp / Meta Professional Cert" },
        { title: "Cloud Architecture Fundamentals", source: "AWS Educate / Google Cloud Training" }
      ],
      interestDiscovery: [
        { title: "Open Source Contribution Strategy", source: "GitHub Guides / First Timers Only" },
        { title: "Discord Developer Communities", source: "Stack Overflow / Dev.to" }
      ],
    },
  },
  Hipster: {
    beginner: {
      foundation: [
        { title: "Design Thinking Methodology", source: "Coursera - Stanford Design / IDEO U" },
        { title: "UI/UX Basics & Principles", source: "Interaction Design Foundation / Nielsen Norman Group" }
      ],
      skillMapping: [
        { title: "Figma Interface Components", source: "Figma Learn Official / YouTube - DesignCourse" },
        { title: "Wireframing & Lo-Fi Prototyping", source: "Coursera - Google UX Design Certificate" },
        { title: "Color Theory Application", source: "Udemy - Graphic Design Masterclass / Interaction Design Foundation" }
      ],
      interestDiscovery: [
        { title: "Product Design vs Graphic Design Deep-dive", source: "Medium - UX Collective / Behance Case Studies" },
        { title: "Interaction Design Exploration", source: "Awwwards / Pinterest Design Boards" }
      ],
    },
    intermediate: {
      foundation: [
        { title: "Advanced Component Design Systems", source: "Figma Schema Guides / Medium Design Blogs" },
        { title: "High-Fidelity Interactive Prototyping", source: "YouTube - Flux Academy / Framer University" }
      ],
      skillMapping: [
        { title: "Industry Certification: Interaction Design", source: "Google UX Design Professional Cert" },
        { title: "User Research & Usability Testing", source: "Udemy - User Research / Hotjar Guides" }
      ],
      interestDiscovery: [
        { title: "Dribbble/Behance Portfolio Launch", source: "Creative Bloq / Adobe Live" },
        { title: "Design Critics Circle", source: "ADPList / Designer Hangout Discord" }
      ],
    },
  },
  Hustler: {
    beginner: {
      foundation: [
        { title: "Intro to Digital Marketing Frameworks", source: "YouTube - GaryVee / HubSpot Academy" },
        { title: "Brand Identity Basics", source: "Udemy - Branding Masterclass / Canva Design School" }
      ],
      skillMapping: [
        { title: "Market Research & Competitor Analysis", source: "Coursera - Wharton Digital Marketing / MySkill" },
        { title: "Social Blade & Analytics Reading", source: "Official Guides - Social Blade / YouTube Insights" },
        { title: "Basic Copywriting", source: "Udemy - Copywriting Secrets / RevoU Mini-Course" }
      ],
      interestDiscovery: [
        { title: "Growth Hacking Fundamentals", source: "Reforge / Sean Ellis Blogs" },
        { title: "Cold Outreach Channels Exploration", source: "HubSpot / Woodpecker.co Academy" }
      ],
    },
    intermediate: {
      foundation: [
        { title: "Executing Growth Hacking & Cold Outreach Campaigns", source: "Reforge Growth Series / HubSpot Academy" },
        { title: "SaaS POS Systems (Kinetix Framework)", source: "Internal Gapless Sandbox Playbook" }
      ],
      skillMapping: [
        { title: "Industry Certification: Growth Marketing", source: "CXL Institute / Google Ads Certification" },
        { title: "B2B Sales Professional", source: "LinkedIn Learning - B2B Sales" }
      ],
      interestDiscovery: [
        { title: "LinkedIn Authority Building", source: "YouTube - Justin Welsh / Ship 30 for 30" },
        { title: "SaaS Founders Networking", source: "Indie Hackers / Product Hunt Community" }
      ],
    },
  },
  Hound: {
    beginner: {
      foundation: [
        { title: "Introduction to Data Analytics & Business Intelligence", source: "YouTube - Alex The Analyst / IBM Data Science" },
        { title: "Data Governance & Ethics Basics", source: "Coursera - Data Privacy / Microsoft Ethics" }
      ],
      skillMapping: [
        { title: "Structured Query Language (SQL) Basics", source: "Coursera - Google Data Analytics / SQLBolt Interactive" },
        { title: "Data Visualization with Google Looker Studio", source: "Google Skillshop / MySkill Data Analytics" },
        { title: "Spreadsheet (Excel/Sheets) Advanced Formulas", source: "Udemy - Microsoft Excel Maven / Chandoo.org" }
      ],
      interestDiscovery: [
        { title: "Exploring Data Analyst vs Data Engineer Paths", source: "Medium - Towards Data Science / YouTube" },
        { title: "Big Data Ecosystem Overview", source: "Udemy - Big Data / Cloudera Training" }
      ],
    },
    intermediate: {
      foundation: [
        { title: "Building Interactive Dashboards with Tableau or Power BI", source: "Coursera - Data Visualization with Tableau / Microsoft Learn" },
        { title: "Exploratory Data Analysis (EDA) using Python & Pandas", source: "Kaggle Tutorials / YouTube - Corey Schafer" }
      ],
      skillMapping: [
        { title: "Industry Certification: Data Analytics (Pending Verification)", source: "Google Data Analytics Professional Certificate" },
        { title: "Statistical Analysis Fundamentals", source: "Khan Academy - Statistics / Coursera" }
      ],
      interestDiscovery: [
        { title: "Global Data Analyst Communities", source: "Kaggle / Reddit r/datascience" },
        { title: "Analytics Milestone Tracker", source: "DataCamp / DataQuest" }
      ],
    },
  },
};
