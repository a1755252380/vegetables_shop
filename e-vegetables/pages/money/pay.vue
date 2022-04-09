<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{total}}</text>
		</view>

		<view class="pay-type-list">

			<view class="type-item b-b" @click="changePayType(1)">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 1' />
					</radio>
				</label>
			</view>
			<view class="type-item b-b" @click="changePayType(2)">
				<text class="icon yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 2' />
					</radio>
				</label>
			</view>
			
		</view>
		
		<text class="mix-btn" @click="confirm">确认支付</text>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				payType: 1,
				orderInfo: {},
				total:0,
				goodid:""
			};
		},
		computed: {
		
		},
		onLoad(option) {
		let data = JSON.parse(option.goods).goods;
		for (let i=0;i<data.length;i++) {
				// console.log(data[i])
			this.goodid+=data[i].goodsId
			if(i!=data.length-1){
				this.goodid+=" "
			}
			this.sumprice(data[i])
		}
		console.log(this.goodid)
		},

		methods: {
			//计算金额总和
			sumprice(list){
				let total = Number(list.cartPrice.toFixed(2)) * list.cartNumber;
				
				
				this.total += Number(total.toFixed(2));
			},
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			//确认支付
			confirm: async function() {
				let that=this
				await this.$myRequest({
					url:"/createOrder?goodsIdList="+this.goodid+"&userId="+this.$store.state.userInfo.id,
					method:"GET"
				}).then((res)=>{
					console.log(res.data.data)
					
					//重新获取购物车数据
					this.$myRequest({
						url:"/getShopCartList?userId="+that.$store.state.userInfo.id,
						method:"GET"
					}).then((res)=>{
						console.log(res.data.data)
						if(res.data.data==0){
							that.$store.state.cartList=[]
							
						}else{
							that.$store.state.cartList = res.data.data
							for (let i=0;i<res.data.data.length;i++) {
								that.$store.state.cartList[i]['checked']=false
							}
							that.$forceUpdate()
						}
						
					})
					
					//跳转首页
					uni.redirectTo({
						url: '/pages/money/paySuccess'
					})
				})
				
			},
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price{
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;
			&:before{
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;
		
		.type-item{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position:relative;
		}
		
		.icon{
			width: 100upx;
			font-size: 52upx;
		}
		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}
		.icon-weixinzhifu {
			color: #36cb59;
		}
		.icon-alipay {
			color: #01aaef;
		}
		.tit{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

</style>
