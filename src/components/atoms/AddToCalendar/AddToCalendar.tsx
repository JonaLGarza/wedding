import React, { useId, useRef, useState } from "react";

type Dateish = Date | string; // ISO o Date

export interface AddToCalendarProps {
  title: string;
  start: Dateish;          // Date o ISO (ej. "2025-10-18T16:00:00-06:00")
  end: Dateish;            // Date o ISO
  description?: string;
  location?: string;
  allDay?: boolean;        // true = evento de día completo
  className?: string;
}

export const AddToCalendar: React.FC<AddToCalendarProps> = ({
  title,
  start,
  end,
  description = "",
  location = "",
  allDay = false,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const btnId = useId();
  const menuRef = useRef<HTMLDivElement>(null);

  // -------------------- Utils --------------------
  const toDate = (d: Dateish) => (d instanceof Date ? d : new Date(d));

  // Formatea a iCal: YYYYMMDD (allDay) o YYYYMMDDTHHMMSSZ (UTC)
  const toICSDate = (d: Date, allDayFlag: boolean) => {
    if (allDayFlag) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}${m}${day}`;
    }
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = d.getUTCDate();
    const hh = String(d.getUTCHours()).padStart(2, "0");
    const mm = String(d.getUTCMinutes()).padStart(2, "0");
    const ss = String(d.getUTCSeconds()).padStart(2, "0");
    return `${y}${m}${day}T${hh}${mm}${ss}Z`;
  };

  const sanitize = (s: string) =>
    s
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");

  const asUTCNoSeparators = (d: Date) =>
    toICSDate(d, false); // ya viene sin separadores

  const diffDurHHMM = (startD: Date, endD: Date) => {
    const ms = Math.max(0, endD.getTime() - startD.getTime());
    const mins = Math.round(ms / 60000);
    const hh = String(Math.floor(mins / 60)).padStart(2, "0");
    const mm = String(mins % 60).padStart(2, "0");
    return `${hh}${mm}`;
  };

  // -------------------- Links --------------------
  const s = toDate(start);
  const e = toDate(end);

  // Google
  const googleDates = allDay
    ? `${toICSDate(s, true)}/${toICSDate(e, true)}`
    : `${asUTCNoSeparators(s)}/${asUTCNoSeparators(e)}`;
  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(
    location
  )}&dates=${googleDates}`;

  // Outlook.com (web)
  // admite startdt & enddt en ISO; usamos UTC ISO para evitar sorpresas
  const outlookWebUrl = (() => {
    const iso = (d: Date) => d.toISOString(); // UTC ISO
    const base =
      "https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent";
    const params = new URLSearchParams({
      subject: title,
      body: description,
      location: location,
      startdt: allDay ? s.toISOString().substring(0, 10) : iso(s),
      enddt: allDay ? e.toISOString().substring(0, 10) : iso(e),
      allday: allDay ? "true" : "false",
    });
    return `${base}&${params.toString()}`;
  })();

  // Yahoo (usa inicio + duración)
  const yahooUrl = (() => {
    if (allDay) {
      // Yahoo no documenta bien allDay; muchas implementaciones usan dur=allday
      const st = `${toICSDate(s, true)}T000000Z`;
      const base = "https://calendar.yahoo.com/?v=60&view=d&type=20";
      const qs = new URLSearchParams({
        title,
        st,
        desc: description,
        in_loc: location,
        dur: "allday",
      });
      return `${base}&${qs.toString()}`;
    }
    const st = asUTCNoSeparators(s);
    const dur = diffDurHHMM(s, e);
    const base = "https://calendar.yahoo.com/?v=60&view=d&type=20";
    const qs = new URLSearchParams({
      title,
      st,
      desc: description,
      in_loc: location,
      dur,
    });
    return `${base}&${qs.toString()}`;
  })();

  // ICS content (para Apple Calendar, Outlook desktop, Google también lo acepta)
  const icsContent = (() => {
    const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@yourapp`;
    const dtstamp = toICSDate(new Date(), false);
    const dtstart = toICSDate(s, allDay);
    // Para allDay en iCal, DTEND debe ser EXCLUSIVO (día siguiente)
    const dtend = allDay
      ? toICSDate(new Date(e.getTime()), true)
      : toICSDate(e, false);

    return [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//YourApp//AddToCalendar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      allDay ? `DTSTART;VALUE=DATE:${dtstart}` : `DTSTART:${dtstart}`,
      allDay ? `DTEND;VALUE=DATE:${dtend}` : `DTEND:${dtend}`,
      `SUMMARY:${sanitize(title)}`,
      description ? `DESCRIPTION:${sanitize(description)}` : "",
      location ? `LOCATION:${sanitize(location)}` : "",
      "END:VEVENT",
      "END:VCALENDAR",
    ]
      .filter(Boolean)
      .join("\r\n");
  })();

  const downloadICS = () => {
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "_")}.ics`;
    a.click();
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  // -------------------- UX / Accesibilidad --------------------
  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // -------------------- Render --------------------
  return (
    <div className={`relative inline-block z-[99999] ${className}`} ref={menuRef}>
      {/* Botón integrado con fecha y acción */}
      <button
        id={btnId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex flex-col items-center gap-2 rounded-xl px-4 py-3 shadow border bg-[var(--brand-ivory)] hover:bg-[var(--brand-beige)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)]/50 text-[var(--brand-olive)] border-[var(--brand-terracotta)]/20 transition-all duration-200"
      >
        {/* Fecha del evento */}
        <div className="flex items-center justify-center space-x-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-medium">
            {allDay 
              ? s.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })
              : s.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) + ' ' + s.toLocaleTimeString('es-ES', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })
            }
          </span>
        </div>

        {/* Línea separadora */}
        <div className="w-full h-px bg-[var(--brand-terracotta)]/30"></div>

        {/* Acción de añadir a calendario */}
        <div className="flex items-center gap-2">
          <span>📅 Añadir a calendario</span>
          <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden>
            <path d="M5.5 7.5l4.5 4.5 4.5-4.5" fill="none" stroke="currentColor" />
          </svg>
        </div>
      </button>

      {open && (
        <div
          role="menu"
          aria-labelledby={btnId}
          className="absolute z-[999999] mt-2 w-full rounded-xl border bg-[var(--brand-ivory)] shadow-lg p-2 border-[var(--brand-terracotta)]/20"
        >
          <MenuItem
            label="Google Calendar"
            icon={
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            }
            onSelect={() => {
              window.open(googleUrl, "_blank", "noopener,noreferrer");
              setOpen(false);
            }}
          />
          <MenuItem
            label="Outlook.com"
            icon={
              <img 
                src="https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/outlook.ico" 
                alt="Outlook Calendar" 
                className="w-4 h-4"
              />
            }
            onSelect={() => {
              window.open(outlookWebUrl, "_blank", "noopener,noreferrer");
              setOpen(false);
            }}
          />
          <MenuItem
            label="Yahoo Calendar"
            icon={
              <img 
                src="https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/yahoo.ico" 
                alt="Yahoo Calendar" 
                className="w-4 h-4"
              />
            }
            onSelect={() => {
              window.open(yahooUrl, "_blank", "noopener,noreferrer");
              setOpen(false);
            }}
          />
          <MenuItem 
            label="Apple" 
            icon={
              <img 
                src="https://jgwedding-photo-videos.s3.us-east-2.amazonaws.com/apple.ico" 
                alt="Apple/Outlook Calendar" 
                className="w-4 h-4"
              />
            }
            onSelect={downloadICS} 
          />
        </div>
      )}
    </div>
  );
};

// Item básico accesible con teclado/enter
const MenuItem: React.FC<{ label: string; icon?: React.ReactNode; onSelect: () => void }> = ({
  label,
  icon,
  onSelect,
}) => {
  return (
    <button
      role="menuitem"
      onClick={onSelect}
      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--brand-beige)] focus:bg-[var(--brand-beige)] focus:outline-none text-[var(--brand-olive)] hover:text-[var(--brand-olive)] transition-colors duration-200 flex items-center gap-3"
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};
