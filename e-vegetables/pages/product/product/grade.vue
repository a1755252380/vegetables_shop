<template>
	<view class="grade">
		
		<!-- 等级分类 -->
		<uni-row class="">
			<uni-col :span="8">
				<view class="title">
					等级
				</view>
				<view class="detail">
					良品
				</view>
			</uni-col>
				<uni-col :span="8">
					<view class="title">
						包装
					</view>
					<view class="detail">
						普通
					</view>
				</uni-col>
					<uni-col :span="8">
						<view class="title">
							品种
						</view>
						<view class="detail">
							无
						</view>
					</uni-col>
		</uni-row>
		
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.grade{
		width: 750upx;
		view{
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.title{
			font-size: 28upx;
			
			padding: 10upx;
		}
		.detail{
			font-size: 33upx;
			font-weight: 700;
			padding: 10upx;
		}
	}
</style>
