Page({
    data: {
        score: 0
    },
    onLoad(option) {
        const { score } = option;
        this.setData({ score });
    }
})