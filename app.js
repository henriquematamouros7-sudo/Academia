'use strict';
/* Meu Personal Pro — app educativo. Dados 100% locais (localStorage). */
const KEY='mpp_v1', $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const DAYS=['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
const HOME=['Peso corporal','Halteres','Elásticos'];

// ---------- Biblioteca (resumida: ampliar conforme necessário) ----------
const EX=[
{id:'agach',n:'Agachamento livre',g:'Quadríceps',sec:'Glúteos, core',eq:'Peso corporal',lv:'Iniciante',
 st:['Pés na largura dos ombros, pontas levemente para fora.','Desça levando o quadril para trás e para baixo, joelhos alinhados aos pés.','Suba empurrando o chão, sem tirar os calcanhares.'],
 br:'Inspire ao descer, expire ao subir.',er:'Joelhos para dentro; calcanhar saindo do chão; tronco caindo à frente.',sg:'Reduza a amplitude se houver dor no joelho.',alt:['leg']},
{id:'leg',n:'Leg press',g:'Quadríceps',sec:'Glúteos',eq:'Máquinas',lv:'Iniciante',
 st:['Costas apoiadas, pés na largura dos ombros na plataforma.','Desça até onde mantiver a lombar apoiada.','Empurre sem estender totalmente os joelhos.'],
 br:'Inspire ao descer, expire ao empurrar.',er:'Descolar o quadril do banco; travar os joelhos.',sg:'Use carga que permita controle total.',alt:['agach']},
{id:'flex',n:'Flexão de braços',g:'Peito',sec:'Tríceps, ombros',eq:'Peso corporal',lv:'Iniciante',
 st:['Mãos um pouco além dos ombros, corpo em linha reta.','Desça o peito controlando.','Empurre até estender os cotovelos.'],
 br:'Inspire ao descer, expire ao subir.',er:'Quadril caído; cotovelos muito abertos.',sg:'Apoie os joelhos ou as mãos em um banco para facilitar.',alt:['sup']},
{id:'sup',n:'Supino com halteres',g:'Peito',sec:'Tríceps, ombros',eq:'Halteres',lv:'Iniciante',
 st:['Deitado no banco, halteres na altura do peito.','Empurre para cima aproximando os halteres.','Desça devagar até alongar o peito.'],
 br:'Inspire ao descer, expire ao subir.',er:'Descer rápido demais; arquear demais a lombar.',sg:'Peça ajuda para posicionar cargas mais altas.',alt:['flex']},
{id:'rem',n:'Remada curvada com halteres',g:'Costas',sec:'Bíceps',eq:'Halteres',lv:'Iniciante',
 st:['Incline o tronco com a coluna neutra.','Puxe os halteres em direção ao quadril.','Desça controlando.'],
 br:'Expire ao puxar, inspire ao descer.',er:'Arredondar as costas; usar impulso.',sg:'Apoie uma mão em um banco se sentir a lombar.',alt:['rele','pux']},
{id:'rele',n:'Remada com elástico',g:'Costas',sec:'Bíceps',eq:'Elásticos',lv:'Iniciante',
 st:['Prenda o elástico à frente, sente-se com a coluna ereta.','Puxe os cotovelos para trás.','Volte devagar.'],
 br:'Expire ao puxar.',er:'Encolher os ombros.',sg:'Verifique se o elástico não está danificado.',alt:['rem']},
{id:'pux',n:'Puxada na polia alta',g:'Costas',sec:'Bíceps',eq:'Cabos e polias',lv:'Iniciante',
 st:['Segure a barra um pouco além dos ombros.','Puxe até a altura do peito, cotovelos para baixo.','Retorne com controle.'],
 br:'Expire ao puxar.',er:'Inclinar o tronco para trás; puxar atrás da nuca.',sg:'Evite puxar atrás da nuca.',alt:['rem']},
{id:'des',n:'Desenvolvimento com halteres',g:'Ombros',sec:'Tríceps',eq:'Halteres',lv:'Iniciante',
 st:['Sentado ou em pé, halteres na altura dos ombros.','Empurre para cima sem arquear a lombar.','Desça até a altura das orelhas.'],
 br:'Expire ao subir.',er:'Arquear a lombar; carga excessiva.',sg:'Contraia o abdômen. Interrompa se sentir dor no ombro.',alt:['ele']},
{id:'ele',n:'Elevação lateral',g:'Ombros',sec:'—',eq:'Halteres',lv:'Iniciante',
 st:['Halteres ao lado do corpo, cotovelos levemente flexionados.','Eleve até a altura dos ombros.','Desça devagar.'],
 br:'Expire ao subir.',er:'Balançar o tronco; subir acima dos ombros.',sg:'Use cargas leves.',alt:['des']},
{id:'ros',n:'Rosca direta com halteres',g:'Bíceps',sec:'Antebraços',eq:'Halteres',lv:'Iniciante',
 st:['Em pé, cotovelos junto ao corpo.','Flexione os cotovelos.','Desça devagar.'],
 br:'Expire ao subir.',er:'Balançar o corpo; cotovelos avançando.',sg:'Mantenha os punhos neutros.',alt:[]},
{id:'tri',n:'Tríceps no banco',g:'Tríceps',sec:'Ombros',eq:'Peso corporal',lv:'Iniciante',
 st:['Mãos no banco atrás do corpo, joelhos dobrados.','Flexione os cotovelos até cerca de 90°.','Empurre para cima.'],
 br:'Inspire ao descer.',er:'Ombros subindo; descer demais.',sg:'Pare se sentir desconforto no ombro.',alt:['tpo']},
{id:'tpo',n:'Tríceps na polia',g:'Tríceps',sec:'—',eq:'Cabos e polias',lv:'Iniciante',
 st:['Cotovelos junto ao corpo.','Estenda os cotovelos para baixo.','Retorne até 90°.'],
 br:'Expire ao estender.',er:'Mover os cotovelos; usar o peso do corpo.',sg:'Carga controlável.',alt:['tri']},
{id:'sti',n:'Stiff com halteres',g:'Posteriores de coxa',sec:'Glúteos, lombar',eq:'Halteres',lv:'Intermediário',
 st:['Joelhos levemente flexionados.','Leve o quadril para trás, halteres rente às pernas.','Volte contraindo glúteos.'],
 br:'Inspire ao descer, expire ao subir.',er:'Arredondar as costas.',sg:'Desça só até onde mantiver a coluna neutra.',alt:['pon']},
{id:'pon',n:'Elevação de quadril',g:'Glúteos',sec:'Posteriores',eq:'Peso corporal',lv:'Iniciante',
 st:['Deitado, joelhos dobrados, pés no chão.','Eleve o quadril contraindo os glúteos.','Desça devagar.'],
 br:'Expire ao subir.',er:'Hiperestender a lombar.',sg:'Suba até alinhar ombros, quadril e joelhos.',alt:['sti']},
{id:'pan',n:'Panturrilha em pé',g:'Panturrilhas',sec:'—',eq:'Peso corporal',lv:'Iniciante',
 st:['Apoie as pontas dos pés em um degrau.','Suba o máximo possível.','Desça alongando.'],
 br:'Expire ao subir.',er:'Movimento curto e rápido.',sg:'Segure em um apoio.',alt:[]},
{id:'pra',n:'Prancha',g:'Abdômen e core',sec:'Ombros',eq:'Peso corporal',lv:'Iniciante',
 st:['Antebraços no chão, corpo em linha reta.','Contraia abdômen e glúteos.','Mantenha o tempo planejado.'],
 br:'Respire normalmente.',er:'Quadril alto ou caído.',sg:'Pare se sentir dor lombar.',alt:['aba']},
{id:'aba',n:'Abdominal curto',g:'Abdômen e core',sec:'—',eq:'Peso corporal',lv:'Iniciante',
 st:['Deitado, joelhos dobrados.','Eleve levemente os ombros.','Desça com controle.'],
 br:'Expire ao subir.',er:'Puxar o pescoço.',sg:'Movimento curto e controlado.',alt:['pra']},
{id:'cam',n:'Caminhada na esteira',g:'Condicionamento cardiovascular',sec:'—',eq:'Equipamentos cardiovasculares',lv:'Iniciante',
 st:['Comece devagar por 5 min.','Aumente até um ritmo em que ainda consiga conversar.','Finalize reduzindo a velocidade.'],
 br:'Ritmo natural.',er:'Segurar nos corrimãos o tempo todo.',sg:'Pare se sentir tontura ou dor no peito.',alt:[]}
];
const byId=id=>EX.find(e=>e.id===id);
const SLOTS={fb:['Quadríceps','Peito','Costas','Ombros','Posteriores de coxa','Abdômen e core'],
 up:['Peito','Costas','Ombros','Bíceps','Tríceps'],lo:['Quadríceps','Posteriores de coxa','Glúteos','Panturrilhas','Abdômen e core']};
const SCHED={2:[1,4],3:[0,2,4],4:[0,1,3,4],5:[0,1,2,4,5]};

const MODS=[
{t:'Fundamentos',b:'Músculos crescem quando recebem estímulo progressivo, descanso e alimentação adequados. Aprenda a técnica com cargas leves, aumente aos poucos e seja consistente. Consistência vence intensidade.',q:'O que vem primeiro: técnica ou carga?',a:'Técnica'},
{t:'Séries, repetições e intervalos',b:'Uma repetição é um movimento completo; uma série é um grupo de repetições. Para hipertrofia, 6 a 15 repetições com 60–120 s de descanso funcionam bem. Para força, séries mais pesadas com descansos maiores.',q:'Intervalos maiores favorecem qual objetivo?',a:'Força'},
{t:'Aquecimento e segurança',b:'Faça 5 a 10 min de movimento leve e 1–2 séries leves do primeiro exercício. Pare diante de dor aguda, tontura ou sintomas incomuns e procure orientação profissional.',q:'Dor aguda durante o exercício: continuar ou parar?',a:'Parar'},
{t:'Progressão e recuperação',b:'Progrida adicionando poucas repetições ou pouca carga quando todas as séries estiverem completas com boa técnica. Dormir bem e descansar entre treinos do mesmo músculo faz parte do resultado.',q:'Quando aumentar a carga?',a:'Com técnica boa e séries completas'}
];

// ---------- Estado ----------
let S=load(), view='home', open=null, tick=null;
function blank(){return{v:1,profile:null,plan:null,logs:[],weights:[],session:null,mods:{}}}
function load(){try{const r=localStorage.getItem(KEY);if(!r)return blank();const o=JSON.parse(r);return valid(o)?o:blank()}catch(e){return blank()}}
function valid(o){return o&&o.v===1&&Array.isArray(o.logs)&&Array.isArray(o.weights)&&typeof o.mods==='object'}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast('Não foi possível salvar (armazenamento cheio?)')}}
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const today=()=>new Date().toISOString().slice(0,10);
const wd=()=>(new Date().getDay()+6)%7;
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}

