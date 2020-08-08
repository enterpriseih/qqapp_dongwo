const baseUrl = 'http://47.104.240.249:8085/star-testing/api/v1'
Page({
	data: {
		
	},
	bindGetUserInfo (e) {
		const openId = qq.getStorageSync('openid')
		if (!openId) {
			this.login().then(() => {
				this.gotoPage('4');
				// const userInfo = qq.getStorageSync('userInfo')
				// if (!userInfo) {
				// 	qq.getSetting({
				// 		success: res => {
				// 			if (!res.authSetting['scope.userInfo']) {
				// 				// 已经授权，可以直接调用 getUserInfo 获取头像昵称
				// 				qq.getUserInfo({
				// 				success: res => {
				// 					qq.setStorageSync('userInfo', res.userInfo)
				// 					this.gotoPage('4');
				// 				}
				// 				})
				// 			} else {
				// 				this.gotoPage('4');
				// 			}
				// 		}
				// 	})
				// } else {
				// 	this.gotoPage('4');
				// }
			}).catch(() => {
				qq.showToast({
					title: '登录失败，请稍后再试',
					icon: 'none',
					duration: 1000,
					complete () {
						qq.navigateBack({ delta: 1 });
					}
				})
			})
		} else {
			this.gotoPage('4');
		}
	},
	login () {
		return new Promise((resolve, reject) => {
			qq.login({
				success: res_login  => {
					if (res_login.code) {
						// 获取用户的openid
						qq.request({
							url: `${baseUrl}/session?jsCode=${res_login.code}`,
							success: ({ data: res }) => {
								if (res.errcode === 0) {
									qq.setStorageSync('openid', res.openid)
									resolve()
								} else {
									reject()
								}
							},
							fail () {
								reject()
							}
						})
					}
				}
			})
		})
	},
	chooseQuestionType (e) {
		const { type } = e.currentTarget.dataset;
		this.gotoPage(type);
	},
	gotoPage(type) {
		switch (type) {
			case '1':
				qq.navigateTo({ url:'/pages/starquestion/index' });
				break;
			case '2':
				qq.navigateTo({ url: '/pages/customquestion/index' });
				break;
			case '3':
				qq.navigateTo({ url: '/pages/persional/index' });
				break;
			case '4':
				qq.navigateTo({ url: '/pages/starList/index' });
				break;			
		}
	},
	onShareAppMessage () {
        return {
          title: '快来测试你的追星等级吧~',
          path: '/pages/index/index'
        }
    }
});