<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item"
				:class="{current: tabCurrentIndex === index}" @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>

<view class="" v-if="!loadingshow">
	<!-- 空白页 -->
	<empty v-if=" tabdata.length === 0"></empty>
	
	<!-- 订单列表 -->
	<view v-for="(item,index) in tabdata" :key="index" class="order-item">
		<view class="i-top b-b">
			<text class="time">{{item.createDate}}</text>
			<text class="state" :style="{color: orderStateExp(item.flag).stateTipColor}">{{orderStateExp(item.flag).stateTip}}</text>
			<text v-if="item.flag==2||item.flag==3" class="del-btn yticon icon-iconfontshanchu1"
				@click="deleteOrder(index)"></text>
		</view>
	
		<view class="goods-box-single" 
			:key="goodsIndex">
			<image class="goods-img" :src="item.imageUrl" mode="aspectFill"></image>
			<view class="right">
				<text class="title clamp">{{item.goodsName}}</text>
				<text class="attr-box">
				<!-- {{goodsItem.attr}} -->
				 x 1</text>
				<text class="price">{{item.money}}</text>
			</view>
		</view>
	
		<view class="price-box">
			共
			<text class="num">1</text>
			件商品 <text v-if="item.flag==1">待付款</text>
			<text v-else>实付款</text>
			<text class="price">{{item.money}}</text>
		</view>
		<view class="action-box b-t" v-if="item.flag == 0">
			<button class="action-btn" @click="cancelOrder(item)">取消订单</button>
			<button class="action-btn recom" @click="payOrder(item)">立即支付</button>
		</view>
	</view>
	
</view>
		
			<sloading v-else></sloading>
		
	</view>
</template>

<script>
	import empty from "@/components/empty";
	import sloading from "../../components/sloading.vue"
	export default {
		components: {
			empty,sloading
		},
		filters: {
			dateformat(value) {
				return new Date(value)
			}
		},
		data() {
			return {
				tabCurrentIndex: 0,
				navdata:[],
				loadingshow:false,
				navList: [{
						state: 0,
						text: '全部',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '待付款',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						text: '待收货',
						loadingType: 'more',
						orderList: []
					},

					{
						state: 4,
						text: '已完成',
						loadingType: 'more',
						orderList: []
					}
				],
			};
		},
		computed:{
			tabdata:{
				get(){
					return this.navdata
				},
				set(value){
					this.navdata=value
				}
			}
		},
		onLoad(options) {
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			this.tabCurrentIndex = +options.state;
			// #ifndef MP
			this.loadData()
			// #endif
			// #ifdef MP
			if (options.state == 0) {
				this.loadData()
			}
			// #endif

		},

		methods: {
			//获取订单列表
			loadData(source) {
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.state;
				let that = this
				this.navList=[{
						state: 0,
						text: '全部',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '待付款',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						text: '待收货',
						loadingType: 'more',
						orderList: []
					},

					{
						state: 4,
						text: '已完成',
						loadingType: 'more',
						orderList: []
					}
				]
				// #flag   0-》待付款   1-》待收货   2-》已完成   3-》已取消
				this.$myRequest({
					url: "/getAllshopOrder?userId=" + this.$store.state.userInfo.id,
					method: "GET"
				}).then((res) => {
					console.log(res.data.data)
					let a = res.data.data
					for (let i = 0; i < res.data.data.length; i++) {
						if (a[i].flag == 0) {
							that.navList[1].orderList.push(a[i])
						}
						if (a[i].flag == 1) {
							that.navList[2].orderList.push(a[i])
						}
						if (a[i].flag == 2||a[i].flag == 3) {
							that.navList[3].orderList.push(a[i])
						}
						that.navList[0].orderList.push(a[i])
					}
					console.log(that.navList[0].orderList)
					that.tabdata=that.navList[0].orderList
				})


			},

		
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
				this.navdata=this.navList[index].orderList
				this.$forceUpdate()
			},
			//删除订单
			deleteOrder(index) {
				uni.showLoading({
					title: '请稍后'
				})
				setTimeout(() => {
					this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
					uni.hideLoading();
				}, 600)
			},
			//取消订单
			cancelOrder(item) {
				this.loadingshow=true
				// console.log(item)
				this.changorder(3,item.id)
				setTimeout(() => {
					
					this.loadingshow=false
					this.$forceUpdate()
					
				}, 600)
				
			},
			//订单付款
			payOrder(item) {
				let goods={
					goodid:item.id,
					price:item.money
				}
				uni.redirectTo({
					url:`/pages/money/payorder?goods=${JSON.stringify({
						goods:goods
					})}`
				})
				
			},
			//改变订单状态
			changorder(value,id){
				let that=this
				this.$myRequest({
					url:"/updateShopOrder?flag="+value+"&orderId="+id,
					method:"GET",
				}).then((res)=>{
					console.log(res.data.data)
					that.loadData()
				})
			},
			
			
			//订单状态文字和颜色
			orderStateExp(state) {
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch (state) {
					case 0:
						stateTip = '待付款';
						break;
					case 1:
						stateTip = '待收货';
						break;
					case 3:
						stateTip = '订单已关闭';
						stateTipColor = '#909399';
						break;
					case 2:
						stateTip = '已完成';
						stateTipColor = '#909399';
						break;	
						//更多自定义
				}
				return {
					stateTip,
					stateTipColor
				};
			}
		},
	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
		height: 100%;
	}

	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item {
		height: auto;
	}

	.order-item {
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;

		.i-top {
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right: 30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;

			.time {
				flex: 1;
			}

			.state {
				color: $base-color;
			}

			.del-btn {
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;

				&:after {
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		/* 多条商品 */
		.goods-box {
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;

			.goods-item {
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}

			.goods-img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}

		/* 单条商品 */
		.goods-box-single {
			display: flex;
			padding: 20upx 0;

			.goods-img {
				display: block;
				width: 120upx;
				height: 120upx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;

				.title {
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}

				.attr-box {
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}

				.price {
					font-size: $font-base + 2upx;
					color: $font-color-dark;

					&:before {
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}

		.price-box {
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.num {
				margin: 0 8upx;
				color: $font-color-dark;
			}

			.price {
				font-size: $font-lg;
				color: $font-color-dark;

				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}

		.action-box {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}

		.action-btn {
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;

			&:after {
				border-radius: 100px;
			}

			&.recom {
				background: #fff9f9;
				color: $base-color;

				&:after {
					border-color: #f7bcc8;
				}
			}
		}
	}


	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}

	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}

	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}

	.uni-load-more__img>view {
		position: absolute
	}

	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}

	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}

	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}

	.load2 {
		transform: rotate(30deg)
	}

	.load3 {
		transform: rotate(60deg)
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s
	}

	.load2 view:nth-child(1) {
		animation-delay: .13s
	}

	.load3 view:nth-child(1) {
		animation-delay: .26s
	}

	.load1 view:nth-child(2) {
		animation-delay: .39s
	}

	.load2 view:nth-child(2) {
		animation-delay: .52s
	}

	.load3 view:nth-child(2) {
		animation-delay: .65s
	}

	.load1 view:nth-child(3) {
		animation-delay: .78s
	}

	.load2 view:nth-child(3) {
		animation-delay: .91s
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1
		}

		100% {
			opacity: .2
		}
	}
</style>
