import request from '../../common/js/request';
const baseUrl = 'http://47.104.240.249:8085/star-testing/api/v1'
Page({
	data: {
		starList: [],
		videoAd: {}
	},
	onLoad () {
		this.getStarList();
		var videoAd = qq.createRewardedVideoAd({
			adUnitId: 'b5a54d0e0839cd370412d953adf0f217'
		});
		this.setData({videoAd });
	},
	getStarList () {
		request({
			url: `${baseUrl}/category`
		}).then(res => {
			this.setData({ starList: res.data });
		})
	},
	getRemind () {
		// return request({
		// 	url: `${baseUrl}/rest?`
		// })
	},
	gotoExam (e) {
		const openId = qq.getStorageSync('openid');
		const { id } = e.currentTarget.dataset;
		request({
			url: `${baseUrl}/category/rest?userId=${openId}&categoryId=${id}`
		}).then(res => {
			if (res.errCode === 0) {
				if (res.data < 1) {
					qq.showModal({
						title: '提示',
						content: '答题次数已用完，请观看视频获取答题次数',
						success: res => {
						  if (res.confirm) {
							  this.watchVideo().then(() => {
								qq.navigateTo({ url: `/pages/starquestion/index?id=${id}` });
							  })
						  }
						}
					  })
				} else {
					qq.navigateTo({ url: `/pages/starquestion/index?id=${id}` });
				}
			} else {
				qq.showToast({
					title: '获取数据异常',
					icon: 'loading',
					duration: 1000
				})
			}
		})
	},

	watchVideo () {
		return new Promise((resolve, reject) => {
			var videoAd = this.data.videoAd;
			videoAd.load()
			.then(() => {
				videoAd.show()
				.catch(err => {
					console.log('激励视频 广告显示失败')
				})
			})
			.catch(err => {
				console.log('激励视频加载失败');
			});
			videoAd.onClose(res => {
				if (res.isEnded) {
					resolve()
				} else {
					qq.showModal({
					title: '提示',
					content: '观看完整视频，才可以下载视频',
					success:res => {
						if (res.confirm) {
							videoAd.show();
						} else if (res.cancel) {
						}
					}
					})
				}
			});
		})
	},
	onShareAppMessage () {
        return {
          title: '快来测试你的追星等级吧~',
          path: '/pages/index/index'
        }
    }
})