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
 br:'Ritmo natural.',er:'Segurar nos corrimãos o tempo todo.',sg:'Pare se sentir tontura ou dor no peito.',alt:[]},
{id:'desb',n:'Desenvolvimento com barra',g:'Ombros',sec:'Tríceps, trapézio',eq:'Barra e anilhas',lv:'Intermediário',d:'Empurrada vertical que sobrecarrega o deltoide anterior com carga progressiva.',
 st:['Barra na altura da clavícula, punhos firmes e abdômen contraído.','Empurre a barra para cima, passando o rosto, até estender os cotovelos.','Desça de forma controlada até a clavícula.'],br:'Inspire ao descer, expire ao empurrar.',er:'Arquear a lombar; empurrar a barra à frente do corpo.',sg:'Comece leve e prefira ajuda de um parceiro ou suportes de segurança.',alt:['des','desm'],sr:'3-4 × 6-10',dc:'90-120 s'},
{id:'desm',n:'Desenvolvimento na máquina',g:'Ombros',sec:'Tríceps',eq:'Máquinas',lv:'Iniciante',d:'Versão guiada do desenvolvimento, boa para aprender o movimento com segurança.',
 st:['Ajuste o banco para as alças ficarem na altura dos ombros.','Empurre até estender quase totalmente os cotovelos.','Retorne devagar sem bater os pesos.'],br:'Expire ao empurrar.',er:'Ombros subindo até as orelhas; costas descoladas do encosto.',sg:'Ajuste o assento antes de iniciar e use carga controlável.',alt:['des','desb'],sr:'3 × 8-12',dc:'60-90 s'},
{id:'elp',n:'Elevação lateral na polia',g:'Ombros',sec:'—',eq:'Cabos e polias',lv:'Intermediário',d:'Mantém tensão constante no deltoide lateral durante toda a amplitude.',
 st:['Polia baixa, segure com a mão oposta ao cabo.','Eleve o braço lateralmente até a altura do ombro.','Desça devagar mantendo o cotovelo levemente flexionado.'],br:'Expire ao subir.',er:'Balançar o tronco; subir acima do ombro.',sg:'Use cargas leves e trabalhe um lado por vez.',alt:['ele','elel'],sr:'3 × 12-15',dc:'45-60 s'},
{id:'cre',n:'Crucifixo invertido com halteres',g:'Ombros',sec:'Costas superiores',eq:'Halteres',lv:'Iniciante',d:'Trabalha o deltoide posterior, importante para a postura e o equilíbrio do ombro.',
 st:['Incline o tronco à frente com a coluna neutra e halteres soltos.','Abra os braços até a altura do tronco, cotovelos levemente flexionados.','Retorne devagar.'],br:'Expire ao abrir.',er:'Usar impulso; elevar demais os ombros.',sg:'Cargas leves; evite arredondar a coluna.',alt:['fac'],sr:'3 × 12-15',dc:'45-60 s'},
{id:'fac',n:'Face pull na polia',g:'Ombros',sec:'Trapézio, manguito',eq:'Cabos e polias',lv:'Iniciante',d:'Fortalece a parte de trás do ombro e a região escapular.',
 st:['Polia na altura do rosto, corda com as duas mãos.','Puxe em direção ao rosto abrindo os cotovelos.','Volte controlando.'],br:'Expire ao puxar.',er:'Carga excessiva; inclinar o tronco para trás.',sg:'Mantenha o movimento limpo e sem dor no ombro.',alt:['cre'],sr:'3 × 12-15',dc:'45-60 s'},
{id:'elel',n:'Elevação lateral com elástico',g:'Ombros',sec:'—',eq:'Elásticos',lv:'Iniciante',d:'Opção para treinar em casa; a resistência aumenta ao longo do movimento.',
 st:['Pise no elástico e segure as pontas ao lado do corpo.','Eleve os braços lateralmente até a altura dos ombros.','Desça devagar.'],br:'Expire ao subir.',er:'Elástico frouxo; encolher os ombros.',sg:'Confira se o elástico não tem rachaduras.',alt:['ele'],sr:'3 × 12-20',dc:'45-60 s'},
{id:'pike',n:'Flexão pike',g:'Ombros',sec:'Tríceps',eq:'Peso corporal',lv:'Intermediário',d:'Flexão com o quadril elevado que enfatiza os ombros sem equipamentos.',
 st:['Mãos no chão e quadril alto, formando um V invertido.','Flexione os cotovelos levando a cabeça em direção ao chão.','Empurre de volta.'],br:'Inspire ao descer, expire ao subir.',er:'Cotovelos muito abertos; apoiar peso na cabeça.',sg:'Reduza a amplitude se sentir desconforto no ombro.',alt:['des','elel'],sr:'3 × 6-10',dc:'60-90 s'},
{id:'rosm',n:'Rosca martelo com halteres',g:'Bíceps',sec:'Antebraços, braquial',eq:'Halteres',lv:'Iniciante',d:'Pegada neutra que trabalha o braquial e o antebraço, além do bíceps.',
 st:['Em pé, halteres com as palmas voltadas uma para a outra.','Flexione os cotovelos mantendo-os junto ao corpo.','Desça devagar.'],br:'Expire ao subir.',er:'Balançar o tronco; cotovelos avançando.',sg:'Mantenha os punhos retos.',alt:['ros','rosb'],sr:'3 × 8-12',dc:'60-90 s'},
{id:'rosb',n:'Rosca direta com barra',g:'Bíceps',sec:'Antebraços',eq:'Barra e anilhas',lv:'Iniciante',d:'Permite cargas maiores no bíceps com as duas mãos em simetria.',
 st:['Pegada na largura dos ombros, barra à frente das coxas.','Flexione os cotovelos sem tirá-los do lado do corpo.','Desça sem soltar a tensão.'],br:'Expire ao subir.',er:'Jogar o corpo para trás; carga alta demais.',sg:'Se o punho incomodar, teste a barra W ou halteres.',alt:['ros','rosm'],sr:'3 × 8-12',dc:'60-90 s'},
{id:'rose',n:'Rosca com elástico',g:'Bíceps',sec:'Antebraços',eq:'Elásticos',lv:'Iniciante',d:'Opção simples para treinar bíceps em casa ou em viagens.',
 st:['Pise no elástico, palmas para frente.','Flexione os cotovelos até contrair o bíceps.','Retorne devagar mantendo a tensão.'],br:'Expire ao subir.',er:'Cotovelos afastando do corpo.',sg:'Verifique o estado do elástico antes de usar.',alt:['ros'],sr:'3 × 12-15',dc:'45-60 s'},
{id:'trif',n:'Tríceps francês com halter',g:'Tríceps',sec:'—',eq:'Halteres',lv:'Intermediário',d:'Exercício de extensão acima da cabeça que alonga a cabeça longa do tríceps.',
 st:['Segure um halter com as duas mãos acima da cabeça.','Flexione os cotovelos descendo o peso atrás da cabeça.','Estenda até o ponto inicial.'],br:'Inspire ao descer, expire ao subir.',er:'Cotovelos muito abertos; arquear a lombar.',sg:'Use carga leve; pare se houver dor no cotovelo.',alt:['tpo','trie'],sr:'3 × 10-12',dc:'60-90 s'},
{id:'trie',n:'Tríceps com elástico',g:'Tríceps',sec:'—',eq:'Elásticos',lv:'Iniciante',d:'Extensão de cotovelo com elástico fixo no alto, boa para treino em casa.',
 st:['Prenda o elástico no alto e segure com as duas mãos.','Estenda os cotovelos para baixo.','Retorne sem mover os cotovelos.'],br:'Expire ao estender.',er:'Mover os cotovelos; inclinar o tronco.',sg:'Fixação firme do elástico.',alt:['tpo','tri'],sr:'3 × 12-15',dc:'45-60 s'},
{id:'flexd',n:'Flexão diamante',g:'Tríceps',sec:'Peito, ombros',eq:'Peso corporal',lv:'Intermediário',d:'Flexão com as mãos próximas que aumenta a participação do tríceps.',
 st:['Mãos próximas formando um losango sob o peito.','Desça com os cotovelos junto ao corpo.','Empurre até estender os cotovelos.'],br:'Inspire ao descer, expire ao subir.',er:'Quadril caído; cotovelos abrindo.',sg:'Apoie os joelhos se perder a técnica.',alt:['flex','tri'],sr:'3 × 6-12',dc:'60-90 s'},
{id:'rpun',n:'Flexão de punho com halteres',g:'Antebraços',sec:'—',eq:'Halteres',lv:'Iniciante',d:'Fortalece os flexores do antebraço, úteis para a pegada.',
 st:['Antebraço apoiado, palma para cima, halter na mão.','Flexione o punho para cima.','Desça devagar.'],br:'Respiração natural.',er:'Mover o antebraço; carga alta.',sg:'Cargas leves; pare se sentir dor no punho.',alt:['epun'],sr:'2-3 × 12-20',dc:'45-60 s'},
{id:'epun',n:'Extensão de punho com halteres',g:'Antebraços',sec:'—',eq:'Halteres',lv:'Iniciante',d:'Trabalha os extensores do antebraço e ajuda no equilíbrio do punho.',
 st:['Antebraço apoiado, palma para baixo.','Eleve o dorso da mão.','Desça com controle.'],br:'Respiração natural.',er:'Carga excessiva; movimento rápido.',sg:'Comece com cargas muito leves.',alt:['rpun'],sr:'2-3 × 12-20',dc:'45-60 s'},
{id:'rosi',n:'Rosca inversa',g:'Antebraços',sec:'Bíceps, braquial',eq:'Halteres',lv:'Intermediário',d:'Pegada pronada que exige mais dos músculos do antebraço.',
 st:['Segure os halteres com as palmas para baixo.','Flexione os cotovelos mantendo os punhos retos.','Desça devagar.'],br:'Expire ao subir.',er:'Punhos dobrando; usar impulso.',sg:'Use cargas menores que na rosca normal.',alt:['rosm','rpun'],sr:'3 × 10-15',dc:'45-60 s'}

];
const byId=id=>EX.find(e=>e.id===id);
// Descrições e sugestões dos exercícios originais
const ENR={des:{d:'Empurrada vertical básica para os ombros.',sr:'3 × 8-12',dc:'60-90 s'},ele:{d:'Isola o deltoide lateral e dá largura aos ombros.',sr:'3 × 12-15',dc:'45-60 s'},
 ros:{d:'Flexão de cotovelos clássica para o bíceps.',sr:'3 × 8-12',dc:'60-90 s'},tri:{d:'Extensão de cotovelos com o peso do corpo para o tríceps.',sr:'3 × 8-15',dc:'60-90 s'},tpo:{d:'Extensão de cotovelos na polia, com tensão constante.',sr:'3 × 10-15',dc:'45-60 s'}};
