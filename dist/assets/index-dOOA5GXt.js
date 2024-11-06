import{u as Y,r as p,j as e,F as G,i as y,a as J,b as Q}from"./index-dJmx2XrE.js";import{c as X,u as Z,a as ee,b as te,d as se,e as ae,F as re,T as oe,f,g,h as ne,D as ie,i as ce,S as le,M as me,t as de}from"./constants-G6jq7zq6.js";import{u as ue,D as pe}from"./divisions-dropdown-L-uDnx_f.js";import{AssentP as fe,Link as ge}from"./index-S6eT5IVJ.js";const he=["contact_name","email","phone","date"],Se=X(he),$e=()=>{var b,T,$;const{userName:E}=Y(),{control:d,formState:{errors:i},handleSubmit:v,reset:R,watch:u}=Z({resolver:de(Se),mode:"onSubmit",defaultValues:{contact_name:E}}),{setDepartment:V,setDivision:k,setType:A,setDateRequest:C}=ee(),{resetDateTime:q,time:h,startDate:c}=te(),{filter:a,clearFilter:z}=ue(),{filter:r,clearFilter:I}=se(),[L,S]=p.useState(!1),[x,o]=p.useState(""),N=u("contact_name"),O=u("email"),j=u("phone"),P=()=>!N||!O||!j?(o("Пожалуйста, заполните все обязательные поля."),!1):a!=null&&a.id?r!=null&&r.id?!h||!c?(o("Пожалуйста, выберите дату и время."),!1):!0:(o("Пожалуйста, выберите тип заявки."),!1):(o("Пожалуйста, выберите ваше подразделение."),!1);p.useEffect(()=>{if(a!=null&&a.id&&(r!=null&&r.id)&&c){const t=new Date(c).toISOString().split("T")[0];V(10),k(a.id),A(r.id),C(t)}},[a,r,c]);const{isLoading:D,mutate:W}=ae({mutationKey:["createRequest"],mutationFn:async s=>await J.post(`${Q}/api/requests/`,s,{headers:{"Content-Type":"application/json",Authorization:`${localStorage.getItem("authToken")}`}})}),H=s=>{if(!P())return;const[t,B]=h.split(":").map(Number),n=new Date(c);n.setHours(t,B,0,0);const K=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}T${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}:${String(n.getSeconds()).padStart(2,"0")}`,m={...s,department:10,division:a.id,type:r.id,date:K},l=j.replace(/\D/g,"");if(m.phone=l.startsWith("7")?"8"+l.slice(1):(l.startsWith("8"),l),m.phone.length<8||m.phone.length>14){o("Телефон должен содержать от 8 до 14 цифр.");return}W(m,{onSuccess:()=>{S(!0),setTimeout(()=>S(!1),3e3),q(),z(),I(),R({contact_name:"",phone:"",email:"",date:""}),o("")},onError:U=>{var _,M,w;const F=(w=(M=(_=U.response)==null?void 0:_.data)==null?void 0:M.non_field_errors)==null?void 0:w[0];o(F?`Произошла ошибка при отправке. ${F}`:"Произошла ошибка при отправке, попробуйте ещё раз.")}})};return e.jsxs(e.Fragment,{children:[e.jsxs(re,{submitFn:v(H),children:[e.jsx(pe,{}),e.jsx(oe,{}),e.jsx(f,{field:"contact_name",error:((b=i.contact_name)==null?void 0:b.message)||"",control:d,render:({field:s})=>{var t;return e.jsx(g,{fieldValue:"contact_name",error:((t=i.contact_name)==null?void 0:t.message)||"",field:s})}}),e.jsxs(G,{$direction:y?"column":"row",$gap:y?0:15,$justify:"space-between",$align:"flex-start",children:[e.jsx(f,{field:"email",error:((T=i.email)==null?void 0:T.message)||"",control:d,render:({field:s})=>{var t;return e.jsx(g,{fieldValue:"email",error:((t=i.email)==null?void 0:t.message)||"",field:s})}}),e.jsx(f,{field:"phone",error:(($=i.phone)==null?void 0:$.message)||"",control:d,render:({field:s})=>{var t;return e.jsx(g,{fieldValue:"phone",error:((t=i.phone)==null?void 0:t.message)||"",field:s})}})]}),e.jsxs(ne,{children:[e.jsx(ie,{}),e.jsx(ce,{})]}),e.jsx(fe,{children:e.jsxs("label",{children:['Нажимая кнопку "Отправить", Вы даёте свое  ',e.jsx(ge,{href:"/public/Согласие-на-обработку.pdf",target:"_blanck",children:"Согласие на обработку персональных данных"}),' в соответствии с Федеральным Законом №152-ФЗ от 27.07.2006 "О персональных данных".']})}),e.jsx(le,{label:"Отправить",loading:D,disabled:D}),x&&e.jsx("div",{style:{color:"#e44444",marginTop:"0.5rem",fontWeight:"600",fontSize:"0.75rem"},children:x})]}),e.jsx(me,{isOpen:L})]})};export{$e as default};
