import{g as _e,b as Oe,n as oe,u as ye,d as ge,e as we,r as O,f as W,w as A,h as C,s as se,i as ie}from"./@vue-b476408c.js";var he=Object.defineProperty,be=Object.defineProperties,Pe=Object.getOwnPropertyDescriptors,x=Object.getOwnPropertySymbols,Se=Object.prototype.hasOwnProperty,$e=Object.prototype.propertyIsEnumerable,Q=(e,t,r)=>t in e?he(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Ee=(e,t)=>{for(var r in t||(t={}))Se.call(t,r)&&Q(e,r,t[r]);if(x)for(var r of x(t))$e.call(t,r)&&Q(e,r,t[r]);return e},Ie=(e,t)=>be(e,Pe(t));function Pt(e,t){var r;const n=se();return ie(()=>{n.value=e()},Ie(Ee({},t),{flush:(r=t==null?void 0:t.flush)!=null?r:"sync"})),W(n)}var z;const L=typeof window<"u",je=e=>typeof e=="function",Ae=e=>typeof e=="string",F=()=>{},De=L&&((z=window==null?void 0:window.navigator)==null?void 0:z.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function D(e){return typeof e=="function"?e():ye(e)}function ue(e,t){function r(...n){return new Promise((a,s)=>{Promise.resolve(e(()=>t.apply(this,n),{fn:t,thisArg:this,args:n})).then(a).catch(s)})}return r}const le=e=>e();function Ne(e,t={}){let r,n,a=F;const s=o=>{clearTimeout(o),a(),a=F};return o=>{const d=D(e),c=D(t.maxWait);return r&&s(r),d<=0||c!==void 0&&c<=0?(n&&(s(n),n=null),Promise.resolve(o())):new Promise((p,m)=>{a=t.rejectOnCancel?m:p,c&&!n&&(n=setTimeout(()=>{r&&s(r),n=null,p(o())},c)),r=setTimeout(()=>{n&&s(n),n=null,p(o())},d)})}}function Ce(e=le){const t=O(!0);function r(){t.value=!1}function n(){t.value=!0}const a=(...s)=>{t.value&&e(...s)};return{isActive:W(t),pause:r,resume:n,eventFilter:a}}function Fe(e){return e}function M(e){return ge()?(we(e),!0):!1}function Te(e,t=200,r={}){return ue(Ne(t,r),e)}function St(e,t=200,r={}){const n=O(e.value),a=Te(()=>{n.value=e.value},t,r);return A(e,()=>a()),n}function Le(e){return typeof e=="function"?C(e):O(e)}function ce(e,t=!0){_e()?Oe(e):t?e():oe(e)}function $t(e,t,r={}){const{immediate:n=!0}=r,a=O(!1);let s=null;function l(){s&&(clearTimeout(s),s=null)}function o(){a.value=!1,l()}function d(...c){l(),a.value=!0,s=setTimeout(()=>{a.value=!1,s=null,e(...c)},D(t))}return n&&(a.value=!0,L&&d()),M(o),{isPending:W(a),start:d,stop:o}}var B=Object.getOwnPropertySymbols,Me=Object.prototype.hasOwnProperty,Re=Object.prototype.propertyIsEnumerable,ke=(e,t)=>{var r={};for(var n in e)Me.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&B)for(var n of B(e))t.indexOf(n)<0&&Re.call(e,n)&&(r[n]=e[n]);return r};function Ve(e,t,r={}){const n=r,{eventFilter:a=le}=n,s=ke(n,["eventFilter"]);return A(e,ue(a,t),s)}var We=Object.defineProperty,xe=Object.defineProperties,Qe=Object.getOwnPropertyDescriptors,T=Object.getOwnPropertySymbols,fe=Object.prototype.hasOwnProperty,pe=Object.prototype.propertyIsEnumerable,J=(e,t,r)=>t in e?We(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,ze=(e,t)=>{for(var r in t||(t={}))fe.call(t,r)&&J(e,r,t[r]);if(T)for(var r of T(t))pe.call(t,r)&&J(e,r,t[r]);return e},Be=(e,t)=>xe(e,Qe(t)),Je=(e,t)=>{var r={};for(var n in e)fe.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&T)for(var n of T(e))t.indexOf(n)<0&&pe.call(e,n)&&(r[n]=e[n]);return r};function He(e,t,r={}){const n=r,{eventFilter:a}=n,s=Je(n,["eventFilter"]),{eventFilter:l,pause:o,resume:d,isActive:c}=Ce(a);return{stop:Ve(e,t,Be(ze({},s),{eventFilter:l})),pause:o,resume:d,isActive:c}}function j(e){var t;const r=D(e);return(t=r==null?void 0:r.$el)!=null?t:r}const h=L?window:void 0,Ue=L?window.document:void 0;function S(...e){let t,r,n,a;if(Ae(e[0])||Array.isArray(e[0])?([r,n,a]=e,t=h):[t,r,n,a]=e,!t)return F;Array.isArray(r)||(r=[r]),Array.isArray(n)||(n=[n]);const s=[],l=()=>{s.forEach(p=>p()),s.length=0},o=(p,m,i,u)=>(p.addEventListener(m,i,u),()=>p.removeEventListener(m,i,u)),d=A(()=>[j(t),D(a)],([p,m])=>{l(),p&&s.push(...r.flatMap(i=>n.map(u=>o(p,i,u,m))))},{immediate:!0,flush:"post"}),c=()=>{d(),l()};return M(c),c}let H=!1;function Et(e,t,r={}){const{window:n=h,ignore:a=[],capture:s=!0,detectIframe:l=!1}=r;if(!n)return;De&&!H&&(H=!0,Array.from(n.document.body.children).forEach(i=>i.addEventListener("click",F)));let o=!0;const d=i=>a.some(u=>{if(typeof u=="string")return Array.from(n.document.querySelectorAll(u)).some(v=>v===i.target||i.composedPath().includes(v));{const v=j(u);return v&&(i.target===v||i.composedPath().includes(v))}}),p=[S(n,"click",i=>{const u=j(e);if(!(!u||u===i.target||i.composedPath().includes(u))){if(i.detail===0&&(o=!d(i)),!o){o=!0;return}t(i)}},{passive:!0,capture:s}),S(n,"pointerdown",i=>{const u=j(e);u&&(o=!i.composedPath().includes(u)&&!d(i))},{passive:!0}),l&&S(n,"blur",i=>{var u;const v=j(e);((u=n.document.activeElement)==null?void 0:u.tagName)==="IFRAME"&&!(v!=null&&v.contains(n.document.activeElement))&&t(i)})].filter(Boolean);return()=>p.forEach(i=>i())}function de(e,t=!1){const r=O(),n=()=>r.value=!!e();return n(),ce(n,t),r}function qe(e,t={}){const{window:r=h}=t,n=de(()=>r&&"matchMedia"in r&&typeof r.matchMedia=="function");let a;const s=O(!1),l=()=>{a&&("removeEventListener"in a?a.removeEventListener("change",o):a.removeListener(o))},o=()=>{n.value&&(l(),a=r.matchMedia(Le(e).value),s.value=a.matches,"addEventListener"in a?a.addEventListener("change",o):a.addListener(o))};return ie(o),M(()=>l()),s}const k=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},V="__vueuse_ssr_handlers__";k[V]=k[V]||{};const Ge=k[V];function ve(e,t){return Ge[e]||t}function Ke(e){return e==null?"any":e instanceof Set?"set":e instanceof Map?"map":e instanceof Date?"date":typeof e=="boolean"?"boolean":typeof e=="string"?"string":typeof e=="object"?"object":Number.isNaN(e)?"any":"number"}var Xe=Object.defineProperty,U=Object.getOwnPropertySymbols,Ye=Object.prototype.hasOwnProperty,Ze=Object.prototype.propertyIsEnumerable,q=(e,t,r)=>t in e?Xe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,G=(e,t)=>{for(var r in t||(t={}))Ye.call(t,r)&&q(e,r,t[r]);if(U)for(var r of U(t))Ze.call(t,r)&&q(e,r,t[r]);return e};const et={boolean:{read:e=>e==="true",write:e=>String(e)},object:{read:e=>JSON.parse(e),write:e=>JSON.stringify(e)},number:{read:e=>Number.parseFloat(e),write:e=>String(e)},any:{read:e=>e,write:e=>String(e)},string:{read:e=>e,write:e=>String(e)},map:{read:e=>new Map(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e.entries()))},set:{read:e=>new Set(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e))},date:{read:e=>new Date(e),write:e=>e.toISOString()}},K="vueuse-storage";function tt(e,t,r,n={}){var a;const{flush:s="pre",deep:l=!0,listenToStorageChanges:o=!0,writeDefaults:d=!0,mergeDefaults:c=!1,shallow:p,window:m=h,eventFilter:i,onError:u=f=>{console.error(f)}}=n,v=(p?se:O)(t);if(!r)try{r=ve("getDefaultStorage",()=>{var f;return(f=h)==null?void 0:f.localStorage})()}catch(f){u(f)}if(!r)return v;const g=D(t),N=Ke(g),b=(a=n.serializer)!=null?a:et[N],{pause:y,resume:P}=He(v,()=>$(v.value),{flush:s,deep:l,eventFilter:i});return m&&o&&(S(m,"storage",w),S(m,K,R)),w(),v;function $(f){try{if(f==null)r.removeItem(e);else{const _=b.write(f),E=r.getItem(e);E!==_&&(r.setItem(e,_),m&&m.dispatchEvent(new CustomEvent(K,{detail:{key:e,oldValue:E,newValue:_,storageArea:r}})))}}catch(_){u(_)}}function I(f){const _=f?f.newValue:r.getItem(e);if(_==null)return d&&g!==null&&r.setItem(e,b.write(g)),g;if(!f&&c){const E=b.read(_);return je(c)?c(E,g):N==="object"&&!Array.isArray(E)?G(G({},g),E):E}else return typeof _!="string"?_:b.read(_)}function R(f){w(f.detail)}function w(f){if(!(f&&f.storageArea!==r)){if(f&&f.key==null){v.value=g;return}if(!(f&&f.key!==e)){y();try{v.value=I(f)}catch(_){u(_)}finally{f?oe(P):P()}}}}}function me(e){return qe("(prefers-color-scheme: dark)",e)}var rt=Object.defineProperty,X=Object.getOwnPropertySymbols,nt=Object.prototype.hasOwnProperty,at=Object.prototype.propertyIsEnumerable,Y=(e,t,r)=>t in e?rt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,ot=(e,t)=>{for(var r in t||(t={}))nt.call(t,r)&&Y(e,r,t[r]);if(X)for(var r of X(t))at.call(t,r)&&Y(e,r,t[r]);return e};function st(e={}){const{selector:t="html",attribute:r="class",initialValue:n="auto",window:a=h,storage:s,storageKey:l="vueuse-color-scheme",listenToStorageChanges:o=!0,storageRef:d,emitAuto:c}=e,p=ot({auto:"",light:"light",dark:"dark"},e.modes||{}),m=me({window:a}),i=C(()=>m.value?"dark":"light"),u=d||(l==null?O(n):tt(l,n,s,{window:a,listenToStorageChanges:o})),v=C({get(){return u.value==="auto"&&!c?i.value:u.value},set(y){u.value=y}}),g=ve("updateHTMLAttrs",(y,P,$)=>{const I=a==null?void 0:a.document.querySelector(y);if(I)if(P==="class"){const R=$.split(/\s/g);Object.values(p).flatMap(w=>(w||"").split(/\s/g)).filter(Boolean).forEach(w=>{R.includes(w)?I.classList.add(w):I.classList.remove(w)})}else I.setAttribute(P,$)});function N(y){var P;const $=y==="auto"?i.value:y;g(t,r,(P=p[$])!=null?P:$)}function b(y){e.onChanged?e.onChanged(y,N):N(y)}return A(v,b,{flush:"post",immediate:!0}),c&&A(i,()=>b(v.value),{flush:"post"}),ce(()=>b(v.value)),v}var it=Object.defineProperty,ut=Object.defineProperties,lt=Object.getOwnPropertyDescriptors,Z=Object.getOwnPropertySymbols,ct=Object.prototype.hasOwnProperty,ft=Object.prototype.propertyIsEnumerable,ee=(e,t,r)=>t in e?it(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,pt=(e,t)=>{for(var r in t||(t={}))ct.call(t,r)&&ee(e,r,t[r]);if(Z)for(var r of Z(t))ft.call(t,r)&&ee(e,r,t[r]);return e},dt=(e,t)=>ut(e,lt(t));function It(e={}){const{valueDark:t="dark",valueLight:r="",window:n=h}=e,a=st(dt(pt({},e),{onChanged:(o,d)=>{var c;e.onChanged?(c=e.onChanged)==null||c.call(e,o==="dark"):d(o)},modes:{dark:t,light:r}})),s=me({window:n});return C({get(){return a.value==="dark"},set(o){o===s.value?a.value="auto":a.value=o?"dark":"light"}})}function jt({document:e=Ue}={}){if(!e)return O("visible");const t=O(e.visibilityState);return S(e,"visibilitychange",()=>{t.value=e.visibilityState}),t}var te=Object.getOwnPropertySymbols,vt=Object.prototype.hasOwnProperty,mt=Object.prototype.propertyIsEnumerable,_t=(e,t)=>{var r={};for(var n in e)vt.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&te)for(var n of te(e))t.indexOf(n)<0&&mt.call(e,n)&&(r[n]=e[n]);return r};function At(e,t,r={}){const n=r,{window:a=h}=n,s=_t(n,["window"]);let l;const o=de(()=>a&&"ResizeObserver"in a),d=()=>{l&&(l.disconnect(),l=void 0)},c=A(()=>j(e),m=>{d(),o.value&&a&&m&&(l=new ResizeObserver(t),l.observe(m,s))},{immediate:!0,flush:"post"}),p=()=>{d(),c()};return M(p),{isSupported:o,stop:p}}var re;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(re||(re={}));var Ot=Object.defineProperty,ne=Object.getOwnPropertySymbols,yt=Object.prototype.hasOwnProperty,gt=Object.prototype.propertyIsEnumerable,ae=(e,t,r)=>t in e?Ot(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,wt=(e,t)=>{for(var r in t||(t={}))yt.call(t,r)&&ae(e,r,t[r]);if(ne)for(var r of ne(t))gt.call(t,r)&&ae(e,r,t[r]);return e};const ht={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};wt({linear:Fe},ht);function Dt({window:e=h}={}){if(!e)return O(!1);const t=O(e.document.hasFocus());return S(e,"blur",()=>{t.value=!1}),S(e,"focus",()=>{t.value=!0}),t}export{At as a,j as b,$t as c,De as d,jt as e,Dt as f,Pt as g,It as h,L as i,Et as o,St as r,M as t,S as u};
