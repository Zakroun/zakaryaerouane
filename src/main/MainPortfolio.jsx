import { useState, useEffect, useCallback } from "react";
import { Sun, Download, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { FaMoon } from "react-icons/fa";
import { RiRadioButtonLine } from "react-icons/ri";
import { FaRegLightbulb } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useForm, ValidationError } from "@formspree/react";

import {
    projects,
    skills,
    socials,
    stats,
    jobs,
    Educations,
    WhatIDo,
} from "../data/myinfo.jsx";
import CountUp from "../components/CountUp.jsx";
import "../styles/Portfolio.css";

function useTypingEffect(texts) {
    const [displayed, setDisplayed] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const current = texts[index];
        let timeout;

        if (!isDeleting && displayed.length < current.length) {
            timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 90);
        } else if (!isDeleting && displayed.length === current.length) {
            timeout = setTimeout(() => setIsDeleting(true), 1800);
        } else if (isDeleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50);
        } else if (isDeleting && displayed.length === 0) {
            setIsDeleting(false);
            setIndex((i) => (i + 1) % texts.length);
        }

        return () => clearTimeout(timeout);
    }, [displayed, isDeleting, index, texts]);

    return displayed;
}

function useScrollReveal() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("pf-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll(".pf-section").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
}

const MainPortfolio = () => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved ? saved === "dark" : true;
    });

    const [showModal, setShowModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [visibleCount, setVisibleCount] = useState(6);
    const [formdata, setFormdata] = useState({ fullname: "", email: "", phonenumber: "", message: "" });
    const [formState, handleSubmit] = useForm("xblnoqrz");

    useEffect(() => {
        localStorage.setItem("theme", isDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    }, [isDark]);

    useEffect(() => {
        if (formState.succeeded) {
            setFormdata({ fullname: "", email: "", phonenumber: "", message: "" });
            setShowSuccess(true);
            const t = setTimeout(() => setShowSuccess(false), 3500);
            return () => clearTimeout(t);
        }
    }, [formState.succeeded]);

    useScrollReveal();

    const typedText = useTypingEffect([
        "Full Stack Developer.",
        "I build scalable web apps.",
        "Clean code. Great UX.",
    ]);

    const visibleProjects = projects.slice(0, visibleCount);
    const hasMore = visibleCount < projects.length;

    const handleField = useCallback((field) => (e) =>
        setFormdata((prev) => ({ ...prev, [field]: e.target.value })),
        []);

    return (
        <>
            <div className="pf-bg" aria-hidden>
                <div className="pf-orb" />
                <div className="pf-orb" />
                <div className="pf-orb" />
            </div>

            <button
                className="pf-theme-btn"
                onClick={() => setIsDark((d) => !d)}
                aria-label="Toggle theme"
            >
                {isDark
                    ? <Sun style={{ width: 18, height: 18, color: "#facc15" }} />
                    : <FaMoon style={{ width: 15, height: 15, color: "#555" }} />
                }
            </button>

            <div className="pf">
                <aside className="pf-sidebar">
                    <div className="pf-profile">
                        <div className="pf-avatar-ring">
                            <img
                                loading="lazy"
                                src="images/zakaryaerouane.jpg"
                                alt="Zakaryae Rouane"
                                className="pf-avatar"
                            />
                        </div>
                        <div className="pf-status">
                            <span className="pf-status-dot" />
                            Available for work
                        </div>
                    </div>

                    <div className="pf-actions">
                        <button className="pf-btn pf-btn-ghost" onClick={() => setShowModal(true)}>
                            <Download style={{ width: 14, height: 14 }} />
                            My CV
                        </button>
                        <a
                            href="https://wa.me/212618382385"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pf-btn pf-btn-primary"
                        >
                            <LuSend style={{ width: 14, height: 14 }} />
                            Contact Me
                        </a>
                    </div>

                    <div className="pf-socials">
                        {socials.map((s, i) => (
                            <a key={i} href={s.link} target="_blank" rel="noopener noreferrer" className="pf-social-link">
                                {s.icon}
                            </a>
                        ))}
                    </div>

                    <div className="pf-divider" />

                    <div className="pf-sidebar-contact">
                        <div className="pf-sidebar-contact-row">
                            <Phone style={{ width: 14, height: 14 }} />
                            <span>+(212) 618-382385</span>
                        </div>
                        <div className="pf-sidebar-contact-row">
                            <Mail style={{ width: 14, height: 14 }} />
                            <span>zakaryaerouane@gmail.com</span>
                        </div>
                        <div className="pf-sidebar-contact-row">
                            <MapPin style={{ width: 14, height: 14 }} />
                            <span>Meknes, Morocco</span>
                        </div>
                    </div>
                </aside>

                <main className="pf-main">
                    <section className="pf-hero pf-section pf-visible">
                        <p className="pf-hero-greeting">
                            <img loading="lazy" src="images/hand1.png" alt="" />
                            Say Hello
                        </p>

                        <h1 className="pf-hero-headline">
                            I'm Zakaryae Rouane,
                            <span className="pf-hero-typed">
                                {typedText}
                                <span className="pf-hero-cursor" aria-hidden />
                            </span>
                            Based in Meknes, MA.
                        </h1>

                        <p className="pf-hero-bio">
                            A 20-year-old Full-Stack Web Developer handling frontend, backend,
                            and UI design. I use modern web technologies to build complete,
                            scalable, and user-friendly digital solutions — passionate about
                            turning ideas into high-quality web experiences.
                        </p>

                        <div className="pf-stats-grid">
                            {stats.map((s, i) => (
                                <div className="pf-stat" key={i}>
                                    <div className="pf-stat-val">
                                        <CountUp from={0} to={s.value} duration={1.2} />+
                                    </div>
                                    <div className="pf-stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="pf-section">
                        <p className="pf-section-eyebrow">
                            <img loading="lazy" src="/images/briefcase.png" style={{ width: 14 }} alt="" />
                            Career
                        </p>
                        <h2 className="pf-section-title">Experience</h2>

                        <div className="pf-timeline">
                            {jobs.map((job, i) => (
                                <div className="pf-tl-item" key={i}>
                                    <div className="pf-tl-dot">
                                        <div className="pf-tl-dot-core" />
                                    </div>
                                    <div className="pf-tl-card">
                                        <div className="pf-tl-header">
                                            <div>
                                                <div className="pf-tl-role">{job.role}</div>
                                                <div className="pf-tl-company">{job.company}</div>
                                            </div>
                                            <span className="pf-tl-period">{job.period}</span>
                                        </div>
                                        <p className="pf-tl-desc">{job.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="pf-section">
                        <p className="pf-section-eyebrow">
                            <img loading="lazy" src="/images/rocket.png" style={{ width: 14 }} alt="" />
                            Work
                        </p>
                        <h2 className="pf-section-title">Projects</h2>

                        <div className="pf-projects-grid">
                            {visibleProjects.map((project, i) => (
                                <a
                                    href={project.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="pf-project-card"
                                    key={i}
                                >
                                    <div
                                        className="pf-project-thumb"
                                        style={{
                                            background: project.color?.startsWith("bg-")
                                                ? undefined
                                                : project.color || "var(--bg-raised)"
                                        }}
                                    >
                                        <img
                                            loading="lazy"
                                            src={project.image}
                                            alt={project.name}
                                        />
                                    </div>

                                    <div className="pf-project-overlay">
                                        <div className="pf-overlay-name">{project.name}</div>
                                        <p className="pf-overlay-desc">{project.desc || "View project details"}</p>
                                        <div className="pf-stack-badges">
                                            {project.stack?.map((tech, j) => (
                                                <span className="pf-badge" key={j}>
                                                    {tech.icon && <span style={{ fontSize: "0.9rem" }}>{tech.icon}</span>}
                                                    {tech.name || tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pf-project-foot">
                                        <div>
                                            <div className="pf-project-name">{project.name}</div>
                                            <div className="pf-project-meta">{project.category} · {project.pages}</div>
                                        </div>
                                        <ArrowUpRight className="pf-project-arrow" size={18} />
                                    </div>
                                </a>
                            ))}
                        </div>

                        {hasMore && (
                            <button className="pf-load-btn" onClick={() => setVisibleCount(projects.length)}>
                                Load {projects.length - visibleCount} more projects
                            </button>
                        )}
                        {!hasMore && visibleCount > 6 && (
                            <button className="pf-load-btn" onClick={() => setVisibleCount(6)}>
                                Show less
                            </button>
                        )}
                    </section>

                    <section className="pf-section">
                        <p className="pf-section-eyebrow">
                            <img loading="lazy" src="/images/graduation.png" style={{ width: 14 }} alt="" />
                            Background
                        </p>
                        <h2 className="pf-section-title">Education</h2>

                        <div className="pf-edu-list">
                            {Educations.map((edu, i) => (
                                <div className="pf-edu-card" key={i}>
                                    <div>
                                        <div className="pf-edu-degree">{edu.degree}</div>
                                        <div className="pf-edu-school">{edu.school}</div>
                                    </div>
                                    <span className="pf-edu-period">{edu.period}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="pf-section">
                        <p className="pf-section-eyebrow">
                            <img loading="lazy" src="/images/light.png" style={{ width: 14 }} alt="" />
                            Services
                        </p>
                        <h2 className="pf-section-title">What I Do</h2>

                        <div className="pf-whatido-grid">
                            {WhatIDo.map((item, i) => {
                                const Icon = item.icon || FaRegLightbulb;
                                return (
                                    <div className="pf-whatido-card" key={i}>
                                        <div className="pf-whatido-icon-wrap">
                                            <Icon style={{ width: 22, height: 22, color: "var(--accent)" }} />
                                        </div>
                                        <div className="pf-whatido-title">{item.title}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="pf-section">
                        <p className="pf-section-eyebrow">
                            <img loading="lazy" src="/images/hammer.png" style={{ width: 14 }} alt="" />
                            Stack
                        </p>
                        <h2 className="pf-section-title">Skills</h2>

                        <div className="pf-skills-grid">
                            {skills.map((skill, i) => (
                                <div className="pf-skill-card" key={i}>
                                    <div
                                        className="pf-skill-icon-wrap"
                                        style={{ background: `linear-gradient(135deg, ${skill.color?.replace("from-", "").replace("to-", "")})` || "var(--accent-dim)" }}
                                    >
                                        <span style={{ fontSize: "1.3rem" }}>{skill.icon}</span>
                                    </div>
                                    <div>
                                        <div className="pf-skill-name">{skill.name}</div>
                                        <div className="pf-skill-role">{skill.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="pf-section">
                        <p className="pf-section-eyebrow">
                            <img loading="lazy" src="/images/inbox.png" style={{ width: 14 }} alt="" />
                            Reach Out
                        </p>
                        <h2 className="pf-section-title">Let's Get in Touch</h2>

                        <div className="pf-contact-wrap">
                            <div className="pf-contact-info-list">
                                {[
                                    { icon: Phone, label: "Phone", value: "+(212) 618-382385" },
                                    { icon: Mail, label: "Email", value: "zakaryaerouane@gmail.com" },
                                    { icon: MapPin, label: "Location", value: "Meknes, Morocco" },
                                ].map(({ icon: Icon, label, value }) => (
                                    <div className="pf-contact-info-item" key={label}>
                                        <div className="pf-contact-icon-wrap">
                                            <Icon style={{ width: 16, height: 16, color: "var(--accent)" }} />
                                        </div>
                                        <div>
                                            <div className="pf-contact-label">{label}</div>
                                            <div className="pf-contact-value">{value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <form className="pf-form" onSubmit={handleSubmit}>
                                {showSuccess && (
                                    <div className="pf-form-success">
                                        <IoMdCheckmarkCircleOutline size={17} />
                                        Message sent successfully!
                                    </div>
                                )}

                                <input
                                    className="pf-input"
                                    type="text"
                                    name="fullname"
                                    placeholder="Full Name"
                                    value={formdata.fullname}
                                    onChange={handleField("fullname")}
                                    required
                                />

                                <input
                                    className="pf-input"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email Address"
                                    value={formdata.email}
                                    onChange={handleField("email")}
                                    required
                                />
                                <ValidationError prefix="Email" field="email" errors={formState.errors} />

                                <input
                                    className="pf-input"
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number (optional)"
                                    value={formdata.phonenumber}
                                    onChange={handleField("phonenumber")}
                                />

                                <textarea
                                    className="pf-input pf-textarea"
                                    name="message"
                                    id="message"
                                    placeholder="Your message..."
                                    value={formdata.message}
                                    onChange={handleField("message")}
                                    rows={4}
                                    required
                                />
                                <ValidationError prefix="Message" field="message" errors={formState.errors} />

                                <button
                                    type="submit"
                                    disabled={formState.submitting}
                                    className="pf-form-submit"
                                >
                                    {formState.submitting ? "Sending…" : "Send Message"}
                                </button>
                            </form>
                        </div>
                    </section>

                    <footer className="pf-footer">
                        Created by Zakaryae Rouane
                        <IoMdCheckmarkCircleOutline size={16} style={{ color: "var(--accent)" }} />
                    </footer>
                </main>
            </div>

            {showModal && (
                <div className="pf-modal-backdrop" onClick={() => setShowModal(false)}>
                    <div className="pf-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="pf-modal-head">
                            <span className="pf-modal-title">My CV / Resume</span>
                            <button className="pf-modal-close" onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        <iframe
                            src="pdf/zakaryaerouane(eng).pdf"
                            title="CV PDF Viewer"
                        />
                        <div className="pf-modal-foot">
                            <button className="pf-btn pf-btn-ghost" onClick={() => setShowModal(false)}>
                                Close
                            </button>
                            <a
                                href="pdf/ZakaryaeRouaneCV(eng).pdf"
                                download
                                className="pf-btn pf-btn-primary"
                                style={{ textDecoration: "none" }}
                            >
                                <Download style={{ width: 14, height: 14 }} />
                                Download
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MainPortfolio;