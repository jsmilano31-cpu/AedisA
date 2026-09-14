"use client";

import { ArrowRight, CheckCircle2, Clock3, FileImage, Filter, MapPin, Plus, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { OperationsShell } from "@/components/operations-shell";

const reports = [
  { title: "Standing water behind the market", location: "San Isidro", submitted: "12 min ago", status: "New", tone: "high" },
  { title: "Uncovered water drums", location: "Poblacion", submitted: "38 min ago", status: "Reviewing", tone: "watch" },
  { title: "Blocked drainage canal", location: "Maligaya", submitted: "1 hr ago", status: "Assigned", tone: "active" },
  { title: "Discarded tires collecting rainwater", location: "Santa Cruz", submitted: "2 hrs ago", status: "Resolved", tone: "resolved" },
];

export default function CommunityReportsPage() {
  const [query, setQuery] = useState("");
  const visibleReports = reports.filter((report) => `${report.title} ${report.location}`.toLowerCase().includes(query.toLowerCase()));

  return <OperationsShell title="Community reports"><div className="page-content">
    <section className="page-hero"><div><p className="eyebrow">COMMUNITY SIGNALS</p><h1>Community reports</h1><p className="welcome-copy">Review resident-submitted breeding site evidence and route it to the right team.</p></div><Link className="primary-button" href="/community-reports?new=1"><Plus size={16} /> Add report <ArrowRight size={15} /></Link></section>
    <section className="report-summary-grid"><div className="panel report-summary"><FileImage size={18} /><div><span>Open reports</span><strong>28</strong></div></div><div className="panel report-summary"><Clock3 size={18} /><div><span>Awaiting review</span><strong>07</strong></div></div><div className="panel report-summary"><CheckCircle2 size={18} /><div><span>Resolved this week</span><strong>42</strong></div></div></section>
    <section className="panel report-table-panel"><div className="table-toolbar"><div><h2>Latest submissions</h2><p>Photos and locations submitted by the community.</p></div><div className="report-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search reports..." aria-label="Search community reports" /></div><Link className="filter-button" href="/community-reports?filter=all"><Filter size={14} /> Filter <span>⌄</span></Link></div><div className="report-list">{visibleReports.map((report) => <article className="report-item" key={report.title}><div className={`report-thumb report-thumb-${report.tone}`}><FileImage size={20} /></div><div className="report-details"><strong>{report.title}</strong><span><MapPin size={12} /> Barangay {report.location} · {report.submitted}</span></div><b className={`status-pill status-${report.tone}`}>{report.status}</b><Link className="row-action" href="/risk-map" aria-label={`View ${report.title} on risk map`}><ArrowRight size={17} /></Link></article>)}</div></section>
  </div></OperationsShell>;
}
