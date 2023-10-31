import{s as M,l as L,n as N,c as A,F as O,G as U,g as K,b as P}from"./element-plus-f0301b72.js";import{_ as z}from"./backImg-a3b16eec.js";import{_ as $,j as G,g as J,e as T,c as y,k}from"./index-ef15e1da.js";import{u as j,b as Q}from"./vue-router-e948df84.js";import{u as X}from"./vue-i18n-63343f04.js";import{h as H}from"./@vueuse-1b6f7037.js";import{r as W,X as I,o as Y,c as Z,a as c,S as r,J as s,u as f,P as i,Q as ee,R as oe,ar as te,as as re}from"./@vue-054857f9.js";import"./lodash-es-f5bdeb48.js";import"./async-validator-dee29e8b.js";import"./@element-plus-7b906f9a.js";import"./@ctrl-f8748455.js";import"./@popperjs-c75af06c.js";import"./escape-html-cf2a8097.js";import"./ali-oss-21f5c855.js";import"./normalize-wheel-es-ed76fb12.js";import"./vuex-90336bc0.js";import"./cos-js-sdk-v5-31c61e27.js";import"./js-md5-11f5a111.js";import"./crypto-js-d55471a7.js";import"./@intlify-9ddbe450.js";const se=m=>(te("data-v-043c0cef"),m=m(),re(),m),ae=se(()=>c("img",{alt:"",class:"back-img",src:z},null,-1)),le={class:"content"},ne={class:"language-div"},ie={class:"content-input"},ce={class:"title"},ue={class:"content-button"},de={class:"oss-register-doc"},me={__name:"LoginPage",setup(m){const{t:l,locale:p}=X(),b=H(),E=j(),u=Q(),v=W(),o=I({type:"cos",region:"",keyId:"",keySecret:"",bucket:""}),h=I({region:[{required:!0,message:l("login.form.region.verify"),trigger:"blur"}],keyId:[{required:!0,message:l("login.form.accessKeyId.verify"),trigger:"blur"}],keySecret:[{required:!0,message:l("login.form.accessKeySecret.verify"),trigger:"blur"}],bucket:[{required:!0,message:l("login.form.bucket.verify"),trigger:"blur"}]}),V=async()=>{window.open("https://gitee.com/password-x/password-x/wikis/%E9%98%BF%E9%87%8C%E4%BA%91%E8%B4%A6%E5%8F%B7%E6%93%8D%E4%BD%9C%E6%8C%87%E5%BC%95")},C=async t=>{await t.validate(e=>{e&&G(o).then(n=>{F()}).catch(n=>{w(n)})})},F=()=>{let t=J(),e=T(t,JSON.stringify(o));y("cacheDatabaseForm")!==!1&&localStorage.setItem("databaseForm",e),E.push("/")},w=t=>{console.error(t);let e;t.code==="RequestError"?e=l("login.form.error.RequestError"):t.code==="InvalidAccessKeyId"?e=l("login.form.error.InvalidAccessKeyId"):t.code==="SignatureDoesNotMatch"?e=l("login.form.error.SignatureDoesNotMatch"):t.code==="AccessDenied"?e=l("login.form.error.AccessDenied"):e=t.code,M({type:"error",title:l("login.form.failMessage"),message:e})},_=t=>{p.value=t,k("language",t)},D=()=>{let t=y("language");t?_(t):navigator.language.toLowerCase()!=="zh-cn"&&(p.value="en-us",k("language","en-us"));let e=y("darkMode");if(e)b.value=e;else{let n=window.matchMedia("(prefers-color-scheme: dark)");n&&n.matches&&(b.value=!0,k("darkMode",!0))}},B=()=>{o.type=u.query.type||"oss",o.region=u.query.region||"",o.keyId=u.query.keyId||"",o.keySecret=u.query.keySecret||"",o.bucket=u.query.bucket||""};return D(),B(),(t,e)=>{const n=L,S=O,q=U,d=K,g=P,R=N,x=A;return Y(),Z(oe,null,[ae,c("div",le,[c("div",ne,[r(n,{type:f(p)==="zh-cn"?"primary":"default",onClick:e[0]||(e[0]=a=>_("zh-cn")),underline:!1},{default:s(()=>[i("简体中文 ")]),_:1},8,["type"]),i(" / "),r(n,{type:f(p)==="en-us"?"primary":"default",onClick:e[1]||(e[1]=a=>_("en-us")),underline:!1},{default:s(()=>[i("English ")]),_:1},8,["type"])]),c("div",ie,[c("div",ce,ee(f(l)("login.form.title")),1),r(R,{ref_key:"ruleFormRef",ref:v,model:o,rules:h},{default:s(()=>[r(d,{prop:"type"},{default:s(()=>[r(q,{modelValue:o.type,"onUpdate:modelValue":e[2]||(e[2]=a=>o.type=a),style:{margin:"0 auto"}},{default:s(()=>[r(S,{label:"oss"},{default:s(()=>[i("阿里OSS")]),_:1}),r(S,{label:"cos"},{default:s(()=>[i("腾讯COS")]),_:1})]),_:1},8,["modelValue"])]),_:1}),r(d,{prop:"region"},{default:s(()=>[r(g,{modelValue:o.region,"onUpdate:modelValue":e[3]||(e[3]=a=>o.region=a),clearable:"",placeholder:"region"},null,8,["modelValue"])]),_:1}),r(d,{prop:"keyId"},{default:s(()=>[r(g,{modelValue:o.keyId,"onUpdate:modelValue":e[4]||(e[4]=a=>o.keyId=a),clearable:"",placeholder:"keyId"},null,8,["modelValue"])]),_:1}),r(d,{prop:"keySecret"},{default:s(()=>[r(g,{modelValue:o.keySecret,"onUpdate:modelValue":e[5]||(e[5]=a=>o.keySecret=a),clearable:"",placeholder:"keySecret"},null,8,["modelValue"])]),_:1}),r(d,{prop:"bucket"},{default:s(()=>[r(g,{modelValue:o.bucket,"onUpdate:modelValue":e[6]||(e[6]=a=>o.bucket=a),clearable:"",placeholder:"bucket"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"]),c("div",ue,[r(x,{type:"primary",style:{width:"100%"},onClick:e[7]||(e[7]=a=>C(f(v)))},{default:s(()=>[i("登录")]),_:1})]),c("div",de,[r(n,{type:"primary",onClick:V},{default:s(()=>[i("阿里云OSS注册指引")]),_:1})])])])],64)}}},xe=$(me,[["__scopeId","data-v-043c0cef"]]);export{xe as default};
