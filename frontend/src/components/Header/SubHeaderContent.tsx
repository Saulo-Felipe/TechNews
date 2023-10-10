import axios from "axios";

interface IPAPIResponse {
  data: {
    ip: string;
    hostname: string;
    city: string;
    region: string;
    country: string;
    loc: string;
    org: string;
    postal: string;
    timezone: string;
  }
}

interface TemperatureResponse {
  data: {
    current: {
      time: string;
      temperature: number;
    },
    current_units: { 
      temperature: "°C" 
    }
  }
}

export async function SubHeaderContent() {
  try {
    const { data: {ip: userIp} } = await axios.get("https://api64.ipify.org?format=json");

    const { data: userLocation }: IPAPIResponse = await axios.get(`https://ipinfo.io/${userIp}?token=d7c2aa304b4e83`);

    const {data: temperature}: TemperatureResponse = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: userLocation.loc.split(",")[0],
        longitude: userLocation.loc.split(",")[1],
        current: "temperature"
      }
    });

    return (
      <>
        <div>{`${temperature.current.temperature} ${temperature.current_units.temperature}`}</div>
        <div>{`${userLocation.city}, ${userLocation.region} - ${userLocation.country}`}</div>
      </>
    );

  } catch(e) {
    return "Erro ao obter localização do usuário";
  }
}