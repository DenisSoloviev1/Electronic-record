import{c as D,d as j,s as F,r as S,u as T,j as l,e as b,T as k,P as I,R as C}from"./index-olMwwqT3.js";import{j as O,k as P}from"./constants-0HZD1wuV.js";var x=(t=>(t.getDivisions="divisions",t))(x||{});const R=async({queryKey:t})=>{const{limit:n,offset:o,search:u,role:c,authToken:d}=t[1];try{const s=await D.divisionsApi.divisionsList(n,o,u,c,d);return O(s.status)?s.data:{}}catch(s){return console.log(s),{}}},E={filter:{name:"",id:0}},q=j(t=>({...E,setFilter:n=>t(()=>({filter:n})),clearFilter:()=>t(()=>({filter:{id:0,name:""}}))})),A=F.div`
  margin-bottom: 20px;
  border-radius: 16px;
  background-color: #f1f4f9;
`,_=({label:t="Ваше подразделение",...n})=>{const{filter:o,setFilter:u,clearFilter:c}=q(),[d,s]=S.useState(o.name||""),h=T(e=>e.role),p=C[h],g=localStorage.getItem("authToken")??"",{data:a,isLoading:m,isError:f}=P({queryKey:[x.getDivisions,{limit:10,offset:0,search:"",role:p,authToken:g}],queryFn:R,refetchOnWindowFocus:!1}),v=(e,i,y)=>{y==="clear"?(c(),s("")):i&&u({id:i.id,name:i.name})};let r=[];return m?r=[{id:-1,name:"Загрузка данных..."}]:f?r=[{id:-2,name:"Ошибка загрузки данных"}]:a!=null&&a.results&&(r=a.results.filter(e=>e.name!=="Соискатель")),l.jsx(A,{children:l.jsx(b,{multiple:!1,options:r,getOptionLabel:e=>e.name,value:o.name!=="Соискатель"&&r.find(e=>e.name===o.name)||null,inputValue:d,onInputChange:(e,i)=>s(i),onChange:v,isOptionEqualToValue:(e,i)=>e.id===i.id,noOptionsText:m?"Загрузка данных...":f?"Ошибка загрузки данных":"Нет данных",renderInput:e=>l.jsx(k,{...e,label:t&&p==="Студент"?"Ваш факультет":t,variant:"outlined",InputProps:{...e.InputProps,sx:{borderRadius:"16px"}}}),PaperComponent:e=>l.jsx(I,{...e,style:{borderRadius:"16px"}}),...n})})};export{_ as D,q as u};
