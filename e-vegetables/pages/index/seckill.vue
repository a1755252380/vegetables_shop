<template>
	<view class="">
		<view class="seckill-section m-t">
			<view class="s-header" v-if="seckilltime!=0">
				<image class="s-img" src="/static/temp/secskill-img.jpg" mode="widthFix"></image>
				<text class="tip">{{seckillnum}}</text>
			<view class="timer">
			<uni-dateformat :date="seckilltime" format="hh:mm:ss"></uni-dateformat>

			</view>
			</view>
			<view  class="s-header" v-else>
				<image class="s-img" src="/static/temp/secskill-img.jpg" mode="widthFix"></image>
				
				<text class="tip">今日秒杀活动已经结束</text>
			</view>
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view 
						v-for="(item, index) in goods" :key="index"
						class="floor-item"
						@click="navToDetailPage(item)"
					>
						<image :src="item.image1" mode="aspectFill"></image>
						<text class="title clamp">{{item.title}}</text>
						<text class="price">￥{{item.price}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		
			
	</view>
</template>

<script>
	export default{
		props:['goodsList'],
		data() {
			return {
				seckilltime:0,
				seckillnum:"20点场",
				timer:null,
				
			}
		},
		computed:{
			goods(){
				return this.goodsList
			}
		},
		methods: {
			//详情页
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/seckill_product?id=${id}`
				})
			},
		},
		mounted() {
			let now=new Date().toLocaleDateString()
			let that=this
		this.timer=setInterval(()=>{
			that.seckillnum="14点场"
			let time=new Date(now+" 14:00:00").getTime()-new Date().getTime()-28800000
			if(time+28800000<=0){
				time=new Date(now+" 22:00:00").getTime()-new Date().getTime()-28800000
					that.seckillnum="22点场"
				if(time+28800000<=0){
					time=0
				}
			}
			
				that.seckilltime=time
			// console.log(time)
		},1000)
		},
		beforeDestroy() {
			clearInterval(this.timer)
		}
	}
</script>

<style lang="scss" scoped>
	/* 秒杀专区 */
	.seckill-section{
		padding: 4upx 30upx 24upx;
		background: #fff;
		
		.s-header{
			display:flex;
			align-items:center;
			height: 92upx;
			line-height: 1;
			.s-img{
				width: 140upx;
				height: 30upx;
			}
			.tip{
				font-size: $font-base;
				color: $font-color-light;
				margin: 0 20upx 0 40upx;
			}
			
			.icon-you{
				font-size: $font-lg;
				color: $font-color-light;
				flex: 1;
				text-align: right;
			}
		}
		.timer{
			background: #ffaa00;
			padding: 10upx;
			border-radius: 20upx;
			font-size: 30upx;
			color: #f4f4f4;
		}
		.floor-list{
			white-space: nowrap;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 150upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;
			image{
				width: 150upx;
				height: 150upx;
				border-radius: 6upx;
			}
			.price{
				color: $uni-color-primary;
			}
		}
	}
	
	
	
</style>
