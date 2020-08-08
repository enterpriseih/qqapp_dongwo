Page({
    data: {
        score: 0
    },
    onLoad(option) {
        const { score } = option;
        this.setData({ score });
    },
    retest () {
        qq.redirectTo({ url: `/pages/index/index` });
    },
    onShareAppMessage () {
        return {
          title: '快来测试你的追星等级吧~',
          path: '/pages/index/index'
        }
    }
})