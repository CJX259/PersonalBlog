(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-59f2f994"],{"6db6":function(t,a,e){},"9ed5":function(t,a,e){"use strict";var n=e("6db6"),s=e.n(n);s.a},a636:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"right-module new-comments"},[e("p",[t._v("New Comments")]),t._l(t.comments,(function(a){return e("div",{key:a.id},[e("span",{staticClass:"comment-user"},[t._v(t._s(a.user))]),e("span",{staticClass:"comment-date"},[t._v(t._s(a.date))]),e("span",{staticClass:"comment-content"},[t._v(t._s(a.content))])])}))],2)},s=[];let d=e("bc3a");var c={data(){return{comments:[]}},created(){d({url:"/getNewComments?limit=3",method:"get"}).then(t=>{for(let a=0;a<t.data.data.length;a++)t.data.data[a].user=t.data.data[a].user_name,t.data.data[a].date=t.data.data[a].ctime,t.data.data[a].content=t.data.data[a].comments;this.comments=t.data.data})}},m=c,o=(e("9ed5"),e("2877")),r=Object(o["a"])(m,n,s,!1,null,"d104fa50",null);a["default"]=r.exports}}]);
//# sourceMappingURL=chunk-59f2f994.fdaf9b2e.js.map