Object.keys(ENR).forEach(k=>Object.assign(byId(k),ENR[k]));
// Biblioteca ampliada: peito, costas, pernas, glúteos, panturrilhas, abdômen e cardio
const X=(id,n,g,sec,eq,lv,d,st,br,er,sg,alt,sr,dc)=>({id,n,g,sec,eq,lv,d,st:st.split('|'),br,er,sg,alt:alt.split(' '),sr,dc});
const PC='Peso corporal',CB='Cabos e polias',MQ='Máquinas',HL='Halteres',BA='Barra e anilhas',CV='Equipamentos cardiovasculares',CC='Condicionamento cardiovascular',AB='Abdômen e core',IN='Intermediário',IC='Iniciante';
EX.push(
X('supi','Supino inclinado com halteres','Peito','Ombros, tríceps',HL,IN,'Enfatiza a parte superior do peito.','Banco a 30° e halteres na altura do peito|Empurre para cima aproximando os halteres|Desça devagar até alongar o peito','Inspire ao descer, expire ao empurrar.','Banco muito inclinado; cotovelos muito abertos.','Use carga controlável e peça ajuda para cargas altas.','sup supb','3 × 8-12','60-90 s'),
X('supb','Supino reto com barra','Peito','Ombros, tríceps',BA,IN,'Exercício básico de força para peito, ombros e tríceps.','Deite com os olhos sob a barra e os pés firmes|Desça a barra até a linha do peito, cotovelos a cerca de 45°|Empurre até estender os cotovelos','Inspire ao descer, expire ao empurrar.','Quicar a barra no peito; levantar o quadril.','Use suportes de segurança ou um parceiro e trave os colares.','sup supi','3-4 × 5-10','90-150 s'),
X('cruz','Crucifixo com halteres','Peito','Ombros',HL,IN,'Isola o peito com movimento de abertura.','Deitado, halteres acima do peito e cotovelos levemente flexionados|Abra os braços em arco até alongar o peito|Feche de volta','Inspire ao abrir, expire ao fechar.','Descer demais; usar carga alta.','Carga leve; pare se sentir desconforto no ombro.','sup pecd','3 × 10-15','60-90 s'),
X('pecd','Voador (peck deck)','Peito','Ombros',MQ,IC,'Movimento guiado de fechamento para o peito.','Ajuste o banco para os cotovelos ficarem na altura do peito|Feche os braços à frente|Retorne devagar sem soltar o peso','Expire ao fechar.','Ombros projetados à frente; carga excessiva.','Ajuste a amplitude para não forçar o ombro.','cruz sup','3 × 10-15','60 s'),
X('crab','Crossover na polia','Peito','Ombros',CB,IN,'Mantém tensão constante no peito.','Polias altas, um passo à frente e tronco levemente inclinado|Feche os braços à frente do corpo|Retorne controlando','Expire ao fechar.','Usar o tronco como impulso.','Mantenha postura estável e carga controlável.','pecd cruz','3 × 10-15','45-60 s'),
X('flexi','Flexão com mãos elevadas','Peito','Tríceps, ombros',PC,IC,'Versão mais fácil da flexão, ideal para aprender o movimento.','Mãos em um banco firme e corpo em linha reta|Desça o peito até o banco|Empurre até estender os cotovelos','Inspire ao descer, expire ao subir.','Quadril caído.','Use um apoio estável.','flex','3 × 8-15','45-60 s'),
X('remb','Remada baixa na polia','Costas','Bíceps, trapézio',CB,IC,'Trabalha a região média das costas.','Sente com a coluna ereta e joelhos levemente flexionados|Puxe o cabo ao abdômen aproximando as escápulas|Retorne devagar','Expire ao puxar.','Balançar o tronco; encolher os ombros.','Mantenha a coluna neutra.','rem remm','3 × 8-12','60-90 s'),
X('remm','Remada na máquina','Costas','Bíceps',MQ,IC,'Versão guiada para aprender a puxada horizontal.','Ajuste o apoio do peito|Puxe as alças levando os cotovelos para trás|Volte controlando','Expire ao puxar.','Usar impulso; ombros subindo.','Ajuste o banco antes de iniciar.','remb rem','3 × 8-12','60-90 s'),
X('remu','Remada unilateral com halter','Costas','Bíceps',HL,IC,'Permite foco em um lado por vez.','Apoie mão e joelho no banco com a coluna neutra|Puxe o halter em direção ao quadril|Desça com controle','Expire ao puxar.','Girar o tronco; usar impulso.','Mantenha a coluna neutra.','rem remb','3 × 8-12 por lado','60 s'),
X('barf','Barra fixa','Costas','Bíceps, antebraços',PC,'Avançado','Exercício exigente de força de puxada (requer barra fixa).','Pegada um pouco além dos ombros, corpo estável|Puxe até o queixo passar a barra|Desça até estender os braços','Expire ao subir.','Balançar o corpo; descer só pela metade.','Se ainda não consegue, use a puxada na polia ou elástico.','pux rele','3 × 3-8','90-120 s'),
X('pull','Pullover com halter','Costas','Peito, serrátil',HL,IN,'Alonga e trabalha costas e peito.','Deitado, segure um halter acima do peito|Leve-o atrás da cabeça com cotovelos levemente flexionados|Retorne ao ponto inicial','Inspire ao descer, expire ao subir.','Descer demais; arquear a lombar.','Carga leve; evite se houver dor no ombro.','pux rem','3 × 10-12','60-90 s'),
X('aval','Afundo com halteres','Quadríceps','Glúteos',HL,IC,'Trabalha uma perna por vez e o equilíbrio.','Dê um passo à frente com o tronco ereto|Desça até os joelhos formarem cerca de 90°|Empurre o chão e volte','Inspire ao descer, expire ao subir.','Passo curto demais; joelho colapsando para dentro.','Faça perto de um apoio se perder o equilíbrio.','agach bulg','3 × 8-12 por perna','60-90 s'),
X('cade','Cadeira extensora','Quadríceps','—',MQ,IC,'Isola o quadríceps com carga controlável.','Ajuste o encosto para o joelho alinhar com o eixo|Estenda os joelhos|Desça devagar','Expire ao subir.','Usar impulso; travar os joelhos com força.','Evite cargas altas se houver dor no joelho.','leg agach','3 × 10-15','60 s'),
X('agah','Agachamento goblet','Quadríceps','Glúteos, core',HL,IC,'Agachamento com halter junto ao peito, ótimo para aprender a técnica.','Segure o halter junto ao peito|Agache mantendo o tronco ereto|Suba empurrando o chão','Inspire ao descer, expire ao subir.','Joelhos para dentro; tronco caindo à frente.','Reduza a amplitude se houver dor.','agach leg','3 × 8-12','60-90 s'),
X('bulg','Agachamento búlgaro','Quadríceps','Glúteos',PC,IN,'Agachamento unilateral com o pé de trás elevado.','Apoie o pé de trás em um banco|Desça controlando|Suba pela perna da frente','Inspire ao descer, expire ao subir.','Perder o equilíbrio; passo curto.','Comece sem carga e perto de um apoio.','aval agach','3 × 8-10 por perna','60-90 s'),
X('mesa','Mesa flexora','Posteriores de coxa','Panturrilhas',MQ,IC,'Isola os posteriores da coxa.','Deite e alinhe os joelhos ao eixo da máquina|Flexione os joelhos|Desça devagar','Expire ao flexionar.','Elevar o quadril; usar impulso.','Use carga controlável.','sti stib','3 × 10-12','60-90 s'),
X('stib','Terra romeno com barra','Posteriores de coxa','Glúteos, lombar',BA,IN,'Movimento de dobradiça de quadril com barra.','Barra junto às coxas e joelhos levemente flexionados|Leve o quadril para trás deslizando a barra|Volte contraindo os glúteos','Inspire ao descer, expire ao subir.','Arredondar a coluna.','Comece leve e desça só até manter a coluna neutra.','sti mesa','3 × 6-10','90-120 s'),
X('hip','Hip thrust com halter','Glúteos','Posteriores',HL,IN,'Um dos exercícios mais eficientes para os glúteos.','Costas apoiadas no banco e halter sobre o quadril|Eleve o quadril até alinhar tronco e coxas|Desça devagar','Expire ao subir.','Hiperestender a lombar.','Proteja o quadril com um apoio macio.','pon cheb','3 × 8-12','60-90 s'),
X('cheb','Chute de glúteo na polia','Glúteos','—',CB,IN,'Isola os glúteos com tensão constante.','Tornozeleira na polia baixa e mãos apoiadas|Estenda o quadril levando a perna para trás|Volte controlando','Expire ao estender.','Arquear a lombar.','Use cargas leves.','pon hip','3 × 10-15 por perna','45-60 s'),
X('aboe','Abdução de quadril com elástico','Glúteos','Glúteo médio','Elásticos',IC,'Fortalece a lateral do quadril.','Elástico acima dos joelhos, em pé ou deitado de lado|Afaste a perna lateralmente|Retorne devagar','Expire ao abrir.','Girar o tronco.','Mantenha o elástico firme.','pon','3 × 12-20','45 s'),
X('pans','Panturrilha sentado','Panturrilhas','Sóleo',MQ,IC,'Trabalha principalmente o sóleo.','Ajuste o apoio nas coxas|Suba na ponta dos pés|Desça alongando','Expire ao subir.','Movimento curto e rápido.','Use carga controlável.','pan','3 × 12-20','45-60 s'),
X('pand','Panturrilha unilateral com halter','Panturrilhas','—',HL,IC,'Aumenta a carga sem precisar de máquina.','Em um degrau, halter em uma mão e apoio na outra|Suba na ponta de um pé|Desça alongando','Expire ao subir.','Perder o equilíbrio.','Use um apoio firme.','pan','3 × 10-15 por perna','45 s'),
X('elev','Elevação de pernas deitado',AB,'Flexores do quadril',PC,IN,'Trabalha a parte inferior do abdômen.','Deitado, com a lombar apoiada no chão|Eleve as pernas até cerca de 90°|Desça sem encostar no chão','Expire ao subir.','Lombar saindo do chão.','Dobre os joelhos se sentir a lombar.','aba pra','3 × 8-15','45-60 s'),
X('prl','Prancha lateral',AB,'Oblíquos',PC,IC,'Fortalece oblíquos e estabilizadores.','Apoie o antebraço e os pés, corpo alinhado|Mantenha o quadril elevado|Troque de lado','Respire normalmente.','Quadril caindo.','Pare se sentir dor.','pra','3 × 20-40 s por lado','45 s'),
X('dead','Dead bug',AB,'Core profundo',PC,IC,'Controle do core com movimento de braços e pernas.','Deitado, braços e joelhos a 90°|Estenda braço e perna opostos sem perder o contato da lombar|Alterne os lados','Expire ao estender.','Arquear a lombar.','Vá devagar e com controle.','pra aba','3 × 8-12 por lado','45 s'),
X('abpo','Abdominal na polia',AB,'—',CB,IN,'Abdominal com carga progressiva.','Ajoelhado, corda junto à cabeça|Flexione o tronco aproximando cotovelos dos joelhos|Volte controlando','Expire ao flexionar.','Puxar com os braços em vez de flexionar o tronco.','Use carga moderada.','aba','3 × 10-15','60 s'),
X('bic','Bicicleta ergométrica',CC,'—',CV,IC,'Cardio de baixo impacto.','Ajuste o banco para o joelho ficar quase estendido no ponto baixo|Comece leve por 5 minutos|Mantenha um ritmo em que ainda consiga conversar','Ritmo natural.','Banco baixo demais.','Reduza o ritmo se sentir tontura.','cam ell','20-40 min','Contínuo'),
X('ell','Elíptico',CC,'—',CV,IC,'Cardio de baixo impacto para o corpo todo.','Apoie bem os pés e segure as alças|Mantenha movimento fluido|Reduza o ritmo nos últimos minutos','Ritmo natural.','Inclinar o corpo sobre as alças.','Reduza se sentir dor ou tontura.','cam bic','20-40 min','Contínuo'),
X('cor','Corrida leve',CC,'Pernas',PC,IN,'Cardio de impacto para quem já tem base.','Comece caminhando por 5 minutos|Alterne trote e caminhada se precisar|Finalize caminhando','Respire de forma rítmica.','Aumentar o ritmo cedo demais.','Use calçado adequado e aumente a distância aos poucos.','cam bic','15-30 min','Contínuo'),
X('pulc','Pular corda',CC,'Panturrilhas',PC,IN,'Cardio intenso e de alto impacto.','Corda na altura da cintura quando pisada|Pule baixo, girando com os punhos|Aterrisse na ponta dos pés','Respiração natural.','Pular alto demais.','Evite se tiver dor nos joelhos ou tornozelos; use piso adequado.','cam','5-10 × 30-60 s','30-60 s')
);
Object.entries({agach:['Movimento básico de pernas e quadril.','3 × 8-12','60-90 s'],leg:['Empurrada guiada para pernas.','3 × 10-12','60-90 s'],flex:['Empurrada horizontal com o peso do corpo.','3 × 8-15','60 s'],sup:['Empurrada horizontal para peito, ombros e tríceps.','3 × 8-12','60-90 s'],rem:['Puxada horizontal para as costas.','3 × 8-12','60-90 s'],rele:['Puxada horizontal com elástico.','3 × 12-15','45-60 s'],pux:['Puxada vertical para as costas.','3 × 8-12','60-90 s'],sti:['Dobradiça de quadril para posteriores e glúteos.','3 × 8-12','60-90 s'],pon:['Extensão de quadril básica para os glúteos.','3 × 10-15','45-60 s'],pan:['Elevação de calcanhares para as panturrilhas.','3 × 12-20','45-60 s'],pra:['Estabilização isométrica do core.','3 × 30-45 s','45 s'],aba:['Flexão curta do tronco para o abdômen.','3 × 12-20','45 s'],cam:['Cardio leve e de baixo impacto.','20-40 min','Contínuo']}).forEach(([k,v])=>Object.assign(byId(k),{d:v[0],sr:v[1],dc:v[2]}));

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
function blank(){return{v:1,profile:null,plan:null,logs:[],weights:[],session:null,mods:{},cfg:{nome:'',tema:'dark',cor:'#6ee7a0',rest:0,hora:''},meas:[],water:{},cardio:[],refeicoes:[],sono:[],curso:{done:{},last:null,quiz:{}}}}
function load(){let r=null;try{r=localStorage.getItem(KEY);if(!r)return blank();const o=JSON.parse(r);if(valid(o))return norm(o)}catch(e){}try{if(r)localStorage.setItem(KEY+'_corrompido',r)}catch(e){}return blank()}
function valid(o){return o&&o.v===1&&Array.isArray(o.logs)&&Array.isArray(o.weights)&&typeof o.mods==='object'}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast('Não foi possível salvar (armazenamento cheio?)')}}
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const today=()=>iso(new Date());
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
  applyCfg();document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('on',b.dataset.go===view));
  const w=S.session&&view==='work';$('#nav').style.display=w?'none':'';$('#top').style.display=w?'none':'';
  const v=$('#view');
  if(!S.profile)v.innerHTML=onboard();
  else v.innerHTML=({home,plan:planV,lib,prog,more,work})[view]();
  const key=view+'|'+sub+'|'+open+'|'+cm;if(key!==lastKey){window.scrollTo(0,0);lastKey=key}afterRender();
}
function onboard(){return `<h1>Meu Personal Pro</h1><p class="mu">Responda a avaliação inicial para gerar uma proposta de plano editável.</p>
<form id="f-ob" class="card">
<label>Idade</label><input name="idade" type="number" min="14" max="90" required>
<label>Altura (cm)</label><input name="alt" type="number" min="100" max="250" required>
<label>Peso atual (kg)</label><input name="peso" type="number" step="0.1" min="30" max="300" required>
<label>Objetivo</label><select name="obj"><option>Hipertrofia</option><option>Perda de gordura</option><option>Recomposição corporal</option><option>Força</option><option>Condicionamento</option><option>Saúde e consistência</option></select>
<label>Experiência</label><select name="nivel"><option>Iniciante</option><option>Intermediário</option><option>Avançado</option></select>
<label>Dias por semana</label><select name="dias"><option>2</option><option selected>3</option><option>4</option><option>5</option></select>
<label>Local</label><select name="local"><option>Academia</option><option>Casa</option></select>
<label>Lesões ou limitações</label><textarea name="lim" rows="2" placeholder="Opcional. Em caso de dor ou lesão, procure avaliação profissional."></textarea>
<p class="mu">Conteúdo educativo. Não substitui um personal trainer presencial nem avaliação médica.</p>
<button class="pri" style="width:100%">Gerar meu plano</button></form>`}

function iso(d){return new Date(d-d.getTimezoneOffset()*60000).toISOString().slice(0,10)}
function weekDates(){const n=new Date(),y=n.getFullYear(),m=n.getMonth(),d=n.getDate()-wd();return[0,1,2,3,4,5,6].map(i=>iso(new Date(y,m,d+i)))}
function weekLogs(){const w=weekDates();return S.logs.filter(l=>w.includes(l.date)).length}
function home(){
  if(S.session)return `<div class="hero"><div><p class="mu">Em andamento</p><h1>${mmss(elapsed())}</h1><button class="pri" data-a="resume">Retomar treino</button></div></div>`;
  const d=S.plan[wd()],wk=weekLogs(),goal=S.profile.dias,wds=weekDates(),wl=S.logs.filter(l=>wds.includes(l.date));
  const last=S.logs[S.logs.length-1],C=276.5,off=C*(1-Math.min(1,wk/goal));
  const nxt=[1,2,3,4,5,6,7].map(i=>(wd()+i)%7).find(i=>S.plan[i]);
  return `<section class="hero"><div><p class="mu">${S.cfg.nome?'Olá, '+esc(S.cfg.nome)+' · ':''}${DAYS[wd()]} · ${esc(S.profile.obj)}</p>
  ${d?`<h1>${esc(d.name)}</h1><p class="mu">${d.items.length} exercícios · ~${dur(d)} min</p><button class="pri" data-a="start">Começar treino</button>`
  :`<h1>Dia de descanso</h1><p class="mu">O músculo se adapta na recuperação.${nxt!=null?' Próximo treino: '+DAYS[nxt]+'.':''}</p>`}</div>
  <div class="ring"><svg viewBox="0 0 104 104"><circle cx="52" cy="52" r="44" fill="none" stroke="#24352d" stroke-width="9"/><circle cx="52" cy="52" r="44" fill="none" stroke="#6ee7a0" stroke-width="9" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${off}"/></svg><b><span>${wk}/${goal}<small>na semana</small></span></b></div></section>
  <div class="week">${DAYS.map((n,i)=>`<div class="${S.plan[i]?'pl':''} ${wds[i]&&S.logs.some(l=>l.date===wds[i])?'dn':''} ${i===wd()?'hj':''}">${n}<i></i></div>`).join('')}</div>
  <div class="tiles"><div class="card"><b>${S.logs.length}</b><span>treinos</span></div><div class="card"><b>${wl.reduce((a,l)=>a+l.sets.length,0)}</b><span>séries na semana</span></div><div class="card"><b>${Math.round(wl.reduce((a,l)=>a+l.dur,0)/60000)}</b><span>min na semana</span></div></div>
  <div class="grid" style="grid-template-columns:repeat(3,1fr)"><button data-a="goto" data-v="plan">Treinos</button><button data-a="goto" data-v="more" data-s="habitos">Água</button><button data-a="goto" data-v="more" data-s="cardio">Cardio</button></div><div class="card"><h3>Último treino</h3>${nxt!=null&&S.plan[nxt]?'<p class="mu">Próxima sessão: '+DAYS[nxt]+' · '+esc(S.plan[nxt].name)+'</p>':''}${last?`<p class="mu">${esc(last.date)} · ${Math.round(last.dur/60000)} min · ${last.sets.length} séries</p>`:'<p class="mu">Conclua seu primeiro treino para ver o histórico aqui.</p>'}</div>
  <div class="card warn">Interrompa o exercício em caso de dor aguda, tontura ou sintomas incomuns e procure atendimento.</div>`}
function libOld(){
  if(open){const e=byId(open),h=history(e.id);return `<button class="sm" data-a="back">← Voltar</button><h1>${esc(e.n)}</h1>
<p><span class="tag">${esc(e.g)}</span><span class="tag">${esc(e.eq)}</span><span class="tag">${e.lv}</span></p><p class="mu">Secundários: ${esc(e.sec)}</p>${e.d?'<p>'+esc(e.d)+'</p>':''}<p class="mu">Sugestão: ${esc(e.sr||'3 × 8-12')} · descanso ${esc(e.dc||'60-90 s')} (ajuste ao seu objetivo)</p>
<div class="card"><h3>Execução</h3><ol>${e.st.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><p><b>Respiração:</b> ${esc(e.br)}</p></div>
<div class="card"><p><b>Erros comuns:</b> ${esc(e.er)}</p><p><b>Segurança:</b> ${esc(e.sg)}</p>${e.alt.length?`<p><b>Alternativas:</b> ${e.alt.map(a=>esc(byId(a).n)).join(', ')}</p>`:''}<p class="mu">Ilustração: indisponível nesta versão.</p></div>
<div class="card"><h3>Histórico de cargas</h3>${h.length?h.slice(-6).reverse().map(x=>`<p class="mu">${x.date}: ${x.sets.map(s=>s.load+'kg×'+s.reps).join(', ')}</p>`).join('')+suggest(h):'<p class="mu">Sem registros. Conclua um treino com este exercício para ver sua evolução.</p>'}</div>`}
  const groups=[...new Set(EX.map(e=>e.g))];
  return `<h1>Exercícios</h1>`+groups.map(g=>`<h2>${esc(g)}</h2>`+EX.filter(e=>e.g===g).map(e=>`<div class="card row" data-a="open" data-id="${e.id}" style="cursor:pointer"><span>${esc(e.n)}<br><span class="mu">${esc(e.eq)}</span></span><span>›</span></div>`).join('')).join('')}
function history(id){return S.logs.map(l=>({date:l.date,sets:l.sets.filter(s=>s.ex===id)})).filter(x=>x.sets.length)}
function suggest(h){const l=h[h.length-1],it=Object.values(S.plan).flatMap(d=>d.items).find(i=>i.id===l.sets[0].ex);if(!it)return'';
  const top=parseInt(String(it.r).split('-').pop())||0;
  return l.sets.length>=it.s&&l.sets.every(s=>s.reps>=top)?`<p class="warn card">Você completou todas as séries no topo da faixa. Se a técnica estava boa e sem dor, considere um aumento pequeno de carga na próxima vez.</p>`:''}

function progOld(){
  const w=S.weights.filter(x=>x.d>=perStart()).sort((a,b)=>a.d.localeCompare(b.d));
  return `<h1>Evolução</h1><form id="f-w" class="card"><label>Peso (kg)</label><input name="kg" type="number" step="0.1" min="30" max="300" required><label>Data</label><input name="d" type="date" value="${today()}" required><button class="pri" style="margin-top:10px">Registrar peso</button></form>
<div class="card"><h3>Peso corporal</h3>${w.length>1?chart(w):'<p class="mu">Registre ao menos dois pesos para ver o gráfico. Oscilações rápidas de peso não indicam necessariamente ganho ou perda de gordura.</p>'}
${w.slice().reverse().map(x=>`<div class="row"><span>${x.d} · ${x.kg} kg</span><button class="sm" data-a="edw" data-id="${x.id}">Editar</button> <button class="sm dng" data-a="delw" data-id="${x.id}">Excluir</button></div>`).join('')}</div>
<div class="card"><h3>Treinos concluídos: ${S.logs.length}</h3></div>`}
function chart(w){const v=w.map(x=>x.kg),mn=Math.min(...v),mx=Math.max(...v),r=mx-mn||1;
  const p=w.map((x,i)=>`${10+i*(280/(w.length-1))},${130-(x.kg-mn)/r*110}`).join(' ');
  return `<svg class="ch" viewBox="0 0 300 150"><polyline fill="none" stroke="#3ddc84" stroke-width="2" points="${p}"/><text x="10" y="12" fill="#8d9399" font-size="10">${mx} kg</text><text x="10" y="146" fill="#8d9399" font-size="10">${mn} kg</text></svg>`}

