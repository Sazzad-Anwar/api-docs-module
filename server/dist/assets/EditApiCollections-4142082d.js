import{u as w,r as s,a as S,j as e,L as n,E as C,_ as h}from"./index-d636466e.js";import{u as _,a as E,F as D,v as O}from"./store-ab03c28c.js";import{B as A}from"./index.esm-a54d09aa.js";import{A as I,D as P}from"./api-model-15bb46da.js";import{B as L}from"./index.esm-e312542a.js";import{H as T}from"./index.esm-c8eed678.js";import{V as z}from"./index.esm-a1cfe4f7.js";const B=s.lazy(()=>h(()=>import("./Modal-faf541c3.js"),["assets/Modal-faf541c3.js","assets/index-d636466e.js","assets/index-d8da892e.css"])),b=s.lazy(()=>h(()=>import("./Index-2a79cb25.js"),["assets/Index-2a79cb25.js","assets/index-d636466e.js","assets/index-d8da892e.css"]));function q(){var u;let{theme:f,toggleTheme:p}=_(),c=w(),[m,g]=s.useState("");s.useState(I);let[j,k]=s.useState(!1),[l,d]=s.useState(!1),r=E(),o=S(),v=a=>{var x;let t=JSON.parse(a),N=(x=t==null?void 0:t.routes)==null?void 0:x.map(i=>({...i,id:(i==null?void 0:i.id)??O()})),y={id:t==null?void 0:t.id,collectionName:t==null?void 0:t.collectionName,baseUrl:t==null?void 0:t.baseUrl,routes:N};g(JSON.stringify(y)),k(!0)};return e.jsxs("div",{className:"h-screen w-full dark:bg-dark-primary-50 relative",children:[e.jsx("button",{onClick:p,className:"absolute right-5 top-5 dark:text-white z-10",children:f==="dark"?e.jsx(D,{}):e.jsx(A,{})}),e.jsxs("div",{className:"container mx-auto pt-10",children:[e.jsxs("div",{className:"flex items-center justify-between mb-5",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("button",{onClick:()=>{c(-1)},className:"font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded pr-2  font-medium active:scale-95  mr-2",children:e.jsx(L,{className:"text-dark dark:text-white",size:25})}),e.jsx("h1",{className:"text-xl dark:text-gray-200 font-medium mb-0",children:"Update API collection"})]}),e.jsxs("button",{className:"font-base flex items-center cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 justify-self-end rounded border border-gray-200 px-2 bg-blue-600 font-medium hover:shadow-lg active:scale-95 dark:border-blue-600 text-white ml-2",onClick:()=>d(!0),children:[e.jsx(T,{size:20,className:"mr-1"}),e.jsx("span",{className:"hidden lg:block",children:"Show structure"})]})]}),e.jsx(s.Suspense,{fallback:e.jsx(n,{}),children:e.jsx(b,{jsonData:(u=r==null?void 0:r.apiCollections)==null?void 0:u.find(a=>(a==null?void 0:a.id)===(o==null?void 0:o.id)),readOnly:!1,height:"80vh",setData:v})}),e.jsx("button",{disabled:!j,onClick:()=>{m!==""&&(r.updateApiCollection(m),c(C.API_COLLECTIONS))},className:"font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded border border-gray-200 px-14 bg-blue-600 font-medium hover:shadow-lg active:scale-95 dark:border-blue-600 text-white mt-3 disabled:dark:border-blue-900 disabled:bg-blue-600 disabled:bg-opacity-20 disabled:text-gray-400 disabled:cursor-not-allowed disabled:active:scale-100",children:"Save"})]}),e.jsx(s.Suspense,{fallback:e.jsx(n,{}),children:e.jsx(B,{isOpen:l,onClose:()=>d(!l),children:e.jsxs("div",{className:"dark:bg-dark-primary-50 p-5 w-[60vw] bg-white",children:[e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsx("h1",{className:"text-lg font-medium dark:text-white",children:"Sample structure of data to make an API docs"}),e.jsx("button",{onClick:()=>d(!l),className:"p-2 rounded-full dark:hover:bg-dark-primary-40 dark:text-white",children:e.jsx(z,{})})]}),e.jsx("div",{className:"mt-4",children:e.jsx(s.Suspense,{fallback:e.jsx(n,{}),children:e.jsx(b,{jsonData:P,readOnly:!0,height:"60vh",width:"58vw"})})})]})})})]})}export{q as default};
