import{E as Te}from"./exceljs-dbdf17c5.js";import{F as Ae}from"./file-saver-14352d00.js";import{h as we}from"./moment-fbc5633a.js";import{u as te}from"./vue-i18n-4c151794.js";import{E as Z,a as Be,b as re,c as de,d as ve,e as bt,f as yt,g as he,h as Ye,i as Fe,j as Ee,k as xe,l as je,m as Re,n as vt,o as ht,p as Ue,q as xt,r as Pt,s as Oe,t as kt,u as Ct,v as St,w as Vt,x as Tt,y as Mt,z as Ft,A as Et,B as Rt,C as Ut,D as It}from"./element-plus-18f066c9.js";import{r as S,o as C,c as G,X as W,I as N,J as l,a as z,S as t,P,Q as k,u as e,A as oe,R as X,ai as se,b as We,O as B,ab as Ie,aj as Ge,w as ze,ap as Nt,aq as Dt}from"./@vue-b476408c.js";import{d as ne,s as Q,g as ge,a as $e,e as _e,_ as He,p as Je,b as Ke}from"./index-16619a76.js";import{u as At}from"./vue-router-db39d86c.js";import{l as Xe,u as zt,g as be,c as Me,r as $t,i as Lt}from"./global-a76afce6.js";import{m as Bt}from"./js-md5-80305e46.js";import"./crypto-js-0173151c.js";import{h as Yt}from"./@vueuse-e77020a1.js";import{m as jt,u as Ot,n as Le,o as Wt,v as Gt,h as Ht,r as Jt}from"./@element-plus-deb668f5.js";import"./ali-oss-85314bd4.js";import"./@intlify-6e8dbf92.js";import"./lodash-es-f5bdeb48.js";import"./async-validator-dee29e8b.js";import"./@ctrl-f8748455.js";import"./@popperjs-c75af06c.js";import"./escape-html-900e7f0d.js";import"./normalize-wheel-es-ed76fb12.js";import"./vuex-ea406d73.js";const Kt={__name:"ImportExport",emits:["importComplete"],setup(J,{expose:_,emit:j}){const{t:g}=te(),b=j,r=S(),x=S(),w=S(0),R=n=>{r.value.click(),x.value=n},c=async()=>{if(r.value.files===0)return;w.value=Date.now();const n=new Te.Workbook;n.xlsx.load(r.value.files[0]).then(()=>{n.eachSheet(function(d){if(d.rowCount<2){Z.error(g("importExport.data.empty")),r.value.value="";return}let a=[];for(let o=2;o<=d.rowCount;o++){let i=d.getRow(o),p=s(i.getCell(1).value),y=s(i.getCell(2).value),$=s(i.getCell(3).value),T=s(i.getCell(4).value),D=s(i.getCell(5).value),Y=s(i.getCell(6).value),K=s(i.getCell(7).value),H=s(i.getCell(8).value);p&&a.push({id:w.value++,name:p,address:y,userName:$,password:T,remark:Y,label:v(D),insertTime:K,updateTime:H})}b("importComplete",a,x.value),r.value.value=""})}).catch(d=>{Z.error(d),r.value.value=""})},s=n=>n?typeof n=="object"?n instanceof Date?we(n).format("YYYY-MM-DD HH:mm:ss"):n.text:n.toString():"",v=n=>{if(!n)return"";let d=[],a=n.split("、");for(let o=0;o<a.length;o++){let i=L(x.value,a[o],"");if(i)d.push(i);else{let p=[];A(x.value,a[o].split(">"),0,p);for(let y=0;y<p.length;y++)d.push(p[y])}}return Array.from(new Set(d))},L=(n,d,a)=>{for(let o=0;o<n.length;o++){let i=a?a+">"+n[o].label:n[o].label;if(d===i)return n[o].id;if(n[o].children&&n[o].children.length>0)return L(n[o].children,d,i)}},A=(n,d,a,o)=>{if(!d[a])return;for(let p=0;p<n.length;p++)if(n[p].label===d[a])return d[a+1]||o.push(n[p].id),A(n[p].children,d,a+1,o);let i={id:w.value++,label:d[a],children:[]};n.push(i),d[a+1]||o.push(i.id),A(i.children,d,a+1,o)},F=async(n,d)=>{x.value=d;const a=new Te.Workbook,o=a.addWorksheet("sheet1");o.getCell("A1").value=g("password.name"),o.getCell("B1").value=g("password.address"),o.getCell("C1").value=g("password.userName"),o.getCell("D1").value=g("password.password"),o.getCell("E1").value=g("password.label"),o.getCell("F1").value=g("password.remark"),o.getCell("G1").value=g("password.insertTime"),o.getCell("H1").value=g("password.updateTime");for(let i=0;i<n.length;i++){let p=n[i].insertTime;p||(p=we().format("YYYY-MM-DD HH:mm:ss")),o.getCell("A"+(i+2)).value=n[i].name,o.getCell("B"+(i+2)).value=n[i].address,o.getCell("C"+(i+2)).value=n[i].userName,o.getCell("D"+(i+2)).value=n[i].password,o.getCell("E"+(i+2)).value=f(n[i].label),o.getCell("F"+(i+2)).value=n[i].remark,o.getCell("G"+(i+2)).value=p,o.getCell("H"+(i+2)).value=n[i].updateTime}a.xlsx.writeBuffer().then(i=>{let p=new Blob([i],{type:"application/octet-stream"});Ae.saveAs(p,g("importExport.exportName")+"_"+we().format("YYYY-MM-DD HH:mm:ss")+".xlsx")})},f=n=>{if(!n)return"";let d=[];return E(x.value,n,d,""),d.join("、")},E=(n,d,a,o)=>{for(let i=0;i<n.length;i++){let p=o?o+">"+n[i].label:n[i].label;d.includes(n[i].id)&&a.push(p),n[i].children&&n[i].children.length>0&&E(n[i].children,d,a,p)}};return _({importExcel:R,exportExcel:F,downloadExcelTemplate:()=>{const n=new Te.Workbook,d=n.addWorksheet("sheet1");d.getCell("A1").value=g("password.name"),d.getCell("B1").value=g("password.address"),d.getCell("C1").value=g("password.userName"),d.getCell("D1").value=g("password.password"),d.getCell("E1").value=g("password.label"),d.getCell("F1").value=g("password.remark"),d.getCell("G1").value=g("password.insertTime"),d.getCell("H1").value=g("password.updateTime"),n.xlsx.writeBuffer().then(a=>{let o=new Blob([a],{type:"application/octet-stream"});Ae.saveAs(o,g("importExport.importTemplateName")+".xlsx")})}}),(n,d)=>(C(),G("input",{type:"file",onChange:c,accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",ref_key:"fileUploadInput",ref:r,style:{display:"none"}},null,544))}},Xt={class:"dialog-footer"},Zt={__name:"DeleteAccount",emits:["deleteAccount"],setup(J,{expose:_,emit:j}){const{t:g}=te(),b=j,r=W({deleteAccount:!1}),x=S(""),w=()=>{let c=ne(x.value,Q.state.verifyCode);if(c&&c==="password-x"){let s=localStorage.getItem("ossForm"),v=ne(ge(),s);if(JSON.parse(v).accessKeyId==="LTAI5tRPBc5sY6KbZd1Vc1jU"){Z.error("演示账号不能注销");return}$e("password.json"),$e("groupTree.json"),localStorage.removeItem("systemConfig"),Z.success(g("systemSetting.deleteAccount.success")),b("deleteAccount")}else Z.error(g("systemSetting.deleteAccount.mainPasswordError"))};return _({showDeleteAccount:()=>{r.deleteAccount=!0}}),(c,s)=>{const v=Be,L=re,A=de,F=ve;return C(),N(F,{modelValue:e(r).deleteAccount,"onUpdate:modelValue":s[1]||(s[1]=f=>e(r).deleteAccount=f),title:e(g)("systemSetting.deleteAccount"),width:"400px"},{footer:l(()=>[z("span",Xt,[t(A,{type:"danger",onClick:w},{default:l(()=>[P(k(e(g)("systemSetting.deleteAccount.affirm")),1)]),_:1})])]),default:l(()=>[t(v,{type:"error",closable:!1},{default:l(()=>[P(k(e(g)("systemSetting.deleteAccount.text")),1)]),_:1}),t(L,{modelValue:e(x),"onUpdate:modelValue":s[0]||(s[0]=f=>oe(x)?x.value=f:null),style:{"margin-top":"20px"}},null,8,["modelValue"])]),_:1},8,["modelValue","title"])}}},qt={class:"dialog-footer"},Qt={__name:"SystemSetting",emits:["updateMainPassword","deleteAccount","systemChangeChange"],setup(J,{expose:_,emit:j}){const g=At(),b=Yt(),{t:r,locale:x}=te(),w=j,R=S(),c=W({setting:!1}),s=W({language:"zh-cn",cacheMainPassword:!0,autoGeneratePassword:!0,darkMode:!1,sortRule:"insertTimeDesc",showPasswordStrength:!1,defaultPasswordRule:{length:16,number:!0,lowercase:!0,uppercase:!0,symbol:!0}}),v=W([{key:"zh-cn",label:"简体中文"},{key:"en-us",label:"English"}]),L=W([{key:"insertTimeDesc",label:r("systemSetting.sort.insertTimeDesc")},{key:"insertTimeAsc",label:r("systemSetting.sort.insertTimeAsc")},{key:"name",label:r("systemSetting.sort.name")}]),A=W([{key:!1,label:r("systemSetting.topic.light")},{key:!0,label:r("systemSetting.topic.dark")}]),F=W([{key:!0,label:r("systemSetting.cacheMainPassword.enable")},{key:!1,label:r("systemSetting.cacheMainPassword.disabled")}]),f=W([{key:!0,label:r("passwordForm.autoGeneratePassword.enable")},{key:!1,label:r("passwordForm.autoGeneratePassword.disabled")}]),E=W([{key:!0,label:r("systemSetting.showPasswordStrength.enable")},{key:!1,label:r("systemSetting.showPasswordStrength.disabled")}]);let V=null;const n=()=>{let p=Xe();if(p)for(let y in p)s[y]=p[y];s.language!==x.value&&(s.language=x.value),V=JSON.stringify(s),c.setting=!0},d=()=>{let p=s.defaultPasswordRule;if(!p.number&&!p.symbol&&!p.lowercase&&!p.uppercase){Z.error(r("systemSetting.passwordRuleVerify"));return}zt(s),s.cacheMainPassword===!1&&localStorage.removeItem("mainPasswordCiphertext");let y=JSON.parse(V);s.language!==x.value&&(x.value=s.language,console.log("系统语言设置为：",s.language)),b.value!==s.darkMode&&(b.value=s.darkMode,console.log("暗黑模式设置为：",s.darkMode)),s.sortRule!==y.sortRule&&(w("systemChangeChange","sortChange",s.sortRule),console.log("排序规则设置为：",s.sortRule)),s.showPasswordStrength!==y.showPasswordStrength&&(w("systemChangeChange","showPasswordStrength",s.showPasswordStrength),console.log("是否显示密码强度设置为：",s.showPasswordStrength)),c.setting=!1},a=()=>{localStorage.removeItem("ossForm"),localStorage.removeItem("mainPasswordCiphertext"),Q.commit("delOss"),g.push("/login")},o=()=>{c.setting=!1,w("updateMainPassword")},i=()=>{c.setting=!1,R.value.showDeleteAccount()};return _({openSystemSetting:n,showUpdateMainPassword:o}),(p,y)=>{const $=bt,T=yt,D=he,Y=Ye,K=Fe,H=re,U=Ee,ie=de,ke=xe,ue=ve,Ce=Zt;return C(),G(X,null,[t(ue,{modelValue:e(c).setting,"onUpdate:modelValue":y[11]||(y[11]=h=>e(c).setting=h),title:e(r)("systemSetting.title"),width:"600px"},{footer:l(()=>[z("span",qt,[t(ie,{type:"primary",onClick:d},{default:l(()=>[P(k(e(r)("systemSetting.save")),1)]),_:1})])]),default:l(()=>[t(ke,{model:e(s),"label-width":"150px"},{default:l(()=>[t(D,{label:e(r)("systemSetting.language")},{default:l(()=>[t(T,{modelValue:e(s).language,"onUpdate:modelValue":y[0]||(y[0]=h=>e(s).language=h)},{default:l(()=>[(C(!0),G(X,null,se(e(v),h=>(C(),N($,{key:h.key,label:h.label,value:h.key},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["label"]),t(D,{label:e(r)("systemSetting.sort")},{default:l(()=>[t(T,{modelValue:e(s).sortRule,"onUpdate:modelValue":y[1]||(y[1]=h=>e(s).sortRule=h)},{default:l(()=>[(C(!0),G(X,null,se(e(L),h=>(C(),N($,{key:h.key,label:h.label,value:h.key},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["label"]),t(D,{label:e(r)("systemSetting.topic")},{default:l(()=>[t(T,{modelValue:e(s).darkMode,"onUpdate:modelValue":y[2]||(y[2]=h=>e(s).darkMode=h)},{default:l(()=>[(C(!0),G(X,null,se(e(A),h=>(C(),N($,{key:h.key,label:h.label,value:h.key},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["label"]),t(D,{label:e(r)("systemSetting.cacheMainPassword")},{default:l(()=>[t(T,{modelValue:e(s).cacheMainPassword,"onUpdate:modelValue":y[3]||(y[3]=h=>e(s).cacheMainPassword=h)},{default:l(()=>[(C(!0),G(X,null,se(e(F),h=>(C(),N($,{key:h.key,label:h.label,value:h.key},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["label"]),t(D,{label:e(r)("passwordForm.autoGeneratePassword")},{default:l(()=>[t(T,{modelValue:e(s).autoGeneratePassword,"onUpdate:modelValue":y[4]||(y[4]=h=>e(s).autoGeneratePassword=h)},{default:l(()=>[(C(!0),G(X,null,se(e(f),h=>(C(),N($,{key:h.key,label:h.label,value:h.key},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["label"]),t(D,{label:e(r)("systemSetting.showPasswordStrength")},{default:l(()=>[t(T,{modelValue:e(s).showPasswordStrength,"onUpdate:modelValue":y[5]||(y[5]=h=>e(s).showPasswordStrength=h)},{default:l(()=>[(C(!0),G(X,null,se(e(E),h=>(C(),N($,{key:h.key,label:h.label,value:h.key},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["label"]),t(D,{label:e(r)("systemSetting.defaultPasswordRule")},{default:l(()=>[t(U,{style:{"margin-top":"15px"}},{default:l(()=>[t(K,{span:8},{default:l(()=>[t(Y,{size:"small",modelValue:e(s).defaultPasswordRule.uppercase,"onUpdate:modelValue":y[6]||(y[6]=h=>e(s).defaultPasswordRule.uppercase=h),label:e(r)("passwordForm.generateForm.uppercase"),border:""},null,8,["modelValue","label"])]),_:1}),t(K,{span:8},{default:l(()=>[t(Y,{size:"small",modelValue:e(s).defaultPasswordRule.lowercase,"onUpdate:modelValue":y[7]||(y[7]=h=>e(s).defaultPasswordRule.lowercase=h),label:e(r)("passwordForm.generateForm.lowercase"),border:""},null,8,["modelValue","label"])]),_:1}),t(K,{span:8},{default:l(()=>[t(Y,{size:"small",modelValue:e(s).defaultPasswordRule.number,"onUpdate:modelValue":y[8]||(y[8]=h=>e(s).defaultPasswordRule.number=h),label:e(r)("passwordForm.generateForm.number"),border:""},null,8,["modelValue","label"])]),_:1}),t(K,{span:8},{default:l(()=>[t(Y,{size:"small",modelValue:e(s).defaultPasswordRule.symbol,"onUpdate:modelValue":y[9]||(y[9]=h=>e(s).defaultPasswordRule.symbol=h),label:e(r)("passwordForm.generateForm.symbol"),border:""},null,8,["modelValue","label"])]),_:1}),t(K,{span:8},{default:l(()=>[z("div",null,[t(H,{size:"small",style:{position:"relative",top:"3px"},modelValue:e(s).defaultPasswordRule.length,"onUpdate:modelValue":y[10]||(y[10]=h=>e(s).defaultPasswordRule.length=h)},{prepend:l(()=>[P(k(e(r)("passwordForm.generateForm.length")),1)]),_:1},8,["modelValue"])])]),_:1})]),_:1})]),_:1},8,["label"]),t(D,null,{default:l(()=>[t(ie,{plain:"",onClick:o},{default:l(()=>[P(k(e(r)("systemSetting.updateMainPassword")),1)]),_:1}),t(ie,{plain:"",type:"danger",onClick:i},{default:l(()=>[P(k(e(r)("systemSetting.deleteAccount")),1)]),_:1}),t(ie,{type:"warning",plain:"",onClick:a},{default:l(()=>[P(k(e(r)("systemSetting.logout")),1)]),_:1})]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue","title"]),t(Ce,{ref_key:"deleteAccountRef",ref:R,onDeleteAccount:a},null,512)],64)}}},el=["width","height"],Ze={__name:"GesturePassword",props:{size:{type:Number,default:300},count:{type:Number,default:3}},emits:["complete"],setup(J,{emit:_}){const j=_,g=S();let b=J;const r=W({padding:b.size*.18,background:"#fff",point:{color:"#333",size:b.size*.023,madding:{color:"#333",size:b.size*.1,lineWidth:.5},selected:{range:b.size*.07,color:"#409EFF",size:b.size*.023,madding:{color:"#409EFF",size:b.size*.1,lineWidth:1}}},line:{color:"#409EFF",width:2}}),x=S({}),w=S([]),R=S(!1);let c=null;const s=()=>{c=g.value.getContext("2d"),v()},v=()=>{c.fillStyle=r.background,c.fillRect(0,0,b.size,b.size),x.value=[];let a=(b.size-r.padding*2)/(b.count-1),o=1;for(let i=0;i<b.count;i++)for(let p=0;p<b.count;p++){let y=r.padding+p*a,$=r.padding+i*a,T=a/2,D={id:o,x:y,y:$,startX:y-T,endX:y+T,startY:$-T,endY:$+T,h:a,w:a};L(D),x.value[o]=D,o++}},L=a=>{let o=n(a);c.beginPath(),o?(c.fillStyle=r.point.selected.color,c.arc(a.x,a.y,r.point.selected.size,0,Math.PI*2)):(c.fillStyle=r.point.color,c.arc(a.x,a.y,r.point.size,0,Math.PI*2)),c.fill(),c.beginPath(),o?(c.strokeStyle=r.point.selected.madding.color,c.lineWidth=r.point.selected.madding.lineWidth,c.arc(a.x,a.y,r.point.selected.madding.size,0,Math.PI*2)):(c.strokeStyle=r.point.madding.color,c.lineWidth=r.point.madding.lineWidth,c.arc(a.x,a.y,r.point.madding.size,0,Math.PI*2)),c.stroke()},A=()=>{R.value=!0},F=()=>{R.value=!1;let a=f();if(a){let o=Bt(a);j("complete",o),w.value=[]}v(),V()},f=()=>{let a="";for(let o=0;o<w.value.length;o++)a+=w.value[o].id+",";return a&&(a=a.substring(0,a.length-1)),a},E=a=>{let o=a.offsetX,i=a.offsetY;if(v(),V(o,i),!R.value)return;let p=d(o,i);!p||n(p)||(w.value.push(p),v(),V(o,i))},V=(a,o)=>{let i=d(a,o);if(i&&(c.beginPath(),c.strokeStyle=r.point.selected.madding.color,c.lineWidth=r.point.selected.madding.lineWidth,c.arc(i.x,i.y,r.point.selected.madding.size,0,Math.PI*2),c.stroke()),w.value.length!==0){c.beginPath(),c.strokeStyle=r.line.color,c.lineWidth=r.line.width,c.lineCap="round",c.moveTo(w.value[0].x,w.value[0].y);for(let p=1;p<w.value.length;p++)c.lineTo(w.value[p].x,w.value[p].y);a&&o&&c.lineTo(a,o),c.stroke()}},n=a=>{for(let o=0;o<w.value.length;o++)if(a.id===w.value[o].id)return!0;return!1},d=(a,o)=>{for(let i in x.value){let p=x.value[i];if(a>p.startX+r.point.selected.range&&a<p.endX-r.point.selected.range&&o>p.startY+r.point.selected.range&&o<p.endY-r.point.selected.range)return p}};return We(()=>{s()}),(a,o)=>e(b).size?(C(),G("canvas",{key:0,width:e(b).size,height:e(b).size,ref_key:"canvasRef",ref:g,onMousedown:A,onMouseup:F,onMousemove:o[0]||(o[0]=i=>E(i))},null,40,el)):B("",!0)}},tl={style:{"text-align":"center"}},ll={class:"dialog-footer"},qe={__name:"MainPasswordVerify",emits:["verifyPass"],setup(J,{expose:_,emit:j}){const{t:g}=te(),b=j,r=S(""),x=S(""),w=W({verifyMainPassword:!1}),R=F=>{r.value=F,c()},c=()=>{let F=ne(r.value,Q.state.verifyCode);F&&F==="password-x"?(b("verifyPass",r.value),v(r.value),r.value="",w.verifyMainPassword=!1):Z.error(g("mainPasswordVerify.form.verify"))},s=()=>{localStorage.removeItem("mainPasswordCiphertext")},v=F=>{if(be("cacheMainPassword")===!1)return;let E=ge(),V=_e(E,F);localStorage.setItem("mainPasswordCiphertext",V)},L=()=>{if(be("cacheMainPassword")===!1)return null;let f=localStorage.getItem("mainPasswordCiphertext");if(!f)return null;let E=ge(),V=ne(E,f);return V||null};return _({verifyMainPassword:(F=!0)=>{if(x.value=Q.state.mainPasswordType,!F){w.verifyMainPassword=!0;return}let f=L();if(!f){w.verifyMainPassword=!0;return}let E=ne(f,Q.state.verifyCode);E&&E==="password-x"?b("verifyPass",f):w.verifyMainPassword=!0},delLocalMainPassword:s}),(F,f)=>{const E=Ze,V=re,n=he,d=xe,a=de,o=ve;return C(),N(o,{modelValue:e(w).verifyMainPassword,"onUpdate:modelValue":f[1]||(f[1]=i=>e(w).verifyMainPassword=i),title:e(g)("mainPasswordVerify.form.title"),width:"400px"},Ie({default:l(()=>[z("div",tl,[e(x)==="gesture"?(C(),N(E,{key:0,onComplete:R})):B("",!0),e(x)==="common"?(C(),N(d,{key:1,style:{padding:"10px"}},{default:l(()=>[t(n,null,{default:l(()=>[t(V,{modelValue:e(r),"onUpdate:modelValue":f[0]||(f[0]=i=>oe(r)?r.value=i:null),placeholder:e(g)("mainPasswordVerify.form.mainPassword"),type:"password",onKeyup:Ge(c,["enter"])},null,8,["modelValue","placeholder","onKeyup"])]),_:1})]),_:1})):B("",!0)])]),_:2},[e(x)==="common"?{name:"footer",fn:l(()=>[z("span",ll,[t(a,{type:"primary",disabled:!e(r),onClick:c},{default:l(()=>[P(k(e(g)("mainPasswordVerify.form.save")),1)]),_:1},8,["disabled"])])]),key:"0"}:void 0]),1032,["modelValue","title"])}}},al={class:"dialog-footer"},sl={__name:"MainPasswordSetting",emits:["mainPasswordChange"],setup(J,{expose:_,emit:j}){const{t:g}=te(),b=j,r=S(),x=S("gesture"),w=S(""),R=S(""),c=W({mainPassword:!1}),s=S(""),v=E=>{s.value==="setting"?(w.value=E,s.value="affirm"):s.value==="affirm"&&(R.value=E,L())},L=()=>{if(w.value!==R.value){Z.error(g("mainPasswordSetting.form.passwordsDiff"));return}let E=localStorage.getItem("ossForm"),V=ne(ge(),E);if(JSON.parse(V).accessKeyId==="LTAI5tRPBc5sY6KbZd1Vc1jU"){Z.error("演示账号不能修改主密码");return}x.value==="gesture"?Q.commit("setMainPasswordType","gesture"):Q.commit("setMainPasswordType","common"),b("mainPasswordChange",w.value,x.value);let d=be("cacheMainPassword");if(d||d==null){let a=ge(),o=_e(a,w.value);localStorage.setItem("mainPasswordCiphertext",o)}w.value="",R.value="",c.mainPassword=!1},A=()=>{s.value="setting",c.mainPassword=!0},F=()=>{r.value.verifyMainPassword(!1)},f=()=>{x.value==="gesture"&&(s.value="setting")};return _({settingMainPassword:A,updateMainPassword:F}),(E,V)=>{const n=Be,d=je,a=Ze,o=Re,i=vt,p=re,y=he,$=xe,T=ht,D=de,Y=ve,K=qe;return C(),G(X,null,[t(Y,{modelValue:e(c).mainPassword,"onUpdate:modelValue":V[4]||(V[4]=H=>e(c).mainPassword=H),title:e(g)("mainPasswordSetting.form.setMainPassword"),width:"470px"},Ie({default:l(()=>[t(n,{type:"error",style:{position:"relative",top:"-10px"},closable:!1},{default:l(()=>[P(k(e(g)("mainPasswordSetting.forget.message")),1)]),_:1}),t(T,{modelValue:e(x),"onUpdate:modelValue":V[3]||(V[3]=H=>oe(x)?x.value=H:null),style:{"margin-top":"10px"},type:"card",onTabClick:f},{default:l(()=>[t(i,{label:"手势",name:"gesture",style:{"text-align":"center"}},{default:l(()=>[z("div",null,[e(s)==="setting"?(C(),N(d,{key:0},{default:l(()=>[P("请绘制主密码")]),_:1})):B("",!0),e(s)==="affirm"?(C(),N(d,{key:1},{default:l(()=>[P("请再次绘制确认")]),_:1})):B("",!0)]),t(a,{onComplete:v}),z("div",null,[t(o,{underline:!1,type:"primary",style:{position:"relative",top:"-2px"},onClick:V[0]||(V[0]=H=>s.value="setting")},{default:l(()=>[P("重新绘制")]),_:1})])]),_:1}),t(i,{label:"标准",name:"common",style:{"text-align":"center"}},{default:l(()=>[t($,{inline:!0,"label-width":"100px",style:{"margin-top":"20px"}},{default:l(()=>[t(y,{label:e(g)("mainPasswordSetting.form.newMainPassword")},{default:l(()=>[t(p,{type:"password",modelValue:e(w),"onUpdate:modelValue":V[1]||(V[1]=H=>oe(w)?w.value=H:null),style:{width:"231px"}},null,8,["modelValue"])]),_:1},8,["label"]),t(y,{label:e(g)("mainPasswordSetting.form.newMainPasswordAffirm")},{default:l(()=>[t(p,{type:"password",modelValue:e(R),"onUpdate:modelValue":V[2]||(V[2]=H=>oe(R)?R.value=H:null),style:{width:"231px"}},null,8,["modelValue"])]),_:1},8,["label"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:2},[e(x)==="common"?{name:"footer",fn:l(()=>[z("span",al,[t(D,{type:"primary",disabled:!e(w),onClick:L},{default:l(()=>[P(k(e(g)("mainPasswordSetting.form.save")),1)]),_:1},8,["disabled"])])]),key:"0"}:void 0]),1032,["modelValue","title"]),t(K,{ref_key:"mainPasswordVerifyRef",ref:r,onVerifyPass:A},null,512)],64)}}},ol={class:"dialog-footer"},nl={__name:"PasswordForm",props:{labelTree:Array},emits:["addPassword","updatePassword"],setup(J,{expose:_,emit:j}){const g=j,{t:b}=te(),r=S(),x=W({password:!1}),w=S(""),R=W({uppercase:"ABCDEFGHJKLMNPQRSTUVWXYZ",lowercase:"abcdefghjkmnpqrstuvwxyz",number:"0123456789",symbol:"~!@#$^&*()_+.,;"}),c=()=>({id:0,name:"",address:"",userName:"",password:"",remark:"",label:"",insertTime:"",updateTime:""}),s=W(c()),v=W({length:16,number:!0,lowercase:!0,uppercase:!0,symbol:!0}),L=W({name:[{required:!0,message:b("passwordForm.form.name.verify"),trigger:"blur"}]}),A=()=>{if(!v.number&&!v.symbol&&!v.lowercase&&!v.uppercase){Z.error(b("systemSetting.passwordRuleVerify"));return}let d=[];v.lowercase&&d.push(R.lowercase),v.uppercase&&d.push(R.uppercase),v.symbol&&d.push(R.symbol),v.number&&d.push(R.number),s.password=$t(d,v.length)},F=async d=>{await d.validate(a=>{a&&(x.password=!1,w.value==="add"?(s.id=Date.now(),s.insertTime=we().format("YYYY-MM-DD HH:mm:ss"),g("addPassword",JSON.parse(JSON.stringify(s)))):(s.updateTime=we().format("YYYY-MM-DD HH:mm:ss"),g("updatePassword",JSON.parse(JSON.stringify(s)))))})},f=()=>{let d=be("defaultPasswordRule");if(d)for(let a in d)v[a]=d[a]},E=()=>{f();let d=c();for(let o in d)s[o]=d[o];be("autoGeneratePassword")&&A(),w.value="add",x.password=!0},V=d=>{f();for(let a in s)s[a]=d[a];w.value="update",x.password=!0},n=()=>document.documentElement.clientWidth;return _({showAddPassword:E,showUpdatePassword:V}),(d,a)=>{const o=re,i=he,p=de,y=Fe,$=Ee,T=Ye,D=Ue,Y=xt,K=xe,H=Pt;return C(),N(H,{modelValue:e(x).password,"onUpdate:modelValue":a[13]||(a[13]=U=>e(x).password=U),title:e(w)==="add"?e(b)("passwordForm.form.addPassword"):e(b)("passwordForm.form.editPassword"),size:"620px",direction:n()>768?"rtl":"btt"},{footer:l(()=>[z("span",ol,[t(p,{onClick:a[12]||(a[12]=U=>F(e(r))),type:"primary"},{default:l(()=>[P(k(e(b)("passwordForm.generateForm.save")),1)]),_:1})])]),default:l(()=>[t(K,{ref_key:"passwordFormRef",ref:r,model:e(s),rules:e(L),"label-width":"70px",style:{"padding-right":"30px"}},{default:l(()=>[t(i,{label:e(b)("password.name"),prop:"name"},{default:l(()=>[t(o,{modelValue:e(s).name,"onUpdate:modelValue":a[0]||(a[0]=U=>e(s).name=U),clearable:""},null,8,["modelValue"])]),_:1},8,["label"]),t(i,{label:e(b)("password.address")},{default:l(()=>[t(o,{modelValue:e(s).address,"onUpdate:modelValue":a[1]||(a[1]=U=>e(s).address=U),clearable:""},null,8,["modelValue"])]),_:1},8,["label"]),t(i,{label:e(b)("password.userName")},{default:l(()=>[t(o,{modelValue:e(s).userName,"onUpdate:modelValue":a[2]||(a[2]=U=>e(s).userName=U),clearable:""},null,8,["modelValue"])]),_:1},8,["label"]),t(i,{label:e(b)("password.password")},{default:l(()=>[t(D,{style:{width:"100%"}},{default:l(()=>[t($,null,{default:l(()=>[t(y,null,{default:l(()=>[t(o,{modelValue:e(s).password,"onUpdate:modelValue":a[4]||(a[4]=U=>e(s).password=U),clearable:""},{append:l(()=>[t(p,{onClick:a[3]||(a[3]=U=>e(Me)(e(s).password))},{default:l(()=>[P(k(e(b)("passwordForm.generateForm.password.copy")),1)]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),t($,{style:{"margin-top":"15px"}},{default:l(()=>[t(y,{xs:{span:12},md:{span:6},style:{"text-align":"center"}},{default:l(()=>[t(T,{size:"small",modelValue:e(v).uppercase,"onUpdate:modelValue":a[5]||(a[5]=U=>e(v).uppercase=U),label:e(b)("passwordForm.generateForm.uppercase"),border:""},null,8,["modelValue","label"])]),_:1}),t(y,{xs:{span:12},md:{span:6},style:{"text-align":"center"}},{default:l(()=>[t(T,{size:"small",modelValue:e(v).lowercase,"onUpdate:modelValue":a[6]||(a[6]=U=>e(v).lowercase=U),label:e(b)("passwordForm.generateForm.lowercase"),border:""},null,8,["modelValue","label"])]),_:1}),t(y,{xs:{span:12},md:{span:6},style:{"text-align":"center"}},{default:l(()=>[t(T,{size:"small",modelValue:e(v).number,"onUpdate:modelValue":a[7]||(a[7]=U=>e(v).number=U),label:e(b)("passwordForm.generateForm.number"),border:""},null,8,["modelValue","label"])]),_:1}),t(y,{xs:{span:12},md:{span:6},style:{"text-align":"center"}},{default:l(()=>[t(T,{size:"small",modelValue:e(v).symbol,"onUpdate:modelValue":a[8]||(a[8]=U=>e(v).symbol=U),label:e(b)("passwordForm.generateForm.symbol"),border:""},null,8,["modelValue","label"])]),_:1})]),_:1}),t($,{style:{"margin-top":"15px"}},{default:l(()=>[t(y,{style:{"text-align":"center"}},{default:l(()=>[t(o,{modelValue:e(v).length,"onUpdate:modelValue":a[9]||(a[9]=U=>e(v).length=U),size:"small",style:{width:"120px"}},{prepend:l(()=>[P(k(e(b)("passwordForm.generateForm.length")),1)]),_:1},8,["modelValue"]),t(p,{plain:"",size:"small",style:{position:"relative",top:"-5px","margin-left":"10px"},type:"success",onClick:A},{default:l(()=>[P(k(e(b)("passwordForm.generateForm.randomPassword")),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["label"]),t(i,{label:e(b)("password.label")},{default:l(()=>[t(Y,{modelValue:e(s).label,"onUpdate:modelValue":a[10]||(a[10]=U=>e(s).label=U),"value-key":"id",data:J.labelTree,"check-strictly":"",multiple:"","default-expand-all":"",placeholder:e(b)("password.label.placeholder"),filterable:""},null,8,["modelValue","data","placeholder"])]),_:1},8,["label"]),t(i,{label:e(b)("password.remark")},{default:l(()=>[t(o,{type:"textarea",placeholder:e(b)("passwordForm.generateForm.remark"),rows:4,modelValue:e(s).remark,"onUpdate:modelValue":a[11]||(a[11]=U=>e(s).remark=U)},null,8,["placeholder","modelValue"])]),_:1},8,["label"])]),_:1},8,["model","rules"])]),_:1},8,["modelValue","title","direction"])}}};const rl={class:"label-tree-node"},dl=["onClick","onBlur"],il={class:"label-tree-node-menu"},ul={__name:"LabelTree",emits:["labelCheckChange","labelTreeChange"],setup(J,{expose:_,emit:j}){const{t:g}=te(),b=j,r=S(),x=S([]),w=S([]),R=S(!1),c=()=>{let n=r.value.getCheckedNodes();b("labelCheckChange",n)},s=(n,d)=>n?d.label.includes(n):!0,v=n=>{const d={id:Date.now(),label:g("labelTree.addLabel"),children:[]};n.children||(n.children=[]),n.children.push(d)},L=(n,d)=>{const a=n.parent,o=a.data.children||a.data,i=o.findIndex(p=>p.id===d.id);o.splice(i,1)},A=n=>!n.edit,F=()=>{w.value.push({id:Date.now(),label:g("labelTree.firstAddLabel"),children:[]})},f=()=>{R.value&&Je("labelTree.json",{labelTree:w.value})},E=n=>{w.value=n};return ze(x,n=>{r.value.filter(n)}),ze(w,()=>{f(),b("labelTreeChange",w.value)},{deep:!0}),(()=>{Ke("labelTree.json").then(n=>{n&&n.labelTree?w.value=n.labelTree:w.value=[],R.value=!0}).catch(n=>{Oe.error(n.code)})})(),_({setLabelTree:E}),(n,d)=>{const a=re,o=de,i=Re,p=kt,y=Ct,$=Ue;return C(),N($,null,{header:l(()=>[P(k(e(g)("labelTree.title")),1)]),default:l(()=>[t(a,{modelValue:e(x),"onUpdate:modelValue":d[0]||(d[0]=T=>oe(x)?x.value=T:null),clearable:"",placeholder:e(g)("labelTree.search.placeholder")},null,8,["modelValue","placeholder"]),t(y,{height:"35vh"},{default:l(()=>[t(p,{data:e(w),"show-checkbox":"",ref_key:"labelTreeRef",ref:r,draggable:"","node-key":"id",style:{"margin-top":"10px"},onCheck:c,"filter-node-method":s,"expand-on-click-node":!1,"allow-drag":A,"default-expand-all":""},{empty:l(()=>[t(o,{size:"small",type:"primary",plain:"",onClick:F},{default:l(()=>[P(k(e(g)("labelTree.firstAddLabel")),1)]),_:1})]),default:l(({node:T,data:D})=>[z("span",rl,[T.edit?B("",!0):(C(),G("span",{key:0,onClick:Y=>T.edit=!0,onBlur:Y=>T.edit=!1},k(D.label),41,dl)),T.edit?(C(),N(a,{key:1,style:{width:"60%"},ref:T.id+"_input",size:"small",onBlur:Y=>T.edit=!1,modelValue:D.label,"onUpdate:modelValue":Y=>D.label=Y},null,8,["onBlur","modelValue","onUpdate:modelValue"])):B("",!0),z("span",il,[t(i,{onClick:Y=>v(D),type:"primary",underline:!1},{default:l(()=>[P(k(e(g)("labelTree.tree.add")),1)]),_:2},1032,["onClick"]),t(i,{onClick:Y=>L(T,D),type:"danger",underline:!1,style:{"margin-left":"8px"}},{default:l(()=>[P(k(e(g)("labelTree.tree.remove")),1)]),_:2},1032,["onClick"])])])]),_:1},8,["data"])]),_:1})]),_:1})}}},ml=He(ul,[["__scopeId","data-v-7ca5ca01"]]);const Pe=J=>(Nt("data-v-81603fef"),J=J(),Dt(),J),cl={style:{display:"flex","justify-content":"space-between"}},pl={class:"hidden-xs-only"},fl=Pe(()=>z("br",null,null,-1)),wl={key:1},_l={style:{display:"flex","justify-content":"end"},class:"password-title-right"},gl=Pe(()=>z("div",{class:"password-strength",style:{"background-color":"#67C23A"}},null,-1)),bl=Pe(()=>z("div",{class:"password-strength",style:{"background-color":"#E6A23C"}},null,-1)),yl=Pe(()=>z("div",{class:"password-strength",style:{"background-color":"#F56C6C"}},null,-1)),vl={key:0},hl={class:"password-text"},xl={class:"pass-action-div"},Pl={__name:"IndexPage",setup(J){const{t:_,locale:j}=te(),g=S(),b=S(),r=S(),x=S(),w=S(),R=S(),c=W({}),s=S(""),v=S(""),L=S(""),A=S(!1),F=S(""),f=S([]),E=S([]),V=S([]),n=S([]),d=async()=>{if(!s.value&&!V.value){E.value=f.value;return}let u=[];for(let m=0;m<f.value.length;m++){let M=f.value[m].name||"",O=f.value[m].userName||"",le=f.value[m].address||"",ae=f.value[m].remark||"",ce=f.value[m].password||"",Ve=!s.value||M.includes(s.value)||O.includes(s.value)||le.includes(s.value)||ae.includes(s.value)||ce.includes(s.value),pe=!1;if(V.value.length>0)for(let fe=0;fe<V.value.length;fe++){let q=V.value[fe];f.value[m].label&&f.value[m].label.includes(q.id)&&(pe=!0)}else pe=!0;Ve&&pe&&u.push(f.value[m])}E.value=u},a=()=>{g.value.showAddPassword()},o=u=>{g.value.showUpdatePassword(u)},i=u=>{f.value.unshift(u),me(),d()},p=u=>{for(let m=0;m<f.value.length;m++)if(f.value[m].id===u.id){f.value[m]=u,me(),d();break}},y=()=>{F.value=_e(v.value,JSON.stringify(f.value)),A.value=!1,E.value=[],f.value=[],v.value="",b.value.delLocalMainPassword()},$=()=>{b.value.verifyMainPassword()},T=u=>{let m=_("password.name")+": "+u.name+`\r
`;u.address&&(m+=_("password.address")+": "+u.address+`\r
`),u.userName&&(m+=_("password.userName")+": "+u.userName+`\r
`),u.password&&(m+=_("password.password")+": "+u.password+`\r
`),u.remark&&(m+=u.remark+`\r
`),m=m.substring(0,m.length-2),Me(m)},D=u=>{for(let m=0;m<f.value.length;m++)if(f.value[m].id===u.id){f.value.splice(m,1),me(),d(),Z.success(_("index.table.delete.success"));break}},Y=u=>{v.value=u;let m=ne(u,F.value);f.value=JSON.parse(m),A.value=!0,d()},K=(u,m)=>{v.value=u,L.value=m,me(),Z.success(_("index.mainPassword.changeSuccess"))},H=()=>{x.value.openSystemSetting()},U=()=>{r.value.updateMainPassword()},ie=(u,m)=>{c[u]=m,u==="sortChange"&&ke(m)},ke=u=>{u==="insertTimeDesc"?Se("insertTime",-1):u==="insertTimeAsc"?Se("insertTime",1):u==="name"&&Se("name",1),me(),d()},ue=u=>{let m=0;return/[0-9]/.test(u)&&m++,/[a-z]/.test(u)&&m++,/[A-Z]/.test(u)&&m++,/[^0-9a-zA-Z_]/.test(u)&&m++,u.length<6&&m>2&&(m=2),Ce()>2&&m>2&&(m=2),m>3?3:m},Ce=u=>{let m=0;for(let M=0;M<f.value.length;M++)f.value[M].password===u&&m++;return m},h=u=>{let m=0;for(let M=0;M<f.value.length;M++){if(!f.value[M].password)continue;let O=ue(f.value[M].password);u===O&&m++}return m},Se=(u,m)=>{f.value.sort((M,O)=>(M=M[u],O=O[u],M<O?m*-1:M>O?m*1:0))},me=()=>{if(!A.value)return;F.value=_e(v.value,JSON.stringify(f.value));let u=_e(v.value,"password-x");Q.commit("setVerifyCode",u),Je("password.json",{verifyValue:u,mainPasswordType:L.value,passwordCiphertext:F.value})},Qe=()=>{Ke("password.json").then(u=>{if(u.verifyValue){let m=u.verifyValue,M=u.mainPasswordType||"common";Q.commit("setVerifyCode",m),Q.commit("setMainPasswordType",M),F.value=u.passwordCiphertext,b.value.verifyMainPassword(!0)}else A.value=!0,r.value.settingMainPassword()}).catch(u=>{console.error(u),Oe.error("error-1000："+u)})},et=u=>{V.value=u,d()},tt=u=>{n.value=u},lt=u=>{if(!u)return"";let m=[];return Ne(n.value,u,m),m},Ne=(u,m,M)=>{for(let O=0;O<u.length;O++)m.includes(u[O].id)&&M.push(u[O].label),u[O].children&&u[O].children.length>0&&Ne(u[O].children,m,M)},at=()=>{w.value.downloadExcelTemplate()},st=()=>{w.value.importExcel(n.value)},ot=()=>{w.value.exportExcel(f.value,n.value)},nt=(u,m)=>{if(u.length!==0){for(let M=u.length-1;M>=0;M--)f.value.unshift(u[M]);R.value.setLabelTree(m),me(),d()}};return We(()=>{let u=Xe();for(let m in u)c[m]=u[m];c.language&&c.language!==j.value&&(j.value=c.language),Qe()}),(u,m)=>{const M=je,O=re,le=de,ae=St,ce=Vt,Ve=Tt,pe=Mt,fe=Ft,q=Et,ye=Re,rt=It,dt=Rt,it=Ut,ut=Ue,De=Fe,mt=ml,ct=Ee,pt=nl,ft=qe,wt=sl,_t=Qt,gt=Kt;return C(),G(X,null,[t(ct,{id:"passwordBody"},{default:l(()=>[t(De,{xl:{span:16,offset:2},lg:{span:19},md:{span:19}},{default:l(()=>[t(ut,null,{header:l(()=>[z("div",cl,[z("div",null,[z("div",pl,[e(f)?(C(),N(M,{key:0,class:"password-table-title"},{default:l(()=>[P(k(e(f).length)+" "+k(e(_)("index.title.passwordCount")),1)]),_:1})):B("",!0),fl,e(c).showPasswordStrength?(C(),G("div",wl,[t(M,{class:"password-table-strength"},{default:l(()=>[P(k(e(_)("index.title.strength"))+"（ ",1),t(M,{type:"success"},{default:l(()=>[P(k(e(_)("index.title.strength.strong")),1)]),_:1}),P(" : "+k(h(3))+" ",1),t(M,{style:{"margin-left":"5px"},type:"warning"},{default:l(()=>[P(k(e(_)("index.title.strength.medium")),1)]),_:1}),P(" : "+k(h(2))+" ",1),t(M,{style:{"margin-left":"5px"},type:"danger"},{default:l(()=>[P(k(e(_)("index.title.strength.weak")),1)]),_:1}),P(" : "+k(h(1))+"） ",1)]),_:1})])):B("",!0)])]),z("div",_l,[z("div",null,[t(O,{modelValue:e(s),"onUpdate:modelValue":m[0]||(m[0]=I=>oe(s)?s.value=I:null),style:{"max-width":"300px"},clearable:"",placeholder:e(_)("index.title.search"),"prefix-icon":e(jt),disabled:!e(v),onKeyup:Ge(d,["enter"])},null,8,["modelValue","placeholder","prefix-icon","disabled","onKeyup"])]),z("div",null,[t(le,{disabled:!e(v)||!e(A),type:"primary",plain:"",onClick:m[1]||(m[1]=I=>a())},{default:l(()=>[P(k(e(_)("index.title.addPassword")),1)]),_:1},8,["disabled"])]),z("div",null,[t(ae,{content:e(_)("index.title.unlock"),effect:"dark",placement:"top"},{default:l(()=>[e(v)?B("",!0):(C(),N(le,{key:0,disabled:!e(F),icon:e(Ot),onClick:$},null,8,["disabled","icon"]))]),_:1},8,["content"]),t(ae,{content:e(_)("index.title.lock"),effect:"dark",placement:"top"},{default:l(()=>[e(v)?(C(),N(le,{key:0,icon:e(Le),onClick:y},null,8,["icon"])):B("",!0)]),_:1},8,["content"])]),t(pe,null,{dropdown:l(()=>[t(Ve,null,{default:l(()=>[t(ce,{onClick:H},{default:l(()=>[P(k(e(_)("systemSetting.title")),1)]),_:1}),t(ce,{onClick:st},{default:l(()=>[P(k(e(_)("index.title.importExport.import")),1)]),_:1}),t(ce,{onClick:ot},{default:l(()=>[P(k(e(_)("index.title.importExport.export")),1)]),_:1}),t(ce,{onClick:at},{default:l(()=>[P(k(e(_)("index.title.importExport.download")),1)]),_:1})]),_:1})]),default:l(()=>[t(le,{icon:e(Wt)},null,8,["icon"])]),_:1})])])]),default:l(()=>[t(it,{height:"calc(100vh - 150px)",data:e(E)},{empty:l(()=>[t(fe,{description:e(v)?e(_)("index.table.empty"):e(_)("index.table.lock")},Ie({default:l(()=>[t(le,{onClick:$,plain:"",type:"primary"},{default:l(()=>[P(k(e(_)("index.title.unlock")),1)]),_:1})]),_:2},[e(v)?void 0:{name:"image",fn:l(()=>[t(e(Le))]),key:"0"}]),1032,["description"])]),default:l(()=>[e(c).showPasswordStrength?(C(),N(q,{key:0,width:"30px"},{default:l(I=>[ue(I.row.password)===3?(C(),N(ae,{key:0},{content:l(()=>[P(k(e(_)("index.title.strength")+"："+e(_)("index.title.strength.strong")),1)]),default:l(()=>[gl]),_:1})):B("",!0),ue(I.row.password)===2?(C(),N(ae,{key:1},{content:l(()=>[P(k(e(_)("index.title.strength")+"："+e(_)("index.title.strength.medium")),1)]),default:l(()=>[bl]),_:1})):B("",!0),ue(I.row.password)===1?(C(),N(ae,{key:2},{content:l(()=>[P(k(e(_)("index.title.strength")+"："+e(_)("index.title.strength.weak")),1)]),default:l(()=>[yl]),_:1})):B("",!0)]),_:1})):B("",!0),t(q,{label:e(_)("password.name"),"min-width":"140px",prop:"name"},null,8,["label"]),t(q,{label:e(_)("password.address"),"min-width":"200px",prop:"address"},{default:l(I=>[e(Lt)(I.row.address)?(C(),N(ye,{key:0,href:I.row.address,target:"_blank"},{default:l(()=>[P(k(I.row.address),1)]),_:2},1032,["href"])):(C(),N(M,{key:1},{default:l(()=>[P(k(I.row.address),1)]),_:2},1024))]),_:1},8,["label"]),t(q,{label:e(_)("password.userName"),"min-width":"120px",prop:"userName"},null,8,["label"]),t(q,{label:e(_)("password.password"),"min-width":"200px"},{default:l(I=>[I.row.password?(C(),G("div",vl,[z("span",hl,[I.row.show?B("",!0):(C(),G(X,{key:0},[P("•••••••")],64)),I.row.show?(C(),G(X,{key:1},[P(k(I.row.password),1)],64)):B("",!0)]),z("div",xl,[I.row.show?B("",!0):(C(),N(e(Gt),{key:0,onClick:ee=>I.row.show=!I.row.show},null,8,["onClick"])),I.row.show?(C(),N(e(Ht),{key:1,onClick:ee=>I.row.show=!I.row.show},null,8,["onClick"])):B("",!0),t(e(Jt),{onClick:ee=>e(Me)(I.row.password)},null,8,["onClick"])])])):B("",!0)]),_:1},8,["label"]),t(q,{label:e(_)("index.table.label"),"min-width":"130px"},{default:l(I=>[(C(!0),G(X,null,se(lt(I.row.label),ee=>(C(),N(rt,{style:{margin:"3px"},key:ee},{default:l(()=>[P(k(ee),1)]),_:2},1024))),128))]),_:1},8,["label"]),t(q,{label:e(_)("password.remark"),"min-width":"100px",prop:"remark"},null,8,["label"]),t(q,{"min-width":"140px",label:e(_)("index.table.operation")},{default:l(I=>[t(ye,{type:"success",underline:!1,onClick:ee=>T(I.row)},{default:l(()=>[P(k(e(_)("index.table.share")),1)]),_:2},1032,["onClick"]),t(ye,{underline:!1,style:{"margin-left":"10px"},type:"primary",onClick:ee=>o(I.row)},{default:l(()=>[P(k(e(_)("index.table.edit")),1)]),_:2},1032,["onClick"]),t(dt,{title:e(_)("index.table.operation.affirmDelete"),"confirm-button-text":e(_)("index.table.operation.affirm"),"cancel-button-text":e(_)("index.table.operation.cancel"),onConfirm:ee=>D(I.row)},{reference:l(()=>[t(ye,{style:{"margin-left":"10px"},underline:!1,type:"danger"},{default:l(()=>[P(k(e(_)("index.table.operation.delete")),1)]),_:1})]),_:2},1032,["title","confirm-button-text","cancel-button-text","onConfirm"])]),_:1},8,["label"])]),_:1},8,["data"])]),_:1})]),_:1}),t(De,{xl:{span:4},lg:{span:5},md:{span:5},class:"hidden-sm-and-down",style:{"padding-left":"15px"}},{default:l(()=>[t(mt,{ref_key:"labelTreeRef",ref:R,onLabelCheckChange:et,onLabelTreeChange:tt},null,512)]),_:1})]),_:1}),t(pt,{ref_key:"passwordFormRef",ref:g,labelTree:e(n),onAddPassword:i,onUpdatePassword:p},null,8,["labelTree"]),t(ft,{ref_key:"mainPasswordVerifyRef",ref:b,onVerifyPass:Y},null,512),t(wt,{ref_key:"mainPasswordSettingRef",ref:r,onMainPasswordChange:K},null,512),t(_t,{ref_key:"systemSettingRef",ref:x,onUpdateMainPassword:U,onSystemChangeChange:ie},null,512),t(gt,{ref_key:"importExportRef",ref:w,labelTree:e(n),onImportComplete:nt},null,8,["labelTree"])],64)}}},Gl=He(Pl,[["__scopeId","data-v-81603fef"]]);export{Gl as default};
