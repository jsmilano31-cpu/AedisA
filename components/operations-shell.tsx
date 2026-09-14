"use client";

import {
  Activity,
  Bell,
  LayoutDashboard,
  MapPin,
  Menu,
  MessageSquarePlus,
  MoreHorizontal,
  Navigation,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

const navItems = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Risk map", href: "/risk-map", icon: MapPin },
  { label: "Community reports", href: "/community-reports", icon: MessageSquarePlus },
  { label: "Dispatch center", href: "/dispatch-center", icon: Navigation },
];

export function OperationsShell({ children, title }: { children: ReactNode; title: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand-lockup">
          <Link href="/" className="brand-link" onClick={() => setSidebarOpen(false)}>
            <div className="brand-mark"><Activity size={20} strokeWidth={2.5} /></div>
            <div><strong>AedesAlert</strong><span>PUBLIC HEALTH AI</span></div>
          </Link>
          <button className="mobile-close" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><X size={20} /></button>
        </div>

        <div className="workspace-label">OPERATIONS CENTER</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return <Link className={`nav-item ${isActive ? "nav-item-active" : ""}`} href={href} key={label} onClick={() => setSidebarOpen(false)}>
              <Icon size={18} /><span>{label}</span>{isActive && <span className="nav-dot" />}
            </Link>;
          })}
        </nav>

        <div className="sidebar-divider" />
        <div className="workspace-label">SYSTEM</div>
        <Link className={`nav-item ${pathname === "/notifications" ? "nav-item-active" : ""}`} href="/notifications" onClick={() => setSidebarOpen(false)}><Bell size={18} /><span>Notifications</span><span className="notification-count">4</span></Link>
        <Link className={`nav-item ${pathname === "/data-privacy" ? "nav-item-active" : ""}`} href="/data-privacy" onClick={() => setSidebarOpen(false)}><ShieldCheck size={18} /><span>Data privacy</span></Link>

        <div className="sidebar-footer">
          <Link href="/data-privacy" className="avatar" aria-label="Open profile and privacy settings">MC</Link>
          <div className="user-copy"><strong>Maria Cruz</strong><span>Municipal health officer</span></div>
          <Link href="/data-privacy" aria-label="Open account settings"><MoreHorizontal size={18} className="muted-icon" /></Link>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={22} /></button>
          <div className="breadcrumb"><span>Health operations</span><span className="breadcrumb-slash">/</span><strong>{title}</strong></div>
          <div className="topbar-actions">
            <label className="search-box"><Search size={16} /><input placeholder="Search reports, barangays..." aria-label="Search reports and barangays" /></label>
            <Link className="icon-button" href="/notifications" aria-label="Notifications"><Bell size={18} /><span className="alert-pip" /></Link>
            <Link href="/data-privacy" className="top-avatar" aria-label="Open profile and privacy settings">MC</Link>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
