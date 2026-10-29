// Cache-first para funcionar offline. Mude VERSION ao atualizar arquivos.
// Os dados do usuário ficam em localStorage/IndexedDB e NÃO são afetados pela troca de cache.
const VERSION='mpp-v17';
const FILES=['./','./index.html','./style.css','./app.js','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==VERSION).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{
    if(res&&res.ok&&res.type==='basic'){const copy=res.clone();caches.open(VERSION).then(c=>c.put(r,copy))}
    return res;
  }).catch(()=>r.mode==='navigate'?caches.match('./index.html'):Response.error())));
});
