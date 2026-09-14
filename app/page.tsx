"use client";

import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Bell,
  CloudRain,
  Droplets,
  FileImage,
  Gauge,
  LayoutDashboard,
  MapPin,
  Menu,
  MessageSquarePlus,
  MoreHorizontal,
  Navigation,
  Search,
  ShieldCheck,
  Siren,
  Thermometer,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Risk map", icon: MapPin },
  { label: "Community reports", icon: MessageSquarePlus },
  { label: "Dispatch center", icon: Navigation },
];

const alerts = [
  { location: "Barangay San Isidro", detail: "Breeding site report", level: "High", time: "12 min ago" },
  { location: "Barangay Poblacion", detail: "Rainfall threshold crossed", level: "Watch", time: "38 min ago" },
  { location: "Barangay Maligaya", detail: "Field team check-in", level: "Active", time: "1 hr ago" },
];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const progressTimer = window.setInterval(() => {
      setLoadingProgress((currentProgress) => {
        if (currentProgress >= 100) {
          window.clearInterval(progressTimer);
          window.setTimeout(() => setIsLoading(false), 260);
          return 100;
        }

        return currentProgress + 1;
      });
    }, 18);

    return () => window.clearInterval(progressTimer);
  }, []);

  if (isLoading) {
    return <LoadingScreen progress={loadingProgress} />;
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand-lockup">
          <div className="brand-mark"><Activity size={20} strokeWidth={2.5} /></div>
          <div><strong>AedesAlert</strong><span>PUBLIC HEALTH AI</span></div>
          <button className="mobile-close" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><X size={20} /></button>
        </div>

        <div className="workspace-label">OPERATIONS CENTER</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon, active }) => (
            <button className={`nav-item ${active ? "nav-item-active" : ""}`} key={label}>
              <Icon size={18} /><span>{label}</span>{active && <span className="nav-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-divider" />
        <div className="workspace-label">SYSTEM</div>
        <button className="nav-item"><Bell size={18} /><span>Notifications</span><span className="notification-count">4</span></button>
        <button className="nav-item"><ShieldCheck size={18} /><span>Data privacy</span></button>

        <div className="sidebar-footer">
          <div className="avatar">MC</div>
          <div className="user-copy"><strong>Maria Cruz</strong><span>Municipal health officer</span></div>
          <MoreHorizontal size={18} className="muted-icon" />
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={22} /></button>
          <div className="breadcrumb"><span>Health operations</span><span className="breadcrumb-slash">/</span><strong>Overview</strong></div>
          <div className="topbar-actions">
            <div className="search-box"><Search size={16} /><input placeholder="Search reports, barangays..." aria-label="Search reports and barangays" /></div>
            <button className="icon-button" aria-label="Notifications"><Bell size={18} /><span className="alert-pip" /></button>
            <div className="top-avatar">MC</div>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <p className="eyebrow">MONDAY, SEPTEMBER 14, 2026 <span className="live-indicator"><i /> LIVE MONITORING</span></p>
              <h1>Good morning, Maria.</h1>
              <p className="welcome-copy">Here is the dengue risk picture across your municipality.</p>
            </div>
            <button className="primary-button"><Siren size={17} /> Create dispatch <ArrowUpRight size={16} /></button>
          </section>

          <section className="metric-grid" aria-label="Public health metrics">
            <MetricCard icon={<Gauge size={19} />} label="Municipal risk score" value="72" suffix="/100" trend="+8.4%" trendCopy="vs. last week" tone="coral" />
            <MetricCard icon={<AlertTriangle size={19} />} label="High-risk barangays" value="06" suffix="" trend="2 new" trendCopy="in the last 24h" tone="amber" />
            <MetricCard icon={<FileImage size={19} />} label="Open reports" value="28" suffix="" trend="-12%" trendCopy="vs. last week" tone="teal" />
            <MetricCard icon={<Navigation size={19} />} label="Active field teams" value="09" suffix="" trend="84%" trendCopy="response coverage" tone="navy" />
          </section>

          <section className="dashboard-grid">
            <div className="panel map-panel">
              <div className="panel-heading"><div><p className="eyebrow">SPATIAL INTELLIGENCE</p><h2>Risk activity map</h2></div><button className="filter-button">Last 14 days <span>⌄</span></button></div>
              <div className="map-legend"><span><i className="legend-high" /> High risk</span><span><i className="legend-watch" /> Watch</span><span><i className="legend-low" /> Low risk</span></div>
              <div className="risk-map" aria-label="Stylized municipality risk map">
                <div className="map-grid-lines" />
                <div className="road road-one" /><div className="road road-two" /><div className="road road-three" />
                <MapMarker top="24%" left="29%" label="San Isidro" tone="high" />
                <MapMarker top="43%" left="59%" label="Poblacion" tone="watch" />
                <MapMarker top="67%" left="37%" label="Maligaya" tone="high" />
                <MapMarker top="72%" left="74%" label="Sta. Cruz" tone="low" />
                <MapMarker top="30%" left="79%" label="Payatas" tone="watch" />
                <div className="map-scale">N<br /><span>+<br />−</span></div>
                <div className="map-caption"><MapPin size={14} /> Quezon municipality <span>·</span> 18 barangays monitored</div>
              </div>
            </div>

            <div className="panel forecast-panel">
              <div className="panel-heading"><div><p className="eyebrow">EARLY WARNING</p><h2>14-day forecast</h2></div><button className="more-button" aria-label="More forecast options"><MoreHorizontal size={19} /></button></div>
              <div className="forecast-summary"><div className="forecast-number">72<span>/100</span></div><div><strong>Elevated risk</strong><p>Peak risk expected in 6 days</p></div></div>
              <div className="forecast-chart"><div className="chart-y"><span>100</span><span>50</span><span>0</span></div><svg viewBox="0 0 330 120" preserveAspectRatio="none" role="img" aria-label="Risk score rising forecast line"><path className="chart-area" d="M0 101 C20 98 26 88 47 91 S74 81 92 85 S113 69 133 77 S163 68 177 57 S202 65 220 52 S242 31 260 38 S286 24 303 29 S321 15 330 9 L330 120 L0 120 Z" /><path className="chart-line" d="M0 101 C20 98 26 88 47 91 S74 81 92 85 S113 69 133 77 S163 68 177 57 S202 65 220 52 S242 31 260 38 S286 24 303 29 S321 15 330 9" /><circle cx="303" cy="29" r="4" /></svg><div className="chart-x"><span>Today</span><span>+3d</span><span>+6d</span><span>+9d</span><span>+14d</span></div></div>
              <div className="forecast-factors"><div><Droplets size={15} /><span>Humidity <strong>87%</strong></span></div><div><CloudRain size={15} /><span>Rainfall <strong>High</strong></span></div><div><Thermometer size={15} /><span>Temp <strong>29° C</strong></span></div></div>
            </div>
          </section>

          <section className="bottom-grid">
            <div className="panel alerts-panel"><div className="panel-heading"><div><p className="eyebrow">NEEDS ATTENTION</p><h2>Recent alerts</h2></div><button className="text-button">View all <ArrowUpRight size={15} /></button></div><div className="alert-list">{alerts.map((alert) => <div className="alert-row" key={alert.location}><div className={`alert-icon alert-${alert.level.toLowerCase()}`}><AlertTriangle size={16} /></div><div className="alert-copy"><strong>{alert.location}</strong><span>{alert.detail}</span></div><div className="alert-meta"><b className={`status-${alert.level.toLowerCase()}`}>{alert.level}</b><span>{alert.time}</span></div></div>)}</div></div>
            <div className="panel coverage-panel"><div className="panel-heading"><div><p className="eyebrow">RESPONSE READINESS</p><h2>Team coverage</h2></div><button className="more-button" aria-label="More team options"><MoreHorizontal size={19} /></button></div><div className="coverage-ring"><div><strong>84%</strong><span>covered</span></div></div><div className="coverage-copy"><strong>9 of 11 teams active</strong><p>Two teams are available for immediate dispatch.</p></div><button className="secondary-button"><Users size={16} /> View team status</button></div>
          </section>
        </div>
      </main>
    </div>
  );
}

