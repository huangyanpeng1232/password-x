import{s as L,o as M,m as N,c as A,F as U,G as O,g as K,b as P}from"./element-plus-19fbf28c.js";import{_ as z,h as $,g as G,e as J,b as y,j as k}from"./index-a077addd.js";import{u as T,b as j}from"./vue-router-c2e97886.js";import{u as Q}from"./vue-i18n-3214f365.js";import{h as X}from"./@vueuse-9ffc2ac5.js";import{r as H,X as I,o as W,c as Y,a as c,S as r,J as s,u as f,P as i,Q as Z,R as ee,aq as oe,ar as te}from"./@vue-8e6a53e5.js";import"./lodash-es-f5bdeb48.js";import"./async-validator-dee29e8b.js";import"./@element-plus-169d18e8.js";import"./@ctrl-f8748455.js";import"./@popperjs-c75af06c.js";import"./escape-html-cf2a8097.js";import"./ali-oss-21f5c855.js";import"./normalize-wheel-es-ed76fb12.js";import"./vuex-7c7bb3a2.js";import"./cos-js-sdk-v5-31c61e27.js";import"./js-md5-11f5a111.js";import"./crypto-js-d55471a7.js";import"./@intlify-6e8dbf92.js";const re=""+new URL("backImg-584761fc.svg",import.meta.url).href;const se=m=>(oe("data-v-043c0cef"),m=m(),te(),m),ae=se(()=>c("img",{alt:"",class:"back-img",src:re},null,-1)),le={class:"content"},ne={class:"language-div"},ie={class:"content-input"},ce={class:"title"},ue={class:"content-button"},de={class:"oss-register-doc"},me={__name:"LoginPage",setup(m){const{t:l,locale:p}=Q(),b=X(),h=T(),u=j(),v=H(),o=I({type:"cos",region:"",keyId:"",keySecret:"",bucket:""}),E=I({region:[{required:!0,message:l("login.form.region.verify"),trigger:"blur"}],keyId:[{required:!0,message:l("login.form.accessKeyId.verify"),trigger:"blur"}],keySecret:[{required:!0,message:l("login.form.accessKeySecret.verify"),trigger:"blur"}],bucket:[{required:!0,message:l("login.form.bucket.verify"),trigger:"blur"}]}),V=async()=>{window.open("https://gitee.com/password-x/password-x/wikis/%E9%98%BF%E9%87%8C%E4%BA%91%E8%B4%A6%E5%8F%B7%E6%93%8D%E4%BD%9C%E6%8C%87%E5%BC%95")},w=async t=>{await t.validate(e=>{e&&$(o).then(n=>{C()}).catch(n=>{F(n)})})},C=()=>{let t=G(),e=J(t,JSON.stringify(o));y("cacheDatabaseForm")!==!1&&localStorage.setItem("databaseForm",e),h.push("/")},F=t=>{console.error(t);let e;t.code==="RequestError"?e=l("login.form.error.RequestError"):t.code==="InvalidAccessKeyId"?e=l("login.form.error.InvalidAccessKeyId"):t.code==="SignatureDoesNotMatch"?e=l("login.form.error.SignatureDoesNotMatch"):t.code==="AccessDenied"?e=l("login.form.error.AccessDenied"):e=t.code,L({type:"error",title:l("login.form.failMessage"),message:e})},_=t=>{p.value=t,k("language",t)},D=()=>{let t=y("language");t?_(t):navigator.language.toLowerCase()!=="zh-cn"&&(p.value="en-us",k("language","en-us"));let e=y("darkMode");if(e)b.value=e;else{let n=window.matchMedia("(prefers-color-scheme: dark)");n&&n.matches&&(b.value=!0,k("darkMode",!0))}},q=()=>{o.type=u.query.type||"oss",o.region=u.query.region||"",o.keyId=u.query.keyId||"",o.keySecret=u.query.keySecret||"",o.bucket=u.query.bucket||""};return D(),q(),(t,e)=>{const n=M,S=U,B=O,d=K,g=P,R=N,x=A;return W(),Y(ee,null,[ae,c("div",le,[c("div",ne,[r(n,{type:f(p)==="zh-cn"?"primary":"default",onClick:e[0]||(e[0]=a=>_("zh-cn")),underline:!1},{default:s(()=>[i("简体中文 ")]),_:1},8,["type"]),i(" / "),r(n,{type:f(p)==="en-us"?"primary":"default",onClick:e[1]||(e[1]=a=>_("en-us")),underline:!1},{default:s(()=>[i("English ")]),_:1},8,["type"])]),c("div",ie,[c("div",ce,Z(f(l)("login.form.title")),1),r(R,{ref_key:"ruleFormRef",ref:v,model:o,rules:E},{default:s(()=>[r(d,{prop:"type"},{default:s(()=>[r(B,{modelValue:o.type,"onUpdate:modelValue":e[2]||(e[2]=a=>o.type=a),style:{margin:"0 auto"}},{default:s(()=>[r(S,{label:"oss"},{default:s(()=>[i("阿里OSS")]),_:1}),r(S,{label:"cos"},{default:s(()=>[i("腾讯COS")]),_:1})]),_:1},8,["modelValue"])]),_:1}),r(d,{prop:"region"},{default:s(()=>[r(g,{modelValue:o.region,"onUpdate:modelValue":e[3]||(e[3]=a=>o.region=a),clearable:"",placeholder:"region"},null,8,["modelValue"])]),_:1}),r(d,{prop:"keyId"},{default:s(()=>[r(g,{modelValue:o.keyId,"onUpdate:modelValue":e[4]||(e[4]=a=>o.keyId=a),clearable:"",placeholder:"keyId"},null,8,["modelValue"])]),_:1}),r(d,{prop:"keySecret"},{default:s(()=>[r(g,{modelValue:o.keySecret,"onUpdate:modelValue":e[5]||(e[5]=a=>o.keySecret=a),clearable:"",placeholder:"keySecret"},null,8,["modelValue"])]),_:1}),r(d,{prop:"bucket"},{default:s(()=>[r(g,{modelValue:o.bucket,"onUpdate:modelValue":e[6]||(e[6]=a=>o.bucket=a),clearable:"",placeholder:"bucket"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"]),c("div",ue,[r(x,{type:"primary",style:{width:"100%"},onClick:e[7]||(e[7]=a=>w(f(v)))},{default:s(()=>[i("登录")]),_:1})]),c("div",de,[r(n,{type:"primary",onClick:V},{default:s(()=>[i("阿里云OSS注册指引")]),_:1})])])])],64)}}},Re=z(me,[["__scopeId","data-v-043c0cef"]]);export{Re as default};
