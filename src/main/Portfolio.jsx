import { useState, useEffect } from "react";
import {
  Sun,
  Download,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { FaMoon } from "react-icons/fa";
import { RiRadioButtonLine } from "react-icons/ri";
import { FaRegLightbulb } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { projects } from "../data/data";
import { skills } from "../data/data";
import { socials } from "../data/data";
import { stats } from "../data/data";
import { jobs } from "../data/data";
import { Educations } from "../data/data";
import { WhatIDo } from "../data/data";
import { useForm, ValidationError } from "@formspree/react";
import CountUp from "../components/CountUp";

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
  const [showAllProjects, setShowAllProjects] = useState(false);

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
    setVisibleProjectsCount(projects.length);
    setShowAllProjects(true);
  };

  const handleShowLess = () => {
    setVisibleProjectsCount(4);
    setShowAllProjects(false);
  };

  const visibleProjects = projects.slice(0, visibleProjectsCount);

  return (
    <div
      className={`min-h-screen relative ${
        isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      } transition-colors duration-300 overflow-hidden`}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
          
          {/* Grid Pattern */}
          <div className={`absolute inset-0 opacity-5 ${
            isDark ? 'bg-[linear-gradient(90deg,#000_1px,transparent_1px),linear-gradient(#000_1px,transparent_1px)]' 
                   : 'bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(#fff_1px,transparent_1px)]'
          } bg-[size:40px_40px]`}></div>
          
          {/* Animated Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 ${
                  isDark ? 'bg-green-500/30' : 'bg-green-600/20'
                } rounded-full`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float 15s infinite linear ${i * 0.5}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-3 right-3 z-50 p-3 rounded-full ${
          isDark
            ? "bg-zinc-800 hover:bg-zinc-700"
            : "bg-white hover:bg-gray-100"
        } shadow-lg transition-all backdrop-blur-sm`}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <FaMoon className="w-5 h-5 text-gray-700" />
        )}
      </button>

      <div className="flex flex-col lg:flex-row relative z-10">
        {/* Sidebar */}
        <div
          className={`lg:fixed lg:left-0 lg:top-0 lg:h-screen ${
            isDark ? "bg-zinc-900/80" : "bg-white/80"
          } lg:w-80 p-6 lg:overflow-y-auto backdrop-blur-sm border-r ${
            isDark ? 'border-zinc-800' : 'border-gray-200'
          }`}
        >
          {/* Profile Card */}
          <div className="rounded-2xl text-center p-6 mb-6">
            <div className="flex justify-center">
              <img 
                loading="lazy"
                src="images/zakaryaerouane.jpg"
                alt="Zakaryae Rouane"
                className="w-60 h-64 object-cover rounded-xl mb-4 border-4 border-green-500/20"
              />
            </div>
            <div className="flex justify-center">
              <div className="flex items-center gap-2 mb-2">
                <RiRadioButtonLine size={15} className="text-green-500 animate-pulse" />
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
                  ? "bg-zinc-800/50 hover:bg-zinc-700/50"
                  : "bg-gray-200/50 hover:bg-gray-300/50"
              } py-3 rounded-xl text-sm font-medium transition-colors backdrop-blur-sm`}
            >
              <Download className="w-4 h-4 inline mr-2" />
              Download CV
            </button>
            <button className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-black py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-green-500/20">
              <a href="https://wa.me/212618382385" target="_blank" rel="noopener noreferrer">
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
                    ? "bg-zinc-800/50 hover:bg-zinc-700/50"
                    : "bg-gray-200/50 hover:bg-gray-300/50"
                } rounded-lg flex items-center justify-center transition-colors backdrop-blur-sm hover:scale-110 hover:shadow-lg hover:shadow-green-500/20`}
              >
                <a href={social.link} target="_blank" rel="noopener noreferrer">
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
              <img loading="lazy" src="images/hand1.png" alt="hand" className="w-6 animate-bounce" />
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
              } max-w-2xl mb-8 backdrop-blur-sm p-4 rounded-xl ${
                isDark ? 'bg-black/30' : 'bg-white/30'
              }`}
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
                    isDark ? "bg-zinc-900/50" : "bg-white/50"
                  } p-5 rounded-xl text-center backdrop-blur-sm hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-green-500/10`}
                >
                  <div className="text-2xl text-green-500 font-bold mb-1">
                    <CountUp from={0} to={stat.value} duration={1} />+
                  </div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <img loading="lazy" src="/images/briefcase.png" className="w-6 h-6" />
              Experience
            </h2>
            <div className="space-y-4">
              {jobs.map((job, i) => (
                <div
                  key={i}
                  className={`${
                    isDark ? "bg-zinc-900/50" : "bg-white/50"
                  } p-6 rounded-xl backdrop-blur-sm hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300`}
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
              <img loading="lazy" src="/images/rocket.png" className="w-6 h-6 animate-pulse" />
              Projects
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {visibleProjects.map((project, i) => (
                <div
                  key={i}
                  className={`${
                    isDark ? "bg-zinc-900/50" : "bg-white/50"
                  } rounded-xl overflow-hidden group cursor-pointer backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300`}
                >
                  <div
                    className={`${
                      project.color
                    } h-[250px] flex items-center justify-center text-4xl font-bold ${
                      project.color.includes("green") ||
                      project.color.includes("cyan")
                        ? "text-white"
                        : "text-gray-800"
                    } relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <img
                      loading="lazy"
                      src={project.image}
                      alt={project.name}
                      className={`w-${
                        project.name === "Homixstore" ? "[350px]" : "[340px]"
                      } mt-6 relative z-10 transform group-hover:scale-110 transition-transform duration-500`}
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
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-green-500 group-hover:scale-110 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More / Show Less Buttons */}
            <div className="mt-6 w-full flex justify-center gap-4">
              {!showAllProjects && projects.length > visibleProjectsCount && (
                <button
                  onClick={handleLoadMore}
                  className={`px-6 py-3 ${
                    isDark
                      ? "bg-zinc-900/50 hover:bg-zinc-800/50"
                      : "bg-white/50 hover:bg-gray-100/50"
                  } rounded-xl w-full font-medium transition-all backdrop-blur-sm`}
                >
                  Load More ({projects.length - visibleProjectsCount} more projects)
                </button>
              )}
              
              {showAllProjects && (
                <button
                  onClick={handleShowLess}
                  className={`px-6 py-3 ${
                    isDark
                      ? "bg-zinc-900/50 hover:bg-zinc-800/50"
                      : "bg-white/50 hover:bg-gray-100/50"
                  } rounded-xl w-full font-medium transition-all backdrop-blur-sm`}
                >
                  Show Less
                </button>
              )}
            </div>
          </section>

          {/* Education Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <img loading="lazy" src="/images/graduation.png" className="w-6 h-6" />
              Education
            </h2>
            <div className="space-y-4">
              {Educations.map((edu, i) => (
                <div
                  key={i}
                  className={`${
                    isDark ? "bg-zinc-900/50" : "bg-white/50"
                  } p-6 rounded-xl backdrop-blur-sm hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300`}
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
              <img loading="lazy" src="/images/light.png" className="w-6 h-6 animate-pulse" /> What I Do
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WhatIDo.map((item, index) => {
                const Icon = item.icon || FaRegLightbulb;
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-5 ${
                      isDark
                        ? "bg-zinc-900/50 text-white"
                        : "bg-white/50 text-black"
                    } rounded-xl backdrop-blur-sm border ${
                      isDark ? 'border-zinc-800' : 'border-gray-200'
                    } hover:border-green-500  transition-all duration-300`}
                  >
                    <div
                      className={`p-3 ${
                        isDark ? "bg-zinc-800/50" : "bg-gray-100/50"
                      } rounded-lg backdrop-blur-sm`}
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
              <img loading="lazy" src="/images/hammer.png" className="w-6 h-6" /> skills
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className={`${
                    isDark ? "bg-zinc-900/50" : "bg-white/50"
                  } p-4 rounded-xl flex items-center gap-3 backdrop-blur-sm hover:scale-105 transition-transform duration-300 cursor-pointer hover:shadow-lg hover:shadow-green-500/10`}
                >
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${skill.color} rounded-lg flex items-center justify-center text-xl text-white shadow-lg`}
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
            className={`${isDark ? "bg-zinc-900/50" : "bg-white/50"} p-8 rounded-2xl backdrop-blur-sm border ${
              isDark ? 'border-zinc-800' : 'border-gray-200'
            }`}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <img loading="lazy" src="/images/inbox.png" className="w-6 h-6 animate-bounce" /> Let's Get in Touch!
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
                  <p className="text-green-500 text-center mb-1 rounded-xl font-semibold animate-pulse">
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
                      isDark ? "bg-black/30" : "bg-gray-100/50"
                    } px-4 py-3 mb-2 rounded-xl outline-none backdrop-blur-sm border ${
                      isDark ? 'border-zinc-800' : 'border-gray-200'
                    } focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all`}
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
                      isDark ? "bg-black/30" : "bg-gray-100/50"
                    } px-4 py-3 mb-2 rounded-xl outline-none backdrop-blur-sm border ${
                      isDark ? 'border-zinc-800' : 'border-gray-200'
                    } focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all`}
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
                      isDark ? "bg-black/30" : "bg-gray-100/50"
                    } px-4 py-3 mb-2 rounded-xl outline-none backdrop-blur-sm border ${
                      isDark ? 'border-zinc-800' : 'border-gray-200'
                    } focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all`}
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
                      isDark ? "bg-black/30" : "bg-gray-100/50"
                    } px-4 py-3 mb-2 rounded-xl outline-none resize-none backdrop-blur-sm border ${
                      isDark ? 'border-zinc-800' : 'border-gray-200'
                    } focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all`}
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
                    py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-500/20
                    hover:shadow-xl hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState.submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer
            className={`mt-12 text-center text-sm text-gray-400 p-8 rounded-2xl backdrop-blur-sm border ${
              isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-gray-100/50 border-gray-200"
            }`}
          >
            <p className="animate-pulse">Created by zakaryae rouane 💚 </p>
          </footer>
        </div>
      </div>

      {/* PDF Modal */}
      {showPDF && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4 animate-fadeIn">
          <div
            className={`w-full max-w-3xl ${
              isDark ? "bg-zinc-900/80" : "bg-white/80"
            } rounded-2xl p-5 shadow-xl backdrop-blur-sm border ${
              isDark ? 'border-zinc-800' : 'border-gray-200'
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">My CV / Resume</h2>
              <button
                onClick={() => setShowPDF(false)}
                className="text-gray-400 hover:text-green-500 text-2xl font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* PDF Viewer */}
            <iframe
              src="pdf/zakaryaerouane(eng).pdf"
              className="w-full h-[400px] rounded-xl border"
              title="CV PDF Viewer"
            ></iframe>

            {/* Buttons */}
            <div className="flex float-end mt-5">
              <button
                onClick={() => setShowPDF(false)}
                className="px-5 py-2 mr-2 rounded-xl bg-gray-300/50 text-black hover:bg-gray-400/50 backdrop-blur-sm transition-colors"
              >
                Close
              </button>

              <a
                href="pdf/ZakaryaeRouaneCV(eng).pdf"
                download
                className="px-5 py-2 rounded-xl bg-green-500 text-black font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;