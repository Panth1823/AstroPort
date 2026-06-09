import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
export const DATA = {
  name: "Panth Shah",
  initials: "PS",
  url: "https://dillion.io",
  location: "Vadodara, India",
  locationLink: "https://www.google.com/maps/place/vadodara",
  description:
    "Frontend Developer and Builder. I love building things explore new and evolving tech. Always a geek.",
  summary:
    "I’m a BTech CSE grad and a curious front-end developer who loves turning ideas into impactful apps. I’m passionate about creating user-friendly solutions, constantly learning, and growing with every project. I love building stuff and am always looking for new ideas to work on!",
  avatarUrl: "/me.jpg",
  skills: [
    "Html",
    "Css",
    "Javascript",
    "React",
    "TypeScript",
    "Node.js",
    "Postgres",
    "PostgreSQL",
    "TailwindCSS",
    "Firebase",
    "Strapi",
    "Git",
    "Shadcn",
    "Webflow",
    "Supabase",
    "OpenAI",
    "N8N",
    "Voiceflow",
    "Cloudflare Workers",
    "Railway",
    "Vercel",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "panthshah242@gmail.com",
    tel: "+919104778455",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Panth1823",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/panth1823/",
        icon: Icons.linkedin,

        navbar: true,
      },
      n8n: {
        name: "n8n",
        url: "https://n8n.io/creators/panth1823/",
        icon: Icons.n8n,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/panth1823",
        icon: Icons.x,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:panthshah242@gmail.com",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "THINKSAGE",
      href: "https://www.thinksage.in",
      badges: [],
      location: "Remote",
      title: "Web Design & Development Intern",
      logoUrl: "",
      start: "2025",
      end: "Present",
      description: `
        • Expanded skills to no-code development platforms including Webflow, Lovable, and Bolt, streamlining the design-to-development workflow and accelerating project delivery.
        • Designed visually appealing elements to optimize user experience, focusing on intuitive navigation and aesthetic design principles.
        • Performed A/B testing on landing pages and user interfaces, analyzing user behavior metrics to improve conversion rates and overall user engagement by 25%.
      `,
    },
    {
      company: "INFI BRANDING SOLUTIONS",
      href: "#",
      badges: [],
      location: "Remote",
      title: "Workflow Automation & AI Intern",
      logoUrl: "",
      start: "May 2025",
      end: "June 2025",
      description: `
        • Experimented with AI automation workflows using N8N and Voiceflow, integrating tools like Supabase, OpenAI LLM models, Postgres, WhatsApp API, and various other nodes.
        • Leveraged Supabase and Postgres to store user interactions, enabling persistent chat memory and RAG embeddings.
        • Developed context-aware responses using RAG agents and embedding-based retrieval systems to improve the relevance of automated outputs.
      `,
    },
    {
      company: "Koios Engineering Solutions",
      href: "https://koiosengg.com/",
      badges: [],
      location: "Remote",
      title: "Front-End Developer Intern",
      logoUrl: "",
      start: "March",
      end: "August 2024",
      description: `
        • Engineered responsive websites using React, HTML, CSS, and JavaScript, resulting in a 35% increase in user engagement.
        • Introduced version control strategies with Git, boosting team collaboration efficiency by 40% and reducing bug resolution time by 25%.
        • Integrated UI and animation libraries like shadcn to enhance website functionality and aesthetics, leading to a 50% increase in client satisfaction.
      `,
    },
  ],
  education: [
    {
      school: "Parul University",
      href: "https://www.paruluniversity.ac.in/",
      degree: "Computer Science and Engineering (AI)",
      logoUrl: "/buildspace.jpg",
      start: "2020",
      end: "2024",
    },
    {
      school: "Sarvamangal School",
      href: "https://www.justdial.com/Vadodara/Sarwa-Mangal-School-Behind-Bright-Cbse-Unit-Near-Airport-Harni/0265PX265-X265-160614142457-T2V6_BZDET",
      degree: "HSC/SSC (PCM)",
      logoUrl: "/waterloo.png",
      start: "2018",
      end: "2020",
    },
  ],
  projects: [
    {
      title: "ShareSave",
      href: "https://sharesave-six.vercel.app",
      dates: "2026",
      active: true,
      description:
        "A personal content library that turns passive bookmarking into active knowledge. ShareSave captures why something matters, adds intent, tags, previews, and lifecycle tracking, and keeps saved links useful instead of forgotten.",
      technologies: [
        "Next.js",
        "Tailwind CSS",
        "Drizzle ORM",
        "Supabase",
        "Better Auth",
        "Framer Motion",
      ],
      links: [
        {
          type: "Website",
          href: "https://sharesave-six.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Panth1823/sharesave",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Formula1 MCP Server",
      href: "#",
      dates: "2025",
      active: true,
      description:
        "Designed F1 API endpoints for telemetry and race data, expanding coverage by 80%. Integrated data pipeline connecting F1 championship, circuit, and weather monitoring data. Leveraged MCP SDK caching and rate limiting to reduce average API latency.",
      technologies: [
        "TypeScript",
        "FastF1 API",
        "OpenF1 API",
        "WebSockets",
        "Git",
        "MCP SDK",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Panth1823/formula1-mcp",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "FlashGenie",
      href: "https://flashgenie.vercel.app/",
      dates: "2024",
      active: true,
      description:
        "Created an AI-powered flashcard generator for text processing and image-to-text conversion. Enabled users to upload text or images and dynamically generate study flashcards. Launched application on Vercel, optimizing server performance and slashing page load times by 15%, enhancing user experience and boosting engagement by 20%.",
      technologies: [
        "ReactJS",
        "TailwindCSS",
        "Shadcn",
        "Cloudflare Workers",
        "Mistral 7B",
        "Gemini 1.5",
      ],
      links: [
        {
          type: "Website",
          href: "https://flashgenie.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Panth1823/FlashGenie",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://res.cloudinary.com/desqrxm8d/video/upload/v1734353805/16.12.2024_18.11.57_REC_lttl0p.mp4",
    },
    {
      title: "Cartopia",
      href: "https://cartopia-store.vercel.app/",
      dates: "2024",
      active: true,
      description:
        "Developed a full-stack e-commerce application with a React frontend and Strapi backend. Optimized database queries in Vercel PostgreSQL, achieving a 30% reduction in response time and improved user satisfaction. Deployed backend on Railway and frontend on Vercel, enhancing user retention by 30%.",
      technologies: [
        "ReactJS",
        "Strapi CMS",
        "PostgreSQL",
        "Cloudinary",
        "Railway",
        "Vercel",
        "Git",
      ],
      links: [
        {
          type: "Website",
          href: "https://cartopia-store.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Panth1823/Cartopia",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://res.cloudinary.com/desqrxm8d/video/upload/v1734354292/16.12.2024_18.33.37_REC_vwrash.mp4",
    },
  ],
  hackathons: [
    {
      title: "Google Gen AI Exchange Hackathon",
      dates: "Aug 12 - Oct 18, 2024",
      location: "Online",
      description: "",
      icon: "public",
      image:
        "https://res.cloudinary.com/dccsybvqx/image/upload/v1735307681/GenAIEX_ek3mff.png",
      links: [],
    },
    {
      title: "Parul Lets Hack (India Tour)",
      dates: "July 15 - 16, 2023",
      location: "Parul University",
      description:
        "Developed AI-powered flashcard generator built with React , Gemini and Cloudflare Workers. Create and customize quiz content seamlessly for an interactive learning experience",
      image:
        "https://res.cloudinary.com/dccsybvqx/image/upload/v1735307681/PLH_acnkrz.webp",
      links: [
        {
          title: "",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://flashgenie.vercel.app/",
        },
        {
          title: "",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Panth1823/FlashGenie",
        },
      ],
    },
    {
      title: "Skill-A-Thon 1.0",
      dates: "February 13 - 27, 2023",
      location: "Online",
      description:
        'Built "LearnTuber" web app which can convert your free YouTube course video into summarized notes as well as interactive quiz.',
      image:
        "https://res.cloudinary.com/dccsybvqx/image/upload/v1735307681/Skillathon_pl70uq.jpg",
      win: "Best Data Hack",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2018/white.svg",
      links: [
        {
          title: "",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://learntuber.vercel.app/",
        },
        {
          title: "",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Panth1823/LearnTuber",
        },
      ],
    },
  ],
} as const;
