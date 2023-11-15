"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlipCard = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
require("./card.css");
const useDevice_1 = __importDefault(require("../../utils/hooks/useDevice"));
function FlipCard({ data, index, select, action, }) {
    const { device } = (0, useDevice_1.default)();
    const Front = () => {
        return (<div className="front">
				<img className={`card-flag ${device}`} src={data.flag} alt=""/>
				<div className="front-information">
					<p className={`card-name ${device}`}>{data.name}</p>
					<div className={`card-information ${device}`}>
						<div className="card-text-information">
							<p className={`card-capital ${device}`}>
								Capital: {data.capital}
							</p>
							<p className={`card-region ${device}`}>Region: {data.region}</p>
						</div>
					</div>
				</div>
				<button className="btn_show_more" onClick={() => action()}>
					More Info
				</button>
			</div>);
    };
    const Back = () => {
        return (<div className="back">
				<p>BACK</p>
			</div>);
    };
    return (<CardContainer className={`card-container ${select}`} device={device}>
			<Card className="card" device={device}>
				<Front />
				<Back />
			</Card>
		</CardContainer>);
}
exports.FlipCard = FlipCard;
const CardContainer = styled_components_1.default.div `
	display: flex;
	perspective: 300vw;
	width: ${(props) => props.device === "mobile"
    ? "80vw"
    : props.device === "tablet"
        ? "40vw"
        : "20vw"};

	&.true > .card {
		transform: rotateY(180deg);
	}
`;
const Card = styled_components_1.default.div `
	position: relative;
	width: 100%;
	height: ${(props) => props.device === "mobile"
    ? "60vh"
    : props.device === "tablet"
        ? "40vh"
        : "60vh"};
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
