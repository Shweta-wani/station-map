(this.webpackJsonplinechart=this.webpackJsonplinechart||[]).push([[0],{22:function(t,e,n){},44:function(t,e,n){},45:function(t,e,n){"use strict";n.r(e);var c=n(1),a=n.n(c),r=n(16),o=n.n(r),i=(n(22),n(3)),s=n(4),l=n(17),u=n.n(l),j=n(0),x=Object(c.createContext)();function f(){return Object(c.useContext)(x)}var b=[{value:"JA_TT",text:"Lufttemperatur"},{value:"JA_TN",text:"Lufttemperatur Minimums"},{value:"JA_RR",text:"Niederschlagshoehe"},{value:"JA_N",text:"Bedeckungsgrades"}];var h=function(t){var e=t.children,n=Object(c.useState)([]),a=Object(i.a)(n,2),r=a[0],o=a[1],l=Object(c.useState)(b[0].text),f=Object(i.a)(l,2),h=f[0],O=f[1],d=Object(c.useState)(b[0].value),p=Object(i.a)(d,2),v=p[0],g=p[1],y=Object(c.useState)(""),m=Object(i.a)(y,2),S=m[0],k=m[1],w=Object(c.useState)(""),N=Object(i.a)(w,2),T=N[0],F=N[1],C=Object(c.useState)(1),I=Object(i.a)(C,2),M=I[0],z=I[1],D=Object(c.useState)(""),H=Object(i.a)(D,2),W=(H[0],H[1]),_=Object(c.useState)([]),A=Object(i.a)(_,2),B=A[0],P=A[1],J=Object(c.useState)([]),E=Object(i.a)(J,2),Y=E[0],L=E[1];function V(t){return Number(t.MESS_DATUM_BEGINN.toString().substring(0,4))}Object(c.useEffect)((function(){!function(){var t=[],e=[];u.a.post("http://localhost:3000/txtfile",{stationsId:M},{credentials:"include"},{withCredentials:!0}).then((function(n){for(var c=V(n.data[0]),a=V(n.data[n.data.length-1]),r=c;r<a;r+=9)e.push({value:r,text:"".concat(r," - ").concat(r+9)});n.data.map((function(e,n){var c=V(e);if(c>=S&&t.length<10)return t.push({label:c,x:t.length,y:e[v]})})),o(t),L(e),F(S?"".concat(S," - ").concat(parseInt(S)+9):"".concat(c," - ").concat(c+9))})).catch((function(t){console.log("Fetching data error",t)}))}()}),[v,S,M]),Object(c.useEffect)((function(){!function(){var t="http://localhost:3000/stationDetail",e="http://localhost:3000/stationDetail/files",n=[],c=[];fetch(e).then((function(t){return t.json()})).then((function(t){c.push.apply(c,Object(s.a)(t))})).catch((function(){return console.log("Can\u2019t access "+e+" response. Blocked by browser?")})),fetch(t).then((function(t){return t.json()})).then((function(t){t.map((function(t,e){if(c.includes(t.Stations_id))return n.push({value:t.Stations_id,text:t.Stationsname})})),P(n)})).catch((function(){return console.log("Can\u2019t access "+t+" response. Blocked by browser?")}))}()}),[]);var G={data:r,optionsData:b,year:Y,stations:B,textX:T,textY:h,selectYear:function(t,e){k(t),F(e)},selectType:function(t,e){g(t),O(e)},selectStaion:function(t,e){z(t),W(e),k("")}};return Object(j.jsx)(x.Provider,{value:G,children:e})},O=(n(42),function(t){var e=t.height,n=t.width,r=t.horizontalGuides,o=t.precision,l=f().data,u=n/25,x=Math.max.apply(Math,Object(s.a)(l.map((function(t){return t.x})))),b=Math.max.apply(Math,Object(s.a)(l.map((function(t){return t.y})))),h=Math.min.apply(Math,Object(s.a)(l.map((function(t){return t.y})))),O=Object(c.useRef)(),d=Object(c.useState)(!0),p=Object(i.a)(d,2),v=p[0],g=p[1];-h>b&&(b=-h);var y=parseFloat(b.toString()).toFixed(o).length+1,m=3*(u+y),S=n-2*m,k=e-2*m,w=l.map((function(t){return{x:2*t.x/x*S+m+u,y:(k-t.y/b*k)/2+m}})),N=w.map((function(t){return console.log(),"".concat(t.x,",").concat(t.y)})).join(" "),T=function(t){var e=t.points;return Object(j.jsx)("polyline",{fill:"none",stroke:"green",strokeWidth:"5",points:e})},F=function(){return Object(j.jsx)(T,{points:"".concat(m+u,",").concat(e-m," ").concat(2*n,",").concat(e-m)})},C=function(){return Object(j.jsx)(T,{points:"".concat(m+u,",0 ").concat(m+u,",").concat(e-m)})},I=function(t){var e=m+u,c=2*n;return new Array(r).fill(0).map((function(n,o){var i;i=(o+1)/2/r;var s=t.chartHeight-k*i+m;return Object(j.jsx)(a.a.Fragment,{children:Object(j.jsx)("polyline",{fill:"none",stroke:"#ccc",strokeWidth:".5",points:"".concat(e,",").concat(s," ").concat(c,",").concat(s)})},o)}))},M=function(){return Object(j.jsx)(I,{chartHeight:k/2})},z=function(){return Object(j.jsx)(I,{chartHeight:k})},D=function(){var t=e-m+2*u;return l.map((function(e,n){var c=2*e.x/x*S+m-u/2;return Object(j.jsx)("text",{x:c,y:t,style:{fill:"#fff",fontSize:u,fontFamily:"Helvetica"},children:e.label},n)}))},H=function(t){var e=r,n=r;return-h>b&&(b=-h),new Array(e+t.increaseParts).fill(0).map((function(c,a){var i=u,s=a/2/r,l=t.activeIndex?n--:a,x=t.newChartHeight-k*s+m+u/2;return Object(j.jsx)("text",{x:i,y:x,style:{fill:"#fff",fontSize:u,fontFamily:"Helvetica"},children:t.activeIndex?-parseFloat(b*(l/e)).toFixed(o):parseFloat(b*(l/e)).toFixed(o)},a)}))},W=function(){return Object(j.jsx)(H,{increaseParts:0,newChartHeight:k,activeIndex:!0})},_=function(){return Object(j.jsx)(H,{increaseParts:1,newChartHeight:k/2,activeIndex:!1})};var A=function(){var t=w.map((function(t){return Object(j.jsx)("circle",{cx:t.x?t.x:null,cy:t.y?t.y:null,r:"4",fill:"red",opacity:"1"},t.x)}));return t||""};return Object(j.jsxs)("div",{class:"wrapper",children:[Object(j.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(2*n," ").concat(e),overflow:"auto !important",ref:O,children:[Object(j.jsx)(F,{}),Object(j.jsx)(D,{}),Object(j.jsx)(C,{}),Object(j.jsx)(_,{}),Object(j.jsx)(W,{}),Object(j.jsx)(A,{}),Object(j.jsx)(M,{}),Object(j.jsx)(z,{}),Object(j.jsx)("line",{x1:"".concat(m+u),y1:"0",x2:"".concat(m+u-20),y2:"".concat(m+u-105),style:{stroke:"green",strokeWidth:5}}),Object(j.jsx)("line",{x1:"".concat(m+u),y1:"0",x2:"".concat(m+u+20),y2:"".concat(m+u-105),style:{stroke:"green",strokeWidth:5}}),Object(j.jsx)("line",{x1:"".concat(2*n),y1:"".concat(e-m),x2:"".concat(3*n-(e-m)-80),y2:"".concat(e-m-20),style:{stroke:"green",strokeWidth:5}}),Object(j.jsx)("line",{x1:"".concat(2*n),y1:"".concat(e-m),x2:"".concat(3*n-(e-m)-80),y2:"".concat(e-m+20),style:{stroke:"green",strokeWidth:5}}),Object(j.jsx)("polyline",{fill:"none",stroke:"yellow",strokeWidth:"3",points:N})]}),Object(j.jsx)("button",{className:"btn btnSize zoomIn",onClick:function(t){return g(!1),void(O.current.currentScale+=.1)},children:Object(j.jsx)("i",{className:"fa fa-plus"})}),Object(j.jsx)("button",{className:"btn btnSize zoomOut",onClick:function(t){O.current.currentScale>1?O.current.currentScale-=.1:g(!0)},disabled:v,children:Object(j.jsx)("i",{className:"fa fa-minus"})})]})});var d=function(){var t=f().textX;return Object(j.jsx)("div",{children:Object(j.jsx)("span",{className:["style"].join(" "),children:t})})},p=function(){var t=f().textY;return Object(j.jsx)("div",{children:Object(j.jsx)("span",{className:["style","labelPositionY"].join(" "),children:t})})};n(43),n(44);function v(t){var e=t.value.map((function(t){return Object(j.jsx)("option",{className:"form-control",value:t.value,children:t.text},t.value)}));return Object(j.jsx)("div",{className:"form-group",children:Object(j.jsx)("select",{onChange:function(e){return t.getType(e)},className:"selctionType form-control col-4 col-sm-4 col-m-4 col-lg-4","aria-label":"Default select example",children:e})})}var g=function(){var t=f(),e=t.selectStaion,n=t.selectType,c=t.selectYear,r=t.stations,o=t.year,i=t.optionsData;function s(t){return t.preventDefault(),{targetValue:t.target.value,targetText:t.target.options[t.target.selectedIndex].text}}return Object(j.jsxs)(a.a.Fragment,{children:[Object(j.jsx)(v,{value:r,getType:function(t){return e(s(t).targetValue,s(t).targetText)}}),Object(j.jsx)(v,{value:i,getType:function(t){return n(s(t).targetValue,s(t).targetText)}}),Object(j.jsx)(v,{value:o,getType:function(t){return c(s(t).targetValue,s(t).targetText)}})]})};var y=function(){return Object(j.jsx)("div",{className:"m-2 chartWrapper",children:Object(j.jsx)(h,{children:Object(j.jsxs)("div",{className:"container",children:[Object(j.jsx)("div",{className:"row justify-content-center",children:Object(j.jsx)(g,{})}),Object(j.jsx)(p,{}),Object(j.jsx)(O,{width:700,height:750,horizontalGuides:5,precision:2}),Object(j.jsx)(d,{})]})})})},m=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,46)).then((function(e){var n=e.getCLS,c=e.getFID,a=e.getFCP,r=e.getLCP,o=e.getTTFB;n(t),c(t),a(t),r(t),o(t)}))};o.a.render(Object(j.jsx)(a.a.StrictMode,{children:Object(j.jsx)(y,{})}),document.getElementById("root")),m()}},[[45,1,2]]]);
//# sourceMappingURL=main.1c42608d.chunk.js.map