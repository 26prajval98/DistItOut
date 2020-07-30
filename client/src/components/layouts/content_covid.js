import React, { useState, memo } from "react";
import data from '../../data/countries.json'
import ReactTooltip from 'react-tooltip'

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


const MapChart = memo((props) => {
	return (
		<div style={{ width: "65vw", minWidth: "500px", paddingTop: "3vh", margin: "auto" }}>
			<ComposableMap
				projectionConfig={{
					rotate: [-10, 0, 0],
					scale: 147
				}}
			>
				<ZoomableGroup>
					<Sphere stroke="#E4E5E6" strokeWidth={0.5} />
					<Graticule stroke="#E4E5E6" strokeWidth={0.5} />
					{data.length > 0 && (
						<Geographies geography={geoUrl}>
							{({ geographies }) =>
								geographies.map(geo => {
									return (
										<Geography
											onMouseEnter={() => {
												const { NAME } = geo.properties;
												props.setContent(`${NAME}`);
											}}
											onMouseLeave={() => {
												props.setContent("");
											}}
											key={geo.rsmKey}
											geography={geo}
											// fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
											style={{
												default: {
													fill: "#D6D6DA",
													outline: "none"
												},
												hover: {
													fill: "#F53",
													outline: "none"
												},
												pressed: {
													fill: "#E42",
													outline: "none"
												}
											}}
										/>
									)

								})
							}
						</Geographies>
					)}
				</ZoomableGroup>
			</ComposableMap>
		</div>
	)
})

const Main = () => {
	const [content, setContent] = useState("");
	return (
		<div>
			<MapChart setContent={setContent} />
			<ReactTooltip>{content}</ReactTooltip>
		</div>
	);
};

export default Main;