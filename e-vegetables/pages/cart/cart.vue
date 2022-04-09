<template>
	<view class="container">
		<view class="top" v-if="hasLogin && empty===false" >
			<view class="checkbox">
				<image :src="allChecked?'/static/selected.png':'/static/select.png'" mode="aspectFit"
					@click="check('all')">
					
					</image>
				<text style="position: absolute;top:2upx;">全选</text>

				<view class="clear">
					<view class="" v-if="btnshow">

						<view class="cancel_btn" @click="clearCart">
							清空
						</view>
						<view class="clear-btn" @click="this.btnshow=!this.btnshow">
							取消
						</view>
					</view>

					<view class="clear-btn" v-else @click="this.btnshow=!this.btnshow">
						编辑
					</view>

				</view>
			</view>
		</view>
		<!-- 空白页 -->
		<view v-if="!hasLogin || empty===true" class="empty">
			<image src="/static/img/emptyCart.png" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="hasLogin" url="../index/index" open-type="switchTab">随便逛逛>
				</navigator>
			</view>
			<view v-else class="empty-tips">
				
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view>
		<view v-else>
			<!-- 列表 -->
			<view class="cart-list">
				<sloading v-if="loadingshow" :key="goodloading"></sloading>
				<view class="" v-else :key="goodlist">
					<uni-row  class="demo-uni-row" v-for="(item, index) in cartList" :key="item.id" >
						<view class="cart-item" style="margin: 20upx 0;padding: 10upx 20upx;">
							<uni-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" class="cart-item-btn">
								<view class="yticon icon-xuanzhong2 checkbox" :class="{checked: item.checked}"
									@click="check('item', index)"></view>
							</uni-col>
							<uni-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
								<view class="image-wrapper">
									<image :src="item.cartImageUrl" :class="[item.loaded]" mode="aspectFill" lazy-load
										@load="onImageLoad('cartList', index)" @error="onImageError('cartList', index)">
									</image>
					
								</view>
							</uni-col>
							<uni-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
								<view class="item-right">
									<text class="clamp title">{{item.cartTitle}}</text>
									<!-- <text class="attr">{{item.cartNumber}}份</text> -->
									<text class="price">¥{{item.cartPrice}}</text>
									<uni-number-box class="step" :min="1"
									 :max="stock"
										:value="item.cartNumber>stock?stock:item.cartNumber"
										:isMax="item.cartNumber>=stock?true:false"
										 :isMin="item.cartNumber===1" :index="index"
										@change="numberChange($event,index)"></uni-number-box>
								</view>
					
							</uni-col>
							<uni-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
								<view :class="btnshow?'delshow':'delhide'">
									<text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text>
								</view>
							</uni-col>
					
						</view>
					</uni-row>
					
				</view>

			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">

				<view class="total-box">
					<text class="price">¥{{total}}</text>
					<text class="coupon">
						已优惠
						<text>74.35</text>
						元
					</text>
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	import sloading from "../../components/sloading.vue"
	import {
		mapState
	} from 'vuex';
	export default {
		components: {sloading},
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: this.$store.state.cartList,
				stock:99,
				btnshow: false,
				//缓存页面
				loadingshow:false
			};
		},
		onLoad() {
			
			this.loadData();
		},
		watch: {
			//显示空白页
			cartList(e) {
				let empty = e.length === 0 ? true : false;
				if (this.empty !== empty) {
					this.empty = empty;
				}
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		methods: {
			//请求数据
			 loadData() {
				let userid=this.$store.state.userInfo.id
				let that=this
				that.$forceUpdate()//强制刷新页面
		
					 this.$myRequest({
						url:"/getShopCartList?userId="+userid,
						method:"GET"
					}).then((res)=>{
						console.log(res.data.data)
						if(res.data.data==0){
							that.$store.state.cartList=[]
							that.cartList=[]
							return
						}
						else{
							that.$store.state.cartList = res.data.data
							for (let i=0;i<res.data.data.length;i++) {
								that.$store.state.cartList[i]['checked']=false
							}
							that.cartList=that.$store.state.cartList
							that.calcTotal(); //计算总价
						}
						
					})
				
				
				
			},
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].image = '/static/errorImage.jpg';
			},
			navToLogin() {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			//选中状态处理
			check(type, index) {
				if (type === 'item') {
					this.cartList[index].checked = !this.cartList[index].checked;
				} else {
					const checked = !this.allChecked
					const list = this.cartList;
					
					if(list.length!=0){
						list.forEach(item => {
							item.checked = checked;
						})
					}else{
						this.empty=true
					}
					this.allChecked = checked;
				}
				this.calcTotal(type);
			},
			//数量
			numberChange(data,index) {
				// console.log(data)
				// console.log(index)
				this.cartList[index].cartNumber=data;
				this.calcTotal();
			},
			//删除
			deleteCartItem(index) {
				let list = this.cartList;
				let row = list[index];
				let id = row.id;
				console.log(id)
				this.delete(id)
				
			},
			delete(id){
				let that =this
				this.loadingshow=true
				let userid=this.$store.state.userInfo.id
				 this.$myRequest({
				 	url:"/deleteGoodsToCart?cartId="+id,
				 	method:"GET"
				 }).then((res)=>{
					this.$myRequest({
						url:"/getShopCartList?userId="+userid,
						method:"GET"
					}).then((res)=>{
						console.log(res.data.data)
						if(res.data.data==0){
							that.$store.state.cartList=[]
							setTimeout(()=>{
								that.loadingshow=false
							
							},500)
						}else{
							that.$store.state.cartList = res.data.data
							for (let i=0;i<res.data.data.length;i++) {
								that.$store.state.cartList[i]['checked']=false
							}
							that.cartList=that.$store.state.cartList
							
							setTimeout(()=>{
								that.loadingshow=false
								that.$forceUpdate()//强制刷新页面
								that.calcTotal(); //计算总价
							},500)
						}
					})
					
				 });
			},
			//清空
			clearCart() {
				let that =this
				uni.showModal({
					content: '清空购物车？',
					success: (e) => {
						if (e.confirm) {
							for(let i=0;i<that.$store.state.cartList.length;i++){
								this.delete(that.$store.state.cartList[i].id)
							}
							this.loadingshow=false
						}
					}
				})
			},
			//计算总价
			calcTotal() {
				let list = this.cartList;
				console.log(list)
				if (list.length === 0) {
					this.empty = true;
					return;
				}
				let total = 0;
				let checked = true;
				list.forEach(item => {
					if (item.checked === true) {
						total += Number(item.cartPrice.toFixed(2)) * item.cartNumber;
					} else if (checked === true) {
						checked = false;
					}
				})
				this.allChecked = checked;
				this.total = Number(total.toFixed(2));
			},
			//创建订单
			createOrder() {
				let list = this.cartList;
				let goodsData = [];
				list.forEach(item => {
					if (item.checked) {
						goodsData.push({
							item
						})
					}
				})

				uni.navigateTo({
					url: `/pages/order/createOrder?data=${JSON.stringify({
						goodsData: goodsData
					})}`
				})
				// this.$api.msg('跳转下一页 sendData');
			}
		}
	}
