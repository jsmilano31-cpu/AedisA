"use client";

import dynamic from "next/dynamic";
import { ArrowRight, CheckCircle2, Clock3, Navigation, PauseCircle, Radio, UserRound } from "lucide-react";
import Link from "next/link";
import { OperationsShell } from "@/components/operations-shell";

const OpenMap = dynamic(() => import("@/components/open-map").then((module) => module.OpenMap), { ssr: false, loading: () => <div className="map-loading">Loading OpenStreetMap data...</div> });

const teams = [
  { name: "Team Alpha", area: "San Isidro", status: "En route", eta: "12 min", tone: "high", icon: Navigation },
  { name: "Team Bravo", area: "Maligaya", status: "On site", eta: "Inspecting", tone: "watch", icon: Radio },
  { name: "Team Delta", area: "Poblacion", status: "Available", eta: "Ready now", tone: "low", icon: CheckCircle2 },
];

export default function DispatchCenterPage() {
  return <OperationsShell title="Dispatch center"><div className="page-content">
    <section className="page-hero"><div><p className="eyebrow">FIELD RESPONSE</p><h1>Dispatch center</h1><p className="welcome-copy">Coordinate response teams against the highest-priority risk signals.</p></div><Link className="primary-button" href="/risk-map"><Navigation size={16} /> Create new dispatch <ArrowRight size={15} /></Link></section>
    <section className="dispatch-layout"><div className="panel dispatch-map-panel"><div className="map-panel-title"><div><h2>Live team positions</h2><p>OpenStreetMap field operations layer</p></div><span className="live-badge"><i /> LIVE</span></div><OpenMap mode="dispatch" /></div><div className="panel team-panel" id="team-roster"><div className="panel-heading"><div><p className="eyebrow">ACTIVE TEAMS</p><h2>Response roster</h2></div><span className="team-count">3 / 11</span></div><div className="team-list">{teams.map(({ name, area, status, eta, tone, icon: Icon }) => <div className="team-row" key={name}><div className={`team-icon team-${tone}`}><Icon size={16} /></div><div className="team-copy"><strong>{name}</strong><span>{area}</span></div><div className="team-status"><b className={`status-${tone}`}>{status}</b><span>{eta}</span></div></div>)}</div><Link className="secondary-button" href="#team-roster"><UserRound size={16} /> View all field teams</Link></div></section>
    <section className="dispatch-stats"><div className="panel mini-stat"><Clock3 size={18} /><div><span>Average response time</span><strong>18 min</strong></div></div><div className="panel mini-stat"><PauseCircle size={18} /><div><span>Pending assignments</span><strong>04</strong></div></div><div className="panel mini-stat"><CheckCircle2 size={18} /><div><span>Completed today</span><strong>17</strong></div></div></section>
  </div></OperationsShell>;
}
