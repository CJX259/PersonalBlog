(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-795b2a04"],{"6c4a":function(t,a,n){},a636:function(t,a,n){"use strict";n.r(a);var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"right-module new-comments"},[n("p",[t._v("New Comments")]),t._l(t.comments,(function(a){return n("div",{key:a.id},[n("span",{staticClass:"comment-user"},[t._v(t._s(a.user))]),n("span",{staticClass:"comment-date"},[t._v(t._s(a.date))]),n("span",{staticClass:"comment-content"},[t._v(t._s(a.content))])])}))],2)},s=[],c=n("bc3a"),d={data:function(){return{comments:[]}},created:function(){var t=this;c({url:"/getNewComments?limit=3",method:"get"}).then((function(a){for(var n=0;n<a.data.data.length;n++)a.data.data[n].user=a.data.data[n].user_name,a.data.data[n].date=a.data.data[n].ctime,a.data.data[n].content=a.data.data[n].comments;t.comments=a.data.data}))}},o=d,m=(n("f470"),n("2877")),i=Object(m["a"])(o,e,s,!1,null,"73d8dffe",null);a["default"]=i.exports},f470:function(t,a,n){"use strict";var e=n("6c4a"),s=n.n(e);s.a}}]);
//# sourceMappingURL=chunk-795b2a04.e15f9434.js.map