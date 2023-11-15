import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import useDevice from "./utils/hooks/useDevice";
import { getCountriesData } from "./utils/other/fetch_data";
import { FlipCard } from "./components/flip_card_onClick/flipcard";
import { getStorage, setStorage } from "./utils/other/storageCall";

function App() {
	const { device } = useDevice();
	const [data, setData] = useState<any[]>();
	const [selected, setSelected] = useState<string>("country");
	const [selectedCard, setSelectedCard] = useState<number>();
	const dataInit = useRef<any[] | any>(getStorage("restcountries"));
	const regions = useRef<any[] | any>(getStorage("restcountriesRegion"));
	const searchValue = useRef<string>();

	useEffect(() => {
		if (!data) {
			handleRequest("all");
		}
	});

	useEffect(() => {
		const seach: HTMLElement | any = document.getElementById(
			"input_countryByRegion"
		);
		seach.focus = false;
	}, [data]);

	// FUNCTIONS
	const handleRequest = async (route: string) =>
		dataInit.current === null ? fetchData(route) : filtredData(route);

	const fetchData = async (route: string) => {
		console.log("fetchData");
		const dataFetch = await getCountriesData(route);
		dataFetch.length > 1 &&
			dataFetch.sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
		if (dataFetch) {
			getAllRegions(dataFetch);
			dataInit.current = dataFetch;
			setStorage("restcountries", dataFetch);
			setData(dataFetch);
		}
	};

	const getAllRegions = (data: any[]) => {
		let newArr: any[] = [];
		data &&
			data?.forEach((e: any) => {
				const exist =
					newArr.findIndex((name: string) => e?.region === name) !== -1;
				if (!exist) {
					newArr.push(e.region);
					regions.current = newArr;
				}
			});
		setStorage("restcountriesRegion", newArr);
	};

	const filtredData = (route: string) => {
		console.log("filtredData");
		const routes = route.split("/");
		let newData: any[] =
			routes[0] === "all"
				? dataInit.current
				: dataInit.current.filter(
						(e: any) => e[routes[0]].toLowerCase() === routes[1].toLowerCase()
				  );
		setData(newData);
	};

	const reset = () => {
		const searchInput: HTMLElement | any = document.getElementById(
			"input_countryByRegion"
		);
		searchInput.value = "";
	};

	// RENDER
	const OptionList = ({ value }: any) => (
		<option className="searchRegion" value={value} />
	);

	const RadioInput = ({ selector }: any) => {
		return (
			<div className="radio_container">
				<input
					type="radio"
					id={selector}
					name="searcher"
					defaultChecked={selected === selector}
					onClick={() => {
						setSelected(selector);
					}}
				/>
				<label htmlFor={selector}>{selector}</label>
			</div>
		);
	};

	return (
		<>
			<header className="header">
				<h1>Countries API</h1>
			</header>

			<main>
				<section className={`search_container ${device}`}>
					<form className="search">
						<input
							className="input"
							list="browsers"
							name="countryByRegion"
							id="input_countryByRegion"
							placeholder="Choose your region"
							onChange={(e) => handleRequest(`region/${e.target.value}`)}
						/>
						<label htmlFor="countryByRegion" />
						<datalist id="browsers">
							{regions.current?.map((name: string) => (
								<OptionList value={name} key={name} />
							))}
						</datalist>
						<button
							className="button"
							id="SendByRegion"
							onClick={() => reset()}
						>
							Reset
						</button>
					</form>
					<p>or</p>
					<div className="filter">
						<div>
							<input
								className="input"
								type="text"
								id="userSearchValue"
								placeholder={`enter a ${selected}`}
								onChange={(e) => (searchValue.current = e.target.value)}
							/>
							<button
								className="button"
								id="btnShowData"
								onClick={() =>
									handleRequest(
										`${selected === "country" ? "name" : selected}/${
											searchValue.current
										}`
									)
								}
							>
								Show Data
							</button>
						</div>
						<form className="radioInput">
							<RadioInput selector="country" />
							<RadioInput selector="capital" />
						</form>
					</div>
				</section>

				<section className="resulat_container">
					{data ? (
						data.map((e: any, i: number) => (
							<FlipCard
								key={i}
								data={e}
								select={selectedCard === i}
								index={i}
								action={() =>
									setSelectedCard(selectedCard === i ? undefined : i)
								}
							/>
						))
					) : (
						<h1 style={{color: "white"}}>loading...</h1>
					)}
				</section>
			</main>

			<footer></footer>
		</>
	);
}

export default App;