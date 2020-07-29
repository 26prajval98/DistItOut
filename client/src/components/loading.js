import React from 'react'
import loaderImg from '../images/loading.gif'
import '../w3.css'

export default function Loader() {
    return (
        <div className="w3-container w3-display-container" style={{ height: window.innerHeight }}>
            <div className="w3-display-middle w3-center">
                <img src={loaderImg} width={"100%"} style={{maxWidth : "200px"}} alt="Loading"/>
				<h1 className="w3-center w3-xxlarge">Loading</h1>
                <div className="ball-pulse">
                    <div style={{ backgroundColor: "black" }}></div>
                    <div style={{ backgroundColor: "black" }}></div>
                    <div style={{ backgroundColor: "black" }}></div>
                </div>
            </div>
        </div >
    )
}
