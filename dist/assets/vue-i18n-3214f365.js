import{a as A,i as z,b as d,c as C,d as L,e as Ca,D as We,f as y,g as F,h as K,j as x,r as xe,k as pa,l as Aa,m as J,s as Da,n as Sa,o as G,p as ae,u as Z,q as ye,N as Wa,t as Va,v as wa,w as Ua,x as Ha,y as _a,C as $a,z as ma,A as xa,B as Ge,E as Ye,F as je,G as Ga,H as Ya,I as Be,J as Xe,M as Je,K as ze,L as Ke,O as qe,P as Qe,Q as ja,R as Ze}from"./@intlify-6e8dbf92.js";import{E as Ve,ab as fa,g as te,ao as Ba,z as Xa,b as Ja,W as za,s as Ka,r as S,h as W,C as qa,w as Me,R as ga,A as Qa,S as Za,a3 as et}from"./@vue-8e6a53e5.js";/*!
  * vue-i18n v9.6.0
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */const at="9.6.0";function tt(){typeof __VUE_I18N_FULL_INSTALL__!="boolean"&&(J().__VUE_I18N_FULL_INSTALL__=!0),typeof __VUE_I18N_LEGACY_API__!="boolean"&&(J().__VUE_I18N_LEGACY_API__=!0),typeof __INTLIFY_JIT_COMPILATION__!="boolean"&&(J().__INTLIFY_JIT_COMPILATION__=!1),typeof __INTLIFY_DROP_MESSAGE_COMPILER__!="boolean"&&(J().__INTLIFY_DROP_MESSAGE_COMPILER__=!1),typeof __INTLIFY_PROD_DEVTOOLS__!="boolean"&&(J().__INTLIFY_PROD_DEVTOOLS__=!1)}const ba=ja.__EXTEND_POINT__,$=ma(ba);$(),$(),$(),$(),$(),$(),$(),$();const va=$a.__EXTEND_POINT__,M=ma(va),N={UNEXPECTED_RETURN_TYPE:va,INVALID_ARGUMENT:M(),MUST_BE_CALL_SETUP_TOP:M(),NOT_INSTALLED:M(),NOT_AVAILABLE_IN_LEGACY_MODE:M(),REQUIRED_VALUE:M(),INVALID_VALUE:M(),CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN:M(),NOT_INSTALLED_WITH_PROVIDE:M(),UNEXPECTED_ERROR:M(),NOT_COMPATIBLE_LEGACY_VUE_I18N:M(),BRIDGE_SUPPORT_VUE_2_ONLY:M(),MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION:M(),NOT_AVAILABLE_COMPOSITION_IN_LEGACY:M(),__EXTEND_POINT__:M()};function k(e,...r){return Sa(e,null,void 0)}const Ce=G("__translateVNode"),pe=G("__datetimeParts"),Ae=G("__numberParts"),da=G("__setPluralRules"),Ea=G("__injectWithOption"),De=G("__dispose");function le(e){if(!C(e))return e;for(const r in e)if(ae(e,r))if(!r.includes("."))C(e[r])&&le(e[r]);else{const t=r.split("."),l=t.length-1;let c=e,a=!1;for(let n=0;n<l;n++){if(t[n]in c||(c[t[n]]={}),!C(c[t[n]])){a=!0;break}c=c[t[n]]}a||(c[t[l]]=e[r],delete e[r]),C(c[t[l]])&&le(c[t[l]])}return e}function ce(e,r){const{messages:t,__i18n:l,messageResolver:c,flatJson:a}=r,n=F(t)?t:y(l)?{}:{[e]:{}};if(y(l)&&l.forEach(o=>{if("locale"in o&&"resource"in o){const{locale:_,resource:m}=o;_?(n[_]=n[_]||{},ee(m,n[_])):ee(m,n)}else d(o)&&ee(JSON.parse(o),n)}),c==null&&a)for(const o in n)ae(n,o)&&le(n[o]);return n}const se=e=>!C(e)||y(e);function ee(e,r){if(se(e)||se(r))throw k(N.INVALID_VALUE);for(const t in e)ae(e,t)&&(se(e[t])||se(r[t])?r[t]=e[t]:ee(e[t],r[t]))}function Ia(e){return e.type}function La(e,r,t){let l=C(r.messages)?r.messages:{};"__i18nGlobal"in t&&(l=ce(e.locale.value,{messages:l,__i18n:t.__i18nGlobal}));const c=Object.keys(l);c.length&&c.forEach(a=>{e.mergeLocaleMessage(a,l[a])});{if(C(r.datetimeFormats)){const a=Object.keys(r.datetimeFormats);a.length&&a.forEach(n=>{e.mergeDateTimeFormat(n,r.datetimeFormats[n])})}if(C(r.numberFormats)){const a=Object.keys(r.numberFormats);a.length&&a.forEach(n=>{e.mergeNumberFormat(n,r.numberFormats[n])})}}}function ea(e){return Za(et,null,e,0)}const aa="__INTLIFY_META__";let ta=0;function la(e){return(r,t,l,c)=>e(t,l,te()||void 0,c)}const lt=()=>{const e=te();let r=null;return e&&(r=Ia(e)[aa])?{[aa]:r}:null};function we(e={},r){const{__root:t,__injectWithOption:l}=e,c=t===void 0,a=e.flatJson;let n=L(e.inheritLocale)?e.inheritLocale:!0;const o=S(t&&n?t.locale.value:d(e.locale)?e.locale:We),_=S(t&&n?t.fallbackLocale.value:d(e.fallbackLocale)||y(e.fallbackLocale)||F(e.fallbackLocale)||e.fallbackLocale===!1?e.fallbackLocale:o.value),m=S(ce(o.value,e)),b=S(F(e.datetimeFormats)?e.datetimeFormats:{[o.value]:{}}),v=S(F(e.numberFormats)?e.numberFormats:{[o.value]:{}});let g=t?t.missingWarn:L(e.missingWarn)||K(e.missingWarn)?e.missingWarn:!0,E=t?t.fallbackWarn:L(e.fallbackWarn)||K(e.fallbackWarn)?e.fallbackWarn:!0,h=t?t.fallbackRoot:L(e.fallbackRoot)?e.fallbackRoot:!0,P=!!e.fallbackFormat,V=x(e.missing)?e.missing:null,p=x(e.missing)?la(e.missing):null,D=x(e.postTranslation)?e.postTranslation:null,w=t?t.warnHtmlMessage:L(e.warnHtmlMessage)?e.warnHtmlMessage:!0,Y=!!e.escapeParameter;const j=t?t.modifiers:F(e.modifiers)?e.modifiers:{};let B=e.pluralRules||t&&t.pluralRules,f;f=(()=>{c&&Ze(null);const s={version:at,locale:o.value,fallbackLocale:_.value,messages:m.value,modifiers:j,pluralRules:B,missing:p===null?void 0:p,missingWarn:g,fallbackWarn:E,fallbackFormat:P,unresolving:!0,postTranslation:D===null?void 0:D,warnHtmlMessage:w,escapeParameter:Y,messageResolver:e.messageResolver,messageCompiler:e.messageCompiler,__meta:{framework:"vue"}};s.datetimeFormats=b.value,s.numberFormats=v.value,s.__datetimeFormatters=F(f)?f.__datetimeFormatters:void 0,s.__numberFormatters=F(f)?f.__numberFormatters:void 0;const u=xa(s);return c&&Ze(u),u})(),Z(f,o.value,_.value);function q(){return[o.value,_.value,m.value,b.value,v.value]}const oe=W({get:()=>o.value,set:s=>{o.value=s,f.locale=o.value}}),ue=W({get:()=>_.value,set:s=>{_.value=s,f.fallbackLocale=_.value,Z(f,o.value,s)}}),ie=W(()=>m.value),_e=W(()=>b.value),me=W(()=>v.value);function fe(){return x(D)?D:null}function U(s){D=s,f.postTranslation=s}function ge(){return V}function be(s){s!==null&&(p=la(s)),V=s,f.missing=p}const H=(s,u,O,T,Pe,re)=>{q();let Q;try{__INTLIFY_PROD_DEVTOOLS__&&je(lt()),c||(f.fallbackContext=t?Ga():void 0),Q=s(f)}finally{__INTLIFY_PROD_DEVTOOLS__&&je(null),c||(f.fallbackContext=void 0)}if(z(Q)&&Q===Ya){const[Ma,kt]=u();return t&&h?T(t):Pe(Ma)}else{if(re(Q))return Q;throw k(N.UNEXPECTED_RETURN_TYPE)}};function ne(...s){return H(u=>Reflect.apply(Xe,null,[u,...s]),()=>Be(...s),"translate",u=>Reflect.apply(u.t,u,[...s]),u=>u,u=>d(u))}function ve(...s){const[u,O,T]=s;if(T&&!C(T))throw k(N.INVALID_ARGUMENT);return ne(u,O,A({resolvedMessage:!0},T||{}))}function de(...s){return H(u=>Reflect.apply(Ke,null,[u,...s]),()=>ze(...s),"datetime format",u=>Reflect.apply(u.d,u,[...s]),()=>Je,u=>d(u))}function Ee(...s){return H(u=>Reflect.apply(Qe,null,[u,...s]),()=>qe(...s),"number format",u=>Reflect.apply(u.n,u,[...s]),()=>Je,u=>d(u))}function Ie(s){return s.map(u=>d(u)||z(u)||L(u)?ea(String(u)):u)}const Le={normalize:Ie,interpolate:s=>s,type:"vnode"};function Te(...s){return H(u=>{let O;const T=u;try{T.processor=Le,O=Reflect.apply(Xe,null,[T,...s])}finally{T.processor=null}return O},()=>Be(...s),"translate",u=>u[Ce](...s),u=>[ea(u)],u=>y(u))}function Fe(...s){return H(u=>Reflect.apply(Qe,null,[u,...s]),()=>qe(...s),"number format",u=>u[Ae](...s),()=>[],u=>d(u)||y(u))}function Oe(...s){return H(u=>Reflect.apply(Ke,null,[u,...s]),()=>ze(...s),"datetime format",u=>u[pe](...s),()=>[],u=>d(u)||y(u))}function Ne(s){B=s,f.pluralRules=B}function ke(s,u){if(!s)return!1;const O=d(u)?u:o.value,T=i(O);return d(f.messageResolver(T,s))}function Re(s){let u=null;const O=_a(f,_.value,o.value);for(let T=0;T<O.length;T++){const Pe=m.value[O[T]]||{},re=f.messageResolver(Pe,s);if(re!=null){u=re;break}}return u}function he(s){const u=Re(s);return u??(t?t.tm(s)||{}:{})}function i(s){return m.value[s]||{}}function I(s,u){if(a){const O={[s]:u};for(const T in O)ae(O,T)&&le(O[T]);u=O[s]}m.value[s]=u,f.messages=m.value}function Oa(s,u){m.value[s]=m.value[s]||{};const O={[s]:u};for(const T in O)ae(O,T)&&le(O[T]);u=O[s],ee(u,m.value[s]),f.messages=m.value}function Na(s){return b.value[s]||{}}function ka(s,u){b.value[s]=u,f.datetimeFormats=b.value,Ge(f,s,u)}function Ra(s,u){b.value[s]=A(b.value[s]||{},u),f.datetimeFormats=b.value,Ge(f,s,u)}function ha(s){return v.value[s]||{}}function Pa(s,u){v.value[s]=u,f.numberFormats=v.value,Ye(f,s,u)}function ya(s,u){v.value[s]=A(v.value[s]||{},u),f.numberFormats=v.value,Ye(f,s,u)}ta++,t&&ye&&(Me(t.locale,s=>{n&&(o.value=s,f.locale=s,Z(f,o.value,_.value))}),Me(t.fallbackLocale,s=>{n&&(_.value=s,f.fallbackLocale=s,Z(f,o.value,_.value))}));const R={id:ta,locale:oe,fallbackLocale:ue,get inheritLocale(){return n},set inheritLocale(s){n=s,s&&t&&(o.value=t.locale.value,_.value=t.fallbackLocale.value,Z(f,o.value,_.value))},get availableLocales(){return Object.keys(m.value).sort()},messages:ie,get modifiers(){return j},get pluralRules(){return B||{}},get isGlobal(){return c},get missingWarn(){return g},set missingWarn(s){g=s,f.missingWarn=g},get fallbackWarn(){return E},set fallbackWarn(s){E=s,f.fallbackWarn=E},get fallbackRoot(){return h},set fallbackRoot(s){h=s},get fallbackFormat(){return P},set fallbackFormat(s){P=s,f.fallbackFormat=P},get warnHtmlMessage(){return w},set warnHtmlMessage(s){w=s,f.warnHtmlMessage=s},get escapeParameter(){return Y},set escapeParameter(s){Y=s,f.escapeParameter=s},t:ne,getLocaleMessage:i,setLocaleMessage:I,mergeLocaleMessage:Oa,getPostTranslationHandler:fe,setPostTranslationHandler:U,getMissingHandler:ge,setMissingHandler:be,[da]:Ne};return R.datetimeFormats=_e,R.numberFormats=me,R.rt=ve,R.te=ke,R.tm=he,R.d=de,R.n=Ee,R.getDateTimeFormat=Na,R.setDateTimeFormat=ka,R.mergeDateTimeFormat=Ra,R.getNumberFormat=ha,R.setNumberFormat=Pa,R.mergeNumberFormat=ya,R[Ea]=l,R[Ce]=Te,R[pe]=Oe,R[Ae]=Fe,R}function nt(e){const r=d(e.locale)?e.locale:We,t=d(e.fallbackLocale)||y(e.fallbackLocale)||F(e.fallbackLocale)||e.fallbackLocale===!1?e.fallbackLocale:r,l=x(e.missing)?e.missing:void 0,c=L(e.silentTranslationWarn)||K(e.silentTranslationWarn)?!e.silentTranslationWarn:!0,a=L(e.silentFallbackWarn)||K(e.silentFallbackWarn)?!e.silentFallbackWarn:!0,n=L(e.fallbackRoot)?e.fallbackRoot:!0,o=!!e.formatFallbackMessages,_=F(e.modifiers)?e.modifiers:{},m=e.pluralizationRules,b=x(e.postTranslation)?e.postTranslation:void 0,v=d(e.warnHtmlInMessage)?e.warnHtmlInMessage!=="off":!0,g=!!e.escapeParameterHtml,E=L(e.sync)?e.sync:!0;let h=e.messages;if(F(e.sharedMessages)){const j=e.sharedMessages;h=Object.keys(j).reduce((f,X)=>{const q=f[X]||(f[X]={});return A(q,j[X]),f},h||{})}const{__i18n:P,__root:V,__injectWithOption:p}=e,D=e.datetimeFormats,w=e.numberFormats,Y=e.flatJson;return{locale:r,fallbackLocale:t,messages:h,flatJson:Y,datetimeFormats:D,numberFormats:w,missing:l,missingWarn:c,fallbackWarn:a,fallbackRoot:n,fallbackFormat:o,modifiers:_,pluralRules:m,postTranslation:b,warnHtmlMessage:v,escapeParameter:g,messageResolver:e.messageResolver,inheritLocale:E,__i18n:P,__root:V,__injectWithOption:p}}function Se(e={},r){{const t=we(nt(e)),{__extender:l}=e,c={id:t.id,get locale(){return t.locale.value},set locale(a){t.locale.value=a},get fallbackLocale(){return t.fallbackLocale.value},set fallbackLocale(a){t.fallbackLocale.value=a},get messages(){return t.messages.value},get datetimeFormats(){return t.datetimeFormats.value},get numberFormats(){return t.numberFormats.value},get availableLocales(){return t.availableLocales},get formatter(){return{interpolate(){return[]}}},set formatter(a){},get missing(){return t.getMissingHandler()},set missing(a){t.setMissingHandler(a)},get silentTranslationWarn(){return L(t.missingWarn)?!t.missingWarn:t.missingWarn},set silentTranslationWarn(a){t.missingWarn=L(a)?!a:a},get silentFallbackWarn(){return L(t.fallbackWarn)?!t.fallbackWarn:t.fallbackWarn},set silentFallbackWarn(a){t.fallbackWarn=L(a)?!a:a},get modifiers(){return t.modifiers},get formatFallbackMessages(){return t.fallbackFormat},set formatFallbackMessages(a){t.fallbackFormat=a},get postTranslation(){return t.getPostTranslationHandler()},set postTranslation(a){t.setPostTranslationHandler(a)},get sync(){return t.inheritLocale},set sync(a){t.inheritLocale=a},get warnHtmlInMessage(){return t.warnHtmlMessage?"warn":"off"},set warnHtmlInMessage(a){t.warnHtmlMessage=a!=="off"},get escapeParameterHtml(){return t.escapeParameter},set escapeParameterHtml(a){t.escapeParameter=a},get preserveDirectiveContent(){return!0},set preserveDirectiveContent(a){},get pluralizationRules(){return t.pluralRules||{}},__composer:t,t(...a){const[n,o,_]=a,m={};let b=null,v=null;if(!d(n))throw k(N.INVALID_ARGUMENT);const g=n;return d(o)?m.locale=o:y(o)?b=o:F(o)&&(v=o),y(_)?b=_:F(_)&&(v=_),Reflect.apply(t.t,t,[g,b||v||{},m])},rt(...a){return Reflect.apply(t.rt,t,[...a])},tc(...a){const[n,o,_]=a,m={plural:1};let b=null,v=null;if(!d(n))throw k(N.INVALID_ARGUMENT);const g=n;return d(o)?m.locale=o:z(o)?m.plural=o:y(o)?b=o:F(o)&&(v=o),d(_)?m.locale=_:y(_)?b=_:F(_)&&(v=_),Reflect.apply(t.t,t,[g,b||v||{},m])},te(a,n){return t.te(a,n)},tm(a){return t.tm(a)},getLocaleMessage(a){return t.getLocaleMessage(a)},setLocaleMessage(a,n){t.setLocaleMessage(a,n)},mergeLocaleMessage(a,n){t.mergeLocaleMessage(a,n)},d(...a){return Reflect.apply(t.d,t,[...a])},getDateTimeFormat(a){return t.getDateTimeFormat(a)},setDateTimeFormat(a,n){t.setDateTimeFormat(a,n)},mergeDateTimeFormat(a,n){t.mergeDateTimeFormat(a,n)},n(...a){return Reflect.apply(t.n,t,[...a])},getNumberFormat(a){return t.getNumberFormat(a)},setNumberFormat(a,n){t.setNumberFormat(a,n)},mergeNumberFormat(a,n){t.mergeNumberFormat(a,n)},getChoiceIndex(a,n){return-1}};return c.__extender=l,c}}const Ue={tag:{type:[String,Object]},locale:{type:String},scope:{type:String,validator:e=>e==="parent"||e==="global",default:"parent"},i18n:{type:Object}};function rt({slots:e},r){return r.length===1&&r[0]==="default"?(e.default?e.default():[]).reduce((l,c)=>[...l,...c.type===ga?c.children:[c]],[]):r.reduce((t,l)=>{const c=e[l];return c&&(t[l]=c()),t},{})}function Ta(e){return ga}const st=Ve({name:"i18n-t",props:A({keypath:{type:String,required:!0},plural:{type:[Number,String],validator:e=>z(e)||!isNaN(e)}},Ue),setup(e,r){const{slots:t,attrs:l}=r,c=e.i18n||He({useScope:e.scope,__useComponent:!0});return()=>{const a=Object.keys(t).filter(v=>v!=="_"),n={};e.locale&&(n.locale=e.locale),e.plural!==void 0&&(n.plural=d(e.plural)?+e.plural:e.plural);const o=rt(r,a),_=c[Ce](e.keypath,o,n),m=A({},l),b=d(e.tag)||C(e.tag)?e.tag:Ta();return fa(b,m,_)}}}),na=st;function ct(e){return y(e)&&!d(e[0])}function Fa(e,r,t,l){const{slots:c,attrs:a}=r;return()=>{const n={part:!0};let o={};e.locale&&(n.locale=e.locale),d(e.format)?n.key=e.format:C(e.format)&&(d(e.format.key)&&(n.key=e.format.key),o=Object.keys(e.format).reduce((g,E)=>t.includes(E)?A({},g,{[E]:e.format[E]}):g,{}));const _=l(e.value,n,o);let m=[n.key];y(_)?m=_.map((g,E)=>{const h=c[g.type],P=h?h({[g.type]:g.value,index:E,parts:_}):[g.value];return ct(P)&&(P[0].key=`${g.type}-${E}`),P}):d(_)&&(m=[_]);const b=A({},a),v=d(e.tag)||C(e.tag)?e.tag:Ta();return fa(v,b,m)}}const ot=Ve({name:"i18n-n",props:A({value:{type:Number,required:!0},format:{type:[String,Object]}},Ue),setup(e,r){const t=e.i18n||He({useScope:"parent",__useComponent:!0});return Fa(e,r,Wa,(...l)=>t[Ae](...l))}}),ra=ot,ut=Ve({name:"i18n-d",props:A({value:{type:[Number,Date],required:!0},format:{type:[String,Object]}},Ue),setup(e,r){const t=e.i18n||He({useScope:"parent",__useComponent:!0});return Fa(e,r,Va,(...l)=>t[pe](...l))}}),sa=ut;function it(e,r){const t=e;if(e.mode==="composition")return t.__getInstance(r)||e.global;{const l=t.__getInstance(r);return l!=null?l.__composer:e.global.__composer}}function _t(e){const r=n=>{const{instance:o,modifiers:_,value:m}=n;if(!o||!o.$)throw k(N.UNEXPECTED_ERROR);const b=it(e,o.$),v=ca(m);return[Reflect.apply(b.t,b,[...oa(v)]),b]};return{created:(n,o)=>{const[_,m]=r(o);ye&&e.global===m&&(n.__i18nWatcher=Me(m.locale,()=>{o.instance&&o.instance.$forceUpdate()})),n.__composer=m,n.textContent=_},unmounted:n=>{ye&&n.__i18nWatcher&&(n.__i18nWatcher(),n.__i18nWatcher=void 0,delete n.__i18nWatcher),n.__composer&&(n.__composer=void 0,delete n.__composer)},beforeUpdate:(n,{value:o})=>{if(n.__composer){const _=n.__composer,m=ca(o);n.textContent=Reflect.apply(_.t,_,[...oa(m)])}},getSSRProps:n=>{const[o]=r(n);return{textContent:o}}}}function ca(e){if(d(e))return{path:e};if(F(e)){if(!("path"in e))throw k(N.REQUIRED_VALUE,"path");return e}else throw k(N.INVALID_VALUE)}function oa(e){const{path:r,locale:t,args:l,choice:c,plural:a}=e,n={},o=l||{};return d(t)&&(n.locale=t),z(c)&&(n.plural=c),z(a)&&(n.plural=a),[r,o,n]}function mt(e,r,...t){const l=F(t[0])?t[0]:{},c=!!l.useI18nComponentName;(L(l.globalInstall)?l.globalInstall:!0)&&([c?"i18n":na.name,"I18nT"].forEach(n=>e.component(n,na)),[ra.name,"I18nN"].forEach(n=>e.component(n,ra)),[sa.name,"I18nD"].forEach(n=>e.component(n,sa))),e.directive("t",_t(r))}function ft(e,r,t){return{beforeCreate(){const l=te();if(!l)throw k(N.UNEXPECTED_ERROR);const c=this.$options;if(c.i18n){const a=c.i18n;if(c.__i18n&&(a.__i18n=c.__i18n),a.__root=r,this===this.$root)this.$i18n=ua(e,a);else{a.__injectWithOption=!0,a.__extender=t.__vueI18nExtend,this.$i18n=Se(a);const n=this.$i18n;n.__extender&&(n.__disposer=n.__extender(this.$i18n))}}else if(c.__i18n)if(this===this.$root)this.$i18n=ua(e,c);else{this.$i18n=Se({__i18n:c.__i18n,__injectWithOption:!0,__extender:t.__vueI18nExtend,__root:r});const a=this.$i18n;a.__extender&&(a.__disposer=a.__extender(this.$i18n))}else this.$i18n=e;c.__i18nGlobal&&La(r,c,c),this.$t=(...a)=>this.$i18n.t(...a),this.$rt=(...a)=>this.$i18n.rt(...a),this.$tc=(...a)=>this.$i18n.tc(...a),this.$te=(a,n)=>this.$i18n.te(a,n),this.$d=(...a)=>this.$i18n.d(...a),this.$n=(...a)=>this.$i18n.n(...a),this.$tm=a=>this.$i18n.tm(a),t.__setInstance(l,this.$i18n)},mounted(){},unmounted(){const l=te();if(!l)throw k(N.UNEXPECTED_ERROR);const c=this.$i18n;delete this.$t,delete this.$rt,delete this.$tc,delete this.$te,delete this.$d,delete this.$n,delete this.$tm,c.__disposer&&(c.__disposer(),delete c.__disposer,delete c.__extender),t.__deleteInstance(l),delete this.$i18n}}}function ua(e,r){e.locale=r.locale||e.locale,e.fallbackLocale=r.fallbackLocale||e.fallbackLocale,e.missing=r.missing||e.missing,e.silentTranslationWarn=r.silentTranslationWarn||e.silentFallbackWarn,e.silentFallbackWarn=r.silentFallbackWarn||e.silentFallbackWarn,e.formatFallbackMessages=r.formatFallbackMessages||e.formatFallbackMessages,e.postTranslation=r.postTranslation||e.postTranslation,e.warnHtmlInMessage=r.warnHtmlInMessage||e.warnHtmlInMessage,e.escapeParameterHtml=r.escapeParameterHtml||e.escapeParameterHtml,e.sync=r.sync||e.sync,e.__composer[da](r.pluralizationRules||e.pluralizationRules);const t=ce(e.locale,{messages:r.messages,__i18n:r.__i18n});return Object.keys(t).forEach(l=>e.mergeLocaleMessage(l,t[l])),r.datetimeFormats&&Object.keys(r.datetimeFormats).forEach(l=>e.mergeDateTimeFormat(l,r.datetimeFormats[l])),r.numberFormats&&Object.keys(r.numberFormats).forEach(l=>e.mergeNumberFormat(l,r.numberFormats[l])),e}const gt=G("global-vue-i18n");function Pt(e={},r){const t=__VUE_I18N_LEGACY_API__&&L(e.legacy)?e.legacy:__VUE_I18N_LEGACY_API__,l=L(e.globalInjection)?e.globalInjection:!0,c=__VUE_I18N_LEGACY_API__&&t?!!e.allowComposition:!0,a=new Map,[n,o]=bt(e,t),_=G("");function m(g){return a.get(g)||null}function b(g,E){a.set(g,E)}function v(g){a.delete(g)}{const g={get mode(){return __VUE_I18N_LEGACY_API__&&t?"legacy":"composition"},get allowComposition(){return c},async install(E,...h){if(E.__VUE_I18N_SYMBOL__=_,E.provide(E.__VUE_I18N_SYMBOL__,g),F(h[0])){const p=h[0];g.__composerExtend=p.__composerExtend,g.__vueI18nExtend=p.__vueI18nExtend}let P=null;!t&&l&&(P=Nt(E,g.global)),__VUE_I18N_FULL_INSTALL__&&mt(E,g,...h),__VUE_I18N_LEGACY_API__&&t&&E.mixin(ft(o,o.__composer,g));const V=E.unmount;E.unmount=()=>{P&&P(),g.dispose(),V()}},get global(){return o},dispose(){n.stop()},__instances:a,__getInstance:m,__setInstance:b,__deleteInstance:v};return g}}function He(e={}){const r=te();if(r==null)throw k(N.MUST_BE_CALL_SETUP_TOP);if(!r.isCE&&r.appContext.app!=null&&!r.appContext.app.__VUE_I18N_SYMBOL__)throw k(N.NOT_INSTALLED);const t=vt(r),l=Et(t),c=Ia(r),a=dt(e,c);if(__VUE_I18N_LEGACY_API__&&t.mode==="legacy"&&!e.__useComponent){if(!t.allowComposition)throw k(N.NOT_AVAILABLE_IN_LEGACY_MODE);return Ft(r,a,l,e)}if(a==="global")return La(l,e,c),l;if(a==="parent"){let _=It(t,r,e.__useComponent);return _==null&&(_=l),_}const n=t;let o=n.__getInstance(r);if(o==null){const _=A({},e);"__i18n"in c&&(_.__i18n=c.__i18n),l&&(_.__root=l),o=we(_),n.__composerExtend&&(o[De]=n.__composerExtend(o)),Tt(n,r,o),n.__setInstance(r,o)}return o}function bt(e,r,t){const l=Ba();{const c=__VUE_I18N_LEGACY_API__&&r?l.run(()=>Se(e)):l.run(()=>we(e));if(c==null)throw k(N.UNEXPECTED_ERROR);return[l,c]}}function vt(e){{const r=Xa(e.isCE?gt:e.appContext.app.__VUE_I18N_SYMBOL__);if(!r)throw k(e.isCE?N.NOT_INSTALLED_WITH_PROVIDE:N.UNEXPECTED_ERROR);return r}}function dt(e,r){return Ca(e)?"__i18n"in r?"local":"global":e.useScope?e.useScope:"local"}function Et(e){return e.mode==="composition"?e.global:e.global.__composer}function It(e,r,t=!1){let l=null;const c=r.root;let a=Lt(r,t);for(;a!=null;){const n=e;if(e.mode==="composition")l=n.__getInstance(a);else if(__VUE_I18N_LEGACY_API__){const o=n.__getInstance(a);o!=null&&(l=o.__composer,t&&l&&!l[Ea]&&(l=null))}if(l!=null||c===a)break;a=a.parent}return l}function Lt(e,r=!1){return e==null?null:r&&e.vnode.ctx||e.parent}function Tt(e,r,t){Ja(()=>{},r),za(()=>{const l=t;e.__deleteInstance(r);const c=l[De];c&&(c(),delete l[De])},r)}function Ft(e,r,t,l={}){const c=r==="local",a=Ka(null);if(c&&e.proxy&&!(e.proxy.$options.i18n||e.proxy.$options.__i18n))throw k(N.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION);const n=L(l.inheritLocale)?l.inheritLocale:!d(l.locale),o=S(!c||n?t.locale.value:d(l.locale)?l.locale:We),_=S(!c||n?t.fallbackLocale.value:d(l.fallbackLocale)||y(l.fallbackLocale)||F(l.fallbackLocale)||l.fallbackLocale===!1?l.fallbackLocale:o.value),m=S(ce(o.value,l)),b=S(F(l.datetimeFormats)?l.datetimeFormats:{[o.value]:{}}),v=S(F(l.numberFormats)?l.numberFormats:{[o.value]:{}}),g=c?t.missingWarn:L(l.missingWarn)||K(l.missingWarn)?l.missingWarn:!0,E=c?t.fallbackWarn:L(l.fallbackWarn)||K(l.fallbackWarn)?l.fallbackWarn:!0,h=c?t.fallbackRoot:L(l.fallbackRoot)?l.fallbackRoot:!0,P=!!l.fallbackFormat,V=x(l.missing)?l.missing:null,p=x(l.postTranslation)?l.postTranslation:null,D=c?t.warnHtmlMessage:L(l.warnHtmlMessage)?l.warnHtmlMessage:!0,w=!!l.escapeParameter,Y=c?t.modifiers:F(l.modifiers)?l.modifiers:{},j=l.pluralRules||c&&t.pluralRules;function B(){return[o.value,_.value,m.value,b.value,v.value]}const f=W({get:()=>a.value?a.value.locale.value:o.value,set:i=>{a.value&&(a.value.locale.value=i),o.value=i}}),X=W({get:()=>a.value?a.value.fallbackLocale.value:_.value,set:i=>{a.value&&(a.value.fallbackLocale.value=i),_.value=i}}),q=W(()=>a.value?a.value.messages.value:m.value),oe=W(()=>b.value),ue=W(()=>v.value);function ie(){return a.value?a.value.getPostTranslationHandler():p}function _e(i){a.value&&a.value.setPostTranslationHandler(i)}function me(){return a.value?a.value.getMissingHandler():V}function fe(i){a.value&&a.value.setMissingHandler(i)}function U(i){return B(),i()}function ge(...i){return a.value?U(()=>Reflect.apply(a.value.t,null,[...i])):U(()=>"")}function be(...i){return a.value?Reflect.apply(a.value.rt,null,[...i]):""}function H(...i){return a.value?U(()=>Reflect.apply(a.value.d,null,[...i])):U(()=>"")}function ne(...i){return a.value?U(()=>Reflect.apply(a.value.n,null,[...i])):U(()=>"")}function ve(i){return a.value?a.value.tm(i):{}}function de(i,I){return a.value?a.value.te(i,I):!1}function Ee(i){return a.value?a.value.getLocaleMessage(i):{}}function Ie(i,I){a.value&&(a.value.setLocaleMessage(i,I),m.value[i]=I)}function $e(i,I){a.value&&a.value.mergeLocaleMessage(i,I)}function Le(i){return a.value?a.value.getDateTimeFormat(i):{}}function Te(i,I){a.value&&(a.value.setDateTimeFormat(i,I),b.value[i]=I)}function Fe(i,I){a.value&&a.value.mergeDateTimeFormat(i,I)}function Oe(i){return a.value?a.value.getNumberFormat(i):{}}function Ne(i,I){a.value&&(a.value.setNumberFormat(i,I),v.value[i]=I)}function ke(i,I){a.value&&a.value.mergeNumberFormat(i,I)}const Re={get id(){return a.value?a.value.id:-1},locale:f,fallbackLocale:X,messages:q,datetimeFormats:oe,numberFormats:ue,get inheritLocale(){return a.value?a.value.inheritLocale:n},set inheritLocale(i){a.value&&(a.value.inheritLocale=i)},get availableLocales(){return a.value?a.value.availableLocales:Object.keys(m.value)},get modifiers(){return a.value?a.value.modifiers:Y},get pluralRules(){return a.value?a.value.pluralRules:j},get isGlobal(){return a.value?a.value.isGlobal:!1},get missingWarn(){return a.value?a.value.missingWarn:g},set missingWarn(i){a.value&&(a.value.missingWarn=i)},get fallbackWarn(){return a.value?a.value.fallbackWarn:E},set fallbackWarn(i){a.value&&(a.value.missingWarn=i)},get fallbackRoot(){return a.value?a.value.fallbackRoot:h},set fallbackRoot(i){a.value&&(a.value.fallbackRoot=i)},get fallbackFormat(){return a.value?a.value.fallbackFormat:P},set fallbackFormat(i){a.value&&(a.value.fallbackFormat=i)},get warnHtmlMessage(){return a.value?a.value.warnHtmlMessage:D},set warnHtmlMessage(i){a.value&&(a.value.warnHtmlMessage=i)},get escapeParameter(){return a.value?a.value.escapeParameter:w},set escapeParameter(i){a.value&&(a.value.escapeParameter=i)},t:ge,getPostTranslationHandler:ie,setPostTranslationHandler:_e,getMissingHandler:me,setMissingHandler:fe,rt:be,d:H,n:ne,tm:ve,te:de,getLocaleMessage:Ee,setLocaleMessage:Ie,mergeLocaleMessage:$e,getDateTimeFormat:Le,setDateTimeFormat:Te,mergeDateTimeFormat:Fe,getNumberFormat:Oe,setNumberFormat:Ne,mergeNumberFormat:ke};function he(i){i.locale.value=o.value,i.fallbackLocale.value=_.value,Object.keys(m.value).forEach(I=>{i.mergeLocaleMessage(I,m.value[I])}),Object.keys(b.value).forEach(I=>{i.mergeDateTimeFormat(I,b.value[I])}),Object.keys(v.value).forEach(I=>{i.mergeNumberFormat(I,v.value[I])}),i.escapeParameter=w,i.fallbackFormat=P,i.fallbackRoot=h,i.fallbackWarn=E,i.missingWarn=g,i.warnHtmlMessage=D}return qa(()=>{if(e.proxy==null||e.proxy.$i18n==null)throw k(N.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);const i=a.value=e.proxy.$i18n.__composer;r==="global"?(o.value=i.locale.value,_.value=i.fallbackLocale.value,m.value=i.messages.value,b.value=i.datetimeFormats.value,v.value=i.numberFormats.value):c&&he(i)}),Re}const Ot=["locale","fallbackLocale","availableLocales"],ia=["t","rt","d","n","tm","te"];function Nt(e,r){const t=Object.create(null);return Ot.forEach(c=>{const a=Object.getOwnPropertyDescriptor(r,c);if(!a)throw k(N.UNEXPECTED_ERROR);const n=Qa(a.value)?{get(){return a.value.value},set(o){a.value.value=o}}:{get(){return a.get&&a.get()}};Object.defineProperty(t,c,n)}),e.config.globalProperties.$i18n=t,ia.forEach(c=>{const a=Object.getOwnPropertyDescriptor(r,c);if(!a||!a.value)throw k(N.UNEXPECTED_ERROR);Object.defineProperty(e.config.globalProperties,`$${c}`,a)}),()=>{delete e.config.globalProperties.$i18n,ia.forEach(c=>{delete e.config.globalProperties[`$${c}`]})}}tt();__INTLIFY_JIT_COMPILATION__?xe(wa):xe(Ua);pa(Ha);Aa(_a);if(__INTLIFY_PROD_DEVTOOLS__){const e=J();e.__INTLIFY__=!0,Da(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__)}export{Pt as c,He as u};