</script>

<style lang='scss' scoped>
	.delshow {
		opacity: 1 !important;
	}

	.delhide {
		opacity: 0 !important;
	}

	.top {
		position: sticky;
		top: 0;
		background-color: #FFFFFF;
		z-index: 95;
		padding: 20upx 0;
		.checkbox {
			height: 52upx;
			position: relative;
			padding-left: 20upx;
			image {
				width: 40upx;
				height: 40upx;
				position: relative;
				z-index: 5;
			}
		}

		.clear {
			position: absolute;
			top: 0;
			right: 50upx;
			z-index: 4;

			.clear-btn,
			.cancel_btn {

				width: 120upx;
				height: 52upx;
				line-height: 52upx;
				padding-left: 35upx;
				font-size: $font-base;
				color: #fff;
				background: $font-color-disabled;
				border-radius: 50px 50px;
				opacity: 1;
				transition: .2s;
			}

			.cancel_btn {
				position: absolute;
				top: 0;
				right: 125upx;
			}

		}
	}

	.container {
		padding-bottom: 134upx;

		/* 空白页 */
		.empty {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			padding-bottom: 100upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			background: #fff;

			image {
				width: 240upx;
				height: 160upx;
				margin-bottom: 30upx;
			}

			.empty-tips {
				display: flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;

				.navigator {
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
	}

	/* 购物车列表项 */
	.cart-item {
		display: flex;
		justify-content: center;
		align-items: center;

		.checkbox {
			z-index: 8;
			font-size: 44upx;
			position: relative;
			top: 45%;
			padding: 4upx;
			color: $font-color-disabled;
			background: #fff;
			border-radius: 50px;
		}
	}

	.image-wrapper {
		width: 180upx;
		height: 180upx;
		flex-shrink: 0;
		position: relative;

		image {
			border-radius: 8upx;
		}
	}

	.item-right {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		padding-left: 30upx;

		.title {
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			height: 40upx;
			line-height: 40upx;
		}

		.price {
			font-size: $font-base + 2upx;
			color: #ff0000;
			height: 40upx;
			line-height: 40upx;
		}

		.attr {
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			height: 50upx;
			line-height: 50upx;
		}

		.price {
			height: 50upx;
			line-height: 50upx;
		}

		.del-btn {
			padding: 4upx 10upx;
			font-size: 34upx;
			height: 50upx;
			color: $font-color-light;
		}
	}

	/* 底部栏 */
	.action-section {
		/* #ifdef H5 */
		margin-bottom: 100upx;
		/* #endif */
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.total-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: right;
			padding-right: 40upx;

			.price {
				font-size: $font-lg;
				color: #ff0000;
			}

			.coupon {
				font-size: $font-sm;
				color: $font-color-light;

				text {
					color: $font-color-light;
				}
			}
		}

		.confirm-btn {
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $font-base + 2upx;
			background: $base-color;
			box-shadow: 1px 2px 5px rgba(0,147,233, 0.72)
		}
	}

	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.checkbox.checked {
		color: $uni-color-primary;
	}
	.demo-uni-row {
	    margin-bottom: 10px;
	    /* QQ、字节小程序文档写有 :host，但实测不生效 */
	    /* 百度小程序没有 :host，需要设置block */
	    /* #ifdef MP-TOUTIAO || MP-QQ || MP-BAIDU */
	    display: block;
	    /* #endif */
	}
	
	/* 支付宝小程序没有 demo-uni-row 层级 */
	/* 微信小程序使用了虚拟化节点，没有 demo-uni-row 层级 */
	/* #ifdef MP-ALIPAY || MP-WEIXIN */
	/deep/ .uni-row {
	    margin-bottom: 10px;
		 display: block;
	}
	/* #endif */
	
	.demo-uni-col {
	    height: 36px;
	    border-radius: 4px;
	}
	
	.dark_deep {
	    background-color: #99a9bf;
	}
	
	.dark {
	    background-color: #d3dce6;
	}
	
	.light {
	    background-color: #e5e9f2;
	}
</style>
