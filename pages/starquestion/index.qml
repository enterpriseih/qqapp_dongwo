<wxs module="m1">
    function getRemainTime (number) {
        return Math.round(number / 1000);
    }
    function getBackgroundColor(deg) {
        return deg == 0 ? '#fff' : 'orange';
    }
    module.exports.getBackgroundColor = getBackgroundColor;
    module.exports.getRemainTime = getRemainTime;
</wxs>
<view class="question-container">
    <view class="question-countdown" qq:if="{{ scene == 'countdown' }}">{{ count }}</view>
    <view class="question-exam" qq:if="{{ scene == 'question'}}">
         <view class="question-exam_header">
            <view class="question-exam_header_staravatar">
                <image src="{{ avatar }}"/>
            </view>
            <view class="question-exam_header_countdown">
                <view class="question-exam_header_countdown_process_yellow_left" style="transform: translate(-50%, -50%) rotate({{deg1}}deg);"></view>
                <view class="question-exam_header_countdown_process_yellow_right" style="transform: translate(-50%, -50%) rotate({{deg2}}deg);background-color:{{m1.getBackgroundColor(deg2)}}"></view>
                <view class="question-exam_header_countdown_number">{{m1.getRemainTime(remainTime)}}</view>
            </view>
        </view>
        <view class="question-exam_content">
            <view 
                qq:for="{{ questions }}"
                qq:key="qIndex"
                qq:for-item="item"
                qq:for-index="qIndex"
                class="question-exam_content_item"
                qq:if="{{ qIndex == curqIndex }}"
            >
                <view class="question-exam_content_item_title">{{item.title}}</view>
                <view class="question-exam_content_item_options">
                    <view 
                        qq:for="{{item.options}}"
                        qq:for-item="option"
                        qq:key="index"
                        qq:if="{{option}}"
                        class="question-exam_content_item_options_item"
                        bind:tap="selectAnswer"
                        data-index="{{index}}"
                        data-score="{{item.score}}"
                        data-answer="{{item.answer}}"
                    >{{option}}</view>
                </view>
            </view>
        </view>
    </view>
</view>