function LoadingScreen({ progress }: { progress: number }) {
  return (
    <main className="loading-screen" aria-live="polite" aria-label="Loading AedesAlert AI dashboard">
      <div className="loading-orbit loading-orbit-one" />
      <div className="loading-orbit loading-orbit-two" />
      <div className="loading-content">
        <div className="loading-brand-mark"><Activity size={42} strokeWidth={2.1} /></div>
        <p className="loading-kicker">PUBLIC HEALTH AI</p>
        <h1>AedesAlert</h1>
        <p className="loading-message">Preparing your health operations center</p>
        <div className="loading-progress-row"><span>INITIALIZING SYSTEMS</span><strong>{progress}%</strong></div>
        <div className="loading-progress-track" role="progressbar" aria-valuemin={1} aria-valuemax={100} aria-valuenow={progress}>
          <div className="loading-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <p className="loading-footer">EARLY WARNING · COMMUNITY ACTION · HEALTHIER BARANGAYS</p>
    </main>
  );
}

function MetricCard({ icon, label, value, suffix, trend, trendCopy, tone }: { icon: React.ReactNode; label: string; value: string; suffix: string; trend: string; trendCopy: string; tone: string }) {
  return <article className="metric-card"><div className={`metric-icon metric-${tone}`}>{icon}</div><p>{label}</p><div className="metric-value">{value}<small>{suffix}</small></div><div className="metric-trend"><span>{trend}</span> {trendCopy}</div></article>;
}

function MapMarker({ top, left, label, tone }: { top: string; left: string; label: string; tone: string }) {
  return <div className={`map-marker marker-${tone}`} style={{ top, left }}><span className="marker-pulse" /><div className="marker-label">{label}</div></div>;
}