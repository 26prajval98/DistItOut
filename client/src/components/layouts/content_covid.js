import React, { useState, Fragment } from "react";
import data from '../../data/countries.json'
import { scaleLinear } from "d3-scale";
import {
	ComposableMap,
	Geographies,
	Geography,
	Sphere,
	ZoomableGroup,
	Graticule
} from "react-simple-maps";

const geoUrl =
	"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
	.domain([0.29, 0.68])
	.range(["#ffedea", "#ff5233"]);

const MapChart = () => {

	const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });



	function handleMoveEnd(position) {
		setPosition(position);
	}

	return (
		<Fragment>
			<ComposableMap
				projectionConfig={{
					rotate: [-10, 0, 0],
					scale: 147
				}}
			>
				<ZoomableGroup
					zoom={position.zoom}
					center={position.coordinates}
					onMoveEnd={handleMoveEnd}
				>
					<Sphere stroke="#E4E5E6" strokeWidth={0.5} />
					<Graticule stroke="#E4E5E6" strokeWidth={0.5} />
					{data.length > 0 && (
						<Geographies geography={geoUrl}>
							{({ geographies }) =>
								geographies.map(geo => {
									const d = data.find(s => s.ISO3 === geo.properties.ISO_A3);
									return (
										<Geography
											key={geo.rsmKey}
											geography={geo}
											fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
										/>
									);
								})
							}
						</Geographies>
					)}
				</ZoomableGroup>
			</ComposableMap>
		</Fragment>
	);
};

export default MapChart;