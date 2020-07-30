import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import MapChart from './mapchart'

const url = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export default function USMap(props) {
	console.log(props)
	const [content, setContent] = useState({});
	return (
		<div style={{ width: "50vw", minWidth: "500px", margin: "auto" }}>
			<MapChart setTooltipContent={setContent} geoUrl={url} projection={"geoAlbersUsa"} projectionConfig={{}} data={props.dataUS} />
			<ReactTooltip>
				{
					<p>
						{content["Name"]} <br />
						Positive : {content["positive"] ? content["positive"] : "-"} <br />
						Increase : {content["positiveIncrease"] ? content["positiveIncrease"] : "-"} <br />
						Total : {content["totalTestsViral"] ? content["totalTestsViral"] : "-"} <br />
						Recoverd : {content["recovered"] ? content["recovered"] : "-"} <br />
						Death : {content["death"] ? content["death"] : "-"} <br />
						Increase In Death : {content["deathIncrease"] ? content["deathIncrease"] : "-"} <br />
					</p>
				}
			</ReactTooltip>
		</div>
	)
}