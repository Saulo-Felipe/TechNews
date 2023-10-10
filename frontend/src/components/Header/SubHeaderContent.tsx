interface UserLocationResponse {
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

interface TemperatureResponse {
  current: {
    time: string;
    temperature: number;
  },
  current_units: { 
    temperature: "°C" 
  }
}

export async function SubHeaderContent() {
  try {
    console.time();
    const ipifyResponse = await fetch("https://api64.ipify.org?format=json");
    const {ip: userIp} = await ipifyResponse.json();

    const ipinfoResponse = await fetch(`https://ipinfo.io/${userIp}?token=d7c2aa304b4e83`);
    const userLocation: UserLocationResponse = await ipinfoResponse.json();

    const openMeteoResponse = await fetch("https://api.open-meteo.com/v1/forecast?" + new URLSearchParams({
      latitude: userLocation.loc.split(",")[0],
      longitude: userLocation.loc.split(",")[1],
      current: "temperature"
    }));

    const temperature: TemperatureResponse = await openMeteoResponse.json();
    console.timeEnd();

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