function imc(){const w=[...S.weights].sort((a,b)=>a.d.localeCompare(b.d)).pop(),h=S.profile.alt/100;return w&&h?`IMC ≈ ${(w.kg/(h*h)).toFixed(1)}`:'—'}

// ---------- v2: configurações, planejador, filtros, área Mais ----------
let sub=null,lastKey='';
const OPEN=new Set([String(wd())]);
const F={q:'',g:'',e:'',l:''};
const GR=[...new Set(EX.map(e=>e.g))],EQ=[...new Set(EX.map(e=>e.eq))],LV=[...new Set(EX.map(e=>e.lv))];
const MK=['cintura','peito','braco','coxa','quadril'];
const OBJ=['Hipertrofia','Perda de gordura','Recomposição corporal','Força','Condicionamento','Saúde e consistência'];
const opts=(l,v)=>l.map(o=>{const [a,b]=Array.isArray(o)?o:[o,o];return `<option value="${esc(a)}"${String(a)===String(v)?' selected':''}>${esc(b)}</option>`}).join('');
function norm(o){const b=blank();return Object.assign(b,o,{cfg:Object.assign(b.cfg,o.cfg||{}),curso:Object.assign(b.curso,o.curso||{})})}
function applyCfg(){const c=S.cfg,r=document.documentElement;r.dataset.theme=c.tema==='system'?(window.matchMedia&&matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'):c.tema;r.style.setProperty('--ac',c.cor)}
const lastDays=n=>Array.from({length:n},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(n-1-i));return iso(d)});
function wkd(o){const n=new Date();return[0,1,2,3,4,5,6].map(i=>iso(new Date(n.getFullYear(),n.getMonth(),n.getDate()-wd()-7*o+i)))}
const vol=l=>l.sets.reduce((a,s)=>a+s.load*s.reps,0);
function bars(v,l){const mx=Math.max(...v,1),w=300/v.length;return `<svg class="ch" viewBox="0 0 300 150" role="img" aria-label="Gráfico de barras">${v.map((x,i)=>`<rect x="${i*w+6}" y="${120-x/mx*100}" width="${w-12}" height="${x/mx*100}" rx="4" fill="var(--ac)"/><text x="${i*w+w/2}" y="140" fill="#8b9298" font-size="9" text-anchor="middle">${esc(l[i])}</text>`).join('')}</svg>`}

// Treinos (planejador editável)
function overlap(){const out=[];for(let i=0;i<7;i++){const a=S.plan[i],b=S.plan[(i+1)%7];if(!a||!b)continue;const ga=new Set(a.items.map(x=>byId(x.id).g));const c=[...new Set(b.items.map(x=>byId(x.id).g))].filter(g=>ga.has(g)&&g!=='Abdômen e core');if(c.length)out.push(`${c.join(', ')} em ${DAYS[i]} e ${DAYS[(i+1)%7]}`)}return out}
function planV(){const ov=overlap();
  return `<h1>Treinos</h1><p class="mu">Edite sessões, exercícios, séries e dias. Tudo é salvo e aparece no início.${S.cfg.hora?' Horário preferido: '+esc(S.cfg.hora)+'.':''}</p>`+
  (ov.length?`<div class="card warn">Mesmo grupo em dias seguidos: ${esc(ov.join('; '))}. Deixe cerca de 48 h entre treinos intensos do mesmo músculo para recuperar.</div>`:'')+
  DAYS.map((nm,i)=>{const d=S.plan[i];
  if(!d)return `<div class="card row" style="margin:8px 0"><span><b>${nm}</b> <span class="mu">· descanso</span></span><button class="sm" data-a="mk" data-d="${i}">Criar sessão</button></div>`;
  return `<details class="card" data-day="${i}"${OPEN.has(String(i))?' open':''}><summary><b>${nm}${i===wd()?' · hoje':''}</b> <span class="mu">${esc(d.name)} · ${d.items.length} exerc. · ~${dur(d)} min</span></summary>
<label>Nome da sessão</label><input data-a="dname" data-d="${i}" value="${esc(d.name)}" maxlength="30">
<p class="mu" style="margin-top:12px">Séries · repetições · descanso (s)</p>
${d.items.map((it,k)=>{const e=byId(it.id),at=`data-d="${i}" data-k="${k}"`;return `<div class="ex"><select data-a="swap" ${at} aria-label="Exercício">${EX.filter(x=>x.g===e.g).map(x=>`<option value="${x.id}"${x.id===e.id?' selected':''}>${esc(x.n)}</option>`).join('')}</select>
<div class="mini"><input data-a="pf" data-f="s" ${at} type="number" min="1" max="10" value="${it.s}" aria-label="Séries"><input data-a="pf" data-f="r" ${at} value="${esc(it.r)}" aria-label="Repetições"><input data-a="pf" data-f="rest" ${at} type="number" min="10" max="600" value="${it.rest}" aria-label="Descanso em segundos"><button class="sm" data-a="up" ${at} aria-label="Subir">▲</button><button class="sm" data-a="dn" ${at} aria-label="Descer">▼</button><button class="sm dng" data-a="rm" ${at} aria-label="Remover">✕</button></div></div>`}).join('')}
<select data-a="addex" data-d="${i}" style="margin-top:10px"><option value="">+ Adicionar exercício…</option>${EX.map(x=>`<option value="${x.id}">${esc(x.g)} · ${esc(x.n)}</option>`).join('')}</select>
<div class="grid" style="margin-top:8px"><select data-a="mvd" data-d="${i}"><option value="">Mover para…</option>${DAYS.map((n,j)=>j===i?'':`<option value="${j}">${n}</option>`).join('')}</select>
<select data-a="dupd" data-d="${i}"><option value="">Duplicar em…</option>${DAYS.map((n,j)=>S.plan[j]?'':`<option value="${j}">${n}</option>`).join('')}</select></div>
<button class="sm dng" style="margin-top:8px" data-a="clr" data-d="${i}">Transformar em descanso</button></details>`}).join('')+
  `<button style="width:100%;margin-top:10px" data-a="regen">Regerar plano pelo perfil</button>`}

// Exercícios (filtros e busca)
function exList(){const q=F.q.toLowerCase(),l=EX.filter(e=>(!q||e.n.toLowerCase().includes(q))&&(!F.g||e.g===F.g)&&(!F.e||e.eq===F.e)&&(!F.l||e.lv===F.l));
  return l.length?l.map(e=>`<div class="card row" data-a="open" data-id="${e.id}" style="cursor:pointer;margin:6px 0"><span>${esc(e.n)}<br><span class="mu">${esc(e.g)} · ${esc(e.eq)}</span></span><span>›</span></div>`).join(''):'<p class="mu">Nenhum exercício encontrado. Limpe os filtros ou tente outro nome.</p>'}
function lib(){if(open)return libOld();
  return `<h1>Exercícios</h1><input id="q" type="search" placeholder="Buscar por nome" value="${esc(F.q)}" aria-label="Buscar exercício"><div class="grid3"><select id="fg" aria-label="Grupo muscular"><option value="">Grupo</option>${opts(GR,F.g)}</select><select id="fe" aria-label="Equipamento"><option value="">Equipamento</option>${opts(EQ,F.e)}</select><select id="fl" aria-label="Dificuldade"><option value="">Nível</option>${opts(LV,F.l)}</select></div><div id="exl">${exList()}</div>`}

// Evolução (volume, medidas)
function prog(){
  const o=[7,6,5,4,3,2,1,0],v=o.map(k=>S.logs.filter(l=>wkd(k).includes(l.date)).reduce((a,l)=>a+vol(l),0)),m=S.meas.slice().sort((a,b)=>a.d.localeCompare(b.d));
  let cmp='';if(m.length>1){const a=m[0],z=m[m.length-1];cmp=MK.filter(k=>a[k]&&z[k]).map(k=>`${k}: ${(z[k]-a[k]>0?'+':'')+(z[k]-a[k]).toFixed(1)} cm`).join(' · ');}
  return ctrl()+progOld()+volCards()+exCard()+`<form id="f-me" class="card"><h3>Medidas (cm)</h3><div class="grid3">${MK.map(k=>`<div><label>${k[0].toUpperCase()+k.slice(1)}</label><input name="${k}" type="number" step="0.1" min="1" max="299" inputmode="decimal"></div>`).join('')}<div><label>Data</label><input name="d" type="date" value="${today()}" required></div></div><button class="pri" style="width:100%;margin-top:12px">Registrar medidas</button>
${m.length?`<p class="mu">${m.length>1?'Primeiro → último: '+esc(cmp||'sem medidas em comum'):'Registre outra data para comparar.'}</p>`+m.slice().reverse().map(x=>`<div class="row"><span class="mu">${x.d} · ${MK.filter(k=>x[k]).map(k=>k+' '+x[k]).join(', ')}</span><button type="button" class="sm dng" data-a="delm" data-id="${x.id}">Excluir</button></div>`).join(''):'<p class="mu">Nenhuma medida registrada.</p>'}</form>`+fotosCard()}

// Mais
const MENU=[['perfil','Perfil físico'],['config','Configurações'],['curso','Curso de musculação'],['habitos','Nutrição e hábitos'],['cardio','Cardio'],['metas','Metas e conquistas'],['hist','Histórico'],['backup','Backup e restauração'],['priv','Privacidade e sobre']];
function more(){
  if(!sub)return `<h1>Mais</h1>`+MENU.map(([k,t])=>`<div class="card row" data-a="sub" data-v="${k}" style="cursor:pointer;margin:6px 0"><span>${t}</span><span>›</span></div>`).join('');
  return `<button class="sm" data-a="sub" data-v="">← Mais</button>`+({perfil,config,curso,habitos,cardio,metas,hist,backup,priv})[sub]()}
function perfil(){const p=S.profile;return `<h1>Perfil físico</h1><form id="f-pf" class="card">
<label>Idade</label><input name="idade" type="number" min="14" max="90" value="${p.idade}" required><label>Altura (cm)</label><input name="alt" type="number" min="100" max="250" value="${p.alt}" required>
<label>Objetivo</label><select name="obj">${opts(OBJ,p.obj)}</select><label>Experiência</label><select name="nivel">${opts(['Iniciante','Intermediário','Avançado'],p.nivel)}</select>
<label>Dias por semana</label><select name="dias">${opts([2,3,4,5],p.dias)}</select><label>Local</label><select name="local">${opts(['Academia','Casa'],p.local)}</select>
<label>Lesões, limitações ou exercícios a evitar</label><textarea name="lim" rows="2">${esc(p.lim)}</textarea><p class="mu">Havendo dor ou lesão, busque avaliação profissional.</p>
<label style="display:flex;gap:8px;align-items:center"><input type="checkbox" name="regen"> Regerar o plano com estes dados</label><button class="pri" style="width:100%;margin-top:10px">Salvar perfil</button></form>`}
function config(){const c=S.cfg;return `<h1>Configurações</h1><form id="f-cfg" class="card"><p class="mu">Alterações são salvas automaticamente.</p>
<label>Apelido (opcional)</label><input name="nome" maxlength="20" value="${esc(c.nome)}"><label>Tema</label><select name="tema">${opts([['dark','Escuro'],['light','Claro'],['system','Seguir o sistema']],c.tema)}</select>
<label>Cor de destaque</label><select name="cor">${opts([['#6ee7a0','Verde'],['#60a5fa','Azul'],['#fb923c','Laranja']],c.cor)}</select>
<label>Descanso padrão (novos planos e exercícios)</label><select name="rest">${opts([[0,'Automático, conforme o objetivo'],[60,'60 s'],[90,'90 s'],[120,'2 min'],[150,'2 min 30 s']],c.rest)}</select>
<label>Horário preferido de treino</label><input name="hora" type="time" value="${esc(c.hora)}"></form>
<div class="card warn"><h3>Lembretes</h3><p>Lembretes com o app fechado não funcionam de forma confiável em um site estático, então não foram ativados. Use o alarme do celular no seu horário.</p></div>
<div class="card"><h3>Restaurar padrões</h3><p class="mu">Volta tema, cor e descanso ao padrão. O histórico não é apagado.</p><button data-a="reset">Restaurar configurações</button></div>`}
function cursoOld(){const n=MODS.filter((m,i)=>S.mods[i]).length;return `<h1>Curso</h1><div class="bar"><i style="width:${n/MODS.length*100}%"></i></div><p class="mu">${n}/${MODS.length} módulos concluídos. Esta é uma versão resumida; o curso de 16 módulos ainda será ampliado.</p>`+MODS.map((m,i)=>`<details class="card"><summary>${S.mods[i]?'✓ ':''}${esc(m.t)}</summary><p>${esc(m.b)}</p><p class="mu"><b>Pergunta:</b> ${esc(m.q)}</p><details><summary class="mu">Ver resposta</summary><p>${esc(m.a)}</p></details><button class="sm" data-a="mod" data-i="${i}">${S.mods[i]?'Desmarcar':'Marcar como concluído'}</button></details>`).join('')}
function habitosOld(){const t=today(),ml=S.water[t]||0,d=lastDays(7);return `<h1>Nutrição e hábitos</h1><div class="card"><h3>Água de hoje</h3><p class="big">${ml} <span class="mu">ml</span></p><div class="grid3" style="grid-template-columns:repeat(4,1fr)">${[200,300,500,-200].map(v=>`<button data-a="water" data-v="${v}">${v>0?'+':'−'}${Math.abs(v)}</button>`).join('')}</div><p class="mu">A necessidade de água varia com a pessoa, o clima e a atividade.</p>${bars(d.map(x=>S.water[x]||0),d.map(x=>x.slice(8)))}</div>
<div class="card"><h3>Nutrientes em resumo</h3><ul><li><b>Proteínas:</b> reparo muscular (carnes, ovos, laticínios, leguminosas).</li><li><b>Carboidratos:</b> energia para treinar (arroz, batata, frutas, aveia).</li><li><b>Gorduras:</b> funções hormonais e saúde geral (azeite, castanhas, peixes).</li></ul><p class="mu">Conteúdo educativo geral, não é dieta individual. Para um plano personalizado, procure um nutricionista.</p></div>
<div class="card"><h3>Sono e recuperação</h3><p class="mu">Dormir bem favorece recuperação e desempenho. Mantenha horários regulares e evite treino intenso com cansaço extremo. O registro de refeições e de sono ainda não está disponível.</p></div>`}
function cardio(){const w=wkd(0),t=S.cardio.filter(c=>w.includes(c.d)).reduce((a,c)=>a+c.min,0),d=lastDays(7);
  return `<h1>Cardio</h1><form id="f-ca" class="card"><label>Atividade</label><select name="tipo">${opts(['Caminhada','Corrida','Bicicleta','Esteira','Elíptico','Outra'])}</select>
<div class="grid"><div><label>Minutos</label><input name="min" type="number" min="1" max="999" required></div><div><label>Distância (km, opcional)</label><input name="km" type="number" step="0.01" min="0"></div></div>
<label>Esforço percebido (1 a 10, opcional)</label><select name="esf"><option value="">—</option>${opts([1,2,3,4,5,6,7,8,9,10])}</select><label>Observações</label><input name="nota" maxlength="120">
<button class="pri" style="width:100%;margin-top:12px">Registrar atividade</button></form>
<div class="card"><h3>Esta semana: ${t} min</h3>${S.cardio.length?bars(d.map(x=>S.cardio.filter(c=>c.d===x).reduce((a,c)=>a+c.min,0)),d.map(x=>x.slice(8))):'<p class="mu">Registre uma atividade para ver o gráfico.</p>'}<p class="mu">Não calculamos calorias: estimativas variam muito entre pessoas. Em dias de treino de pernas pesado, prefira cardio leve.</p>
${S.cardio.slice(-8).reverse().map(c=>`<div class="row"><span class="mu">${c.d} · ${esc(c.tipo)} · ${c.min} min${c.km?' · '+c.km+' km':''}${c.esf?' · esforço '+c.esf:''}</span><button class="sm dng" data-a="delc" data-id="${c.id}">Excluir</button></div>`).join('')}</div>`}
function cal(){const n=new Date(),y=n.getFullYear(),m=n.getMonth(),f=(new Date(y,m,1).getDay()+6)%7,nd=new Date(y,m+1,0).getDate(),s=new Set(S.logs.map(l=>l.date));
  let h=DAYS.map(d=>`<b class="mu">${d}</b>`).join('')+'<i></i>'.repeat(f);for(let d=1;d<=nd;d++)h+=`<span class="${s.has(iso(new Date(y,m,d)))?'dn':''}">${d}</span>`;return `<div class="cal">${h}</div>`}
