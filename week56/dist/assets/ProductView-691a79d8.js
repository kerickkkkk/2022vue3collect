import{A as w,u as $,j as S,k as B,i as V,r as d,m as j,o as r,c as p,b as t,B as M,x as i,w as z,v as N,d as c,y as P,t as T,z as v,g as U,p as A}from"./index-907ac9d8.js";const D={class:"container"},R=t("h3",{class:"text-center my-4"},"產品詳細",-1),q={class:"container"},E={class:"row mb-3 p-3"},H={class:"col-md-6 mb-3"},L={class:"slide__main"},F={class:"col-md-6 mb-3"},G={class:"text-primary mb-3"},I=t("p",null,"付款方式： ATM 、 信用卡",-1),J={class:"d-flex align-items-center mb-2"},K=t("div",{class:"me-2"},"數量:",-1),O={class:"btn-group me-3",role:"group","aria-label":"Basic checkbox toggle button group"},Q=["disabled"],W={class:"d-flex justify-content-end mb-2"},X={key:0,class:"text-primary ms-auto"},Y={class:"h4"},Z={class:"d-flex justify-content-end"},tt=["onClick"],ot={__name:"ProductView",setup(st){const m=w(),_=$(),b=S(),h=B(),{setLoading:l}=b,g=V("$swal"),{addCart:y}=h,o=d(1),f="https://vue3-course-api.hexschool.io/v2",x="vue3",e=d([]),k=n=>{l(!0),U.get(`${f}/api/${x}/product/${n}`).then(({data:s})=>{console.log(s),e.value=s.product,l(!1)}).catch(s=>{var a;l(!1),console.dir(s),g((a=s==null?void 0:s.response)==null?void 0:a.data)})},u=n=>{n==="minus"?o.value=o.value>0?o.value-1:0:n==="plus"&&(o.value+=1)},C=()=>{_.push({name:"cart"})};return j(()=>{const{id:n}=m.params;k(n)}),(n,s)=>(r(),p("div",D,[R,t("div",q,[t("div",E,[t("div",H,[t("div",L,[t("div",{class:"bg-cover img-fluid",style:M([`background-image: url(${e.value.imageUrl})`,{"min-height":"350px"}])},null,4)])]),t("div",F,[t("div",null,[t("h1",G,i(e.value.title),1),t("p",null,i(e.value.description),1),I,t("div",J,[K,t("div",O,[t("button",{disabled:o.value<2,type:"button",class:"btn btn-primary",onClick:s[0]||(s[0]=a=>u("minus"))}," - ",8,Q),z(t("input",{"onUpdate:modelValue":s[1]||(s[1]=a=>o.value=a),type:"number",min:"1",class:"form-control rounded-0",style:{width:"80px"}},null,512),[[N,o.value,void 0,{number:!0}]]),t("button",{type:"button",class:"btn btn-primary",onClick:s[2]||(s[2]=a=>u("plus"))}," + ")]),c(" "+i(e.value.unit),1)]),t("div",W,[t("div",{class:P({"text-decoration-line-through":e.value.origin_price!==e.value.price})}," 原價： "+i(e.value.origin_price)+" 元 ",3),e.value.origin_price!==e.value.price?(r(),p("div",X,[c(" 特價："),t("span",Y,i(e.value.price),1),c(" 元 ")])):T("",!0)]),t("div",Z,[t("div",{class:"btn btn-outline-primary me-2",onClick:s[3]||(s[3]=v(a=>A(y)(e.value.id,e.value.num),["prevent","stop"]))}," 加入購物車 "),t("button",{type:"button",class:"btn btn-primary",onClick:v(C,["prevent"])}," 直接結帳 ",8,tt)])])])])])]))}};export{ot as default};