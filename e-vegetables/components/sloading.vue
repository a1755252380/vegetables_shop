<template>
	<view class="loadingmodel" >
		<i class="iconfont icon-jiazaizhong"></i>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.loadingmodel{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 750upx;
		font-size: 50upx;
		color: $base-color;
		.iconfont{
			font-size: 70upx;
			animation: myfirst2 1s infinite linear;
		}
	}
	@keyframes myfirst2
	{
	from {transform: rotate(0deg);}
	to {transform: rotate(359deg);}
	}
</style>