function metas(){const g=S.profile.dias,cnt=o=>S.logs.filter(l=>wkd(o).includes(l.date)).length;let st=0;for(let o=0;o<52;o++){if(cnt(o)>=g)st++;else if(o>0)break}
  const mes=S.logs.filter(l=>l.date.slice(0,7)===today().slice(0,7)).length,A=[['Primeiro treino',S.logs.length>=1],['10 treinos concluídos',S.logs.length>=10],['4 semanas seguidas na meta',st>=4],['Primeiro módulo do curso',Object.values(S.mods).some(Boolean)||Object.values(S.curso.done).some(Boolean)],['5 registros de peso',S.weights.length>=5],['Primeira atividade de cardio',S.cardio.length>=1]];
  return `<h1>Metas e consistência</h1><div class="card"><div class="row"><h3>Meta semanal</h3><span class="mu">${cnt(0)}/${g} treinos</span></div><div class="bar"><i style="width:${Math.min(100,cnt(0)/g*100)}%"></i></div><p class="mu">Altere a meta no Perfil físico. Treinos neste mês: ${mes}. Semanas seguidas na meta: ${st}.</p><p class="mu">A sequência conta semanas, não dias seguidos: descansar faz parte do progresso.</p></div>
<div class="card"><h3>Calendário do mês</h3>${cal()}</div><div class="card"><h3>Conquistas</h3>${A.map(([t,o])=>`<p>${o?'🏆':'▫️'} ${t}</p>`).join('')}</div>`}
function hist(){const l=S.logs.slice().reverse();return `<h1>Histórico</h1>`+(l.length?l.map(x=>`<details class="card"><summary>${esc(x.date)} · ${Math.round(x.dur/60000)} min · ${x.sets.length} séries</summary>${[...new Set(x.sets.map(s=>s.ex))].map(id=>`<p><b>${esc(byId(id)?byId(id).n:id)}</b><br><span class="mu">${x.sets.filter(s=>s.ex===id).map(s=>s.load+' kg × '+s.reps+(s.rpe?' (esf. '+s.rpe+')':'')).join(' · ')}</span>${x.notes&&x.notes[id]?'<br><span class="mu">Obs.: '+esc(x.notes[id])+'</span>':''}</p>`).join('')}<p class="mu">Volume: ${vol(x)} kg${x.note?' · '+esc(x.note):''}</p><button class="sm dng" data-a="dell" data-id="${x.id}">Excluir treino</button></details>`).join(''):'<div class="card"><p class="mu">Nenhum treino concluído ainda. Comece pelo botão "Começar treino" no início.</p></div>')}
function backup(){return `<h1>Backup</h1><div class="card"><p class="mu">Seus dados ficam só neste aparelho (cerca de ${(JSON.stringify(S).length/1024).toFixed(1)} KB em uso) e podem ser perdidos se você limpar os dados do navegador. Exporte backups com frequência. Não há sincronização na nuvem. As fotos de evolução ficam à parte, no armazenamento do navegador, e não entram no backup em JSON.</p><div class="grid"><button data-a="exp">Exportar</button><button data-a="imp">Importar</button></div><input id="file" type="file" accept="application/json" hidden></div>
<div class="card"><h3>Zona de risco</h3><button class="dng" style="width:100%;margin:4px 0" data-a="clrh">Apagar histórico de treinos</button><button class="dng" style="width:100%" data-a="wipe">Excluir todos os dados</button></div>`}
function priv(){return `<h1>Privacidade e sobre</h1><div class="card"><p>Nenhum dado é enviado para servidores. Tudo fica no armazenamento local do seu navegador.</p><p class="mu">Meu Personal Pro v2 · conteúdo educativo, não substitui personal trainer presencial nem avaliação médica. Interrompa o exercício diante de dor aguda, tontura ou sintomas incomuns.</p></div>
<div class="card"><h3>Instalar</h3><p class="mu">Android (Chrome): menu ⋮ → Instalar aplicativo. iPhone (Safari): Compartilhar → Adicionar à Tela de Início.</p><button data-a="inst" id="inst" ${window.dp?'':'hidden'}>Instalar agora</button></div><div class="card"><p class="mu">IMC (indicador limitado, não mede gordura corporal nem diagnostica saúde): ${imc()}</p></div>`}

