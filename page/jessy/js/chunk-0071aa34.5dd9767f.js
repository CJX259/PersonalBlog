(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0071aa34"],{"07fa":function(t,e,a){"use strict";var i=a("ca6e"),s=a.n(i);s.a},"74d5":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"right-module hot-blogs"},[a("span",[t._v("Hot Blogs")]),a("ul",t._l(t.blogTitles,(function(e){return a("li",{key:e.id},[a("span",{staticClass:"blog",on:{click:function(a){return t.toDetail(e.id)}}},[t._v(t._s(e.title)+" | Page Views: "+t._s(e.views))])])})),0)])},s=[];let l=a("bc3a");var o={data(){return{blogTitles:[]}},methods:{toDetail(t){this.$store.commit("changeBid",t),localStorage.setItem("bid",t),this.$router.push({name:"blog_detail",query:{bid:t}})}},created(){l({url:"/getHotBlogs?limit=3",method:"get"}).then(t=>{this.blogTitles=t.data.data})}},n=o,c=(a("07fa"),a("2877")),r=Object(c["a"])(n,i,s,!1,null,"04c2e560",null);e["default"]=r.exports},ca6e:function(t,e,a){}}]);
//# sourceMappingURL=chunk-0071aa34.5dd9767f.js.map