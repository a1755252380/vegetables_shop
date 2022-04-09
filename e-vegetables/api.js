// const url="139.159.142.192"
const url="http://127.0.0.1:5000"//请求的路径指向
const myRequest = (options) =>{
	return new Promise((resolve,reject) => {
		uni.request({
			url:url+options.url,//请求的相关链接
			method:options.method || 'POST',//请求的方式
			data:options.data || {},//请求需传入的对象
			success: res => {
				resolve(res)  //返回请求成功结果
			},
			fail: (err) => {
					reject(err)  //返回请求失败信息
		}})})}
export {myRequest}