// ---------- Curso completo (módulos 1 a 4 prontos; os demais serão adicionados por etapas) ----------
const TITULOS=['Fundamentos da musculação','Anatomia muscular','Hipertrofia','Séries, repetições e volume','Intensidade e percepção de esforço','Técnica dos exercícios','Aquecimento','Organização semanal','Progressão de cargas','Descanso e recuperação','Nutrição esportiva básica','Perda de gordura e ganho muscular','Cardio e condicionamento','Como acompanhar resultados','Erros comuns e segurança','Como montar e ajustar o próprio treinamento'];
const MC=(aulas,res,q)=>({aulas:aulas.map(([t,b,ex])=>({t,b,ex})),res,q:q.map(([q,o,a,e])=>({q,o,a,e}))});
const COURSE=[
MC([['O que é musculação e como o corpo se adapta',['Musculação é o treino com resistência, seja com pesos, máquinas, elásticos ou o próprio peso do corpo, para estimular os músculos a ficarem mais fortes.','O corpo se adapta em ciclo: o treino gera um estímulo e uma fadiga, o descanso permite a recuperação e, depois, o corpo fica um pouco mais preparado para o mesmo esforço. Os músculos não crescem durante o treino, e sim na recuperação, com descanso e alimentação adequados.','Para continuar evoluindo, o estímulo precisa aumentar aos poucos. Esse princípio se chama sobrecarga progressiva.'],'Você agacha 3 séries de 10 repetições com 20 kg. Algumas semanas depois, faz 3 séries de 12 com os mesmos 20 kg. O corpo se adaptou, e agora faz sentido aumentar um pouco a carga ou manter e melhorar a técnica.'],
['Benefícios e expectativas realistas',['A musculação melhora a força, a massa muscular, a densidade óssea, a postura e a capacidade de realizar tarefas do dia a dia. Também costuma ajudar no bem-estar e na saúde metabólica.','O ritmo de resultado varia com genética, idade, sono, alimentação, regularidade e histórico de treino. Nas primeiras semanas, boa parte da melhora vem do sistema nervoso aprendendo o movimento, antes de aparecer aumento visível de músculo.','Por isso, o foco inicial deve ser consistência e boa técnica, e não comparação com outras pessoas.'],'Se na quarta semana você ainda não vê diferença no espelho, mas consegue fazer a mesma carga com mais controle e repetições, isso já é evolução real.'],
['Primeiros passos com segurança',['Aprenda a técnica antes de aumentar a carga. Comece com 2 a 3 treinos por semana, aqueça antes e registre o que fez.','Desconforto muscular leve nos dias seguintes é comum. Dor aguda, formigamento, tontura ou dor que piora durante o exercício são sinais para parar e procurar orientação.','Quem tem condições de saúde, dores persistentes ou lesões deve buscar avaliação médica ou de um profissional qualificado antes de treinar. O aplicativo é educativo e não substitui acompanhamento presencial.'],'Na primeira semana, use cargas leves em todos os exercícios e foque em fazer o movimento completo e controlado, terminando as séries sentindo que poderia fazer mais.']],
['Musculação é treino com resistência e depende de estímulo, descanso e alimentação.','Os músculos se adaptam na recuperação, não durante o treino.','A sobrecarga deve aumentar de forma gradual.','Expectativas realistas e consistência valem mais que pressa.','Dor aguda, tontura ou sintomas incomuns pedem parada e orientação profissional.'],
[['Quando o músculo se adapta ao treino?',['Somente durante a série','Na recuperação, com descanso e alimentação','Apenas ao treinar até a falha','Só ao fazer cardio'],1,'O estímulo acontece no treino, mas a adaptação ocorre na recuperação.'],
['O que é sobrecarga progressiva?',['Aumentar o estímulo aos poucos com o tempo','Treinar todos os dias sem descanso','Usar sempre a carga máxima','Trocar de exercício todo dia'],0,'É aumentar gradualmente carga, repetições ou outra variável para continuar evoluindo.'],
['O que fazer diante de dor aguda durante um exercício?',['Continuar para terminar a série','Aumentar a carga','Parar e buscar orientação se persistir','Ignorar se for no início do treino'],2,'Dor aguda é sinal de alerta. Pare e procure orientação.']]),
MC([['Tipos de músculo e contrações',['O corpo tem músculo esquelético (voluntário, ligado aos ossos por tendões), liso (órgãos internos) e cardíaco. A musculação trabalha principalmente o esquelético.','A contração pode ser concêntrica (o músculo encurta), excêntrica (o músculo alonga sob tensão) ou isométrica (o músculo gera força sem mudar de tamanho).','Controlar a fase excêntrica, ou seja, a descida do peso, é parte importante da técnica.'],'Na rosca direta, subir o halter é concêntrico e descer devagar é excêntrico. Na prancha, o core trabalha de forma isométrica.'],
['Principais grupos musculares',['Peito: peitoral. Costas: grande dorsal, trapézio e romboides. Ombros: deltoides. Braços: bíceps, tríceps e antebraços. Core: reto abdominal, oblíquos, transverso e eretores da coluna. Pernas: quadríceps, posteriores de coxa, glúteos e panturrilhas.','Conhecer o nome e a função de cada grupo ajuda a escolher exercícios e a sentir o músculo certo trabalhando.'],'Se você sente mais os braços do que as costas na remada, vale reduzir a carga, puxar com os cotovelos e pensar em aproximar as escápulas.'],
['Agonistas, sinergistas e equilíbrio',['O agonista é o principal responsável pelo movimento. Os sinergistas ajudam, o antagonista faz a ação oposta e os estabilizadores mantêm o corpo firme.','O corpo funciona em cadeia, então um exercício envolve vários músculos ao mesmo tempo.','Para manter equilíbrio e postura, vale treinar movimentos de empurrar e de puxar, e os dois lados do corpo.'],'No supino, o peitoral é o agonista, o tríceps e o deltoide anterior são sinergistas, e o core estabiliza. Equilibre com remadas para as costas.']],
['Há três tipos de músculo; a musculação trabalha sobretudo o esquelético.','Existem contrações concêntrica, excêntrica e isométrica.','Os exercícios usam vários músculos: agonistas, sinergistas e estabilizadores.','Treinar empurrar e puxar ajuda a manter equilíbrio e postura.'],
[['Qual contração ocorre ao descer o peso de forma controlada?',['Concêntrica','Excêntrica','Isométrica','Nenhuma'],1,'Descer controlando o peso é a fase excêntrica, em que o músculo alonga sob tensão.'],
['No supino, qual músculo é o principal agonista?',['Bíceps','Peitoral','Panturrilha','Reto abdominal'],1,'O peitoral é o principal responsável pelo movimento.'],
['Por que equilibrar exercícios de empurrar e de puxar?',['Para treinar menos','Para manter equilíbrio e postura','Para evitar o descanso','Não faz diferença'],1,'O equilíbrio entre grupos ajuda na postura e na saúde das articulações.']]),
MC([['O que é hipertrofia',['Hipertrofia é o aumento do tamanho das fibras musculares. Ocorre quando o corpo constrói mais proteína muscular do que degrada.','Os principais estímulos são a tensão mecânica (carga e esforço), o estresse metabólico (a sensação de queimação) e, em menor papel, o dano muscular.','A hipertrofia acontece em várias faixas de repetições, desde que as séries sejam realizadas com esforço suficiente e boa técnica.'],'Fazer 10 repetições com uma carga que dá para fazer apenas mais 2 gera estímulo parecido a fazer 15 repetições com carga mais leve, se ambas forem próximas do limite.'],
['Fatores que influenciam o ganho de massa',['Volume de treino, esforço, frequência (treinar cada grupo cerca de 2 vezes por semana funciona bem para muitas pessoas), alimentação, sono e tempo.','Também contam a genética, a idade e o histórico de treino. Ganhos são graduais e variam de pessoa para pessoa.','A ingestão adequada de proteína e de energia apoia a recuperação e o crescimento, sem que seja necessário usar restrições extremas.'],'Treinar muito mas dormir pouco e comer mal costuma reduzir a recuperação. Pequenos ajustes de sono e alimentação podem melhorar seus resultados.'],
['Falha, esforço e segurança',['Uma série perto da falha, com cerca de 1 a 3 repetições em reserva, costuma ser eficiente e mais fácil de recuperar do que levar toda série à falha total.','A falha total é mais segura em exercícios guiados, como máquinas e cabos, e deve ser ocasional. Nunca sacrifique a técnica para fazer mais uma repetição.','Se não houver ajuda ou proteção, evite chegar à falha em exercícios com barra sobre o corpo, como supino e agachamento.'],'Você faz 3 séries de 10 no supino com halteres e sente que ainda teria mais 2 repetições. Isso é um bom nível de esforço para a maioria das séries.']],
['Hipertrofia é o aumento das fibras musculares.','Tensão mecânica, estresse metabólico e dano muscular contribuem.','Volume, esforço, frequência, alimentação e sono influenciam o resultado.','Séries perto da falha, com técnica boa, costumam bastar.','A falha total deve ser ocasional e feita com segurança.'],
[['O que é hipertrofia?',['Perda de gordura','Aumento do tamanho das fibras musculares','Aumento da flexibilidade','Redução da força'],1,'É o aumento do tamanho das fibras musculares.'],
['Qual prática costuma ser eficiente e sustentável?',['Falha total em todas as séries','Séries perto da falha com técnica boa','Nunca sentir esforço','Treinar sem descanso'],1,'Séries com 1 a 3 repetições em reserva equilibram estímulo e recuperação.'],
['Qual cuidado ao chegar à falha em exercícios com barra sobre o corpo?',['Fazer sem proteção','Ter suportes de segurança ou ajuda','Aumentar a carga na última repetição','Prender a respiração'],1,'Em exercícios como supino e agachamento, use suportes de segurança ou ajuda.']]),
MC([['Termos básicos',['Repetição é um movimento completo do exercício. Série é um grupo de repetições seguidas. Intervalo é o descanso entre séries. Carga é o peso usado.','O volume de treino pode ser calculado como séries × repetições × carga. Na prática, muita gente também acompanha o número de séries por semana para cada grupo muscular.'],'3 séries de 10 repetições com 20 kg equivalem a um volume de 600 kg (3 × 10 × 20). O aplicativo calcula o volume semanal a partir dos seus registros.'],
['Faixas de repetições e descanso',['Para força, séries mais pesadas, de 1 a 6 repetições, com descansos de 2 a 5 minutos. Para hipertrofia, cerca de 6 a 15 repetições, com 60 a 120 segundos, podendo chegar a 2 a 3 minutos nos exercícios mais pesados. Para resistência muscular, 15 ou mais, com 30 a 60 segundos.','As faixas se sobrepõem e nenhuma é obrigatória. Para iniciantes, 8 a 12 repetições são um bom ponto de partida para aprender a técnica.'],'Se o descanso curto faz você perder repetições, aumente o intervalo. O objetivo é manter a qualidade das séries seguintes.'],
['Quanto volume fazer',['Como referência geral, iniciantes costumam evoluir com cerca de 6 a 10 séries semanais por grupo muscular, e níveis mais avançados trabalham com mais, ajustando à recuperação.','Aumente o volume gradualmente. Fadiga que não passa, queda de desempenho, dor persistente e piora do sono podem indicar excesso.','Quando o volume estiver alto, divida entre dias diferentes em vez de concentrar tudo em uma única sessão.'],'Para 8 séries semanais de peito, você pode fazer 4 séries na segunda e 4 na quinta, em vez de 8 séries de uma vez.']],
['Série é um conjunto de repetições; volume é séries × repetições × carga.','Faixas de repetição se sobrepõem; 8 a 12 é um bom início.','Descanso maior ajuda a manter a qualidade das séries.','Aumente o volume aos poucos e observe sinais de excesso.','Dividir o volume ao longo da semana ajuda na recuperação.'],
[['Qual é o volume de 3 × 10 com 20 kg?',['60 kg','200 kg','600 kg','30 kg'],2,'3 × 10 × 20 = 600 kg.'],
['Qual faixa de repetições é um bom ponto de partida para iniciantes?',['1 a 3','8 a 12','30 a 40','Somente 1'],1,'8 a 12 repetições permitem aprender a técnica com carga moderada.'],
['Qual sinal pode indicar excesso de volume?',['Mais energia','Fadiga persistente e queda de desempenho','Melhora do sono','Aumento da motivação'],1,'Fadiga persistente e queda de desempenho são sinais de que é preciso rever o volume.']]),
MC([['O que é intensidade',['Intensidade é o quanto um exercício é exigente para você. Ela envolve a carga usada e o esforço que a série pede, e não depende apenas do número no peso.','Uma mesma carga pode ser leve em um dia e pesada em outro, dependendo de sono, estresse, alimentação e recuperação. Por isso, medir só pela carga nem sempre basta.'],'Você fez 10 repetições com 30 kg e sobraram 4 na reserva em um dia descansado. Em um dia de pouco sono, os mesmos 30 kg pesam mais. A intensidade percebida mudou.'],
['RPE e repetições em reserva (RIR)',['A percepção subjetiva de esforço (RPE) usa uma escala de 1 a 10, em que 10 é o máximo possível. As repetições em reserva (RIR) indicam quantas repetições você ainda conseguiria fazer com boa técnica.','De forma aproximada, RPE 10 equivale a 0 repetições em reserva, RPE 9 a 1, RPE 8 a 2 e RPE 7 a 3. Iniciantes costumam errar a estimativa, e a precisão melhora com a prática.','No treino guiado do aplicativo há um campo opcional de esforço, que ajuda a acompanhar essa percepção ao longo das semanas.'],'Ao terminar uma série de agachamento, você sente que daria para fazer mais 2 repetições com boa técnica. Isso é RPE 8, com 2 repetições em reserva.'],
['Usando o esforço na prática',['Para iniciantes, séries entre RPE 6 e 8 costumam ser suficientes e favorecem o aprendizado da técnica. Séries muito próximas do limite podem ficar para exercícios mais seguros ou para as últimas séries.','Ajuste a carga ao dia. Se o sono foi ruim ou o cansaço está alto, reduzir um pouco a carga ainda mantém o treino produtivo. Semanas mais leves de tempos em tempos ajudam a recuperar.','Nunca sacrifique a técnica para chegar a um esforço maior.'],'Se o plano pede 3 séries de 10 em RPE 8 e a primeira série ficou em RPE 10, reduza a carga nas séries seguintes para manter o movimento limpo.']],
['Intensidade é o quão exigente a série é para você.','RPE usa uma escala de 1 a 10; RIR conta as repetições que sobrariam.','RPE 8 equivale aproximadamente a 2 repetições em reserva.','Iniciantes costumam trabalhar entre RPE 6 e 8.','Ajuste a carga ao seu dia e preserve a técnica.'],
[['O que significa RIR?',['Repetições em reserva','Resistência intensa e rápida','Ritmo de recuperação','Registro inicial de repetições'],0,'RIR indica quantas repetições ainda restariam com boa técnica.'],
['Aproximadamente, RPE 8 equivale a quantas repetições em reserva?',['0','2','5','10'],1,'RPE 8 equivale a cerca de 2 repetições em reserva.'],
['Em um dia de pouco sono, o que pode ser razoável?',['Aumentar a carga','Reduzir um pouco a carga e manter a técnica','Ignorar o cansaço','Pular o aquecimento'],1,'Ajustar a carga ao dia mantém o treino produtivo e seguro.']]),
MC([['Princípios de uma boa técnica',['Mantenha a coluna em posição neutra, o abdômen firme e os pés ou apoios estáveis. Escolha uma carga que permita controlar o movimento do início ao fim.','Respire de forma natural e evite prender o ar por muito tempo, principalmente se você tem pressão alta ou outra condição de saúde. Em geral, expire no esforço e inspire na fase mais fácil.','Controle a descida do peso, evite impulsos e mantenha uma trajetória estável.'],'No agachamento, desça devagar mantendo o tronco firme. Se a coluna começar a arredondar ou os calcanhares saírem do chão, reduza a carga ou a amplitude.'],
['Amplitude de movimento e controle',['Use a maior amplitude que consiga controlar com segurança e sem dor. Amplitude completa em geral trabalha melhor o músculo, mas a técnica e o conforto vêm primeiro.','Uma descida em cerca de 2 a 3 segundos ajuda a manter o controle. Balançar o corpo ou usar impulso tira o foco do músculo trabalhado.','Amplitudes parciais podem ser usadas de forma planejada, mas não devem servir para esconder carga excessiva.'],'Na rosca, se você precisa balançar o tronco para subir, a carga está alta. Diminua o peso e suba usando só os cotovelos.'],
['Padrões de movimento e erros de postura',['A maioria dos exercícios cai em poucos padrões: empurrar, puxar, agachar, dobrar o quadril, carregar e estabilizar o core. Aprender cada padrão ajuda a transferir a técnica para vários exercícios.','Espelhos, vídeos gravados por você e a ajuda de um instrutor ajudam a identificar erros. Dor aguda no movimento é sinal para parar, rever a técnica ou procurar orientação.','O aplicativo apresenta passos, erros comuns e orientações de segurança em cada exercício. Use-os como guia, e não como substituto de uma avaliação presencial.'],'Se o agachamento e o terra romeno parecem diferentes, lembre que o primeiro é um padrão de agachar e o segundo de dobrar o quadril. Cada um pede uma técnica específica.']],
['Coluna neutra, abdômen firme e controle do início ao fim.','Respire de forma natural; não prenda o ar por tempo prolongado.','Use amplitude segura, com descida controlada.','Pense em padrões: empurrar, puxar, agachar, dobrar o quadril, carregar e estabilizar.','Dor aguda indica parar e rever a técnica.'],
[['Qual é uma boa regra para a respiração?',['Prender o ar o tempo todo','Respirar de forma natural, em geral expirando no esforço','Respirar apenas ao final da série','Não respirar durante o treino'],1,'Respirar de forma natural ajuda no controle; evite prender o ar por muito tempo.'],
['Se você precisa balançar o corpo para completar a repetição, o que isso indica?',['Carga adequada','Carga provavelmente alta demais','Boa técnica','Aquecimento excelente'],1,'Impulsos indicam que a carga ultrapassou o controle.'],
['Qual é um padrão básico de movimento?',['Empurrar','Descansar','Alongar sem parar','Cochilar'],0,'Empurrar, puxar, agachar, dobrar o quadril, carregar e estabilizar são padrões básicos.']]),
MC([['Por que aquecer',['O aquecimento eleva a temperatura corporal, aumenta a circulação e prepara articulações e sistema nervoso para o esforço.','Ele não elimina o risco de lesão, mas costuma melhorar a sensação do movimento e o desempenho das primeiras séries.','Reserve de 5 a 10 minutos antes de treinar.'],'Em um dia frio, você nota o corpo mais duro no início do treino. Alguns minutos de caminhada e mobilidade deixam o movimento mais solto.'],
['Aquecimento geral e específico',['O aquecimento geral usa 5 minutos de atividade leve, como caminhada ou bicicleta, junto de movimentos de mobilidade dinâmica, como círculos de ombro e agachamentos sem peso.','O aquecimento específico usa séries leves do primeiro exercício do treino, com carga crescente até chegar à carga de trabalho.','Alongamentos estáticos longos antes do treino podem reduzir levemente a força naquele momento, então prefira movimentos dinâmicos antes e deixe os estáticos para depois, se quiser.'],'Antes de um supino de 40 kg, você pode fazer 10 repetições com a barra vazia, depois 8 com 20 kg e 4 com 30 kg, e só então começar as séries de trabalho.'],
['Modelo prático de aquecimento',['Um modelo simples: 5 minutos de cardio leve, 1 a 2 exercícios de mobilidade das regiões que serão treinadas e 1 a 2 séries de aproximação no primeiro exercício.','Se houver rigidez ou dor em alguma articulação, adapte os movimentos e procure orientação profissional se persistir.','O aquecimento deve preparar, não cansar. Termine pronto para treinar, sem fadiga.'],'Dia de pernas: 5 min de bicicleta, 10 agachamentos sem peso, 10 pontes de glúteos e 2 séries leves de agachamento antes das séries de trabalho.']],
['Aquecer prepara o corpo e dura de 5 a 10 minutos.','O aquecimento geral eleva a temperatura; o específico simula o primeiro exercício.','Prefira mobilidade dinâmica antes; deixe alongamentos longos para depois.','Séries de aproximação aumentam a carga aos poucos.','O aquecimento não deve causar fadiga.'],
[['Qual é a duração sugerida do aquecimento?',['30 a 40 minutos','5 a 10 minutos','Nenhuma','Mais de uma hora'],1,'De 5 a 10 minutos costuma ser suficiente.'],
['O que são séries de aproximação?',['Séries de carga máxima','Séries leves que aumentam a carga aos poucos','Séries sem exercício','Séries de alongamento'],1,'Elas preparam o corpo para a carga de trabalho.'],
['Qual alongamento é mais indicado antes do treino?',['Estático longo','Mobilidade dinâmica','Nenhum movimento','Qualquer um, sem diferença'],1,'Movimentos dinâmicos preparam sem reduzir a força como alongamentos longos.']]),
MC([['Frequência e divisões de treino',['Corpo inteiro treina todos os grupos em cada sessão e costuma funcionar bem com 2 a 3 dias por semana. Superior e inferior alternam as partes do corpo e combinam com 4 dias. Divisões de 3 a 5 dias separam grupos por dia.','A melhor divisão é aquela que cabe na sua rotina e permite recuperação. Mais dias de treino não significam automaticamente mais resultado.','Iniciantes costumam se dar bem com corpo inteiro ou superior e inferior.'],'Se você só consegue treinar 3 vezes por semana, um plano de corpo inteiro em dias alternados é prático e eficiente.'],
['Distribuição de volume e recuperação',['Procure deixar cerca de 48 horas entre treinos intensos do mesmo grupo muscular e treinar cada grupo em torno de 2 vezes por semana, quando possível.','Dentro da sessão, comece pelos exercícios mais exigentes e pelos grupos prioritários, deixando isoladores para depois.','O cardio pode ficar em dias separados ou após o treino de força, evitando comprometer a recuperação das pernas.'],'Peito na segunda e na quinta cumpre a regra de 48 horas. Peito na segunda e na terça repete o mesmo grupo em dias seguidos e pode atrapalhar a recuperação.'],
['Exemplo de semana e imprevistos',['Com 3 dias: segunda, quarta e sexta, treinos de corpo inteiro. Com 4 dias: segunda e quinta superior, terça e sexta inferior. Descanse ou faça atividades leves nos outros dias.','Se perder um treino, faça-o no próximo dia livre sem dobrar sessões pesadas. Perder um dia não derruba o progresso.','No aplicativo, a área Treinos permite mover, duplicar e editar sessões. O plano mostra um aviso se o mesmo grupo aparecer em dias seguidos.'],'Se faltou na quarta, faça o treino na quinta e mantenha sexta como estava, desde que o descanso entre grupos continue adequado.']],
['Corpo inteiro e superior/inferior são boas opções para iniciantes.','Mais dias de treino não significam automaticamente mais resultado.','Deixe cerca de 48 horas entre treinos intensos do mesmo grupo.','Comece pelos exercícios mais exigentes e pelos grupos prioritários.','Reorganize treinos perdidos sem dobrar sessões pesadas.'],
[['Quantos dias podem ser suficientes para corpo inteiro?',['Apenas 1','De 2 a 3 dias','Sempre 7','Nenhum'],1,'De 2 a 3 dias costumam funcionar bem para corpo inteiro.'],
['Qual intervalo é sugerido entre treinos intensos do mesmo grupo?',['Cerca de 48 horas','Nenhum','Mais de 1 mês','Somente 2 horas'],0,'Cerca de 48 horas ajuda na recuperação do grupo muscular.'],
['O que fazer ao perder um treino?',['Dobrar a carga no próximo','Fazer no próximo dia livre sem dobrar sessões pesadas','Abandonar o plano','Treinar por 3 horas'],1,'Reorganize com calma, sem compensações exageradas.']]),
MC([['Progressão dupla',['Uma forma simples de progredir é trabalhar dentro de uma faixa de repetições, como 8 a 12. Quando você completa todas as séries no topo da faixa, com boa técnica e sem dor, aumenta um pouco a carga e volta à parte baixa da faixa.','O aumento deve ser pequeno, usando o menor incremento disponível, como 1 a 2 kg, ou em torno de 2 a 5 por cento. Aumentos grandes aumentam o risco de perder a técnica.','O aplicativo mostra uma sugestão quando as séries chegam ao topo da faixa, mas a decisão final é sua, conforme sua técnica e seu estado do dia.'],'Você fez 3 séries de 12 com 10 kg na rosca, com boa técnica. Na próxima vez, use 11 ou 12 kg e espere voltar para cerca de 8 a 10 repetições.'],
['Outras formas de progredir',['Nem sempre é necessário aumentar a carga. Também é progresso fazer mais repetições, mais séries, melhorar a amplitude ou o controle, ou reduzir erros de técnica.','Mudar o descanso e a cadência também altera o estímulo, mas faça uma mudança de cada vez para saber o que está funcionando.','A progressão não é linear. Alguns treinos serão melhores, outros piores, e isso é normal.'],'Se não dá para aumentar a carga em casa, tente fazer a descida em 3 segundos ou adicionar uma repetição por série antes de procurar outra variação.'],
['Platôs e semanas de alívio',['Platôs acontecem. Antes de mudar tudo, confira sono, alimentação, estresse, volume de treino e se você está registrando as cargas corretamente.','Uma semana de alívio, com carga e volume reduzidos em cerca de 10 a 20 por cento, pode ajudar quando o cansaço se acumula.','Se um platô vier com dor, perda de força repentina ou sintomas incomuns, procure avaliação profissional em vez de insistir.'],'Você está há 4 semanas sem melhorar no supino e dorme pouco. Antes de trocar o plano, regularize o sono e faça uma semana mais leve.']],
['A progressão dupla combina faixa de repetições e pequenos aumentos de carga.','Há outras formas de progredir além da carga: repetições, séries, técnica e controle.','A progressão não é linear.','Platôs pedem revisão de sono, alimentação e volume.','Dor ou perda repentina de força pedem avaliação profissional.'],
[['Quando aumentar a carga na progressão dupla?',['Quando todas as séries chegam ao topo da faixa com boa técnica','Sempre que sentir vontade','Todo treino, sem critério','Só após meses'],0,'Aumente quando completar a faixa com técnica boa e sem dor.'],
['Qual tamanho de aumento é recomendado?',['Dobrar a carga','Aumento pequeno, no menor incremento disponível','Retirar toda a carga','Nenhum, nunca'],1,'Aumentos pequenos preservam a técnica e reduzem riscos.'],
['O que fazer em um platô com dor ou perda repentina de força?',['Insistir na carga','Buscar avaliação profissional','Treinar mais pesado','Ignorar'],1,'Esses sinais pedem orientação profissional.']]),
MC([['Sono e recuperação',['O sono é uma das bases da recuperação. Como referência geral, adultos costumam precisar de 7 a 9 horas por noite, e isso varia de pessoa para pessoa.','Dormir pouco pode reduzir o desempenho, o humor, a motivação e a recuperação muscular. Manter horários regulares e um ambiente escuro e tranquilo ajuda.','Se você tem insônia persistente ou sonolência excessiva durante o dia, converse com um profissional de saúde.'],'Duas noites seguidas de sono ruim podem fazer os mesmos pesos parecerem mais difíceis. Nesse caso, uma sessão um pouco mais leve pode ser a melhor escolha.'],
['Descanso entre treinos e sinais de excesso',['Os dias sem treino permitem que os músculos e as articulações se adaptem. Atividades leves, como caminhar, podem ser feitas nesses dias.','Sinais de que você pode estar exagerando incluem fadiga que não passa, queda de desempenho, irritabilidade, sono ruim, dores articulares persistentes e falta de vontade de treinar.','Se os sinais forem intensos ou durarem, reduza o treino por alguns dias e busque orientação profissional.'],'Se você acorda cansado há duas semanas e as cargas só caem, vale reduzir o volume e revisar sono e alimentação.'],
['Estratégias de recuperação',['Alimentação adequada, hidratação, sono e gerenciamento de estresse são as ferramentas principais. Caminhadas leves e mobilidade podem ajudar a se sentir melhor.','Dor muscular tardia leve nos dias seguintes é comum, principalmente no início. Dor aguda, inchaço, formigamento ou dor que piora são diferentes e merecem atenção.','Métodos como massagem e banhos frios têm benefícios variáveis entre as pessoas e não substituem sono e comida.'],'Depois de um treino de pernas pesado, uma caminhada leve no dia seguinte costuma ser melhor do que ficar parado o dia todo, desde que não haja dor forte.']],
['O sono é base da recuperação, e adultos costumam precisar de 7 a 9 horas.','Dias de descanso fazem parte do plano.','Fadiga persistente e queda de desempenho podem indicar excesso.','Alimentação, hidratação e sono vêm antes de métodos extras.','Dor aguda, inchaço ou formigamento merecem atenção profissional.'],
[['Quantas horas de sono são uma referência geral para adultos?',['2 a 3','7 a 9','12 a 14','Nenhuma'],1,'A referência geral é de 7 a 9 horas, com variação individual.'],
['Qual é um sinal possível de excesso de treino?',['Fadiga que não passa e queda de desempenho','Mais energia','Melhor sono','Cargas aumentando sempre'],0,'Fadiga persistente e queda de desempenho são sinais de alerta.'],
['Dor muscular leve no dia seguinte ao treino é:',['Sempre sinal de lesão','Comum, principalmente no início','Impossível','Motivo para parar sempre'],1,'A dor tardia leve é comum, enquanto dor aguda merece atenção.']]),
MC([['Macronutrientes e fontes',['Proteínas, carboidratos e gorduras são os macronutrientes. Proteínas e carboidratos fornecem cerca de 4 kcal por grama e gorduras cerca de 9 kcal por grama. Esses valores são aproximados.','Proteínas ajudam na construção e reparação de tecidos, como carnes, ovos, leite, feijão e lentilha. Carboidratos fornecem energia, como arroz, batata, mandioca, frutas e aveia. Gorduras participam de funções hormonais e da saúde geral, como azeite, castanhas e peixes.','Vitaminas, minerais e fibras também são importantes e vêm principalmente de frutas, legumes e verduras.'],'Um prato equilibrado pode combinar arroz e feijão, uma fonte de proteína, legumes variados e um pouco de gordura boa, como azeite.'],
['Proteína, carboidrato e gordura na prática',['Para pessoas que treinam com o objetivo de ganhar massa, referências comuns citam algo em torno de 1,4 a 2,0 g de proteína por quilo de peso por dia. Isso é uma referência geral, e as necessidades individuais variam.','Quem tem doença renal, gravidez ou outra condição de saúde deve conversar com um médico ou nutricionista antes de mudar a ingestão de proteína.','Distribuir proteínas ao longo das refeições, manter carboidratos suficientes para o treino e incluir gorduras de boa qualidade costuma ser uma abordagem simples e sustentável.'],'Em vez de contar tudo, comece garantindo uma fonte de proteína em cada refeição principal e acompanhe como se sente nos treinos.'],
['Hidratação, refeições e suplementos',['Beba água ao longo do dia e use a sede e a cor da urina como guias gerais. Em dias quentes ou treinos longos, a necessidade aumenta.','Uma refeição leve de 1 a 3 horas antes do treino costuma ajudar, conforme sua tolerância. Depois do treino, uma refeição com proteína e carboidrato apoia a recuperação.','Suplementos não são obrigatórios e o aplicativo não prescreve nem recomenda produtos. Se tiver interesse, converse com um profissional de saúde.'],'Se você treina de manhã cedo e sente enjoo com refeições grandes, teste algo leve, como uma fruta, e ajuste conforme o resultado.']],
['Proteínas, carboidratos e gorduras têm papéis diferentes e complementares.','As calorias por grama são aproximadas.','Referências de proteína são gerais e variam de pessoa para pessoa.','Água, refeições regulares e variedade de alimentos vêm antes de suplementos.','O aplicativo não prescreve dietas; procure nutricionista para um plano individual.'],
[['Qual macronutriente fornece mais calorias por grama?',['Proteína','Carboidrato','Gordura','Água'],2,'Gorduras fornecem cerca de 9 kcal por grama.'],
['O que fazer se tiver doença renal e quiser aumentar a proteína?',['Aumentar sem avaliação','Conversar com médico ou nutricionista','Seguir uma dica da internet','Ignorar o assunto'],1,'Condições de saúde exigem orientação profissional individual.'],
['Suplementos são obrigatórios para ganhar massa?',['Sim, sempre','Não, e devem ser avaliados com profissional de saúde','Sim, para todos','Somente com receita de academia'],1,'Eles não são obrigatórios e a decisão deve ser individual.']]),
MC([['Como o corpo muda',['Para perder gordura, em geral é necessário um déficit de energia moderado e mantido por tempo suficiente, ou seja, consumir menos energia do que se gasta. Para ganhar músculo, o corpo precisa de estímulo de treino, recuperação e energia suficiente.','Iniciantes às vezes conseguem reduzir gordura e ganhar músculo ao mesmo tempo, o que se chama recomposição corporal. Com a experiência, esse processo tende a ficar mais lento.','Mudanças acontecem de forma gradual, e o ritmo varia de pessoa para pessoa.'],'Você mantém o peso estável por 8 semanas, mas a cintura diminui e as cargas sobem. Isso pode indicar recomposição.'],
['Estratégias sustentáveis',['Abordagens sustentáveis combinam déficit moderado, proteína suficiente, treino de força mantido, sono adequado e movimento diário, como caminhar.','Evite dietas extremas, jejuns longos sem orientação, desidratação proposital e cortes drásticos de grupos de alimentos. Eles aumentam o risco de perda de massa muscular e de problemas de saúde.','Quem tem histórico de transtornos alimentares ou condições de saúde deve buscar acompanhamento profissional antes de qualquer restrição.'],'Em vez de cortar tudo de uma vez, escolha uma mudança por vez: por exemplo, caminhar 20 minutos por dia e incluir proteína nas refeições.'],
['Acompanhando sem se enganar',['O peso varia de um dia para o outro por causa de água, sal, alimentação, intestino e, em muitas pessoas, ciclo hormonal. Olhe a tendência semanal, não um dia isolado.','Combine peso, medidas, cargas dos treinos e como você se sente. O aplicativo registra peso, medidas e volume para isso.','Perda de peso muito rápida nem sempre é perda de gordura, e pode incluir água e massa muscular. Se algo parecer exagerado, procure orientação profissional.'],'Se o peso subiu 1,5 kg depois de uma refeição salgada e de um treino pesado, isso provavelmente é retenção de líquido, e não ganho de gordura.']],
['Perda de gordura exige déficit de energia moderado e sustentável.','Músculo depende de treino, recuperação e energia suficiente.','Recomposição é possível, principalmente no início.','Evite dietas extremas e jejuns longos sem orientação.','Avalie a tendência de várias medidas, não um dia isolado.'],
[['Qual abordagem costuma ser mais sustentável?',['Déficit moderado, proteína suficiente e treino mantido','Jejum extremo','Cortar todos os carboidratos','Desidratar-se de propósito'],0,'Mudanças moderadas são mais fáceis de manter.'],
['O que é recomposição corporal?',['Perder só peso','Reduzir gordura e ganhar músculo ao mesmo tempo','Parar de treinar','Aumentar só gordura'],1,'É a combinação de menos gordura e mais músculo.'],
['Por que olhar a tendência semanal do peso?',['O peso varia de um dia para o outro por vários motivos','Porque a balança nunca erra','Para evitar treinar','Não há motivo'],0,'Água, sal e outros fatores causam variações diárias.']]),
MC([['Tipos de cardio e referências gerais',['Cardio inclui atividades como caminhada, corrida, bicicleta, elíptico e natação. Pode ser contínuo, em ritmo constante, ou intervalado, alternando esforços mais fortes e mais leves.','Como referência geral para adultos saudáveis, entidades de saúde citam de 150 a 300 minutos por semana de atividade aeróbica moderada. Isso é uma referência, e o ponto de partida pode ser bem menor.','Escolha atividades que você goste e que combinem com suas articulações. A consistência vale mais que a modalidade.'],'Se você nunca faz cardio, comece com 10 a 15 minutos de caminhada, 3 vezes por semana, e aumente aos poucos.'],
['Cardio junto com a musculação',['O cardio pode ser feito em dias separados ou depois do treino de força, para não reduzir a qualidade do treino de pernas e de outras sessões pesadas.','Cardio muito intenso ou longo logo antes de um treino pesado de pernas pode atrapalhar o desempenho. Em períodos de recuperação limitada, prefira atividades leves.','Aumente a duração e a intensidade de forma gradual, observando sono, energia e dores.'],'Num dia de agachamento pesado, deixe a caminhada rápida ou a bicicleta leve para depois do treino, ou transfira o cardio mais intenso para outro dia.'],
['Intensidade e segurança',['Uma forma simples de medir a intensidade é o teste da fala. Em ritmo leve você consegue conversar com facilidade. Em ritmo moderado fala frases, mas com um pouco de esforço. Em ritmo forte só consegue falar poucas palavras.','Pare e procure atendimento se sentir dor ou pressão no peito, falta de ar anormal, tontura ou desmaio. Pessoas com doenças cardíacas, pressão alta ou outras condições devem conversar com um médico antes de aumentar a intensidade.','O aplicativo registra duração, distância e esforço percebido, mas não calcula calorias, porque as estimativas variam muito.'],'Se na caminhada rápida você já não consegue falar uma frase inteira, reduza o ritmo até conseguir conversar com algum esforço.']],
['Cardio pode ser contínuo ou intervalado.','Referências gerais variam, e começar pequeno é válido.','Separe o cardio intenso de treinos pesados de pernas.','O teste da fala ajuda a medir a intensidade.','Dor no peito, tontura ou falta de ar anormal exigem parar e buscar atendimento.'],
[['Qual teste simples mede a intensidade do cardio?',['Teste da fala','Teste do espelho','Teste de peso','Teste da balança'],0,'Se consegue conversar com facilidade, o ritmo é leve.'],
['O que fazer ao sentir dor no peito durante o cardio?',['Aumentar o ritmo','Parar e buscar atendimento','Ignorar','Beber café'],1,'Esse é um sinal de alerta que exige parar e buscar ajuda.'],
['Onde encaixar o cardio mais intenso?',['Antes do treino pesado de pernas','Em dia separado ou após o treino de força','Sempre antes de dormir','Nunca'],1,'Isso preserva a qualidade do treino de força.']]),
MC([['O que acompanhar',['Escolha poucos indicadores que façam sentido para seu objetivo: cargas e repetições, volume, frequência de treinos, peso, medidas, fotos opcionais, energia e sono.','Registrar sempre da mesma forma torna os dados comparáveis. O aplicativo guarda tudo no seu aparelho, e as fotos, quando disponíveis, também devem permanecer privadas.','Mais dados não significam melhor análise. Prefira poucos números consistentes.'],'Para ganho de força, acompanhe a carga e as repetições dos principais exercícios. Para composição corporal, some medidas e fotos.'],
['Interpretando os dados',['Olhe a tendência de várias semanas, e não um dia isolado. O peso varia por água, sal, alimentação e outros fatores.','Meça sempre nas mesmas condições: mesmo horário, mesma roupa e mesmo ponto do corpo para as medidas de cintura, peito, braço, coxa e quadril.','Se os números e o seu bem-estar não estão evoluindo por várias semanas, ajuste uma variável por vez, como volume, sono ou alimentação.'],'Se o peso oscila 1 kg para cima e para baixo, mas a cintura diminui e as cargas sobem, a tendência geral é positiva.'],
['Revisão semanal e mensal',['Reserve alguns minutos por semana para ver quantos treinos fez, se progrediu em algum exercício e como foram sono e energia.','Uma vez por mês, compare medidas e fotos, revise as metas e decida o que manter e o que ajustar.','Faça backup do aplicativo com frequência, porque os dados ficam só no seu aparelho. Comemore também a consistência, e não só o resultado final.'],'Domingo à noite: 3 minutos para conferir treinos da semana, cargas que subiram e o que será prioridade na próxima.']],
['Escolha poucos indicadores consistentes.','Olhe tendências, não um dia isolado.','Meça sempre nas mesmas condições.','Revise por semana e por mês e ajuste uma variável por vez.','Faça backup e valorize a consistência.'],
[['Qual abordagem ajuda a interpretar o peso?',['Olhar um único dia','Observar a tendência de várias semanas','Pesar dez vezes ao dia','Ignorar tudo'],1,'A tendência de várias semanas é mais confiável.'],
['O que fazer se os resultados param por semanas?',['Mudar tudo ao mesmo tempo','Ajustar uma variável por vez','Parar o treino','Dobrar o volume'],1,'Mudar uma variável por vez ajuda a entender o que funciona.'],
['Por que fazer backup do aplicativo?',['Os dados ficam só no aparelho','Para ocupar espaço','Para deixar o app mais rápido','Não há motivo'],0,'O armazenamento local pode ser perdido se o navegador for limpo.']]),
MC([['Erros comuns',['Entre os erros mais comuns estão usar carga acima da sua capacidade, pular o aquecimento, treinar com técnica ruim, treinar com dor, fazer volume excessivo e não descansar.','Também são frequentes copiar planos avançados sem ter base, comparar-se com os outros, trocar de plano toda semana e ignorar sono e alimentação.','Corrigir um erro por vez costuma trazer mais resultado do que tentar mudar tudo.'],'Você viu um treino de 6 dias de um atleta avançado e quer copiá-lo, mas está começando. O mais seguro é adaptar para 2 a 3 dias e crescer aos poucos.'],
['Prevenção de lesões',['Progrida aos poucos, mantenha boa técnica e use cargas que você controla. Cuide de aquecimento, mobilidade e equilíbrio entre os grupos musculares.','Use equipamentos corretamente: trave colares, use suportes em exercícios com barra sobre o corpo, mantenha o espaço livre e calçado adequado.','Treine em ambiente seguro, hidrate-se e respeite o calor. Peça ajuda de um parceiro ou instrutor quando precisar.'],'Antes de um supino pesado, confira a barra, os colares e os suportes de segurança, e combine com um parceiro como pedir ajuda.'],
['Quando parar e procurar ajuda',['Pare o exercício se sentir dor aguda, dor ou pressão no peito, falta de ar anormal, tontura, desmaio, formigamento persistente ou inchaço.','Dor que piora, que dura mais de alguns dias ou que atrapalha atividades comuns deve ser avaliada por um profissional de saúde.','Em caso de sintomas graves, procure atendimento imediato. No Brasil, o SAMU atende pelo telefone 192. O aplicativo é educativo e não substitui avaliação médica ou de um profissional qualificado.'],'Se uma dor no ombro piora a cada treino de supino, interrompa o exercício e procure um profissional em vez de insistir.']],
['Os erros mais comuns envolvem carga, técnica, volume e descanso.','Evite copiar planos avançados sem base.','A prevenção combina progressão gradual, técnica, equipamentos corretos e ambiente seguro.','Dor aguda ou sintomas graves exigem parar e buscar atendimento.','No Brasil, o SAMU atende pelo número 192.'],
[['Qual é um erro comum no treino?',['Aquecer','Treinar com dor e técnica ruim','Descansar','Registrar o treino'],1,'Treinar com dor e técnica ruim aumenta o risco de lesão.'],
['O que fazer diante de dor ou pressão no peito?',['Continuar o treino','Parar e buscar atendimento','Aumentar a carga','Esperar passar sem avaliar'],1,'São sinais de alerta que exigem atendimento.'],
['Qual equipamento ajuda na segurança em exercícios com barra?',['Suportes de segurança e colares','Nenhum','Mais anilhas','Música alta'],0,'Suportes e colares reduzem o risco de acidentes.']]),
MC([['Passo a passo para montar um treino',['Defina seu objetivo e quantos dias por semana você realmente consegue treinar. Escolha uma divisão compatível, como corpo inteiro ou superior e inferior.','Selecione exercícios para cobrir os padrões de movimento: empurrar, puxar, agachar, dobrar o quadril e core. Defina séries, repetições e descanso, e registre tudo.','Comece com um plano simples que você consiga cumprir. Planos complexos demais costumam ser abandonados.'],'Com 3 dias disponíveis: corpo inteiro em dias alternados, com 1 exercício de cada padrão, 3 séries de 8 a 12 repetições.'],
['Selecionando e ordenando exercícios',['Comece com os exercícios que exigem mais, como agachamentos e remadas, e deixe os isoladores para depois. Coloque os grupos prioritários no início da sessão.','Escolha variações que combinem com seus equipamentos, preferências e limitações. Use a biblioteca do aplicativo para ver alternativas e a área Treinos para trocar exercícios.','Cuide do volume semanal por grupo, dividindo entre os dias, e evite treinar o mesmo grupo de forma pesada em dias seguidos.'],'Se o ombro incomoda no desenvolvimento com barra, troque por uma opção em máquina ou com halteres e observe como se sente.'],
['Revisando e ajustando',['Mantenha o mesmo plano por cerca de 4 a 8 semanas para avaliar a resposta, ajustando pequenos detalhes quando necessário.','Revise frequência, progressão, recuperação e prazer em treinar. Se tudo estiver bem, continue. Se houver problemas, mude uma variável por vez.','Considere uma avaliação presencial com um profissional qualificado, principalmente se houver lesões, condições de saúde ou dúvidas na técnica. O aplicativo é um apoio educativo.'],'Depois de 6 semanas, você fez todos os treinos e progrediu em quase todos os exercícios. Mantenha o plano e aumente o volume um pouco.']],
['Comece com um plano simples que você consiga cumprir.','Cubra os padrões de movimento e comece pelos exercícios mais exigentes.','Use a biblioteca e a área Treinos para adaptar o plano.','Mantenha o plano por 4 a 8 semanas antes de avaliar mudanças maiores.','Procure um profissional se houver lesões, dúvidas ou condições de saúde.'],
[['Qual deve ser o ponto de partida de um plano?',['Um plano simples que você consiga cumprir','O plano mais difícil possível','Sem registro','Treinar todos os dias'],0,'A consistência vem de planos viáveis.'],
['Quanto tempo manter um plano antes de avaliar?',['1 dia','Cerca de 4 a 8 semanas','10 anos','Nunca avaliar'],1,'Isso permite observar a resposta com mais segurança.'],
['Quando buscar um profissional presencial?',['Nunca','Se houver lesões, condições de saúde ou dúvidas na técnica','Somente depois de lesionar','Apenas se for avançado'],1,'Uma avaliação individual é o caminho mais seguro nesses casos.']])
];
let cm=null;
const qzHtml=()=>{const m=COURSE[cm],qa=S.curso.quiz[cm]||[],ok=qa.reduce((a,x,k)=>a+(x===m.q[k].a?1:0),0),all=qa.filter(x=>x!==undefined&&x!==null).length===m.q.length;
  return m.q.map((q,k)=>`<div class="card"><p><b>${k+1}. ${esc(q.q)}</b></p>${q.o.map((o,j)=>{const r=qa[k]!==undefined&&qa[k]!==null,sel=qa[k]===j;return `<button class="qo${r&&j===q.a?' ok':''}${r&&sel&&j!==q.a?' no':''}" data-a="ans" data-q="${k}" data-o="${j}"${r?' disabled':''}>${esc(o)}</button>`}).join('')}${qa[k]!==undefined&&qa[k]!==null?`<p class="mu">${qa[k]===q.a?'Correto. ':'Não foi dessa vez. '}${esc(q.e)}</p>`:''}</div>`).join('')+
  (all?`<div class="card"><p><b>Resultado: ${ok}/${m.q.length}</b></p><p class="mu">${ok===m.q.length?'Muito bem!':'Releia as aulas e refaça se quiser.'}</p><div class="grid"><button data-a="qreset">Refazer</button><button class="pri" data-a="cdone">${S.curso.done[cm]?'Salvar de novo':'Concluir módulo'}</button></div></div>`:'')};
