"use strict";var CarousSupportChat=(()=>{var m=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var z=Object.getOwnPropertyNames;var H=Object.prototype.hasOwnProperty;var D=(a,t)=>{for(var e in t)m(a,e,{get:t[e],enumerable:!0})},B=(a,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of z(t))!H.call(a,i)&&i!==e&&m(a,i,{get:()=>t[i],enumerable:!(s=$(t,i))||s.enumerable});return a};var F=a=>B(m({},"__esModule",{value:!0}),a);var Y={};D(Y,{default:()=>W,mount:()=>v});var y=`/* Carous Support \u2014 self-contained widget styles.
   All design tokens are scoped under .sc-root so the widget looks identical
   on ANY host site (no dependency on the host's CSS variables). */
.sc-root{
  --sc-brand:#2E5BFF; --sc-brand-strong:#1F41D6; --sc-brand-soft:#7D9BFF;
  --sc-grad:linear-gradient(115deg,#F45EE2 0%,#2E5BFF 78%);
  --sc-magenta:#E94FD8; --sc-danger:#F04438; --sc-online:#17B26A;
  --sc-surface:#fff; --sc-surface-2:#f7f8fb; --sc-surface-sunk:#eef1fb;
  --sc-border:#e3e8f4; --sc-border-strong:#c9d1e8;
  --sc-text:#0d1430; --sc-text-soft:#49537A; --sc-text-faint:#8b94bb;
  --sc-sh-sm:0 1px 3px rgba(16,16,24,.09),0 1px 2px rgba(16,16,24,.05);
  --sc-sh-lg:0 18px 44px rgba(16,16,24,.18),0 6px 16px rgba(16,16,24,.09);
  --sc-sh-brand:0 10px 26px rgba(46,91,255,.34);
  --sc-z:2147483400;
  --sc-font:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --sc-font-head:var(--sc-font);
  --sc-mono:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
}
.sc-root.sc-dark{
  --sc-surface:#121A40; --sc-surface-2:#0f1636; --sc-surface-sunk:#0b1030;
  --sc-border:#26305c; --sc-border-strong:#36417a;
  --sc-text:#EDF0FF; --sc-text-soft:#A9B4DD; --sc-text-faint:#7681ad;
  --sc-sh-lg:0 18px 50px rgba(0,0,0,.55);
}
.sc-root,.sc-root *{box-sizing:border-box}
.sc-root{position:fixed;z-index:var(--sc-z);font-family:var(--sc-font);font-size:14.5px;line-height:1.5;color:var(--sc-text)}
.sc-root.sc-br{right:22px;bottom:22px}
.sc-root.sc-bl{left:22px;bottom:22px}

.sc-fab{width:56px;height:56px;border-radius:50%;border:0;cursor:pointer;background:var(--sc-grad);box-shadow:var(--sc-sh-brand);display:grid;place-items:center;color:#fff;position:relative;transition:transform .18s}
.sc-fab:hover{transform:translateY(-2px) scale(1.04)}
.sc-fab svg{width:24px;height:24px}
.sc-fab .sc-ic-x{display:none}
.sc-open .sc-fab .sc-ic-chat{display:none}.sc-open .sc-fab .sc-ic-x{display:block}
.sc-fab::after{content:"";position:absolute;inset:-5px;border-radius:50%;border:2px solid var(--sc-brand-soft);opacity:0;animation:sc-ring 2.6s ease-out infinite}
.sc-open .sc-fab::after{display:none}
@keyframes sc-ring{0%{opacity:.5;transform:scale(.8)}80%,100%{opacity:0;transform:scale(1.25)}}
/* delayed entrance + periodic attention shake */
.sc-root:not(.sc-revealed) .sc-fab{opacity:0;transform:scale(0);pointer-events:none}
.sc-root:not(.sc-revealed) .sc-teaser{display:none}
.sc-revealed .sc-fab{animation:sc-reveal .62s cubic-bezier(.2,.8,.2,1)}
.sc-fab.sc-shake{animation:sc-shake .82s ease}
@keyframes sc-reveal{0%{opacity:0;transform:scale(0) rotate(-25deg)}55%{opacity:1;transform:scale(1.12) rotate(10deg)}70%{transform:scale(.94) rotate(-6deg)}85%{transform:scale(1.03) rotate(3deg)}100%{opacity:1;transform:scale(1) rotate(0)}}
@keyframes sc-shake{0%,100%{transform:rotate(0)}12%{transform:rotate(-13deg) scale(1.05)}24%{transform:rotate(11deg) scale(1.05)}38%{transform:rotate(-9deg)}52%{transform:rotate(7deg)}66%{transform:rotate(-4deg)}80%{transform:rotate(2deg)}}
.sc-badge{position:absolute;top:-2px;right:-2px;min-width:18px;height:18px;border-radius:999px;background:var(--sc-magenta);color:#fff;font-size:10.5px;font-weight:700;display:grid;place-items:center;padding:0 5px;border:2px solid var(--sc-surface)}
.sc-open .sc-badge,.sc-badge.sc-hide{display:none}

.sc-teaser{position:absolute;bottom:4px;width:222px;background:var(--sc-surface);color:var(--sc-text);border:1px solid var(--sc-border);border-radius:12px;box-shadow:var(--sc-sh-lg);padding:11px 26px 11px 12px;font-size:13px;line-height:1.4;animation:sc-pop .35s ease both}
.sc-br .sc-teaser{right:66px}.sc-bl .sc-teaser{left:66px}
.sc-teaser b{font-weight:800}
.sc-teaser .sc-tclose{position:absolute;top:4px;right:7px;cursor:pointer;color:var(--sc-text-faint);font-size:13px}
.sc-open .sc-teaser,.sc-teaser.sc-hide{display:none}
@keyframes sc-pop{from{opacity:0;transform:scale(.85) translateY(8px)}to{opacity:1;transform:none}}

.sc-panel{position:absolute;bottom:68px;width:356px;max-width:calc(100vw - 28px);height:min(560px,calc(100vh - 110px));background:var(--sc-surface);border:1px solid var(--sc-border);border-radius:16px;box-shadow:var(--sc-sh-lg);display:none;flex-direction:column;overflow:hidden}
.sc-br .sc-panel{right:0}.sc-bl .sc-panel{left:0}
.sc-open .sc-panel{display:flex;animation:sc-panel .24s cubic-bezier(.2,.8,.2,1) both}
@keyframes sc-panel{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:none}}
@media(max-width:480px){.sc-panel{width:calc(100vw - 24px);height:calc(100vh - 96px)}}

.sc-head{background:var(--sc-grad);color:#fff;padding:12px 13px;position:relative;overflow:hidden}
.sc-head::after{content:"";position:absolute;right:-30px;top:-50px;width:150px;height:150px;border-radius:50%;background:rgba(255,255,255,.12)}
.sc-hrow{display:flex;align-items:center;gap:10px;position:relative;z-index:1}
.sc-ava{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.2);border:1.5px solid rgba(255,255,255,.45);display:grid;place-items:center;flex:none;font-weight:800;font-size:13px}
.sc-ava svg{width:18px;height:18px}.sc-ava.sc-agent{background:#0A0F2C;border-color:rgba(255,255,255,.5)}
.sc-who{flex:1;min-width:0}
.sc-who .sc-t{font-weight:800;font-size:14.5px;line-height:1.1}
.sc-who .sc-s{display:flex;align-items:center;gap:5px;font-size:11.5px;color:rgba(255,255,255,.9);margin-top:2px}
.sc-who .sc-s .sc-d{width:6px;height:6px;border-radius:50%;background:#7CFFB2}
.sc-hbtn{width:28px;height:28px;border-radius:7px;border:0;background:rgba(255,255,255,.16);color:#fff;cursor:pointer;display:grid;place-items:center}
.sc-hbtn:hover{background:rgba(255,255,255,.28)}.sc-hbtn svg{width:16px;height:16px}

.sc-body{flex:1;overflow-y:auto;padding:13px;background:var(--sc-surface-2);display:flex;flex-direction:column;gap:9px;position:relative}
.sc-body::-webkit-scrollbar{width:7px}.sc-body::-webkit-scrollbar-thumb{background:var(--sc-border-strong);border-radius:7px}
.sc-drop{position:absolute;inset:0;background:var(--sc-surface);opacity:.97;display:none;flex-direction:column;align-items:center;justify-content:center;gap:9px;color:var(--sc-brand-strong);font-weight:700;font-size:13.5px;z-index:6}
.sc-drop .sc-ring{width:54px;height:54px;border-radius:50%;border:2px dashed var(--sc-brand);display:grid;place-items:center;color:var(--sc-brand)}
.sc-drop .sc-ring svg{width:24px;height:24px}
.sc-panel.sc-dragging .sc-drop{display:flex}

.sc-msg,.sc-sys,.sc-chips,.sc-kb,.sc-wait{animation:sc-rise .3s ease both}
@keyframes sc-rise{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.sc-msg{display:flex;flex-direction:column;max-width:84%}
.sc-msg.sc-out{align-self:flex-end;align-items:flex-end}
.sc-msg.sc-in{align-self:flex-start;align-items:flex-start}
/* connecting / waiting-for-agent card */
.sc-wait{align-self:center;display:flex;flex-direction:column;align-items:center;gap:7px;margin:6px 0;padding:16px 18px;background:var(--sc-surface);border:1px solid var(--sc-border);border-radius:14px;box-shadow:var(--sc-sh-sm);text-align:center;max-width:82%}
.sc-wava{width:46px;height:46px;border-radius:50%;background:var(--sc-grad);color:#fff;display:grid;place-items:center;position:relative}
.sc-wava svg{width:22px;height:22px}
.sc-wava::after{content:"";position:absolute;inset:-5px;border-radius:50%;border:2px solid var(--sc-brand-soft);animation:sc-ring 1.8s ease-out infinite}
.sc-wt{font-weight:800;font-size:13.5px;color:var(--sc-text)}
.sc-ws{font-size:12px;color:var(--sc-text-soft)}
.sc-wdots{display:flex;gap:4px;margin-top:2px}
.sc-wdots i{width:6px;height:6px;border-radius:50%;background:var(--sc-text-faint);animation:sc-td 1.3s infinite}
.sc-wdots i:nth-child(2){animation-delay:.18s}.sc-wdots i:nth-child(3){animation-delay:.36s}
.sc-human .sc-talk{display:none}
.sc-connecting .sc-who .sc-d{background:#FFB020}
.sc-nm{font-size:10.5px;font-weight:700;color:var(--sc-text-soft);margin:0 0 3px 2px;display:flex;align-items:center;gap:5px}
.sc-nm .sc-pf{width:17px;height:17px;border-radius:50%;background:#0A0F2C;color:#fff;display:grid;place-items:center;font-size:8.5px}
.sc-nm i{color:var(--sc-brand);font-style:normal;font-weight:600}
.sc-bub{padding:8px 11px;border-radius:13px;font-size:13.5px;line-height:1.45;box-shadow:var(--sc-sh-sm);word-wrap:break-word;overflow-wrap:anywhere}
.sc-msg.sc-in .sc-bub{background:var(--sc-surface);border:1px solid var(--sc-border);border-bottom-left-radius:4px;color:var(--sc-text)}
.sc-msg.sc-out .sc-bub{background:var(--sc-brand);color:#fff;border-bottom-right-radius:4px}
.sc-bub.sc-media{padding:4px}.sc-bub.sc-media img{display:block;border-radius:9px;max-width:210px;max-height:160px;object-fit:cover}
.sc-bub a{color:inherit;font-weight:700;text-decoration:underline}
.sc-file{display:flex;align-items:center;gap:9px;min-width:150px}
.sc-file .sc-fi{width:30px;height:30px;border-radius:7px;display:grid;place-items:center;flex:none;background:rgba(255,255,255,.2)}
.sc-msg.sc-in .sc-file .sc-fi{background:var(--sc-surface-sunk);color:var(--sc-brand)}
.sc-file .sc-fi svg{width:15px;height:15px}
.sc-file .sc-fn{font-weight:700;font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:130px}
.sc-file .sc-fs{font-size:10.5px;opacity:.8;font-family:var(--sc-mono)}
.sc-voice{display:flex;align-items:center;gap:9px;min-width:140px}
.sc-voice .sc-pl{width:28px;height:28px;border-radius:50%;border:0;cursor:pointer;display:grid;place-items:center;flex:none;background:rgba(255,255,255,.22);color:#fff}
.sc-msg.sc-in .sc-voice .sc-pl{background:var(--sc-brand);color:#fff}.sc-voice .sc-pl svg{width:13px;height:13px}
.sc-voice .sc-wave{display:flex;align-items:center;gap:2px;height:20px}
.sc-voice .sc-wave i{width:2.5px;border-radius:2px;background:currentColor;opacity:.75}
.sc-voice .sc-dur{font-size:10.5px;font-weight:600;opacity:.9;font-family:var(--sc-mono)}
.sc-sys{align-self:center;text-align:center;font-size:11.5px;color:var(--sc-text-soft);background:var(--sc-surface-sunk);border:1px solid var(--sc-border);border-radius:999px;padding:4px 11px;font-weight:600}
.sc-sys b{color:var(--sc-text)}
.sc-typing .sc-bub{display:flex;gap:4px;padding:11px 12px}
.sc-typing .sc-bub i{width:6px;height:6px;border-radius:50%;background:var(--sc-text-faint);display:block;animation:sc-td 1.3s infinite}
.sc-typing .sc-bub i:nth-child(2){animation-delay:.18s}.sc-typing .sc-bub i:nth-child(3){animation-delay:.36s}
@keyframes sc-td{0%,60%,100%{opacity:.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}
.sc-chips{display:flex;flex-wrap:wrap;gap:7px}
.sc-chip{border:1px solid var(--sc-border-strong);background:var(--sc-surface);color:var(--sc-brand-strong);font-family:inherit;font-weight:600;font-size:12.5px;border-radius:999px;padding:6px 11px;cursor:pointer;transition:.14s}
.sc-chip:hover{border-color:var(--sc-brand);background:var(--sc-surface-sunk)}

.sc-foot{border-top:1px solid var(--sc-border);background:var(--sc-surface)}
.sc-stage{display:flex;gap:7px;flex-wrap:wrap;padding:9px 10px 0}
.sc-stage:empty{display:none}
.sc-att{position:relative;border:1px solid var(--sc-border);border-radius:9px;background:var(--sc-surface-2);padding:5px 7px;display:flex;align-items:center;gap:7px;font-size:11.5px;font-weight:600;max-width:150px}
.sc-att img{width:28px;height:28px;border-radius:6px;object-fit:cover;flex:none}
.sc-att .sc-fi{width:28px;height:28px;border-radius:6px;background:var(--sc-surface-sunk);color:var(--sc-brand);display:grid;place-items:center;flex:none}
.sc-att .sc-fi svg{width:14px;height:14px}
.sc-att .sc-nm2{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sc-att .sc-rm{cursor:pointer;color:var(--sc-text-faint);font-size:13px;line-height:1;flex:none}
.sc-comp{display:flex;align-items:center;gap:6px;padding:9px 10px}
.sc-ibtn{width:34px;height:34px;border-radius:9px;border:0;background:transparent;color:var(--sc-text-soft);cursor:pointer;display:grid;place-items:center;flex:none}
.sc-ibtn:hover{background:var(--sc-surface-sunk);color:var(--sc-brand)}.sc-ibtn svg{width:18px;height:18px}
.sc-comp input{flex:1;border:1.5px solid var(--sc-border-strong);border-radius:999px;height:38px;padding:0 14px;font-family:inherit;font-size:13.5px;background:var(--sc-surface-2);color:var(--sc-text);min-width:0}
.sc-comp input:focus{outline:none;border-color:var(--sc-brand);background:var(--sc-surface)}
.sc-snd{width:38px;height:38px;border-radius:50%;border:0;background:var(--sc-grad);color:#fff;cursor:pointer;display:grid;place-items:center;flex:none;box-shadow:var(--sc-sh-brand)}
.sc-snd svg{width:17px;height:17px}
.sc-rec{display:none;align-items:center;gap:9px;padding:9px 11px}
.sc-foot.sc-recording .sc-comp{display:none}
.sc-foot.sc-recording .sc-rec{display:flex}
.sc-rec .sc-dot{width:10px;height:10px;border-radius:50%;background:var(--sc-danger);animation:sc-blink 1s infinite;flex:none}
@keyframes sc-blink{50%{opacity:.25}}
.sc-rec .sc-tm{font-family:var(--sc-mono);font-size:13px;font-weight:600;flex:none}
.sc-rec .sc-rw{flex:1;display:flex;align-items:center;gap:2px;height:22px;overflow:hidden}
.sc-rec .sc-rw i{width:2.5px;border-radius:2px;background:var(--sc-brand-soft);animation:sc-bar 1s ease-in-out infinite}
@keyframes sc-bar{0%,100%{height:5px}50%{height:18px}}
.sc-rec .sc-cx,.sc-rec .sc-ok{width:34px;height:34px;border-radius:50%;border:0;cursor:pointer;display:grid;place-items:center;flex:none}
.sc-rec .sc-cx{background:var(--sc-surface-sunk);color:var(--sc-text-soft)}.sc-rec .sc-cx svg{width:16px;height:16px}
.sc-rec .sc-ok{background:var(--sc-grad);color:#fff;box-shadow:var(--sc-sh-brand)}.sc-rec .sc-ok svg{width:16px;height:16px}
.sc-pb{text-align:center;font-size:10px;color:var(--sc-text-faint);padding:0 0 7px;font-family:var(--sc-mono)}
.sc-pb b{color:var(--sc-text-soft)}
@media(prefers-reduced-motion:reduce){.sc-root *{animation:none!important;transition:none!important}}
`;var P={chat:'<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>',x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',min:'<line x1="5" y1="12" x2="19" y2="12"/>',send:'<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',clip:'<path d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/>',headset:'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a9 9 0 0 1 18 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',doc:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/>',go:'<polyline points="9 18 15 12 9 6"/>',play:'<polygon points="6 4 20 12 6 20 6 4"/>',trash:'<polyline points="3 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/>',check:'<path d="M20 6 9 17l-5-5"/>',upload:'<path d="M12 3v13"/><path d="m7 8 5-5 5 5"/><path d="M5 21h14"/>',user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'},c=a=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${P[a]||""}</svg>`,R=/human|person|team|agent|talk to|speak to|someone|call me|representative|complain|raise a/i,w="carous-support-chat-styles";function d(a,t,e){let s=document.createElement(a);return t&&(s.className=t),e!=null&&(s.innerHTML=e),s}function l(a){return a.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t])}function A(a){return a<1024?`${a} B`:a<1048576?`${(a/1024).toFixed(0)} KB`:`${(a/1048576).toFixed(1)} MB`}function k(a){return`${Math.floor(a/60)}:${`0${a%60}`.slice(-2)}`}function S(a){return a.split(" ").map(t=>t[0]||"").join("").slice(0,2).toUpperCase()}function E(a){let t="";for(let e=0;e<a;e++)t+=`<i style="height:${4+Math.round(Math.abs(Math.sin(e*1.7))*14)}px"></i>`;return t}function j(){return"s_"+Math.random().toString(36).slice(2)+Date.now().toString(36)}var O={title:"Support",subtitle:"Online \xB7 replies in a few mins",greeting:"\u{1F44B} Hi there! How can we help? Send us a message and we'll get you sorted.",suggestions:[],placeholder:"Type a message\u2026",poweredBy:"Powered by Carous",teaser:"\u{1F44B} Need a hand? Message us and we'll help.",position:"bottom-right",theme:"light",voice:!0,attachments:!0,teamName:"the team",agentName:"Sam"},b=class{constructor(t){this.msgs=[];this.staged=[];this.history=[];this.mode="ai";this.engaged=!1;this.userKey="";this.lastPath=typeof location!="undefined"?location.pathname:"";this.recorder=null;this.recChunks=[];this.recTimer=null;this.recSecs=0;this.revealed=!1;this.nudgeTimer=null;var e;this.cfg=t,this.sessionId=this.loadSession(),this.root=this.build(),document.body.appendChild(this.root),this.reset(),this.wireLocation(),t.openByDefault?(this.reveal(),this.open()):window.setTimeout(()=>this.reveal(),Math.max(0,(e=this.cfg.revealDelay)!=null?e:1800))}reveal(){this.revealed||(this.revealed=!0,this.root.classList.add("sc-revealed"),this.startNudge())}startNudge(){var e;let t=(e=this.cfg.nudgeInterval)!=null?e:15e3;!t||t<2e3||(this.nudgeTimer=window.setInterval(()=>{if(this.root.classList.contains("sc-open"))return;let s=this.root.querySelector(".sc-fab");s&&(s.classList.remove("sc-shake"),s.offsetWidth,s.classList.add("sc-shake"),window.setTimeout(()=>s.classList.remove("sc-shake"),900))},t))}get(t){let e=this.cfg[t];return e==null?O[t]:e}isDemo(){return this.cfg.demo===!0||!this.cfg.endpoint&&!this.cfg.apiBase}chatUrl(){return this.cfg.endpoint?this.cfg.endpoint:this.cfg.apiBase?this.cfg.apiBase.replace(/\/$/,"")+"/chat":null}storeKey(){return"carous_support_"+(this.cfg.clientId||"default")}loadSession(){try{let t=localStorage.getItem(this.storeKey());if(t){let e=JSON.parse(t);if(e.id&&Date.now()-e.ts<14*864e5)return this.history=Array.isArray(e.history)?e.history.slice(-40):[],e.id}}catch{}return j()}saveSession(){try{localStorage.setItem(this.storeKey(),JSON.stringify({id:this.sessionId,ts:Date.now(),history:this.history.slice(-40)}))}catch{}}build(){let t=this.get("position")==="bottom-left"?"sc-bl":"sc-br",e=this.get("theme")==="dark"?" sc-dark":"",s=d("div",`sc-root ${t}${e}`);typeof this.cfg.zIndex=="number"&&s.style.setProperty("--sc-z",String(this.cfg.zIndex)),this.cfg.primaryColor&&(s.style.setProperty("--sc-brand",this.cfg.primaryColor),this.cfg.gradient||s.style.setProperty("--sc-grad",`linear-gradient(135deg, ${this.cfg.primaryColor}, ${this.cfg.primaryColor})`)),this.cfg.gradient&&s.style.setProperty("--sc-grad",this.cfg.gradient);let i=this.get("voice"),r=this.get("attachments");s.innerHTML=`
      <div class="sc-panel">
        <div class="sc-head"><div class="sc-hrow">
          <div class="sc-ava" data-ava></div>
          <div class="sc-who"><div class="sc-t">${l(this.get("title"))}</div>
            <div class="sc-s"><span class="sc-d"></span> <span data-status>${l(this.get("subtitle"))}</span></div></div>
          <button class="sc-hbtn sc-talk" data-talk title="Talk to a person">${c("user")}</button>
          <button class="sc-hbtn" data-min title="Minimise">${c("min")}</button>
        </div></div>
        <div class="sc-body" data-thread><div class="sc-drop"><span class="sc-ring">${c("upload")}</span> Drop to attach</div></div>
        <div class="sc-foot" data-foot>
          <div class="sc-stage" data-stage></div>
          <div class="sc-comp">
            ${r?`<button class="sc-ibtn" data-att title="Attach">${c("clip")}</button>`:""}
            <input data-input placeholder="${l(this.get("placeholder"))}" />
            ${i?`<button class="sc-ibtn" data-mic title="Record a voice note">${c("mic")}</button>`:""}
            <button class="sc-snd" data-send>${c("send")}</button>
          </div>
          <div class="sc-rec" data-rec>
            <span class="sc-dot"></span><span class="sc-tm" data-tm>0:00</span>
            <span class="sc-rw">${E(46)}</span>
            <button class="sc-cx" data-cancel title="Cancel">${c("trash")}</button>
            <button class="sc-ok" data-stop title="Send">${c("check")}</button>
          </div>
          <div class="sc-pb"><b>${l(this.get("poweredBy"))}</b></div>
        </div>
      </div>
      <button class="sc-fab" data-fab aria-label="Open support chat">
        <span class="sc-badge" data-badge>1</span>
        <span class="sc-ic-chat">${c("chat")}</span><span class="sc-ic-x">${c("x")}</span>
      </button>
      <div class="sc-teaser" data-teaser><span class="sc-tclose" data-tclose>\u2715</span>${this.get("teaser")}</div>
      <input type="file" data-file multiple accept="image/*,application/pdf,.doc,.docx,.txt" style="display:none" />`;let n=p=>s.querySelector(p);return this.panel=n(".sc-panel"),this.thread=n("[data-thread]"),this.foot=n("[data-foot]"),this.statusEl=n("[data-status]"),this.avaEl=n("[data-ava]"),this.input=n("[data-input]"),this.fileInput=n("[data-file]"),this.stageEl=n("[data-stage]"),this.badge=n("[data-badge]"),n("[data-fab]").addEventListener("click",()=>this.toggle()),n("[data-min]").addEventListener("click",()=>this.close()),n("[data-talk]").addEventListener("click",()=>this.handoff()),n("[data-send]").addEventListener("click",()=>this.send()),n("[data-tclose]").addEventListener("click",()=>{s.querySelector("[data-teaser]").classList.add("sc-hide")}),this.input.addEventListener("keydown",p=>{p.key==="Enter"&&this.send()}),r&&(n("[data-att]").addEventListener("click",()=>this.fileInput.click()),this.fileInput.addEventListener("change",()=>{this.fileInput.files&&this.addFiles(this.fileInput.files),this.fileInput.value=""}),this.wireDragDrop()),i&&(n("[data-mic]").addEventListener("click",()=>this.startRec()),n("[data-stop]").addEventListener("click",()=>this.endRec(!0)),n("[data-cancel]").addEventListener("click",()=>this.endRec(!1))),s}open(){this.root.classList.add("sc-open"),this.badge.classList.add("sc-hide"),this.input.focus(),this.engaged||this.loadSuggestions()}close(){this.root.classList.remove("sc-open")}toggle(){this.root.classList.contains("sc-open")?this.close():this.open()}bubble(t){var e;if(t.img)return d("div","sc-bub sc-media",`<img src="${t.img}" alt="attachment">`);if(t.file)return d("div","sc-bub",`<div class="sc-file"><span class="sc-fi">${c("doc")}</span><span><span class="sc-fn">${l(t.file.name)}</span><br><span class="sc-fs">${A(t.file.size)}</span></span></div>`);if(t.voice){let s=d("div","sc-bub",`<div class="sc-voice"><button class="sc-pl">${c("play")}</button><span class="sc-wave">${E(22)}</span><span class="sc-dur">${t.voice.dur}</span></div>`);if(t.voice.url){let i=new Audio(t.voice.url);(e=s.querySelector(".sc-pl"))==null||e.addEventListener("click",()=>{i.paused?i.play():i.pause()})}return s}return d("div","sc-bub",t.html||"")}render(){this.thread.querySelectorAll(".sc-msg,.sc-sys,.sc-chips,.sc-kb,.sc-wait").forEach(t=>t.remove());for(let t of this.msgs){if(t.who==="sys"){this.thread.appendChild(d("div","sc-sys",t.html));continue}if(t.who==="wait"){this.thread.appendChild(d("div","sc-wait",`<span class="sc-wava">${c("headset")}</span><div class="sc-wt">Connecting you to a teammate</div><div class="sc-ws">Waiting for an agent to join\u2026</div><span class="sc-wdots"><i></i><i></i><i></i></span>`));continue}if(t.who==="chips"){let i=d("div","sc-chips");t.items.forEach(r=>{let n=d("button","sc-chip",r);n.addEventListener("click",()=>this.send(r)),i.appendChild(n)}),this.thread.appendChild(i);continue}if(t.who==="kb"){let i=d("div","sc-kb");t.items.forEach(r=>{let n=d("a",void 0,`<span class="sc-ic">${c("doc")}</span><span><span class="sc-t">${l(r.t)}</span><br><span class="sc-s">${l(r.s)}</span></span><span class="sc-go">${c("go")}</span>`);n.href=r.href||"#",r.href||n.addEventListener("click",p=>p.preventDefault()),n.target="_blank",n.rel="noopener",i.appendChild(n)}),this.thread.appendChild(i);continue}let e=t.who==="user",s=d("div",`sc-msg ${e?"sc-out":"sc-in"}`);t.who==="agent"&&s.appendChild(d("div","sc-nm",`<span class="sc-pf">${S(this.get("agentName"))}</span>${l(this.get("agentName"))} <i>\xB7 ${l(this.get("teamName"))}</i>`)),s.appendChild(this.bubble(t)),this.thread.appendChild(s)}this.thread.scrollTop=this.thread.scrollHeight}push(t){this.msgs.push(t),this.render()}typing(t){let e=this.thread.querySelector(".sc-typing");if(e&&e.remove(),t){let s=d("div","sc-msg sc-in sc-typing");s.appendChild(d("div","sc-bub","<i></i><i></i><i></i>")),this.thread.appendChild(s),this.thread.scrollTop=this.thread.scrollHeight}}renderStage(){this.stageEl.innerHTML="",this.staged.forEach((t,e)=>{var i;let s=d("div","sc-att",(t.img?`<img src="${t.img}">`:`<span class="sc-fi">${c("doc")}</span>`)+`<span class="sc-nm2">${l(t.name)}</span><span class="sc-rm">\u2715</span>`);(i=s.querySelector(".sc-rm"))==null||i.addEventListener("click",()=>{this.staged.splice(e,1),this.renderStage()}),this.stageEl.appendChild(s)})}addFiles(t){Array.prototype.slice.call(t).forEach(e=>{this.staged.push({name:e.name,size:e.size,type:e.type,img:/^image\//.test(e.type)?URL.createObjectURL(e):null,file:e})}),this.renderStage()}wireDragDrop(){let t=0;["dragenter","dragover"].forEach(e=>this.panel.addEventListener(e,s=>{s.preventDefault(),e==="dragenter"&&t++,this.panel.classList.add("sc-dragging")})),this.panel.addEventListener("dragleave",e=>{e.preventDefault(),t--,t<=0&&(t=0,this.panel.classList.remove("sc-dragging"))}),this.panel.addEventListener("drop",e=>{e.preventDefault(),t=0,this.panel.classList.remove("sc-dragging");let s=e.dataTransfer;s&&s.files.length&&this.addFiles(s.files)})}async uploadStaged(){for(let t of this.staged){let e=t.img||"";if(this.cfg.uploadEndpoint)try{let s=new FormData;s.append("file",t.file),this.cfg.clientId&&s.append("clientId",this.cfg.clientId);let i=await fetch(this.cfg.uploadEndpoint,{method:"POST",body:s});if(i.ok){let r=await i.json();r.url&&(e=r.url)}}catch{}this.push(t.img?{who:"user",img:e}:{who:"user",file:{name:t.name,size:t.size}})}this.staged=[],this.renderStage()}async send(t){let e=(t!=null?t:this.input.value).trim();if(!e&&!this.staged.length)return;this.engaged=!0,t||(this.input.value=""),this.msgs=this.msgs.filter(i=>i.who!=="chips");let s=this.staged.length>0;if(s&&await this.uploadStaged(),e&&(this.push({who:"user",html:l(e)}),this.history.push({role:"user",content:e}),this.saveSession()),this.mode!=="human"){if(e&&R.test(e))return this.handoff();e?this.isDemo()?this.demoReply(e):this.streamReply(e):s&&(this.typing(!0),window.setTimeout(()=>{this.typing(!1),this.push({who:"bot",html:"Thanks \u2014 got that. A teammate will take a look. Anything else in the meantime?"}),window.setTimeout(()=>this.push({who:"chips",items:["Talk to the team"]}),200)},800))}}async streamReply(t){let e=this.chatUrl();if(!e)return this.demoReply(t);this.typing(!0);let s={who:"bot",html:""},i=!1,r="";try{let n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify({clientId:this.cfg.clientId,sessionId:this.sessionId,message:t,history:this.history.slice(-20),user:this.cfg.user})});if(!n.ok||!n.body)throw new Error(`HTTP ${n.status}`);let p=n.body.getReader(),L=new TextDecoder,f="";for(;;){let{value:C,done:M}=await p.read();if(M)break;f+=L.decode(C,{stream:!0});let x=f.split(`

`);f=x.pop()||"";for(let I of x){let h=this.parseSSE(I);if(h)if(h.type==="token"&&h.text)r+=h.text,i||(i=!0,this.typing(!1),this.push(s)),s.html=l(r).replace(/\n/g,"<br>"),this.render();else{if(h.type==="handoff")return this.typing(!1),this.handoff();if(h.type==="error"){this.typing(!1),i||this.push({who:"bot",html:h.text||"Sorry, something went wrong \u2014 please try again."});return}else h.type}}}this.typing(!1),i||this.push({who:"bot",html:"Sorry, I didn't catch that \u2014 could you rephrase?"}),r&&(this.history.push({role:"assistant",content:r}),this.saveSession())}catch{this.typing(!1),this.push({who:"bot",html:"We're having trouble connecting right now. You can still leave a message and the team will follow up."}),this.push({who:"chips",items:["Talk to the team"]})}}parseSSE(t){let e="message",s=[];for(let n of t.split(`
`))n.startsWith("event:")?e=n.slice(6).trim():n.startsWith("data:")&&s.push(n.slice(5).trim());if(!s.length)return null;let i=s.join(`
`);if(i==="[DONE]")return{type:"done"};let r=i;try{let n=JSON.parse(i);typeof n.delta=="string"?r=n.delta:typeof n.content=="string"?r=n.content:typeof n.message=="string"?r=n.message:typeof n=="string"&&(r=n)}catch{}return e==="token"||e==="message"?{type:"token",text:r}:{type:e,text:r}}demoReply(t){let e=t.toLowerCase();this.typing(!0),window.setTimeout(()=>{this.typing(!1);let s=(...i)=>window.setTimeout(()=>this.push({who:"chips",items:i}),200);if(/order|track|delivery|shipping|where is/.test(e)){this.push({who:"bot",html:"I can help track that. Pop your <b>order number</b> in and I'll pull up the latest status and ETA."}),s("I don't have my order number","Talk to the team");return}if(/return|refund|cancel|exchange/.test(e)){this.push({who:"bot",html:"No problem \u2014 returns are easy. Tell me the order and the item, and I'll start a return or refund for you."}),s("Start a return","Talk to the team");return}if(/price|cost|quote|plan|billing|invoice/.test(e)){this.push({who:"bot",html:"Happy to help with pricing or billing. What would you like to know?"}),s("See plans","Billing question","Talk to the team");return}if(/hour|open|contact|phone|email|where/.test(e)){this.push({who:"bot",html:"We're around <b>Mon\u2013Sat, 9am\u20136pm</b>. You can message here anytime and we'll reply as soon as we're back."}),s("Talk to the team");return}this.push({who:"bot",html:"Thanks for reaching out \u2014 I can help with that. Could you share a few more details so I can point you the right way?"}),s("Talk to the team")},700+Math.min(t.length*13,650))}handoff(){if(this.mode==="human"){this.open();return}this.engaged=!0,this.mode="human",this.root.classList.add("sc-human","sc-connecting"),this.open(),this.typing(!1),this.msgs=this.msgs.filter(e=>e.who!=="chips"),this.statusEl.textContent=`Connecting you to ${this.get("teamName")}\u2026`,this.push({who:"sys",html:`Connecting you to <b>${l(this.get("teamName"))}</b>\u2026`}),this.push({who:"wait"});let t=this.get("agentName");window.setTimeout(()=>{this.root.classList.remove("sc-connecting"),this.msgs=this.msgs.filter(e=>e.who!=="wait"),this.push({who:"sys",html:`<b>${l(t)}</b> joined the chat`}),this.statusEl.textContent=`${t} \xB7 online`,this.avaEl.classList.add("sc-agent"),this.avaEl.textContent=S(t),window.setTimeout(()=>this.push({who:"agent",html:"Hi! \u{1F44B} I've got the full conversation here \u2014 how can I help?"}),800)},2600)}async startRec(){this.recSecs=0,this.recChunks=[];let t=this.root.querySelector("[data-tm]");t.textContent="0:00",this.foot.classList.add("sc-recording"),this.recTimer=window.setInterval(()=>{this.recSecs++,t.textContent=k(this.recSecs)},1e3);try{let e=await navigator.mediaDevices.getUserMedia({audio:!0}),s=new MediaRecorder(e);this.recorder=s,s.ondataavailable=i=>{i.data.size&&this.recChunks.push(i.data)},s.onstop=()=>{e.getTracks().forEach(i=>i.stop())},s.start()}catch{this.recorder=null}}endRec(t){this.recTimer&&(clearInterval(this.recTimer),this.recTimer=null),this.foot.classList.remove("sc-recording");let e=this.recorder;this.recorder=null;let s=i=>{if(!t)return;let r=k(Math.max(this.recSecs,1));this.push({who:"user",voice:{dur:r,url:i}}),this.mode==="ai"&&(this.typing(!0),window.setTimeout(()=>{this.typing(!1),this.push({who:"bot",html:"Thanks for the voice note \u2014 a teammate will give it a listen and come back to you."}),window.setTimeout(()=>this.push({who:"chips",items:["Talk to the team"]}),200)},1e3))};e&&e.state!=="inactive"?(e.onstop=()=>{e.stream.getTracks().forEach(r=>r.stop());let i=new Blob(this.recChunks,{type:"audio/webm"});s(this.recChunks.length?URL.createObjectURL(i):void 0)},e.stop()):s()}suggestUrl(){return this.cfg.suggestEndpoint?this.cfg.suggestEndpoint:this.cfg.apiBase?this.cfg.apiBase.replace(/\/$/,"")+"/suggest":null}setGreetingChips(t){if(this.engaged||!t.length)return;let e=this.msgs.findIndex(s=>s.who==="chips");e>=0?this.msgs[e]={who:"chips",items:t}:this.msgs.push({who:"chips",items:t}),this.render()}async loadSuggestions(){let t=this.suggestUrl();if(!(!t||this.engaged))try{let e=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({clientId:this.cfg.clientId,user:this.cfg.user,path:location.pathname,title:document.title,url:location.href})});if(!e.ok)return;let s=await e.json(),i=Array.isArray(s.suggestions)?s.suggestions.filter(r=>typeof r=="string"&&r.trim().length>0).slice(0,4):[];i.length&&this.setGreetingChips(i)}catch{}}wireLocation(){let t=window;if(!t.__scHistPatched){t.__scHistPatched=!0;let e=()=>{window.dispatchEvent(new Event("sc:locationchange"))},s=history.pushState.bind(history),i=history.replaceState.bind(history);history.pushState=(r,n,p)=>{s(r,n,p),e()},history.replaceState=(r,n,p)=>{i(r,n,p),e()},window.addEventListener("popstate",e)}window.addEventListener("sc:locationchange",()=>{location.pathname!==this.lastPath&&(this.lastPath=location.pathname,this.engaged||this.loadSuggestions())})}configure(t){var e;if(this.cfg={...this.cfg,...t},t.theme&&this.root.classList.toggle("sc-dark",t.theme==="dark"),t.title){let s=this.root.querySelector(".sc-who .sc-t");s&&(s.textContent=t.title)}if(t.primaryColor&&(this.root.style.setProperty("--sc-brand",t.primaryColor),this.cfg.gradient||this.root.style.setProperty("--sc-grad",`linear-gradient(135deg, ${t.primaryColor}, ${t.primaryColor})`)),t.gradient&&this.root.style.setProperty("--sc-grad",t.gradient),!this.engaged&&"user"in t){let s=JSON.stringify((e=t.user)!=null?e:null);s!==this.userKey&&(this.userKey=s,this.loadSuggestions())}}reset(){this.mode="ai",this.engaged=!1,this.staged=[],this.renderStage(),this.root.classList.remove("sc-human","sc-connecting"),this.statusEl.textContent=this.get("subtitle"),this.avaEl.classList.remove("sc-agent"),this.avaEl.innerHTML=c("headset"),this.msgs=[{who:"bot",html:this.get("greeting")}];let t=this.get("suggestions");t.length&&this.msgs.push({who:"chips",items:t}),this.render(),this.loadSuggestions()}destroy(){this.nudgeTimer&&clearInterval(this.nudgeTimer),this.root.remove()}},o=null,g={},U=typeof document!="undefined"&&document.currentScript instanceof HTMLScriptElement?document.currentScript:null;function q(){if(typeof document=="undefined"||document.getElementById(w))return;let a=document.createElement("style");a.id=w,a.textContent=y,document.head.appendChild(a)}function u(a){return a==null?void 0:a==="true"||a==="1"}function _(a){return a?a.split("|").map(t=>t.trim()).filter(Boolean):void 0}function K(a){if(!a)return{};let t=a.dataset,e={clientId:t.clientId,endpoint:t.endpoint||t.chatEndpoint,apiBase:t.apiBase,uploadEndpoint:t.uploadEndpoint,suggestEndpoint:t.suggestEndpoint,title:t.title,subtitle:t.subtitle,greeting:t.greeting,suggestions:_(t.suggestions),placeholder:t.placeholder,poweredBy:t.poweredBy,teaser:t.teaser,primaryColor:t.primaryColor,gradient:t.gradient,position:t.position||void 0,theme:t.theme||void 0,zIndex:t.zIndex?Number(t.zIndex):void 0,voice:u(t.voice),attachments:u(t.attachments),demo:u(t.demo),teamName:t.teamName,agentName:t.agentName,openByDefault:u(t.open),revealDelay:t.revealDelay?Number(t.revealDelay):void 0,nudgeInterval:t.nudgeInterval?Number(t.nudgeInterval):void 0};return Object.keys(e).forEach(s=>{e[s]===void 0&&delete e[s]}),e}function v(a){q();let t={...K(U),...g,...a};return o?(o.configure(t),o):(o=new b(t),o)}var T={mount:v,configure(a){g={...g,...a},o&&o.configure(a)},open(){o==null||o.open()},close(){o==null||o.close()},reset(){o==null||o.reset()},unmount(){o==null||o.destroy(),o=null}};if(typeof window!="undefined"){let a=window.CarousSupportChat;if(a&&typeof a=="object"){let{...e}=a;g={...g,...e}}window.CarousSupportChat=Object.assign(T,g);let t=()=>v();document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t()}var W=T;return F(Y);})();
