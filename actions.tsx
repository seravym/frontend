'use server';

import { WeatherData } from "./types/weather";

export async function WeatherSearch(city: string): Promise<{
  data?: WeatherData;
  error?: string;
}> {
  try {
    if (!city.trim()) {
      return { error: "City name is required" };
    }

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`
    );

    const data = await res.json();

    console.log("API Status:", res.status);
    console.log("API Response:", data);

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch weather data");
    }

    console.log("Weather data:", data);

    return { data };

  } catch (error) {
    console.error("Error fetching weather data:", error);

    return {
      error: (error as Error).message || "An error occurred"
    };
  }
}