function cmod(){const m=COURSE[cm];
  return `<button class="sm" data-a="cback">← Módulos</button><h1>${cm+1}. ${esc(TITULOS[cm])}</h1>`+
  m.aulas.map((a,k)=>`<details class="card"${k===0?' open':''}><summary><b>Aula ${k+1}: ${esc(a.t)}</b></summary>${a.b.map(p=>`<p>${esc(p)}</p>`).join('')}<div class="ex-p"><b>Exemplo prático:</b> ${esc(a.ex)}</div></details>`).join('')+
  `<div class="card"><h3>Resumo</h3><ul>${m.res.map(r=>`<li>${esc(r)}</li>`).join('')}</ul></div><h2>Perguntas de revisão</h2><div id="qz">${qzHtml()}</div>`}
function curso(){
  if(cm!==null&&COURSE[cm])return cmod();
  const C=S.curso,n=Object.keys(C.done).filter(k=>C.done[k]).length;
  return `<h1>Curso de musculação</h1><div class="bar"><i style="width:${n/16*100}%"></i></div><p class="mu">${n}/16 módulos concluídos · ${COURSE.length} disponíveis${COURSE.length<16?'; os demais serão liberados nas próximas atualizações':''}.</p>`+
  (C.last!=null&&COURSE[C.last]?`<button class="pri" style="width:100%" data-a="cop" data-i="${C.last}">Continuar: módulo ${C.last+1}</button>`:'')+
  TITULOS.map((t,i)=>COURSE[i]?`<div class="card row" data-a="cop" data-i="${i}" style="cursor:pointer;margin:6px 0"><span>${C.done[i]?'✓ ':''}${i+1}. ${esc(t)}</span><span>›</span></div>`:`<div class="card row" style="margin:6px 0;opacity:.55"><span>${i+1}. ${esc(t)}</span><span class="mu">Em breve</span></div>`).join('')+
  `<details class="card"><summary>Resumos rápidos (versão anterior)</summary>${MODS.map((m,i)=>`<details style="margin:8px 0"><summary>${S.mods[i]?'✓ ':''}${esc(m.t)}</summary><p>${esc(m.b)}</p><p class="mu"><b>Pergunta:</b> ${esc(m.q)}</p><details><summary class="mu">Ver resposta</summary><p>${esc(m.a)}</p></details><button class="sm" data-a="mod" data-i="${i}">${S.mods[i]?'Desmarcar':'Marcar como concluído'}</button></details>`).join('')}</details>`}
