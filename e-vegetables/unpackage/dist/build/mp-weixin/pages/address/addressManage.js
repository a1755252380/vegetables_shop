(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/address/addressManage"],{2376:function(a,e,t){"use strict";(function(a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{addressData:{name:"",mobile:"",addressName:"在地图选择",address:"",area:"",default:!1}}},onLoad:function(e){var t="新增收货地址";"edit"===e.type&&(t="编辑收货地址",this.addressData=JSON.parse(e.data)),this.manageType=e.type,a.setNavigationBarTitle({title:t})},methods:{switchChange:function(a){this.addressData.default=a.detail},chooseLocation:function(){var e=this;a.chooseLocation({success:function(a){e.addressData.addressName=a.name,e.addressData.address=a.name}})},confirm:function(){var e=this.addressData;e.name?/(^1[3|4|5|7|8][0-9]{9}$)/.test(e.mobile)?e.address?e.area?(this.$api.prePage().refreshList(e,this.manageType),this.$api.msg("地址".concat("edit"==this.manageType?"修改":"添加","成功")),setTimeout((function(){a.navigateBack()}),800)):this.$api.msg("请填写门牌号信息"):this.$api.msg("请在地图选择所在位置"):this.$api.msg("请输入正确的手机号码"):this.$api.msg("请填写收货人姓名")}}};e.default=t}).call(this,t("543d")["default"])},3841:function(a,e,t){},7073:function(a,e,t){"use strict";var n=t("3841"),s=t.n(n);s.a},"937b":function(a,e,t){"use strict";(function(a){t("9719");n(t("66fd"));var e=n(t("e99e"));function n(a){return a&&a.__esModule?a:{default:a}}wx.__webpack_require_UNI_MP_PLUGIN__=t,a(e.default)}).call(this,t("543d")["createPage"])},c0a5:function(a,e,t){"use strict";var n;t.d(e,"b",(function(){return s})),t.d(e,"c",(function(){return i})),t.d(e,"a",(function(){return n}));var s=function(){var a=this,e=a.$createElement;a._self._c},i=[]},e99e:function(a,e,t){"use strict";t.r(e);var n=t("c0a5"),s=t("efb2");for(var i in s)"default"!==i&&function(a){t.d(e,a,(function(){return s[a]}))}(i);t("7073");var r,u=t("f0c5"),c=Object(u["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=c.exports},efb2:function(a,e,t){"use strict";t.r(e);var n=t("2376"),s=t.n(n);for(var i in n)"default"!==i&&function(a){t.d(e,a,(function(){return n[a]}))}(i);e["default"]=s.a}},[["937b","common/runtime","common/vendor"]]]);