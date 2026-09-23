import type { IconType } from "react-icons";
import {
  FaCss3,
  FaGit,
  FaGithub,
  FaHtml5,
  FaNode,
  FaReact,
  FaVuejs,
} from "react-icons/fa";
import {
  SiDocker,
  SiExpress,
  SiHono,
  SiJavascript,
  SiJest,
  SiLeaflet,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiPostgresql,
  SiPrisma,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";

export interface Tech {
  icon: IconType;
  name: string;
}

export const techs: Tech[] = [
  { icon: SiJavascript, name: "JavaScript" },
  { icon: FaHtml5, name: "HTML" },
  { icon: FaCss3, name: "CSS" },
  { icon: FaReact, name: "React" },
  { icon: FaVuejs, name: "Vue" },
  { icon: SiTailwindcss, name: "Tailwind" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: FaNode, name: "Node.js" },
  { icon: SiExpress, name: "Express" },
  { icon: SiHono, name: "Hono" },
  { icon: SiNestjs, name: "NestJS" },
  { icon: SiDocker, name: "Docker" },
  { icon: SiPostgresql, name: "PostgreSQL" },
  { icon: SiPrisma, name: "Prisma" },
  { icon: SiSupabase, name: "Supabase" },
  { icon: SiMysql, name: "MySQL" },
  { icon: SiMongodb, name: "MongoDB" },
  { icon: SiLeaflet, name: "Leaflet" },
  { icon: FaGithub, name: "GitHub" },
  { icon: FaGit, name: "Git" },
  { icon: SiVite, name: "Vite" },
  { icon: SiJest, name: "Jest" },
];