// ---------- Plano ----------
function pick(g,home,skip){const l=EX.filter(e=>e.g===g&&(!home||HOME.includes(e.eq)));return l.find(e=>!skip.includes(e.id))||l[0]}
function params(goal){return goal==='Força'?{s:4,r:'5-6',rest:150}:goal==='Hipertrofia'?{s:3,r:'8-12',rest:90}:{s:3,r:'12-15',rest:60}}
function buildPlan(p){
  const home=p.local==='Casa', n=Math.min(p.dias,p.nivel==='Iniciante'?4:5), pr=params(p.obj), plan={};
  const seq=n<=3?['fb','fb','fb']:n===4?['up','lo','up','lo']:['up','lo','fb','up','lo'];
  (SCHED[n]||SCHED[3]).forEach((d,i)=>{const k=seq[i%seq.length],used=[];
    const items=SLOTS[k].map(g=>{const e=pick(g,home,used);used.push(e.id);return{id:e.id,s:pr.s,r:e.id==='pra'?'30-45 s':pr.r,rest:pr.rest}});
    plan[d]={name:{fb:'Corpo inteiro',up:'Superior',lo:'Inferior'}[k],items}});
  return plan;
}
const dur=d=>d?Math.round(d.items.reduce((a,i)=>a+i.s*(40+i.rest)/60,5)):0;

