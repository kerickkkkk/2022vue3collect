import{h as y,i as U,r,j as k,a as u,o as w,c as q,f as t,g as C,b as l,n as m,w as F,v as S}from"./index-1c637fa1.js";import{a as B}from"./axios-86558b18.js";const E={class:"container"},$=l("h3",null,"驗證區塊",-1),j={class:"mb-3"},M=l("label",{for:"name",class:"form-label"},"姓名",-1),N={class:"mb-3"},O=l("label",{for:"email",class:"form-label"},"Email",-1),P={class:"mb-3"},z=l("label",{for:"tel",class:"form-label"},"電話",-1),D={class:"mb-3"},L=l("label",{for:"address",class:"form-label"},"地址",-1),T={class:"mb-3"},A=l("label",{for:"message",class:"form-label"},"留言",-1),G=l("button",{class:"btn btn-primary",type:"submit"},"送出訂單",-1),K={__name:"CartView",setup(H){const p=y(),{setLoading:c}=p,v=U("$swal"),b="https://vue3-course-api.hexschool.io/v2",_="vue3",f=r([]),V=r(null),s=r({name:"",email:"",tel:"",address:"",msg:""}),g=()=>{c(!0),B.get(`${b}/api/${_}/products?page=1`).then(({data:o})=>{console.log(o),c(!1),f.value=o.products,V.value=o.pagination}).catch(o=>{var e;c(!1),console.dir(o),v((e=o==null?void 0:o.response)==null?void 0:e.data)})},h=()=>{console.log("submitOrder")};return k(()=>{g()}),(o,e)=>{const n=u("VField"),d=u("error-message"),x=u("VForm");return w(),q("div",E,[$,t(x,{onSubmit:h},{default:C(({errors:i})=>[l("div",j,[M,t(n,{modelValue:s.value.name,"onUpdate:modelValue":e[0]||(e[0]=a=>s.value.name=a),id:"name",name:"姓名",type:"text",class:m(["form-control",{"is-invalid":i.姓名}]),placeholder:"請輸入 姓名",rules:"required"},null,8,["modelValue","class"]),t(d,{name:"姓名",class:"invalid-feedback"})]),l("div",N,[O,t(n,{modelValue:s.value.email,"onUpdate:modelValue":e[1]||(e[1]=a=>s.value.email=a),id:"email",name:"email",type:"email",class:m(["form-control",{"is-invalid":i.email}]),placeholder:"請輸入 Email",rules:"email|required"},null,8,["modelValue","class"]),t(d,{name:"email",class:"invalid-feedback"})]),l("div",P,[z,t(n,{modelValue:s.value.tel,"onUpdate:modelValue":e[2]||(e[2]=a=>s.value.tel=a),id:"tel",name:"電話",type:"tel",class:m(["form-control",{"is-invalid":i.電話}]),placeholder:"請輸入 電話",rules:"required|min:8|max:10"},null,8,["modelValue","class"]),t(d,{name:"電話",class:"invalid-feedback"})]),l("div",D,[L,t(n,{modelValue:s.value.address,"onUpdate:modelValue":e[3]||(e[3]=a=>s.value.address=a),id:"address",name:"地址",type:"text",class:m(["form-control",{"is-invalid":i.地址}]),placeholder:"請輸入 地址",rules:"required"},null,8,["modelValue","class"]),t(d,{modelValue:s.value.address,"onUpdate:modelValue":e[4]||(e[4]=a=>s.value.address=a),name:"地址",class:"invalid-feedback"},null,8,["modelValue"])]),l("div",T,[A,F(l("textarea",{"onUpdate:modelValue":e[5]||(e[5]=a=>s.value.msg=a),class:"form-control",id:"message",placeholder:"請輸入 留言","aria-describedby":"message"},null,512),[[S,s.value.msg]])]),G]),_:1})])}}};export{K as default};