import{u as v,i as h,r as a,a as b,o as w,c as V,b as e,w as r,v as n,d as E,e as u,f as g,g as k}from"./index-0d2c7fc0.js";import{a as B}from"./axios-86558b18.js";const T=e("h2",null,"註冊",-1),U={class:"bg-light p-4"},x={class:"mb-3"},R=e("label",{for:"email",class:"form-label"},"信箱",-1),y={class:"mb-3"},A=e("label",{for:"password",class:"form-label"},"輸入密碼",-1),I={class:"mb-3"},P=e("label",{for:"confirmPassword",class:"form-label"},"輸入確認密碼",-1),C=["onClick"],S={__name:"RegisterView",setup(D){const p=v(),i=h("$swal"),{VITE_BASE_URL:m}={VITE_BASE_URL:"https://vue3-course-api.hexschool.io/v2/",VITE_PATH:"vue3",VITE_GITHUB_BASE_URL:"/2022vue3collect/week3/dist",BASE_URL:"/2022vue3collect/week2/dist",MODE:"production",DEV:!1,PROD:!0},t=a(""),l=a(""),c=a(""),_=()=>{const d={email:t.value,password:l.value};B.post(`${m}/register`,d).then(()=>{i("註冊成功!").then(()=>{p.push({name:"login"})})}).catch(s=>{i(s.response.data)})};return(d,s)=>{const f=b("router-link");return w(),V("div",null,[T,e("form",U,[e("div",x,[R,r(e("input",{"onUpdate:modelValue":s[0]||(s[0]=o=>t.value=o),type:"email",class:"form-control",id:"email","aria-describedby":"emailHelp",placeholder:"請輸入信箱"},null,512),[[n,t.value]])]),e("div",y,[A,r(e("input",{"onUpdate:modelValue":s[1]||(s[1]=o=>l.value=o),type:"password",class:"form-control",id:"password",placeholder:"請輸入密碼"},null,512),[[n,l.value]])]),e("div",I,[P,r(e("input",{"onUpdate:modelValue":s[2]||(s[2]=o=>c.value=o),type:"password",class:"form-control",id:"confirmPassword",placeholder:"請再次輸入"},null,512),[[n,c.value]])]),e("button",{onClick:E(_,["prevent"]),type:"submit",class:"btn btn-primary"}," 送出 ",8,C),e("div",null,[u(" 有帳號嗎？ "),g(f,{to:"/login"},{default:k(()=>[u("登入")]),_:1})])])])}}};export{S as default};
