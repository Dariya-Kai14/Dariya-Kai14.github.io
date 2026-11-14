const theme = document.querySelector('#theme');
let savedTheme;try{savedTheme=localStorage.getItem('dariya-theme')}catch{}
if(savedTheme==='dark')document.body.classList.add('dark');
function updateTheme(){const dark=document.body.classList.contains('dark');theme.textContent=dark?'☀':'☾';theme.setAttribute('aria-label',`Switch to ${dark?'light':'dark'} theme`)}
updateTheme();theme.addEventListener('click',()=>{document.body.classList.toggle('dark');updateTheme();try{localStorage.setItem('dariya-theme',document.body.classList.contains('dark')?'dark':'light')}catch{}});
document.querySelectorAll('.filters').forEach(group=>{group.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;group.querySelectorAll('button').forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button))});document.querySelectorAll(`#${group.dataset.group} [data-category]`).forEach(card=>card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter)})});
const dialog=document.querySelector('#art-dialog');document.querySelectorAll('.art-card').forEach(card=>card.addEventListener('click',()=>{document.querySelector('#art-preview').replaceChildren(card.querySelector('.art-placeholder').cloneNode(true));document.querySelector('#art-title').textContent=card.dataset.title;dialog.showModal()}));
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});

// Local FAQ guide: no service calls, message storage, or personal details beyond the page.
const chatForm = document.querySelector('#chat-form');
const chatInput = document.querySelector('#chat-input');
const chatMessages = document.querySelector('#chat-messages');
const chatGreeting = chatMessages.firstElementChild.cloneNode(true);
function answerQuestion(message) {
  const q = message.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  if (/\b(cri)\b/.test(q)) return 'Dariya has been to CRI as part of her robotics journey. More stories and photos will be added to the Robotics section.';
  if (/\b(robot|robots|robotics|frc|club)\b/.test(q)) return 'Dariya is part of the FRC robotics club at Montgomery Blair High School, and she has been to CRI. Explore the Robotics section to learn more as she adds updates!';
  if (/\b(code|coding|projects?|python|tkinter|games?|programming|html|css|javascript)\b/.test(q)) return 'Dariya has made games using Python and Tkinter. Her Coding section has space for those projects and their screenshots. This personal website uses HTML, CSS, and JavaScript.';
  if (/\b(art|artwork|drawing|drawings|gallery|paint|painting|sketch|digital)\b/.test(q)) return 'Dariya also does art! Look in the Art section for her gallery. The current previews are decorative placeholders; her own artwork will be added later.';
  if (/\b(school|student|magnet|blair|mbhs|stem)\b/.test(q)) return 'Dariya is a student in the STEM Magnet at Montgomery Blair High School.';
  if (/\b(engineer|engineering|aspiring|future|career|goal)\b/.test(q)) return 'Dariya is an aspiring engineer. Her interests include robotics, coding, and art.';
  if (/\b(contact|email|phone|social|instagram|reach|message)\b/.test(q)) return 'Dariya has not added contact links yet. Check the Contact section for future updates. This chatbot cannot send messages to her.';
  if (/\b(passions?|hobbies|interests?|enjoy|likes?)\b/.test(q)) return 'Dariya’s passions include robotics, coding, and art. She likes creating through both STEM and artistic projects.';
  if (/\b(who|about|name|dariya|yourself)\b/.test(q)) return 'Dariya Kaiym is a student in the STEM Magnet at Montgomery Blair High School and an aspiring engineer. She does FRC robotics, coding, and art.';
  if (/\b(hello|hi|hey)\b/.test(q)) return 'Hello! Glad you stopped by. Would you like to hear about Dariya, robotics, coding, or art?';
  if (/\b(thanks|thank)\b/.test(q)) return 'You’re welcome! Feel free to explore the site or ask another question.';
  if (/\b(bot|chatbot|ai|human|help)\b/.test(q)) return 'I’m a simple automated FAQ guide with prepared answers about this website. I’m not Dariya or a general-purpose AI. Try asking about school, robotics, coding, or art!';
  return 'I don’t have that information. I can answer simple questions about Dariya’s school, robotics, coding projects, art, and interests. Try one of the suggested questions below!';
}
function addChatMessage(text, sender) {
  const bubble = document.createElement('div');
  bubble.className = `chat-message ${sender}`;
  const speaker = document.createElement('span');
  speaker.className = 'chat-speaker';
  speaker.textContent = sender === 'user' ? 'You' : 'Site guide';
  const content = document.createElement('p');
  content.textContent = text;
  bubble.append(speaker, content);
  chatMessages.append(bubble);
  while (chatMessages.children.length > 60) chatMessages.firstElementChild.remove();
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function sendQuestion(question) {
  const trimmed = question.trim().slice(0, 500);
  if (!trimmed) return;
  addChatMessage(trimmed, 'user');
  addChatMessage(answerQuestion(trimmed), 'bot');
  chatInput.value = '';
}
chatForm.addEventListener('submit', event => { event.preventDefault(); sendQuestion(chatInput.value); chatInput.focus(); });
document.querySelectorAll('[data-question]').forEach(button => button.addEventListener('click', () => sendQuestion(button.dataset.question)));
document.querySelector('#chat-reset').addEventListener('click', () => { chatMessages.replaceChildren(chatGreeting.cloneNode(true)); chatInput.value = ''; chatInput.focus(); });
