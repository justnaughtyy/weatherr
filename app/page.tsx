import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, Wind, Droplets } from 'lucide-react';

const getWeatherInfo = (code: number) => {
  if (code === 0) return { text: 'ท้องฟ้าแจ่มใส', icon: Sun };
  if (code >= 1 && code <= 3) return { text: 'มีเมฆบางส่วน', icon: Cloud };
  if (code >= 45 && code <= 48) return { text: 'มีหมอก', icon: CloudFog };
  if (code >= 51 && code <= 55) return { text: 'ฝนปรอยๆ', icon: CloudDrizzle };
  if (code >= 61 && code <= 65) return { text: 'ฝนตก', icon: CloudRain };
  if (code >= 71 && code <= 77) return { text: 'หิมะตก', icon: CloudSnow };
  if (code >= 95 && code <= 99) return { text: 'พายุฝนฟ้าคะนอง', icon: CloudLightning };
  return { text: 'ไม่ทราบสภาพอากาศ', icon: Sun };
};

async function getWeatherData() {
  const lat = 13.754;
  const lon = 100.5014;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia%2FBangkok`;

  const res = await fetch(url, { cache: 'no-store' } );
  if (!res.ok) throw new Error('Failed to fetch weather data');
  return res.json();
}

export default async function WeatherApp() {
  const data = await getWeatherData();
  const current = data.current;
  
  const weather = getWeatherInfo(current.weather_code);
  const WeatherIcon = weather.icon;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans text-white">
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-8 w-full max-w-md shadow-2xl">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-wider mb-1">BANGKOK</h1>
          <p className="text-white/80 font-medium">ประเทศไทย</p>
        </div>
        <div className="flex flex-col items-center justify-center mb-8">
          <WeatherIcon size={80} className="text-white drop-shadow-md mb-4" />
          <div className="flex items-start">
            <span className="text-7xl font-extrabold tracking-tighter">
              {Math.round(current.temperature_2m)}
            </span>
            <span className="text-3xl font-semibold mt-2 ml-1">°C</span>
          </div>
          <p className="text-xl mt-2 font-medium capitalize tracking-wide">
            {weather.text}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/10">
            <Wind size={24} className="text-white/80 mb-2" />
            <p className="text-sm text-white/70 mb-1">ความเร็วลม</p>
            <p className="text-lg font-semibold">{current.wind_speed_10m} km/h</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/10">
            <Droplets size={24} className="text-white/80 mb-2" />
            <p className="text-sm text-white/70 mb-1">ความชื้น</p>
            <p className="text-lg font-semibold">{current.relative_humidity_2m}%</p>
          </div>
        </div>

      </div>
    </div>
  );
}