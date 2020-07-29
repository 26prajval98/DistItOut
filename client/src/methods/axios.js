import axios from "axios"
import qs from "querystring"

var url = "https://distitout.azurewebsites.net/";

const httpGet = (path, data) => {
	return axios.get(url + path + "?" + qs.stringify(data))
}

const httpDelete = (path) => {
	return axios.delete(url + path)
}

const httpPost = (path, data) => {
	return axios.post(url + path, qs.stringify(data), {
		headers: {	
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

const httpFile = (path, data, func) => {

	var formData = new FormData()
	formData.append("file", data)
	return axios.post(url + path, formData, {
		onUploadProgress: (e) => {
			func(e.loaded / e.total)
		}
	})
}

export {
	httpGet,
	httpPost,
	httpDelete,
	httpFile
}