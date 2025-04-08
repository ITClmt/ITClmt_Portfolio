import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="flex justify-center pb-10 bg-[#f8f9fa] p-4">
      <motion.ul
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex justify-center items-center gap-10 underline underline-offset-4 "
      >
        <NavLink to="/" className="hover:scale-105 transition-all duration-150">
          <li>Home</li>
        </NavLink>
        <NavLink
          to="/CV"
          className="hover:scale-105 transition-all duration-150"
        >
          <li>CV</li>
        </NavLink>
        <NavLink
          to="/Contact"
          className="hover:scale-105 transition-all duration-150"
        >
          <li>Contact</li>
        </NavLink>
      </motion.ul>
    </nav>
  );
}
