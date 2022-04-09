<template>
	<view class="choosenum">
		<view :class="item.show?'choosebtn choosebtn_active':'choosebtn '"
		@click="chooseclick(index)"
		 v-for="(item,index) in pricedata"
			:key="index">
			<text>{{item.num}}<text>份</text></text><br>
			<text class="price">￥{{item.pricesum}}/份</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['specifications'],
		data() {
			return {
				
				choosedata: {
					
				}
			}
		},
		computed:{
			pricedata(){
				
				return this.specifications
			}
		},
		methods: {
			chooseclick(index) {
				// console.log(index)
				for(let i=0;i<this.pricedata.length;i++){
					this.pricedata[i].show=false
				}
				this.pricedata[index].show=true
				this.choosedata=this.pricedata[index]
				console.log(this.choosedata)
				this.$emit("choosenumvalue",this.choosedata)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.choosenum {
		width: 750upx;
		background: #fff;
		padding: 10upx;

		.choosebtn {
			display: inline-block;
			text-align: center;
			padding: 15upx;
			margin: 20upx;
			font-size: 28upx;
			background: #f0f0f0;
			border-radius: 10upx;

			.price {
				color: #bdbdbd;
			}
		}

		.choosebtn_active {
			color: #fff !important;
			background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);

			.price {
				color: #fff;
			}
		}
	}
</style>
