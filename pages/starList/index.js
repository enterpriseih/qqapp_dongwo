import request from '../../common/js/request';
Page({
	data: {
		starList: []
	},
	onLoad () {
		this.getStarList();
	},
	getStarList () {
		request({
			url: 'https://mp.sfansclub.com/h5/knownme/catagory-list'
		}).then(res => {
			this.setData({ starList: res.data.list });
		})
	},
	gotoExam (e) {
		const { id } = e.currentTarget.dataset;
		qq.navigateTo({ url: `/pages/starquestion/index?id=${id}` });
	}
})