document.addEventListener('click',ev=>{const b=ev.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,C=S.curso;
  if(a==='cop'){cm=+b.dataset.i;C.last=cm;save();render()}
  else if(a==='cback'){cm=null;render()}
  else if(a==='ans'&&cm!==null){const q=C.quiz[cm]=C.quiz[cm]||[];q[+b.dataset.q]=+b.dataset.o;save();$('#qz').innerHTML=qzHtml()}
  else if(a==='qreset'&&cm!==null){delete C.quiz[cm];save();$('#qz').innerHTML=qzHtml()}
  else if(a==='cdone'&&cm!==null){C.done[cm]=true;save();toast('Módulo concluído');cm=null;render()}
});

// ---------- Evolução avançada: períodos, carga por exercício e fotos privadas (IndexedDB) ----------
let PV={v:'s',p:90,x:''},FSEL=[],FURL=[];
const perStart=()=>{if(!PV.p)return'';const d=new Date();d.setDate(d.getDate()-PV.p);return iso(d)};
function serie(){const m=PV.v==='m',n=m?6:8,L=[],V=[],Q=[];
  for(let k=n-1;k>=0;k--){let ls,lb;
    if(m){const d=new Date();d.setDate(1);d.setMonth(d.getMonth()-k);const key=iso(d).slice(0,7);ls=S.logs.filter(l=>l.date.slice(0,7)===key);lb=key.slice(2)}
    else{const w=wkd(k);ls=S.logs.filter(l=>w.includes(l.date));lb=w[0].slice(5)}
    V.push(ls.reduce((a,l)=>a+vol(l),0));Q.push(ls.length);L.push(lb)}
  return{V,Q,L}}
const ctrl=()=>`<h1>Evolução</h1><div class="grid"><div><label for="pv">Gráficos</label><select id="pv">${opts([['s','Semanal (8 semanas)'],['m','Mensal (6 meses)']],PV.v)}</select></div><div><label for="pp">Período do peso</label><select id="pp">${opts([[30,'30 dias'],[90,'90 dias'],[365,'1 ano'],[0,'Tudo']],PV.p)}</select></div></div>`;
function volCards(){const s=serie(),m=PV.v==='m';
  return `<div class="card"><h3>Volume ${m?'mensal':'semanal'}</h3>${s.V.some(x=>x>0)?bars(s.V,s.L)+'<p class="mu">Soma de carga × repetições dos treinos registrados.</p>':'<p class="mu">Conclua treinos com carga registrada para ver o volume.</p>'}</div>
<div class="card"><h3>Frequência (treinos por ${m?'mês':'semana'})</h3>${S.logs.length?bars(s.Q,s.L):'<p class="mu">Conclua um treino para ver a frequência.</p>'}</div>`}
function exCard(){const ids=[...new Set(S.logs.flatMap(l=>l.sets.map(s=>s.ex)))].filter(id=>byId(id));
  if(!ids.length)return `<div class="card"><h3>Carga por exercício</h3><p class="mu">Conclua treinos com carga registrada. São necessários ao menos 2 treinos do mesmo exercício para ver o gráfico.</p></div>`;
  const id=ids.includes(PV.x)?PV.x:ids[0],h=history(id).map(x=>({d:x.date,kg:Math.max(...x.sets.map(s=>s.load))}));
  return `<div class="card"><h3>Carga por exercício</h3><label for="fx">Exercício</label><select id="fx">${opts(ids.map(i=>[i,byId(i).n]),id)}</select>${h.length>1?chart(h)+'<p class="mu">Maior carga de cada treino.</p>':'<p class="mu">Registre ao menos 2 treinos com este exercício para ver o gráfico.</p>'}${h.slice(-5).reverse().map(x=>`<p class="mu">${x.d}: ${x.kg} kg</p>`).join('')}</div>`}
