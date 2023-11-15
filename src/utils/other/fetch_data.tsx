// const local = "http://localhost:8000/";
const urlAPI = "https://restcountries.com/v3.1/";
const url = "https://restcountries-85dbd.web.app/";

const getCurrencies = (data: any) =>
	data.currencies
		? Object.keys(data.currencies).map(
				(e) => `${data.currencies[e].name} (${e}): ${data.currencies[e].symbol}`
		  )
		: "aucune";

export async function getCountriesData(route: string) {
	const response: any = await fetch(`${url}${route}`);
	const responsesData = await response.json();
	const data: {
		name: string;
		capital: string;
		region: string;
		"currencie(s)": string | string[];
		flag: string;
	}[] = [];
	responsesData.forEach((r: any) =>
		data.push({
			name: r.name,
			capital: r.capital,
			region: r.region,
			"currencie(s)": getCurrencies(r),
			flag: r.flag,
		})
	);
	return data;
}