// ---------- Utilidades de tempo ----------
function elapsed(){const s=S.session;return s?Math.max(0,(s.pAt||Date.now())-s.t0-s.paused):0}
const mmss=ms=>{const t=Math.max(0,Math.round(ms/1000));return String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0')}

// ---------- Telas ----------
function render(){
  document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('on',b.dataset.go===view));
  $('#nav').style.display=(S.session&&view==='work')?'none':'flex';
  const v=$('#view');
  if(!S.profile)v.innerHTML=onboard();
  else v.innerHTML=({home,plan:planV,lib,prog,more,work})[view]();
  window.scrollTo(0,0);
}
function onboard(){return `<h1>Meu Personal Pro</h1><p class="mu">Responda a avaliação inicial para gerar uma proposta de plano editável.</p>
<form id="f-ob" class="card">
<label>Idade</label><input name="idade" type="number" min="14" max="90" required>
<label>Altura (cm)</label><input name="alt" type="number" min="100" max="250" required>
<label>Peso atual (kg)</label><input name="peso" type="number" step="0.1" min="30" max="300" required>
<label>Objetivo</label><select name="obj"><option>Hipertrofia</option><option>Perda de gordura</option><option>Força</option><option>Condicionamento</option><option>Saúde e consistência</option></select>
<label>Experiência</label><select name="nivel"><option>Iniciante</option><option>Intermediário</option><option>Avançado</option></select>
<label>Dias por semana</label><select name="dias"><option>2</option><option selected>3</option><option>4</option><option>5</option></select>
<label>Local</label><select name="local"><option>Academia</option><option>Casa</option></select>
<label>Lesões ou limitações</label><textarea name="lim" rows="2" placeholder="Opcional. Em caso de dor ou lesão, procure avaliação profissional."></textarea>
<p class="mu">Conteúdo educativo. Não substitui um personal trainer presencial nem avaliação médica.</p>
<button class="pri" style="width:100%">Gerar meu plano</button></form>`}

