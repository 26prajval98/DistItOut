import React, { memo } from "react";
import { scaleLinear } from "d3-scale";
import {
	ZoomableGroup,
	ComposableMap,
	Geographies,
	Geography
} from "react-simple-maps";

const MapChart = ({ setTooltipContent, geoUrl, zoom = 1, projection = "geoEqualEarth", projectionConfig, data }) => {
	const colorScale = scaleLinear()
		.domain([0, 10000])
		.range(["#ffedea", "#ff5233"]);
	return (
		<>
			<ComposableMap projection={projection} data-tip="" projectionConfig={projectionConfig}>
				<ZoomableGroup zoom={zoom}>
					<Geographies geography={geoUrl}>
						{({ geographies }) =>
							geographies.map(geo => {
								return (
									<Geography
										fill=
										{(() => {
											let name;
											if (geo.properties.name)
												name = geo.properties.name
											else
												name = geo.properties.NAME

											if (data)
												if (name in data) {
													let d
													if ("death" in data[name])
														d = data[name].death
													else if ("Deaths" in data[name])
														d = data[name].Deaths
													console.log(d)
													return colorScale(d);
												}
											return "#F5F4F6"
										})()}
										key={geo.rsmKey}
										geography={geo}
										onMouseEnter={() => {
											let name;
											if (geo.properties.name)
												name = geo.properties.name
											else
												name = geo.properties.NAME

											if (data)
												if (name in data) {
													setTooltipContent(data[name]);
												}
										}}
										onMouseLeave={() => {
											setTooltipContent("");
										}}
										style={{
											default: {
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
									/>)
							})
						}
					</Geographies>
				</ZoomableGroup>
			</ComposableMap>
		</>
	);
};

export default memo(MapChart);
