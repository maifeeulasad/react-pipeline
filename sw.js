if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let t={};const o=e=>n(e,l),a={module:{uri:l},exports:t,require:o};s[l]=Promise.all(i.map((e=>a[e]||o(e)))).then((e=>(r(...e),t)))}}define(["./workbox-b20f670c"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/favicon-fANlyB8T.ico",revision:null},{url:"assets/index-Bd2R77FA.js",revision:null},{url:"assets/index-BPzRnWMz.css",revision:null},{url:"assets/index-DwpfX0-k.js",revision:null},{url:"assets/Landing-wi-1RCNm.js",revision:null},{url:"assets/Landing-ZLdXyOpI.css",revision:null},{url:"assets/logo192-Cw5HMvxU.png",revision:null},{url:"assets/manifest-DJZ5HARm.json",revision:null},{url:"assets/Page2-D_rHMzHQ.js",revision:null},{url:"assets/Page3-CKeSXYDA.js",revision:null},{url:"index.html",revision:"3ea2eb64b6cc9a3a99b947e9b0ba78f7"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"manifest.webmanifest",revision:"351eb46ee7308b3e9fbb27294cefb25a"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute((({request:e})=>"document"===e.destination),new e.NetworkFirst({cacheName:"html-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute((({request:e})=>["script","style","worker"].includes(e.destination)),new e.StaleWhileRevalidate({cacheName:"assets-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute((({request:e})=>["image","font"].includes(e.destination)),new e.CacheFirst({cacheName:"media-cache",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:31536e3})]}),"GET")}));
