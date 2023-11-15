const local = "http://localhost:8000/";
const urlAPI = "https://restcountries.com/v3.1/";
const url = "https://restcountries-85dbd.web.app/";

export async function getCountriesData(route: string) {
	const response: any = await fetch(`${url}${route}`);
	const responsesData = await response.json();
	return responsesData;
}