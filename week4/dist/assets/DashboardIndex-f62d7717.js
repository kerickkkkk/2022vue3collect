import{a as p}from"./axios-86558b18.js";import{u as S,i as $,r as b,k as D,o as n,c as i,e as d,b as t,F as r,l as x,t as a,m as P,p as B,n as C}from"./index-24e81ba4.js";import{_ as N}from"./plugin-vueexport-helper-c27b6911.js";const m=l=>(B("data-v-ca08ea93"),l=l(),C(),l),U={class:"container"},V={class:"row py-3"},j={class:"col-md-6"},F=m(()=>t("h2",null,"產品列表",-1)),L={class:"table table-hover mt-4"},T=m(()=>t("thead",null,[t("tr",null,[t("th",{width:"150"},"產品名稱"),t("th",{width:"120"},"原價"),t("th",{width:"120"},"售價"),t("th",{width:"150"},"是否啟用"),t("th",{width:"120"},"查看細節")])],-1)),z={width:"150"},A={width:"120"},E={width:"120"},M={width:"150"},O={key:0,class:"text-success"},R={key:1},W={width:"120"},q=["onClick"],G={class:"col-md-6"},H=m(()=>t("h2",null,"單一產品細節",-1)),J={class:"card mb-3"},K=["src"],Q={class:"card-body"},X={class:"card-title"},Y={class:"badge bg-primary ms-2"},Z={class:"card-text"},tt={class:"card-text"},st={class:"d-flex"},et={class:"card-text me-2"},ot={class:"card-text text-secondary"},at=["src"],ct={key:1,class:"text-secondary"},nt={__name:"DashboardIndex",setup(l){const v=S(),u=$("$swal"),g="https://vue3-course-api.hexschool.io/v2",k="vue3",_=b([]),e=b({}),w=()=>{p.post(`${g}/api/user/check`).then(({data:s})=>{s.success?f():(u("請重新登入"),v.push({name:"login"}))}).catch(s=>{var o;console.dir(s),u((o=s==null?void 0:s.response)==null?void 0:o.data),v.push({name:"login"})})},f=()=>{p.get(`${g}/api/${k}/admin/products/all`).then(({data:s})=>{_.value=Object.values(s.products)}).catch(s=>{var o;console.dir(s),u((o=s==null?void 0:s.response)==null?void 0:o.data)})},I=s=>{e.value=_.value.find(o=>o.id===s)};return D(()=>{var o;const s=(o=document.cookie.split("; ").find(h=>h.startsWith("ttShopToken=")))==null?void 0:o.split("=")[1];p.defaults.headers.common.Authorization=s,w()}),(s,o)=>{var h,y;return n(),i("div",null,[d(" 後臺首頁 "),t("div",U,[t("div",V,[t("div",j,[F,t("table",L,[T,t("tbody",null,[(n(!0),i(r,null,x(_.value,c=>(n(),i("tr",{key:c.id},[t("td",z,a(c.title),1),t("td",A,a(c.origin_price),1),t("td",E,a(c.price),1),t("td",M,[c.is_enabled?(n(),i("span",O,"啟用")):(n(),i("span",R,"未啟用"))]),t("td",W,[t("button",{onClick:it=>I(c.id),type:"button",class:"btn btn-primary"}," 查看細節 ",8,q)])]))),128))])]),t("p",null,[d(" 目前有 "),t("span",null,a(_.value.length),1),d(" 項產品 ")])]),t("div",G,[H,e.value.id?(n(),i(r,{key:0},[t("div",J,[t("img",{src:e.value.imageUrl,class:"card-img-top primary-image",alt:"主圖"},null,8,K),t("div",Q,[t("h5",X,[d(a(e.value.title)+" ",1),t("span",Y,a(),1)]),t("p",Z,"商品描述："+a(e.value.description),1),t("p",tt,"商品內容："+a(e.value.content),1),t("div",st,[t("p",et,a(e.value.price),1),t("p",ot,[t("del",null,a(e.value.origin_price),1)]),d(" 元 / "+a(e.value.unit),1)])])]),((y=(h=e.value)==null?void 0:h.imagesUrl)==null?void 0:y.length)>0?(n(!0),i(r,{key:0},x(e.value.imagesUrl,c=>(n(),i("img",{src:c,key:c,alt:"image",class:"images m-2"},null,8,at))),128)):P("",!0)],64)):(n(),i("p",ct,"請選擇一個商品查看"))])])])])}}},ht=N(nt,[["__scopeId","data-v-ca08ea93"]]);export{ht as default};
