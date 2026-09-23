import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

type Tab = "featured" | "others";

const ProjectSection = () => {
  const [activeTab, setActiveTab] = useState<Tab>("featured");
  const visibleProjects = projects.filter((project) =>
    activeTab === "featured" ? project.featured : !project.featured,
  );

  return (
    <section className="py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8"
        >
          Projects
        </motion.h2>

        <div className="flex justify-center gap-8 mb-10">
          <button
            type="button"
            onClick={() => setActiveTab("featured")}
            className={`pb-1 text-lg font-medium border-b-2 transition-colors ${
              activeTab === "featured"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Featured
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("others")}
            className={`pb-1 text-lg font-medium border-b-2 transition-colors ${
              activeTab === "others"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Other Projects
          </button>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-12"
        >
          {visibleProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden rounded-xl aspect-video">
                <Link to={project.demoUrl || ""}>
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={project.imageUrl}
                    alt={`Capture d'écran du projet ${project.title}`}
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
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectSection;
