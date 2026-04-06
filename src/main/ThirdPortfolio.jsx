import { useState, useEffect, useRef, useCallback } from "react";
import React from 'react'
import { Sun, Download, Mail, Phone, MapPin, ExternalLink, ArrowDown, Terminal, Github, ChevronRight } from "lucide-react";
import { FaMoon } from "react-icons/fa";
import { RiRadioButtonLine } from "react-icons/ri";
import { FaRegLightbulb } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { projects } from "../data/myinfo.jsx";
import { skills } from "../data/myinfo.jsx";
import { socials } from "../data/myinfo.jsx";
import { stats } from "../data/myinfo.jsx";
import { jobs } from "../data/myinfo.jsx";
import { Educations } from "../data/myinfo.jsx";
import { WhatIDo } from "../data/myinfo.jsx";
import { useForm, ValidationError } from "@formspree/react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import CountUp from "../components/CountUp.jsx";

/* ─── CSS-in-JS via a <style> injected once ─────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Outfit:wght@300;400;500;600&display=swap');

  :root {
    --g1: #00ff87;
    --g2: #0aefff;
    --g3: #39d353;
    --accent: #00ff87;
    --accent-dim: rgba(0,255,135,0.12);
    --accent-glow: 0 0 30px rgba(0,255,135,0.35);
    --card-bg-dark: rgba(10,10,12,0.7);
    --card-bg-light: rgba(255,255,255,0.75);
    --border-dark: rgba(255,255,255,0.07);
    --border-light: rgba(0,0,0,0.08);
    --text-muted: #6b7280;
    --radius: 16px;
    --font-display: 'Syne', sans-serif;
    --font-body: 'Outfit', sans-serif;
    --font-mono: 'DM Mono', monospace;
    --transition: 0.35s cubic-bezier(0.4,0,0.2,1);
  }

  *,*::before,*::after { box-sizing: border-box; margin:0; padding:0; }

  body { font-family: var(--font-body); }

  .pf-root {
    min-height: 100vh;
    transition: background var(--transition), color var(--transition);
    overflow-x: hidden;
  }
  .pf-root.dark  { background: #06060a; color: #e8e8f0; }
  .pf-root.light { background: #f0f2f5; color: #0d0f14; }

  /* ── Noise overlay ─────────────────────────────────────────── */
  .pf-noise {
    pointer-events:none;
    position:fixed;inset:0;z-index:0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity: 0.025;
  }

  /* ── Animated gradient orbs ────────────────────────────────── */
  .pf-orbs { pointer-events:none; position:fixed; inset:0; z-index:0; overflow:hidden; }
  .orb {
    position:absolute; border-radius:50%;
    filter: blur(80px);
    animation: drift 18s ease-in-out infinite alternate;
  }
  .orb1 { width:520px;height:520px; top:-120px; left:-100px; background: radial-gradient(circle, rgba(0,255,135,0.08) 0%, transparent 70%); }
  .orb2 { width:400px;height:400px; bottom:-80px; right:-60px; background: radial-gradient(circle, rgba(10,239,255,0.06) 0%, transparent 70%); animation-delay:-9s; }
  .orb3 { width:300px;height:300px; top:40%; left:40%; background: radial-gradient(circle, rgba(0,255,135,0.04) 0%, transparent 70%); animation-delay:-4s; }

  @keyframes drift { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(40px,30px) scale(1.08)} }

  /* ── Grid pattern ──────────────────────────────────────────── */
  .pf-grid {
    pointer-events:none; position:fixed; inset:0; z-index:0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
  }
  .light .pf-grid {
    background-image:
      linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
  }

  /* ── Navbar ────────────────────────────────────────────────── */
  .pf-nav {
    position:fixed; top:0; left:0; right:0; z-index:100;
    display:flex; align-items:center; justify-content:space-between;
    padding: 0 2.5rem;
    height: 64px;
    backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid var(--border-dark);
    transition: background var(--transition);
  }
  .dark .pf-nav  { background: rgba(6,6,10,0.8); border-color: var(--border-dark); }
  .light .pf-nav { background: rgba(240,242,245,0.85); border-color: var(--border-light); }

  .pf-nav-logo {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 1.25rem;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, var(--g1), var(--g2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .pf-nav-links {
    display:flex; gap:0.25rem; list-style:none;
  }
  .pf-nav-links a {
    font-family: var(--font-mono);
    font-size:0.8rem;
    padding:0.4rem 0.9rem;
    border-radius:8px;
    text-decoration:none;
    color: inherit;
    opacity:0.55;
    transition: opacity 0.2s, background 0.2s;
    letter-spacing:0.02em;
  }
  .pf-nav-links a:hover { opacity:1; background: var(--accent-dim); }
  .pf-nav-links a.active { opacity:1; color: var(--accent); }

  .pf-nav-right { display:flex; gap:0.75rem; align-items:center; }

  .theme-btn {
    width:38px; height:38px; border-radius:10px;
    border:1px solid var(--border-dark);
    background: transparent;
    display:flex; align-items:center; justify-content:center;
    cursor:pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  .dark .theme-btn  { border-color: var(--border-dark); }
  .light .theme-btn { border-color: var(--border-light); background: rgba(255,255,255,0.6); }
  .theme-btn:hover { background: var(--accent-dim); border-color: var(--accent); }

  /* ── Layout shell ──────────────────────────────────────────── */
  .pf-shell {
    display:flex; position:relative; z-index:1;
    padding-top: 64px;
  }

  /* ── Sidebar ───────────────────────────────────────────────── */
  .pf-sidebar {
    position:fixed; top:64px; left:0;
    width:300px; height:calc(100vh - 64px);
    overflow-y:auto; overflow-x:hidden;
    padding: 2rem 1.5rem;
    border-right: 1px solid var(--border-dark);
    display:flex; flex-direction:column; gap:1.5rem;
    transition: background var(--transition);
    scrollbar-width:thin;
    scrollbar-color: rgba(0,255,135,0.2) transparent;
  }
  .dark  .pf-sidebar { background: rgba(8,8,12,0.85); border-color: var(--border-dark); }
  .light .pf-sidebar { background: rgba(255,255,255,0.7); border-color: var(--border-light); }

  .pf-avatar-ring {
    position:relative; display:inline-block;
    border-radius:18px;
    padding:3px;
    background: linear-gradient(135deg, var(--g1), var(--g2));
  }
  .pf-avatar-ring img {
    width:100%; border-radius:15px;
    display:block;
  }

  .pf-status-dot {
    display:inline-flex; align-items:center; gap:6px;
    padding:4px 10px; border-radius:20px;
    font-family:var(--font-mono); font-size:0.7rem;
    background: rgba(0,255,135,0.1);
    border:1px solid rgba(0,255,135,0.25);
    color: var(--accent);
  }
  .pf-status-dot span.dot {
    width:6px;height:6px;border-radius:50%;
    background:var(--accent);
    box-shadow:0 0 6px var(--accent);
    animation:pulse-dot 2s infinite;
  }
  @keyframes pulse-dot {
    0%,100% { opacity:1; transform:scale(1); }
    50% { opacity:0.5; transform:scale(0.8); }
  }

  .pf-name {
    font-family:var(--font-display);
    font-size:1.3rem; font-weight:700;
    letter-spacing:-0.02em;
  }

  .pf-sidebar-btns {
    display:flex; gap:0.6rem;
  }
  .btn-outline {
    flex:1; padding:0.65rem 0;
    border-radius:10px;
    font-family:var(--font-mono);
    font-size:0.75rem; font-weight:500;
    cursor:pointer;
    display:flex;align-items:center;justify-content:center;gap:6px;
    transition:all 0.2s;
    text-decoration:none;
  }
  .dark  .btn-outline { background: rgba(255,255,255,0.04); border:1px solid var(--border-dark); color:#e8e8f0; }
  .light .btn-outline { background: rgba(0,0,0,0.04); border:1px solid var(--border-light); color:#0d0f14; }
  .btn-outline:hover { border-color:var(--accent); background:var(--accent-dim); }
  .btn-primary {
    flex:1; padding:0.65rem 0;
    border-radius:10px;
    font-family:var(--font-mono);
    font-size:0.75rem; font-weight:600;
    cursor:pointer; border:none;
    background: linear-gradient(135deg, var(--g1), var(--g2));
    color:#000;
    display:flex;align-items:center;justify-content:center;gap:6px;
    transition:all 0.2s;
    text-decoration:none;
    box-shadow:0 4px 20px rgba(0,255,135,0.25);
  }
  .btn-primary:hover { box-shadow:0 4px 30px rgba(0,255,135,0.45); transform:translateY(-1px); }

  .pf-socials {
    display:flex; gap:0.5rem;
  }
  .pf-social-icon {
    width:36px;height:36px;border-radius:9px;
    display:flex;align-items:center;justify-content:center;
    text-decoration:none; transition:all 0.2s;
    font-size:0.9rem;
  }
  .dark  .pf-social-icon { background:rgba(255,255,255,0.05); border:1px solid var(--border-dark); color:#e8e8f0; }
  .light .pf-social-icon { background:rgba(0,0,0,0.05); border:1px solid var(--border-light); color:#0d0f14; }
  .pf-social-icon:hover { background:var(--accent-dim); border-color:var(--accent); color:var(--accent); transform:translateY(-2px); }

  .pf-contact-info { display:flex; flex-direction:column; gap:0.75rem; }
  .pf-contact-row {
    display:flex; align-items:flex-start; gap:0.75rem;
    font-size:0.8rem;
  }
  .pf-contact-row .icon { color:var(--accent); margin-top:2px; flex-shrink:0; }
  .pf-contact-row .label { font-family:var(--font-mono); font-size:0.65rem; opacity:0.45; text-transform:uppercase; letter-spacing:0.06em; }
  .pf-contact-row .val { font-size:0.8rem; margin-top:1px; }

  /* ── Main content ──────────────────────────────────────────── */
  .pf-main {
    margin-left:300px; flex:1;
    padding: 0 3rem 4rem;
    max-width:1000px;
  }

  /* ── Section ──────────────────────────────────────────────── */
  .pf-section { padding: 5rem 0 0; }

  .section-label {
    display:inline-flex;align-items:center;gap:8px;
    font-family:var(--font-mono);font-size:0.7rem;
    letter-spacing:0.12em;text-transform:uppercase;
    color:var(--accent); margin-bottom:1rem;
  }
  .section-label::before {
    content:'';display:block;width:20px;height:1px;background:var(--accent);
  }

  .section-title {
    font-family:var(--font-display);
    font-size:2rem; font-weight:800;
    letter-spacing:-0.03em;
    line-height:1.15;
    margin-bottom:2.5rem;
  }

  /* ── Hero ──────────────────────────────────────────────────── */
  .pf-hero { padding:5rem 0 3rem; }
  .hero-greeting {
    display:flex;align-items:center;gap:8px;
    font-family:var(--font-mono);font-size:0.8rem;
    opacity:0.55; margin-bottom:1.2rem;
  }
  .hero-title {
    font-family:var(--font-display);
    font-size:clamp(2.2rem,4vw,3.6rem);
    font-weight:800; letter-spacing:-0.04em;
    line-height:1.08; margin-bottom:1rem;
  }
  .hero-title .name-highlight {
    background: linear-gradient(135deg, var(--g1) 0%, var(--g2) 100%);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  }
  .hero-typing {
    font-family:var(--font-mono);font-size:1.05rem;
    color:var(--accent); display:flex;align-items:center;gap:2px;
    margin-bottom:1.5rem; min-height:1.6rem;
  }
  .cursor { animation: blink 1s step-end infinite; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

  .hero-bio {
    max-width:580px; font-size:0.95rem; line-height:1.75;
    opacity:0.65; margin-bottom:2.5rem;
  }

  .hero-btns { display:flex; gap:1rem; flex-wrap:wrap; margin-bottom:3rem; }

  .hero-scroll {
    display:flex;align-items:center;gap:8px;
    font-family:var(--font-mono);font-size:0.72rem;opacity:0.35;
    animation: float-y 3s ease-in-out infinite;
  }
  @keyframes float-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

  /* ── Stats grid ────────────────────────────────────────────── */
  .stats-grid {
    display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;
    margin-bottom:0;
  }
  .stat-card {
    padding:1.5rem;border-radius:var(--radius);
    text-align:center;
    border:1px solid;
    transition:all var(--transition);
    cursor:default;
    position:relative; overflow:hidden;
  }
  .dark  .stat-card { background:var(--card-bg-dark); border-color:var(--border-dark); }
  .light .stat-card { background:var(--card-bg-light); border-color:var(--border-light); backdrop-filter:blur(12px); }
  .stat-card::before {
    content:'';position:absolute;inset:0;
    background: linear-gradient(135deg, rgba(0,255,135,0.06) 0%, transparent 60%);
    opacity:0;transition:opacity 0.3s;
  }
  .stat-card:hover::before { opacity:1; }
  .stat-card:hover { transform:translateY(-3px); border-color:rgba(0,255,135,0.3); box-shadow:0 8px 30px rgba(0,255,135,0.1); }
  .stat-val { font-family:var(--font-display); font-size:1.8rem; font-weight:800; color:var(--accent); }
  .stat-lbl { font-family:var(--font-mono); font-size:0.65rem; opacity:0.45; text-transform:uppercase; letter-spacing:0.08em; margin-top:4px; }

  /* ── Timeline (Experience) ────────────────────────────────── */
  .timeline { position:relative; padding-left:2rem; }
  .timeline::before {
    content:''; position:absolute; left:0; top:8px; bottom:0;
    width:1px; background: linear-gradient(to bottom, var(--accent), transparent);
  }
  .timeline-item {
    position:relative; padding:1.75rem;
    border-radius:var(--radius); border:1px solid;
    margin-bottom:1.25rem;
    transition:all var(--transition);
  }
  .dark  .timeline-item { background:var(--card-bg-dark); border-color:var(--border-dark); }
  .light .timeline-item { background:var(--card-bg-light); border-color:var(--border-light); backdrop-filter:blur(12px); }
  .timeline-item:hover { border-color:rgba(0,255,135,0.3); box-shadow:0 4px 24px rgba(0,255,135,0.08); }
  .timeline-item::before {
    content:''; position:absolute; left:-2.4rem; top:50%;
    transform:translateY(-50%);
    width:10px;height:10px;border-radius:50%;
    background:var(--accent); box-shadow:0 0 12px var(--accent);
  }
  .tl-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.6rem; }
  .tl-role { font-family:var(--font-display); font-size:1rem; font-weight:700; }
  .tl-company { font-family:var(--font-mono); font-size:0.75rem; opacity:0.5; margin-top:2px; }
  .tl-period { font-family:var(--font-mono); font-size:0.72rem; color:var(--accent); white-space:nowrap; margin-left:1rem; }
  .tl-desc { font-size:0.85rem; line-height:1.7; opacity:0.6; }

  /* ── Project cards ─────────────────────────────────────────── */
  .projects-grid { display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; }
  .project-card {
    border-radius:var(--radius); border:1px solid;
    overflow:hidden; cursor:pointer;
    transition:all var(--transition); position:relative;
  }
  .dark  .project-card { background:var(--card-bg-dark); border-color:var(--border-dark); }
  .light .project-card { background:var(--card-bg-light); border-color:var(--border-light); backdrop-filter:blur(12px); }
  .project-card:hover { transform:translateY(-4px); border-color:rgba(0,255,135,0.35); box-shadow:0 12px 40px rgba(0,255,135,0.12); }

  .project-img-wrap {
    height:220px; overflow:hidden;
    display:flex;align-items:center;justify-content:center;
    position:relative;
  }
  .project-img-wrap img {
    width:85%; transition:transform 0.5s cubic-bezier(0.4,0,0.2,1);
    position:relative;z-index:1;
  }
  .project-card:hover .project-img-wrap img { transform:scale(1.06) translateY(-4px); }
  .project-img-overlay {
    position:absolute;inset:0;
    background: linear-gradient(to top, rgba(6,6,10,0.6) 0%, transparent 60%);
  }
  .light .project-img-overlay {
    background: linear-gradient(to top, rgba(240,242,245,0.6) 0%, transparent 60%);
  }

  .project-info { padding:1rem 1.25rem; }
  .project-name { font-family:var(--font-display); font-size:1rem; font-weight:700; margin-bottom:2px; }
  .project-meta { font-family:var(--font-mono); font-size:0.7rem; opacity:0.4; }
  .project-ext { color:rgba(255,255,255,0.3); transition:all 0.2s; }
  .project-card:hover .project-ext { color:var(--accent); transform:scale(1.1); }

  /* Project overlay on hover */
  .project-overlay {
    position:absolute;inset:0;
    backdrop-filter:blur(16px);
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    opacity:0; transition:opacity 0.3s;
    z-index:10; border-radius:var(--radius);
    padding:1.5rem;
  }
  .dark  .project-overlay { background:rgba(6,6,10,0.93); }
  .light .project-overlay { background:rgba(240,242,245,0.95); }
  .project-card:hover .project-overlay { opacity:1; }

  .overlay-title { font-family:var(--font-display); font-size:1.2rem; font-weight:800; margin-bottom:0.5rem; text-align:center; }
  .overlay-desc { font-size:0.8rem; opacity:0.6; text-align:center; line-height:1.6; margin-bottom:1rem; }
  .overlay-stack { display:flex;flex-wrap:wrap;gap:0.6rem;justify-content:center;margin-bottom:1.25rem; }
  .tech-badge {
    display:flex;flex-direction:column;align-items:center;gap:4px;
  }
  .tech-icon {
    width:36px;height:36px;border-radius:9px;
    display:flex;align-items:center;justify-content:center;
    font-size:1.2rem; transition:transform 0.2s;
  }
  .tech-icon:hover { transform:scale(1.1) translateY(-2px); }
  .tech-name { font-family:var(--font-mono); font-size:0.6rem; opacity:0.5; }

  .overlay-link {
    display:inline-flex;align-items:center;gap:6px;
    padding:0.5rem 1.2rem; border-radius:8px;
    font-family:var(--font-mono); font-size:0.75rem; font-weight:500;
    background:linear-gradient(135deg,var(--g1),var(--g2));
    color:#000; text-decoration:none;
    transition:box-shadow 0.2s, transform 0.2s;
  }
  .overlay-link:hover { box-shadow:0 4px 20px rgba(0,255,135,0.4); transform:translateY(-1px); }

  /* ── Skills section ────────────────────────────────────────── */
  .skills-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }
  .skill-card {
    padding:1rem;border-radius:var(--radius);border:1px solid;
    display:flex;align-items:center;gap:0.85rem;
    transition:all var(--transition); cursor:default;
  }
  .dark  .skill-card { background:var(--card-bg-dark); border-color:var(--border-dark); }
  .light .skill-card { background:var(--card-bg-light); border-color:var(--border-light); backdrop-filter:blur(12px); }
  .skill-card:hover { transform:translateY(-3px) scale(1.01); border-color:rgba(0,255,135,0.3); box-shadow:0 6px 24px rgba(0,255,135,0.1); }
  .skill-icon {
    width:42px;height:42px;border-radius:10px;
    display:flex;align-items:center;justify-content:center;
    font-size:1.3rem; flex-shrink:0;
    transition:transform 0.3s;
  }
  .skill-card:hover .skill-icon { transform:scale(1.1) rotate(-5deg); }
  .skill-name { font-family:var(--font-display); font-size:0.85rem; font-weight:700; }
  .skill-role { font-family:var(--font-mono); font-size:0.65rem; opacity:0.4; margin-top:2px; }

  /* ── What I Do ─────────────────────────────────────────────── */
  .services-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }
  .service-card {
    padding:1.5rem;border-radius:var(--radius);border:1px solid;
    transition:all var(--transition); cursor:default;
    position:relative; overflow:hidden;
  }
  .dark  .service-card { background:var(--card-bg-dark); border-color:var(--border-dark); }
  .light .service-card { background:var(--card-bg-light); border-color:var(--border-light); backdrop-filter:blur(12px); }
  .service-card::after {
    content:''; position:absolute; bottom:0; left:0; right:0;
    height:2px; background:linear-gradient(90deg,var(--g1),var(--g2));
    transform:scaleX(0); transform-origin:left;
    transition:transform 0.3s;
  }
  .service-card:hover { transform:translateY(-4px); border-color:rgba(0,255,135,0.25); box-shadow:0 8px 32px rgba(0,255,135,0.1); }
  .service-card:hover::after { transform:scaleX(1); }
  .service-icon-wrap {
    width:44px;height:44px;border-radius:11px;
    background:var(--accent-dim); border:1px solid rgba(0,255,135,0.2);
    display:flex;align-items:center;justify-content:center;
    margin-bottom:1rem;
  }
  .service-title { font-family:var(--font-display); font-size:0.9rem; font-weight:700; }

  /* ── Education ─────────────────────────────────────────────── */
  .edu-card {
    padding:1.5rem;border-radius:var(--radius);border:1px solid;
    margin-bottom:1rem; transition:all var(--transition);
  }
  .dark  .edu-card { background:var(--card-bg-dark); border-color:var(--border-dark); }
  .light .edu-card { background:var(--card-bg-light); border-color:var(--border-light); backdrop-filter:blur(12px); }
  .edu-card:hover { border-color:rgba(0,255,135,0.3); }
  .edu-degree { font-family:var(--font-display); font-weight:700; }
  .edu-school { font-family:var(--font-mono); font-size:0.75rem; opacity:0.45; margin-top:3px; }
  .edu-period { font-family:var(--font-mono); font-size:0.72rem; color:var(--accent); }

  /* ── Terminal ──────────────────────────────────────────────── */
  .terminal-wrap {
    border-radius:var(--radius); border:1px solid;
    overflow:hidden; font-family:var(--font-mono);
  }
  .dark  .terminal-wrap { background:#0a0a0e; border-color:rgba(0,255,135,0.2); }
  .light .terminal-wrap { background:#1a1a1e; border-color:rgba(0,255,135,0.2); }
  .terminal-bar {
    padding:0.65rem 1rem; display:flex; align-items:center; gap:6px;
    background:rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.06);
  }
  .terminal-dot { width:11px;height:11px;border-radius:50%; }
  .terminal-title { font-size:0.72rem; opacity:0.35; margin-left:auto; letter-spacing:0.05em; }
  .terminal-body { padding:1.25rem; min-height:220px; max-height:300px; overflow-y:auto; }
  .terminal-line { font-size:0.8rem; line-height:1.8; color:#d0ffd0; }
  .terminal-line.dim { color:rgba(255,255,255,0.3); }
  .terminal-line.accent { color:var(--accent); }
  .terminal-input-row { display:flex; align-items:center; gap:8px; margin-top:0.5rem; }
  .terminal-prompt { color:var(--accent); font-size:0.8rem; }
  .terminal-input {
    background:transparent; border:none; outline:none;
    color:#d0ffd0; font-family:var(--font-mono); font-size:0.8rem;
    flex:1; caret-color:var(--accent);
  }

  /* ── GitHub section ────────────────────────────────────────── */
  .github-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1rem; }
  .github-card {
    padding:1.5rem;border-radius:var(--radius);border:1px solid;
    transition:all var(--transition);
  }
  .dark  .github-card { background:var(--card-bg-dark); border-color:var(--border-dark); }
  .light .github-card { background:var(--card-bg-light); border-color:var(--border-light); backdrop-filter:blur(12px); }
  .github-card:hover { border-color:rgba(0,255,135,0.3); }
  .github-stat-val { font-family:var(--font-display); font-size:2rem; font-weight:800; color:var(--accent); }
  .github-stat-lbl { font-family:var(--font-mono); font-size:0.7rem; opacity:0.45; margin-top:4px; }
  .github-repo-name { font-family:var(--font-display); font-size:0.9rem; font-weight:700; margin-bottom:4px; }
  .github-repo-desc { font-size:0.78rem; opacity:0.5; margin-bottom:0.75rem; }
  .github-repo-meta { display:flex;gap:1rem;font-family:var(--font-mono);font-size:0.68rem;opacity:0.4; }
  .github-lang-dot { width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:4px; }

  /* ── Contact ────────────────────────────────────────────────── */
  .contact-grid { display:grid;grid-template-columns:1fr 1fr;gap:2.5rem; }
  .contact-heading { font-family:var(--font-display);font-size:1.6rem;font-weight:800;letter-spacing:-0.03em;margin-bottom:0.75rem; }
  .contact-sub { font-size:0.88rem;opacity:0.55;line-height:1.7;margin-bottom:2rem; }

  .form-field { margin-bottom:1rem; }
  .form-input, .form-textarea {
    width:100%; padding:0.85rem 1rem;
    border-radius:10px; border:1px solid;
    font-family:var(--font-body); font-size:0.88rem;
    background:transparent; outline:none;
    transition:all 0.2s;
    color:inherit;
  }
  .dark  .form-input, .dark  .form-textarea { border-color:var(--border-dark); background:rgba(255,255,255,0.03); }
  .light .form-input, .light .form-textarea { border-color:var(--border-light); background:rgba(0,0,0,0.03); }
  .form-input:focus, .form-textarea:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(0,255,135,0.08); }
  .form-textarea { resize:none; }
  .form-input::placeholder, .form-textarea::placeholder { opacity:0.35; }

  .success-banner {
    padding:0.75rem;border-radius:10px;
    background:rgba(0,255,135,0.08); border:1px solid rgba(0,255,135,0.25);
    display:flex;align-items:center;gap:8px;
    font-family:var(--font-mono);font-size:0.78rem;color:var(--accent);
    margin-bottom:1rem;
    animation:fade-in 0.3s ease;
  }
  @keyframes fade-in { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }

  /* ── Footer ────────────────────────────────────────────────── */
  .pf-footer {
    margin-top:5rem; padding:2.5rem;
    border-radius:var(--radius); border:1px solid;
    text-align:center;
    font-family:var(--font-mono); font-size:0.78rem; opacity:0.45;
  }
  .dark  .pf-footer { background:var(--card-bg-dark); border-color:var(--border-dark); }
  .light .pf-footer { background:var(--card-bg-light); border-color:var(--border-light); }

  /* ── PDF Modal ─────────────────────────────────────────────── */
  .modal-backdrop {
    position:fixed;inset:0;z-index:1000;
    background:rgba(0,0,0,0.7); backdrop-filter:blur(12px);
    display:flex;align-items:center;justify-content:center;
    padding:1.5rem; animation:fade-in 0.2s ease;
  }
  .modal-box {
    width:100%;max-width:760px;border-radius:20px;border:1px solid;
    padding:1.5rem;
  }
  .dark  .modal-box { background:#0c0c12; border-color:rgba(0,255,135,0.2); }
  .light .modal-box { background:#fff; border-color:rgba(0,255,135,0.2); }
  .modal-header { display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem; }
  .modal-title { font-family:var(--font-display);font-size:1.1rem;font-weight:700; }
  .modal-close { background:none;border:none;cursor:pointer;opacity:0.4;transition:opacity 0.2s; font-size:1.3rem; color:inherit; }
  .modal-close:hover { opacity:1; }
  .modal-footer { display:flex;justify-content:flex-end;gap:0.75rem;margin-top:1rem; }

  /* ── Load more btn ─────────────────────────────────────────── */
  .load-more-btn {
    width:100%;padding:0.85rem;border-radius:10px;border:1px solid;
    font-family:var(--font-mono);font-size:0.78rem;cursor:pointer;
    background:transparent; transition:all 0.2s; color:inherit;
    margin-top:1.5rem;
  }
  .dark  .load-more-btn { border-color:var(--border-dark); }
  .light .load-more-btn { border-color:var(--border-light); }
  .load-more-btn:hover { border-color:var(--accent); background:var(--accent-dim); color:var(--accent); }

  /* ── Responsive ─────────────────────────────────────────────── */
  @media (max-width:1100px) {
    .pf-main { padding: 0 2rem 4rem; }
    .projects-grid { grid-template-columns:1fr; }
    .skills-grid { grid-template-columns:repeat(2,1fr); }
    .services-grid { grid-template-columns:repeat(2,1fr); }
    .stats-grid { grid-template-columns:repeat(2,1fr); }
    .github-grid { grid-template-columns:1fr; }
  }
  @media (max-width:900px) {
    .pf-sidebar { display:none; }
    .pf-main { margin-left:0; padding: 0 1.5rem 4rem; }
    .pf-nav-links { display:none; }
    .contact-grid { grid-template-columns:1fr; }
  }
  @media (max-width:600px) {
    .stats-grid { grid-template-columns:repeat(2,1fr); }
    .skills-grid { grid-template-columns:1fr 1fr; }
    .services-grid { grid-template-columns:1fr; }
    .projects-grid { grid-template-columns:1fr; }
  }
`;

/* ─── Terminal logic ─────────────────────────────────────────────────────── */
const TERMINAL_COMMANDS = {
    help: ['Available commands:', '  about     – who I am', '  projects  – my work', '  skills    – tech stack', '  contact   – reach me', '  clear     – clear screen'],
    about: ['Zakaryae Rouane – Full Stack Developer', '20y/o • Meknès, Morocco', 'Frontend + Backend + UI Design', 'Passionate about scalable web apps.'],
    projects: ['Recent projects:', '→ Homixstore   (E-commerce)', '→ Portfolio v2 (React)', '→ ... and more – scroll up to explore!'],
    skills: ['Core stack:', '→ React, Next.js, Node.js', '→ TypeScript, MongoDB, MySQL', '→ TailwindCSS, Docker, Git'],
    contact: ['📧 zakaryaerouane@gmail.com', '📱 +(212) 618-382385', '📍 Meknès, Morocco', '💬 WhatsApp: wa.me/212618382385'],
};

function TerminalSection({ isDark }) {
    const [lines, setLines] = useState([{ text: 'Welcome! Type "help" to explore.', cls: 'accent' }]);
    const [input, setInput] = useState('');
    const bodyRef = useRef(null);

    const runCommand = (cmd) => {
        const trimmed = cmd.trim().toLowerCase();
        const newLines = [...lines, { text: `$ ${cmd}`, cls: 'accent' }];
        if (trimmed === 'clear') { setLines([]); return; }
        const output = TERMINAL_COMMANDS[trimmed];
        if (output) {
            output.forEach(l => newLines.push({ text: l, cls: '' }));
        } else if (trimmed) {
            newLines.push({ text: `Command not found: "${trimmed}". Try "help".`, cls: 'dim' });
        }
        setLines(newLines);
    };

    useEffect(() => {
        if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, [lines]);

    return (
        <div className="terminal-wrap">
            <div className="terminal-bar">
                <div className="terminal-dot" style={{ background: '#ff5f56' }} />
                <div className="terminal-dot" style={{ background: '#ffbd2e' }} />
                <div className="terminal-dot" style={{ background: '#27c93f' }} />
                <span className="terminal-title">zak@portfolio ~ bash</span>
            </div>
            <div className="terminal-body" ref={bodyRef}>
                {lines.map((l, i) => <div key={i} className={`terminal-line ${l.cls || ''}`}>{l.text}</div>)}
                <div className="terminal-input-row">
                    <span className="terminal-prompt">$</span>
                    <input
                        className="terminal-input"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') { runCommand(input); setInput(''); } }}
                        placeholder="type a command..."
                        spellCheck={false}
                        autoComplete="off"
                    />
                </div>
            </div>
        </div>
    );
}

/* ─── GitHub section ────────────────────────────────────────────────────── */
function GitHubSection({ isDark }) {
    const [data, setData] = useState(null);
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        fetch('https://api.github.com/users/zakaryaerouane')
            .then(r => r.json()).then(setData).catch(() => { });
        fetch('https://api.github.com/users/zakaryaerouane/repos?sort=stars&per_page=4')
            .then(r => r.json()).then(d => Array.isArray(d) && setRepos(d)).catch(() => { });
    }, []);

    const langColors = { JavaScript: '#f1e05a', TypeScript: '#3178c6', HTML: '#e34c26', CSS: '#563d7c', Python: '#3572a5' };

    return (
        <div>
            <div className="github-grid" style={{ marginBottom: '1rem' }}>
                {[
                    { val: data?.public_repos ?? '—', lbl: 'Public Repos' },
                    { val: data?.followers ?? '—', lbl: 'Followers' },
                    { val: repos.reduce((s, r) => s + (r.stargazers_count || 0), 0) || '—', lbl: 'Total Stars' },
                    { val: data?.following ?? '—', lbl: 'Following' },
                ].map((s, i) => (
                    <div key={i} className="github-card">
                        <div className="github-stat-val">{s.val}</div>
                        <div className="github-stat-lbl">{s.lbl}</div>
                    </div>
                ))}
            </div>
            <div className="github-grid">
                {repos.slice(0, 4).map((repo, i) => (
                    <a key={i} href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="github-card" style={{ height: '100%' }}>
                            <div className="github-repo-name">{repo.name}</div>
                            <div className="github-repo-desc">{repo.description || 'No description.'}</div>
                            <div className="github-repo-meta">
                                {repo.language && <span><span className="github-lang-dot" style={{ background: langColors[repo.language] || '#aaa' }} />{repo.language}</span>}
                                <span>★ {repo.stargazers_count}</span>
                                <span>⑂ {repo.forks_count}</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
const ThirdPortfolio = () => {
    const [isDark, setIsDark] = useState(() => {
        try { const s = localStorage.getItem("theme"); if (s) return s === 'dark'; } catch { }
        return true;
    });

    useEffect(() => {
        try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch { }
    }, [isDark]);

    // Typing effect
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [textIdx, setTextIdx] = useState(0);
    const texts = ['Full Stack Developer.', 'I build modern, scalable web apps.'];

    useEffect(() => {
        const current = texts[textIdx];
        let timeout;
        if (!isDeleting && typedText.length < current.length) {
            timeout = setTimeout(() => setTypedText(current.slice(0, typedText.length + 1)), 80);
        } else if (!isDeleting && typedText.length === current.length) {
            timeout = setTimeout(() => setIsDeleting(true), 1800);
        } else if (isDeleting && typedText.length > 0) {
            timeout = setTimeout(() => setTypedText(typedText.slice(0, -1)), 45);
        } else if (isDeleting && typedText.length === 0) {
            setIsDeleting(false);
            setTextIdx(p => (p + 1) % texts.length);
        }
        return () => clearTimeout(timeout);
    }, [typedText, isDeleting, textIdx]);

    const [showPDF, setShowPDF] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formState, handleSubmit] = useForm("xblnoqrz");
    const [formdata, setFormdata] = useState({ fullname: '', email: '', phonenumber: '', message: '' });
    const [visibleCount, setVisibleCount] = useState(6);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        if (formState.succeeded) {
            setFormdata({ fullname: '', email: '', phonenumber: '', message: '' });
            setShowSuccess(true);
            const t = setTimeout(() => setShowSuccess(false), 4000);
            return () => clearTimeout(t);
        }
    }, [formState.succeeded]);

    const navLinks = ['About', 'Projects', 'Experience', 'Skills', 'Contact'];

    return (
        <>
            <style>{CSS}</style>
            <div className={`pf-root ${isDark ? 'dark' : 'light'}`}>
                <div className="pf-noise" />
                <div className="pf-orbs"><div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" /></div>
                <div className="pf-grid" />

                {/* ── Navbar ── */}
                <nav className="pf-nav">
                    <div className="pf-nav-logo">ZR.</div>
                    <ul className="pf-nav-links">
                        {navLinks.map(n => (
                            <li key={n}><a href={`#${n.toLowerCase()}`}>{n}</a></li>
                        ))}
                    </ul>
                    <div className="pf-nav-right">
                        <button className="theme-btn" onClick={() => setIsDark(p => !p)} aria-label="Toggle theme">
                            {isDark ? <Sun size={16} color="#facc15" /> : <FaMoon size={14} color="#374151" />}
                        </button>
                    </div>
                </nav>

                <div className="pf-shell">
                    {/* ── Sidebar ── */}
                    <aside className="pf-sidebar">
                        <div style={{ textAlign: 'center' }}>
                            <div className="pf-avatar-ring" style={{ width: '140px', margin: '0 auto 1rem' }}>
                                <img loading="lazy" src="images/zakaryaerouane.webp" alt="Zakaryae Rouane" />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.6rem' }}>
                                <span className="pf-status-dot"><span className="dot" />Available for work</span>
                            </div>
                            <h2 className="pf-name">Zakaryae Rouane</h2>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', opacity: 0.4, marginTop: '4px' }}>Full Stack Developer</p>
                        </div>

                        <div className="pf-sidebar-btns">
                            <button className="btn-outline" onClick={() => setShowPDF(true)}>
                                <Download size={13} />Download CV
                            </button>
                            <a href="https://wa.me/212618382385" target="_blank" rel="noopener noreferrer" className="btn-primary">
                                <LuSend size={13} />Contact
                            </a>
                        </div>

                        <div className="pf-socials">
                            {socials.map((s, i) => (
                                <a key={i} href={s.link} target="_blank" rel="noopener noreferrer" className="pf-social-icon">
                                    {s.icon}
                                </a>
                            ))}
                        </div>

                        <div className="pf-contact-info">
                            {[
                                { Icon: Phone, label: 'Phone', val: '+(212) 618-382385' },
                                { Icon: Mail, label: 'Email', val: 'zakaryaerouane@gmail.com' },
                                { Icon: MapPin, label: 'Location', val: 'Meknès, Morocco' },
                            ].map(({ Icon, label, val }, i) => (
                                <div key={i} className="pf-contact-row">
                                    <Icon size={14} className="icon" />
                                    <div>
                                        <div className="label">{label}</div>
                                        <div className="val">{val}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* ── Main ── */}
                    <main className="pf-main">

                        {/* ── Hero ── */}
                        <section id="about" className="pf-hero">
                            <div className="hero-greeting">
                                <img loading="lazy" src="images/hand1.webp" alt="" style={{ width: '18px' }} />
                                Hey there, I'm
                            </div>
                            <h1 className="hero-title">
                                <span className="name-highlight">Zakaryae Rouane,</span><br />
                                based in Meknes, MA.
                            </h1>
                            <div className="hero-typing">
                                {typedText}<span className="cursor">|</span>
                            </div>
                            <p className="hero-bio">
                                20-year-old Full-Stack Web Developer. I handle frontend, backend, and UI design
                                using modern web technologies to build complete, scalable, and user-friendly digital solutions.
                            </p>
                            <div className="hero-btns">
                                <button className="btn-primary" style={{ padding: '0.75rem 1.75rem', flex: 'unset' }} onClick={() => setShowPDF(true)}>
                                    <Download size={15} /> Download CV
                                </button>
                                <a href="#projects" className="btn-outline" style={{ padding: '0.75rem 1.75rem', flex: 'unset' }}>
                                    View My Work <ChevronRight size={14} />
                                </a>
                            </div>
                            <div className="hero-scroll">
                                <ArrowDown size={13} /> scroll to explore
                            </div>
                        </section>

                        {/* ── Stats ── */}
                        <div className="stats-grid" style={{ marginBottom: '5rem' }}>
                            {stats.map((s, i) => (
                                <div key={i} className="stat-card">
                                    <div className="stat-val"><CountUp from={0} to={s.value} duration={1} />+</div>
                                    <div className="stat-lbl">{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* ── Projects ── */}
                        <section id="projects" className="pf-section">
                            <div className="section-label">My Work</div>
                            <h2 className="section-title">Featured Projects</h2>
                            <div className="projects-grid">
                                {projects.slice(0, visibleCount).map((project, i) => (
                                    <div key={i} className="project-card">
                                        <div className={`project-img-wrap ${project.color}`}>
                                            <div className="project-img-overlay" />
                                            <img loading="lazy" src={project.image} alt={project.name} />
                                        </div>
                                        <div className="project-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <div className="project-name">{project.name}</div>
                                                <div className="project-meta">{project.category} • {project.pages}</div>
                                            </div>
                                            <a href={project.path} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                                                <ExternalLink size={16} className="project-ext" />
                                            </a>
                                        </div>
                                        {/* Hover overlay */}
                                        <div className="project-overlay">
                                            <div className="overlay-title">{project.name}</div>
                                            <div className="overlay-desc">{project.desc || 'A modern web application.'}</div>
                                            <div className="overlay-stack">
                                                {project.stack.map((tech, idx) => (
                                                    <div key={idx} className="tech-badge">
                                                        <div className={`tech-icon ${tech.color ? `bg-gradient-to-br ${tech.color}` : ''}`} style={tech.color ? {} : { background: 'rgba(255,255,255,0.08)' }}>
                                                            {tech.icon || tech}
                                                        </div>
                                                        <span className="tech-name">{tech.name || tech}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <a href={project.path} target="_blank" rel="noopener noreferrer" className="overlay-link">
                                                <ExternalLink size={13} /> View Live
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {!showAll && projects.length > visibleCount && (
                                <button className="load-more-btn" onClick={() => { setVisibleCount(projects.length); setShowAll(true); }}>
                                    Load More ({projects.length - visibleCount} more projects)
                                </button>
                            )}
                            {showAll && (
                                <button className="load-more-btn" onClick={() => { setVisibleCount(6); setShowAll(false); }}>
                                    Show Less
                                </button>
                            )}
                        </section>

                        {/* ── Experience ── */}
                        <section id="experience" className="pf-section">
                            <div className="section-label">Career</div>
                            <h2 className="section-title">Experience</h2>
                            <div className="timeline">
                                {jobs.map((job, i) => (
                                    <div key={i} className="timeline-item">
                                        <div className="tl-header">
                                            <div>
                                                <div className="tl-role">{job.role}</div>
                                                <div className="tl-company">{job.company}</div>
                                            </div>
                                            <div className="tl-period">{job.period}</div>
                                        </div>
                                        <div className="tl-desc">{job.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* ── Education ── */}
                        <section className="pf-section">
                            <div className="section-label">Learning</div>
                            <h2 className="section-title">Education</h2>
                            {Educations.map((edu, i) => (
                                <div key={i} className="edu-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <div className="edu-degree">{edu.degree}</div>
                                            <div className="edu-school">{edu.school}</div>
                                        </div>
                                        <div className="edu-period">{edu.period}</div>
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* ── What I Do ── */}
                        <section className="pf-section">
                            <div className="section-label">Services</div>
                            <h2 className="section-title">What I Do</h2>
                            <div className="services-grid">
                                {WhatIDo.map((item, i) => {
                                    const Icon = item.icon || FaRegLightbulb;
                                    return (
                                        <div key={i} className="service-card">
                                            <div className="service-icon-wrap">
                                                <Icon size={20} color="var(--accent)" />
                                            </div>
                                            <div className="service-title">{item.title}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* ── Skills ── */}
                        <section id="skills" className="pf-section">
                            <div className="section-label">Tech Stack</div>
                            <h2 className="section-title">Skills</h2>
                            <div className="skills-grid">
                                {skills.map((skill, i) => (
                                    <div key={i} className="skill-card">
                                        <div className={`skill-icon bg-gradient-to-br ${skill.color}`} style={{ color: 'white' }}>
                                            {skill.icon}
                                        </div>
                                        <div>
                                            <div className="skill-name">{skill.name}</div>
                                            <div className="skill-role">{skill.role}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* ── Terminal ── */}
                        <section className="pf-section">
                            <div className="section-label">Interactive</div>
                            <h2 className="section-title">Developer Terminal</h2>
                            <TerminalSection isDark={isDark} />
                        </section>

                        {/* ── GitHub ── */}
                        <section className="pf-section">
                            <div className="section-label">Open Source</div>
                            <h2 className="section-title">GitHub Activity</h2>
                            <GitHubSection isDark={isDark} />
                        </section>

                        {/* ── Contact ── */}
                        <section id="contact" className="pf-section">
                            <div className="contact-grid">
                                <div>
                                    <div className="section-label">Contact</div>
                                    <div className="contact-heading">Let's Build<br />Something Together</div>
                                    <p className="contact-sub">
                                        Have a project in mind? I'm available for freelance work and full-time roles.
                                        Let's create something remarkable.
                                    </p>
                                    <div className="pf-contact-info">
                                        {[
                                            { Icon: Phone, label: 'Phone', val: '+(212) 618-382385' },
                                            { Icon: Mail, label: 'Email', val: 'zakaryaerouane@gmail.com' },
                                            { Icon: MapPin, label: 'Location', val: 'Meknès, Morocco' },
                                        ].map(({ Icon, label, val }, i) => (
                                            <div key={i} className="pf-contact-row">
                                                <Icon size={14} className="icon" />
                                                <div>
                                                    <div className="label">{label}</div>
                                                    <div className="val">{val}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    {showSuccess && (
                                        <div className="success-banner">
                                            <IoMdCheckmarkCircleOutline size={16} />
                                            Message sent successfully!
                                        </div>
                                    )}
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-field">
                                            <input className="form-input" type="text" name="fullname" placeholder="Full Name"
                                                value={formdata.fullname} onChange={e => setFormdata({ ...formdata, fullname: e.target.value })} required />
                                        </div>
                                        <div className="form-field">
                                            <input className="form-input" id="email" type="email" name="email" placeholder="Email"
                                                value={formdata.email} onChange={e => setFormdata({ ...formdata, email: e.target.value })} required />
                                            <ValidationError prefix="Email" field="email" errors={formState.errors} />
                                        </div>
                                        <div className="form-field">
                                            <input className="form-input" type="tel" name="phone" placeholder="Phone Number"
                                                value={formdata.phonenumber} onChange={e => setFormdata({ ...formdata, phonenumber: e.target.value })} />
                                        </div>
                                        <div className="form-field">
                                            <textarea className="form-textarea" id="message" name="message" placeholder="Your message..." rows={5}
                                                value={formdata.message} onChange={e => setFormdata({ ...formdata, message: e.target.value })} required />
                                            <ValidationError prefix="Message" field="message" errors={formState.errors} />
                                        </div>
                                        <button type="submit" disabled={formState.submitting} className="btn-primary"
                                            style={{
                                                width: '100%', padding: '0.85rem', flex: 'unset', justifyContent: 'center', border: 'none',
                                                opacity: formState.submitting ? 0.6 : 1, cursor: formState.submitting ? 'not-allowed' : 'pointer'
                                            }}>
                                            {formState.submitting ? 'Sending...' : <><LuSend size={14} />Send Message</>}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </section>

                        <footer className="pf-footer">
                            Crafted by Zakaryae Rouane &nbsp;·&nbsp; {new Date().getFullYear()}
                            <IoMdCheckmarkCircleOutline size={13} style={{ color: 'var(--accent)', marginLeft: '6px', verticalAlign: 'middle' }} />
                        </footer>
                    </main>
                </div>

                {/* ── PDF Modal ── */}
                {showPDF && (
                    <div className="modal-backdrop" onClick={() => setShowPDF(false)}>
                        <div className="modal-box" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <div className="modal-title">CV / Resume</div>
                                <button className="modal-close" onClick={() => setShowPDF(false)}>✕</button>
                            </div>
                            <iframe src="pdf/zakaryaerouane(eng).pdf" style={{ width: '100%', height: '420px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.07)' }} title="CV" />
                            <div className="modal-footer">
                                <button className="btn-outline" style={{ padding: '0.55rem 1.2rem', flex: 'unset' }} onClick={() => setShowPDF(false)}>Close</button>
                                <a href="pdf/ZakaryaeRouaneCV(eng).pdf" download className="btn-primary" style={{ padding: '0.55rem 1.4rem', flex: 'unset' }}>
                                    <Download size={13} /> Download
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ThirdPortfolio;