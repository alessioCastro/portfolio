const chatToggle = document.getElementById('chat-toggle');
const chatContainer = document.getElementById('chat-container');
const chatClose = document.getElementById('chat-close');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatBox = document.getElementById('chat-box');

let initialized = false;

// Mostra/oculta chat
chatToggle.addEventListener('click', () => {
  chatContainer.classList.toggle('hidden');
  if (!initialized) {
    initializeSession().then(() => initialized = true);
    addMessageToChat('Olá! Sou uma inteligência artificial. Posso responder apenas questões relacionadas a Aléssio. Quer conversar sobre ele? Fique a vontade.', 'ai', true);
    loadChatHistory();
  }
});

chatClose.addEventListener('click', () => {
  chatContainer.classList.add('hidden');
});

// Envia mensagem para IA
chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const msg = chatInput.value.trim();
  if (msg === '') return;

  addMessageToChat(msg, 'user');
  chatInput.value = '';

  // Resposta da IA
  const response = await askQuestion(msg);
  addMessageToChat(response, 'bot');
});

function addMessageToChat(text, sender, skipSave = false) {
  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'flex-start';
  wrapper.style.margin = '8px 0';
  wrapper.style.justifyContent = sender === 'user' ? 'flex-end' : 'flex-start';

  const avatar = document.createElement('img');
  avatar.src = sender === 'user' ? 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png' : 'https://www.shutterstock.com/image-vector/ai-technology-icon-artificial-intelligence-600nw-2269141251.jpg';
  avatar.alt = sender === 'user' ? 'Você' : 'IA';
  avatar.style.width = '32px';
  avatar.style.height = '32px';
  avatar.style.borderRadius = '50%';
  avatar.style.margin = sender === 'user' ? '0 0 0 8px' : '0 8px 0 0';

  const bubble = document.createElement('div');
  bubble.textContent = text;
  bubble.style.padding = '10px';
  bubble.style.borderRadius = '10px';
  bubble.style.maxWidth = '70%';
  bubble.style.background = sender === 'user' ? '#dcf8c6' : '#eee';
  bubble.style.color = '#333';

  wrapper.appendChild(sender === 'user' ? bubble : avatar);
  wrapper.appendChild(sender === 'user' ? avatar : bubble);

  chatBox.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;

  if (!skipSave) {
    // 🔁 Salva no sessionStorage
    const saved = JSON.parse(sessionStorage.getItem('chatHistory') || '[]');
    saved.push({ text, sender });
    sessionStorage.setItem('chatHistory', JSON.stringify(saved));
  }
}

function loadChatHistory() {
  const saved = JSON.parse(sessionStorage.getItem('chatHistory') || '[]');
  saved.forEach(msg => addMessageToChat(msg.text, msg.sender, true));
}