function home(){
  if(S.session)return `<h1>Treino em andamento</h1><div class="card"><p>Você tem uma sessão aberta (${mmss(elapsed())}).</p><button class="pri" data-a="resume">Retomar treino</button></div>`;
  const d=S.plan[wd()], wk=weekLogs(), goal=S.profile.dias, last=S.logs[S.logs.length-1];
  const nxt=[1,2,3,4,5,6,7].map(i=>(wd()+i)%7).find(i=>S.plan[i]);
  return `<h1>Olá! Meta: ${esc(S.profile.obj)}</h1>
<div class="card">${d?`<h3>Hoje: ${esc(d.name)}</h3><p class="mu">${d.items.length} exercícios · ~${dur(d)} min</p><button class="pri" data-a="start">Começar treino</button>`
:`<h3>Hoje é dia de descanso</h3><p class="mu">É na recuperação que o músculo se adapta. Durma bem, hidrate-se e caminhe leve se quiser.${nxt!=null?` Próximo treino: ${DAYS[nxt]}.`:''}</p>`}</div>
<div class="card"><div class="row"><h3>Semana</h3><span class="mu">${wk}/${goal} treinos</span></div><div class="bar"><i style="width:${Math.min(100,wk/goal*100)}%"></i></div></div>
<div class="card"><h3>Último treino</h3>${last?`<p class="mu">${esc(last.date)} · ${Math.round(last.dur/60000)} min · ${last.sets.length} séries</p>`:'<p class="mu">Nenhum treino ainda. Conclua o primeiro para ver seu histórico.</p>'}</div>
<div class="card warn">Interrompa o exercício em caso de dor aguda, tontura ou sintomas incomuns e procure atendimento.</div>`}
function weekLogs(){const n=new Date(),m=new Date(n);m.setDate(n.getDate()-wd());const s=m.toISOString().slice(0,10);return S.logs.filter(l=>l.date>=s).length}

