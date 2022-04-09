<template>
	<view class="guess-section">
		<view 
			v-for="(item, index) in goods" :key="index"
			class="guess-item"
			@click="navToDetailPage(item,index)"
		>
			<view class="image-wrapper">
				<image :src="item.image1" ></image>
			</view>
			<text class="title clamp">{{item.title}}</text>
			<text class="price">￥{{item.price}}</text>
		</view>
	</view>
</template>

<script>
	
	export default {
		props:['goodsList'],
		data() {
			return {
				
			}
		},
		mounted() {
			
		},
		computed:{
			goods(){
				return this.goodsList
			}
		},
		methods: {
		
		//详情页
		navToDetailPage(item,index) {
			//测试数据没有写id，用title代替
			let id = item.id;
			uni.navigateTo({
				url: `/pages/product/product?id=${id}`
			})
		},
		},
	}
</script>

<style lang="scss" scoped>
	/* 猜你喜欢 */
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 30upx ;
		background: #fff;
		.guess-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}
	
</style>
