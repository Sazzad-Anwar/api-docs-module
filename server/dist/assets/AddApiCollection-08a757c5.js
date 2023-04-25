import{u as w,r as s,j as e,L as l,E as S,_ as m}from"./index-301d79d5.js";import{u as C,a as _,F as A,v as n}from"./store-8c480382.js";import{B as D}from"./index.esm-72aefc5a.js";import{A as E,D as O}from"./api-model-15bb46da.js";import{B as I}from"./index.esm-5ba25bfc.js";import{H as L}from"./index.esm-1bc7e219.js";import{V as P}from"./index.esm-3bf85d86.js";const T=s.lazy(()=>m(()=>import("./Modal-27e6e408.js"),["assets/Modal-27e6e408.js","assets/index-301d79d5.js","assets/index-d8da892e.css"])),c=s.lazy(()=>m(()=>import("./Index-229f1c9e.js"),["assets/Index-229f1c9e.js","assets/index-301d79d5.js","assets/index-d8da892e.css"]));function U(){let{theme:u,toggleTheme:x}=C(),i=w(),[o,b]=s.useState(""),[h]=s.useState(E),[f,p]=s.useState(!1),[a,r]=s.useState(!1),j=_(),g=k=>{var d;let t=JSON.parse(k),v=(d=t==null?void 0:t.routes)==null?void 0:d.map(y=>({...y,id:n()})),N={id:n(),collectionName:t==null?void 0:t.collectionName,baseUrl:t==null?void 0:t.baseUrl,routes:v};b(JSON.stringify(N)),p(!0)};return e.jsxs("div",{className:"h-screen w-full dark:bg-dark-primary-50 relative",children:[e.jsx("button",{onClick:x,className:"absolute right-5 top-5 dark:text-white z-10",children:u==="dark"?e.jsx(A,{}):e.jsx(D,{})}),e.jsxs("div",{className:"container mx-auto pt-10",children:[e.jsxs("div",{className:"flex items-center justify-between mb-5",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("button",{onClick:()=>{i(-1)},className:"font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded pr-2  font-medium active:scale-95  mr-2",children:e.jsx(I,{className:"text-dark dark:text-white",size:25})}),e.jsx("h1",{className:"text-xl dark:text-gray-200 font-medium mb-0",children:"Create API collection:"})]}),e.jsxs("button",{className:"font-base flex items-center cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 justify-self-end rounded border border-gray-200 px-2 bg-blue-600 font-medium hover:shadow-lg active:scale-95 dark:border-blue-600 text-white ml-2",onClick:()=>r(!0),children:[e.jsx(L,{size:20,className:"mr-1"}),e.jsx("span",{className:"hidden lg:block",children:"Show structure"})]})]}),e.jsx(s.Suspense,{fallback:e.jsx(l,{}),children:e.jsx(c,{jsonData:h,readOnly:!1,height:"80vh",setData:g})}),e.jsx("button",{disabled:!f,onClick:()=>{o!==""&&(j.addApiCollection(o),i(S.API_COLLECTIONS))},className:"font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded border border-gray-200 px-14 bg-blue-600 font-medium hover:shadow-lg active:scale-95 dark:border-blue-600 text-white mt-3 disabled:dark:border-blue-900 disabled:bg-blue-600 disabled:bg-opacity-20 disabled:text-gray-400 disabled:cursor-not-allowed disabled:active:scale-100",children:"Save"})]}),e.jsx(s.Suspense,{fallback:e.jsx(l,{}),children:e.jsx(T,{isOpen:a,onClose:()=>r(!a),children:e.jsxs("div",{className:"dark:bg-dark-primary-50 p-5 w-[60vw] bg-white",children:[e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsx("h1",{className:"text-lg font-medium dark:text-white",children:"Sample structure of data to make an API docs"}),e.jsx("button",{onClick:()=>r(!a),className:"p-2 rounded-full dark:hover:bg-dark-primary-40 dark:text-white",children:e.jsx(P,{})})]}),e.jsx("div",{className:"mt-4",children:e.jsx(s.Suspense,{fallback:e.jsx(l,{}),children:e.jsx(c,{jsonData:O,readOnly:!0,height:"60vh",width:"58vw"})})})]})})})]})}export{U as default};