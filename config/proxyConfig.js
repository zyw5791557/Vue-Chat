module.exports = {
	proxyList: {
		'/api':{
	        target: 'http://chat.emlice.top',
	        changeOrigin:true,
	        pathRewrite: {
	        	'^/api': '/api'
	        }
	    }
	}
}