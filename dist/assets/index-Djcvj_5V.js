import{r as u,j as n,_ as a,u as T,H as p,a as b,T as d,c as C,b as E,d as S,e as _,S as y,B as h,i as c,R as H}from"./index-pzaA-WxM.js";import{C as M,a as P,B as R,H as w,b as k,I as B}from"./style-UkC8jrfi.js";const $=u.createContext(null),g=$;function j(){return u.useContext(g)}const I=typeof Symbol=="function"&&Symbol.for,A=I?Symbol.for("mui.nested"):"__THEME_NESTED__";function D(e,t){return typeof t=="function"?t(e):a({},e,t)}function L(e){const{children:t,theme:s}=e,o=j(),i=u.useMemo(()=>{const r=o===null?s:D(o,s);return r!=null&&(r[A]=o!==null),r},[s,o]);return n.jsx(g.Provider,{value:i,children:t})}const x={};function f(e,t,s,o=!1){return u.useMemo(()=>{const i=e&&t[e]||t;if(typeof s=="function"){const r=s(i),l=e?a({},t,{[e]:r}):r;return o?()=>l:l}return e?a({},t,{[e]:s}):a({},t,s)},[e,t,s,o])}function N(e){const{children:t,theme:s,themeId:o}=e,i=T(x),r=j()||x,l=f(o,i,s),v=f(o,r,s,!0);return n.jsx(L,{theme:v,children:n.jsx(p.Provider,{value:l,children:t})})}const F=["theme"];function O(e){let{theme:t}=e,s=b(e,F);const o=t[d];return n.jsx(N,a({},s,{themeId:o?d:void 0,theme:o||t}))}var m=C("chevron-right","IconChevronRight",[["path",{d:"M9 6l6 6l-6 6",key:"svg-0"}]]);const W=()=>{const e=E({breakpoints:{values:{xs:300,sm:600,md:900,lg:1200,xl:1536}}}),{login:t}=S(),s=_(),o=i=>{t(i),s(H.REQUESTS)};return n.jsx(M,{children:n.jsx(P,{children:n.jsxs(y,{width:"100%",gap:"17em",alignItems:"flex-start",direction:"row",justifyContent:"center",sx:{marginTop:{md:"4.3em",sm:0}},children:[n.jsx(O,{theme:e,children:n.jsxs(R,{sx:{width:{sm:"100%",md:"60%"},padding:{sm:"0 3em",xs:"1em 3em",md:0}},children:[n.jsx(w,{children:"Заказ справок и принятие обращений ДГТУ"}),n.jsx(k,{children:"Кто вы?"}),n.jsx(h,{onClick:()=>o("Работник"),label:"сотрудник",icon:n.jsx(m,{color:"#fff",width:c?33:66,height:c?33:66}),direction:"rtl"}),n.jsx(h,{disabled:!0,label:"студент",icon:n.jsx(m,{color:"#fff",width:c?33:66,height:c?33:66}),direction:"rtl"}),n.jsx(h,{disabled:!0,label:"соискатель",icon:n.jsx(m,{color:"#fff",width:c?33:66,height:c?33:66}),direction:"rtl"})]})}),n.jsx(B,{src:"/logo2.png",alt:"logo"})]})})})};export{W as default};