function planV(){
  return `<h1>Plano semanal</h1>`+DAYS.map((nm,i)=>{const d=S.plan[i];
  return `<div class="card"><div class="row"><h3>${nm}${i===wd()?' (hoje)':''}</h3><span class="mu">${d?esc(d.name)+' · ~'+dur(d)+' min':'Descanso'}</span></div>`+
  (d?d.items.map((it,k)=>{const e=byId(it.id);return `<div class="row" style="margin-top:8px"><span>${esc(e.n)}<br><span class="mu">${it.s}×${esc(it.r)} · ${it.rest}s</span></span>
  <select class="sm" data-a="swap" data-d="${i}" data-k="${k}" style="width:auto;max-width:48%">${EX.filter(x=>x.g===e.g).map(x=>`<option value="${x.id}"${x.id===e.id?' selected':''}>${esc(x.n)}</option>`).join('')}</select></div>`}).join(''):'')+`</div>`}).join('')+
  `<button data-a="regen">Regerar plano pelo perfil</button>`}

function lib(){
  if(open){const e=byId(open),h=history(e.id);return `<button class="sm" data-a="back">← Voltar</button><h1>${esc(e.n)}</h1>
<p><span class="tag">${esc(e.g)}</span><span class="tag">${esc(e.eq)}</span><span class="tag">${e.lv}</span></p><p class="mu">Secundários: ${esc(e.sec)}</p>
<div class="card"><h3>Execução</h3><ol>${e.st.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><p><b>Respiração:</b> ${esc(e.br)}</p></div>
<div class="card"><p><b>Erros comuns:</b> ${esc(e.er)}</p><p><b>Segurança:</b> ${esc(e.sg)}</p>${e.alt.length?`<p><b>Alternativas:</b> ${e.alt.map(a=>esc(byId(a).n)).join(', ')}</p>`:''}<p class="mu">Ilustração: indisponível nesta versão.</p></div>
<div class="card"><h3>Histórico de cargas</h3>${h.length?h.slice(-6).reverse().map(x=>`<p class="mu">${x.date}: ${x.sets.map(s=>s.load+'kg×'+s.reps).join(', ')}</p>`).join('')+suggest(h):'<p class="mu">Sem registros. Conclua um treino com este exercício para ver sua evolução.</p>'}</div>`}
  const groups=[...new Set(EX.map(e=>e.g))];
  return `<h1>Exercícios</h1>`+groups.map(g=>`<h2>${esc(g)}</h2>`+EX.filter(e=>e.g===g).map(e=>`<div class="card row" data-a="open" data-id="${e.id}" style="cursor:pointer"><span>${esc(e.n)}<br><span class="mu">${esc(e.eq)}</span></span><span>›</span></div>`).join('')).join('')}
function history(id){return S.logs.map(l=>({date:l.date,sets:l.sets.filter(s=>s.ex===id)})).filter(x=>x.sets.length)}
function suggest(h){const l=h[h.length-1],it=Object.values(S.plan).flatMap(d=>d.items).find(i=>i.id===l.sets[0].ex);if(!it)return'';
  const top=parseInt(String(it.r).split('-').pop())||0;
  return l.sets.length>=it.s&&l.sets.every(s=>s.reps>=top)?`<p class="warn card">Você completou todas as séries no topo da faixa. Se a técnica estava boa e sem dor, considere um aumento pequeno de carga na próxima vez.</p>`:''}

