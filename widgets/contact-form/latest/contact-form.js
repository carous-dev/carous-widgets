"use strict";var CarousContactFormEmbed=(()=>{var N="carous:lead-errors";var z="CarousLeadsDebug";function $(){if(typeof window=="undefined")return[];try{let o=window.localStorage.getItem(N);if(!o)return[];let s=JSON.parse(o);return Array.isArray(s)?s:[]}catch{return[]}}function X(o){if(typeof window!="undefined")try{let s=o.length>50?o.slice(-50):o;window.localStorage.setItem(N,JSON.stringify(s))}catch{}}function V(){if(typeof window=="undefined")return;let o=window;o[z]||(o[z]={get:()=>$(),clear:()=>{try{window.localStorage.removeItem(N)}catch{}},download:()=>{let s=$(),u=new Date().toISOString().replace(/[:.]/g,"-"),f=new Blob([JSON.stringify(s,null,2)],{type:"application/json"}),l=URL.createObjectURL(f),p=document.createElement("a");return p.href=l,p.download=`carous-lead-errors-${u}.json`,document.body.appendChild(p),p.click(),p.remove(),setTimeout(()=>URL.revokeObjectURL(l),5e3),s.length}})}function q(o){let s={ts:new Date().toISOString(),pageUrl:typeof window!="undefined"?window.location.href:"",userAgent:typeof navigator!="undefined"?navigator.userAgent:"",...o};try{console.error(`[carous:${o.widget}] lead submission failed`,s)}catch{}let u=$();u.push(s),X(u),V()}(function(){"use strict";var o={target:"",dealerName:"Dealer",leadEndpoint:"/leads",leadOwner:"",leadType:"contact-us",leadSource:"contact-page",phoneNumber:"",phoneTel:"",email:"",title:"Tell us what you need.",subtitle:"Send the team a message and they will come back to you by your preferred route.",minSubmitMs:350,rateLimitWindowMs:6e4,rateLimitMax:5},s=[["general","General enquiry"],["appointment","Book a visit"],["vehicle","Vehicle question"],["sell","Sell my car"]],u=[["phone","Phone"],["email","Email"]],f=null,l=null;function p(e){return e?{target:e.dataset.target||"",dealerName:e.dataset.dealerName||e.dataset.brandName||"",leadEndpoint:e.dataset.leadEndpoint||e.dataset.leadSubmitUrl||"",leadOwner:e.dataset.leadOwner||e.dataset.dealerClientId||"",leadType:e.dataset.leadType||"",leadSource:e.dataset.leadSource||"",phoneNumber:e.dataset.phoneNumber||e.dataset.phoneDisplay||"",phoneTel:e.dataset.phoneTel||"",email:e.dataset.email||"",title:e.dataset.title||"",subtitle:e.dataset.subtitle||"",minSubmitMs:e.dataset.minSubmitMs||"",rateLimitWindowMs:e.dataset.rateLimitWindowMs||"",rateLimitMax:e.dataset.rateLimitMax||""}:{}}function x(e){var t={};return Object.keys(o).forEach(function(r){t[r]=o[r]}),Object.keys(e||{}).forEach(function(r){e[r]!==void 0&&e[r]!==null&&e[r]!==""&&(t[r]=e[r])}),!t.phoneTel&&t.phoneNumber&&(t.phoneTel=t.phoneNumber.replace(/[^\d+]/g,"")),t.minSubmitMs=L(t.minSubmitMs,o.minSubmitMs),t.rateLimitWindowMs=L(t.rateLimitWindowMs,o.rateLimitWindowMs),t.rateLimitMax=L(t.rateLimitMax,o.rateLimitMax),t}function L(e,t){var r=parseInt(e,10);return Number.isFinite(r)&&r>=0?r:t}function _(e){return e?typeof e=="string"?document.querySelector(e):e&&e.nodeType===1?e:null:null}function F(e,t){return e.map(function(r){return'<option value="'+g(r[0])+'"'+(r[0]===t?" selected":"")+">"+d(r[1])+"</option>"}).join("")}function d(e){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function g(e){return d(e).replace(/`/g,"&#096;")}function C(){return`
      :host {
        --cfw-accent: var(--color-primary, var(--accent-primary, #d4af37));
        --cfw-accent-hover: var(--accent-secondary-hover, #b69424);
        --cfw-accent-text: var(--color-header-text, #211b0c);
        --cfw-bg: var(--color-bg, #ffffff);
        --cfw-surface: var(--color-surface, #fffdf7);
        --cfw-text: var(--color-text, #2c2514);
        --cfw-muted: var(--color-muted, #6d6241);
        --cfw-border: var(--color-border, #e4d7ab);
        --cfw-error: #b42318;
        --cfw-success: #047857;
        color: var(--cfw-text);
        font-family: inherit;
      }
      * { box-sizing: border-box; }
      .cfw-widget {
        display: grid;
        grid-template-columns: 1fr;
        overflow: hidden;
        border: 1px solid color-mix(in srgb, var(--cfw-border) 82%, transparent);
        border-radius: 18px;
        background: #fff;
        box-shadow: 0 24px 52px color-mix(in srgb, rgba(92, 74, 18, 0.18) 46%, transparent);
      }
      .cfw-widget.is-compact {
        display: block;
        overflow: visible;
        border: 0;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
      }
      .cfw-panel {
        position: relative;
        display: grid;
        gap: 22px;
        padding: 28px 22px;
        color: #fff;
        background: linear-gradient(160deg, color-mix(in srgb, var(--cfw-text) 94%, #000) 0%, color-mix(in srgb, var(--cfw-text) 84%, var(--cfw-accent)) 58%, color-mix(in srgb, #000 76%, var(--cfw-accent)) 100%);
      }
      .is-compact .cfw-panel { display: none; }
      .cfw-kicker,
      .cfw-topline {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        width: fit-content;
        border-radius: 999px;
        font-size: 0.74rem;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .cfw-kicker {
        margin-bottom: 14px;
        padding: 7px 11px;
        color: color-mix(in srgb, #fff 92%, transparent);
        background: color-mix(in srgb, #fff 12%, transparent);
        border: 1px solid color-mix(in srgb, #fff 18%, transparent);
      }
      .cfw-title {
        margin: 0;
        color: #fff;
        font-size: clamp(1.65rem, 7vw, 2.35rem);
        line-height: 1.08;
        font-weight: 800;
      }
      .cfw-copy {
        max-width: 34rem;
        margin: 12px 0 0;
        color: color-mix(in srgb, #fff 78%, transparent);
        line-height: 1.6;
      }
      .cfw-quick-list { display: grid; gap: 10px; }
      .cfw-quick-item {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
        padding: 12px;
        border: 1px solid color-mix(in srgb, #fff 16%, transparent);
        border-radius: 12px;
        color: #fff;
        text-decoration: none;
        background: color-mix(in srgb, #fff 9%, transparent);
      }
      .cfw-quick-item strong,
      .cfw-quick-item small {
        display: block;
        overflow-wrap: anywhere;
      }
      .cfw-quick-item small {
        margin-top: 2px;
        color: color-mix(in srgb, #fff 68%, transparent);
        font-size: 0.78rem;
      }
      .cfw-form {
        display: grid;
        gap: 18px;
        padding: 22px;
        background: linear-gradient(180deg, color-mix(in srgb, var(--cfw-surface) 72%, #fff) 0%, #fff 100%);
      }
      .is-compact .cfw-form {
        padding: 0;
        background: transparent;
      }
      .cfw-topline {
        padding: 8px 12px;
        color: var(--cfw-text);
        background: color-mix(in srgb, var(--cfw-accent) 14%, #fff);
        border: 1px solid color-mix(in srgb, var(--cfw-accent) 24%, transparent);
      }
      .is-compact .cfw-topline { display: none; }
      .cfw-grid { display: grid; gap: 14px; }
      .is-compact .cfw-grid { gap: 12px; }
      .cfw-field { display: grid; gap: 8px; }
      .cfw-field label {
        color: var(--cfw-muted);
        font-size: 0.84rem;
        font-weight: 800;
      }
      .cfw-field input,
      .cfw-field select,
      .cfw-field textarea {
        width: 100%;
        border: 1px solid color-mix(in srgb, var(--cfw-border) 82%, transparent);
        border-radius: 12px;
        background: #fff;
        color: var(--cfw-text);
        font: inherit;
        outline: none;
        transition: border-color 160ms ease, box-shadow 160ms ease;
      }
      .cfw-field input,
      .cfw-field select {
        min-height: 50px;
        padding: 0 14px;
      }
      .is-compact .cfw-field input,
      .is-compact .cfw-field select { min-height: 46px; }
      .cfw-field textarea {
        min-height: 76px;
        height: auto;
        overflow: hidden;
        padding: 14px;
        resize: none;
      }
      .is-compact .cfw-field textarea { min-height: 72px; }
      .cfw-field input:focus,
      .cfw-field select:focus,
      .cfw-field textarea:focus {
        border-color: color-mix(in srgb, var(--cfw-accent) 64%, var(--cfw-border));
        box-shadow: 0 0 0 4px color-mix(in srgb, var(--cfw-accent) 14%, transparent);
      }
      .cfw-error-text {
        color: var(--cfw-error);
        font-size: 0.78rem;
        font-style: normal;
      }
      .cfw-footer {
        display: grid;
        gap: 10px;
        justify-items: start;
      }
      .cfw-submit {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        min-height: 50px;
        width: 100%;
        max-width: 240px;
        border: 0;
        border-radius: 999px;
        padding: 0 22px;
        background: var(--cfw-accent);
        color: var(--cfw-accent-text);
        cursor: pointer;
        font: inherit;
        font-weight: 900;
        transition: transform 140ms ease, background 140ms ease, opacity 140ms ease;
      }
      .cfw-submit:hover:not(:disabled) {
        transform: translateY(-1px);
        background: var(--cfw-accent-hover);
      }
      .cfw-submit:disabled {
        cursor: wait;
        opacity: 0.72;
      }
      .cfw-note,
      .cfw-status {
        margin: 0;
        font-size: 0.8rem;
        line-height: 1.55;
      }
      .cfw-note {
        max-width: 44rem;
        color: var(--cfw-muted);
      }
      .cfw-status.is-success { color: var(--cfw-success); font-weight: 800; }
      .cfw-status.is-error { color: var(--cfw-error); font-weight: 700; }
      .cfw-honeypot {
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        opacity: 0;
      }
      .cfw-modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 2147483500;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 18px;
        background: color-mix(in srgb, #000 58%, transparent);
        backdrop-filter: blur(8px);
      }
      .cfw-modal {
        width: 100%;
        max-width: 620px;
        max-height: calc(100dvh - 36px);
        overflow-y: auto;
        border: 1px solid color-mix(in srgb, var(--cfw-border) 82%, transparent);
        border-radius: 18px;
        background: #fff;
        box-shadow: 0 24px 64px color-mix(in srgb, #000 28%, transparent);
      }
      .cfw-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 18px;
        padding: 24px 24px 18px;
        border-bottom: 1px solid color-mix(in srgb, var(--cfw-border) 76%, transparent);
        background: linear-gradient(145deg, color-mix(in srgb, var(--cfw-surface) 74%, #fff), #fff);
      }
      .cfw-modal-eyebrow {
        display: block;
        margin-bottom: 8px;
        color: var(--cfw-accent);
        font-size: 0.74rem;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .cfw-modal-title {
        margin: 0;
        color: var(--cfw-text);
        font-size: clamp(1.35rem, 4vw, 1.8rem);
        line-height: 1.15;
        font-weight: 800;
      }
      .cfw-modal-description {
        max-width: 46rem;
        margin: 8px 0 0;
        color: color-mix(in srgb, var(--cfw-text) 75%, transparent);
        font-size: 0.95rem;
        line-height: 1.55;
      }
      .cfw-modal-close {
        flex: 0 0 auto;
        width: 38px;
        height: 38px;
        border-radius: 999px;
        border: 1px solid color-mix(in srgb, var(--cfw-border) 80%, transparent);
        background: #fff;
        color: var(--cfw-text);
        cursor: pointer;
        font-size: 1.25rem;
        line-height: 1;
      }
      .cfw-modal-content { padding: 24px; }
      @media (min-width: 720px) {
        .cfw-widget {
          grid-template-columns: minmax(260px, 0.78fr) minmax(0, 1.22fr);
          border-radius: 20px;
        }
        .cfw-panel,
        .cfw-form { padding: 30px; }
        .cfw-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .cfw-field.is-wide { grid-column: 1 / -1; }
        .cfw-submit { min-width: 190px; }
        .cfw-widget.is-compact { display: block; }
      }
      @media (max-width: 520px) {
        .cfw-modal-overlay {
          align-items: stretch;
          padding: 0;
        }
        .cfw-modal {
          width: 100%;
          max-width: none;
          max-height: 100dvh;
          border-left: 0;
          border-right: 0;
          border-radius: 0;
        }
        .cfw-modal-header,
        .cfw-modal-content { padding: 18px; }
      }
    `}function A(e,t,r){var a=Date.now(),n="cfw-"+Math.random().toString(36).slice(2);e.innerHTML=`
      <style>${C()}</style>
      <article class="cfw-widget${r?" is-compact":""}">
        <div class="cfw-panel">
          <div>
            <span class="cfw-kicker">Contact Form</span>
            <h2 class="cfw-title">${d(t.title)}</h2>
            <p class="cfw-copy">${d(t.subtitle)}</p>
          </div>
          <div class="cfw-quick-list" aria-label="${g(t.dealerName)} contact options">
            ${t.phoneNumber?'<a class="cfw-quick-item" href="tel:'+g(t.phoneTel)+'"><span><strong>'+d(t.phoneNumber)+"</strong><small>Showroom</small></span></a>":""}
            ${t.email?'<a class="cfw-quick-item" href="mailto:'+g(t.email)+'"><span><strong>Email us</strong><small>'+d(t.email)+"</small></span></a>":""}
          </div>
        </div>
        <form class="cfw-form" novalidate>
          <input class="cfw-honeypot" type="text" name="website" tabindex="-1" autocomplete="new-password" aria-hidden="true" />
          <input class="cfw-honeypot" type="text" name="companyWebsite" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <div class="cfw-topline">Message ${d(t.dealerName)}</div>
          <div class="cfw-grid">
            ${k(n,"name","Full name","text","Your name","name")}
            ${k(n,"phone","Phone number","tel","Your phone number","tel")}
            ${k(n,"email","Email address","email","you@example.com","email")}
            ${j(n,"topic","Enquiry type",s,"general")}
            ${j(n,"preferredContact","Preferred contact",u,"phone")}
          </div>
          <div class="cfw-field is-wide">
            <label for="${n}-message">Message</label>
            <textarea id="${n}-message" name="message" rows="2" placeholder="Tell us about the vehicle, appointment, or question you have in mind."></textarea>
            <em class="cfw-error-text" data-error-for="message"></em>
          </div>
          <div class="cfw-footer">
            <button class="cfw-submit" type="submit"><span>Send message</span><span aria-hidden="true">\u2192</span></button>
            <p class="cfw-note">By submitting, you agree that ${d(t.dealerName)} may contact you about your enquiry.</p>
          </div>
          <p class="cfw-status" hidden></p>
        </form>
      </article>
    `;var c=e.querySelector("form"),m=e.querySelector("textarea");m&&(m.addEventListener("input",function(){v(m)}),v(m)),c.addEventListener("submit",function(h){h.preventDefault(),H(c,t,a)})}function k(e,t,r,a,n,c){return`
      <div class="cfw-field">
        <label for="${e}-${t}">${d(r)}</label>
        <input id="${e}-${t}" name="${t}" type="${a}" placeholder="${g(n)}" autocomplete="${g(c)}" />
        <em class="cfw-error-text" data-error-for="${t}"></em>
      </div>
    `}function j(e,t,r,a,n){return`
      <div class="cfw-field">
        <label for="${e}-${t}">${d(r)}</label>
        <select id="${e}-${t}" name="${t}">${F(a,n)}</select>
        <em class="cfw-error-text" data-error-for="${t}"></em>
      </div>
    `}function v(e){e.style.height="auto",e.style.height=e.scrollHeight+"px"}function P(e,t){for(var r=0;r<e.length;r+=1)if(e[r][0]===t)return e[r][1];return t}function R(e){var t=new FormData(e);return{name:String(t.get("name")||"").trim(),email:String(t.get("email")||"").trim().toLowerCase(),phone:String(t.get("phone")||"").trim(),topic:String(t.get("topic")||"general"),preferredContact:String(t.get("preferredContact")||"phone"),message:String(t.get("message")||"").trim(),website:String(t.get("website")||""),companyWebsite:String(t.get("companyWebsite")||"")}}function U(e){return"carous-contact-form:"+(e.leadOwner||e.dealerName||"dealer")+":"+e.leadEndpoint}function J(e){if(!e.rateLimitWindowMs||!e.rateLimitMax)return!1;var t=U(e),r=Date.now();try{if(!window.localStorage)return!1;var a=window.localStorage.getItem(t),n=a?JSON.parse(a):{count:0,resetAt:r+e.rateLimitWindowMs};return!n.resetAt||r>n.resetAt?(window.localStorage.setItem(t,JSON.stringify({count:1,resetAt:r+e.rateLimitWindowMs})),!1):n.count>=e.rateLimitMax?!0:(window.localStorage.setItem(t,JSON.stringify({count:n.count+1,resetAt:n.resetAt})),!1)}catch{return!1}}function Y(e,t,r){return e.website||e.companyWebsite||t.minSubmitMs>0&&Date.now()-r<t.minSubmitMs?!0:J(t)}function W(e,t){y(e,"success","Thank you. Your message has been sent to "+t.dealerName+"."),e.reset();var r=e.querySelector("textarea");r&&v(r)}function B(e,t){var r={};return t.name||(r.name="Please enter your full name."),t.phone||(r.phone="Please enter your phone number."),t.email?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email)||(r.email="Please enter a valid email."):r.email="Please enter your email address.",t.message?t.message.length<12&&(r.message="Please add a little more detail."):r.message="Please add a message.",e.querySelectorAll("[data-error-for]").forEach(function(a){a.textContent=r[a.getAttribute("data-error-for")]||""}),r}function y(e,t,r){var a=e.querySelector(".cfw-status");a&&(a.hidden=!r,a.textContent=r||"",a.className="cfw-status"+(t?" is-"+t:""))}function H(e,t,r){var a=R(e);if(a.website||a.companyWebsite){W(e,t);return}var n=B(e,a);if(!Object.keys(n).length){if(Y(a,t,r)){W(e,t);return}var c=e.querySelector(".cfw-submit");c&&(c.disabled=!0,c.querySelector("span").textContent="Sending..."),y(e,"","");var m=P(s,a.topic),h=P(u,a.preferredContact),E=window.location.href,I=["Topic: "+m,"Preferred Contact: "+h,"Page: "+E].join(`
`),M={name:a.name,email:a.email,phone:a.phone,subject:t.dealerName+" contact enquiry: "+m,message:[a.message,"",I].join(`
`),submittedDetails:I,topic:m,preferredContact:h,preferred_contact:h,permalink:E,url:E,leadType:t.leadType,leadSource:t.leadSource,leadOwner:t.leadOwner,formTs:r,website:a.website,companyWebsite:a.companyWebsite};fetch(t.leadEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(M)}).then(function(i){return i.json().catch(function(){return{}}).then(function(b){if(!i.ok||b.success===!1||b.created===!1&&b.error){var O=new Error(b.error||"Lead submission failed.");throw q({widget:"contact-form",endpoint:t.leadEndpoint,phase:"http-error",status:i.status,statusText:i.statusText,responseBody:b,errorMessage:O.message,payload:M,leadOwner:t.leadOwner,leadType:t.leadType}),O.__carousLogged=!0,O}return b})}).then(function(){y(e,"success","Thank you. Your message has been sent to "+t.dealerName+"."),e.reset();var i=e.querySelector("textarea");i&&v(i)}).catch(function(i){(!i||!i.__carousLogged)&&q({widget:"contact-form",endpoint:t.leadEndpoint,phase:"network-error",errorMessage:i&&i.message?i.message:String(i),payload:M,leadOwner:t.leadOwner,leadType:t.leadType}),y(e,"error",i&&i.message?i.message:"Something went wrong. Please try again.")}).finally(function(){c&&(c.disabled=!1,c.querySelector("span").textContent="Send message")})}}function T(e,t){var r=x(t||{}),a=_(e||r.target);if(!a)return null;a.innerHTML="";var n=a.shadowRoot||(a.attachShadow?a.attachShadow({mode:"open"}):a);return A(n,r,!1),f={element:a,root:n,options:r},f}function K(e){var t=x(Object.assign({},w,f?f.options:{},e||{}));S();var r=document.createElement("div");document.body.appendChild(r);var a=r.attachShadow?r.attachShadow({mode:"open"}):r;a.innerHTML=`
      <style>${C()}</style>
      <div class="cfw-modal-overlay">
        <div class="cfw-modal" role="dialog" aria-modal="true" aria-labelledby="cfw-modal-title">
          <div class="cfw-modal-header">
            <div>
              <span class="cfw-modal-eyebrow">Contact ${d(t.dealerName)}</span>
              <h2 class="cfw-modal-title" id="cfw-modal-title">Send a message</h2>
              <p class="cfw-modal-description">Vehicle questions, appointments, and showroom enquiries all land with the same team.</p>
            </div>
            <button class="cfw-modal-close" type="button" aria-label="Close">\xD7</button>
          </div>
          <div class="cfw-modal-content"></div>
        </div>
      </div>
    `;var n=a.querySelector(".cfw-modal-content");return A(n,t,!0),a.querySelector(".cfw-modal-close").addEventListener("click",S),a.querySelector(".cfw-modal-overlay").addEventListener("click",function(c){c.target.classList.contains("cfw-modal-overlay")&&S()}),l={host:r,root:a},l}function S(){l&&l.host&&l.host.parentNode&&l.host.parentNode.removeChild(l.host),l=null}var G=document.currentScript,w=x(p(G));window.CarousContactForm=Object.assign({},window.CarousContactForm||{},{mount:T,open:K,close:S,configure:function(e){w=x(Object.assign({},w,e||{})),f&&T(f.element,w)}});function D(){w.target&&T(w.target,w)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",D,{once:!0}):D()})();})();
