"use client";

import { AlertTriangle, ArrowRight, Bell, CheckCircle2, CloudRain } from "lucide-react";
import { useState } from "react";
import { OperationsShell } from "@/components/operations-shell";

const notifications = [
  { title: "High risk alert: San Isidro", detail: "Risk score moved above 85. Review the map and consider dispatch.", time: "12 min ago", icon: AlertTriangle, tone: "high" },
  { title: "Rainfall threshold crossed", detail: "Poblacion received 42mm rainfall in the last 6 hours.", time: "38 min ago", icon: CloudRain, tone: "watch" },
  { title: "Team Maligaya checked in", detail: "Field inspection is underway and evidence is being uploaded.", time: "1 hr ago", icon: CheckCircle2, tone: "active" },
];

export default function NotificationsPage() {
  const [read, setRead] = useState(false);
  return <OperationsShell title="Notifications"><div className="page-content"><section className="page-hero"><div><p className="eyebrow">SYSTEM CENTER</p><h1>Notifications</h1><p className="welcome-copy">The latest changes that may need your attention.</p></div><button className="secondary-action" onClick={() => setRead(true)}><CheckCircle2 size={15} /> {read ? "All caught up" : "Mark all as read"}</button></section><section className="panel notification-panel"><div className="panel-heading"><div><h2>Recent activity</h2><p className="panel-subcopy">{read ? "You have no unread updates." : "4 unread updates across your operations center."}</p></div><Bell size={19} className="muted-icon" /></div><div className="notification-list">{notifications.map(({ title, detail, time, icon: Icon, tone }) => <article className={`notification-row ${read ? "notification-read" : ""}`} key={title}><div className={`notification-icon alert-${tone}`}><Icon size={17} /></div><div className="notification-copy"><strong>{title}</strong><p>{detail}</p><span>{time}</span></div><ArrowRight size={16} className="muted-icon" /></article>)}</div></section></div></OperationsShell>;
}
