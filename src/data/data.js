import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaGithub,
  FaBootstrap,
  FaLaptopCode,
  FaPlug,
  FaDatabase,
  FaCode,
  FaPalette,
  FaTools,
} from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaWordpressSimple } from "react-icons/fa";
import { SiJira } from "react-icons/si";
import { SiAdobephotoshop } from "react-icons/si";
import { FiFigma } from "react-icons/fi";
import { SiPhp } from "react-icons/si";
import { FaLaravel } from "react-icons/fa6";
import { SiPostman } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { MdOutgoingMail } from "react-icons/md";

export const projects = [
  {
    name: "HomeNest",
    category: "E-Commerce & Rental Platform",
    image: "images/homenest.png",
    pages: "+12 Pages",
    color: "bg-blue-100",
    desc: "Plateforme complète pour vendre, acheter et louer des biens immobiliers avec espace admin et dashboard utilisateur.",
  },
  {
    name: "3otor",
    category: "Perfume E-Commerce",
    image: "images/3otorperfum.png",
    pages: "+10 Pages",
    color: "bg-amber-100",
    desc: "Boutique en ligne spécialisée dans la vente de parfums avec gestion de stock, panier, commandes et dashboard admin.",
  },
  {
    name: "GoalPass",
    category: "Match Ticketing System",
    image: "images/goalpass.png",
    pages: "+10 Pages",
    color: "bg-green-100",
    desc: "Plateforme pour acheter des tickets de matchs, avec authentification, paiement et dashboard admin & utilisateur.",
  },
  {
    name: "Edulead",
    category: "Education Platform",
    image: "images/edulead.png",
    pages: "+12 Pages",
    color: "bg-green-100",
  },
  {
    name: "Unicomnova AI",
    category: "AI Chatbot",
    image: "images/unicomnova.png",
    pages: "+7 Pages",
    color: "bg-blue-100",
  },
  {
    name: "Homixstore",
    category: "E-Commerce Store",
    image: "images/homixstore.png",
    pages: "+15 Pages",
    color: "bg-orange-100",
  },
  {
    name: "DocsAura",
    category: "Healthcare Appointment Platform",
    image: "images/docsaura.png",
    pages: "+20 Pages",
    color: "bg-cyan-100",
  },
];

export const socials = [
  {
    icon: <FaGithub className="w-4 h-4" />,
    link: "https://github.com/Zakroun",
  },
  {
    icon: <FaLinkedin className="w-4 h-4" />,
    link: "https://www.linkedin.com/in/zakaryae-rouane-53086229a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    icon: <RiInstagramFill className="w-4 h-4" />,
    link: "https://www.instagram.com/coding.withzak/profilecard/?igsh=YjZxOHlwaTNseHps",
  },
  {
    icon: <MdOutgoingMail className="w-4 h-4" />,
    link: "mailto:zakaryaerouane@gmail.com",
  },
];

export const skills = [
  {
    name: "HTML5",
    role: "Frontend",
    icon: <FaHtml5 />,
    color: "from-orange-500 to-red-500",
  },
  {
    name: "CSS3",
    role: "Frontend",
    icon: <FaCss3Alt />,
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "JavaScript",
    role: "Frontend",
    icon: <FaJs />,
    color: "from-yellow-400 to-yellow-600",
  },
  {
    name: "React",
    role: "Frontend",
    icon: <FaReact />,
    color: "from-cyan-400 to-blue-500",
  },
  {
    name: "Laravel",
    role: "Backend",
    icon: <FaLaravel />,
    color: "from-red-500 to-pink-600",
  },
  {
    name: "PHP",
    role: "Backend",
    icon: <SiPhp />,
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "WordPress",
    role: "CMS",
    icon: <FaWordpressSimple />,
    color: "from-blue-600 to-blue-800",
  },
  {
    name: "Tailwind",
    role: "CSS Framework",
    icon: <RiTailwindCssFill />,
    color: "from-teal-400 to-blue-400",
  },
  {
    name: "Bootstrap",
    role: "CSS Framework",
    icon: <FaBootstrap />,
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "Git",
    role: "Version Control",
    icon: <FaGitAlt />,
    color: "from-orange-600 to-red-600",
  },
  {
    name: "GitHub",
    role: "Version Control",
    icon: <FaGithub />,
    color: "from-gray-700 to-black",
  },
  {
    name: "Postman",
    role: "API Testing",
    icon: <SiPostman />,
    color: "from-orange-400 to-red-500",
  },
  {
    name: "Photoshop",
    role: "Design Tool",
    icon: <SiAdobephotoshop />,
    color: "from-blue-600 to-indigo-700",
  },
  {
    name: "Figma",
    role: "Design Tool",
    icon: <FiFigma />,
    color: "from-pink-500 to-purple-600",
  },
  {
    name: "Jira",
    role: "Project Management",
    icon: <SiJira />,
    color: "from-blue-500 to-blue-700",
  },
];

export const stats = [
  { value: "12+", label: "Developed Projects" },
  { value: "2+", label: "Years of Experience" },
  { value: "4+", label: "Certificates" },
  { value: "15+", label: "Technologies" },
];

export const jobs = [
  {
    role: "Full-stack Developer",
    company: "Med You in",
    period: "Oct 2025 - Present",
    desc: "Currently a Full-Stack Developer intern, contributing to web applications using PHP, Laravel, and MySQL. Involved in front-end integration, debugging, and performance optimization while ensuring high-quality code. Gaining hands-on experience in full-stack development and delivering innovative digital solutions.",
  },
  {
    role: "Full-stack Developer",
    company: "yonetwork",
    period: "Jul 2025 - Aug 2025",
    desc: "During my internship, I contributed to a full-stack employee management web application, using React for the front-end and Laravel for the back-end via RESTful APIs. I implemented tracking and management features while gaining practical experience in remote team collaboration with Git and GitHub, following professional workflows.",
  },
  {
    role: "Full-stack Developer",
    company: "Osisoftware",
    period: "Feb 2025 - Mar 2025",
    desc: "My internship at Osisoftware was a valuable experience, allowing me to apply my academic knowledge to a real project and develop new skills in digital development. I am grateful to Smytha Osisoftware for this opportunity, which will benefit my future career.",
  },
];

export const Educations = [
  {
    degree: "Full-Stack Web Development Intern",
    school: "Higher Institute of Applied Technology and Management",
    period: "2023-2025",
  },
  {
    degree: "CERTIFICAT  PYTHON",
    school: "356 DataScience",
    period: "2024",
  },
  {
    degree: "CERTIFICAT  SQL",
    school: "356 DataScience",
    period: "2024",
  },
  ,
  {
    degree: "CERTIFICAT  GIT ET GITHUB",
    school: "356 DataScience",
    period: "2024",
  },
  ,
  {
    degree: "High School Degree",
    school: "Lala Amina High School",
    period: "2023",
  },
];

export const WhatIDo = [
  { title: "Web App Development", icon: FaLaptopCode },
  { title: "API Integration", icon: FaPlug },
  { title: "Backend Development", icon: FaDatabase },
  { title: "Frontend Development", icon: FaCode },
  { title: "UI/UX Implementation", icon: FaPalette },
  { title: "Debugging & Optimization", icon: FaTools },
];
