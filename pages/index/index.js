Page({
	data: {
		
	},
	startChallenge (e) {
		this.gotoPage('4');
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
	}
});