import request from '../../common/js/request';
Page({
    data: {
        questions: [],
        score: 0,
        scene: '',
        count: 3,
        curqIndex: 0,
        remainTime: 15000,
        deg1: 0,
        deg2: 0.1
    },
    onLoad (option) {
        const { id } = option;
        this.getQuestion(id);
    },
    getQuestion (id) {
        request({
            url: 'https://mp.sfansclub.com/h5/knownme/questions',
            method: 'POST',
            data: {
                userToken: '61lD9Y3cd540df215lz',
                kcId: id
            }
        }).then(res => {
            setTimeout(() => {
                this.countDown();
            }, 500);
            this.initQuestion(res);
        }).catch(err => {
            qq.showToast({
                title: '获取数据异常',
                icon: 'loading',
                duration: 1000,
                complete () {
                    qq.navigateBack({ delta: 1 });
                }
            })
        })
    },
    /**
     * show countdown after page init
     */
    countDown () {
        this.setData({ scene: 'countdown', count:  this.data.count });
        setTimeout(() => {
            if (this.data.count == 1) {
                setTimeout(() => {
                    this.setData({ scene: 'question', count: 3 }, () => {
                        this.startCountDown();
                    });
                }, 200);
            } else {
                this.setData({ count: this.data.count - 1 }, () => {
                    this.countDown();
                })
            }
        }, 1000);
    },
    /**
     * countdown 15s
     *
     */
    startCountDown () {
        clearInterval(this.data.timer);
        this.setData({
            deg1: 0,
            deg2: 0.1,
            remainTime: 15000
        });
        const timer = setInterval(() => {
            let deg1 = this.data.deg1;
            let deg2 = this.data.deg2;
            let remainTime = this.data.remainTime;
            if (remainTime <= 7500) {
                deg1 += 2.4;
                deg2 = 0;
            } else {
                deg2 += 2.4;
            }
            if (deg2 >= 178) {
                deg2 = 0;
            }
            remainTime -= 100;
            this.setData({ deg1, deg2, remainTime });
            if (remainTime <= 0) {
                this.selectAnswer();
                this.stopCountDown();
                return;
            }
        }, 100);
        this.setData({ timer });
    },
    /**
     * stop countDown
     *
     */
    stopCountDown() {
        clearInterval(this.data.timer);
        this.setData({ timer: null });
    },
    /**
     * init questions which from interface
     */
    initQuestion (res) {
        const questions = res.data.questions.map(item => ({
            title: item.question,
            options: Object.values(item.options),
            right: item.type
        })); 
        this.setData({
            questions: questions,
            avatar: res.data.avatar
        })
    },
    selectAnswer (e) {
        let index;
        let right;
        if (!e) {
            index = 0;
            right = 1;
        } else {
            index = e.currentTarget.dataset.index;
            right = e.currentTarget.dataset.right;
        }
        let { score, curqIndex } = this.data;
        if (index == right) {
            score += 10;
        }
        if (curqIndex < 9) {
            curqIndex += 1;
            this.setData({ score, curqIndex }, () => {
                this.startCountDown();
            });
        } else {
            qq.navigateTo({ url: `/pages/starList/index?score=${score}` });
        }
    }
})