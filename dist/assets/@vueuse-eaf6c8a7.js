import{g as le,b as ge,n as ce,u as he,d as we,e as be,s as fe,w as de,r as z,f as _,h as S,i as C}from"./@vue-b395b1c5.js";var Pe=Object.defineProperty,Se=Object.defineProperties,$e=Object.getOwnPropertyDescriptors,k=Object.getOwnPropertySymbols,Ee=Object.prototype.hasOwnProperty,je=Object.prototype.propertyIsEnumerable,B=(e,t,r)=>t in e?Pe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Ie=(e,t)=>{for(var r in t||(t={}))Ee.call(t,r)&&B(e,r,t[r]);if(k)for(var r of k(t))je.call(t,r)&&B(e,r,t[r]);return e},De=(e,t)=>Se(e,$e(t));function At(e,t){var r;const n=fe();return de(()=>{n.value=e()},De(Ie({},t),{flush:(r=t==null?void 0:t.flush)!=null?r:"sync"})),z(n)}var H;const x=typeof window<"u",Ne=e=>typeof e<"u",pe=e=>typeof e=="function",Ae=e=>typeof e=="string",F=()=>{},Ce=x&&((H=window==null?void 0:window.navigator)==null?void 0:H.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function I(e){return typeof e=="function"?e():he(e)}function Q(e,t){function r(...n){return new Promise((a,i)=>{Promise.resolve(e(()=>t.apply(this,n),{fn:t,thisArg:this,args:n})).then(a).catch(i)})}return r}const ve=e=>e();function Fe(e,t={}){let r,n,a=F;const i=o=>{clearTimeout(o),a(),a=F};return o=>{const l=I(e),c=I(t.maxWait);return r&&i(r),l<=0||c!==void 0&&c<=0?(n&&(i(n),n=null),Promise.resolve(o())):new Promise((p,v)=>{a=t.rejectOnCancel?v:p,c&&!n&&(n=setTimeout(()=>{r&&i(r),n=null,p(o())},c)),r=setTimeout(()=>{n&&i(n),n=null,p(o())},l)})}}function Te(e,t=!0,r=!0,n=!1){let a=0,i,s=!0,o=F,l;const c=()=>{i&&(clearTimeout(i),i=void 0,o(),o=F)};return v=>{const u=I(e),d=Date.now()-a,f=()=>l=v();return c(),u<=0?(a=Date.now(),f()):(d>u&&(r||!s)?(a=Date.now(),f()):t&&(l=new Promise((O,y)=>{o=n?y:O,i=setTimeout(()=>{a=Date.now(),s=!0,O(f()),c()},Math.max(0,u-d))})),!r&&!i&&(i=setTimeout(()=>s=!0,u)),s=!1,l)}}function Me(e=ve){const t=_(!0);function r(){t.value=!1}function n(){t.value=!0}const a=(...i)=>{t.value&&e(...i)};return{isActive:z(t),pause:r,resume:n,eventFilter:a}}function xe(e){return e}function T(e){return we()?(be(e),!0):!1}function Le(e,t=200,r={}){return Q(Fe(t,r),e)}function Ct(e,t=200,r={}){const n=_(e.value),a=Le(()=>{n.value=e.value},t,r);return S(e,()=>a()),n}function Ft(e,t=200,r=!1,n=!0,a=!1){return Q(Te(t,r,n,a),e)}function Re(e){return typeof e=="function"?C(e):_(e)}function L(e,t=!0){le()?ge(e):t?e():ce(e)}function Tt(e,t,r={}){const{immediate:n=!0}=r,a=_(!1);let i=null;function s(){i&&(clearTimeout(i),i=null)}function o(){a.value=!1,s()}function l(...c){s(),a.value=!0,i=setTimeout(()=>{a.value=!1,i=null,e(...c)},I(t))}return n&&(a.value=!0,x&&l()),T(o),{isPending:z(a),start:l,stop:o}}var U=Object.getOwnPropertySymbols,Ve=Object.prototype.hasOwnProperty,We=Object.prototype.propertyIsEnumerable,ze=(e,t)=>{var r={};for(var n in e)Ve.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&U)for(var n of U(e))t.indexOf(n)<0&&We.call(e,n)&&(r[n]=e[n]);return r};function Qe(e,t,r={}){const n=r,{eventFilter:a=ve}=n,i=ze(n,["eventFilter"]);return S(e,Q(a,t),i)}var Je=Object.defineProperty,ke=Object.defineProperties,Be=Object.getOwnPropertyDescriptors,M=Object.getOwnPropertySymbols,me=Object.prototype.hasOwnProperty,_e=Object.prototype.propertyIsEnumerable,q=(e,t,r)=>t in e?Je(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,He=(e,t)=>{for(var r in t||(t={}))me.call(t,r)&&q(e,r,t[r]);if(M)for(var r of M(t))_e.call(t,r)&&q(e,r,t[r]);return e},Ue=(e,t)=>ke(e,Be(t)),qe=(e,t)=>{var r={};for(var n in e)me.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&M)for(var n of M(e))t.indexOf(n)<0&&_e.call(e,n)&&(r[n]=e[n]);return r};function Ge(e,t,r={}){const n=r,{eventFilter:a}=n,i=qe(n,["eventFilter"]),{eventFilter:s,pause:o,resume:l,isActive:c}=Me(a);return{stop:Qe(e,t,Ue(He({},i),{eventFilter:s})),pause:o,resume:l,isActive:c}}function E(e){var t;const r=I(e);return(t=r==null?void 0:r.$el)!=null?t:r}const $=x?window:void 0,Ke=x?window.document:void 0;function P(...e){let t,r,n,a;if(Ae(e[0])||Array.isArray(e[0])?([r,n,a]=e,t=$):[t,r,n,a]=e,!t)return F;Array.isArray(r)||(r=[r]),Array.isArray(n)||(n=[n]);const i=[],s=()=>{i.forEach(p=>p()),i.length=0},o=(p,v,u,d)=>(p.addEventListener(v,u,d),()=>p.removeEventListener(v,u,d)),l=S(()=>[E(t),I(a)],([p,v])=>{s(),p&&i.push(...r.flatMap(u=>n.map(d=>o(p,u,d,v))))},{immediate:!0,flush:"post"}),c=()=>{l(),s()};return T(c),c}let G=!1;function Mt(e,t,r={}){const{window:n=$,ignore:a=[],capture:i=!0,detectIframe:s=!1}=r;if(!n)return;Ce&&!G&&(G=!0,Array.from(n.document.body.children).forEach(u=>u.addEventListener("click",F)));let o=!0;const l=u=>a.some(d=>{if(typeof d=="string")return Array.from(n.document.querySelectorAll(d)).some(f=>f===u.target||u.composedPath().includes(f));{const f=E(d);return f&&(u.target===f||u.composedPath().includes(f))}}),p=[P(n,"click",u=>{const d=E(e);if(!(!d||d===u.target||u.composedPath().includes(d))){if(u.detail===0&&(o=!l(u)),!o){o=!0;return}t(u)}},{passive:!0,capture:i}),P(n,"pointerdown",u=>{const d=E(e);d&&(o=!u.composedPath().includes(d)&&!l(u))},{passive:!0}),s&&P(n,"blur",u=>{var d;const f=E(e);((d=n.document.activeElement)==null?void 0:d.tagName)==="IFRAME"&&!(f!=null&&f.contains(n.document.activeElement))&&t(u)})].filter(Boolean);return()=>p.forEach(u=>u())}function J(e,t=!1){const r=_(),n=()=>r.value=!!e();return n(),L(n,t),r}function Xe(e,t={}){const{window:r=$}=t,n=J(()=>r&&"matchMedia"in r&&typeof r.matchMedia=="function");let a;const i=_(!1),s=()=>{a&&("removeEventListener"in a?a.removeEventListener("change",o):a.removeListener(o))},o=()=>{n.value&&(s(),a=r.matchMedia(Re(e).value),i.value=a.matches,"addEventListener"in a?a.addEventListener("change",o):a.addListener(o))};return de(o),T(()=>s()),i}function Ye(e){return JSON.parse(JSON.stringify(e))}const V=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},W="__vueuse_ssr_handlers__";V[W]=V[W]||{};const Ze=V[W];function Oe(e,t){return Ze[e]||t}function et(e){return e==null?"any":e instanceof Set?"set":e instanceof Map?"map":e instanceof Date?"date":typeof e=="boolean"?"boolean":typeof e=="string"?"string":typeof e=="object"?"object":Number.isNaN(e)?"any":"number"}var tt=Object.defineProperty,K=Object.getOwnPropertySymbols,rt=Object.prototype.hasOwnProperty,nt=Object.prototype.propertyIsEnumerable,X=(e,t,r)=>t in e?tt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Y=(e,t)=>{for(var r in t||(t={}))rt.call(t,r)&&X(e,r,t[r]);if(K)for(var r of K(t))nt.call(t,r)&&X(e,r,t[r]);return e};const at={boolean:{read:e=>e==="true",write:e=>String(e)},object:{read:e=>JSON.parse(e),write:e=>JSON.stringify(e)},number:{read:e=>Number.parseFloat(e),write:e=>String(e)},any:{read:e=>e,write:e=>String(e)},string:{read:e=>e,write:e=>String(e)},map:{read:e=>new Map(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e.entries()))},set:{read:e=>new Set(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e))},date:{read:e=>new Date(e),write:e=>e.toISOString()}},Z="vueuse-storage";function ot(e,t,r,n={}){var a;const{flush:i="pre",deep:s=!0,listenToStorageChanges:o=!0,writeDefaults:l=!0,mergeDefaults:c=!1,shallow:p,window:v=$,eventFilter:u,onError:d=m=>{console.error(m)}}=n,f=(p?fe:_)(t);if(!r)try{r=Oe("getDefaultStorage",()=>{var m;return(m=$)==null?void 0:m.localStorage})()}catch(m){d(m)}if(!r)return f;const O=I(t),y=et(O),g=(a=n.serializer)!=null?a:at[y],{pause:h,resume:w}=Ge(f,()=>D(f.value),{flush:i,deep:s,eventFilter:u});return v&&o&&(P(v,"storage",j),P(v,Z,R)),j(),f;function D(m){try{if(m==null)r.removeItem(e);else{const b=g.write(m),N=r.getItem(e);N!==b&&(r.setItem(e,b),v&&v.dispatchEvent(new CustomEvent(Z,{detail:{key:e,oldValue:N,newValue:b,storageArea:r}})))}}catch(b){d(b)}}function A(m){const b=m?m.newValue:r.getItem(e);if(b==null)return l&&O!==null&&r.setItem(e,g.write(O)),O;if(!m&&c){const N=g.read(b);return pe(c)?c(N,O):y==="object"&&!Array.isArray(N)?Y(Y({},O),N):N}else return typeof b!="string"?b:g.read(b)}function R(m){j(m.detail)}function j(m){if(!(m&&m.storageArea!==r)){if(m&&m.key==null){f.value=O;return}if(!(m&&m.key!==e)){h();try{f.value=A(m)}catch(b){d(b)}finally{m?ce(w):w()}}}}}function ye(e){return Xe("(prefers-color-scheme: dark)",e)}var it=Object.defineProperty,ee=Object.getOwnPropertySymbols,st=Object.prototype.hasOwnProperty,ut=Object.prototype.propertyIsEnumerable,te=(e,t,r)=>t in e?it(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,lt=(e,t)=>{for(var r in t||(t={}))st.call(t,r)&&te(e,r,t[r]);if(ee)for(var r of ee(t))ut.call(t,r)&&te(e,r,t[r]);return e};function ct(e={}){const{selector:t="html",attribute:r="class",initialValue:n="auto",window:a=$,storage:i,storageKey:s="vueuse-color-scheme",listenToStorageChanges:o=!0,storageRef:l,emitAuto:c}=e,p=lt({auto:"",light:"light",dark:"dark"},e.modes||{}),v=ye({window:a}),u=C(()=>v.value?"dark":"light"),d=l||(s==null?_(n):ot(s,n,i,{window:a,listenToStorageChanges:o})),f=C({get(){return d.value==="auto"&&!c?u.value:d.value},set(h){d.value=h}}),O=Oe("updateHTMLAttrs",(h,w,D)=>{const A=a==null?void 0:a.document.querySelector(h);if(A)if(w==="class"){const R=D.split(/\s/g);Object.values(p).flatMap(j=>(j||"").split(/\s/g)).filter(Boolean).forEach(j=>{R.includes(j)?A.classList.add(j):A.classList.remove(j)})}else A.setAttribute(w,D)});function y(h){var w;const D=h==="auto"?u.value:h;O(t,r,(w=p[D])!=null?w:D)}function g(h){e.onChanged?e.onChanged(h,y):y(h)}return S(f,g,{flush:"post",immediate:!0}),c&&S(u,()=>g(f.value),{flush:"post"}),L(()=>g(f.value)),f}function xt(e,t,{window:r=$,initialValue:n=""}={}){const a=_(n),i=C(()=>{var s;return E(t)||((s=r==null?void 0:r.document)==null?void 0:s.documentElement)});return S([i,()=>I(e)],([s,o])=>{var l;if(s&&r){const c=(l=r.getComputedStyle(s).getPropertyValue(o))==null?void 0:l.trim();a.value=c||n}},{immediate:!0}),S(a,s=>{var o;(o=i.value)!=null&&o.style&&i.value.style.setProperty(I(e),s)}),a}var ft=Object.defineProperty,dt=Object.defineProperties,pt=Object.getOwnPropertyDescriptors,re=Object.getOwnPropertySymbols,vt=Object.prototype.hasOwnProperty,mt=Object.prototype.propertyIsEnumerable,ne=(e,t,r)=>t in e?ft(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,_t=(e,t)=>{for(var r in t||(t={}))vt.call(t,r)&&ne(e,r,t[r]);if(re)for(var r of re(t))mt.call(t,r)&&ne(e,r,t[r]);return e},Ot=(e,t)=>dt(e,pt(t));function Lt(e={}){const{valueDark:t="dark",valueLight:r="",window:n=$}=e,a=ct(Ot(_t({},e),{onChanged:(o,l)=>{var c;e.onChanged?(c=e.onChanged)==null||c.call(e,o==="dark"):l(o)},modes:{dark:t,light:r}})),i=ye({window:n});return C({get(){return a.value==="dark"},set(o){o===i.value?a.value="auto":a.value=o?"dark":"light"}})}function Rt({document:e=Ke}={}){if(!e)return _("visible");const t=_(e.visibilityState);return P(e,"visibilitychange",()=>{t.value=e.visibilityState}),t}var ae=Object.getOwnPropertySymbols,yt=Object.prototype.hasOwnProperty,gt=Object.prototype.propertyIsEnumerable,ht=(e,t)=>{var r={};for(var n in e)yt.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&ae)for(var n of ae(e))t.indexOf(n)<0&&gt.call(e,n)&&(r[n]=e[n]);return r};function wt(e,t,r={}){const n=r,{window:a=$}=n,i=ht(n,["window"]);let s;const o=J(()=>a&&"ResizeObserver"in a),l=()=>{s&&(s.disconnect(),s=void 0)},c=S(()=>E(e),v=>{l(),o.value&&a&&v&&(s=new ResizeObserver(t),s.observe(v,i))},{immediate:!0,flush:"post"}),p=()=>{l(),c()};return T(p),{isSupported:o,stop:p}}function Vt(e,t={}){const{reset:r=!0,windowResize:n=!0,windowScroll:a=!0,immediate:i=!0}=t,s=_(0),o=_(0),l=_(0),c=_(0),p=_(0),v=_(0),u=_(0),d=_(0);function f(){const O=E(e);if(!O){r&&(s.value=0,o.value=0,l.value=0,c.value=0,p.value=0,v.value=0,u.value=0,d.value=0);return}const y=O.getBoundingClientRect();s.value=y.height,o.value=y.bottom,l.value=y.left,c.value=y.right,p.value=y.top,v.value=y.width,u.value=y.x,d.value=y.y}return wt(e,f),S(()=>E(e),O=>!O&&f()),a&&P("scroll",f,{capture:!0,passive:!0}),n&&P("resize",f,{passive:!0}),L(()=>{i&&f()}),{height:s,bottom:o,left:l,right:c,top:p,width:v,x:u,y:d,update:f}}var oe=Object.getOwnPropertySymbols,bt=Object.prototype.hasOwnProperty,Pt=Object.prototype.propertyIsEnumerable,St=(e,t)=>{var r={};for(var n in e)bt.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&oe)for(var n of oe(e))t.indexOf(n)<0&&Pt.call(e,n)&&(r[n]=e[n]);return r};function Wt(e,t,r={}){const n=r,{window:a=$}=n,i=St(n,["window"]);let s;const o=J(()=>a&&"MutationObserver"in a),l=()=>{s&&(s.disconnect(),s=void 0)},c=S(()=>E(e),v=>{l(),o.value&&a&&v&&(s=new MutationObserver(t),s.observe(v,i))},{immediate:!0}),p=()=>{l(),c()};return T(p),{isSupported:o,stop:p}}var ie;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(ie||(ie={}));var $t=Object.defineProperty,se=Object.getOwnPropertySymbols,Et=Object.prototype.hasOwnProperty,jt=Object.prototype.propertyIsEnumerable,ue=(e,t,r)=>t in e?$t(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,It=(e,t)=>{for(var r in t||(t={}))Et.call(t,r)&&ue(e,r,t[r]);if(se)for(var r of se(t))jt.call(t,r)&&ue(e,r,t[r]);return e};const Dt={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};It({linear:xe},Dt);function zt(e,t,r,n={}){var a,i,s;const{clone:o=!1,passive:l=!1,eventName:c,deep:p=!1,defaultValue:v}=n,u=le(),d=r||(u==null?void 0:u.emit)||((a=u==null?void 0:u.$emit)==null?void 0:a.bind(u))||((s=(i=u==null?void 0:u.proxy)==null?void 0:i.$emit)==null?void 0:s.bind(u==null?void 0:u.proxy));let f=c;t||(t="modelValue"),f=c||f||`update:${t.toString()}`;const O=g=>o?pe(o)?o(g):Ye(g):g,y=()=>Ne(e[t])?O(e[t]):v;if(l){const g=y(),h=_(g);return S(()=>e[t],w=>h.value=O(w)),S(h,w=>{(w!==e[t]||p)&&d(f,w)},{deep:p}),h}else return C({get(){return y()},set(g){d(f,g)}})}function Qt({window:e=$}={}){if(!e)return _(!1);const t=_(e.document.hasFocus());return P(e,"blur",()=>{t.value=!1}),P(e,"focus",()=>{t.value=!0}),t}function Jt(e={}){const{window:t=$,initialWidth:r=1/0,initialHeight:n=1/0,listenOrientation:a=!0,includeScrollbar:i=!0}=e,s=_(r),o=_(n),l=()=>{t&&(i?(s.value=t.innerWidth,o.value=t.innerHeight):(s.value=t.document.documentElement.clientWidth,o.value=t.document.documentElement.clientHeight))};return l(),L(l),P("resize",l,{passive:!0}),a&&P("orientationchange",l,{passive:!0}),{width:s,height:o}}export{P as a,Jt as b,Vt as c,wt as d,Ft as e,xt as f,Tt as g,Ce as h,x as i,Rt as j,Qt as k,At as l,zt as m,Wt as n,Mt as o,Lt as p,Ct as r,T as t,E as u};
