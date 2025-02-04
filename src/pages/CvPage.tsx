import { motion } from "framer-motion";

const cvImage = "/public//CV_Clément_Andreani_DevW-alt.webp";
const cvPdf = "/public/CV_Clément_Andreani_DevW-alt.pdf";

export default function CvPage() {
  return (
    <div className="min-h-screen p-4 bg-[#f8f9fa]">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8"
        >
          Curriculum Vitae
        </motion.h1>

        <motion.img
          src={cvImage}
          alt="CV Clément Andreani"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full shadow-lg rounded-lg mb-8"
        />

        <motion.a
          href={cvPdf}
          download="CV_Clément_Andreani_DevW-alt.pdf"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Download CV
        </motion.a>
      </div>
    </div>
  );
}
