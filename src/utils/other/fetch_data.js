"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountriesData = void 0;
// const local = "http://localhost:8000/";
const urlAPI = "https://restcountries.com/v3.1/";
const url = "https://restcountries-85dbd.web.app/";
const getCurrencies = (data) => data.currencies
    ? Object.keys(data.currencies).map((e) => `${data.currencies[e].name} (${e}): ${data.currencies[e].symbol}`)
    : "aucune";
async function getCountriesData(route) {
    const response = await fetch(`${url}${route}`);
    const responsesData = await response.json();
    const data = [];
    responsesData.forEach((r) => data.push({
        name: r.name,
        capital: r.capital,
        region: r.region,
        "currencie(s)": getCurrencies(r),
        flag: r.flag,
    }));
    return data;
}
exports.getCountriesData = getCountriesData;
