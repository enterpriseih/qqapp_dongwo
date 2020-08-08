<view class="list-page">
	<view qq:for="{{starList}}" qq:key="*this" class="list-item">
		<view class="list-item-avatar">
			<image src="{{item.img}}"/>
		</view>
		<view class="list-item-starinfo">
			<view class="list-item-starinfo_name">{{item.name}}</view>
			<view class="list-item-starinfo_hot">有{{item.pickNum}}个人在玩</view>
		</view>
		<view class="list-item-button" data-id="{{item.id}}" bind:tap="gotoExam">选Ta</view>
	</view>
</view>