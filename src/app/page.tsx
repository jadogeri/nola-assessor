"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Search, 
  Home, 
  Folder, 
  ClipboardList, 
  PenTool, 
  ShieldAlert, 
  Calculator, 
  HelpCircle, 
  Info, 
  Newspaper, 
  Users, 
  Briefcase, 
  Mail, 
  Building,
  ExternalLink,
  ChevronDown,
  Calendar,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Clock,
  MapPin
} from 'lucide-react';
import Sidebar from '@/components/layouts/sidebar';

const heroSlides = [
  {
    title: "Orleans Parish Assessment Data Portal",
    description: "Fair, accurate, and transparent real estate and personal property valuations for all New Orleans residents.",
    tag: "Public Records",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    gradient: "from-slate-950 via-slate-900 to-blue-950"
  },
  {
    title: "Protect Your Home: Homestead Exemption & SAL",
    description: "File or renew your primary residence exemption and Special Assessment Level (SAL) to reduce property tax liabilities.",
    tag: "Tax Relief",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    gradient: "from-slate-950 via-blue-950 to-indigo-950"
  },
  {
    title: "2027 Public Rolls Now Open for Inspection",
    description: "Inspect open tax rolls, check neighborhood benchmarks, and submit formal valuation appeal documentation online.",
    tag: "Open Rolls",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    gradient: "from-slate-950 via-slate-900 to-neutral-900"
  }
];

const quickActionCards = [
  { title: "Property Search", subtitle: "Search parcel ID, address, or owner records via Beacon GIS", icon: Search, href: "#search", highlight: true },
  { title: "Homestead & SAL", subtitle: "Apply for residential discounts & senior/veteran exemptions", icon: Home, href: "#homestead", highlight: false },
  { title: "E-File Portal", subtitle: "Submit LAT personal property reports electronically", icon: Folder, href: "#efile", highlight: false },
  { title: "Forms & Documents", subtitle: "Download official tax forms, guidelines, and appeal notices", icon: ClipboardList, href: "#forms", highlight: false },
  { title: "Supplemental Tax Roll", subtitle: "Review added assessments and revised billing schedules", icon: PenTool, href: "#supplemental", highlight: false },
  { title: "Tax Estimator", subtitle: "Estimate annual tax liabilities using current parish millages", icon: Calculator, href: "#estimator", highlight: false }
];

const leadershipTeam = [
  { name: "Erroll G. Williams", title: "Orleans Parish Assessor", credentials: "MBA, CLA", initial: "EW" },
  { name: "Marina M. Kahn", title: "Chief Deputy Officer", credentials: "BA, MSUS, MBA, CLDA", initial: "MK" },
  { name: "Darren Mire", title: "Director of Assessment Valuation", credentials: "CLDA, AAS", initial: "DM" },
  { name: "Devin Johnson", title: "Administrative Director / Communications", credentials: "CLDA", initial: "DJ" }
];

const blogPosts = [
  {
    title: "2027 Assessment Rolls Open for Public Inspection July 15 to August 17",
    excerpt: "Online appeals are open July 22 through August 20. Assessor Erroll Williams is reminding Orleans Parish property owners that values can be reviewed completely inside the current computational tax windows...",
    date: "July 2026",
    isLatest: true
  },
  {
    title: "REMINDER: FIRST RESPONDERS MUST REAPPLY ANNUALLY TO MAINTAIN EXEMPTION",
    excerpt: "Applications due August 17, 2026. The Orleans Parish Assessor’s Office is reminding eligible first responders that legislative state adjustments require annual confirmation forms filed directly to Room 4E01...",
    date: "August 2026",
    isLatest: false
  },
  {
    title: "Orleans Parish Assessor's Office Closed for Juneteenth National Holiday",
    excerpt: "The Orleans Parish Assessor’s Office will be closed on Friday, June 19, 2026, in observance of the upcoming structural national holiday schedule updates across the East and West Bank facilities...",
    date: "June 2026",
    isLatest: false
  }
];

