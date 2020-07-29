export default function loadBingApi() {
	let url = "http://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=AoUmJwkCEO-LcuZPDFTJQrxCWMp6su1ujEntp66HHnL_TZpQWxGl1MoiHAGwzWVi"

	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.type = "text/javascript";
		script.async = true;
		script.defer = true;
		script.src = url;
		script.onload = () => {
			setTimeout(function(){ resolve(); }, 3000)
		}
		script.onerror = (error) => {
			reject(error);
		};
		document.body.appendChild(script);
	});
}