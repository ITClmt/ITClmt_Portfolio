import { motion } from "framer-motion";
import {
  FaReact,
  FaNode,
  FaHtml5,
  FaCss3,
  FaGithub,
  FaGit,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiTypescript,
  SiMysql,
  SiJavascript,
  SiExpress,
  SiLeaflet,
  SiVite,
  SiMongodb,
  SiJest,
  SiDocker,
  SiPostgresql,
  SiPrisma,
  SiSupabase,
  SiNestjs
} from "react-icons/si";

const TechList = () => {
  const logos = [
    { icon: SiJavascript, name: "JavaScript" },
    { icon: FaHtml5, name: "HTML" },
    { icon: FaCss3, name: "CSS" },
    { icon: FaReact, name: "React" },
    { icon: SiTailwindcss, name: "Tailwind" },
    { icon: SiTypescript, name: "TypeScript" },
    { icon: FaNode, name: "Node.js" },
    { icon: SiExpress, name: "Express" },
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

  return (
    <div className="relative flex overflow-x-hidden border-b border-t border-gray-200">
      <motion.div
        className="flex py-12"
        animate={{
          x: [0, -1035],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {logos.map((Logo) => (
          <motion.div
            key={Logo.name}
            className="inline-flex flex-col items-center mx-8"
            whileHover={{ scale: 1.1 }}
          >
            <Logo.icon className="w-12 h-12 text-gray-600 hover:text-gray-900 transition-colors" />
            <span className="mt-2 text-sm text-gray-600">{Logo.name}</span>
          </motion.div>
        ))}

        {logos.map((Logo) => (
          <motion.div
            key={Logo.name}
            className="inline-flex flex-col items-center mx-8"
            whileHover={{ scale: 1.1 }}
          >
            <Logo.icon className="w-12 h-12 text-gray-600 hover:text-gray-900 transition-colors" />
            <span className="mt-2 text-sm text-gray-600">{Logo.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechList;
