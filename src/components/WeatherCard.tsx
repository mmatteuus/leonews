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
      } catch (err) {
        setError("Não foi possível carregar o clima agora.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const renderIcon = () => {
    if (data?.icon) {
      // If icon is an URL, render image; if it's an emoji/text, render as text
      const isUrl = data.icon.startsWith("http");
      return isUrl ? (
        <img src={data.icon} alt={data.description} className="h-12 w-12" />
      ) : (
        <div className="h-12 w-12 flex items-center justify-center text-3xl">
          {data.icon}
        </div>
      );
    }
    return <CloudSun className="h-10 w-10 text-primary" />;
  };

  return (
    <section className="rounded-xl border border-border bg-card/80 backdrop-blur-sm p-4 flex items-center gap-4 shadow-sm">
      <div className="flex-shrink-0">{renderIcon()}</div>
      <div className="flex-1">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Clima em Araguaína
        </p>

        {loading && (
          <p className="text-sm text-muted-foreground">Carregando...</p>
        )}

        {error && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> {error}
          </p>
        )}

        {data && !loading && !error && (
          <>
            <p className="text-lg font-semibold">{Math.round(data.temp)}°C</p>
            <p className="text-xs text-muted-foreground">
              Sensação térmica de {Math.round(data.feelsLike)}°C ·{" "}
              {data.description}
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default WeatherCard;
