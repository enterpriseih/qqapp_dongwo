<view class="list-page">
	<view qq:for="{{starList}}" qq:key="*this" class="list-item">
		<view class="list-item-avatar">
			<image src="{{item.img}}"/>
		</view>
		<view class="list-item-starinfo">
			<view class="list-item-starinfo_name">{{item.title}}</view>
			<view class="list-item-starinfo_hot">有{{item.pNum}}个人在玩</view>
		</view>
		<view class="list-item-button" data-id="{{item.kcId}}" bind:tap="gotoExam">选Ta</view>
	</view>
</view>