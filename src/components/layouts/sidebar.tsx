"use client";
import React from 'react';
import { 
  X, 
  ShieldAlert, 
  Home, 
  Info, 
  Newspaper, 
  Users, 
  Briefcase, 
  Mail, 
  HelpCircle, 
  Building
} from 'lucide-react';

type SideBarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SideBarProps) => {

  const navSections = [
    {
      label: "Main Navigation",
      links: [
        { name: "Home", href: "#home", icon: Home },
        { name: "General Information", href: "#info", icon: Info },
        { name: "News & Updates", href: "#news", icon: Newspaper },
        { name: "About Us", href: "#about", icon: Users },
        { name: "Job Openings", href: "#careers", icon: Briefcase },
        { name: "Contact Us", href: "#contact", icon: Mail }
      ]
    },
    {
      label: "Services & Public Safety",
      links: [
        { name: "Fraud & Abuse Hotline", href: "#fraud", icon: ShieldAlert },
        { name: "Frequently Asked Questions", href: "#faq", icon: HelpCircle }
      ]
    }
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-100 border-r-4 border-amber-500
      transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Sidebar Brand Header */}
      <div className="h-20 flex items-center justify-between px-6 bg-slate-950 border-b border-slate-800 shrink-0">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase">Orleans Parish</span>
          <span className="text-base font-black tracking-tight text-white uppercase">Assessor's Office</span>
        </div>
        <button 
          type="button"
          onClick={() => setSidebarOpen(false)} 
          className="lg:hidden p-1.5 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white transition"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar Navigation Matrix */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold px-3">
              {section.label}
            </div>
            {section.links.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <IconComponent className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </div>
        ))}

        {/* Special Quick Action Sidebar Badge Component */}
        <div className="pt-2">
          <a
            href="#fraud"
            className="flex items-center gap-3 p-3 rounded-lg bg-red-950/50 border border-red-800/60 text-red-300 hover:bg-red-900/50 transition-colors text-xs font-semibold"
          >
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
            <div>
              <p className="font-bold text-red-200">Report Tax Fraud</p>
              <p className="text-[10px] text-red-400">Confidential hotline &amp; submission</p>
            </div>
          </a>
        </div>
      </div>

      {/* Location Banner Footer */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-3 shrink-0">
        <Building className="w-5 h-5 text-amber-500 shrink-0" />
        <div>
          <p className="font-semibold text-slate-200">City Hall • Room 4E01</p>
          <p className="text-[11px] text-slate-500">1300 Perdido St, New Orleans, LA</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;