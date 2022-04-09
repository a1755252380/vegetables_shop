<template>
	<view class="countdown">
		<view class="timer" v-if="seckilltime!=0">
			<uni-row >
				<uni-col :span="16" >
					<view class="timer_text">
						<view class="seckill">
								秒杀价：<text class="price">￥{{price}}</text>
						</view>
					
						<view class="oldprice">
							即将恢复￥{{oldprice}}
						</view>
						<view class="num">
							仅剩{{count}}件
						</view>
					</view>
				</uni-col>
				<uni-col :span="8" style="height: 100%;">
					
					<view class="timer_time">
						<view class="timer_time_text">
							<i class="yticon icon-naozhong " style="display: inline-block;	font-size: 25upx;"></i>限时秒杀
						</view>
						<view class="">
							<uni-dateformat class="timer_time_time" :date="seckilltime" format="hh:mm:ss"></uni-dateformat>
									
						</view>
					</view>
				</uni-col>
			</uni-row>
		
		
		</view>
		<view class="" v-else>
			
			<text class="tip">今日秒杀活动已经结束</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:['goodprice','goodcount'],
		filters:{
			
		},
		data() {
			return {
				seckilltime:1,
					seckillnum:"20点场",
					timer:null,
					oldprice:0
			}
		},
		computed:{
			price(){
				return this.goodprice
			},
			count(){
				return this.goodcount
			}
		},
		mounted() {
			this.oldprice=this.goodprice+parseInt(Math.random()*500)
			let now=new Date().toLocaleDateString()
			let that=this
		this.timer=setInterval(()=>{
			that.seckillnum="14点场"
			let time=new Date(now+" 14:00:00").getTime()-new Date().getTime()-28800000
			if(time+28800000<=0){
				time=new Date(now+" 20:00:00").getTime()-new Date().getTime()-28800000
					that.seckillnum="20点场"
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
	.countdown{
		width: 750upx;
		background-color: #FBAB7E;
		background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);

	}
	.timer {
		width: 100%;
		text-align: center;
		.timer_text{
			display: inline-block;
			background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
			border-right: 6upx dashed #FFFFFF;
			color: #FFFFFF;
			width: 100%;
			padding: 20upx 0;
			.seckill{
				font-size: 25upx;
				font-weight: 600;
				
			}
			.price{
				font-size: 50upx;
			}
			.oldprice{
				display: inline-block;
				font-size: 20upx;
				color: #e9effc;
				padding-right: 15upx;
				border-right: 1px solid #e9effc;
			}
			.num{
				display: inline-block;
					color: #e9effc;
				font-size: 20upx;
				padding-left: 15upx;
			}
		}
		.timer_time{
			height: 100%;
			// display: inline-block;
			
			color: #fff;
			font-size: 50upx;
				
				.timer_time_text{
				
					color: #c83f00;
				font-size: 25upx;
				margin: 15upx 0 10upx 0;
				}
				.timer_time_time{
					font-size: 35upx;
					background-color: #FEE140;
					background-image: linear-gradient(90deg, #FEE140 0%, #FA709A 100%);


					padding: 10upx 20upx;
					border-radius: 30upx;
				}
		}
	}
</style>
