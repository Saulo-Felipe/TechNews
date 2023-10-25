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

    // await sleep();

    const {ip: userIp} = await (await fetch("https://api64.ipify.org?format=json")).json();

    const resp = await fetch(process.env.backend_url+"/category/teste", {next: {revalidate: 10}});
    console.log(resp);

    const userLocation: UserLocationResponse = await (
      await fetch(`https://ipinfo.io/${userIp}?token=d7c2aa304b4e83`)
    ).json();

    const temperature: TemperatureResponse = await (
      await fetch("https://api.open-meteo.com/v1/forecast?" + new URLSearchParams({
        latitude: userLocation.loc.split(",")[0],
        longitude: userLocation.loc.split(",")[1],
        current: "temperature"
      }))
    ).json();

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