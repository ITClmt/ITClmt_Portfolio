import { motion } from "framer-motion";
import { useTypewriter } from "../hooks/useTypewriter";
import NavBar from "./NavBar";

export default function Header() {
  const hiText = useTypewriter("Hi, I'm", 100, 0);
  const nameText = useTypewriter("Clément!", 100, 800);
  const roleText1 = useTypewriter("I'm a", 100, 1600);
  const roleText2 = useTypewriter("Full Stack Developer", 50, 2000);
  const contactText = useTypewriter(
    "Feel free to explore my portfolio and reach out !",
    50,
    2900,
  );

  return (
    <header className="min-h-screen px-4 py-8 md:px-8 lg:px-16 text-black">
      <NavBar />
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <p className="text-gray-600 text-base sm:text-lg md:text-xl">
            andreani.clement@gmail.com
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-start gap-4 sm:gap-6">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold">
              {hiText}
              <span> {nameText}</span>
            </h1>

            <motion.img
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              src="src/assets/profile-pic (5).png"
              alt="profile-pic"
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-30 md:h-30 rounded-3xl border-4 border-gray-300 object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>

          <div className="space-y-2 sm:space-y-4">
            <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-400">
              {roleText1}
            </p>
            <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="font-bold">{roleText2}</span>
            </p>
          </div>

          <div>
            <p className="mt-4 text-base sm:text-xl md:text-2xl text-gray-600">
              {contactText}
            </p>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
