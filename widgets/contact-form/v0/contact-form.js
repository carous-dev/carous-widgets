"use strict";var CarousContactFormEmbed=(()=>{(function(){"use strict";var u={target:"",dealerName:"Dealer",leadEndpoint:"/leads",leadOwner:"",leadType:"contact-us",leadSource:"contact-page",phoneNumber:"",phoneTel:"",email:"",title:"Tell us what you need.",subtitle:"Send the team a message and they will come back to you by your preferred route.",minSubmitMs:350,rateLimitWindowMs:6e4,rateLimitMax:5},$=[["general","General enquiry"],["appointment","Book a visit"],["vehicle","Vehicle question"],["sell","Sell my car"]],M=[["phone","Phone"],["email","Email"]],f=null,l=null;function j(e){return e?{target:e.dataset.target||"",dealerName:e.dataset.dealerName||e.dataset.brandName||"",leadEndpoint:e.dataset.leadEndpoint||e.dataset.leadSubmitUrl||"",leadOwner:e.dataset.leadOwner||e.dataset.dealerClientId||"",leadType:e.dataset.leadType||"",leadSource:e.dataset.leadSource||"",phoneNumber:e.dataset.phoneNumber||e.dataset.phoneDisplay||"",phoneTel:e.dataset.phoneTel||"",email:e.dataset.email||"",title:e.dataset.title||"",subtitle:e.dataset.subtitle||"",minSubmitMs:e.dataset.minSubmitMs||"",rateLimitWindowMs:e.dataset.rateLimitWindowMs||"",rateLimitMax:e.dataset.rateLimitMax||""}:{}}function g(e){var t={};return Object.keys(u).forEach(function(a){t[a]=u[a]}),Object.keys(e||{}).forEach(function(a){e[a]!==void 0&&e[a]!==null&&e[a]!==""&&(t[a]=e[a])}),!t.phoneTel&&t.phoneNumber&&(t.phoneTel=t.phoneNumber.replace(/[^\d+]/g,"")),t.minSubmitMs=v(t.minSubmitMs,u.minSubmitMs),t.rateLimitWindowMs=v(t.rateLimitWindowMs,u.rateLimitWindowMs),t.rateLimitMax=v(t.rateLimitMax,u.rateLimitMax),t}function v(e,t){var a=parseInt(e,10);return Number.isFinite(a)&&a>=0?a:t}function P(e){return e?typeof e=="string"?document.querySelector(e):e&&e.nodeType===1?e:null:null}function W(e,t){return e.map(function(a){return'<option value="'+m(a[0])+'"'+(a[0]===t?" selected":"")+">"+o(a[1])+"</option>"}).join("")}function o(e){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function m(e){return o(e).replace(/`/g,"&#096;")}function L(){return`
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
    `}function T(e,t,a){var r=Date.now(),i="cfw-"+Math.random().toString(36).slice(2);e.innerHTML=`
      <style>${L()}</style>
      <article class="cfw-widget${a?" is-compact":""}">
        <div class="cfw-panel">
          <div>
            <span class="cfw-kicker">Contact Form</span>
            <h2 class="cfw-title">${o(t.title)}</h2>
            <p class="cfw-copy">${o(t.subtitle)}</p>
          </div>
          <div class="cfw-quick-list" aria-label="${m(t.dealerName)} contact options">
            ${t.phoneNumber?'<a class="cfw-quick-item" href="tel:'+m(t.phoneTel)+'"><span><strong>'+o(t.phoneNumber)+"</strong><small>Showroom</small></span></a>":""}
            ${t.email?'<a class="cfw-quick-item" href="mailto:'+m(t.email)+'"><span><strong>Email us</strong><small>'+o(t.email)+"</small></span></a>":""}
          </div>
        </div>
        <form class="cfw-form" novalidate>
          <input class="cfw-honeypot" type="text" name="website" tabindex="-1" autocomplete="new-password" aria-hidden="true" />
          <input class="cfw-honeypot" type="text" name="companyWebsite" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <div class="cfw-topline">Message ${o(t.dealerName)}</div>
          <div class="cfw-grid">
            ${y(i,"name","Full name","text","Your name","name")}
            ${y(i,"phone","Phone number","tel","Your phone number","tel")}
            ${y(i,"email","Email address","email","you@example.com","email")}
            ${q(i,"topic","Enquiry type",$,"general")}
            ${q(i,"preferredContact","Preferred contact",M,"phone")}
          </div>
          <div class="cfw-field is-wide">
            <label for="${i}-message">Message</label>
            <textarea id="${i}-message" name="message" rows="2" placeholder="Tell us about the vehicle, appointment, or question you have in mind."></textarea>
            <em class="cfw-error-text" data-error-for="message"></em>
          </div>
          <div class="cfw-footer">
            <button class="cfw-submit" type="submit"><span>Send message</span><span aria-hidden="true">\u2192</span></button>
            <p class="cfw-note">By submitting, you agree that ${o(t.dealerName)} may contact you about your enquiry.</p>
          </div>
          <p class="cfw-status" hidden></p>
        </form>
      </article>
    `;var n=e.querySelector("form"),s=e.querySelector("textarea");s&&(s.addEventListener("input",function(){b(s)}),b(s)),n.addEventListener("submit",function(p){p.preventDefault(),H(n,t,r)})}function y(e,t,a,r,i,n){return`
      <div class="cfw-field">
        <label for="${e}-${t}">${o(a)}</label>
        <input id="${e}-${t}" name="${t}" type="${r}" placeholder="${m(i)}" autocomplete="${m(n)}" />
        <em class="cfw-error-text" data-error-for="${t}"></em>
      </div>
    `}function q(e,t,a,r,i){return`
      <div class="cfw-field">
        <label for="${e}-${t}">${o(a)}</label>
        <select id="${e}-${t}" name="${t}">${W(r,i)}</select>
        <em class="cfw-error-text" data-error-for="${t}"></em>
      </div>
    `}function b(e){e.style.height="auto",e.style.height=e.scrollHeight+"px"}function N(e,t){for(var a=0;a<e.length;a+=1)if(e[a][0]===t)return e[a][1];return t}function z(e){var t=new FormData(e);return{name:String(t.get("name")||"").trim(),email:String(t.get("email")||"").trim().toLowerCase(),phone:String(t.get("phone")||"").trim(),topic:String(t.get("topic")||"general"),preferredContact:String(t.get("preferredContact")||"phone"),message:String(t.get("message")||"").trim(),website:String(t.get("website")||""),companyWebsite:String(t.get("companyWebsite")||"")}}function A(e){return"carous-contact-form:"+(e.leadOwner||e.dealerName||"dealer")+":"+e.leadEndpoint}function D(e){if(!e.rateLimitWindowMs||!e.rateLimitMax)return!1;var t=A(e),a=Date.now();try{if(!window.localStorage)return!1;var r=window.localStorage.getItem(t),i=r?JSON.parse(r):{count:0,resetAt:a+e.rateLimitWindowMs};return!i.resetAt||a>i.resetAt?(window.localStorage.setItem(t,JSON.stringify({count:1,resetAt:a+e.rateLimitWindowMs})),!1):i.count>=e.rateLimitMax?!0:(window.localStorage.setItem(t,JSON.stringify({count:i.count+1,resetAt:i.resetAt})),!1)}catch{return!1}}function F(e,t,a){return e.website||e.companyWebsite||t.minSubmitMs>0&&Date.now()-a<t.minSubmitMs?!0:D(t)}function C(e,t){h(e,"success","Thank you. Your message has been sent to "+t.dealerName+"."),e.reset();var a=e.querySelector("textarea");a&&b(a)}function I(e,t){var a={};return t.name||(a.name="Please enter your full name."),t.phone||(a.phone="Please enter your phone number."),t.email?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email)||(a.email="Please enter a valid email."):a.email="Please enter your email address.",t.message?t.message.length<12&&(a.message="Please add a little more detail."):a.message="Please add a message.",e.querySelectorAll("[data-error-for]").forEach(function(r){r.textContent=a[r.getAttribute("data-error-for")]||""}),a}function h(e,t,a){var r=e.querySelector(".cfw-status");r&&(r.hidden=!a,r.textContent=a||"",r.className="cfw-status"+(t?" is-"+t:""))}function H(e,t,a){var r=z(e);if(r.website||r.companyWebsite){C(e,t);return}var i=I(e,r);if(!Object.keys(i).length){if(F(r,t,a)){C(e,t);return}var n=e.querySelector(".cfw-submit");n&&(n.disabled=!0,n.querySelector("span").textContent="Sending..."),h(e,"","");var s=N($,r.topic),p=N(M,r.preferredContact),k=window.location.href,E=["Topic: "+s,"Preferred Contact: "+p,"Page: "+k].join(`
`),U={name:r.name,email:r.email,phone:r.phone,subject:t.dealerName+" contact enquiry: "+s,message:[r.message,"",E].join(`
`),submittedDetails:E,topic:s,preferredContact:p,preferred_contact:p,permalink:k,url:k,leadType:t.leadType,leadSource:t.leadSource,leadOwner:t.leadOwner,formTs:a,website:r.website,companyWebsite:r.companyWebsite};fetch(t.leadEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(U)}).then(function(c){return c.json().catch(function(){return{}}).then(function(w){if(!c.ok||w.success===!1||w.created===!1&&w.error)throw new Error(w.error||"Lead submission failed.");return w})}).then(function(){h(e,"success","Thank you. Your message has been sent to "+t.dealerName+"."),e.reset();var c=e.querySelector("textarea");c&&b(c)}).catch(function(c){h(e,"error",c&&c.message?c.message:"Something went wrong. Please try again.")}).finally(function(){n&&(n.disabled=!1,n.querySelector("span").textContent="Send message")})}}function S(e,t){var a=g(t||{}),r=P(e||a.target);if(!r)return null;r.innerHTML="";var i=r.shadowRoot||(r.attachShadow?r.attachShadow({mode:"open"}):r);return T(i,a,!1),f={element:r,root:i,options:a},f}function Y(e){var t=g(Object.assign({},d,f?f.options:{},e||{}));x();var a=document.createElement("div");document.body.appendChild(a);var r=a.attachShadow?a.attachShadow({mode:"open"}):a;r.innerHTML=`
      <style>${L()}</style>
      <div class="cfw-modal-overlay">
        <div class="cfw-modal" role="dialog" aria-modal="true" aria-labelledby="cfw-modal-title">
          <div class="cfw-modal-header">
            <div>
              <span class="cfw-modal-eyebrow">Contact ${o(t.dealerName)}</span>
              <h2 class="cfw-modal-title" id="cfw-modal-title">Send a message</h2>
              <p class="cfw-modal-description">Vehicle questions, appointments, and showroom enquiries all land with the same team.</p>
            </div>
            <button class="cfw-modal-close" type="button" aria-label="Close">\xD7</button>
          </div>
          <div class="cfw-modal-content"></div>
        </div>
      </div>
    `;var i=r.querySelector(".cfw-modal-content");return T(i,t,!0),r.querySelector(".cfw-modal-close").addEventListener("click",x),r.querySelector(".cfw-modal-overlay").addEventListener("click",function(n){n.target.classList.contains("cfw-modal-overlay")&&x()}),l={host:a,root:r},l}function x(){l&&l.host&&l.host.parentNode&&l.host.parentNode.removeChild(l.host),l=null}var J=document.currentScript,d=g(j(J));window.CarousContactForm=Object.assign({},window.CarousContactForm||{},{mount:S,open:Y,close:x,configure:function(e){d=g(Object.assign({},d,e||{})),f&&S(f.element,d)}});function O(){d.target&&S(d.target,d)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",O,{once:!0}):O()})();})();
