const stateKey = 'estude_melhor_state_v2'
let state = { spaces: [] }
const windowState = {}
function uid() { return Math.random().toString(36).slice(2) }
function save() { localStorage.setItem(stateKey, JSON.stringify(state)) }
function load() { const s = localStorage.getItem(stateKey); if (s) state = JSON.parse(s) }
function el(id) { return document.getElementById(id) }
function fmtDate(ts) { const d = new Date(ts); return d.toLocaleDateString() }
function now() { return Date.now() }
function nextDays(days) { return now() + days*24*60*60*1000 }
function getSpace(id) { return state.spaces.find(s => s.id === id) }
function ensureWindowState(id){ if(!windowState[id]) windowState[id] = { studyQueue: [], currentCard: null, timer: null, remaining: 25*60, isBreak: false, focusLen: 25, breakLen:5 } }

function mount() { load(); renderSpacesList() }

function renderSpacesList(){
  const list = el('space-list'); if(!list) return; list.innerHTML = ''
  state.spaces.forEach(s => {
    const div = document.createElement('div'); div.className='card'
    const decksCount = (s.decks||[]).length; const notesCount = (s.notes||[]).length
    div.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><div><strong>${s.name}</strong><div style="color:#6b7280">${decksCount} baralhos • ${notesCount} anotações</div></div><div><button class="btn small" data-open="${s.id}">Abrir janela</button></div></div>`
    list.appendChild(div)
  })
  list.querySelectorAll('button[data-open]').forEach(b => b.onclick = () => openSpaceWindow(b.getAttribute('data-open')))
}

function createSpace(){
  const name = el('space-name').value.trim(); if(!name) return
  const space = { id: uid(), name, decks: [], notes: [], sessions: 0 }
  state.spaces.push(space); save(); el('space-name').value=''; renderSpacesList()
}

function windowHTML(space){
  const id = space.id
  return `<div class="window" id="window-${id}" data-space-id="${id}">
    <div class="window-header">
      <div class="window-title">${space.name}</div>
      <div class="window-actions">
        <button class="win-btn" data-close="${id}">Fechar</button>
      </div>
    </div>
    <div class="window-tabs">
      <button class="tab active" data-tab="fc-${id}">Flashcards</button>
      <button class="tab" data-tab="nt-${id}">Anotações</button>
      <button class="tab" data-tab="rs-${id}">Resumos</button>
      <button class="tab" data-tab="pm-${id}">Pomodoro</button>
    </div>
    <div class="window-body">
      <div id="fc-${id}" class="tab-panel">
        <div class="field"><input id="deck-name-${id}" type="text" placeholder="Nome do baralho"><button id="create-deck-${id}" class="btn small">Criar</button></div>
        <div class="list" id="deck-list-${id}"></div>
        <hr style="border:none;border-top:1px solid rgba(91,108,255,.25);margin:12px 0">
        <div class="field"><select id="card-deck-${id}"></select><input id="card-front-${id}" type="text" placeholder="Pergunta"><input id="card-back-${id}" type="text" placeholder="Resposta"><button id="add-card-${id}" class="btn small">Adicionar</button></div>
        <div class="study">
          <div id="study-empty-${id}">Nenhum card devido agora.</div>
          <div id="study-card-${id}" class="study-card hidden">
            <div id="study-front-${id}" class="study-face"></div>
            <div id="study-back-${id}" class="study-face hidden"></div>
            <div class="study-actions">
              <button id="toggle-answer-${id}" class="btn">Mostrar resposta</button>
              <div class="ratings">
                <button data-q="1" data-rate="${id}" class="rate">Errei</button>
                <button data-q="3" data-rate="${id}" class="rate">Difícil</button>
                <button data-q="4" data-rate="${id}" class="rate">Médio</button>
                <button data-q="5" data-rate="${id}" class="rate">Fácil</button>
              </div>
              <button id="next-card-${id}" class="btn small">Próximo</button>
            </div>
          </div>
        </div>
      </div>
      <div id="nt-${id}" class="tab-panel hidden">
        <div class="field"><input id="note-title-${id}" type="text" placeholder="Título da anotação"><button id="create-note-${id}" class="btn small">Nova</button></div>
        <div class="list" id="notes-list-${id}"></div>
        <div class="field"><textarea id="note-content-${id}" placeholder="Escreva aqui"></textarea><div class="panel-actions"><button id="save-note-${id}" class="btn small">Salvar</button></div></div>
      </div>
      <div id="rs-${id}" class="tab-panel hidden">
        <div class="field"><textarea id="summary-input-${id}" placeholder="Cole aqui o texto para resumir"></textarea><div class="field"><label for="summary-size-${id}">Tamanho</label><input id="summary-size-${id}" type="range" min="1" max="5" value="3"><button id="generate-summary-${id}" class="btn">Gerar resumo</button></div></div>
        <div class="summary" id="summary-output-${id}"></div>
      </div>
      <div id="pm-${id}" class="tab-panel hidden">
        <div class="pomodoro">
          <div class="timer-display"><span id="timer-min-${id}">25</span>:<span id="timer-sec-${id}">00</span></div>
          <div class="controls"><button id="start-pomodoro-${id}" class="btn">Iniciar</button><button id="pause-pomodoro-${id}" class="btn">Pausar</button><button id="reset-pomodoro-${id}" class="btn">Resetar</button></div>
          <div class="field inline"><label>Foco</label><input id="focus-min-${id}" type="number" min="1" value="25"><label>Pausa</label><input id="break-min-${id}" type="number" min="1" value="5"></div>
          <div class="sessions">Sessões concluídas: <span id="sessions-count-${id}">0</span></div>
        </div>
      </div>
    </div>
  </div>`
}

function openSpaceWindow(spaceId){
  const windows = el('windows'); const space = getSpace(spaceId); if(!windows || !space) return
  ensureWindowState(spaceId)
  const existing = el(`window-${spaceId}`)
  if(existing) return
  const wrapper = document.createElement('div'); wrapper.innerHTML = windowHTML(space)
  windows.appendChild(wrapper.firstElementChild)
  bindSpaceEvents(spaceId)
  renderDecks(spaceId); renderDeckSelect(spaceId); renderNotesList(spaceId); renderPomodoro(spaceId)
}
function closeSpaceWindow(spaceId){ const w = el(`window-${spaceId}`); if(!w) return; if(windowState[spaceId]?.timer){ clearInterval(windowState[spaceId].timer) } w.remove() }

function bindSpaceEvents(id){
  const root = el(`window-${id}`)
  root.querySelector('[data-close]')?.addEventListener('click', ()=> closeSpaceWindow(id))
  root.querySelectorAll('.tab').forEach(t => t.addEventListener('click', ()=> switchTab(id, t.getAttribute('data-tab'))))
  el(`create-deck-${id}`).onclick = ()=> createDeck(id)
  el(`add-card-${id}`).onclick = ()=> addCard(id)
  el(`toggle-answer-${id}`).onclick = ()=> toggleAnswer(id)
  el(`next-card-${id}`).onclick = ()=> nextStudyCard(id)
  root.querySelectorAll('[data-rate]').forEach(r => r.addEventListener('click', ()=> rate(id, parseInt(r.getAttribute('data-q'),10))))
  el(`create-note-${id}`).onclick = ()=> createNote(id)
  el(`save-note-${id}`).onclick = ()=> saveNote(id)
  el(`generate-summary-${id}`).onclick = ()=> generateSummary(id)
  el(`start-pomodoro-${id}`).onclick = ()=> startPomodoro(id)
  el(`pause-pomodoro-${id}`).onclick = ()=> pausePomodoro(id)
  el(`reset-pomodoro-${id}`).onclick = ()=> resetPomodoro(id)
  resetPomodoro(id)
}

function switchTab(id, target){
  const root = el(`window-${id}`)
  root.querySelectorAll('.tab').forEach(t=> t.classList.remove('active'))
  root.querySelectorAll('.tab-panel').forEach(p=> p.classList.add('hidden'))
  root.querySelector(`[data-tab="${target}"]`)?.classList.add('active')
  el(target)?.classList.remove('hidden')
}

function renderDecks(id){
  const space = getSpace(id); const list = el(`deck-list-${id}`); list.innerHTML = ''
  space.decks.forEach(d => {
    const div = document.createElement('div')
    const dueCount = d.cards.filter(c => c.due <= now()).length
    div.className = 'card'
    div.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><div><strong>${d.name}</strong><div style="color:#6b7280">${d.cards.length} cards • ${dueCount} devido(s)</div></div><div><button class="btn small" data-study="${d.id}">Estudar</button></div></div>`
    list.appendChild(div)
  })
  list.querySelectorAll('button[data-study]').forEach(b => b.onclick = () => startStudy(id, b.getAttribute('data-study')))
}
function renderDeckSelect(id){ const sel = el(`card-deck-${id}`); sel.innerHTML = ''; getSpace(id).decks.forEach(d=>{ const o=document.createElement('option'); o.value=d.id; o.textContent=d.name; sel.appendChild(o) }) }
function createDeck(id){ const name = el(`deck-name-${id}`).value.trim(); if(!name) return; const space=getSpace(id); space.decks.push({ id: uid(), name, cards: [] }); save(); el(`deck-name-${id}`).value=''; renderDecks(id); renderDeckSelect(id) }
function addCard(id){ const deckId=el(`card-deck-${id}`).value; const front=el(`card-front-${id}`).value.trim(); const back=el(`card-back-${id}`).value.trim(); if(!deckId||!front||!back) return; const space=getSpace(id); const deck=space.decks.find(d=>d.id===deckId); deck.cards.push({ id: uid(), front, back, ef:2.5, interval:0, reps:0, due:now() }); save(); el(`card-front-${id}`).value=''; el(`card-back-${id}`).value=''; renderDecks(id) }

