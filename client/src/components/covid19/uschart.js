import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import MapChart from './mapchart'

const url = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export default function WorldMap() {
  const [content, setContent] = useState("");
  return (
    <div style={{ width: "50vw", minWidth: "500px", margin: "auto" }}>
      <MapChart setTooltipContent={setContent} geoUrl={url} projection={"geoAlbersUsa"} projectionConfig={{}} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  )
}