function fotosCard(){return `<form id="f-ft" class="card"><h3>Fotos de evolução (opcional)</h3><p class="mu">As fotos ficam só neste aparelho. Não são enviadas a nenhum serviço, não entram no backup em JSON e são apagadas se você limpar os dados do navegador.</p>
<label for="ft">Foto</label><input id="ft" name="foto" type="file" accept="image/*"><div class="grid"><div><label for="fd">Data</label><input id="fd" name="d" type="date" value="${today()}" required></div><div><label for="fn">Nota</label><input id="fn" name="nota" maxlength="60"></div></div>
<button class="pri" style="width:100%;margin-top:10px">Salvar foto</button></form><div class="card" id="fotos"><p class="mu">Carregando fotos…</p></div>`}
// IndexedDB
const idb=()=>new Promise((res,rej)=>{if(typeof indexedDB==='undefined')return rej(new Error('sem IndexedDB'));const r=indexedDB.open('mpp_fotos',1);r.onupgradeneeded=()=>r.result.createObjectStore('f',{keyPath:'id'});r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
const tx=(m,fn)=>idb().then(db=>new Promise((res,rej)=>{const t=db.transaction('f',m),rq=fn(t.objectStore('f'));t.oncomplete=()=>{db.close();res(rq&&rq.result)};t.onerror=()=>rej(t.error)}));
const fotoAll=()=>tx('readonly',s=>s.getAll()),fotoPut=o=>tx('readwrite',s=>s.put(o)),fotoDel=id=>tx('readwrite',s=>s.delete(id)),fotoClear=()=>tx('readwrite',s=>s.clear()).catch(()=>{});
function resize(file){return new Promise((res,rej)=>{const img=new Image(),u=URL.createObjectURL(file);
  img.onload=()=>{const k=Math.min(1,1000/Math.max(img.width,img.height)),c=document.createElement('canvas');c.width=Math.round(img.width*k);c.height=Math.round(img.height*k);c.getContext('2d').drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(u);c.toBlob(b=>b?res(b):rej(new Error('falha')),'image/jpeg',.8)};
  img.onerror=()=>{URL.revokeObjectURL(u);rej(new Error('imagem inválida'))};img.src=u})}
async function paintFotos(){const el=$('#fotos');if(!el)return;
  FURL.forEach(u=>URL.revokeObjectURL(u));FURL=[];let l;
  try{l=(await fotoAll()).sort((a,b)=>a.d.localeCompare(b.d))}catch(e){el.innerHTML='<p class="mu">Fotos indisponíveis neste navegador.</p>';return}
  if(!l.length){el.innerHTML='<p class="mu">Nenhuma foto salva. Fotos com a mesma luz e pose facilitam a comparação.</p>';return}
  FSEL=FSEL.filter(id=>l.some(x=>x.id===id));const u={};l.forEach(x=>{u[x.id]=URL.createObjectURL(x.blob);FURL.push(u[x.id])});
  el.innerHTML='<h3>Galeria</h3><p class="mu">Toque em até 2 fotos para comparar.</p><div class="gal">'+l.map(x=>`<button type="button" class="th${FSEL.includes(x.id)?' on':''}" data-a="fsel" data-id="${esc(x.id)}"><img src="${u[x.id]}" alt="Foto de ${esc(x.d)}"><span>${esc(x.d)}</span></button>`).join('')+'</div>'+
  (FSEL.length===2?'<div class="grid" style="margin-top:10px">'+FSEL.map(id=>{const x=l.find(y=>y.id===id);return `<figure style="margin:0"><img src="${u[id]}" alt="Foto de ${esc(x.d)}" style="width:100%;border-radius:12px"><figcaption class="mu">${esc(x.d)}${x.nota?' · '+esc(x.nota):''}</figcaption></figure>`}).join('')+'</div>':'')+
  (FSEL.length===1?'<button type="button" class="sm dng" style="margin-top:10px" data-a="fdel">Excluir foto selecionada</button>':'')}
function afterRender(){if(view==='prog'&&$('#fotos'))paintFotos()}
document.addEventListener('click',ev=>{const b=ev.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
  if(a==='fsel'){const id=b.dataset.id;FSEL=FSEL.includes(id)?FSEL.filter(x=>x!==id):[...FSEL,id].slice(-2);paintFotos()}
  else if(a==='fdel'){if(FSEL.length===1&&confirm('Excluir esta foto?'))fotoDel(FSEL[0]).then(()=>{FSEL=[];paintFotos()}).catch(()=>toast('Erro ao excluir a foto'))}
  else if(a==='edw'){const x=S.weights.find(w=>w.id===b.dataset.id);if(!x)return;const v=parseFloat(String(prompt('Novo peso (kg):',x.kg)).replace(',','.'));if(v>=30&&v<=300){x.kg=v;save();render()}else if(!isNaN(v))toast('Valor inválido')}
});
document.addEventListener('change',ev=>{const t=ev.target;if(t.id==='pv'){PV.v=t.value;render()}else if(t.id==='pp'){PV.p=+t.value;render()}else if(t.id==='fx'){PV.x=t.value;render()}});
document.addEventListener('submit',ev=>{const f=ev.target;if(f.id!=='f-ft')return;const file=f.foto.files[0],d=f.d.value;
  if(!file||!file.type.startsWith('image/')){toast('Escolha uma imagem');return}
  if(file.size>20e6){toast('Imagem muito grande (máximo 20 MB)');return}
  resize(file).then(b=>fotoPut({id:uid(),d,nota:f.nota.value.slice(0,60),blob:b})).then(()=>{f.reset();toast('Foto salva');paintFotos()}).catch(()=>toast('Não foi possível salvar a foto neste navegador'))});

// ---------- Nutrição e sono: água, refeições (sem calorias), sono e lista de alimentos ----------
let HT='agua';
const REF=['Café da manhã','Almoço','Lanche','Jantar','Ceia','Pré-treino','Pós-treino'];
const TAGS=[['p','Proteína'],['c','Carboidrato'],['g','Gordura boa'],['v','Vegetais ou frutas']];
const ALIM={'Proteínas':['Ovos','Frango','Carne bovina magra','Peixes e sardinha','Leite, iogurte e queijos','Feijão, lentilha e grão-de-bico','Tofu'],
 'Carboidratos':['Arroz','Batata e batata-doce','Mandioca e inhame','Aveia','Pão integral','Macarrão','Frutas'],
 'Gorduras':['Azeite','Castanhas e amendoim','Abacate','Sementes (chia, linhaça)','Peixes gordurosos'],
 'Fibras, vitaminas e minerais':['Folhas verdes','Legumes coloridos','Frutas variadas','Feijões','Grãos integrais']};
function habitos(){
  const tabs=[['agua','Água'],['ref','Refeições'],['sono','Sono'],['alim','Alimentos']];
  return `<h1>Nutrição e hábitos</h1><div class="seg">${tabs.map(([k,n])=>`<button class="${HT===k?'on':''}" data-a="ht" data-v="${k}">${n}</button>`).join('')}</div>`+({agua:tAgua,ref:tRef,sono:tSono,alim:tAlim})[HT]()}
function tAgua(){const t=today(),ml=S.water[t]||0,d=lastDays(7);
  return `<div class="card"><h3>Água de hoje</h3><p class="big">${ml} <span class="mu">ml</span></p><div class="grid3" style="grid-template-columns:repeat(4,1fr)">${[200,300,500,-200].map(v=>`<button data-a="water" data-v="${v}">${v>0?'+':'−'}${Math.abs(v)}</button>`).join('')}</div><p class="mu">A necessidade de água varia com a pessoa, o clima e a atividade.</p>${bars(d.map(x=>S.water[x]||0),d.map(x=>x.slice(8)))}</div>`}
function tRef(){const t=today(),l=S.refeicoes.filter(r=>r.d===t).sort((a,b)=>(a.h||'').localeCompare(b.h||'')),d=lastDays(7),tg=r=>(r.t||[]).map(k=>(TAGS.find(x=>x[0]===k)||[0,''])[1]).filter(Boolean).join(', ');
  return `<form id="f-rf" class="card"><h3>Registrar refeição</h3><p class="mu">Serve para observar hábitos, não para restringir. Não há contagem de calorias.</p>
<label for="rtp">Refeição</label><select id="rtp" name="tipo">${opts(REF)}</select><label for="rh">Horário (opcional)</label><input id="rh" name="h" type="time"><label for="rds">O que você comeu</label><input id="rds" name="desc" maxlength="100" required>
${TAGS.map(([k,n])=>`<label style="display:flex;gap:8px;align-items:center;margin:6px 0"><input type="checkbox" name="${k}"> ${n}</label>`).join('')}<button class="pri" style="width:100%;margin-top:10px">Registrar</button></form>
<div class="card"><h3>Hoje</h3>${l.length?l.map(r=>`<div class="row" style="margin:6px 0"><span>${esc(r.tipo)}${r.h?' · '+esc(r.h):''}<br><span class="mu">${esc(r.desc)}${tg(r)?' · '+esc(tg(r)):''}</span></span><button class="sm dng" data-a="delr" data-id="${r.id}">Excluir</button></div>`).join(''):'<p class="mu">Nenhuma refeição registrada hoje.</p>'}</div>
<div class="card"><h3>Últimos 7 dias</h3>${S.refeicoes.length?bars(d.map(x=>S.refeicoes.filter(r=>r.d===x).length),d.map(x=>x.slice(8)))+'<p class="mu">Refeições registradas por dia. Regularidade e variedade importam mais que números exatos.</p>':'<p class="mu">Registre refeições para ver o resumo da semana.</p>'}</div>
<div class="card warn">Se pensar em comida e peso estiver causando sofrimento ou comportamentos extremos, procure um profissional de saúde.</div>`}
function tSono(){const d=lastDays(7),m=Object.fromEntries(S.sono.map(x=>[x.d,x])),h=d.map(x=>m[x]?m[x].h:0),n=h.filter(x=>x>0),avg=n.length?(n.reduce((a,b)=>a+b,0)/n.length).toFixed(1):null;
  return `<form id="f-sn" class="card"><h3>Registrar sono</h3><label for="sd">Data (noite que terminou)</label><input id="sd" name="d" type="date" value="${today()}" required>
<div class="grid"><div><label for="sh">Horas dormidas</label><input id="sh" name="h" type="number" step="0.25" min="0.5" max="24" inputmode="decimal" required></div><div><label for="sq">Qualidade (opcional)</label><select id="sq" name="q"><option value="">—</option>${opts([[1,'1 · ruim'],[2,'2'],[3,'3'],[4,'4'],[5,'5 · ótima']])}</select></div></div>
<label for="sn">Nota</label><input id="sn" name="nota" maxlength="80"><button class="pri" style="width:100%;margin-top:10px">Salvar</button></form>
<div class="card"><h3>Últimas 7 noites</h3>${n.length?bars(h,d.map(x=>x.slice(8)))+`<p class="mu">Média das noites registradas: ${avg} h. Referência geral para adultos: 7 a 9 h, com variação individual.</p>`:'<p class="mu">Registre uma noite para ver o gráfico.</p>'}
${S.sono.slice().sort((a,b)=>b.d.localeCompare(a.d)).slice(0,7).map(x=>`<div class="row"><span class="mu">${x.d} · ${x.h} h${x.q?' · qualidade '+x.q:''}${x.nota?' · '+esc(x.nota):''}</span><button class="sm dng" data-a="dels" data-id="${x.id}">Excluir</button></div>`).join('')}
<p class="mu">Se dormir pouco com frequência ou sentir sonolência excessiva durante o dia, converse com um profissional de saúde.</p></div>`}
function tAlim(){return `<p class="mu">Exemplos gerais de alimentos por nutriente. Variedade ajuda; ajuste a alergias, intolerâncias e preferências. Não é uma dieta individual: para um plano personalizado, procure um nutricionista.</p>`+Object.entries(ALIM).map(([k,l])=>`<details class="card"><summary><b>${esc(k)}</b></summary><ul>${l.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details>`).join('')}
document.addEventListener('click',ev=>{const b=ev.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,id=b.dataset.id;
  if(a==='ht'){HT=b.dataset.v;render()}
  else if(a==='delr'){if(confirm('Excluir esta refeição?')){S.refeicoes=S.refeicoes.filter(x=>x.id!==id);save();render()}}
  else if(a==='dels'){if(confirm('Excluir este registro de sono?')){S.sono=S.sono.filter(x=>x.id!==id);save();render()}}
});
document.addEventListener('submit',ev=>{const f=ev.target,d=new FormData(f);
  if(f.id==='f-rf'){const desc=String(d.get('desc')||'').trim();if(!desc){toast('Descreva a refeição');return}
    S.refeicoes.push({id:uid(),d:today(),h:d.get('h')||'',tipo:d.get('tipo'),desc:desc.slice(0,100),t:TAGS.filter(([k])=>d.get(k)).map(([k])=>k)});save();render();toast('Refeição registrada')}
  else if(f.id==='f-sn'){const h=parseFloat(d.get('h')),day=d.get('d');if(!(h>=0.5&&h<=24)||!day){toast('Confira as horas e a data');return}
    S.sono=S.sono.filter(x=>x.d!==day);S.sono.push({id:uid(),d:day,h,q:+d.get('q')||null,nota:String(d.get('nota')||'').slice(0,80)});save();render();toast('Sono registrado')}
});

// Eventos v2
document.addEventListener('click',ev=>{const b=ev.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,P=S.plan,d=b.dataset.d,k=+b.dataset.k,id=b.dataset.id;
  if(a==='up'||a==='dn'){const l=P[d].items,j=a==='up'?k-1:k+1;if(j<0||j>=l.length)return;[l[k],l[j]]=[l[j],l[k]];save();render()}
  else if(a==='rm'){P[d].items.splice(k,1);save();render()}
  else if(a==='mk'){OPEN.add(d);P[d]={name:'Treino',items:[]};save();render()}
  else if(a==='clr'){if(confirm('Transformar em dia de descanso? A sessão será removida do plano.')){delete P[d];save();render()}}
  else if(a==='sub'){sub=b.dataset.v||null;render()}
  else if(a==='goto'){view=b.dataset.v;sub=b.dataset.s||null;open=null;render()}
  else if(a==='water'){const t=today();S.water[t]=Math.max(0,(S.water[t]||0)+(+b.dataset.v));save();render()}
  else if(a==='reset'){if(confirm('Restaurar configurações padrão? O histórico será mantido.')){S.cfg=blank().cfg;save();render()}}
  else if(a==='delc'){if(confirm('Excluir esta atividade?')){S.cardio=S.cardio.filter(x=>x.id!==id);save();render()}}
  else if(a==='delm'){if(confirm('Excluir estas medidas?')){S.meas=S.meas.filter(x=>x.id!==id);save();render()}}
  else if(a==='dell'){if(confirm('Excluir este treino do histórico?')){S.logs=S.logs.filter(x=>x.id!==id);save();render()}}
  else if(a==='clrh'){if(confirm('Apagar todo o histórico de treinos? Perfil, plano e medidas serão mantidos.')){S.logs=[];save();render()}}
});
document.addEventListener('change',ev=>{const t=ev.target,a=t.dataset.a,P=S.plan,d=t.dataset.d,k=t.dataset.k;
  if(t.form&&t.form.id==='f-cfg'){const f=new FormData(t.form);S.cfg=Object.assign(S.cfg,{nome:String(f.get('nome')||'').trim().slice(0,20),tema:f.get('tema'),cor:f.get('cor'),rest:+f.get('rest'),hora:f.get('hora')||''});applyCfg();save();return}
  if(!a)return;
  if(a==='pf'){const it=P[d].items[k],f=t.dataset.f;it[f]=f==='r'?(t.value.trim().slice(0,12)||it.r):Math.max(f==='s'?1:10,Math.min(f==='s'?10:600,parseInt(t.value,10)||it[f]));save();render()}
  else if(a==='dname'){P[d].name=t.value.trim().slice(0,30)||P[d].name;save();render()}
  else if(a==='addex'&&t.value){OPEN.add(d);P[d].items.push({id:t.value,s:3,r:'8-12',rest:S.cfg.rest||90});save();render()}
  else if(a==='mvd'&&t.value){const j=+t.value,tmp=P[j];P[j]=P[d];if(tmp)P[d]=tmp;else delete P[d];save();render();toast('Sessão movida')}
  else if(a==='dupd'&&t.value){P[+t.value]=JSON.parse(JSON.stringify(P[d]));save();render();toast('Sessão duplicada')}
});
document.addEventListener('input',ev=>{const m={q:'q',fg:'g',fe:'e',fl:'l'}[ev.target.id];if(m&&$('#exl')){F[m]=ev.target.value;$('#exl').innerHTML=exList()}});
document.addEventListener('toggle',ev=>{const t=ev.target;if(t.dataset&&t.dataset.day!==undefined){t.open?OPEN.add(t.dataset.day):OPEN.delete(t.dataset.day)}},true);
document.addEventListener('submit',ev=>{const f=ev.target,d=new FormData(f),n=k=>{const v=parseFloat(d.get(k));return isNaN(v)?null:v};
  if(f.id==='f-pf'){const idade=+d.get('idade'),alt=+d.get('alt');if(!(idade>=14&&idade<=90&&alt>=100&&alt<=250)){toast('Confira idade e altura');return}
    Object.assign(S.profile,{idade,alt,obj:d.get('obj'),nivel:d.get('nivel'),dias:+d.get('dias'),local:d.get('local'),lim:d.get('lim')});if(d.get('regen'))S.plan=buildPlan(S.profile);save();render();toast('Perfil salvo')}
  else if(f.id==='f-me'){const m={id:uid(),d:d.get('d')};let any=false;MK.forEach(k=>{const v=n(k);if(v>0&&v<300){m[k]=v;any=true}});if(!any){toast('Informe ao menos uma medida em cm');return}S.meas.push(m);save();render();toast('Medidas registradas')}
  else if(f.id==='f-ca'){const min=n('min');if(!(min>0&&min<1000)){toast('Informe a duração em minutos');return}S.cardio.push({id:uid(),d:today(),tipo:d.get('tipo'),min,km:n('km'),esf:n('esf'),nota:String(d.get('nota')||'').slice(0,120)});save();render();toast('Atividade registrada')}
});

// ---------- Treino guiado ----------
// Carga mais recente deste exercício (sessão atual primeiro, depois histórico)
const lastLoad=id=>{const f=a=>{for(let i=a.length-1;i>=0;i--)if(a[i].ex===id)return a[i]};const x=f(S.session.sets)||S.logs.slice().reverse().map(l=>f(l.sets)).find(Boolean);return x?x.load:''};
function work(){
  const s=S.session; if(!s){view='home';return home()}
  const total=s.queue.reduce((a,i)=>a+i.s,0), done=s.sets.length;
  s.notes=s.notes||{};
  if(s.ei>=s.queue.length){const ids=[...new Set(s.sets.map(x=>x.ex))];
    return `<h1>Treino concluído</h1><div class="tiles"><div class="card"><b>${mmss(elapsed())}</b><span>duração</span></div><div class="card"><b>${done}</b><span>séries</span></div><div class="card"><b>${s.sets.reduce((a,x)=>a+x.load*x.reps,0)}</b><span>volume (kg)</span></div></div>
<div class="card">${ids.length?ids.map(id=>`<p><b>${esc(byId(id).n)}</b><br><span class="mu">${s.sets.filter(x=>x.ex===id).map(x=>x.load+' kg × '+x.reps).join(' · ')}</span>${s.notes[id]?'<br><span class="mu">Obs.: '+esc(s.notes[id])+'</span>':''}</p>`).join(''):'<p class="mu">Nenhuma série foi concluída; o treino não será salvo.</p>'}
<label>Observações gerais</label><textarea id="note" rows="2" maxlength="300"></textarea><button class="pri" style="width:100%;margin-top:10px" data-a="finish">Salvar e finalizar</button></div>`}
  const it=s.queue[s.ei], e=byId(it.id), rest=s.restEnd&&s.restEnd>Date.now(), h=history(e.id);
  const dr=s.draft&&s.draft.k===s.ei+'-'+s.si?s.draft:{}, ld=dr.ld!==undefined?dr.ld:lastLoad(it.id), top=parseInt(String(it.r).split('-').pop())||'';
  return `<div class="row"><span class="mu">Exercício ${s.ei+1}/${s.queue.length}</span><span id="tm" class="big" style="font-size:1.4rem">${mmss(elapsed())}</span></div>
<div class="bar"><i style="width:${done/total*100}%"></i></div>
${rest?`<div class="card rest"><div class="row"><span>Descanso <b id="rt" class="big" style="font-size:1.6rem">${mmss(s.restEnd-Date.now())}</b></span><span><button class="sm" data-a="rest" data-v="-15">−15s</button> <button class="sm" data-a="rest" data-v="15">+15s</button> <button class="sm" data-a="rest" data-v="0">Pular</button></span></div></div>`:''}
<h1>${esc(e.n)}</h1><p class="mu">Série ${s.si+1}/${it.s} · meta ${esc(it.r)} repetições${s.queue[s.ei+1]?' · próximo: '+esc(byId(s.queue[s.ei+1].id).n):''}</p>
<div class="grid3"><div><label for="ld">Carga (kg)</label><input id="ld" type="number" step="0.5" min="0" max="1000" inputmode="decimal" value="${esc(ld)}"></div><div><label for="rp">Repetições</label><input id="rp" type="number" min="0" max="999" inputmode="numeric" placeholder="${top}" value="${esc(dr.rp??'')}"></div><div><label for="rpe">Esforço</label><select id="rpe"><option value="">—</option>${opts([1,2,3,4,5,6,7,8,9,10],dr.rpe)}</select></div></div>
<p class="mu">${ld!==''?'Carga preenchida com o último registro; ajuste se precisar.':'Sem registro anterior: comece leve e priorize a técnica.'} Esforço: 1 muito leve, 10 máximo.</p>
<button class="pri" style="width:100%;margin:12px 0" data-a="setdone">Concluir série</button>
<div class="grid"><button data-a="pause">${s.pAt?'Retomar':'Pausar'}</button><button data-a="skip">Pular exercício</button></div>
<select data-a="subst" style="margin-top:10px" aria-label="Substituir exercício"><option>Substituir exercício…</option>${EX.filter(x=>x.g===e.g&&x.id!==e.id).map(x=>`<option value="${x.id}">${esc(x.n)}</option>`).join('')}</select>
<label for="xn">Observações deste exercício</label><textarea id="xn" rows="2" maxlength="300" data-id="${e.id}" placeholder="Ex.: dor, ajuste de banco, sensação">${esc(s.notes[e.id]||'')}</textarea>
<details class="card"><summary>Seus últimos treinos neste exercício</summary>${h.length?h.slice(-3).reverse().map(x=>`<p class="mu">${x.date}: ${x.sets.map(t=>t.load+' kg × '+t.reps).join(', ')}</p>`).join('')+suggest(h):'<p class="mu">Ainda sem registros. Eles aparecem aqui depois do primeiro treino.</p>'}</details>
<div class="card"><ol>${e.st.map(x=>`<li>${esc(x)}</li>`).join('')}</ol><p class="mu">${esc(e.br)} ${esc(e.sg)}</p></div>
<button class="dng" style="width:100%" data-a="abort">Finalizar agora</button>`}

function startWork(){
  const d=S.plan[wd()]; if(!d||!d.items.length){toast(d?'Adicione exercícios à sessão de hoje':'Hoje é dia de descanso');return}
  S.session={id:uid(),t0:Date.now(),paused:0,pAt:null,queue:d.items.map(i=>({...i})),ei:0,si:0,sets:[],restEnd:null,notes:{},draft:null};
  save();view='work';render();
}
function setDone(){
  const s=S.session,it=s.queue[s.ei],ld=parseFloat($('#ld').value),rp=parseInt($('#rp').value,10),rpe=parseInt(($('#rpe')||{}).value,10);
  if(isNaN(ld)||isNaN(rp)||ld<0||rp<0){toast('Informe carga e repetições (carga 0 se for peso do corpo)');return}
  if(ld>1000||rp>999){toast('Confira os valores informados');return}
  s.sets.push({ex:it.id,set:s.si+1,load:ld,reps:rp,rpe:rpe>=1&&rpe<=10?rpe:null});s.draft=null;
  if(s.si+1<it.s){s.si++;s.restEnd=Date.now()+it.rest*1000}else{s.ei++;s.si=0;s.restEnd=s.ei<s.queue.length?Date.now()+it.rest*1000:null}
  save();render();
}
function finish(abort){
  const s=S.session;if(!s)return;
  if(s.sets.length&&!S.logs.some(l=>l.id===s.id))S.logs.push({id:s.id,date:today(),dur:elapsed(),sets:s.sets,note:($('#note')||{}).value||'',notes:s.notes||{}});
  S.session=null;save();view='home';render();toast(s.sets.length?'Treino salvo':'Treino descartado (nenhuma série concluída)');
}
// Rascunho de carga/reps/esforço e observações por exercício (salvos a cada digitação)
document.addEventListener('input',ev=>{const s=S.session,t=ev.target;if(!s)return;
  if(t.id==='xn'){s.notes=s.notes||{};s.notes[t.dataset.id]=t.value.slice(0,300);save()}
  else if(t.id==='ld'||t.id==='rp'||t.id==='rpe'){const k=s.ei+'-'+s.si;s.draft=Object.assign(s.draft&&s.draft.k===k?s.draft:{k},{[t.id]:t.value});save()}});
document.addEventListener('change',ev=>{const t=ev.target,s=S.session;if(s&&t.id==='rpe'){const k=s.ei+'-'+s.si;s.draft=Object.assign(s.draft&&s.draft.k===k?s.draft:{k},{rpe:t.value});save()}});

// ---------- Eventos ----------
document.addEventListener('click',ev=>{
  const n=ev.target.closest('#nav button');if(n){open=null;sub=null;cm=null;view=n.dataset.go;render();return}
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
  else if(a==='wipe'){if(prompt('Para apagar TODOS os dados deste aparelho, digite APAGAR:')==='APAGAR'){localStorage.removeItem(KEY);fotoClear();S=blank();view='home';render()}}
  else if(a==='inst'&&window.dp){window.dp.prompt();window.dp=null}
});
document.addEventListener('change',ev=>{
  const t=ev.target;
  if(t.dataset.a==='swap'){const it=S.plan[t.dataset.d].items[t.dataset.k];it.id=t.value;save();render()}
  else if(t.dataset.a==='subst'&&t.value&&S.session){S.session.queue[S.session.ei].id=t.value;save();render()}
  else if(t.id==='file'&&t.files[0]){const r=new FileReader();r.onload=()=>{try{const o=JSON.parse(r.result);if(!valid(o))throw 0;
    if(confirm('Importar substitui os dados atuais. Continuar?')){S=norm(o);save();render();toast('Backup importado')}}catch(e){toast('Arquivo de backup inválido')}};r.readAsText(t.files[0])}
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
