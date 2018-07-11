import axios from 'axios'
import router from '../router'

axios.defaults.baseURL = process.env.URL

// 封装Header
export function httpHeader() {
	return {
		'X-Token' : localStorage.token
	}
}

// 先进行第一次简单封装
export function fetchAxios(props) {
	return new Promise((resolve, reject) => {
		axios({
			url: props.url ,
			method: props.method,
			headers: httpHeader(),
			params: props.method === 'GET' ? props.params : null,
			data: props.method !== 'GET' ? props.params : null
		}).then(response => {
			//这里过滤数据，只取程序返回数据
			resolve(response.data)
		}).catch(error => {
			let _data = error.response.data;
			//统一处理
			if (_data.meta.statusCode == 701) {
				router.push({ path: '/login' });
			}
			reject(_data);
		})
	})

}


// 封装出GET ws://127.0.0.1:8081/cwgl/websocket
export function fetchGet(props) {
	return fetchAxios({
		url: props.url, 
		method: 'GET', 
		params: props.params 
	})
}

export function fetchPost(props){
	return fetchAxios({
		url: props.url, 
		method: 'POST', 
		params: props.params 
	})
}

export function fetchPut(props){
	return fetchAxios({
		url: props.url, 
		method: 'PUT', 
		params: props.params 
	})
}

export function fetchDelete(props){
	return fetchAxios({
		url: props.url, 
		method: 'DELETE', 
		params: props.params 
	})
}