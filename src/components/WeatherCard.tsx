import { useEffect, useState } from "react";
import { CloudSun, AlertCircle } from "lucide-react";
import { fetchAraguainaWeather, WeatherData } from "@/services/weatherApi";

const WeatherCard = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchAraguainaWeather();
        setData(result);
      } catch {
        setError("Não foi possível carregar o clima agora.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const renderIcon = (icon?: string, alt?: string, size = "h-12 w-12") => {
    if (icon) {
      const isUrl = icon.startsWith("http");
      return isUrl ? (
        <img src={icon} alt={alt || "Ícone de clima"} className={size} />
      ) : (
        <div className={`${size} flex items-center justify-center text-3xl`}>
          {icon}
        </div>
      );
    }
    return <CloudSun className={`${size} text-primary`} />;
  };

  return (
    <section className="rounded-xl border border-border bg-card/80 backdrop-blur-sm p-4 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">{renderIcon(data?.icon, data?.description)}</div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Clima em Araguaína
          </p>

          {loading && <p className="text-sm text-muted-foreground">Carregando...</p>}

          {error && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {error}
            </p>
          )}

          {data && !loading && !error && (
            <>
              <p className="text-lg font-semibold">{Math.round(data.temp)}°C</p>
              <p className="text-xs text-muted-foreground">
                Sensação térmica de {Math.round(data.feelsLike)}°C · {data.description}
              </p>
            </>
          )}
        </div>
      </div>

      {data?.daily?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {data.daily.slice(0, 4).map((day) => (
            <div
              key={day.date}
              className="rounded-lg border border-border/60 bg-background/70 p-3 text-center flex flex-col gap-1"
            >
              <span className="text-xs font-medium text-muted-foreground">
                {new Date(day.date).toLocaleDateString("pt-BR", { weekday: "short" })}
              </span>
              {renderIcon(day.icon, day.description, "h-8 w-8")}
              <span className="text-sm font-semibold">
                {Math.round(day.max)}° / {Math.round(day.min)}°
              </span>
              <span className="text-[11px] text-muted-foreground leading-tight">
                {day.description}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default WeatherCard;