function prog(){
  const w=S.weights.slice().sort((a,b)=>a.d.localeCompare(b.d));
  return `<h1>Evolução</h1><form id="f-w" class="card"><label>Peso (kg)</label><input name="kg" type="number" step="0.1" min="30" max="300" required><label>Data</label><input name="d" type="date" value="${today()}" required><button class="pri" style="margin-top:10px">Registrar peso</button></form>
<div class="card"><h3>Peso corporal</h3>${w.length>1?chart(w):'<p class="mu">Registre ao menos dois pesos para ver o gráfico. Oscilações rápidas de peso não indicam necessariamente ganho ou perda de gordura.</p>'}
${w.slice().reverse().map(x=>`<div class="row"><span>${x.d} · ${x.kg} kg</span><button class="sm dng" data-a="delw" data-id="${x.id}">Excluir</button></div>`).join('')}</div>
<div class="card"><h3>Treinos concluídos: ${S.logs.length}</h3></div>`}
function chart(w){const v=w.map(x=>x.kg),mn=Math.min(...v),mx=Math.max(...v),r=mx-mn||1;
  const p=w.map((x,i)=>`${10+i*(280/(w.length-1))},${130-(x.kg-mn)/r*110}`).join(' ');
  return `<svg class="ch" viewBox="0 0 300 150"><polyline fill="none" stroke="#3ddc84" stroke-width="2" points="${p}"/><text x="10" y="12" fill="#8d9399" font-size="10">${mx} kg</text><text x="10" y="146" fill="#8d9399" font-size="10">${mn} kg</text></svg>`}

function more(){
  return `<h1>Mais</h1><div class="card"><h3>Curso rápido</h3>${MODS.map((m,i)=>`<details style="margin:8px 0"><summary>${S.mods[i]?'✓ ':''}${esc(m.t)}</summary><p>${esc(m.b)}</p><p class="mu"><b>Pergunta:</b> ${esc(m.q)}</p><details><summary class="mu">Ver resposta</summary><p>${esc(m.a)}</p></details><button class="sm" data-a="mod" data-i="${i}">${S.mods[i]?'Desmarcar':'Marcar como concluído'}</button></details>`).join('')}</div>
<div class="card"><h3>IMC (indicador limitado)</h3><p class="mu">${S.weights.length?'':'Registre um peso. '}O IMC não mede gordura corporal nem diagnostica saúde.</p><p>${imc()}</p></div>
<div class="card"><h3>Backup</h3><p class="mu">Os dados ficam só neste aparelho e podem ser perdidos se você limpar os dados do navegador. Exporte backups com frequência.</p>
<div class="grid"><button data-a="exp">Exportar JSON</button><button data-a="imp">Importar JSON</button></div><input id="file" type="file" accept="application/json" hidden>
<button class="dng" style="width:100%;margin-top:10px" data-a="wipe">Apagar todos os dados</button></div>
<div class="card"><h3>Instalar</h3><p class="mu">Android (Chrome): menu ⋮ → Instalar aplicativo. iPhone (Safari): Compartilhar → Adicionar à Tela de Início.</p><button data-a="inst" id="inst" hidden>Instalar agora</button></div>
<div class="card"><button data-a="prof">Refazer avaliação</button></div>`}
function imc(){const w=[...S.weights].sort((a,b)=>a.d.localeCompare(b.d)).pop(),h=S.profile.alt/100;return w&&h?`IMC ≈ ${(w.kg/(h*h)).toFixed(1)}`:'—'}

