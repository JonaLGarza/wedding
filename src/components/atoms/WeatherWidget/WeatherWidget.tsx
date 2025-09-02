import { useEffect, useMemo, useState } from "react";
import { useWeatherCache } from "../../../hooks/useWeatherCache";

type Props = {
  city?: string;               // "Saltillo" por defecto
  countryCode?: string;        // "MX" por defecto
  className?: string;
};

type Daily = {
  dt: number;
  temp: { min: number; max: number };
  weather: { description: string; icon: string }[];
};

type OneCall = {
  timezone_offset: number;
  current: {
    temp: number;
    weather: { description: string; icon: string }[];
  };
  daily: Daily[];
};

type APIResponse = {
  place: { name: string };
  weather: OneCall;
};

const dayShortEs = (tsMs: number) =>
  new Intl.DateTimeFormat("es-MX", { weekday: "short" })
    .format(tsMs)
    .replace(/\.$/, "") + "."; // asegurar el puntito

const iconUrl = (icon: string, big = false) =>
  `https://openweathermap.org/img/wn/${icon}${big ? "@4x" : "@2x"}.png`;

export default function WeatherWidget({
  city = "Saltillo",
  countryCode = "MX",
  className = "",
}: Props) {
  const [data, setData] = useState<OneCall | null>(null);
  const [place, setPlace] = useState<{ name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // Base del backend (Nest). En prod puedes setear VITE_API_BASE con la URL de EB.
  const API_BASE = import.meta.env.VITE_API_BASE ?? "";

  // Hook de caché
  const {
    cache,
    isFromCache,
    shouldFetchFromAPI,
    setCachedData,
    clearCache
  } = useWeatherCache(city, countryCode);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        if (!API_BASE) {
          throw new Error("API base no configurada");
        }

        setLoading(true);
        setError(null);

        // 1) Si no debemos ir a la API y hay caché, úsalo
        if (!shouldFetchFromAPI() && cache?.data) {
          if (!cancelled) {
            setData(cache.data.weather);
            setPlace(cache.data.place);
            setLastUpdated(formatLastUpdated(cache.timestamp));
          }
          return;
        }

        // 2) Llamar a tu backend Nest
        const base = API_BASE.replace(/\/$/, "");
        const url = `${base}/weather/forecast`;

        const res = await fetch(url, { headers: { Accept: "application/json" } });
        if (!res.ok) {
          let msg = `Error ${res.status}`;
          try {
            const body = await res.json();
            msg = body?.message || body?.error || msg;
          } catch {
            throw new Error(msg);
          }
        }

        const json = (await res.json()) as APIResponse;

        if (!cancelled) {
          setData(json.weather);
          setPlace(json.place);
          setLastUpdated("Ahora");

          // Guardar en caché
          setCachedData({
            weather: json.weather,
            place: json.place,
            timestamp: Date.now(),
          });
        }
      } catch (e: unknown) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Error cargando el clima");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [city, countryCode, API_BASE, shouldFetchFromAPI, cache, setCachedData]);

  // Formateo "última actualización"
  const formatLastUpdated = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));

    if (hours > 0) return `Hace ${hours}h ${minutes}m`;
    if (minutes > 0) return `Hace ${minutes}m`;
    return "Ahora";
  };

  // Forzar actualización
  const handleRefresh = () => {
    clearCache();
    setLoading(true);
    setError(null);
    // useEffect se encargará de recargar
  };

  const days = useMemo(() => {
    if (!data) return [];
    // Próximos 7 días (daily[1..7])
    return data.daily.slice(1, 8);
  }, [data]);

  if (loading) {
    return (
      <div className={`p-6 rounded-xl bg-[var(--brand-olive)]/10 border border-[var(--brand-olive)]/30 ${className}`}>
        <div className="text-center text-[var(--brand-olive)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--brand-olive)] mx-auto mb-2"></div>
          Cargando pronóstico…
        </div>
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className={`p-6 rounded-xl bg-red-50 border border-red-200 text-red-700 ${className}`}>
        <div className="text-center">
          <p className="font-medium">⚠️ Error</p>
          <p className="text-sm">{error || "No se pudo cargar el pronóstico."}</p>
          <button
            onClick={handleRefresh}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const currentIcon = data.current.weather[0]?.icon ?? "01d";
  const currentDesc = data.current.weather[0]?.description ?? "—";
  const currentTemp = Math.round(data.current.temp);

  return (
    <section
      className={`w-full rounded-xl border border-[var(--brand-olive)]/20 overflow-hidden shadow-lg ${className}`}
      aria-label="Pronóstico semanal"
    >
      {/* Encabezado estilo tarjeta */}
      <div className="flex items-center gap-6 bg-[var(--brand-olive)]/10 border-b border-[var(--brand-olive)]/20 px-6 py-6">
        <div className="flex-1">
          <p className="tracking-widest text-sm font-semibold text-[var(--brand-brown)]">
            {place?.name?.toUpperCase() || city.toUpperCase()}
          </p>
          <div className="flex items-center gap-4">
            <img
              src={iconUrl(currentIcon, true)}
              alt={currentDesc}
              className="w-20 h-20 object-contain"
            />
            <div>
              <p className="text-4xl md:text-5xl font-semibold text-[var(--brand-brown)]">
                {currentTemp}°C
              </p>
              <p className="text-[var(--brand-olive)] capitalize">{currentDesc}</p>
            </div>
          </div>
        </div>

        {/* Separador vertical */}
        <div className="h-20 w-px bg-[var(--brand-olive)]/30" />

        {/* Info caché */}
        <div className="hidden sm:flex flex-col items-center justify-center gap-2">
          <div className="text-center">
            <p className="text-xs text-[var(--brand-olive)]">
              {isFromCache ? "📱 Desde caché" : "🌐 Actualizado al día"}
            </p>
            <p className="text-xs text-[var(--brand-olive)]/70">
              {lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="h-2 bg-[var(--brand-gold)]/60" />

      {/* Grid de 7 días */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 px-6 py-6 bg-[var(--brand-olive)]/5">
        {days.map((d) => {
          const tsMs = (d.dt + data.timezone_offset) * 1000;
          const label = dayShortEs(tsMs);
          const max = Math.round(d.temp.max);
          const min = Math.round(d.temp.min);
          const icon = d.weather[0]?.icon ?? "01d";
          const desc = d.weather[0]?.description ?? "";

          return (
            <div
              key={d.dt}
              className="flex flex-col items-center text-center p-3 rounded-lg hover:bg-[var(--brand-olive)]/10 transition-colors"
            >
              <p className="text-sm font-semibold text-[var(--brand-brown)]">{label}</p>
              <img
                src={iconUrl(icon)}
                alt={desc}
                className="w-12 h-12 my-2 object-contain"
              />
              <p className="text-base font-medium text-[var(--brand-brown)]">{max}°C</p>
              <p className="text-sm text-[var(--brand-olive)]">{min}°C</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
