import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import MapChart from './mapchart'

const url = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

export default function WorldMap(props) {
	console.log(props)
	const [content, setContent] = useState("");
	return (
		<div style={{ width: "50vw", minWidth: "500px", margin: "auto" }}>
			<MapChart setTooltipContent={setContent} geoUrl={url} zoom={1} projectionConfig={{ scale: 200 }} data={props.dataWorld} />
			<ReactTooltip>
				{
					<p>
						{content["Country"]} <br />
						Confirmed : {content["Confirmed"] ? content["Confirmed"] : "-"} <br />
						Deaths : {content["Deaths"] ? content["Deaths"] : "-"} <br />
						Recovered : {content["Recovered"] ? content["Recoverd"] : "-"} <br />
						Active : {content["Active"] ? content["Active"] : "-"} <br />
					</p>
				}
			</ReactTooltip>
		</div>
	)
}