// ---------- Treino guiado ----------
function work(){
  const s=S.session; if(!s){view='home';return home()}
  const total=s.queue.reduce((a,i)=>a+i.s,0), done=s.sets.length;
  if(s.ei>=s.queue.length)return `<h1>Treino concluído</h1><div class="card"><p>${mmss(elapsed())} · ${done} séries concluídas</p><label>Observações</label><textarea id="note" rows="2"></textarea><button class="pri" style="width:100%;margin-top:10px" data-a="finish">Salvar e finalizar</button></div>`;
  const it=s.queue[s.ei], e=byId(it.id), rest=s.restEnd&&s.restEnd>Date.now();
  return `<div class="row"><span class="mu">Exercício ${s.ei+1}/${s.queue.length}</span><span id="tm" class="big" style="font-size:1.4rem">${mmss(elapsed())}</span></div>
<div class="bar"><i style="width:${done/total*100}%"></i></div>
${rest?`<div class="card rest"><div class="row"><span>Descanso <b id="rt" class="big" style="font-size:1.6rem">${mmss(s.restEnd-Date.now())}</b></span><span><button class="sm" data-a="rest" data-v="-15">−15s</button> <button class="sm" data-a="rest" data-v="15">+15s</button> <button class="sm" data-a="rest" data-v="0">Pular</button></span></div></div>`:''}
<h1>${esc(e.n)}</h1><p class="mu">Série ${s.si+1}/${it.s} · meta ${esc(it.r)} repetições</p>
<div class="grid"><div><label>Carga (kg)</label><input id="ld" type="number" step="0.5" min="0" inputmode="decimal"></div><div><label>Repetições</label><input id="rp" type="number" min="0" inputmode="numeric"></div></div>
<button class="pri" style="width:100%;margin:12px 0" data-a="setdone">Concluir série</button>
<div class="grid"><button data-a="pause">${s.pAt?'Retomar':'Pausar'}</button><button data-a="skip">Pular exercício</button></div>
<select data-a="subst" style="margin-top:10px"><option>Substituir exercício…</option>${EX.filter(x=>x.g===e.g&&x.id!==e.id).map(x=>`<option value="${x.id}">${esc(x.n)}</option>`).join('')}</select>
<div class="card"><ol>${e.st.map(x=>`<li>${esc(x)}</li>`).join('')}</ol><p class="mu">${esc(e.br)} ${esc(e.sg)}</p></div>
<button class="dng" style="width:100%" data-a="abort">Finalizar agora</button>`}

function startWork(){
  const d=S.plan[wd()]; if(!d){toast('Hoje é dia de descanso');return}
  S.session={id:uid(),t0:Date.now(),paused:0,pAt:null,queue:d.items.map(i=>({...i})),ei:0,si:0,sets:[],restEnd:null};
  save();view='work';render();
}
function setDone(){
  const s=S.session,it=s.queue[s.ei],ld=parseFloat($('#ld').value),rp=parseInt($('#rp').value,10);
  if(!(ld>=0)||!(rp>=0)||isNaN(ld)||isNaN(rp)){toast('Informe carga e repetições (0 se for peso do corpo)');return}
  s.sets.push({ex:it.id,set:s.si+1,load:ld,reps:rp});
  if(s.si+1<it.s){s.si++;s.restEnd=Date.now()+it.rest*1000}else{s.ei++;s.si=0;s.restEnd=s.ei<s.queue.length?Date.now()+it.rest*1000:null}
  save();render();
}
function finish(abort){
  const s=S.session;if(!s)return;
  if(s.sets.length&&!S.logs.some(l=>l.id===s.id))S.logs.push({id:s.id,date:today(),dur:elapsed(),sets:s.sets,note:($('#note')||{}).value||''});
  S.session=null;save();view='home';render();toast(s.sets.length?'Treino salvo':'Treino descartado (nenhuma série concluída)');
}

