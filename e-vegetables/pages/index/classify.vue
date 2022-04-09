<template>
	<view class="">
		<view class="cate-section">
			<view class="cate-item" @click="tabclick(1)">
				<view class="image" style="background-color: #18BC37;">
						<i class="iconfont icon-shucai"></i>
				</view>
				<text>蔬菜豆制品</text>
			</view>
			<view class="cate-item" @click="tabclick(2)">
				<view class="image" style="background-color: #aaaaff;">
						<i class="iconfont icon-shuiguo"></i>
				</view>
				<text>时令水果</text>
			</view>
			<view class="cate-item" @click="tabclick(3)">
				<view class="image" style="background-color: #ff557f;">
						<i class="iconfont icon-jianshen-niurou-roulei-zengji"></i>
				</view>
				<text>鲜肉禽类</text>
			</view>
			<view class="cate-item" @click="tabclick(4)">
				<view class="image" style="background-color: #00aaff;">
						<i class="iconfont icon-xuehua1"></i>
				</view>
			
				<text>冻肉禽类</text>
			</view>
			<view class="cate-item" @click="tabclick(5)">
			<view class="image" style="background-color: #fea74f;">
					<i class="iconfont icon-fangbianmian"></i>
			</view>
				<text>方便速食</text>
			</view>
		</view>
		<view class="cate-section">
			<view class="cate-item" @click="tabclick(6)">
				<view class="image" style="background-color: #18BC37;">
						<i class="iconfont icon-yuancailiaojiagong"></i>
				</view>
				<text>加工调理</text>
			</view>
			<view class="cate-item" @click="tabclick(7)">
				<view class="image" style="background-color: #aaaaff;">
						<i class="iconfont icon-haixian"></i>
				</view>
				<text>海鲜水产</text>
			</view>
			<view class="cate-item" @click="tabclick(8)">
				<view class="image" style="background-color: #ff557f;">
						<i class="iconfont icon-jidan"></i>
				</view>
				<text>蛋类</text>
			</view>
			<view class="cate-item" @click="tabclick(9)">
				<view class="image" style="background-color: #00aaff;">
						<i class="iconfont icon-mimian"></i>
				</view>
				<text>米面粮油</text>
			</view>
			<view class="cate-item" >
			<view class="image" style="background-color: #fea74f;" @click="tabclick(10)">
					<i class="iconfont icon-jiu"></i>
			</view>
				<text>休闲酒饮</text>
			</view>
		</view>
		<view class="ad-1">
			<image src="/static/temp/ad1.jpg" mode="scaleToFill"></image>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			tabclick(value){
			
				let id=value
					// console.log(id)
				uni.reLaunch({
					url: `/pages/category/category?id=${id}`
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifdef MP */

	page{
		.cate-section{
			position:relative;
			z-index:5;
			border-radius:16upx 16upx 0 0;
			margin-top:-20upx;
		}
		.carousel-section{
			padding: 0;
			.titleNview-placing {
				padding-top: 0;
				height: 0;
			}
			.carousel{
				.carousel-item{
					padding: 0;
				}
			}
			.swiper-dots{
				left:45upx;
				bottom:40upx;
			}
		}
	}
	/* #endif */
	/* 分类 */
	.cate-section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap:wrap;
		padding: 30upx 22upx; 
		background: #fff;
		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
		}
		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		.image {
			width: 88upx;
			height: 88upx;
			margin-bottom: 14upx;
			border-radius: 50%;
			opacity: .7;
			box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
			display: flex;
			justify-content: center;
			align-items: center;
			i{
				font-size: 48upx;
				color: #FFFFFF;
			}
		}
	}
	.ad-1{
		width: 100%;
		height: 210upx;
		padding: 10upx 0;
		background: #fff;
		image{
			width:100%;
			height: 100%; 
		}
	}
</style>
