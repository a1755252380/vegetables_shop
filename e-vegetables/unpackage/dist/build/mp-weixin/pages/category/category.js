(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/category/category"],{"05e4":function(t,e,n){"use strict";n.r(e);var i=n("283e"),r=n("6358");for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("0a5c");var c,u=n("f0c5"),o=Object(u["a"])(r["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],c);e["default"]=o.exports},"0a5c":function(t,e,n){"use strict";var i=n("f1e5"),r=n.n(i);r.a},"283e":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var r=function(){var t=this,e=t.$createElement;t._self._c},a=[]},6358:function(t,e,n){"use strict";n.r(e);var i=n("9cc8"),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=r.a},8230:function(t,e,n){"use strict";(function(t){n("9719");i(n("66fd"));var e=i(n("05e4"));function i(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},"9cc8":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n("a34a"));function r(t){return t&&t.__esModule?t:{default:t}}function a(t,e,n,i,r,a,c){try{var u=t[a](c),o=u.value}catch(s){return void n(s)}u.done?e(o):Promise.resolve(o).then(i,r)}function c(t){return function(){var e=this,n=arguments;return new Promise((function(i,r){var c=t.apply(e,n);function u(t){a(c,i,r,u,o,"next",t)}function o(t){a(c,i,r,u,o,"throw",t)}u(void 0)}))}}var u={data:function(){return{sizeCalcState:!1,tabScrollTop:0,currentId:1,flist:[],slist:[],tlist:[]}},onLoad:function(t){var e=this;return c(i.default.mark((function n(){var r,a;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:r=t.id-1,e.loadData(),a=e,setTimeout((function(){a.tabtap(a.flist[r])}),500);case 4:case"end":return n.stop()}}),n)})))()},methods:{loadData:function(){var t=this;return c(i.default.mark((function e(){var n;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.json("cateList");case 2:n=e.sent,n.forEach((function(e){e.pid?e.picture?t.tlist.push(e):t.slist.push(e):t.flist.push(e)}));case 4:case"end":return e.stop()}}),e)})))()},tabtap:function(t){this.sizeCalcState||this.calcSize(),this.currentId=t.id;var e=this.slist.findIndex((function(e){return e.pid===t.id}));this.tabScrollTop=this.slist[e].top},asideScroll:function(t){this.sizeCalcState||this.calcSize();var e=t.detail.scrollTop,n=this.slist.filter((function(t){return t.top<=e})).reverse();n.length>0&&(this.currentId=n[0].pid)},calcSize:function(){var e=0;this.slist.forEach((function(n){var i=t.createSelectorQuery().select("#main-"+n.id);i.fields({size:!0},(function(t){n.top=e,e+=t.height,n.bottom=e})).exec()})),this.sizeCalcState=!0},navToList:function(e,n,i){console.log(i),t.navigateTo({url:"/pages/product/list?search=".concat(i)})}}};e.default=u}).call(this,n("543d")["default"])},f1e5:function(t,e,n){}},[["8230","common/runtime","common/vendor"]]]);