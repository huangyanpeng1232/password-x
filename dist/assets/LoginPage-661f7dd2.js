import{s as _,g as v}from"./el-link-1e3f99fe.js";import{_ as C,u as M,n as D,p as R,a as q,r as k,o as x,q as L,b as c,d as o,w as n,f as g,e as f,t as N,F as O,a8 as B,v as U,I as z,J as A,R as I,S as P,G as $,l as J,a9 as T,aa as G,k as j,z as H}from"./index-c91b4279.js";const Q=""+new URL("backImg-584761fc.svg",import.meta.url).href;const W=i=>(T("data-v-2511e09e"),i=i(),G(),i),X=W(()=>c("img",{alt:"",class:"back-img",src:Q},null,-1)),Y={class:"content"},Z={class:"language-div"},ee={class:"content-input"},se={class:"title"},oe={class:"content-button"},te={__name:"LoginPage",setup(i){const{t,locale:u}=M(),y=D(),b=R(),S=q(),a=k({region:"",accessKeyId:"",accessKeySecret:"",bucket:""}),h=k({region:[{required:!0,message:t("login.form.region.verify"),trigger:"blur"}],accessKeyId:[{required:!0,message:t("login.form.accessKeyId.verify"),trigger:"blur"}],accessKeySecret:[{required:!0,message:t("login.form.accessKeySecret.verify"),trigger:"blur"}],bucket:[{required:!0,message:t("login.form.bucket.verify"),trigger:"blur"}]}),K=async s=>{await s.validate(e=>{e&&B(a).then(l=>{V(l)}).catch(l=>{w(l)})})},V=s=>{U.commit("setOss",s);let e=z(),l=A(e,JSON.stringify(a));localStorage.setItem("ossForm",l),I.success(t("login.form.successMessage")),b.push("/")},w=s=>{let e=s.code;s.code==="RequestError"?e=t("login.form.error.RequestError"):s.code==="InvalidAccessKeyId"?e=t("login.form.error.InvalidAccessKeyId"):s.code==="SignatureDoesNotMatch"?e=t("login.form.error.SignatureDoesNotMatch"):s.code==="AccessDenied"&&(e=t("login.form.error.AccessDenied")),I({type:"error",title:t("login.form.failMessage"),message:e})},p=s=>{u.value=s,_("language",s)};return(()=>{let s=v("language");s?p(s):navigator.language.toLowerCase()!=="zh-cn"&&(u.value="en-us",_("language","en-us"));let e=v("darkMode");if(e)y.value=e;else{let l=window.matchMedia("(prefers-color-scheme: dark)");l&&l.matches&&(y.value=!0,_("darkMode",!0))}})(),(s,e)=>{const l=P,d=j,m=H,E=$,F=J;return x(),L(O,null,[X,c("div",Y,[c("div",Z,[o(l,{type:g(u)==="zh-cn"?"primary":"default",onClick:e[0]||(e[0]=r=>p("zh-cn")),underline:!1},{default:n(()=>[f("简体中文 ")]),_:1},8,["type"]),f(" / "),o(l,{type:g(u)==="en-us"?"primary":"default",onClick:e[1]||(e[1]=r=>p("en-us")),underline:!1},{default:n(()=>[f("English ")]),_:1},8,["type"])]),c("div",ee,[c("div",se,N(g(t)("login.form.title")),1),o(E,{ref_key:"ruleFormRef",ref:S,rules:h,model:a},{default:n(()=>[o(m,{prop:"region"},{default:n(()=>[o(d,{modelValue:a.region,"onUpdate:modelValue":e[2]||(e[2]=r=>a.region=r),clearable:"",placeholder:"OSS region"},null,8,["modelValue"])]),_:1}),o(m,{prop:"accessKeyId"},{default:n(()=>[o(d,{modelValue:a.accessKeyId,"onUpdate:modelValue":e[3]||(e[3]=r=>a.accessKeyId=r),clearable:"",placeholder:"OSS accessKeyId"},null,8,["modelValue"])]),_:1}),o(m,{prop:"accessKeySecret"},{default:n(()=>[o(d,{modelValue:a.accessKeySecret,"onUpdate:modelValue":e[4]||(e[4]=r=>a.accessKeySecret=r),clearable:"",placeholder:"OSS accessKeySecret"},null,8,["modelValue"])]),_:1}),o(m,{prop:"bucket"},{default:n(()=>[o(d,{modelValue:a.bucket,"onUpdate:modelValue":e[5]||(e[5]=r=>a.bucket=r),clearable:"",placeholder:"OSS bucket"},null,8,["modelValue"])]),_:1})]),_:1},8,["rules","model"]),c("div",oe,[o(F,{type:"primary",style:{width:"100%"},onClick:e[6]||(e[6]=r=>K(g(S)))},{default:n(()=>[f("登录")]),_:1})])])])],64)}}},ne=C(te,[["__scopeId","data-v-2511e09e"]]);export{ne as default};
