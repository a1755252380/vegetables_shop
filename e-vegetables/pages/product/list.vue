<template>
	<view class="content">
		<tabbar :filterIndex="filterIndex" :priceOrder="priceOrder" 
		@getclasfiy="getclasfiy" 
		@returnclassfiy="returnclassfiy"
		@returnloading="returnloading"
		@returnsearch="returnsearch"
		:searchvalue="searchvalue"
		@loadData="loadData"
		@returnpriceOrder="returnpriceOrder"
		></tabbar>
		<view class="loadingmodel" v-if="loading">
			<i class="iconfont icon-jiazaizhong"></i>
		</view>
		<view class="" v-else>
			<view class="goods-list" v-if="goodnone" >
				<view 
					v-for="(item, index) in goodsList" :key="index"
					class="goods-item"
					@click="navToDetailPage(item)"
				>
					<view class="image-wrapper">
						<image :src="item.image1" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.title}}</text>
					<view class="price-box">
						<text class="price">{{item.price}}</text>
						<text>已售 {{item.sales}}</text>
					</view>
				</view>
			</view>
			<view class="good-none" v-else>
				暂无符合条件的商品
			</view>
			<!-- <uni-load-more :status="loadingType"></uni-load-more> -->
			
		</view>
	
	</view>
</template>

<script>
	import tabbar from "./list/tabbar.vue"
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				cateMaskState: 0, //分类面板展开状态
				headerPosition:"fixed",
				headerTop:"0px",
				loadingType: 'more', //加载更多状态
				filterIndex: 0, 
				cateId: 0, //已选三级分类id
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				cateList: [],
				goodsList: [],
				//搜索栏内容
				searchvalue:"",
				//搜索加载数据
				loading:false,
				//是否有搜索结果
				goodnone:true
			};
		},
		
		onLoad(options){
			let search=options.search
			console.log(search)
			this.searchvalue=search
			this.goodsList=this.$store.state.goodsList	
			if(search){
				this.loadData(search)
			}
			//分类的筛选条件
			// this.cateId = options.tid;
			// this.loadCateList(options.fid,options.sid);
			// this.loadData();
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			// this.loadData('refresh');
		},
		//加载更多
		onReachBottom(){
			// this.loadData();
		},
		methods: {
			//数据加载
			returnloading(value){
				this.loading=value
			},
			//搜索栏搜索
			returnsearch(value){
				this.searchvalue=value
			},
			// 返回选中的筛选条件
			returnclassfiy(value){
				this.filterIndex=value
			},
			// 返回选中的筛选条件
			returnpriceOrder(value){
				this.priceOrder=value
			},
			//搜索栏进入
			async loadData(value){
				this.loading=true
				let that =this
					await this.$myRequest({
						url:"/searchGoodsList?search="+value,
						method:"GET"
					}).then((res)=>{
						console.log(res.data.data)
					if(res.data.data==0){
						that.goodnone=false
					}else{
						that.goodnone=true
							that.goodsList=res.data.data
							that.$forceUpdate()
						}
						that.loading=false
					
					})
				
			},
			// 接收搜索分类的结果
			getclasfiy(value){
				this.goodsList=value
				this.loading=false
				this.$forceUpdate()
			},
			
			//详情
			navToDetailPage(item){
				//测试数据没有写id，用title代替
				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			stopPrevent(){}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
	}
	.content{
		// padding-top: 96upx;
	}
	.good-none{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 750upx;
		font-size: 45upx;
		color: #c0c4cc;
		
	}
	//数据加载缓存
.loadingmodel{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 750upx;
	font-size: 50upx;
	color: $base-color;
	.iconfont{
		font-size: 70upx;
		animation: myfirst2 1s infinite linear;
	}
}
	@keyframes myfirst2
	{
	from {transform: rotate(0deg);}
	to {transform: rotate(359deg);}
	}

	/* 分类 */
	.cate-mask{
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 95;
		transition: .3s;
		
		.cate-content{
			width: 630upx;
			height: 100%;
			background: #fff;
			float:right;
			transform: translateX(100%);
			transition: .3s;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.cate-content{
				transform: translateX(0);
			}
		}
	}
	.cate-list{
		display: flex;
		flex-direction: column;
		height: 100%;
		.cate-item{
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
 			font-size: 28upx;
			color: #555;
			position: relative;
		}
		.two{
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}
		.active{
			color: $base-color;
		}
	}

	/* 商品列表 */
	.goods-list{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		padding-top: 20upx;
		background: #fff;
		.goods-item{
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
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: $font-color-light;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
			&:before{
				content: '￥';
				font-size: 26upx;
			}
		}
	}
	

</style>
