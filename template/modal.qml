<template name="modal">
	<view class="modal">
		<view class="modal-container">
			<view class="modal-container-header">
				<slot name="header"></slot>
			</view>
			<view class="modal-container-content">
				<slot name="content"></slot>
			</view>
			<view class="modal-container-footer">
				<slot name="footer"></slot>
			</view>
		</view>
	</view>
</template>