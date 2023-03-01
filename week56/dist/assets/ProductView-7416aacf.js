import{p as g,h as y,i as f,r as x,j as k,o as d,c as u,b as t,q as C,t as i,w,v as $,e as l,n as S,m as V,d as r}from"./index-1c637fa1.js";import{a as j}from"./axios-86558b18.js";const B={class:"container"},M=t("h3",{class:"text-center my-4"},"產品詳細",-1),N={class:"container"},P={class:"row mb-3 p-3"},T={class:"col-md-6 mb-3"},U={class:"slide__main"},z={class:"col-md-6 mb-3"},D={class:"text-primary mb-3"},H=t("p",null,"付款方式： ATM 、 信用卡",-1),q={class:"d-flex align-items-center mb-2"},A=t("div",{class:"me-2"},"數量:",-1),E={class:"btn-group me-3",role:"group","aria-label":"Basic checkbox toggle button group"},L=["disabled"],R={class:"d-flex justify-content-end mb-2"},F={key:0,class:"text-primary ms-auto"},G={class:"h4"},I={class:"d-flex justify-content-end"},J=["onClick"],W={__name:"ProductView",setup(K){const p=g(),m=y(),{setLoading:a}=m,v=f("$swal"),_="https://vue3-course-api.hexschool.io/v2",b="vue3",e=x([]),h=n=>{a(!0),j.get(`${_}/api/${b}/product/${n}`).then(({data:s})=>{console.log(s),e.value=s.product,a(!1)}).catch(s=>{var o;a(!1),console.dir(s),v((o=s==null?void 0:s.response)==null?void 0:o.data)})},c=()=>{};return k(()=>{const{id:n}=p.params;h(n)}),(n,s)=>(d(),u("div",B,[M,t("div",N,[t("div",P,[t("div",T,[t("div",U,[t("div",{class:"bg-cover img-fluid",style:C([`background-image: url(${e.value.imageUrl})`,{"min-height":"350px"}])},null,4)])]),t("div",z,[t("div",null,[t("h1",D,i(e.value.title),1),t("p",null,i(e.value.description),1),H,t("div",q,[A,t("div",E,[t("button",{disabled:e.value.num<2,type:"button",class:"btn btn-primary",onClick:s[0]||(s[0]=o=>n.numCountHandler("minus"))}," - ",8,L),w(t("input",{"onUpdate:modelValue":s[1]||(s[1]=o=>e.value.num=o),type:"number",min:"1",class:"form-control rounded-0",style:{width:"80px"}},null,512),[[$,e.value.num,void 0,{number:!0}]]),t("button",{type:"button",class:"btn btn-primary",onClick:s[2]||(s[2]=o=>n.numCountHandler("pluse"))}," + ")]),l(" "+i(e.value.unit),1)]),t("div",R,[t("div",{class:S({"text-decoration-line-through":e.value.origin_price!==e.value.price})}," 原價： "+i(e.value.origin_price)+" 元 ",3),e.value.origin_price!==e.value.price?(d(),u("div",F,[l(" 特價："),t("span",G,i(e.value.price),1),l(" 元 ")])):V("",!0)]),t("div",I,[t("div",{class:"btn btn-outline-primary me-2",onClick:r(c,["prevent","stop"])}," 加入購物車 ",8,J),t("button",{type:"button",class:"btn btn-primary",onClick:s[3]||(s[3]=r(o=>c(),["prevent"]))}," 直接結帳 ")])])])])])]))}};export{W as default};