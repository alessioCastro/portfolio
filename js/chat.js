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
  const bubble = document.createElement('div');
  bubble.textContent = text;
  bubble.style.margin = '6px 0';
  bubble.style.padding = '10px';
  bubble.style.borderRadius = '10px';
  bubble.style.maxWidth = '75%';
  bubble.style.alignSelf = sender === 'user' ? 'flex-end' : 'flex-start';
  bubble.style.background = sender === 'user' ? '#dcf8c6' : '#eee';

  chatBox.appendChild(bubble);
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

loadChatHistory();