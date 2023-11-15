import React from "react";
import styled from "styled-components";
import "./card.css";
import useDevice from "../../utils/hooks/useDevice";
import LeafletMap from "../map/leaflet_map";

export function FlipCard({
	data,
	route,
	select,
	action,
}: {
	data: any;
	route: string;
	select: boolean;
	action: any;
}) {
	const { device } = useDevice();
	const Front = () => {
		return (
			<div className="front">
				<img
					className={`card-flag ${device}`}
					src={data.flag.svg}
					alt={data.flag.alt}
				/>
				<div className="front-information">
					<p className={`card-name ${device}`}>{data.name}</p>
					<p style={{textAlign: "center"}}>({data.translation?.fra.common})</p>
					<div className={`card-information ${device}`}>
						<div className="card-text-information">
							<p><span>Native name:</span>{data?.nativeName}</p>
							<p><span>Capital:</span>{data.capital}</p>
							<p><span>Region:</span>{data.region}</p>
							<p><span>Population:</span>{data.population}</p>
						</div>
					</div>
				</div>
				<button className="btn_show_more" onClick={() => action()}>
					View on Map
				</button>
			</div>
		);
	};

	const Back = () => {
		const position =
			route === "capital" ? data?.latlng?.capital : data?.latlng?.country;
		return (
			<div className="back" onClick={() => action()}>
				<LeafletMap position={position} device={device} route={route} name={data?.name.toLowerCase()} />
			</div>
		);
	};

	return (
		<CardContainer className={`card-container ${select}`} device={device}>
			<Card className="card" device={device}>
				<Front />
				<Back />
			</Card>
		</CardContainer>
	);
}

const CardContainer = styled.div<{ device: string }>`
	display: flex;
	perspective: 300vw;
	width: ${(props) =>
		props.device === "mobile"
			? "80vw"
			: props.device === "tablet"
			? "40vw"
			: "20vw"};

	&.true > .card {
		transform: rotateY(180deg);
	}
`;

const Card = styled.div<{ device: string }>`
	position: relative;
	width: 100%;
	height: ${(props) =>
		props.device === "mobile"
			? "65vh"
			: props.device === "tablet"
			? "40vh"
			: "65vh"};
	border-radius: 1rem;
	transition: transform 1.5s ease;
	transform-style: preserve-3d;
	background-color: #42424e;

	& .front,
	& .back {
		position: absolute;
		backface-visibility: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100%;
		border-radius: 1rem;
		box-shadow: 5px 5px 15px black;
	}

	& > .back {
		transform: rotateY(180deg);
	}
`;
