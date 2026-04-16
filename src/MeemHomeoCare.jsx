import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Serif+Bengali:wght@400;600;700;900&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --green-dark: #1a5c2a;
    --green-mid: #2e7d32;
    --green-light: #4caf50;
    --gold: #f5a623;
    --gold-dark: #e08900;
    --red: #c0392b;
    --white: #ffffff;
    --offwhite: #f5f9f5;
    --gray: #6b7280;
    --text-dark: #1a2a1a;
    --shadow: 0 4px 24px rgba(26,92,42,0.13);
  }

  body { font-family: 'Hind Siliguri', sans-serif; background: var(--offwhite); color: var(--text-dark); }

  /* NAV */
  .navbar {
    background: linear-gradient(135deg, var(--green-dark) 0%, #0d3b18 100%);
    padding: 0;
    position: sticky; top: 0; z-index: 1000;
    box-shadow: 0 2px 20px rgba(0,0,0,0.3);
  }
  .nav-inner {
    max-width: 1200px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 24px;
  }
  .nav-logo {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 0;
    text-decoration: none;
    cursor: pointer;
  }
  .nav-logo-icon {
    width: 48px; height: 48px;
    background: linear-gradient(135deg, var(--gold), var(--gold-dark));
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    box-shadow: 0 2px 8px rgba(245,166,35,0.4);
    flex-shrink: 0;
  }
  .nav-logo-text { line-height: 1.1; }
  .nav-logo-text .bn-name { font-size: 18px; font-weight: 700; color: var(--gold); font-family: 'Noto Serif Bengali', serif; }
  .nav-logo-text .en-name { font-size: 11px; color: rgba(255,255,255,0.7); letter-spacing: 1px; text-transform: uppercase; }

  .nav-links { display: flex; gap: 4px; }
  .nav-link {
    color: rgba(255,255,255,0.85); font-size: 16px; font-weight: 500;
    padding: 18px 20px; cursor: pointer; border: none; background: none;
    font-family: 'Hind Siliguri', sans-serif;
    position: relative; transition: color 0.2s;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: 0; left: 50%; right: 50%;
    height: 3px; background: var(--gold); border-radius: 2px 2px 0 0;
    transition: left 0.2s, right 0.2s;
  }
  .nav-link:hover, .nav-link.active { color: var(--gold); }
  .nav-link:hover::after, .nav-link.active::after { left: 12px; right: 12px; }

  .nav-cta {
    background: linear-gradient(135deg, var(--gold), var(--gold-dark));
    color: var(--green-dark) !important; font-weight: 700 !important;
    border-radius: 6px; padding: 8px 18px !important;
    font-size: 14px !important;
    box-shadow: 0 2px 8px rgba(245,166,35,0.3);
    margin-left: 8px;
  }
  .nav-cta::after { display: none !important; }
  .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(245,166,35,0.5); color: var(--green-dark) !important; }

  /* SLIDER */
  .slider { position: relative; width: 100%; overflow: hidden; height: 420px; }
  .slider-track { display: flex; height: 100%; transition: transform 0.7s cubic-bezier(.77,0,.18,1); }
  .slide {
    min-width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .slide-bg { position: absolute; inset: 0; }
  .slide-content {
    position: relative; z-index: 2;
    text-align: center; padding: 32px 24px; max-width: 800px;
  }
  .slide-tag {
    display: inline-block;
    background: var(--gold); color: var(--green-dark);
    font-size: 13px; font-weight: 700; padding: 4px 16px;
    border-radius: 20px; margin-bottom: 18px; letter-spacing: 0.5px;
  }
  .slide-title {
    font-family: 'Noto Serif Bengali', serif;
    font-size: clamp(28px, 5vw, 52px); font-weight: 900;
    color: #fff; line-height: 1.15; margin-bottom: 16px;
    text-shadow: 0 2px 20px rgba(0,0,0,0.4);
  }
  .slide-subtitle { font-size: clamp(15px, 2.5vw, 20px); color: rgba(255,255,255,0.9); margin-bottom: 28px; }
  .slide-btn {
    display: inline-block; padding: 12px 32px;
    background: var(--gold); color: var(--green-dark);
    font-weight: 700; font-size: 16px; border-radius: 8px;
    cursor: pointer; border: none; font-family: 'Hind Siliguri', sans-serif;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .slide-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }

  .slider-arrow {
    position: absolute; top: 50%; transform: translateY(-50%);
    z-index: 10; background: rgba(255,255,255,0.18); backdrop-filter: blur(6px);
    border: 2px solid rgba(255,255,255,0.3); color: #fff;
    width: 46px; height: 46px; border-radius: 50%;
    cursor: pointer; font-size: 20px;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .slider-arrow:hover { background: rgba(255,255,255,0.35); }
  .slider-prev { left: 16px; }
  .slider-next { right: 16px; }
  .slider-dots { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; }
  .slider-dot {
    width: 10px; height: 10px; border-radius: 50%;
    background: rgba(255,255,255,0.4); cursor: pointer; border: none;
    transition: background 0.2s, transform 0.2s;
  }
  .slider-dot.active { background: var(--gold); transform: scale(1.3); }

  /* SECTIONS */
  .section { padding: 72px 24px; }
  .section-inner { max-width: 1200px; margin: 0 auto; }
  .section-header { text-align: center; margin-bottom: 56px; }
  .section-badge {
    display: inline-block; background: rgba(26,92,42,0.08);
    color: var(--green-dark); font-size: 13px; font-weight: 600;
    padding: 5px 18px; border-radius: 20px; margin-bottom: 14px;
    border: 1px solid rgba(26,92,42,0.15); letter-spacing: 0.5px;
  }
  .section-title {
    font-family: 'Noto Serif Bengali', serif;
    font-size: clamp(26px, 4vw, 40px); font-weight: 800;
    color: var(--green-dark); margin-bottom: 12px; line-height: 1.2;
  }
  .section-line {
    width: 60px; height: 4px;
    background: linear-gradient(90deg, var(--gold), var(--green-light));
    border-radius: 2px; margin: 0 auto 16px;
  }
  .section-desc { font-size: 17px; color: var(--gray); max-width: 600px; margin: 0 auto; line-height: 1.7; }

  .section-alt { background: linear-gradient(135deg, #f0f7f1 0%, #e8f5ea 100%); }
  .section-dark { background: linear-gradient(135deg, var(--green-dark) 0%, #0d3b18 100%); }
  .section-dark .section-title { color: #fff; }
  .section-dark .section-desc { color: rgba(255,255,255,0.75); }
  .section-dark .section-badge { background: rgba(255,255,255,0.12); color: var(--gold); border-color: rgba(255,255,255,0.2); }

  /* HERO STATS */
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 24px; }
  .stat-card {
    background: #fff; border-radius: 16px; padding: 32px 20px;
    text-align: center; box-shadow: var(--shadow);
    border: 1px solid rgba(26,92,42,0.08);
    transition: transform 0.25s, box-shadow 0.25s;
    position: relative; overflow: hidden;
  }
  .stat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, var(--green-dark), var(--green-light));
  }
  .stat-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(26,92,42,0.18); }
  .stat-icon { font-size: 38px; margin-bottom: 12px; }
  .stat-number { font-size: 38px; font-weight: 800; color: var(--green-dark); font-family: 'Noto Serif Bengali', serif; }
  .stat-label { font-size: 15px; color: var(--gray); margin-top: 4px; }

  /* SERVICES */
  .services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
  .service-card {
    background: rgba(255,255,255,0.06); border-radius: 16px; padding: 28px 24px;
    border: 1px solid rgba(255,255,255,0.12);
    transition: transform 0.25s, background 0.25s;
    backdrop-filter: blur(4px);
  }
  .service-card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.12); }
  .service-icon { font-size: 36px; margin-bottom: 14px; }
  .service-name { font-size: 18px; font-weight: 700; color: var(--gold); margin-bottom: 10px; font-family: 'Noto Serif Bengali', serif; }
  .service-desc { font-size: 14px; color: rgba(255,255,255,0.75); line-height: 1.6; }

  /* DOCTORS */
  .doctors-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 36px; }
  .doctor-card {
    background: #fff; border-radius: 20px; overflow: hidden;
    box-shadow: var(--shadow); border: 1px solid rgba(26,92,42,0.08);
    transition: transform 0.25s, box-shadow 0.25s;
  }
  .doctor-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(26,92,42,0.18); }
 .doctor-avatar {
  width: 200px;
  height: 200px;
  border-radius: 40%;
  overflow: hidden;
  margin: 0 auto 16px;
}

