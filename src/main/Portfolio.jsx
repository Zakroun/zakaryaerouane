import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Download,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  GraduationCap,
  Code,
} from "lucide-react";
import { RiRadioButtonLine } from "react-icons/ri";
import { FaTools } from "react-icons/fa";
import { IoBriefcaseOutline } from "react-icons/io5";
import { IoRocketOutline } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import { MdOutlineContacts } from "react-icons/md";
import { projects } from "../data/data";
import { skills } from "../data/data";
import { socials } from "../data/data";
import { stats } from "../data/data";
import { jobs } from "../data/data";
import { Educations } from "../data/data";
const Portfolio = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return true;
  });
  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    if (isDark) {
      document.body.classList.add("bg-black");
      document.body.classList.remove("bg-white");
    } else {
      document.body.classList.add("bg-white");
      document.body.classList.remove("bg-black");
    }
  }, [isDark]);
  const [name, setName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = ["Full Stack Developer", "web Developer"];
  useEffect(() => {
    let timeout;
    const currentText = texts[currentTextIndex];

    if (!isDeleting && name.length < currentText.length) {
      timeout = setTimeout(() => {
        setName(currentText.substring(0, name.length + 1));
      }, 200);
    } else if (!isDeleting && name.length === currentText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1000);
    } else if (isDeleting && name.length > 0) {
      timeout = setTimeout(() => {
        setName(name.substring(0, name.length - 1));
      }, 100);
    } else if (isDeleting && name.length === 0) {
      setIsDeleting(false);
      setCurrentTextIndex((currentTextIndex + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [name, isDeleting, currentTextIndex]);

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      } transition-colors duration-300`}
    >
      <button
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full ${
          isDark
            ? "bg-zinc-800 hover:bg-zinc-700"
            : "bg-white hover:bg-gray-100"
        } shadow-lg transition-all`}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700" />
        )}
      </button>

      <div className="flex flex-col lg:flex-row">
        <div
          className={`lg:fixed lg:left-0 lg:top-0 lg:h-screen ${
            isDark ? "bg-zinc-900" : "bg-white"
          } lg:w-80 p-6 lg:overflow-y-auto`}
        >
          {/* Profile Card */}
          <div className="rounded-2xl text-center p-6 mb-6">
            <img
              src="images/zakaryaerouane.jpg"
              alt="zakaryae rouane"
              className="w-full h-64 object-cover rounded-xl mb-4"
            />
            <div className="flex justify-center">
              <div className="flex items-center gap-2 mb-2">
                <RiRadioButtonLine size={15} className="text-green-500" />
                <span className="text-xs text-gray-400">
                  Available for work
                </span>
              </div>
            </div>
            <h2 className="text-xl font-bold">Zakaryae rouane</h2>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              className={`flex-1 ${
                isDark
                  ? "bg-zinc-800 hover:bg-zinc-700"
                  : "bg-gray-200 hover:bg-gray-300"
              } py-3 rounded-xl text-sm font-medium transition-colors`}
            >
              <Download className="w-4 h-4 inline mr-2" />
              Download CV
            </button>
            <button className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-black py-3 rounded-xl text-sm font-bold transition-all">
              <a href="https://wa.me/212618382385" target="_blank">
                <LuSend className="w-4 h-4 inline mr-2" />
                Contact Me
              </a>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-6">
            {socials.map((social, i) => (
              <button
                key={i}
                className={`w-10 h-10 ${
                  isDark
                    ? "bg-zinc-800 hover:bg-zinc-700"
                    : "bg-gray-200 hover:bg-gray-300"
                } rounded-lg flex items-center justify-center transition-colors`}
              >
                <a href={social.link} target="_blank">
                  {social.icon}
                </a>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:ml-80 flex-1 p-6 lg:p-12">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">👋</span>
              <span className="text-sm text-gray-400">Say Hello</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-8">
              I'm Zakaryae rouane,
              <br />
              <span className="text-green-500">{name}|</span>
              <br />
              Based in Meknes, MA.
            </h1>
            <p
              className={`${
                isDark ? "text-gray-400" : "text-gray-600"
              } max-w-2xl mb-8`}
            >
              My name is Zakaryae Rouane, a 20-year-old Full-Stack Web Developer
              from Meknès. I handle frontend, backend, and UI design, using a
              wide range of modern web technologies to build complete, scalable,
              and user-friendly digital solutions. I am passionate about
              learning, improving my skills, and turning ideas into real,
              high-quality web experiences.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`${
                    isDark ? "bg-zinc-900" : "bg-white"
                  } p-5 rounded-xl text-center`}
                >
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <IoBriefcaseOutline className="w-6 h-6" />
              Experience
            </h2>
            <div className="space-y-4">
              {jobs.map((job, i) => (
                <div
                  key={i}
                  className={`${
                    isDark ? "bg-zinc-900" : "bg-white"
                  } p-6 rounded-xl`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{job.role}</h3>
                      <p className="text-sm text-gray-400">{job.company}</p>
                    </div>
                    <span className="text-sm text-gray-400">{job.period}</span>
                  </div>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {job.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <IoRocketOutline className="w-6 h-6" />
              Projects
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className={`${
                    isDark ? "bg-zinc-900" : "bg-white"
                  } rounded-xl overflow-hidden group cursor-pointer hover:scale-105 transition-transform`}
                >
                  <div
                    className={`${
                      project.color
                    } h-48 flex items-center justify-center text-4xl font-bold ${
                      project.color.includes("green") ||
                      project.color.includes("cyan")
                        ? "text-white"
                        : "text-gray-800"
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className={`w-${
                        project.name === "Homixstore" ? "[370px]" : "[350px]"
                      } mt-14`}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">{project.name}</h3>
                        <p className="text-sm text-gray-400">
                          {project.category} • {project.pages}
                        </p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className={`mt-6 w-full ${
                isDark
                  ? "bg-zinc-900 hover:bg-zinc-800"
                  : "bg-white hover:bg-gray-100"
              } py-3 rounded-xl font-medium transition-colors`}
            >
              Load More
            </button>
          </section>

          {/* Education Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6" />
              Education
            </h2>
            <div className="space-y-4">
              {Educations.map((edu, i) => (
                <div
                  key={i}
                  className={`${
                    isDark ? "bg-zinc-900" : "bg-white"
                  } p-6 rounded-xl`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{edu.degree}</h3>
                      <p className="text-sm text-gray-400">{edu.school}</p>
                    </div>
                    <span className="text-sm text-gray-400">{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FaTools className="w-6 h-6" /> skills
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className={`${
                    isDark ? "bg-zinc-900" : "bg-white"
                  } p-4 rounded-xl flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer`}
                >
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${skill.color} rounded-lg flex items-center justify-center text-xl text-white`}
                  >
                    {skill.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{skill.name}</h4>
                    <p className="text-xs text-gray-400">{skill.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}

          <section
            className={`${isDark ? "bg-zinc-900" : "bg-white"} p-8 rounded-2xl`}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MdOutlineContacts className="w-6 h-6" /> Let's Get in Touch!
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-xs text-gray-400">Reached To</p>
                    <p className="font-medium">+(212) 618 - 382385</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="font-medium">zakaryaerouane@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-xs text-gray-400">Address</p>
                    <p className="font-medium">Meknes , Ma</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className={`w-full ${
                    isDark ? "bg-black" : "bg-gray-100"
                  } px-4 py-3 rounded-xl outline-none`}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full ${
                    isDark ? "bg-black" : "bg-gray-100"
                  } px-4 py-3 rounded-xl outline-none`}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className={`w-full ${
                    isDark ? "bg-black" : "bg-gray-100"
                  } px-4 py-3 rounded-xl outline-none`}
                />
                <textarea
                  placeholder="Message"
                  rows="4"
                  className={`w-full ${
                    isDark ? "bg-black" : "bg-gray-100"
                  } px-4 py-3 rounded-xl outline-none resize-none`}
                ></textarea>
                <button className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-black py-3 rounded-xl font-bold transition-all">
                  Send Message
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer
            className={`mt-12 text-center text-sm text-gray-400 p-8 rounded-2xl ${
              isDark ? "bg-zinc-900" : "bg-gray-100"
            }`}
          >
            <p>Created by zakaryae rouane 💚 </p>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default Portfolio;
