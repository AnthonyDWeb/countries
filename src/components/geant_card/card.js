"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const react_1 = __importDefault(require("react"));
require("./card.css");
const useDevice_1 = __importDefault(require("../../utils/hooks/useDevice"));
function Card({ name, flag, capital, region, }) {
    const { device } = (0, useDevice_1.default)();
    return (<div className={`card-container ${device}`}>
			<img className="card-flag" src={flag} alt=""/>
			<p className={`card-name ${device}`}>{name}</p>
			<div className={`card-information ${device}`}>
				<div className="card-text-information">
					<p className={`card-capital ${device}`}>Capital: {capital}</p>
					<p className={`card-region ${device}`}>Region: {region}</p>
				</div>
			</div>
		</div>);
}
exports.Card = Card;
