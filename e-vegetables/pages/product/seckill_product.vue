<template>
	<view class="container">
		
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper">
						<image
							:src="item" 
							class="loaded" 
							mode="aspectFill"
						></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		
		
		<!-- 秒杀倒计时 -->
		<countdown :goodprice="good.price" :goodcount="good.count"></countdown>
		<view class="introduce-section">
			<text class="title">{{good.title}}</text>
		
		</view>
		<!-- 数量选择 -->
		<choosenum :specifications="specifications" @choosenumvalue="choosenumvalue"></choosenum>
		<!-- 等级分类 -->
		<grade></grade>
		<!-- 服务列表 -->
		<view class="c-list">
			
			<view class="c-row b-b">
				<text class="tit">配送</text>
				<view class="bz-list con">
					<text>由E蔬配送，23:00前下单，预计明天（07:00-11:00送达） </text>
				</view>
			</view>
			<view class="c-row b-b">
				<text class="tit">服务</text>
				<view class="bz-list con">
					<text>18小时可退 </text>
				</view>
			</view>
		</view>
		
		<view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<rich-text :nodes="desc"></rich-text>
		</view>
		
		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="buy">立即秒杀</button>
			</view>
		</view>
		
		
		
		
	</view>
</template>

<script>
	import grade from "./product/grade.vue"
	import choosenum from './product/choosenum.vue'
	import countdown from './seckill_product/countdown.vue'
	import sloading from "../../components/sloading.vue"
	export default{
		components: {
			grade,choosenum,countdown,sloading
		},
		data() {
			return {
				specClass: 'none',
				specSelected:[],
				
				favorite: true,
				//选择的规格
				shareList: {
					num:1,
					price:0,
				},
				//规格选项
				specifications:[],
				//商品信息
				good:{},
			
				imgList: [
					
				],
				desc: ``,
				loadingshow:true
				
		};
		},
		async onLoad(options){
			 
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			let id = options.id;
			let that =this
			if(id){
				await this.$myRequest({
						url:"/findGoods?goodsId="+id,
						method:"GET"
				}).then((res)=>{
					
					that.good=res.data.data
					console.log(that.good)
					that.imgList.push(res.data.data.image1)
					that.imgList.push(res.data.data.image2)
					that.desc=`<div style="width:100%">
						<img style="width:100%;display:block;" src="`+res.data.data.imageDetail1+`" />
						<img style="width:100%;display:block;" src="`+res.data.data.imageDetail1+`" />

					</div>`
					that.specifications=[{
					num: 1,
					pricesum: res.data.data.price * 1,
					show:true
				}, {
					num: 5,
					pricesum: parseFloat(res.data.data.price * 0.85).toFixed(2),
					show:false
				}, {
					num: 10,
					pricesum: parseFloat(res.data.data.price * 0.8).toFixed(2),
						show:false
				}]
				})
			}
			
			
			
			
		},
		methods:{
			//接收选择的规格
			choosenumvalue(value){
				this.shareList.num=value.num
				this.shareList.price=value.price
			},
			//收藏
			toFavorite(){
				this.favorite = !this.favorite;
			},
			//立即秒杀
			buy(){
				uni.showLoading({
					title:"正在秒杀中..."
				})
				setTimeout(()=>{
					uni.hideLoading();
					uni.showToast({
						title:"秒杀成功！"
					})
					setTimeout(()=>{
						uni.hideToast()
						uni.navigateTo({
							url: `/pages/order/seckillOrder?data=${JSON.stringify({
								goodsData: this.good
							})}`
						})
					},1000)
				},2000)
				
			},
		
		},

	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
		padding-bottom: 160upx;
	}
	.icon-you{
		font-size: $font-base + 2upx;
		color: #888;
	}
	.loading{
		position: fixed !important;
		top: 0;
		left: 0;
		height: 100% !important;
		overflow: hidden;
		width: 100%;
		background-color: #fff;
		
	}
	.carousel {
		height: 722upx;
		position:relative;
		swiper{
			height: 100%;
		}
		.image-wrapper{
			width: 100%;
			height: 100%;
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		
	}
	
	/* 标题简介 */
	.introduce-section{
		background: #fff;
		padding: 20upx 30upx;
		
		.title{
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:$uni-color-primary;
		}
		.price{
			font-size: $font-lg + 15upx;
		}
		.m-price{
			margin:0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}
		.coupon-tip{
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx); 
		}
		.bot-row{
			display:flex;
			align-items:center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;
			text{
				flex: 1;
			}
		}
	}
	/* 分享 */
	
	.c-list{
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;
		.c-row{
			display:flex;
			align-items:center;
			padding: 33upx 10upx;
			position:relative;
		}
		.tit{
			width: 140upx;
			font-weight: 700;
			text-align: center;
		}
		.con{
			flex: 1;
			color: $font-color-dark;
			.selected-text{
				margin-right: 10upx;
			}
		}
		.bz-list{
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			text{
				display: inline-block;
				margin-right: 30upx;
			}
		}
		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}
		.red{
			color: $uni-color-primary;
		}
	}
	
/*  详情 */
	.detail-desc{
		background: #fff;
		margin-top: 16upx;
		.d-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;
				
			text{
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}
			&:after{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc; 
			}
		}
	}
	
	/* 规格选择弹窗 */
	.attr-content{
		padding: 10upx 30upx;
		.a-t{
			display: flex;
			image{
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;;
			}
			.right{
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;
				.price{
					font-size: $font-lg;
					color: $uni-color-primary;
					margin-bottom: 10upx;
				}
				.selected-text{
					margin-right: 10upx;
				}
			}
		}
		.attr-list{
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}
		.item-list{
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;
			text{
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: $font-base;
				color: $font-color-dark;
			}
			.selected{
				background: #fbebee;
				color: $uni-color-primary;
			}
		}
	}
	
	
	/* 底部操作菜单 */
	.page-bottom{
		position:fixed;
		left: 30upx;
		bottom:30upx;
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
		height: 100upx;
		/* background: rgba(255,255,255,.9); */
		
		/* border-radius: 16upx; */
		
		.p-b-btn{
			display:flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;
			.yticon{
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}
			&.active, &.active .yticon{
				color: $uni-color-primary;
			}
			.icon-fenxiang2{
				font-size: 42upx;
				transform: translateY(-2upx);
			}
			.icon-shoucang{
				font-size: 46upx;
			}
		}
		.action-btn-group{
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			width: 100%;
			box-shadow: 0 20upx 40upx -16upx #0093E9;
			
			box-shadow: 1px 2px 5px rgba(23,158,227, 0.5);
			background-color: #0093E9;
			background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
;				
			margin-left: 20upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255,255,255,.5);
			}
			.action-btn{
				display:flex;
				align-items: center;
				justify-content: center;
				width: 200upx;
				height: 100%;
				font-size: $font-base ;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}
	
</style>