// ---------- Eventos ----------
document.addEventListener('click',ev=>{
  const n=ev.target.closest('#nav button');if(n){open=null;view=n.dataset.go;render();return}
  const b=ev.target.closest('[data-a]');if(!b||b.tagName==='SELECT')return;const a=b.dataset.a,s=S.session;
  if(a==='start')startWork();
  else if(a==='resume'){view='work';render()}
  else if(a==='setdone')setDone();
  else if(a==='pause'){if(s.pAt){s.paused+=Date.now()-s.pAt;s.pAt=null}else s.pAt=Date.now();save();render()}
  else if(a==='skip'){s.ei++;s.si=0;s.restEnd=null;save();render()}
  else if(a==='rest'){const v=+b.dataset.v;s.restEnd=v===0?null:Math.max(Date.now(),s.restEnd+v*1000);save();render()}
  else if(a==='finish')finish();
  else if(a==='abort'){if(confirm('Finalizar agora? Séries puladas não serão contadas.')){s.ei=s.queue.length;finish()}}
  else if(a==='open'){open=b.dataset.id;render()}
  else if(a==='back'){open=null;render()}
  else if(a==='mod'){S.mods[b.dataset.i]=!S.mods[b.dataset.i];save();render()}
  else if(a==='delw'){if(confirm('Excluir este registro?')){S.weights=S.weights.filter(x=>x.id!==b.dataset.id);save();render()}}
  else if(a==='regen'){if(confirm('Substituir o plano atual?')){S.plan=buildPlan(S.profile);save();render()}}
  else if(a==='prof'){if(confirm('Refazer a avaliação? Seu histórico será mantido.')){S.profile=null;save();render()}}
  else if(a==='exp'){const u=URL.createObjectURL(new Blob([JSON.stringify(S,null,1)],{type:'application/json'})),l=document.createElement('a');l.href=u;l.download='meu-personal-pro-'+today()+'.json';l.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}
  else if(a==='imp')$('#file').click();
  else if(a==='wipe'){if(confirm('Apagar TODOS os dados deste aparelho? Isso não pode ser desfeito.')){localStorage.removeItem(KEY);S=blank();view='home';render()}}
  else if(a==='inst'&&window.dp){window.dp.prompt();window.dp=null}
});
document.addEventListener('change',ev=>{
  const t=ev.target;
  if(t.dataset.a==='swap'){const it=S.plan[t.dataset.d].items[t.dataset.k];it.id=t.value;save();render()}
  else if(t.dataset.a==='subst'&&t.value&&S.session){S.session.queue[S.session.ei].id=t.value;save();render()}
  else if(t.id==='file'&&t.files[0]){const r=new FileReader();r.onload=()=>{try{const o=JSON.parse(r.result);if(!valid(o))throw 0;
    if(confirm('Importar substitui os dados atuais. Continuar?')){S=Object.assign(blank(),o);save();render();toast('Backup importado')}}catch(e){toast('Arquivo de backup inválido')}};r.readAsText(t.files[0])}
});
document.addEventListener('submit',ev=>{
  ev.preventDefault();const f=ev.target,d=new FormData(f);
  if(f.id==='f-ob'){S.profile={idade:+d.get('idade'),alt:+d.get('alt'),obj:d.get('obj'),nivel:d.get('nivel'),dias:+d.get('dias'),local:d.get('local'),lim:d.get('lim')};
    S.weights.push({id:uid(),d:today(),kg:+d.get('peso')});S.plan=buildPlan(S.profile);save();view='home';render()}
  else if(f.id==='f-w'){const kg=+d.get('kg'),day=d.get('d');if(!(kg>=30&&kg<=300)||!day){toast('Dados inválidos');return}
    if(S.weights.some(x=>x.d===day&&x.kg===kg)){toast('Registro duplicado');return}S.weights.push({id:uid(),d:day,kg});save();render();toast('Peso registrado')}
});
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();window.dp=e;const b=$('#inst');if(b)b.hidden=false});

// Atualiza apenas os cronômetros (baseados em Date.now, não em contagem em memória)
setInterval(()=>{const s=S.session;if(!s||view!=='work')return;
  const t=$('#tm');if(t)t.textContent=mmss(elapsed());
  if(s.restEnd){const r=$('#rt');if(r&&s.restEnd>Date.now())r.textContent=mmss(s.restEnd-Date.now());
    else if(s.restEnd<=Date.now()){s.restEnd=null;save();render();if(navigator.vibrate)navigator.vibrate(200)}}},500);

if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('service-worker.js').catch(()=>{}));
render();