const events = [
  { month: "Aug", day: "28", title: "Hurricane Katrina Remembrance", note: "Office Closed" },
  { month: "Sep", day: "07", title: "Labor Day Observance", note: "Office Closed" },
  { month: "Oct", day: "12", title: "Indigenous People's Day", note: "Office Closed" }
];



// Strict TypeScript compliance animation props using array easing functions
const scrollRevealProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1] as const}
};

// Framer Motion Orchestration Variants for Navigation Elements
const navContainerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 350, damping: 25 } 
  }
};

const springButtonHover = {
  whileHover: { scale: 1.04, y: -2 },
  whileTap: { scale: 0.96 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
};

export default function NolaAssessorApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeLeaderIndex, setActiveLeaderIndex] = useState<number | null>(null); // i changed from null to 0 to ensure a default leader is displayed on load

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

const nextLeader = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation();
  setActiveLeaderIndex((prev: number | null) => (prev! + 1) % leadershipTeam.length);
};
  const prevLeader = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setActiveLeaderIndex((prev: number | null) => (prev! - 1 + leadershipTeam.length) % leadershipTeam.length);
  };

  return (
    <div className="min-h-screen flex bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased">
      
      {/* Mobile Sidebar Backdrop Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Municipal Left Navigation Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />


      {/* Main Panel Canvas Area */}
      <div className="flex-1 flex flex-col lg:pl-72 min-w-0">
        
        {/* Responsive Top Header Navbar with Municipal Seal & Staggered Variants */}
        <header className="sticky top-0 z-30 bg-slate-900 border-b border-amber-500 text-white shadow-xl flex flex-col shrink-0">
          
          {/* Public Address & Hours Meta-Bar */}
          <div className="bg-slate-950 text-[11px] text-slate-300 px-6 py-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-800 font-medium">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" /> 
                <span><strong className="text-white font-semibold">East Bank:</strong> 1300 Perdido St, Rm 4E01, 70112</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" /> 
                <span><strong className="text-white font-semibold">West Bank:</strong> 225 Morgan St, 70114</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20 shrink-0">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold tracking-wide">Hours: M–F 8:30 AM – 4:00 PM</span>
            </div>
          </div>

          {/* Primary Navbar Row */}
          <motion.div 
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            className="h-20 px-6 flex items-center justify-between gap-6"
          >
            {/* Mobile Menu Trigger & Official Municipal Crest Logo Section */}
            <motion.div variants={navItemVariants} className="flex items-center gap-4 shrink-0">
              <button 
                type="button"
                onClick={() => setSidebarOpen(true)} 
                className="lg:hidden p-2 rounded-md hover:bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6 text-amber-500" />
              </button>

              {/* Official Municipal Brand Logo Section */}
              <a href="#home" className="flex items-center gap-3 group">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-b from-amber-400 to-amber-600 border-2 border-amber-300 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                  {/* SVG Fleur-de-lis Municipal Crest Icon */}
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-7 h-7 fill-slate-950 drop-shadow-xs"
                    xmlns="http://w3.org"
                  >
                    <path d="M12 2C11.5 4 10 6.5 8 7.5C9.5 8 10.5 9 11 10.5C9 10 7.5 8.5 7 6.5C6.5 8.5 5 10 3 10.5C4.5 11.5 5.5 13 6 15C6.5 13 8 11.5 10 11C9.5 12.5 9.5 14 10 15.5H14C14.5 14 14.5 12.5 14 11C16 11.5 17.5 13 18 15C18.5 13 19.5 11.5 21 10.5C19 10 17.5 8.5 17 6.5C16.5 8.5 15 10 13 10.5C13.5 9 14.5 8 16 7.5C14 6.5 12.5 4 12 2ZM11 17H13V20H15V22H9V20H11V17Z" />
                  </svg>
                  <div className="absolute inset-0 rounded-full border border-white/30 pointer-events-none" />
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase leading-none">
                    City of New Orleans
                  </span>
                  <h1 className="text-base font-black tracking-tight text-white uppercase leading-tight group-hover:text-amber-300 transition-colors">
                    Assessor's Office
                  </h1>
                  <span className="text-[11px] text-slate-400 font-medium hidden sm:block leading-none">
                    Erroll G. Williams, Assessor
                  </span>
                </div>
              </a>
            </motion.div>

            {/* Sticky Live Parcel Search Bar with Spring Interaction */}
            <motion.div variants={navItemVariants} className="flex-1 max-w-md hidden md:block">
              <form onSubmit={(e) => e.preventDefault()} className="bg-slate-950/90 p-1 rounded-lg border border-slate-800 focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500/50 transition-all flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="Search Parcel ID, Address, or Owner..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white text-xs px-3 py-1.5 focus:outline-none placeholder-slate-500 font-medium"
                />
                <motion.button 
                  {...springButtonHover}
                  type="submit" 
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">Search</span>
                </motion.button>
              </form>
            </motion.div>

            {/* Middle & Right Navigation Controls with Spring Hover */}
            <motion.nav variants={navItemVariants} className="flex items-center gap-4 relative shrink-0">
              <div className="relative">
                <motion.button 
                  {...springButtonHover}
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-slate-800/60 hover:bg-slate-800 text-xs uppercase font-bold tracking-wider hover:text-amber-400 border border-slate-700/60 transition-colors cursor-pointer"
                >
                  <Info className="w-4 h-4 text-amber-500" />
                  <span className="hidden sm:inline">General Information</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-amber-400' : ''}`} />
                </motion.button>

                {/* Dropdown Menu with Spring Scale Reveal */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        className="absolute right-0 mt-3 w-56 bg-slate-950 border border-slate-800 rounded-lg shadow-2xl py-2 z-20 overflow-hidden"
                      >
                        {[
                          { title: "Assessor's Desk", href: "#desk" },
                          { title: "Informational Flyers", href: "#flyers" },
                          { title: "Helpful Links", href: "#links" },
                          { title: "Facts & Stats", href: "#stats" },
                          { title: "Public Data Request", href: "#request" }
                        ].map((link) => (
                          <a 
                            key={link.title}
                            href={link.href} 
                            onClick={() => setDropdownOpen(false)}
                            className="block px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition-colors"
                          >
                            {link.title}
                          </a>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Quick Contact CTA with Tactile Spring Feedback */}
              <motion.a 
                {...springButtonHover}
                href="#contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </motion.a>
            </motion.nav>
          </motion.div>
        </header>


        {/* Primary Page Content Canvas */}
        <main className="flex-1 p-6 md:p-8 space-y-12 max-w-7xl w-full mx-auto">
          
          {/* Framer Motion Welcome Header Reveal Banner */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-slate-900 rounded-xl p-6 text-white border-l-4 border-amber-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm"
          >
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-black tracking-tight uppercase text-white">
                Welcome To Orleans Parish Assessor's Office
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Our digital portal offers transparent property values, quick lookup tools, and self-service records options.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-amber-500/10 text-amber-400 font-mono text-xs px-3 py-1.5 border border-amber-500/20 rounded shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Tax Roll Active
            </div>
          </motion.div>

          {/* Hero Slide Section */}
          <div className="relative overflow-hidden rounded-xl h-[340px] md:h-[380px] shadow-2xl bg-slate-950">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out flex flex-col justify-center px-8 md:px-16 text-white bg-gradient-to-br ${slide.gradient} ${
                  index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
                }`}
              >
                <div className="relative z-20 max-w-2xl space-y-3">
                  <span className={`inline-block text-[10px] font-black tracking-widest px-2.5 py-0.5 border rounded-sm uppercase ${slide.badgeColor}`}>
                    {slide.tag}
                  </span>
                  <h1 className="text-xl sm:text-2xl md:text-4xl font-black tracking-tight text-white uppercase drop-shadow-md">
                    {slide.title}
                  </h1>
                  <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Carousel Buttons */}
            <button 
              type="button" 
              onClick={prevSlide} 
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-950/50 hover:bg-slate-950/80 text-white transition border border-white/10"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              type="button" 
              onClick={nextSlide} 
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-950/50 hover:bg-slate-950/80 text-white transition border border-white/10"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Link Grid Blocks */}
          <section className="space-y-4">
            <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase border-b border-neutral-200 dark:border-neutral-800 pb-2">
              Quick Links &amp; Online Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {quickActionCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <a
                    key={card.title}
                    href={card.href}
                    className={`p-5 rounded-lg border transition-all duration-200 group flex flex-col justify-between ${
                      card.highlight
                        ? 'bg-slate-900 border-amber-500 text-white shadow-md hover:bg-slate-800'
                        : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-amber-500 hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className={`w-9 h-9 rounded flex items-center justify-center mb-3 ${
                        card.highlight ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-sm mb-1">{card.title}</h4>
                      <p className={`text-xs leading-relaxed mb-4 ${card.highlight ? 'text-slate-300' : 'text-neutral-500'}`}>
                        {card.subtitle}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Open Portal <ExternalLink className="w-3 h-3" />
                    </span>
                  </a>
                );
              })}
            </div>
          </section>

          {/* Dedicated Leadership Grid Row Section */}
          <motion.section {...scrollRevealProps} className="space-y-4">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-2">
              <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">
                Leadership Dedicated to Public Service
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-3xl leading-relaxed">
                Our leadership team works every day to support the mission of the Orleans Parish Assessor’s Office: establishing fair and equitable property values while providing efficient, accurate, and courteous service to the public.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              {leadershipTeam.map((member, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveLeaderIndex(idx)}
                  className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 rounded-lg text-center space-y-1 group hover:border-amber-500 transition-all cursor-pointer hover:shadow-md"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-900 mx-auto flex items-center justify-center mb-2 border-2 border-slate-800 text-amber-400 font-black text-lg group-hover:border-amber-500 transition-colors">
                    {member.initial}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{member.name}</h4>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">{member.title}</p>
                  <p className="text-[10px] font-mono text-neutral-400">{member.credentials}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Two-Column Midsection: News Posts vs Upcoming Deadlines */}
          <motion.div {...scrollRevealProps} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* News &amp; Blog Rolling Feed */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase border-b border-neutral-200 dark:border-neutral-800 pb-2">
                News &amp; Updates
              </h3>
              
              {/* Highlight Anti-Fraud Alert */}
              <div className="p-4 rounded-lg bg-red-950/20 border border-red-800/40 text-red-900 dark:text-red-300 flex items-start gap-4">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-xs uppercase tracking-wide text-red-800 dark:text-red-200">Protect Your Home From Title Fraud</h4>
                  <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                    Assessor Erroll Williams urges all residential property owners to sign up for the free Recording Notification Service to monitor real estate title filings.
                  </p>
                </div>
              </div>

              {/* General Blog Feed */}
              <div className="space-y-4 pt-2">
                {blogPosts.map((post, idx) => (
                  <article key={idx} className={`p-5 rounded-lg border space-y-3 ${post.isLatest ? 'bg-amber-500/5 border-amber-500/40 shadow-xs' : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-600 dark:text-neutral-400">
                        {post.date}
                      </span>
                      {post.isLatest && <span className="text-[9px] font-black uppercase bg-amber-500 text-slate-950 px-2 py-0.5 rounded-sm tracking-wider">Latest Update</span>}
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {post.title}
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <button type="button" className="px-3 py-1.5 text-[11px] font-bold rounded bg-slate-900 hover:bg-slate-800 text-amber-400 transition-colors uppercase tracking-wider">
                      Read Post
                    </button>
                  </article>
                ))}
              </div>
            </div>

            {/* Upcoming Operational Calendar Module */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
                <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">
                  Upcoming Events
                </h3>
                <button type="button" className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1">
                  View Calendar <Calendar className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-3">
                {events.map((evt, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white dark:bg-neutral-900 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <div className="w-12 h-12 bg-slate-900 text-white rounded flex flex-col items-center justify-center shrink-0 border-b-2 border-amber-500">
                      <span className="text-[10px] uppercase font-bold tracking-wider leading-none text-amber-400">{evt.month}</span>
                      <span className="text-base font-black leading-none mt-1">{evt.day}</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{evt.title}</h4>
                      <p className="text-[11px] text-red-500 font-semibold">{evt.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </main>
      </div>

      {/* LIGHTBOX MODAL OVERLAY GALLERY */}
      {/* LIGHTBOX MODAL OVERLAY GALLERY (Interactive Leadership Slideshow with Dynamic Transitions) */}
      <AnimatePresence>
        {activeLeaderIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveLeaderIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          >
            {/* Close Button with Spring Micro-interaction */}
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              type="button"
              onClick={() => setActiveLeaderIndex(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500 transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <div className="flex items-center justify-between w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              
              {/* Previous Slide Action Button with Tactile Feedback */}
              <motion.button 
                whileHover={{ scale: 1.1, x: -4 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                type="button"
                onClick={prevLeader}
                className="p-3.5 rounded-full bg-slate-900 border border-slate-800 text-white hover:border-amber-500 hover:text-amber-400 transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                aria-label="Previous Leader"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              {/* Central Dynamic Lightbox Content with Directional Sweeping Animation */}
              <div className="relative overflow-hidden w-full max-w-xl min-h-[360px] flex items-center justify-center px-4">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeLeaderIndex}
                    initial={{ opacity: 0, x: 50, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="text-center w-full space-y-4"
                  >
                    {/* Floating Avatar Badge */}
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 350, damping: 20 }}
                      className="relative w-36 h-36 rounded-full bg-slate-900 border-4 border-amber-500 flex items-center justify-center mx-auto text-amber-400 text-3xl font-black shadow-2xl shadow-amber-500/20"
                    >
                      {leadershipTeam[activeLeaderIndex].initial}
                      <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
                    </motion.div>

                    <div className="space-y-1">
                      <h3 className="text-2xl font-black text-white tracking-tight uppercase">
                        {leadershipTeam[activeLeaderIndex].name}
                      </h3>
                      <p className="text-xs sm:text-sm text-amber-400 font-bold uppercase tracking-wider">
                        {leadershipTeam[activeLeaderIndex].title}
                      </p>
                      <p className="text-xs text-neutral-400 font-mono">
                        {leadershipTeam[activeLeaderIndex].credentials}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light max-w-md mx-auto">
                      Serving Orleans Parish residents honestly and fairly from City Hall Room 4E01. Dedicated to establishing transparent property values and providing courteous public records assistance.
                    </p>

                    {/* Leader Position Indicator Matrix */}
                    <div className="flex justify-center gap-1.5 pt-2">
                      {leadershipTeam.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveLeaderIndex(idx)}
                          className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                            idx === activeLeaderIndex ? 'w-6 bg-amber-500' : 'w-1.5 bg-neutral-700 hover:bg-neutral-500'
                          }`}
                          aria-label={`Jump to leader ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Slide Action Button with Tactile Feedback */}
              <motion.button 
                whileHover={{ scale: 1.1, x: 4 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                type="button"
                onClick={nextLeader}
                className="p-3.5 rounded-full bg-slate-900 border border-slate-800 text-white hover:border-amber-500 hover:text-amber-400 transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                aria-label="Next Leader"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}