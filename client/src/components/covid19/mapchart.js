import React, { memo } from "react";
import {
	ZoomableGroup,
	ComposableMap,
	Geographies,
	Geography
} from "react-simple-maps";

const MapChart = ({ setTooltipContent, geoUrl, zoom = 1, projection = "geoEqualEarth", projectionConfig, data }) => {
	return (
		<>
			<ComposableMap projection={projection} data-tip="" projectionConfig={projectionConfig}>
				<ZoomableGroup zoom={zoom}>
					<Geographies geography={geoUrl}>
						{({ geographies }) =>
							geographies.map(geo => {
								return (
									<Geography
										key={geo.rsmKey}
										geography={geo}
										onMouseEnter={() => {
											var name;
											if (geo.properties.name)
												name = geo.properties.name
											else
												name = geo.properties.NAME

											console.log(data)
											
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
