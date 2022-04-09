<template>
	<view class="">
		
		<view class="goods-section">
			<!-- <view class="g-header b-b">
				<image class="logo" src="http://duoduo.qibukj.cn/./Upload/Images/20190321/201903211727515.png"></image>
				<text class="name">E蔬</text>
			</view> -->
			<!-- 商品列表 -->
			<view class="g-item" v-for="(item,index) in gooddata" :key="index">
				<image :src="item.cartImageUrl"></image>
				<view class="right">
					<text class="title clamp">{{item.cartTitle}}</text>
					<!-- <text class="spec">春装款 L</text> -->
					<view class="price-box">
						<text class="price">￥{{item.cartPrice}}</text>
						<text class="number">{{item.cartNumber}}份</text>
					</view>
				</view>
			</view>
		<!-- 	<view class="g-item">
				<image src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg"></image>
				<view class="right">
					<text class="title clamp">韩版于是洞洞拖鞋 夏季浴室防滑简约居家【新人专享，限选意见】</text>
					<text class="spec">春装款 L</text>
					<view class="price-box">
						<text class="price">￥17.8</text>
						<text class="number">x 1</text>
					</view>
				</view>
			</view> -->
		</view>
		
	</view>
</template>

<script>
	export default{
		props:['good'],
		computed:{
			gooddata(){
				return this.good
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;
	
		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}
	
		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}
	
		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}
	
		.g-item {
			display: flex;
			margin: 20upx 30upx;
	
			image {
				flex-shrink: 0;
				display: block;
				width: 140upx;
				height: 140upx;
				border-radius: 4upx;
			}
	
			.right {
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
			}
	
			.title {
				font-size: 30upx;
				color: $font-color-dark;
			}
	
			.spec {
				font-size: 26upx;
				color: $font-color-light;
			}
	
			.price-box {
				display: flex;
				align-items: center;
				font-size: 32upx;
				color: $font-color-dark;
				padding-top: 10upx;
	
				.price {
					margin-bottom: 4upx;
				}
				.number{
					font-size: 26upx;
					color: $font-color-base;
					margin-left: 20upx;
				}
			}
	
			.step-box {
				position: relative;
			}
		}
	}
	
</style>
