<view class="page-index">
	<view class="start-btn" bind:tap="startChallenge">开始挑战</view>
</view>
<view class="modal">
	<view class="modal-container">
		<view class="modal-container-header">
			选择题型
		</view>
		<view class="modal-container-content">
			<view class="modal-container-content__btn" data-type="1" bind:tap="chooseQuestionType">答明星题</view>
			<view class="modal-container-content__btn" data-type="2" bind:tap="chooseQuestionType">定义专属题</view>
		</view>
		<view class="modal-container-foot">
		</view>
	</view>
</view>
