import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
function LeafletMap(props: {
	position: LatLngExpression;
	device: String;
	route: String;
	name: String;
}) {
	const position = props.position;

	return (
		<MapContainer
			className={`map_container ${props.device}`}
			center={position}
			zoom={props.route === "capital" ? 10 : props.name === "antarctica" ? -10 : 4}
			scrollWheelZoom={false}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={position}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		</MapContainer>
	);
}
export default LeafletMap;
