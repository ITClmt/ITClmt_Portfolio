import { motion } from "framer-motion";
import { techs as logos } from "../data/techs";

const TechList = () => {
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
