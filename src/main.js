import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './vuex/store'
import Vuex from 'vuex'

// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.prototype.$NProgress = NProgress;

import router from './router'

// import { setLocalStorage, getLocalStorage } from './common/js/util.js';
import api from './api/index';

Vue.use(api)
Vue.use(ElementUI)

Vue.use(Vuex)



// 线上资源服务器地址
Vue.prototype.$STATIC_URL = 'http://static.emlice.top';


// 全局 axiosBaseURL
Vue.prototype.$BASE_URL = process.env.API_ROOT;




new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

