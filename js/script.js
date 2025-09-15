document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("pre code").forEach(block => {
        let lines = block.innerHTML.split("\n");
        let indent = lines.filter(l => l.trim()).reduce((min, l) => {
            let spaces = l.match(/^(\s*)/)[0].length;
            return Math.min(min, spaces);
        }, Infinity);
        block.innerHTML = lines.map(l => l.slice(indent)).join("\n");
    });
});

function resizeContainer() {
    const container = document.querySelector('.cards-wrapper');
    const cards = document.querySelectorAll('.card');

    let maxBottom = 0;
    let maxRight = 0;

    cards.forEach(card => {
        // Obtém a posição e o tamanho do card em relação à viewport
        const rect = card.getBoundingClientRect();

        // Calcula a posição do card em relação ao contêiner pai
        // Isso é importante para casos de scroll
        const cardTopInContainer = card.offsetTop;
        const cardLeftInContainer = card.offsetLeft;

        // Calcula a altura e largura total ocupada pelo card
        const bottomPosition = cardTopInContainer + card.offsetHeight;
        const rightPosition = cardLeftInContainer + card.offsetWidth;

        // Atualiza os valores máximos
        if (bottomPosition > maxBottom) {
            maxBottom = bottomPosition;
        }

        if (rightPosition > maxRight) {
            maxRight = rightPosition;
        }
    });

    // Aplica as novas dimensões ao contêiner
    // Adicionamos um pequeno padding para garantir espaço
    const paddingLeft = 7;
    const paddingBottom = 50;
    container.style.width = `${maxRight + paddingLeft}px`;
    container.style.height = `${maxBottom + paddingBottom}px`;
}

// Executa a função após o carregamento da página
window.addEventListener('load', resizeContainer);
// Também pode ser útil executar quando a janela é redimensionada
window.addEventListener('resize', resizeContainer);

const closeButton = document.querySelector('.modal .close-button');
const modalOverlay = document.querySelector('.modal-overlay');

// Verifica se o usuário já visitou o site nesta sessão
if (!sessionStorage.getItem('hasVisited')) {
    // Primeira visita nesta sessão
    sessionStorage.setItem('hasVisited', 'true'); // Marca que o usuário já visitou
    sessionStorage.setItem('modalClosed', 'false'); // Marca que o modal ainda não foi fechado
} else {
    // Não é a primeira visita
    if (sessionStorage.getItem('modalClosed') === 'true') {
        // O modal já foi fechado anteriormente, então remove-o da tela
        modalOverlay.remove();
    }
}

closeButton.addEventListener('click', () => {
    modalOverlay.remove();
    sessionStorage.setItem('modalClosed', 'true'); // Marca que o modal foi fechado
});

// Fecha clicando fora da caixa
/* modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.remove();
    }
}); */
