(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0d894591"],{4141:function(t,e,n){"use strict";var c=n("4282"),a=n.n(c);a.a},4282:function(t,e,n){},fc81:function(t,e,n){"use strict";n.r(e);var c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"edit_blog"},[n("h1",[t._v("编辑每日一句")]),n("textarea",{attrs:{placeholder:"请输入每日一句",id:"content"}}),n("button",{on:{click:t.submit}},[t._v("提交")])])},a=[];let o=n("bc3a");var u={methods:{submit(){var t=document.getElementById("content").value;o({url:"/editEveryDay",method:"post",data:t}).then((function(t){alert("提交成功"),document.getElementById("content").value=""})).catch((function(t){console.log("请求失败",t)}))}}},l=u,i=(n("4141"),n("2877")),s=Object(i["a"])(l,c,a,!1,null,"3bee91da",null);e["default"]=s.exports}}]);
//# sourceMappingURL=chunk-0d894591.63d0bcc7.js.map