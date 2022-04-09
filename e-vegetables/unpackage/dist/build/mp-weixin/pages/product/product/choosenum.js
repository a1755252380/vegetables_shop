(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/product/choosenum"],{"3dff":function(t,a,c){"use strict";var e;c.d(a,"b",(function(){return n})),c.d(a,"c",(function(){return o})),c.d(a,"a",(function(){return e}));var n=function(){var t=this,a=t.$createElement;t._self._c},o=[]},"47f6":function(t,a,c){"use strict";c.r(a);var e=c("3dff"),n=c("c985");for(var o in n)"default"!==o&&function(t){c.d(a,t,(function(){return n[t]}))}(o);c("ff67");var i,r=c("f0c5"),u=Object(r["a"])(n["default"],e["b"],e["c"],!1,null,"9abea954",null,!1,e["a"],i);a["default"]=u.exports},"4d8f":function(t,a,c){},c985:function(t,a,c){"use strict";c.r(a);var e=c("ca10"),n=c.n(e);for(var o in e)"default"!==o&&function(t){c.d(a,t,(function(){return e[t]}))}(o);a["default"]=n.a},ca10:function(t,a,c){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={props:["specifications"],data:function(){return{choosedata:{}}},computed:{pricedata:function(){return this.specifications}},methods:{chooseclick:function(t){for(var a=0;a<this.pricedata.length;a++)this.pricedata[a].show=!1;this.pricedata[t].show=!0,this.choosedata=this.pricedata[t],console.log(this.choosedata),this.$emit("choosenumvalue",this.choosedata)}}};a.default=e},ff67:function(t,a,c){"use strict";var e=c("4d8f"),n=c.n(e);n.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/product/product/choosenum-create-component',
    {
        'pages/product/product/choosenum-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("47f6"))
        })
    },
    [['pages/product/product/choosenum-create-component']]
]);
