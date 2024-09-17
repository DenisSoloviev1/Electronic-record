import{f as T,g as w,h as $,l as B,_ as l,r as q,n as M,a1 as O,a as W,j as s,q as _,t as L,a2 as N,a3 as I,a4 as v,s as y,Q as P,P as X,e as K,d as z,F as D,R as E}from"./index-pzaA-WxM.js";import{u as Q}from"./useQuery-qHXsNPj9.js";import{B as V,I as J}from"./style-UkC8jrfi.js";function G(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function H(t){return parseFloat(t)}function Y(t){return T("MuiTypography",t)}w("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);const Z=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],tt=t=>{const{align:a,gutterBottom:e,noWrap:n,paragraph:i,variant:r,classes:o}=t,p={root:["root",r,t.align!=="inherit"&&`align${B(a)}`,e&&"gutterBottom",n&&"noWrap",i&&"paragraph"]};return L(p,Y,o)},at=$("span",{name:"MuiTypography",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:e}=t;return[a.root,e.variant&&a[e.variant],e.align!=="inherit"&&a[`align${B(e.align)}`],e.noWrap&&a.noWrap,e.gutterBottom&&a.gutterBottom,e.paragraph&&a.paragraph]}})(({theme:t,ownerState:a})=>l({margin:0},a.variant==="inherit"&&{font:"inherit"},a.variant!=="inherit"&&t.typography[a.variant],a.align!=="inherit"&&{textAlign:a.align},a.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},a.gutterBottom&&{marginBottom:"0.35em"},a.paragraph&&{marginBottom:16})),b={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},et={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},nt=t=>et[t]||t,rt=q.forwardRef(function(a,e){const n=M({props:a,name:"MuiTypography"}),i=nt(n.color),r=O(l({},n,{color:i})),{align:o="inherit",className:p,component:d,gutterBottom:m=!1,noWrap:f=!1,paragraph:h=!1,variant:c="body1",variantMapping:u=b}=r,U=W(r,Z),x=l({},r,{align:o,color:i,className:p,component:d,gutterBottom:m,noWrap:f,paragraph:h,variant:c,variantMapping:u}),A=d||(h?"p":u[c]||b[c])||"span",F=tt(x);return s.jsx(at,l({as:A,ref:e,ownerState:x,className:_(F.root,p)},U))}),ot=rt;function st(t){return T("MuiSkeleton",t)}w("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const it=["animation","className","component","height","style","variant","width"];let g=t=>t,C,R,k,j;const lt=t=>{const{classes:a,variant:e,animation:n,hasChildren:i,width:r,height:o}=t;return L({root:["root",e,n,i&&"withChildren",i&&!r&&"fitContent",i&&!o&&"heightAuto"]},st,a)},pt=N(C||(C=g`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),ct=N(R||(R=g`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),ht=$("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:e}=t;return[a.root,a[e.variant],e.animation!==!1&&a[e.animation],e.hasChildren&&a.withChildren,e.hasChildren&&!e.width&&a.fitContent,e.hasChildren&&!e.height&&a.heightAuto]}})(({theme:t,ownerState:a})=>{const e=G(t.shape.borderRadius)||"px",n=H(t.shape.borderRadius);return l({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:I(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},a.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${n}${e}/${Math.round(n/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}},a.variant==="circular"&&{borderRadius:"50%"},a.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},a.hasChildren&&{"& > *":{visibility:"hidden"}},a.hasChildren&&!a.width&&{maxWidth:"fit-content"},a.hasChildren&&!a.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&v(k||(k=g`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),pt),({ownerState:t,theme:a})=>t.animation==="wave"&&v(j||(j=g`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),ct,(a.vars||a).palette.action.hover)),dt=q.forwardRef(function(a,e){const n=M({props:a,name:"MuiSkeleton"}),{animation:i="pulse",className:r,component:o="span",height:p,style:d,variant:m="text",width:f}=n,h=W(n,it),c=l({},n,{animation:i,component:o,variant:m,hasChildren:!!h.children}),u=lt(c);return s.jsx(ht,l({as:o,ref:e,className:_(u.root,r),ownerState:c},h,{style:l({width:f,height:p},d)}))}),ut=dt,gt=y.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  position: absolute;
  bottom: 0;
  right: 0;
`,mt={selectedType:""},ft=P(t=>({...mt,setSelectedType:a=>t({selectedType:a})}));var S=(t=>(t.getRequestsList="request-types-list",t))(S||{});const yt=async({queryKey:t})=>{const{roles:a,limit:e,offset:n,search:i}=t[1];try{const{data:r}=await X.typesOfRequests.typesOfRequestsList(e,n,i,{params:{roles:a}});return r}catch(r){return console.log(r),{}}},xt=y.li`
  font-size: 1rem;
  line-height: 1.5rem;
  display: block;

  margin-bottom: 1em;
  padding: 0.75em;
  width: 100%;
  max-width: 480px;

  border: 1px solid #38424f;
  border-radius: 13px;
  list-style-type: none;

  cursor: pointer;

  transition: all ease 0.4s;

  &:hover {
    border: 1px solid #fff;
    background: #11519c;
    color: #fff;
  }
`,vt=({itemName:t,onClick:a})=>{const e=()=>a(t);return s.jsx(xt,{onClick:e,children:t})},bt=y.div`
  padding: 12px 24px;
  margin: 15px;
`,Ct=({children:t})=>s.jsxs(bt,{children:[s.jsx(ot,{variant:"h3",paragraph:!0,sx:{marginBottom:8},children:"Выберите департамент"}),s.jsx("ul",{children:t})]}),Tt=()=>{const t=K(),{role:a}=z(),{setSelectedType:e}=ft(),{data:n,isLoading:i}=Q({queryKey:[S.getRequestsList,{roles:a}],queryFn:yt,refetchOnWindowFocus:!1,initialData:{}}),r=o=>{e(o),t(`${E.MAIN}?type=${o}`)};return s.jsx(V,{children:s.jsxs(D,{$justify:"space-between",children:[s.jsx(Ct,{children:i?s.jsx(ut,{}):s.jsx(s.Fragment,{children:n&&n.results&&n.results.map(o=>s.jsx(vt,{itemName:o.name,onClick:()=>r(o.name)},o.id))})}),s.jsx(gt,{children:s.jsx(J,{src:"/main.png",alt:""})})]})})};export{Tt as default};
