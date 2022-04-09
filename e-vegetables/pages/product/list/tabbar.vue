<template>
	<view class="navbar">
		<view class="search_text">
			<uni-search-bar v-model="search" class=" search_border" radius="100" placeholder="请输入搜索内容"
				clearButton="none" cancelButton="none" />

			<button type="primary" class="search_btn" @click="searchclick()">搜索</button>


		</view>
		<view class="condition">
			<view class="nav-item" :class="{current: findex === 0}" @click="tabClick(0)">
				综合排序
			</view>
			<view class="nav-item" :class="{current: findex === 1}" @click="tabClick(1)">
				销量优先
			</view>
			<view class="nav-item" :class="{current: findex === 2}" @click="tabClick(2)">
				<text>价格</text>
				<view class="p-box">
					<text :class="{active: fpriceOrder === 1 && findex === 2}" class="yticon icon-shang"></text>
					<text :class="{active: fpriceOrder === 2 && findex === 2}" class="yticon icon-shang xia"></text>
				</view>
			</view>

		</view>
	</view>

</template>

<script>
	export default {
		props: ['filterIndex', "priceOrder",'searchvalue'],
		computed: {
			findex: {
				get(){
				return this.filterIndex
				},
				set(value){
					this.$emit("returnclassfiy" ,value)
				}
			},
			fpriceOrder: {
				get(){
					return this.priceOrder
				},
				set(value){
					this.$emit("returnpriceOrder",value)
				}
				
			},
			search:{
				get(){
					return this.searchvalue
				},
				set(value){
					this.$emit("returnsearch",value)
				}
				
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			//筛选点击
			async tabClick(index) {
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				let that=this
				this.$emit("returnloading",true)
				if(index===0){
					this.$emit("getclasfiy",this.$store.state.goodsList)
					setTimeout(()=>{
						that.$emit("returnloading",false)
					},1000)
				}
				if ( index === 1) {
					let that=this
					await this.$myRequest({
						url:"/salesList",
						method:"GET"
					}).then((res)=>{
						
						that.$emit("getclasfiy",res.data.data)
						
					})
				
				}
				this.findex = index;
				if (index === 2) {
					
					this.fpriceOrder = this.fpriceOrder === 1 ? 2 : 1;
					let that=this
					await this.$myRequest({
						url:"/priceList?num="+that.fpriceOrder,
						method:"GET"
					}).then((res)=>{
						
						that.$emit("getclasfiy",res.data.data)
						
					})
				} else {
					this.fpriceOrder = 0;
				}
				
			},
			//显示分类面板
			toggleCateMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(() => {
					this.cateMaskState = state;
				}, timer)
			},
			//点击搜索
			searchclick(){
				let that=this
				setTimeout(()=>{
					that.$emit("loadData",this.search)
				},200)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search_border {}

	.navbar {
		position: sticky;
		top: 0;
		width: 100%;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0, 0, 0, .06);
		z-index: 10;

		.search_text {
			width: 100%;
			padding: 10upx;
			position: relative;

			.search_btn {
				position: absolute;
				top: 27upx;
				right: 23upx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-top-right-radius: 30upx;
				border-bottom-right-radius: 30upx;
				font-size: 25upx;
				width: 120upx;
				height: 68upx;
				background-color: #0093E9;
				background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
				z-index: 9999;

			}
		}

		.condition {
			display: flex;

			.nav-item {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				font-size: 30upx;
				color: $font-color-dark;
				position: relative;
				padding: 15upx;

				&.current {
					color: $base-color;
					text-decoration: none;

					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 120upx;
						height: 0;
						// border-bottom: 4upx solid $base-color;
					}
				}
			}

		}

		.p-box {
			display: flex;
			flex-direction: column;

			.yticon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;

				&.active {
					color: $base-color;
				}
			}

			.xia {
				transform: scaleY(-1);
			}
		}

		.cate-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}
</style>
