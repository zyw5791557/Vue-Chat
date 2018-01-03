import axios from 'axios';
export default{
	install(Vue,options)
	{
		Vue.prototype.getApi = function (api,...arg) {
			const api_port = {
				// 登录
				login: '/api/login',
				// 注册
				register: '/api/register',
				// 修改用户信息
				userInfoEdit: '/api/userEdit'
			}
			let params = {};
			params.url = api_port[api];
			for ( let key in arg[0]) {
				params[key] = arg[0][key];
			};
			return axios(params);
		}
	}
}