function startStudy(id, deckId){ const space=getSpace(id); const deck=space.decks.find(d=>d.id===deckId); ensureWindowState(id); windowState[id].studyQueue = deck.cards.filter(c=>c.due<=now()); if(windowState[id].studyQueue.length===0){ el(`study-empty-${id}`).classList.remove('hidden'); el(`study-card-${id}`).classList.add('hidden'); return } el(`study-empty-${id}`).classList.add('hidden'); el(`study-card-${id}`).classList.remove('hidden'); el(`study-back-${id}`).classList.add('hidden'); el(`study-front-${id}`).classList.remove('hidden'); nextStudyCard(id) }
function nextStudyCard(id){ const ws=windowState[id]; const space=getSpace(id); if(!ws) return; ws.currentCard = ws.studyQueue.shift(); if(!ws.currentCard){ el(`study-empty-${id}`).classList.remove('hidden'); el(`study-card-${id}`).classList.add('hidden'); renderDecks(id); return } el(`study-front-${id}`).textContent = ws.currentCard.front; el(`study-back-${id}`).textContent = ws.currentCard.back }
function toggleAnswer(id){ el(`study-back-${id}`).classList.toggle('hidden'); el(`study-front-${id}`).classList.toggle('hidden') }
function rate(id,q){ const ws=windowState[id]; if(!ws||!ws.currentCard) return; const c=ws.currentCard; if(q<3){ c.reps=0; c.interval=1 } else { c.reps+=1; if(c.reps===1) c.interval=1; else if(c.reps===2) c.interval=6; else c.interval=Math.round(c.interval*c.ef) } c.ef = Math.max(1.3, c.ef - 0.8 + 0.28*q - 0.02*q*q); c.due = nextDays(c.interval); save(); nextStudyCard(id) }

