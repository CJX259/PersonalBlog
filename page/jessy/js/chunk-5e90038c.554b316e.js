(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5e90038c"],{"2df4":function(t,n,e){},"64f4":function(t,n,e){"use strict";e.r(n);var c=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"every_day"}},[e("span",[t._v("Sentence of the Day")]),e("p",{domProps:{innerHTML:t._s(t.getContent)}})])},a=[];let o=e("bc3a");var r={data(){return{content:"Loading~~~"}},computed:{getContent:function(){return this.content}},created(){o({url:"/queryEveryDay",method:"get"}).then(t=>{this.content=t.data.data.content}).catch(t=>{console.log(t)})}},u=r,d=(e("9c70"),e("2877")),s=Object(d["a"])(u,c,a,!1,null,"116d281c",null);n["default"]=s.exports},"9c70":function(t,n,e){"use strict";var c=e("2df4"),a=e.n(c);a.a}}]);
//# sourceMappingURL=chunk-5e90038c.554b316e.js.map