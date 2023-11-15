import React from "react";
import "./card.css";
import useDevice from "../../utils/hooks/useDevice";

export function Card({
	name,
	flag,
	capital,
	region,
}: {
	name: string;
	flag: string;
	capital: string;
	region: string;
}) {
	const { device } = useDevice();
	return (
		<div className={`card-container ${device}`}>
			<img className="card-flag" src={flag} alt="" />
			<p className={`card-name ${device}`}>{name}</p>
			<div className={`card-information ${device}`}>
				<div className="card-text-information">
					<p className={`card-capital ${device}`}>Capital: {capital}</p>
					<p className={`card-region ${device}`}>Region: {region}</p>
				</div>
			</div>
		</div>
	);
}
