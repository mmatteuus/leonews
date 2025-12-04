const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast";

export interface WeatherData {
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
}

const weatherCodeMap: Record<number, { description: string; icon: string }> = {
  0: { description: "Céu limpo", icon: "☀️" },
  1: { description: "Principalmente limpo", icon: "🌤️" },
  2: { description: "Parcialmente nublado", icon: "⛅" },
  3: { description: "Nublado", icon: "☁️" },
  45: { description: "Nevoeiro", icon: "🌫️" },
  48: { description: "Nevoeiro depositante", icon: "🌫️" },
  51: { description: "Garoa fraca", icon: "🌦️" },
  53: { description: "Garoa moderada", icon: "🌧️" },
  55: { description: "Garoa densa", icon: "🌧️" },
  61: { description: "Chuva fraca", icon: "🌧️" },
  63: { description: "Chuva moderada", icon: "🌧️" },
  65: { description: "Chuva forte", icon: "🌧️" },
  80: { description: "Aguaceiros fracos", icon: "🌦️" },
  81: { description: "Aguaceiros moderados", icon: "🌧️" },
  82: { description: "Aguaceiros fortes", icon: "⛈️" },
};

export async function fetchAraguainaWeather(): Promise<WeatherData> {
  // Coordenadas de Araguaína, TO
  const params = new URLSearchParams({
    latitude: "-7.192",
    longitude: "-48.204",
    current: "temperature_2m,apparent_temperature,weather_code",
    timezone: "America/Araguaina",
    forecast_days: "1",
  });

  const res = await fetch(`${OPEN_METEO_URL}?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch weather");

  const data = await res.json();
  const current = data.current || {};
  const code = Number(current.weather_code ?? 0);
  const mapped = weatherCodeMap[code] || {
    description: "Tempo estável",
    icon: "🌤️",
  };

  return {
    temp: current.temperature_2m ?? 0,
    feelsLike: current.apparent_temperature ?? current.temperature_2m ?? 0,
    description: mapped.description,
    icon: mapped.icon,
  };
}
