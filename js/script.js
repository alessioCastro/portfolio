// js/script.js
// Código comum a index.html e projects.html
// Mantive a função normalizeCodeBlocks EXATAMENTE como você enviou.

function normalizeCodeBlocks() {
    document.querySelectorAll("pre code").forEach(block => {
        let lines = block.innerHTML.split("\n");
        let indent = lines.filter(l => l.trim()).reduce((min, l) => {
            let spaces = l.match(/^(\s*)/)[0].length;
            return Math.min(min, spaces);
        }, Infinity);
        block.innerHTML = lines.map(l => l.slice(indent)).join("\n");
    });
}

function resizeContainer() {
    const container = document.querySelector('.cards-wrapper');
    if (!container) return;

    const cards = container.querySelectorAll('.card');
    if (!cards.length) return;

    let maxBottom = 0;
    let maxRight = 0;

    cards.forEach(card => {
        const bottom = card.offsetTop + card.offsetHeight;
        const right = card.offsetLeft + card.offsetWidth;
        maxBottom = Math.max(maxBottom, bottom);
        maxRight = Math.max(maxRight, right);
    });

    const PADDING_LEFT = 7;
    const PADDING_BOTTOM = 50;

    container.style.width = `${maxRight + PADDING_LEFT}px`;
    container.style.height = `${maxBottom + PADDING_BOTTOM}px`;
}

function setupModal() {
    const modalOverlay = document.querySelector('.modal-overlay');
    if (!modalOverlay) return;

    // tenta encontrar o botão dentro do modal (compatível com ambas as marcações)
    const closeButton = modalOverlay.querySelector('.close-button') || document.querySelector('.modal .close-button');

    const HAS_VISITED = 'hasVisited';
    const MODAL_CLOSED = 'modalClosed';

    if (!sessionStorage.getItem(HAS_VISITED)) {
        sessionStorage.setItem(HAS_VISITED, 'true');
        sessionStorage.setItem(MODAL_CLOSED, 'false');
    } else if (sessionStorage.getItem(MODAL_CLOSED) === 'true') {
        // remove overlay se já fechado nesta sessão
        modalOverlay.remove();
        return;
    }

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modalOverlay.remove();
            sessionStorage.setItem(MODAL_CLOSED, 'true');
        });
    }

    // Fecha clicando fora da caixa, se overlay existir
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
            sessionStorage.setItem(MODAL_CLOSED, 'true');
        }
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // mantém a sua implementação de normalize
    normalizeCodeBlocks();

    // modal (só roda se existir)
    setupModal();
});

// resizeContainer só faz algo se existir .cards-wrapper
window.addEventListener('load', resizeContainer);
window.addEventListener('resize', resizeContainer);
