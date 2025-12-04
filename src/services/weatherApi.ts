const OPEN_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

export interface WeatherData {
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
}

export async function fetchAraguainaWeather(): Promise<WeatherData> {
  const params = new URLSearchParams({
    q: "Araguaina,BR",
    units: "metric",
    lang: "pt_br",
    appid: import.meta.env.VITE_OPENWEATHER_KEY || "",
  });

  const res = await fetch(`${OPEN_WEATHER_URL}?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch weather");

  const data = await res.json();

  return {
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    description: data.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };
}
