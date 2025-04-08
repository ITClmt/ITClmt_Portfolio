import { FaEnvelope, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="min-h-screen p-4 bg-[#f8f9fa]">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Contact</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Card */}
          <a
            href="mailto:andreani.clement@gmail.com"
            className="group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center space-x-4"
          >
            <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
              <FaEnvelope className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">Email</h2>
              <p className="text-gray-600">andreani.clement@gmail.com</p>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com/in/clm-andreani"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center space-x-4"
          >
            <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
              <FaLinkedin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">LinkedIn</h2>
              <p className="text-gray-600">Clément Andreani</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