.doctor-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}
  .doc1-bg {
    background: linear-gradient(135deg, #bccec0 0%, #d2e7d3 50%, #bcd7be 100%);
}
  .doc2-bg { background: linear-gradient(135deg, #1565c0 0%, #1976d2 50%, #0d47a1 100%); }
  .doctor-avatar-emoji {
    font-size: 90px; line-height: 1;
    filter: drop-shadow(0 4px 16px rgba(0,0,0,0.2));
  }
  .doctor-body { padding: 28px; }
  .doctor-name {
    font-family: 'Noto Serif Bengali', serif;
    font-size: 22px; font-weight: 800; color: var(--green-dark); margin-bottom: 4px;
  }
  .doctor-title { font-size: 14px; color: var(--gold-dark); font-weight: 600; margin-bottom: 18px; }
  .doctor-qual-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .doctor-qual-list li {
    font-size: 14px; color: var(--gray);
    display: flex; align-items: flex-start; gap: 8px; line-height: 1.5;
  }
  .doctor-qual-list li::before { content: '🎓'; flex-shrink: 0; font-size: 13px; margin-top: 2px; }

  /* WHY US */
  .why-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 28px; }
  .why-card {
    background: #fff; border-radius: 16px; padding: 32px 24px;
    text-align: center; box-shadow: var(--shadow);
    border: 1px solid rgba(26,92,42,0.08);
    transition: transform 0.25s;
  }
  .why-card:hover { transform: translateY(-5px); }
  .why-icon { font-size: 44px; margin-bottom: 16px; }
  .why-title { font-size: 17px; font-weight: 700; color: var(--green-dark); margin-bottom: 10px; font-family: 'Noto Serif Bengali', serif; }
  .why-desc { font-size: 14px; color: var(--gray); line-height: 1.6; }

  /* ALL SERVICES PAGE */
  .services-list-section { padding: 72px 24px; }
  .services-categories { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 28px; }
  .cat-card {
    background: #fff; border-radius: 16px; padding: 28px;
    box-shadow: var(--shadow); border: 1px solid rgba(26,92,42,0.08);
  }
  .cat-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .cat-icon { font-size: 32px; }
  .cat-name { font-size: 18px; font-weight: 700; color: var(--green-dark); font-family: 'Noto Serif Bengali', serif; }
  .cat-items { display: flex; flex-wrap: wrap; gap: 8px; }
  .cat-item {
    background: rgba(26,92,42,0.06); color: var(--green-dark);
    font-size: 13px; padding: 5px 12px; border-radius: 20px;
    border: 1px solid rgba(26,92,42,0.12); font-weight: 500;
  }
  .highlight-banner {
    background: linear-gradient(135deg, var(--red) 0%, #922b21 100%);
    border-radius: 16px; padding: 36px 40px; margin-bottom: 48px;
    display: flex; align-items: center; gap: 28px; flex-wrap: wrap;
    box-shadow: 0 8px 32px rgba(192,57,43,0.25);
  }
  .highlight-icon { font-size: 56px; flex-shrink: 0; }
  .highlight-text { flex: 1; min-width: 200px; }
  .highlight-text h2 { font-family: 'Noto Serif Bengali', serif; font-size: clamp(20px,3vw,30px); color: #fff; font-weight: 800; margin-bottom: 10px; }
  .highlight-text p { color: rgba(255,255,255,0.85); font-size: 15px; line-height: 1.6; }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
  @media(max-width:768px){ .contact-grid { grid-template-columns:1fr; } }
  .contact-info-card {
    background: #fff; border-radius: 20px; padding: 40px;
    box-shadow: var(--shadow); border: 1px solid rgba(26,92,42,0.08);
  }
  .contact-info-title { font-family: 'Noto Serif Bengali', serif; font-size: 26px; font-weight: 800; color: var(--green-dark); margin-bottom: 28px; }
  .contact-item { display: flex; gap: 16px; margin-bottom: 24px; align-items: flex-start; }
  .contact-item-icon {
    width: 48px; height: 48px; border-radius: 12px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 22px;
  }
  .ci-green { background: rgba(26,92,42,0.1); }
  .ci-blue { background: rgba(33,150,243,0.1); }
  .ci-gold { background: rgba(245,166,35,0.1); }
  .ci-wa { background: rgba(37,211,102,0.1); }
  .contact-item-label { font-size: 12px; color: var(--gray); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .contact-item-value { font-size: 16px; color: var(--text-dark); font-weight: 500; }
  .hours-card {
    background: linear-gradient(135deg, var(--green-dark) 0%, #0d3b18 100%);
    border-radius: 20px; padding: 40px;
    box-shadow: 0 8px 32px rgba(26,92,42,0.3);
  }
  .hours-title { font-family: 'Noto Serif Bengali', serif; font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 28px; }
  .hours-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); }
  .hours-row:last-child { border-bottom: none; margin-bottom: 0; }
  .hours-day { font-size: 15px; color: rgba(255,255,255,0.8); }
  .hours-time { font-size: 14px; color: var(--gold); font-weight: 600; }
  .closed { color: #e57373 !important; }
  .map-embed {
    width: 100%; height: 280px; border-radius: 16px; overflow: hidden;
    border: none; margin-top: 32px; box-shadow: var(--shadow);
  }
  .contact-form { background: #fff; border-radius: 20px; padding: 40px; box-shadow: var(--shadow); }
  .form-title { font-family: 'Noto Serif Bengali', serif; font-size: 24px; font-weight: 800; color: var(--green-dark); margin-bottom: 24px; }
  .form-group { margin-bottom: 20px; }
  .form-label { display: block; font-size: 14px; color: var(--gray); margin-bottom: 8px; font-weight: 500; }
  .form-input, .form-textarea {
    width: 100%; padding: 12px 16px; border-radius: 10px;
    border: 2px solid rgba(26,92,42,0.15); font-size: 15px;
    font-family: 'Hind Siliguri', sans-serif; color: var(--text-dark);
    transition: border-color 0.2s; background: var(--offwhite);
  }
  .form-input:focus, .form-textarea:focus { outline: none; border-color: var(--green-mid); background: #fff; }
  .form-textarea { height: 120px; resize: vertical; }
  .form-btn {
    width: 100%; padding: 14px;
    background: linear-gradient(135deg, var(--green-dark), var(--green-mid));
    color: #fff; font-size: 16px; font-weight: 700; border: none; border-radius: 10px;
    cursor: pointer; font-family: 'Hind Siliguri', sans-serif;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .form-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(26,92,42,0.3); }

  /* FOOTER */
  .footer {
    background: linear-gradient(135deg, #0a2714 0%, #0d3b18 100%);
    color: rgba(255,255,255,0.75); padding: 56px 24px 24px;
  }
  .footer-inner { max-width: 1200px; margin: 0 auto; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
  @media(max-width:768px){ .footer-grid { grid-template-columns:1fr; gap:32px; } }
  .footer-brand .brand-name { font-family: 'Noto Serif Bengali', serif; font-size: 24px; font-weight: 800; color: var(--gold); margin-bottom: 8px; }
  .footer-brand p { font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.65); margin-bottom: 20px; }
  .footer-social { display: flex; gap: 10px; }
  .social-btn {
    width: 38px; height: 38px; border-radius: 50%;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center; font-size: 16px;
    cursor: pointer; transition: background 0.2s, transform 0.2s;
  }
  .social-btn:hover { background: var(--gold); transform: translateY(-2px); }
  .footer-col-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 18px; padding-bottom: 10px; border-bottom: 2px solid var(--gold); display: inline-block; }
  .footer-link { display: block; color: rgba(255,255,255,0.65); font-size: 14px; margin-bottom: 10px; cursor: pointer; transition: color 0.2s; }
  .footer-link:hover { color: var(--gold); }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
  .footer-bottom-text { font-size: 13px; color: rgba(255,255,255,0.5); }
  .footer-reg { font-size: 13px; color: var(--gold); font-weight: 600; }

  /* PAGE HERO */
  .page-hero {
    background: linear-gradient(135deg, var(--green-dark) 0%, #0d3b18 100%);
    padding: 64px 24px 72px; position: relative; overflow: hidden;
  }
  .page-hero::before {
    content: ''; position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .page-hero-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
  .page-hero h1 { font-family: 'Noto Serif Bengali', serif; font-size: clamp(30px,5vw,52px); font-weight: 900; color: #fff; margin-bottom: 12px; }
  .page-hero p { font-size: 18px; color: rgba(255,255,255,0.8); }
  .breadcrumb { display: flex; gap: 8px; align-items: center; margin-bottom: 20px; font-size: 14px; color: rgba(255,255,255,0.6); }
  .breadcrumb span { cursor: pointer; transition: color 0.2s; }
  .breadcrumb span:hover { color: var(--gold); }
  .breadcrumb .sep { color: rgba(255,255,255,0.3); }

  /* NOTICE BAND */
  .notice-band {
    background: linear-gradient(90deg, var(--red) 0%, #c62828 100%);
    padding: 10px 24px; overflow: hidden; white-space: nowrap;
  }
  .notice-inner { display: flex; gap: 48px; animation: marquee 22s linear infinite; }
  .notice-item { color: #fff; font-size: 14px; font-weight: 500; white-space: nowrap; }
  @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

  /* RESPONSIVE */
  @media(max-width:768px){
    .nav-links { display: none; }
    .slider { height: 300px; }
    .slide-title { font-size: 24px; }
    .page-hero h1 { font-size: 28px; }
    .doctors-grid { grid-template-columns: 1fr; }
    .services-categories { grid-template-columns: 1fr; }
  }


  /* ANIMATIONS */
  @keyframes fadeInUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  .fade-in { animation: fadeInUp 0.6s ease forwards; }
  .fade-in-d1 { animation-delay:0.1s; opacity:0; }
  .fade-in-d2 { animation-delay:0.2s; opacity:0; }
  .fade-in-d3 { animation-delay:0.3s; opacity:0; }
`;



const SLIDES = [
  {
    bg: "linear-gradient(135deg, #1a5c2a 0%, #0a3d1a 60%, #0d3b18 100%)",
    overlay: "radial-gradient(ellipse at 70% 50%, rgba(245,166,35,0.15) 0%, transparent 70%)",
    tag: "২০০৭ সাল থেকে",
    title: "মীম হোমিও কেয়ার",
    subtitle: "হোমিওপ্যাথি চিকিৎসায় আপনার বিশ্বস্ত সেবক — টিক্কাপাড়া, ঢাকা",
    btn: "অ্যাপয়েন্টমেন্ট নিন",
    btnPage: "contact",
  },
  {
    bg: "linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #1976d2 100%)",
    overlay: "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)",
    tag: "অপারেশন ছাড়াই",
    title: "পিত্তপাথর মাত্র ২ দিনে ভালো হয়",
    subtitle: "কিডনি পাথর, নাকের পলিপাস সহ জটিল রোগের হোমিওপ্যাথিক চিকিৎসা",
    btn: "আরও জানুন",
    btnPage: "services",
  },
  {
    bg: "linear-gradient(135deg, #4e342e 0%, #6d4c41 50%, #5d4037 100%)",
    overlay: "radial-gradient(ellipse at 60% 40%, rgba(245,166,35,0.2) 0%, transparent 70%)",
    tag: "বিশেষজ্ঞ চিকিৎসক",
    title: "অভিজ্ঞ দুই চিকিৎসক",
    subtitle: "ডা: মনজুর উল কবীর শোভন ও ডা: মাইশা ফারিহা ইসলাম — D.H.M.S (ঢাকা)",
    btn: "ডাক্তার দেখুন",
    btnPage: "doctors",
  },
  {
    bg: "linear-gradient(135deg, #1a237e 0%, #283593 50%, #303f9f 100%)",
    overlay: "radial-gradient(ellipse at 50% 80%, rgba(76,175,80,0.2) 0%, transparent 70%)",
    tag: "শুক্রবার বন্ধ",
    title: "প্রতিদিন সকাল ১০টা থেকে রাত ১০টা",
    subtitle: "সকাল ১০:০০ – দুপুর ১:০০ | বিকাল ৫:০০ – রাত ১০:০০",
    btn: "যোগাযোগ করুন",
    btnPage: "contact",
  },
];

function Slider({ onNavigate }) {
  const [cur, setCur] = useState(0);
  const timerRef = useRef(null);

  const go = (i) => setCur((i + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timerRef.current = setInterval(() => setCur(c => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const s = SLIDES[cur];

  return (
    <div className="slider">
      <div className="slider-track" style={{ transform: `translateX(-${cur * 100}%)` }}>
        {SLIDES.map((sl, i) => (
          <div key={i} className="slide">
            <div className="slide-bg" style={{ background: sl.bg }}>
              <div style={{ position: "absolute", inset: 0, background: sl.overlay }} />
            </div>
            <div className="slide-content">
              <div className="slide-tag">{sl.tag}</div>
              <h2 className="slide-title">{sl.title}</h2>
              <p className="slide-subtitle">{sl.subtitle}</p>
              <button className="slide-btn" onClick={() => onNavigate(sl.btnPage)}>{sl.btn}</button>
            </div>
          </div>
        ))}
      </div>
      <button className="slider-arrow slider-prev" onClick={() => go(cur - 1)}>‹</button>
      <button className="slider-arrow slider-next" onClick={() => go(cur + 1)}>›</button>
      <div className="slider-dots">
        {SLIDES.map((_, i) => (
          <button key={i} className={`slider-dot ${i === cur ? "active" : ""}`} onClick={() => setCur(i)} />
        ))}
      </div>
    </div>
  );
}

function NoticeBand() {
  const notices = [
    "⚕️ পিত্তপাথুরী মাত্র ২ দিনে ভালো হয়",
    "🌿 অপারেশন ছাড়াই কিডনি পাথর নিরাময়",
    "👃 নাকের পলিপাস ১০ দিনে ভালো হয়",
    "💊 সম্পূর্ণ প্রাকৃতিক হোমিওপ্যাথিক চিকিৎসা",
    "📞 যোগাযোগ: 01920-897682",
    "⚕️ শুক্রবার ছাড়া প্রতিদিন খোলা",
  ];
  const doubled = [...notices, ...notices];
  return (
    <div className="notice-band">
      <div className="notice-inner">
        {doubled.map((n, i) => <span key={i} className="notice-item">{n} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>)}
      </div>
    </div>
  );
}

function HomePage({ onNavigate }) {
  return (
    <>
      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-badge">আমাদের সাফল্য</div>
            <h2 className="section-title">কেন মীম হোমিও কেয়ার বেছে নেবেন?</h2>
            <div className="section-line" />
            <p className="section-desc">২০০৭ সাল থেকে আমরা হাজারো রোগীকে সুস্থ করে তুলছি — সম্পূর্ণ প্রাকৃতিক হোমিওপ্যাথিক পদ্ধতিতে</p>
          </div>
          <div className="stats-grid">
            {[
              { icon: "🏥", num: "১৭+", label: "বছরের অভিজ্ঞতা" },
              { icon: "👥", num: "৫০০০+", label: "সন্তুষ্ট রোগী" },
              { icon: "👨‍⚕️", num: "২", label: "বিশেষজ্ঞ চিকিৎসক" },
              { icon: "💊", num: "১০০+", label: "রোগের চিকিৎসা" },
              { icon: "⏰", num: "৬", label: "দিন খোলা" },
              { icon: "🌿", num: "১০০%", label: "প্রাকৃতিক চিকিৎসা" },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-number">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-badge">আমাদের বিশেষত্ব</div>
            <h2 className="section-title">অপারেশন ছাড়াই রোগ নিরাময়</h2>
            <div className="section-line" />
            <p className="section-desc">প্রাকৃতিক হোমিওপ্যাথিক ওষুধ দিয়ে কঠিন রোগও সারিয়ে তোলা হয়</p>
          </div>
          <div className="why-grid">
            {[
              { icon: "💎", title: "পার্শ্বপ্রতিক্রিয়া নেই", desc: "সম্পূর্ণ প্রাকৃতিক হোমিওপ্যাথিক ওষুধ — কোনো ক্ষতিকর পার্শ্বপ্রতিক্রিয়া নেই।" },
              { icon: "⚡", title: "দ্রুত ফলাফল", desc: "পিত্তপাথর ২ দিনে, নাকের পলিপাস ১০ দিনে, কিডনি পাথর স্বল্প সময়ে সেরে যায়।" },
              { icon: "💰", title: "সাশ্রয়ী মূল্য", desc: "অপারেশনের তুলনায় অনেক কম খরচে কার্যকর চিকিৎসা পাওয়া যায়।" },
              { icon: "🩺", title: "ব্যক্তিগত পরিচর্যা", desc: "প্রতিটি রোগীকে সম্পূর্ণ আলাদাভাবে পর্যবেক্ষণ করে চিকিৎসা দেওয়া হয়।" },
              { icon: "📋", title: "নিবন্ধিত ক্লিনিক", desc: "রেজিস্ট্রেশন নং: ৪৭৭৮৪। সরকার অনুমোদিত ক্লিনিকে পরিষেবা পাচ্ছেন।" },
              { icon: "🕐", title: "সুবিধাজনক সময়", desc: "সকাল ১০টা থেকে রাত ১০টা পর্যন্ত — আপনার সুবিধামতো সময়ে আসুন।" },
            ].map((w, i) => (
              <div key={i} className="why-card">
                <div className="why-icon">{w.icon}</div>
                <div className="why-title">{w.title}</div>
                <div className="why-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-badge">আমাদের সেবাসমূহ</div>
            <h2 className="section-title" style={{ color: "#fff" }}>যেসব রোগের চিকিৎসা করা হয়</h2>
            <div className="section-line" />
            <p className="section-desc">হোমিওপ্যাথি দিয়ে শতাধিক রোগের কার্যকর চিকিৎসা দেওয়া হয়</p>
          </div>
          <div className="services-grid">
            {[
              { icon: "🫀", name: "পাথর সংক্রান্ত রোগ", desc: "পিত্তপাথর, কিডনি পাথর — অপারেশন ছাড়াই ঔষধে ভালো হয়।" },
              { icon: "👃", name: "নাক ও সাইনাস", desc: "নাকের পলিপাস, সাইনাস, মাইগ্রেন, যেকোনো মাথাব্যথা।" },
              { icon: "🌸", name: "মহিলা রোগ", desc: "জরায়ু সমস্যা, শ্বেতপ্রদর, পলিসিস্টিক ওভারি, বন্ধ্যাত্ব।" },
              { icon: "💪", name: "পুরুষ সমস্যা", desc: "যৌন দুর্বলতা সহ পুরুষদের সকল সমস্যার চিকিৎসা।" },
              { icon: "🫁", name: "শ্বাস ও অ্যালার্জি", desc: "অ্যাজমা, শ্বাসকষ্ট, এলার্জি, পুরাতন কাশি, নিউমোনিয়া।" },
              { icon: "🎗️", name: "টিউমার ও গ্রন্থি", desc: "ব্রেস্ট টিউমার, জরায়ু টিউমার, লাইপোমা, হাইড্রোসিল।" },
            ].map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-icon">{s.icon}</div>
                <div className="service-name">{s.name}</div>
                <div className="service-desc">{s.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button className="slide-btn" onClick={() => onNavigate("services")}>সকল সেবা দেখুন →</button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-badge">আমাদের চিকিৎসক</div>
            <h2 className="section-title">আমাদের অভিজ্ঞ ডাক্তারবৃন্দ</h2>
            <div className="section-line" />
          </div>
          <div className="doctors-grid">
            <div className="doctor-card">
              <div className="doctor-avatar doc1-bg">
                <img 
                  src="/shovonr.png" 
                  alt="ডা: মনজুর উল কবীর শোভন" 
                  className="doctor-avatar-img"
                />
              </div>
              <div className="doctor-body">
                <div className="doctor-name">ডা: মনজুর উল কবীর শোভন</div>
                <div className="doctor-title">প্রধান চিকিৎসক ও প্রতিষ্ঠাতা</div>
                <ul className="doctor-qual-list">
                  <li>D.H.M.S (ঢাকা)</li>
                  <li>ফেডারেল হোমিওপ্যাথিক মেডিকেল কলেজ</li>
                  <li>BBA, MBA (মার্কেটিং) — ডেফোডিল ইউনিভার্সিটি</li>
                </ul>
              </div>
            </div>
            <div className="doctor-card">
              <div className="doctor-avatar doc1-bg">
                <img 
                  src="/monyr.png" 
                  alt="ডা: মনজুর উল কবীর শোভন" 
                  className="doctor-avatar-img"
                />
              </div>
              <div className="doctor-body">
                <div className="doctor-name">ডা: মাইশা ফারিহা ইসলাম</div>
                <div className="doctor-title">চিকিৎসক ও পুষ্টি বিশেষজ্ঞ</div>
                <ul className="doctor-qual-list">
                  <li>D.H.M.S (ঢাকা)</li>
                  <li>BSc (অনার্স) ফার্স্ট ক্লাস, MSc (মাস্টার্স) ফার্স্ট ক্লাস — ফুড ও নিউট্রিশন, ঢাকা বিশ্ববিদ্যালয়</li>
                  <li>ক্লিনিক্যাল ডায়েট প্ল্যানিং ও কাউন্সেলিং বিশেষজ্ঞ</li>
                </ul>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <button className="slide-btn" style={{ background: "linear-gradient(135deg,#1a5c2a,#2e7d32)", color: "#fff" }} onClick={() => onNavigate("doctors")}>বিস্তারিত দেখুন →</button>
          </div>
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg, var(--gold) 0%, #e08900 100%)", padding: "56px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📞</div>
          <h2 style={{ fontFamily: "'Noto Serif Bengali',serif", fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, color: "#1a2a1a", marginBottom: 12 }}>আজই অ্যাপয়েন্টমেন্ট নিন</h2>
          <p style={{ fontSize: 17, color: "rgba(26,26,26,0.75)", marginBottom: 28 }}>শুক্রবার ছাড়া প্রতিদিন সকাল ১০টা — রাত ১০টা</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:+8801920897682" style={{ padding: "14px 32px", background: "#1a5c2a", color: "#fff", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>📱 01920-897682</a>
            <a href="https://wa.me/8801920897682" target="_blank" rel="noreferrer" style={{ padding: "14px 32px", background: "#25d366", color: "#fff", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>💬 WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}

function DoctorsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="breadcrumb"><span>হোম</span><span className="sep">›</span><span>ডাক্তারবৃন্দ</span></div>
          <h1>আমাদের চিকিৎসকবৃন্দ</h1>
          <p>অভিজ্ঞ ও যোগ্য দুই চিকিৎসক — আপনার সুস্বাস্থ্য আমাদের লক্ষ্য</p>
        </div>
      </div>
      <section className="section">
        <div className="section-inner">
          <div style={{ display: "grid", gap: 48 }}>

            {/* Doctor 1 */}
            <div style={{ background: "#fff", borderRadius: 24, overflow: "hidden", boxShadow: "var(--shadow)", display: "grid", gridTemplateColumns: "300px 1fr" }}>
              <div style={{ background: "linear-gradient(135deg,#1a5c2a,#0d3b18)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, gap: 16 }}>
                <div style={{ fontSize: 96, lineHeight: 1 }}>👨‍⚕️</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Noto Serif Bengali',serif", fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 6 }}>ডা: মনজুর উল কবীর শোভন</div>
                  <div style={{ fontSize: 13, color: "var(--gold)", fontWeight: 600 }}>প্রধান চিকিৎসক ও প্রতিষ্ঠাতা</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 20px", textAlign: "center", width: "100%" }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>রেজিস্ট্রেশন নং</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "var(--gold)" }}>৪৭৭৮৪</div>
                </div>
              </div>
              <div style={{ padding: 40 }}>
                <h3 style={{ fontFamily: "'Noto Serif Bengali',serif", fontSize: 22, color: "var(--green-dark)", marginBottom: 24 }}>শিক্ষাগত যোগ্যতা</h3>
                <div style={{ display: "grid", gap: 14 }}>
                  {[
                    { icon: "🎓", title: "D.H.M.S (ঢাকা)", sub: "ফেডারেল হোমিওপ্যাথিক মেডিকেল কলেজ" },
                    { icon: "🎓", title: "BBA, MBA (মার্কেটিং)", sub: "ডেফোডিল ইউনিভার্সিটি" },
                  ].map((q, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, padding: 16, background: "#f5f9f5", borderRadius: 12, borderLeft: "4px solid var(--green-mid)" }}>
                      <span style={{ fontSize: 24 }}>{q.icon}</span>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--green-dark)" }}>{q.title}</div>
                        <div style={{ fontSize: 13, color: "var(--gray)" }}>{q.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <h3 style={{ fontFamily: "'Noto Serif Bengali',serif", fontSize: 22, color: "var(--green-dark)", margin: "28px 0 16px" }}>বিশেষজ্ঞতা</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {["পিত্তপাথুরী", "কিডনি পাথর", "পলিপাস", "যৌন সমস্যা", "বন্ধ্যাত্ব", "টিউমার", "হোমিওপ্যাথি"].map((t, i) => (
                    <span key={i} style={{ background: "rgba(26,92,42,0.08)", color: "var(--green-dark)", padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, border: "1px solid rgba(26,92,42,0.15)" }}>{t}</span>
                  ))}
                </div>
                <div style={{ marginTop: 24, padding: 20, background: "rgba(26,92,42,0.05)", borderRadius: 12 }}>
                  <p style={{ fontSize: 14, color: "var(--gray)", lineHeight: 1.7 }}>
                    ২০০৭ সাল থেকে আদাবর মনসুরাবাদে মীম হোমিও ক্লিনিক প্রতিষ্ঠা করে রোগীদের সেবা দিয়ে আসছেন। বর্তমানে টিক্কাপাড়ায় ক্লিনিক পরিচালনা করছেন এবং হাজারো রোগী সুস্থ করেছেন।
                  </p>
                </div>
              </div>
            </div>

            {/* Doctor 2 */}
            <div style={{ background: "#fff", borderRadius: 24, overflow: "hidden", boxShadow: "var(--shadow)", display: "grid", gridTemplateColumns: "300px 1fr" }}>
              <div style={{ background: "linear-gradient(135deg,#1565c0,#0d47a1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, gap: 16 }}>
                <div style={{ fontSize: 96, lineHeight: 1 }}>👩‍⚕️</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Noto Serif Bengali',serif", fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 6 }}>ডা: মাইশা ফারিহা ইসলাম</div>
                  <div style={{ fontSize: 13, color: "var(--gold)", fontWeight: 600 }}>চিকিৎসক ও পুষ্টি বিশেষজ্ঞ</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 20px", textAlign: "center", width: "100%" }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>বিশেষজ্ঞতা</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--gold)" }}>পুষ্টি ও ডায়েট</div>
                </div>
              </div>
              <div style={{ padding: 40 }}>
                <h3 style={{ fontFamily: "'Noto Serif Bengali',serif", fontSize: 22, color: "var(--green-dark)", marginBottom: 24 }}>শিক্ষাগত যোগ্যতা</h3>
                <div style={{ display: "grid", gap: 14 }}>
                  {[
                    { icon: "🎓", title: "D.H.M.S (ঢাকা)", sub: "ফেডারেল হোমিওপ্যাথিক মেডিকেল কলেজ" },
                    { icon: "🎓", title: "BSc (অনার্স) ফার্স্ট ক্লাস (সেকেন্ড)", sub: "ফুড এন্ড নিউট্রিশন, ঢাকা বিশ্ববিদ্যালয়" },
                    { icon: "🎓", title: "MSc (মাস্টার্স) ফার্স্ট ক্লাস (ফার্স্ট)", sub: "ফুড এন্ড নিউট্রিশন, ঢাকা বিশ্ববিদ্যালয়" },
                    { icon: "🏫", title: "প্রাক্তন প্রভাষক", sub: "মিরপুর গার্লস আইডিয়াল ল্যাবরেটরি স্কুল এন্ড কলেজ" },
                    { icon: "📚", title: "সোশ্যাল এন্ড রিসার্চ মেথডোলজি", sub: "ঢাকা বিশ্ববিদ্যালয়" },
                    { icon: "🥗", title: "ক্লিনিক্যাল ডায়েট প্ল্যানিং ও কাউন্সেলিং", sub: "ডায়েট কাউন্সিল, ঢাকা" },
                  ].map((q, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, padding: 14, background: "#f5f9f5", borderRadius: 12, borderLeft: "4px solid #1565c0" }}>
                      <span style={{ fontSize: 22 }}>{q.icon}</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#1565c0" }}>{q.title}</div>
                        <div style={{ fontSize: 13, color: "var(--gray)" }}>{q.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <h3 style={{ fontFamily: "'Noto Serif Bengali',serif", fontSize: 22, color: "var(--green-dark)", margin: "24px 0 14px" }}>বিশেষজ্ঞতা</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {["মহিলা রোগ", "পুষ্টি পরামর্শ", "ওজন ব্যবস্থাপনা", "ফ্যাটি লিভার", "বন্ধ্যাত্ব", "শিশু পুষ্টি"].map((t, i) => (
                    <span key={i} style={{ background: "rgba(21,101,192,0.08)", color: "#1565c0", padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, border: "1px solid rgba(21,101,192,0.2)" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hours Banner */}
          <div style={{ marginTop: 56, background: "linear-gradient(135deg,var(--green-dark),#0d3b18)", borderRadius: 20, padding: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div>
              <h3 style={{ fontFamily: "'Noto Serif Bengali',serif", fontSize: 24, color: "#fff", marginBottom: 20 }}>⏰ সেবার সময়</h3>
              {[
                { day: "শনি – বৃহস্পতি (সকাল)", time: "১০:০০ – ১:০০" },
                { day: "শনি – বৃহস্পতি (বিকাল)", time: "৫:০০ – ১০:০০" },
                { day: "শুক্রবার", time: "বন্ধ", closed: true },
              ].map((h, i) => (
                <div key={i} className="hours-row">
                  <span className="hours-day">{h.day}</span>
                  <span className={`hours-time ${h.closed ? "closed" : ""}`}>{h.time}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ fontFamily: "'Noto Serif Bengali',serif", fontSize: 24, color: "#fff", marginBottom: 20 }}>📍 ঠিকানা</h3>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, lineHeight: 1.8 }}>
                দোকান নং ৫৮, টিক্কাপাড়া<br />
                ছাপড়া মসজিদ মার্কেট এর নীচতলা<br />
                রিংরোড বায়তুস সালাহ মসজিদ মাদ্রাসা কমপ্লেক্স মার্কেট<br />
                ঢাকা, বাংলাদেশ ১২০৭
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <a href="tel:+8801920897682" style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--gold)", color: "#1a2a1a", padding: "10px 18px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>📱 01920-897682</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ServicesPage() {
  const cats = [
    {
      icon: "🪨",
      name: "পাথর সংক্রান্ত রোগ",
      items: ["পিত্তপাথুরী", "কিডনি পাথর", "স্টোনার সমস্যা"],
    },
    {
      icon: "👃",
      name: "নাক, গলা ও মাথা",
      items: ["নাকের পলিপাস", "সাইনাস", "মাইগ্রেন", "মাথাব্যথা", "টনসিল", "কান ব্যথা", "কান পাকা"],
    },
    {
      icon: "🌸",
      name: "মহিলা রোগ",
      items: ["জরায়ু নেমে যাওয়া", "শ্বেতপ্রদর", "পলিসিস্টিক ওভারি", "ওভারিতে সিস্ট", "বন্ধ্যাত্ব", "গর্ভাবস্থায় চিকিৎসা", "জরায়ু টিউমার", "সহজ প্রসব"],
    },
    {
      icon: "💪",
      name: "পুরুষ সমস্যা",
      items: ["যৌন দুর্বলতা", "স্বপ্নদোষ", "ধ্বজভঙ্গ", "অন্ডকোষের রোগ", "হাইড্রোসিল", "একশিরা"],
    },
    {
      icon: "🫁",
      name: "শ্বাস ও অ্যালার্জি",
      items: ["এলার্জি", "এ্যাজমা", "শ্বাসকষ্ট", "পুরাতন কাশি", "নিউমোনিয়া", "ঠান্ডা সর্দি"],
    },
    {
      icon: "🎗️",
      name: "টিউমার ও গ্রন্থি",
      items: ["ব্রেস্ট টিউমার", "জরায়ু টিউমার", "লাইপোমা", "সকল প্রকার টিউমার"],
    },
    {
      icon: "🫀",
      name: "হার্ট ও লিভার",
      items: ["হার্টের সমস্যা", "কার্ডিওমেগালি", "ফ্যাটি লিভার", "লিভার সিরোসিস", "হেপাটাইটিস বি", "হেপাটাইটিস সি", "প্লীহা বৃদ্ধি"],
    },
    {
      icon: "🦴",
      name: "হাড় ও বাত",
      items: ["বাতের ব্যথা", "বাতজ্বর", "স্পন্ডিলাইটিস", "মেরুদণ্ডের রোগ", "হাড়ভাঙ্গা জোড়া লাগানো", "হাড়ের ক্ষয়", "হাড়বৃদ্ধি"],
    },
    {
      icon: "🩸",
      name: "রক্ত ও সার্কুলেশন",
      items: ["থ্যালাসেমিয়া", "অ্যানিমিয়া", "দুর্বলতা", "স্বাস্থ্যহীনতা"],
    },
    {
      icon: "🍽️",
      name: "পেট ও পাচনতন্ত্র",
      items: ["কোষ্ঠকাঠিন্য", "আমাশয়", "ডায়রিয়া", "আইবিএস", "ক্রনিক আমাশয়", "পাইলস", "ফিস্টুলা"],
    },
    {
      icon: "⚖️",
      name: "ওজন ও পুষ্টি",
      items: ["ওজন কমানো", "মেদ কমানো", "ফ্যাটি লিভার"],
    },
    {
      icon: "🧠",
      name: "মানসিক ও অন্যান্য",
      items: ["মানসিক সমস্যা", "চোখের সমস্যা", "অঞ্জলি", "মাড়ি ফোলা", "দাঁত ব্যথা", "চর্মরোগ", "ফোড়া", "ডেঙ্গু", "টাইফয়েড", "মা ও শিশুর সকল রোগ"],
    },
  ];

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="breadcrumb"><span>হোম</span><span className="sep">›</span><span>সেবাসমূহ</span></div>
          <h1>আমাদের সেবাসমূহ</h1>
          <p>হোমিওপ্যাথিক পদ্ধতিতে শতাধিক রোগের কার্যকর চিকিৎসা</p>
        </div>
      </div>
      <section className="services-list-section">
        <div className="section-inner">
          <div className="highlight-banner">
            <div className="highlight-icon">⚕️</div>
            <div className="highlight-text">
              <h2>অপারেশন ছাড়াই মাত্র ২ দিনে পিত্তপাথর বের করা হয়</h2>
              <p>কিডনিপাথর, পিত্তপাথর, সকল প্রকার টিউমার, ব্রেস্ট টিউমার, যৌন দুর্বলতা সহ পুরুষদের সকল সমস্যা, জরায়ু নেমে যাওয়া, শ্বেতপ্রদর, গর্ভাবস্থায় চিকিৎসা, বন্ধ্যাত্ব, ধ্বজভঙ্গ, সিফিলিস, গনোরিয়া, স্বপ্নদোষ, হাড়ের ক্ষয়, স্পিভুলাইটিস, মেরুদণ্ড বাঁকা, হাড়বৃদ্ধি, জন্ডিস, মেদ বা ওজন কমানো, ডায়রিয়া, ক্রনিক আমাশয়, চর্মরোগ, ব্রণ, অ্যালার্জি, ঠাণ্ডা নিউমোনিয়া, সহজ প্রসব, মা ও শিশুর সকল রোগ, ডেঙ্গু, টাইফয়েড সহ সকল জ্বরের চিকিৎসা, পাইলস, ফিস্টুলা, সাইনাস, মাইগ্রেন সহ যেকোনো মাথাব্যথা, নাকে পলিপাস, স্টোনার যেকোনো সমস্যা, এছাড়া যেকোনো ক্যান্সার এর প্রাথমিক পর্যায়ে সুচিকিৎসা করা হয়।</p>
            </div>
          </div>
          <div className="services-categories">
            {cats.map((c, i) => (
              <div key={i} className="cat-card">
                <div className="cat-header">
                  <span className="cat-icon">{c.icon}</span>
                  <span className="cat-name">{c.name}</span>
                </div>
                <div className="cat-items">
                  {c.items.map((item, j) => (
                    <span key={j} className="cat-item">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, background: "#fff", borderRadius: 20, padding: 36, boxShadow: "var(--shadow)", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🌿</div>
            <h3 style={{ fontFamily: "'Noto Serif Bengali',serif", fontSize: 24, color: "var(--green-dark)", marginBottom: 12 }}>হোমিওপ্যাথি কেন বেছে নেবেন?</h3>
            <p style={{ color: "var(--gray)", fontSize: 15, lineHeight: 1.8, maxWidth: 700, margin: "0 auto" }}>
              হোমিওপ্যাথিক ওষুধ সম্পূর্ণ প্রাকৃতিক উপাদান থেকে তৈরি, তাই কোনো পার্শ্বপ্রতিক্রিয়া নেই। এটি রোগের মূল কারণ খুঁজে বের করে স্থায়ীভাবে সারিয়ে তোলে — শুধু লক্ষণ দমন করে না। শিশু থেকে বৃদ্ধ সবার জন্য নিরাপদ।
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = () => {
    if (form.name && form.phone) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setForm({ name: "", phone: "", message: "" });
    }
  };

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="breadcrumb"><span>হোম</span><span className="sep">›</span><span>যোগাযোগ</span></div>
          <h1>যোগাযোগ করুন</h1>
          <p>অ্যাপয়েন্টমেন্ট নিতে বা যেকোনো প্রশ্নের জন্য আমাদের সাথে যোগাযোগ করুন</p>
        </div>
      </div>
      <section className="section">
        <div className="section-inner">
          <div className="contact-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div className="contact-info-card">
                <div className="contact-info-title">📋 যোগাযোগের তথ্য</div>
                {[
                  { icon: "📍", cls: "ci-green", label: "ঠিকানা", value: "দোকান নং ৫৮, টিক্কাপাড়া, ছাপড়া মসজিদ মার্কেট এর নীচতলা, ঢাকা ১২০৭" },
                  { icon: "📱", cls: "ci-blue", label: "ফোন নম্বর", value: "+880 1920-897682 | +880 1688-524343" },
                  { icon: "✉️", cls: "ci-gold", label: "ইমেইল", value: "shovon4u@gmail.com" },
                  { icon: "💬", cls: "ci-wa", label: "WhatsApp", value: "+880 1920-897682" },
                ].map((c, i) => (
                  <div key={i} className="contact-item">
                    <div className={`contact-item-icon ${c.cls}`}>{c.icon}</div>
                    <div>
                      <div className="contact-item-label">{c.label}</div>
                      <div className="contact-item-value">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hours-card">
                <div className="hours-title">⏰ সেবার সময়সূচি</div>
                {[
                  { day: "শনি – বৃহস্পতি", time: "সকাল ১০:০০ – দুপুর ১:০০" },
                  { day: "শনি – বৃহস্পতি", time: "বিকাল ৫:০০ – রাত ১০:০০" },
                  { day: "শুক্রবার", time: "বন্ধ", closed: true },
                ].map((h, i) => (
                  <div key={i} className="hours-row">
                    <span className="hours-day">{h.day}</span>
                    <span className={`hours-time ${h.closed ? "closed" : ""}`}>{h.time}</span>
                  </div>
                ))}
                <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                  <a href="tel:+8801920897682" style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--gold)", color: "#1a2a1a", padding: "12px 20px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>📱 এখনই ফোন করুন</a>
                  <a href="https://wa.me/8801920897682" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, background: "#25d366", color: "#fff", padding: "12px 20px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>💬 WhatsApp করুন</a>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div className="contact-form">
                <div className="form-title">📝 বার্তা পাঠান</div>
                {sent && (
                  <div style={{ background: "rgba(26,92,42,0.1)", border: "2px solid var(--green-mid)", borderRadius: 10, padding: 16, marginBottom: 20, color: "var(--green-dark)", fontWeight: 600 }}>
                    ✅ আপনার বার্তা পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।
                  </div>
                )}
                <div className="form-group">
                  <label className="form-label">আপনার নাম *</label>
                  <input className="form-input" placeholder="নাম লিখুন" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">মোবাইল নম্বর *</label>
                  <input className="form-input" placeholder="01xxxxxxxxx" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">আপনার সমস্যা বা বার্তা</label>
                  <textarea className="form-textarea" placeholder="আপনার রোগের বিবরণ বা প্রশ্ন লিখুন..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                </div>
                <button className="form-btn" onClick={handleSubmit}>বার্তা পাঠান →</button>
              </div>
              <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow)" }}>
                <div style={{ padding: "20px 24px 12px", fontFamily: "'Noto Serif Bengali',serif", fontSize: 18, fontWeight: 700, color: "var(--green-dark)" }}>📍 আমাদের অবস্থান</div>
                <iframe
                  className="map-embed"
                  style={{ margin: 0, borderRadius: 0 }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0!2d90.3785!3d23.7561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzIxLjkiTiA5MMKwMjInNDIuNiJF!5e0!3m2!1sen!2sbd!4v1234567890"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="মীম হোমিও কেয়ার অবস্থান"
                />
                <div style={{ padding: "12px 24px 20px", fontSize: 13, color: "var(--gray)", lineHeight: 1.6 }}>
                  দোকান নং ৫৮, ১৯/সি/১ টিক্কাপাড়া, রিংরোড বায়তুস সালাহ মসজিদ মাদ্রাসা কমপ্লেক্স মার্কেট (ছাপড়া মসজিদের নিচতলা), ঢাকা ১২০৭
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand-name">মীম হোমিও কেয়ার</div>
            <p>২০০৭ সাল থেকে আমরা হোমিওপ্যাথিক চিকিৎসায় বিশ্বস্ত সেবা দিয়ে আসছি। অপারেশন ছাড়াই কঠিন রোগ নিরাময় আমাদের বিশেষত্ব। রেজিস্ট্রেশন নং: ৪৭৭৮৪।</p>
            <div className="footer-social">
              {["📘", "📷", "💬", "🐦"].map((s, i) => <div key={i} className="social-btn">{s}</div>)}
            </div>
          </div>
          <div>
            <div className="footer-col-title">দ্রুত লিঙ্ক</div>
            {[["হোম", "home"], ["ডাক্তারবৃন্দ", "doctors"], ["সেবাসমূহ", "services"], ["যোগাযোগ", "contact"]].map(([l, p]) => (
              <span key={p} className="footer-link" onClick={() => onNavigate(p)}>→ {l}</span>
            ))}
          </div>
          <div>
            <div className="footer-col-title">যোগাযোগ</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.9 }}>
              <div>📍 দোকান নং ৫৮, টিক্কাপাড়া</div>
              <div>ছাপড়া মসজিদ মার্কেট, ঢাকা ১২০৭</div>
              <div>📱 01920-897682</div>
              <div>📱 01688-524343</div>
              <div>✉️ shovon4u@gmail.com</div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-text">© ২০২৫ মীম হোমিও কেয়ার। সকল স্বত্ব সংরক্ষিত।</div>
          <div className="footer-reg">নিবন্ধন নং: ৪৭৭৮৪ | প্রতিষ্ঠিত: ২০০৭</div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuItems = [
    { label: "হোম", key: "home" },
    { label: "ডাক্তারবৃন্দ", key: "doctors" },
    { label: "সেবাসমূহ", key: "services" },
    { label: "যোগাযোগ", key: "contact" },
  ];

  return (
    <>
      <style>{style}</style>
      <nav className="navbar">
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => navigate("home")}>
            <div className="nav-logo-icon">🌿</div>
            <div className="nav-logo-text">
              <div className="bn-name">মীম হোমিও কেয়ার</div>
              <div className="en-name">Mim Homeo Care</div>
            </div>
          </div>
          <div className="nav-links">
            {menuItems.map(m => (
              <button key={m.key} className={`nav-link ${page === m.key ? "active" : ""}`} onClick={() => navigate(m.key)}>{m.label}</button>
            ))}
            <a href="tel:+8801920897682" className="nav-link nav-cta">📞 01920897682 </a>
          </div>
        </div>
      </nav>

      <NoticeBand />

      {page === "home" && (
        <>
          <Slider onNavigate={navigate} />
          <HomePage onNavigate={navigate} />
        </>
      )}
      {page === "doctors" && <DoctorsPage />}
      {page === "services" && <ServicesPage />}
      {page === "contact" && <ContactPage />}

      <Footer onNavigate={navigate} />
    </>
  );
}
