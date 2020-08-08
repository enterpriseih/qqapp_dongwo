import request from '../../common/js/request';
const baseUrl = 'http://47.104.240.249:8085/star-testing/api/v1'
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
            url: `${baseUrl}/question?categoryId=${id}`,
            method: 'get'
        }).then(res => {
            if (res.errCode === 0) {
                setTimeout(() => {
                    this.countDown();
                }, 500);
                this.initQuestion(res);
            } else {
                return Promise.reject()
            }
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
        const questions = res.data.map(item => ({
            title: item.question,
            options: [item.a, item.b, item.c, item.d],
            answer: item.answer,
            score: item.score
        })); 
        this.setData({
            questions: questions,
            avatar: res.data.avatar
        })
    },
    selectAnswer (e) {
        let index;
        let answer;
        let questionScore;
        if (!e) {
            index = 0;
            answer = 1;
            questionScore = 0;
        } else {
            index = e.currentTarget.dataset.index;
            answer = e.currentTarget.dataset.answer;
            questionScore = e.currentTarget.dataset.score;
        }
        let { score, curqIndex } = this.data;
        if (index == answer) {
            score += questionScore;
        }
        if (curqIndex < 9) {
            curqIndex += 1;
            this.setData({ score, curqIndex }, () => {
                this.startCountDown();
            });
        } else {
            qq.redirectTo({ url: `/pages/result/index?score=${score}` });
        }
    },
    onShareAppMessage () {
        return {
          title: '快来测试你的追星等级吧~',
          path: '/pages/index/index'
        }
    }
})