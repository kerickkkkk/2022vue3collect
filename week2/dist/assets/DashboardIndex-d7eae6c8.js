import{a as e}from"./axios-86558b18.js";import{u as h,i as d,r as m,k as f,o as k,c as _,t as g}from"./index-0d2c7fc0.js";const r={__name:"DashboardIndex",setup(v){const a=h(),o=d("$swal"),c="https://vue3-course-api.hexschool.io/v2/",i="vue3",n=m([]),u=()=>{e.post(`${c}/api/user/check`).then(({data:s})=>{s.success?l():(o("請重新登入"),a.push({name:"login"}))}).catch(s=>{var t;console.dir(s),o((t=s==null?void 0:s.response)==null?void 0:t.data),a.push({name:"login"})})},l=()=>{e.get(`${c}/api/${i}/admin/products/all`).then(({data:s})=>{console.log(s),n.value=[s.products]}).catch(s=>{var t;console.dir(s),o((t=s==null?void 0:s.response)==null?void 0:t.data)})};return f(()=>{var t;const s=(t=document.cookie.split("; ").find(p=>p.startsWith("ttShopToken=")))==null?void 0:t.split("=")[1];e.defaults.headers.common.Authorization=s,u()}),(s,t)=>(k(),_("div",null," 後臺首頁 "+g(n.value),1))}};export{r as default};