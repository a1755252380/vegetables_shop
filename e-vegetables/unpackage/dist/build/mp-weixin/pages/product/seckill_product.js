(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/seckill_product"],{"47ba":function(t,e,n){},7737:function(t,e,n){"use strict";n.r(e);var o=n("f7fa"),a=n("b2be");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("dcbf");var u,c=n("f0c5"),r=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);e["default"]=r.exports},afe9:function(t,e,n){"use strict";(function(t){n("9719");o(n("66fd"));var e=o(n("7737"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},b2be:function(t,e,n){"use strict";n.r(e);var o=n("c078"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a},c078:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("a34a"));function a(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n,o,a,i,u){try{var c=t[i](u),r=c.value}catch(s){return void n(s)}c.done?e(r):Promise.resolve(r).then(o,a)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(o,a){var u=t.apply(e,n);function c(t){i(u,o,a,c,r,"next",t)}function r(t){i(u,o,a,c,r,"throw",t)}c(void 0)}))}}var c=function(){n.e("pages/product/product/grade").then(function(){return resolve(n("dc88"))}.bind(null,n)).catch(n.oe)},r=function(){n.e("pages/product/product/choosenum").then(function(){return resolve(n("47f6"))}.bind(null,n)).catch(n.oe)},s=function(){n.e("pages/product/seckill_product/countdown").then(function(){return resolve(n("db43"))}.bind(null,n)).catch(n.oe)},d=function(){n.e("components/sloading").then(function(){return resolve(n("8881"))}.bind(null,n)).catch(n.oe)},f={components:{grade:c,choosenum:r,countdown:s,sloading:d},data:function(){return{specClass:"none",specSelected:[],favorite:!0,shareList:{num:1,price:0},specifications:[],good:{},imgList:[],desc:"",loadingshow:!0}},onLoad:function(t){var e=this;return u(o.default.mark((function n(){var a,i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(a=t.id,i=e,!a){n.next=5;break}return n.next=5,e.$myRequest({url:"/findGoods?goodsId="+a,method:"GET"}).then((function(t){i.good=t.data.data,console.log(i.good),i.imgList.push(t.data.data.image1),i.imgList.push(t.data.data.image2),i.desc='<div style="width:100%">\n\t\t\t\t\t<img style="width:100%;display:block;" src="'+t.data.data.imageDetail1+'" />\n\t\t\t\t\t<img style="width:100%;display:block;" src="'+t.data.data.imageDetail1+'" />\n\n\t\t\t\t</div>',i.specifications=[{num:1,pricesum:1*t.data.data.price,show:!0},{num:5,pricesum:parseFloat(.85*t.data.data.price).toFixed(2),show:!1},{num:10,pricesum:parseFloat(.8*t.data.data.price).toFixed(2),show:!1}]}));case 5:case"end":return n.stop()}}),n)})))()},methods:{choosenumvalue:function(t){this.shareList.num=t.num,this.shareList.price=t.price},toFavorite:function(){this.favorite=!this.favorite},buy:function(){var e=this;t.showLoading({title:"正在秒杀中..."}),setTimeout((function(){t.hideLoading(),t.showToast({title:"秒杀成功！"}),setTimeout((function(){t.hideToast(),t.navigateTo({url:"/pages/order/seckillOrder?data=".concat(JSON.stringify({goodsData:e.good}))})}),1e3)}),2e3)}}};e.default=f}).call(this,n("543d")["default"])},dcbf:function(t,e,n){"use strict";var o=n("47ba"),a=n.n(o);a.a},f7fa:function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var a=function(){var t=this,e=t.$createElement;t._self._c},i=[]}},[["afe9","common/runtime","common/vendor"]]]);