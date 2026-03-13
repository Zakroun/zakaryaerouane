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
    FaDocker,
    FaNodeJs
} from "react-icons/fa";

import { RiTailwindCssFill } from "react-icons/ri";
import { FaWordpressSimple } from "react-icons/fa";
import { SiJira } from "react-icons/si";
import { DiPhotoshop } from "react-icons/di";
import { FiFigma } from "react-icons/fi";
import { SiPhp } from "react-icons/si";
import { FaLaravel } from "react-icons/fa6";
import { SiPostman } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { MdOutgoingMail } from "react-icons/md";

export const skills = [
    {
        id: 1,
        name: "HTML5",
        role: "Frontend",
        icon: <FaHtml5 />,
        color: "from-orange-500 to-red-500",
    },
    {
        id: 2,
        name: "CSS3",
        role: "Frontend",
        icon: <FaCss3Alt />,
        color: "from-blue-500 to-blue-700",
    },
    {
        id: 3,
        name: "JavaScript",
        role: "Frontend",
        icon: <FaJs />,
        color: "from-yellow-400 to-yellow-600",
    },
    {
        id: 4,
        name: "React",
        role: "Frontend",
        icon: <FaReact />,
        color: "from-cyan-400 to-blue-500",
    },
    {
        id: 5,
        name: "Node js",
        role: "Backend",
        icon: <FaNodeJs />,
        color: "from-green-600 to-green-400",
    },
    {
        id: 6,
        name: "Laravel",
        role: "Backend",
        icon: <FaLaravel />,
        color: "from-red-500 to-pink-600",
    },
    {
        id: 7,
        name: "PHP",
        role: "Backend",
        icon: <SiPhp />,
        color: "from-indigo-500 to-purple-500",
    },
    {
        id: 8,
        name: "WordPress",
        role: "CMS",
        icon: <FaWordpressSimple />,
        color: "from-blue-600 to-blue-800",
    },
    {
        id: 9,
        name: "Tailwind",
        role: "CSS Framework",
        icon: <RiTailwindCssFill />,
        color: "from-teal-400 to-blue-400",
    },
    {
        id: 10,
        name: "Bootstrap",
        role: "CSS Framework",
        icon: <FaBootstrap />,
        color: "from-purple-500 to-indigo-500",
    },
    {
        id: 11,
        name: "Git",
        role: "Version Control",
        icon: <FaGitAlt />,
        color: "from-orange-600 to-red-600",
    },
    {
        id: 12,
        name: "GitHub",
        role: "Version Control",
        icon: <FaGithub />,
        color: "from-gray-700 to-black",
    },
    {
        id: 13,
        name: "Postman",
        role: "API Testing",
        icon: <SiPostman />,
        color: "from-orange-400 to-red-500",
    },
    {
        id: 14,
        name: "Photoshop",
        role: "Design Tool",
        icon: <DiPhotoshop />,
        color: "from-blue-600 to-indigo-700",
    },
    {
        id: 15,
        name: "Figma",
        role: "Design Tool",
        icon: <FiFigma />,
        color: "from-pink-500 to-purple-600",
    },
    {
        id: 16,
        name: "Jira",
        role: "Project Management",
        icon: <SiJira />,
        color: "from-blue-500 to-blue-700",
    },
    {
        id: 17,
        name: "Docker",
        role: "Containerization",
        icon: <FaDocker />,
        color: "from-blue-400 to-blue-600",
    },
];
export const projects = [
    // new projects
    {
        name: "Avex",
        category: "fashion E-Commerce",
        image: "images/avex.png",
        pages: "+12 Pages",
        path: "https://avex-navy.vercel.app/",
        color: "bg-[#cac9c2]",
        stack: [skills[3], skills[5], skills[8], skills[10], skills[11], skills[12]],
        desc: "A complete e-commerce platform for fashion products, product management, shopping cart.",
    },
    {
        name: "NovaReach Agency",
        category: "Marketing Agency Website",
        image: "images/novareach.png",
        pages: "+12 Pages",
        path: "https://nova-reach-azure.vercel.app/",
        color: "bg-[#c13f51]",
        stack: [skills[3], skills[5], skills[8], skills[10], skills[11], skills[12]],
        desc: "A marketing agency website showcasing services, portfolio, and client testimonials with a modern design.",
    },
    {
        name: "FlowBoard",
        category: "Project Management Tool",
        image: "images/flowboard.png",
        pages: "+12 Pages",
        path: "https://flow-board-ten.vercel.app/",
        color: "bg-[#1c453f]",
        stack: [skills[3], skills[5], skills[8], skills[10], skills[11], skills[12]],
        desc: "A complete platform to manage projects, tasks, and collaborate with team members.",
    },
    {
        name: "WebVerse Agency",
        category: "Digital Agency Website",
        image: "images/webverse.png",
        pages: "+12 Pages",
        path: "https://webverse-chi.vercel.app/",
        color: "bg-black",
        stack: [skills[3], skills[5], skills[8], skills[10], skills[11], skills[12]],
        desc: "A modern digital agency website designed to showcase services, projects, and brand identity with a clean UI, smooth navigation, and responsive layout for businesses seeking a strong online presence."
    },
    {
        name: "Restova",
        category: "Restaurant Reservation System",
        image: "images/restova.png",
        pages: "+12 Pages",
        path: "https://restova.vercel.app/",
        color: "bg-[#49392f]",
        stack: [skills[3], skills[5], skills[8], skills[10], skills[11], skills[12]],
        desc: "A restaurant reservation platform that allows customers to browse menus, book tables, and manage reservations online while providing restaurants with an organized system to handle bookings efficiently."
    },
    {
        name: "Beauty Salon",
        category: "Beauty Salon Booking System",
        image: "images/beautysalon.png",
        pages: "+12 Pages",
        path: "https://beauty-salon-one-blue.vercel.app/",
        color: "bg-[#efa6d1]",
        stack: [skills[3], skills[5], skills[8], skills[10], skills[11], skills[12]],
        desc: "An online booking system for beauty salons where clients can schedule appointments, explore services, and manage bookings easily through a responsive and user-friendly interface."
    },
    // old projects
    {
        name: "HomeNest",
        category: "Rental Platform",
        image: "images/homenest.png",
        pages: "+12 Pages",
        path: "https://homenest-omega.vercel.app/",
        color: "bg-blue-800",
        stack: [skills[3], skills[5], skills[8], skills[10], skills[11], skills[12]],
        desc: "A complete platform to sell, buy, and rent real estate properties, with admin panel and user dashboard.",
    },
    {
        name: "Tripplanner",
        category: "Travel Planning App",
        image: "images/tripplanner.png",
        pages: "+10 Pages",
        path: "https://trip-planner-xi-pied.vercel.app/",
        color: "bg-blue-200",
        stack: [skills[3], skills[5], skills[8], skills[10], skills[11], skills[12]],
        desc: "A web application for planning trips with personalized itineraries, booking management, and interactive dashboard.",
    },
    {
        name: "GoalPass",
        category: "Match Ticketing System",
        image: "images/goalpass.png",
        pages: "+10 Pages",
        path: "https://goalpass.vercel.app/",
        color: "bg-green-800",
        stack: [skills[3], skills[5], skills[8], skills[10], skills[11], skills[12]],
        desc: "Platform to purchase match tickets, featuring authentication, payment, and admin & user dashboards.",
    },
    {
        name: "3otor",
        category: "Perfume E-Commerce",
        image: "images/3otorperfum.png",
        pages: "+10 Pages",
        color: "bg-amber-600",
        path: "https://3otor-perfums.vercel.app/",
        stack: [skills[3], skills[5], skills[8], skills[10], skills[11], skills[12]],
        desc: "Online store specialized in selling perfumes with stock management, cart, orders, and admin dashboard.",
    },
    {
        name: "Edulead",
        category: "Education Platform",
        image: "images/edulead.png",
        pages: "+12 Pages",
        path: "https://edulead-alpha.vercel.app/",
        color: "bg-blue-200",
        stack: [skills[3], skills[5], skills[8], skills[10], skills[11], skills[12]],
        desc: "An online education platform with courses, quizzes, and a management dashboard for students and instructors.",
    },
    {
        name: "AFCON 2025",
        category: "Sports / Football Web App",
        image: "images/afcon2025.png",
        pages: "+10 Pages",
        path: "https://afcon-2025.vercel.app/",
        color: "bg-[#800000]",
        stack: [skills[3], skills[5], skills[8], skills[10], skills[11], skills[12]],
        desc: "A comprehensive web app for AFCON 2025, featuring match schedules, cities, groups, national teams, and live scores.",
    }
    ,
    {
        name: "Unicomnova AI",
        category: "AI Chatbot",
        image: "images/unicomnova.png",
        pages: "+7 Pages",
        color: "bg-gray-100",
        stack: [
            skills[5],
            skills[8],
            skills[10],
            skills[11],
            skills[16],
            skills[12],
        ],
        desc: "AI-powered chatbot platform for customer support, with admin dashboard and analytics.",
    },
    {
        name: "Homixstore",
        category: "E-Commerce Store",
        image: "images/homixstore.png",
        pages: "+15 Pages",
        color: "bg-orange-500",
        stack: [skills[3], skills[5], skills[8], skills[10], skills[11], skills[12]],
        desc: "Complete e-commerce store for various products, including shopping cart, payment, and admin panel.",
    },
    {
        name: "DocsAura",
        category: "Healthcare Appointment Platform",
        image: "images/docsaura.png",
        pages: "+20 Pages",
        color: "bg-cyan-200",
        stack: [skills[3], skills[5], skills[8], skills[10], skills[11], skills[12]],
        desc: "Healthcare platform to book appointments with doctors, manage schedules, and access patient dashboards.",
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

export const stats = [
    { value: 12, label: "Developed Projects" },
    { value: 2, label: "Years of Experience" },
    { value: 4, label: "Certificates" },
    { value: 15, label: "Technologies" },
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
