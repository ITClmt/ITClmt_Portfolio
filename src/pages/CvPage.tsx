import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const cvImage = "/CV_Clement_Andreani.webp";
const cvImageInter = "/CV_DEV_EN_Clement_Andreani_inter.webp";
const cvPdf = "/CV_Clement_Andreani.pdf";
const cvPdfInter = "/CV_DEV_EN_Clement_Andreani_inter.pdf";

export default function CvPage() {
  useEffect(() => {
    document.title = "CV — Clément Andreani | Développeur Full Stack";
  }, []);

  const [cvType, setCvType] = useState<"normal" | "inter">("normal");

  return (
    <main className="min-h-screen p-4 bg-[#f8f9fa]">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          Curriculum Vitae
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end items-center gap-3 mb-4"
        >
          <span
            className={`text-sm font-medium ${cvType === "normal" ? "text-gray-900" : "text-gray-400"}`}
          >
            Normal
          </span>
          <button
            role="switch"
            aria-checked={cvType === "inter"}
            onClick={() => setCvType(cvType === "normal" ? "inter" : "normal")}
            className={`relative w-14 h-8 rounded-full transition-colors ${cvType === "inter" ? "bg-gray-900" : "bg-gray-300"}`}
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${cvType === "inter" ? "translate-x-6" : "translate-x-0"}`}
            />
          </button>
          <span
            className={`text-sm font-medium ${cvType === "inter" ? "text-gray-900" : "text-gray-400"}`}
          >
            International
          </span>
        </motion.div>

        <motion.img
          src={cvType === "normal" ? cvImage : cvImageInter}
          alt="CV de Clément Andreani, Développeur Full Stack"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full shadow-lg rounded-lg mb-8"
        />

        <motion.a
          href={cvType === "normal" ? cvPdf : cvPdfInter}
          download={
            cvType === "normal"
              ? "CV_Clément_Andreani_dev.pdf"
              : "CV_Clément_Andreani_inter.pdf"
          }
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Download CV
        </motion.a>
      </div>
    </main>
  );
}
