if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let l={};const o=e=>n(e,t),u={module:{uri:t},exports:l,require:o};s[t]=Promise.all(i.map((e=>u[e]||o(e)))).then((e=>(r(...e),l)))}}define(["./workbox-b20f670c"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/favicon-fANlyB8T.ico",revision:null},{url:"assets/index-BPzRnWMz.css",revision:null},{url:"assets/index-ZI7Bts3D.js",revision:null},{url:"assets/Landing-B7-QCsGM.js",revision:null},{url:"assets/Landing-ZLdXyOpI.css",revision:null},{url:"assets/logo192-Cw5HMvxU.png",revision:null},{url:"assets/manifest-Dh4WxrdQ.json",revision:null},{url:"assets/Page2-v8VVctGW.js",revision:null},{url:"assets/Page3-BYzV4KFX.js",revision:null},{url:"assets/state-D29PNkXD.js",revision:null},{url:"index.html",revision:"1316e82924443fe46fa09c8cc9852dbb"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"manifest.webmanifest",revision:"351eb46ee7308b3e9fbb27294cefb25a"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute((({request:e})=>"document"===e.destination),new e.NetworkFirst({cacheName:"html-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute((({request:e})=>["script","style","worker"].includes(e.destination)),new e.StaleWhileRevalidate({cacheName:"assets-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute((({request:e})=>["image","font"].includes(e.destination)),new e.CacheFirst({cacheName:"media-cache",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:31536e3})]}),"GET")}));
