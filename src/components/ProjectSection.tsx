import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Appointment Manager",
    description:
      "A personal side project that allows you to manage your appointments. Checkpoint 4 of my training at Wide Code School.",
    technologies: ["React", "TypeScript", "Tailwind", "Express", "MongoDB"],
    imageUrl: "/ApointmentManeger01.png",
    githubUrl: "https://github.com/ITClmt/CP4_ClementA-WCS",
    demoUrl: "https://appointment-manager-front.vercel.app",
  },
  {
    id: 2,
    title: "AFAC",
    description:
      "Project 3 made for my training at Wide Code School. It's a website that allows you to manage your appointments.",
    technologies: ["React", "TypeScript", "Express", "MySQL"],
    imageUrl: "/AFAC01.webp",
    githubUrl:
      "https://github.com/WildCodeSchool-2024-09/JS-RemoteFR-Q4-Jaune-P3-Afac",
    demoUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7315755767750414336/",
  },
  {
    id: 3,
    title: "Windora",
    description:
      "Project 2 made for my training at Wide Code School. It's a website that allows you to track the weather wherever you want.",
    technologies: ["React", "TypeScript", "API"],
    imageUrl: "/Windora2.webp",
    githubUrl: "https://github.com/ITClmt/Windora_WCS",
    demoUrl: "https://windora.vercel.app/",
  },
  {
    id: 4,
    title: "ITCrypto",
    description:
      "A personal side project leveraging the CoinGecko API to track and display real-time cryptocurrency prices and market data.",
    technologies: ["React", "TypeScript", "Tailwind", "API"],
    imageUrl: "/ITCrypto3.webp",
    githubUrl: "https://github.com/ITClmt/ITCrypto",
    demoUrl: "https://itcrypto.vercel.app/",
  },
];

const ProjectSection = () => {
  return (
    <section className="py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8"
        >
          Featured Projects
        </motion.h2>

        <div className="grid gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: false }}
              className="relative grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden rounded-xl aspect-video">
                <Link to={project.demoUrl || ""}>
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover object-top filter brightness-80"
                  />
                </Link>
              </div>

              {/* Content Section */}
              <div className="flex flex-col justify-center space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {project.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-4">
                  {project.githubUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      GitHub
                    </motion.a>
                  )}
                  {project.demoUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