function renderNotesList(id){ const list=el(`notes-list-${id}`); list.innerHTML=''; const space=getSpace(id); space.notes.forEach(n=>{ const div=document.createElement('div'); div.className='card'; div.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center"><div><strong>${n.title||'Sem título'}</strong><div style="color:#6b7280">Atualizado ${fmtDate(n.updated)}</div></div><div><button class="btn small" data-open-note="${n.id}">Abrir</button></div></div>`; list.appendChild(div) }); list.querySelectorAll('[data-open-note]').forEach(b=> b.onclick = ()=> openNote(id, b.getAttribute('data-open-note')) ) }
function createNote(id){ const title=el(`note-title-${id}`).value.trim(); const n={ id:uid(), title, content:'', updated:now() }; const space=getSpace(id); space.notes.unshift(n); save(); el(`note-title-${id}`).value=''; renderNotesList(id); openNote(id, n.id) }
function openNote(id,noteId){ const space=getSpace(id); const n=space.notes.find(x=>x.id===noteId); if(!n) return; el(`note-content-${id}`).value=n.content; el(`note-title-${id}`).value=n.title }
function saveNote(id){ const title=el(`note-title-${id}`).value.trim(); const content=el(`note-content-${id}`).value; const space=getSpace(id); const idx=space.notes.findIndex(n=>n.title===title); if(idx>=0){ space.notes[idx].content=content; space.notes[idx].title=title; space.notes[idx].updated=now() } else { space.notes.unshift({ id:uid(), title, content, updated:now() }) } save(); renderNotesList(id) }

function summarizeText(text, level){ const clean=text.toLowerCase().replace(/[^a-zà-ú0-9\s]/g,' '); const words=clean.split(/\s+/).filter(w=>w); const stop=new Set(['a','o','as','os','um','uma','de','da','do','das','dos','e','é','que','em','no','na','nos','nas','por','para','com','se','não','sim','mais','menos','como','ou']); const freq={}; words.forEach(w=>{ if(!stop.has(w)) freq[w]=(freq[w]||0)+1 }); const sents=text.match(/[^.!?\n]+[.!?\n]/g)||[text]; const scored=sents.map(s=>{ const w=s.toLowerCase().split(/\s+/); let score=0; w.forEach(x=>{ if(freq[x]) score+=freq[x] }); return { s, score } }); scored.sort((a,b)=>b.score-a.score); const take=Math.max(1, Math.round((scored.length)*(level/5))); return scored.slice(0,take).map(x=>x.s.trim()).join('\n\n') }
function generateSummary(id){ const input=el(`summary-input-${id}`).value; const level=parseInt(el(`summary-size-${id}`).value,10); if(!input.trim()){ el(`summary-output-${id}`).textContent=''; return } const out=summarizeText(input, level); el(`summary-output-${id}`).textContent=out }

function renderTimer(id){ const ws=ensureWindowState(id)||windowState[id]; const m=Math.floor(ws.remaining/60).toString().padStart(2,'0'); const s=Math.floor(ws.remaining%60).toString().padStart(2,'0'); el(`timer-min-${id}`).textContent=m; el(`timer-sec-${id}`).textContent=s }
function startPomodoro(id){ ensureWindowState(id); const ws=windowState[id]; if(ws.timer) return; ws.timer=setInterval(()=>{ ws.remaining-=1; if(ws.remaining<=0){ clearInterval(ws.timer); ws.timer=null; const space=getSpace(id); if(!ws.isBreak) { space.sessions+=1; save(); renderPomodoro(id) } ws.isBreak=!ws.isBreak; ws.remaining=(ws.isBreak?ws.breakLen:ws.focusLen)*60; startPomodoro(id) } else renderTimer(id) },1000) }
function pausePomodoro(id){ ensureWindowState(id); const ws=windowState[id]; if(!ws.timer) return; clearInterval(ws.timer); ws.timer=null }
function resetPomodoro(id){ ensureWindowState(id); const ws=windowState[id]; pausePomodoro(id); ws.isBreak=false; ws.focusLen=parseInt(el(`focus-min-${id}`).value,10)||25; ws.breakLen=parseInt(el(`break-min-${id}`).value,10)||5; ws.remaining=ws.focusLen*60; renderTimer(id) }
function renderPomodoro(id){ const space=getSpace(id); el(`sessions-count-${id}`).textContent=space.sessions; renderTimer(id) }

document.addEventListener('DOMContentLoaded', ()=>{
  mount()
  const createBtn = el('create-space'); if(createBtn) createBtn.onclick = createSpace
})