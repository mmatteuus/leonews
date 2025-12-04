const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast";

export interface WeatherData {
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
  daily: DailyForecast[];
}

export interface DailyForecast {
  date: string;
  min: number;
  max: number;
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

const mapWeatherCode = (code: number) =>
  weatherCodeMap[code] || { description: "Tempo estável", icon: "🌤️" };

export async function fetchAraguainaWeather(): Promise<WeatherData> {
  // Coordenadas de Araguaína, TO
  const params = new URLSearchParams({
    latitude: "-7.192",
    longitude: "-48.204",
    current: "temperature_2m,apparent_temperature,weather_code",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min",
    timezone: "America/Araguaina",
    forecast_days: "5",
  });

  const res = await fetch(`${OPEN_METEO_URL}?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch weather");

  const data = await res.json();
  const current = data.current || {};
  const code = Number(current.weather_code ?? 0);
  const mapped = mapWeatherCode(code);

  const daily: DailyForecast[] = [];
  const days = data.daily || {};
  const dates: string[] = days.time || [];
  const maxTemps: number[] = days.temperature_2m_max || [];
  const minTemps: number[] = days.temperature_2m_min || [];
  const codes: number[] = days.weather_code || [];

  for (let i = 0; i < dates.length; i++) {
    const weatherInfo = mapWeatherCode(Number(codes[i] ?? 0));
    daily.push({
      date: dates[i],
      min: Math.round(minTemps[i] ?? 0),
      max: Math.round(maxTemps[i] ?? 0),
      description: weatherInfo.description,
      icon: weatherInfo.icon,
    });
  }

  return {
    temp: current.temperature_2m ?? 0,
    feelsLike: current.apparent_temperature ?? current.temperature_2m ?? 0,
    description: mapped.description,
    icon: mapped.icon,
    daily,
  };
}
