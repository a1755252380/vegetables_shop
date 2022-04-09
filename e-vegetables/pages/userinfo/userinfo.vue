<template>
	<view class="user_div">
		<view class="user-section">
			
			<text class="bg-upload-btn yticon icon-paizhao"></text>
			<view class="portrait-box">
				<image class="portrait" :src="userInfo.image || '/static/missing-face.png'"></image>
				<text class="pt-upload-btn yticon icon-paizhao"></text>
			</view>
		
		</view>
		<view class="user_detail">
				<uni-forms ref="baseForm" :modelValue="baseFormData">
								<uni-forms-item label="姓名" required>
									<uni-easyinput v-model="baseFormData.nickname" placeholder="请输入姓名" />
								</uni-forms-item>
								<uni-forms-item label="手机号码" required>
									<uni-easyinput v-model="baseFormData.phone" placeholder="请输入年龄" />
								</uni-forms-item>
								
							
							</uni-forms>
							<button type="primary" class="submit_btn" @click="submit('customForm')">确认修改</button>
		</view>
	</view>
</template>

<script>
	import {  
	    mapState,  
	    mapMutations  
	} from 'vuex';  
	export default {
		data() {
			return {
				baseFormData:{
					nickname:"",
					phone:""
				}
			};
		},
		computed:{
			...mapState(['userInfo']),
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
	}
	.user_detail{
		padding: 40upx;
		margin: 15upx;
	}
	.user_div{
		
	}
	.submit_btn{
		background-color: #0093E9;
		background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
		
	}
	.user-section{
		display:flex;
		align-items:center;
		justify-content: center;
		height: 300upx;
		padding: 40upx 30upx 0;
		position:relative;
		background-color: #0093E9;
		background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
		.portrait-box{
			width: 200upx;
			height: 200upx;
			border:6upx solid #fff;
			border-radius: 50%;
			position:relative;
			z-index: 2;
		}
		.portrait{
			position: relative;
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		.yticon{
			position:absolute;
			line-height: 1;
			z-index: 5;
			font-size: 48upx;
			color: #fff;
			padding: 4upx 6upx;
			border-radius: 6upx;
			// background: rgba(0,0,0,.4);
		}
		.pt-upload-btn{
			right: 0;
			bottom: 10upx;
		}
		.bg-upload-btn{
			right: 20upx;
			bottom: 16upx;
		}
	}


</style>
