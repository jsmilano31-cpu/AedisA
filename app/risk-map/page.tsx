"use client";

import dynamic from "next/dynamic";
import { ArrowLeft, Download, Filter, MapPin, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { OperationsShell } from "@/components/operations-shell";

const OpenMap = dynamic(() => import("@/components/open-map").then((module) => module.OpenMap), { ssr: false, loading: () => <div className="map-loading">Loading OpenStreetMap data...</div> });

export default function RiskMapPage() {
  const [lastUpdated, setLastUpdated] = useState("4 minutes ago");
  const [riskFilter, setRiskFilter] = useState("All risk levels");

  function exportMapData() {
    const content = "Barangay,Risk level\nSan Isidro,High\nPoblacion,Watch\nMaligaya,High\nSanta Cruz,Low\nPayatas,Watch\n";
    const download = document.createElement("a");
    download.href = `data:text/csv;charset=utf-8,${encodeURIComponent(content)}`;
    download.download = "aedesalert-risk-map.csv";
    download.click();
  }

  return <OperationsShell title="Risk map"><div className="page-content">
    <section className="page-hero"><div><p className="eyebrow">SPATIAL INTELLIGENCE</p><h1>Municipal risk map</h1><p className="welcome-copy">Explore live dengue risk signals by barangay. Select a marker for its latest evidence.</p></div><div className="hero-actions"><button className="secondary-action" onClick={() => setLastUpdated("just now")}><RefreshCw size={15} /> Refresh data</button><button className="secondary-action" onClick={exportMapData}><Download size={15} /> Export view</button></div></section>
    <section className="map-toolbar panel"><div className="toolbar-copy"><MapPin size={18} /><div><strong>Quezon municipality</strong><span>18 barangays monitored · updated {lastUpdated}</span></div></div><div className="toolbar-actions"><button className="filter-button" onClick={() => setRiskFilter(riskFilter === "All risk levels" ? "High risk only" : riskFilter === "High risk only" ? "Watch only" : "All risk levels")}><Filter size={14} /> {riskFilter} <span>⌄</span></button><Link className="primary-button" href="/dispatch-center">Dispatch a team <ArrowLeft size={15} className="flip-icon" /></Link></div></section>
    <section className="full-map-panel panel"><div className="map-panel-title"><div><h2>OpenStreetMap activity layer</h2><p>Risk markers are anonymized to barangay level.</p></div><div className="map-legend"><span><i className="legend-high" /> High risk</span><span><i className="legend-watch" /> Watch</span><span><i className="legend-low" /> Low risk</span></div></div><OpenMap mode="risk" /></section>
  </div></OperationsShell>;
}
