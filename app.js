const baseUrl = 'http://47.104.240.249:8085/star-testing/api/v1'

App({
	onLaunch () {
		qq.login({
			success: res_login  => {
				if (res_login.code) {
					// 获取用户的openid
					qq.request({
						url: `${baseUrl}/session?jsCode=${res_login.code}`,
						success: res => {
							qq.setStorageSync('openid', res.openid)
						}
					})
				}
			}
		})
		// 查看是否授权
		// qq.getSetting({
		// 	success(res) {
		// 	  if (res.authSetting['scope.userInfo']) {
		// 		// 已经授权，可以直接调用 getUserInfo 获取头像昵称
		// 		qq.getUserInfo({
		// 		  success(res) {
		// 			console.log(res.userInfo)
		// 		  }
		// 		})
		// 	  }
		// 	}
		// })
	},
	onShow () {
		console.log('onShow');
	},
	onHide () {
		console.log('onHide');
	},
	onError () {
		console.error('inError');
	},
	onPageNotFound () {
		console.log('onPageNotFound');
	}
})