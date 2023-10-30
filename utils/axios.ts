import axios from 'axios';
import router from '../router';
import { message } from 'ant-design-vue';

const request = axios.create({
	timeout: 30000,
	headers: { 'Content-Type': 'application/json' },
	responseType: 'json',
	withCredentials: true,
});

let loading: any;
request.interceptors.request.use(
	config => {
		if (sessionStorage.token) {
			config.headers.Authorization = 'bearer ' + sessionStorage.token;
		}
		if (config.headers.noAuthorization) {
			delete config.headers.Authorization;
			delete config.headers.noAuthorization;
			delete config.withCredentials;
		}
		return config;
	},
	err => {
		return Promise.reject(err);
	},
);

/**
 * get status code
 */
const errorStatus = (response: any): string => {
	/** http status code */
	const code = response.status;
	/** notice text */
	let msg = 'Request Error';
	switch (code) {
		case 400:
			msg = '请求错误';
			break;
		case 403:
			msg = '拒绝访问';
			break;
		case 404:
			msg = '请求资源不存在';
			break;
		case 408:
			msg = '请求超时';
			break;
		case 500:
			msg = '服务器错误';
			break;
		case 501:
			msg = '服务未实现';
			break;
		case 502:
			msg = '网络错误';
			break;
		case 503:
			msg = '服务不可用';
			break;
		case 504:
			msg = '网络超时';
			break;
		case 505:
			msg = 'HTTP版本不受支持';
			break;
		default:
			msg = `连接出错!`;
	}
	return msg;
};

/**
 * @description 请求发起前的拦截器
 */
request.interceptors.response.use(
	async (data: any) => {
		loading && loading.close();
		let code = null;
		if (data.config.data && data.config.data.get) {
			code = data.data ? data.data.code : null;
		} else {
			code = data.data ? data.data.code : {};
		}
		if (code == 0) {
			return Promise.resolve(data || {});
		}
		if (code == 401) {
			// $router.push('login')
			message.destroy();
			// message('账号在其他终端或浏览器登录，您已被下线')
			// message.info('登录凭证已过期，请重新登录');
			router.push('/login');
			return;
		}
		if (code == 1013) {
			message.destroy();
			message.error('验证码有误或已过期，请重新获取验证码');
			return;
		}
		message.destroy();
		message.success(data.data ? data.data.msg : '');
		return Promise.reject(data.data.msg || {});
	},
	err => {
		loading && loading.close();
		if (err && err.response) {
			err.message = errorStatus(err.response);
		} else {
			err.message = '连接服务器失败!';
		}
		message.destroy();
		message.error(err.message || {});
		return Promise.reject(err.message || {});
	},
);

/**
 * @url请求路径
 * @params请求查询参数
 * @config请求头配置
 */

export function post(url: any, data: any, config?: any) {
	return request({
		url,
		method: 'post',
		data,
		...config,
	});
}

/**
 * @post请求
 * @url请求路径
 * @data请求参数
 * @config请求头配置
 */

export function get(url: any, params: any, config?: any) {
	return request({
		url,
		method: 'get',
		params,
		...config,
	});
}

/**
 * @deletes请求
 * @url请求路径
 * @data请求参数
 * @config请求头配置
 */
export function deletes(url: any, params: any, config?: any) {
	return request({
		url,
		method: 'get',
		params,
		...config,
	});
}
