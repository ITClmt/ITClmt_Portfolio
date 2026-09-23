export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "QuizzApp",
    description:
      "A mobile quiz app (React Native / Expo) with timed questions, XP, levels, avatars, and leaderboards. Built to be published on the app stores, but you can already try it on the web via the Expo build. The backend API is self-hosted and deployed with Dokploy.",
    technologies: ["React Native", "Expo", "NestJS", "Prisma"],
    imageUrl: "/quizzApp01.png",
    githubUrl: "https://github.com/ITClmt/QuizzApp-Native",
    demoUrl: "https://itclmt-quizzapp.expo.app/",
    featured: true,
  },
  {
    id: 2,
    title: "Midi-Mealy",
    description:
      "Search, geolocation, and restaurant rating system near offices with review sharing between colleagues. Creation of 'Company' spaces with role management (Managers / Employees) and access control (invitations via unique codes or open access).",
    technologies: [
      "React",
      "Tanstack Start",
      "TypeScript",
      "Tailwind",
      "Supabase",
    ],
    imageUrl: "/midiMealy.png",
    githubUrl: "https://github.com/ITClmt/Midi-Mealy",
    demoUrl: "https://midi-mealy.itclmt.dev/",
    featured: true,
  },
  {
    id: 3,
    title: "ITCrypto",
    description:
      "A personal side project leveraging the CoinGecko API to track and display real-time cryptocurrency prices and market data.",
    technologies: ["React", "TypeScript", "Tailwind", "API"],
    imageUrl: "/ITCrypto3.webp",
    githubUrl: "https://github.com/ITClmt/ITCrypto",
    demoUrl: "https://itcrypto.vercel.app/",
    featured: true,
  },
  {
    id: 4,
    title: "AFAC",
    description:
      "Final full-stack project of my training at Wild Code School: a digital art gallery platform.",
    technologies: ["React", "TypeScript", "Express", "MySQL"],
    imageUrl: "/AFAC01.webp",
    githubUrl:
      "https://github.com/WildCodeSchool-2024-09/JS-RemoteFR-Q4-Jaune-P3-Afac",
    demoUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7315755767750414336/",
    featured: false,
  },
  {
    id: 5,
    title: "Appointment Manager",
    description:
      "A personal side project that allows you to manage your appointments. Checkpoint 4 of my training at Wide Code School.",
    technologies: ["React", "TypeScript", "Tailwind", "Express", "MongoDB"],
    imageUrl: "/ApointmentManeger01.png",
    githubUrl: "https://github.com/ITClmt/CP4_ClementA-WCS",
    demoUrl: "https://appointment-manager-front.vercel.app",
    featured: false,
  },
  {
    id: 6,
    title: "Windora",
    description:
      "Project 2 made for my training at Wide Code School. It's a website that allows you to track the weather wherever you want.",
    technologies: ["React", "TypeScript", "API"],
    imageUrl: "/Windora2.webp",
    githubUrl: "https://github.com/ITClmt/Windora_WCS",
    demoUrl: "https://windora.vercel.app/",
    featured: false,
  },
];
