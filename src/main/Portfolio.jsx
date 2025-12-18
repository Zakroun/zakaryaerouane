import { useState, useEffect } from "react";
import {
  Sun,
  Download,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  GraduationCap,
} from "lucide-react";
import { FaMoon } from "react-icons/fa";
import { RiRadioButtonLine } from "react-icons/ri";
import { FaTools, FaRegLightbulb } from "react-icons/fa";
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
import { WhatIDo } from "../data/data";
import { useForm, ValidationError } from "@formspree/react";

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
  const texts = [
    "Full Stack Developer.",
    "I build modern, scalable web apps with clean, efficient code.",
  ];

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

  const [showPDF, setShowPDF] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formState, handleSubmit] = useForm("xblnoqrz");
  const [formdata, setFormdata] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    message: "",
  });

  const [visibleProjectsCount, setVisibleProjectsCount] = useState(4);

  useEffect(() => {
    if (formState.succeeded) {
      setFormdata({
        fullname: "",
        email: "",
        phonenumber: "",
        message: "",
      });
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [formState.succeeded]);

  const handleLoadMore = () => {
    // Show all projects when clicking "Load More"
    setVisibleProjectsCount(projects.length);
  };

  const visibleProjects = projects.slice(0, visibleProjectsCount);

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      } transition-colors duration-300`}
    >
      <button
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-3 right-3 z-50 p-3 rounded-full ${
          isDark
            ? "bg-zinc-800 hover:bg-zinc-700"
            : "bg-white hover:bg-gray-100"
        } shadow-lg transition-all`}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <FaMoon className="w-5 h-5 text-gray-700" />
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
            <div className="flex justify-center">
              <img loading="lazy"
                src="images/zakaryaerouane.jpg"
                alt="Zakaryae Rouane"
                className="w-60 h-64 object-cover rounded-xl mb-4"
              />
            </div>
            <div className="flex justify-center">
              <div className="flex items-center gap-2 mb-2">
                <RiRadioButtonLine size={15} className="text-green-500" />
                <span className="text-xs text-gray-400">
                  Available for work
                </span>
              </div>
            </div>
            <h2 className="text-xl font-bold">Zakaryae Rouane</h2>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setShowPDF(true)}
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
              <img loading="lazy" src="images/hand1.png" alt="hand" className="w-6" />
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
                  <div className="text-2xl text-green-500 font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <img src="/images/briefcase.png" className="w-6 h-6" />
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
                    <span className="text-sm text-green-500">{job.period}</span>
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
              <img src="/images/rocket.png" className="w-6 h-6" />
              Projects
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {visibleProjects.map((project, i) => (
                <div
                  key={i}
                  className={`${
                    isDark ? "bg-zinc-900" : "bg-white"
                  } rounded-xl overflow-hidden group cursor-pointer hover:scale-105 transition-transform`}
                >
                  <div
                    className={`${
                      project.color
                    } h-[250px] flex items-center justify-center text-4xl font-bold ${
                      project.color.includes("green") ||
                      project.color.includes("cyan")
                        ? "text-white"
                        : "text-gray-800"
                    }`}
                  >
                    <img loading="lazy"
                      src={project.image}
                      alt={project.name}
                      className={`w-${
                        project.name === "Homixstore" ? "[350px]" : "[340px]"
                      } mt-6`}
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

            {projects.length > visibleProjectsCount && (
              <button
                onClick={handleLoadMore}
                className={`mt-6 w-full ${
                  isDark
                    ? "bg-zinc-900 hover:bg-zinc-800"
                    : "bg-white hover:bg-gray-100"
                } py-3 rounded-xl font-medium transition-colors`}
              >
                Load More ({projects.length - visibleProjectsCount} more
                projects)
              </button>
            )}
          </section>

          {/* Education Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <img src="/images/graduation.png" className="w-6 h-6" />
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
                    <span className="text-sm text-green-500">{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* WhatIDo */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <img src="/images/light.png" className="w-6 h-6" /> What I Do
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WhatIDo.map((item, index) => {
                const Icon = item.icon || FaRegLightbulb;
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-5 ${
                      isDark
                        ? "bg-zinc-900 text-white border-zinc-800"
                        : "bg-white text-black border-gray-100"
                    } rounded-xl border  hover:border-green-500 transition-all shadow-sm hover:shadow-green-500/20`}
                  >
                    <div
                      className={`p-3 ${
                        isDark ? "bg-zinc-800" : "bg-gray-100"
                      } rounded-lg`}
                    >
                      <Icon className="w-7 h-7 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <img src="/images/hammer.png" className="w-6 h-6" /> skills
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
              <img src="/images/inbox.png" className="w-6 h-6" /> Let's Get in Touch!
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
                {showSuccess && (
                  <p className="text-green-500 text-center mb-1 rounded-xl font-semibold">
                    Message sent successfully!
                  </p>
                )}
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="fullname"
                    value={formdata.fullname}
                    onChange={(e) =>
                      setFormdata({ ...formdata, fullname: e.target.value })
                    }
                    className={`w-full ${
                      isDark ? "bg-black" : "bg-gray-100"
                    } px-4 py-3 mb-2 rounded-xl outline-none`}
                    required
                  />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formdata.email}
                    onChange={(e) =>
                      setFormdata({ ...formdata, email: e.target.value })
                    }
                    placeholder="Email"
                    className={`w-full ${
                      isDark ? "bg-black" : "bg-gray-100"
                    } px-4 py-3 mb-2 rounded-xl outline-none`}
                    required
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={formState.errors}
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formdata.phonenumber}
                    onChange={(e) =>
                      setFormdata({ ...formdata, phonenumber: e.target.value })
                    }
                    name="phone"
                    className={`w-full ${
                      isDark ? "bg-black" : "bg-gray-100"
                    } px-4 py-3 mb-2 rounded-xl outline-none`}
                  />

                  <textarea
                    id="message"
                    name="message"
                    placeholder="Message"
                    value={formdata.message}
                    onChange={(e) =>
                      setFormdata({ ...formdata, message: e.target.value })
                    }
                    rows="4"
                    className={`w-full ${
                      isDark ? "bg-black" : "bg-gray-100"
                    } px-4 py-3 mb-2 rounded-xl outline-none resize-none`}
                    required
                  ></textarea>
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={formState.errors}
                  />

                  <button
                    type="submit"
                    disabled={formState.submitting}
                    className="w-full bg-gradient-to-r from-green-400 to-emerald-500
                    hover:from-green-500 hover:to-emerald-600 text-black 
                    py-3 rounded-xl font-bold transition-all"
                  >
                    {formState.submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
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

      {showPDF && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
          <div
            className={`w-full max-w-3xl ${
              isDark ? "bg-zinc-900" : "bg-white"
            } rounded-2xl p-5 shadow-xl`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">My CV / Resume</h2>
              <button
                onClick={() => setShowPDF(false)}
                className="text-gray-400 hover:text-green-500 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* PDF Viewer */}
            <iframe
              src="pdf/zakaryaerouane(eng).pdf"
              className="w-full h-[400px] rounded-xl border"
            ></iframe>

            {/* Buttons */}
            <div className="flex float-end mt-5">
              <button
                onClick={() => setShowPDF(false)}
                className="px-5 py-2 mr-2 rounded-xl bg-gray-300 text-black hover:bg-gray-400"
              >
                Close
              </button>

              <a
                href="pdf/ZakaryaeRouaneCV(eng).pdf"
                download
                className="px-5 py-2 rounded-xl bg-green-500 text-black font-bold hover:bg-green-600"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
