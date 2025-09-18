// js/bg.js
// Cria estrelas/formas e faz o parallax. Funciona mesmo quando uma página não tem .scroll-wrapper

function createStars(selectorOrElement, count) {
    const layer = (typeof selectorOrElement === 'string') ? document.querySelector(selectorOrElement) : selectorOrElement;
    if (!layer) return;

    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${1 + Math.random() * 3}s`;
        layer.appendChild(star);
    }
}

function createShapes(selectorOrElement, count) {
    const layer = (typeof selectorOrElement === 'string') ? document.querySelector(selectorOrElement) : selectorOrElement;
    if (!layer) return;

    for (let i = 0; i < count; i++) {
        const shape = document.createElement('div');
        shape.className = 'shape';
        shape.style.top = `${Math.random() * 80 + 10}vh`;
        shape.style.left = `${Math.random() * 90}vw`;
        shape.style.animationDuration = `${10 + Math.random() * 10}s`;
        layer.appendChild(shape);
    }
}

let lastScrollX = 0;
let lastScrollY = 0;
let ticking = false;

const layer1 = document.querySelector('#layer1');
const layer2 = document.querySelector('#layer2');
const layer3 = document.querySelector('#layer3');

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateBackground);
        ticking = true;
    }
}

function updateBackground() {
    ticking = false;
    if (layer1) layer1.style.transform = `translate(${lastScrollX * 0.1}px, ${lastScrollY * 0.1}px)`;
    if (layer2) layer2.style.transform = `translate(${lastScrollX * 0.3}px, ${lastScrollY * 0.3}px)`;
    if (layer3) layer3.style.transform = `translate(${lastScrollX * 0.5}px, ${lastScrollY * 0.5}px)`;
}

// Cria elementos apenas se as camadas existirem
createStars('#layer1', 100);
createStars('#layer2', 50);
createShapes('#layer3', 6);

// scroll na janela (sempre verificamos diferença para reduzir chamadas)
window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (currentY !== lastScrollY) {
        lastScrollY = currentY;
        requestTick();
    }
});

// scroll em .scroll-wrapper (páginas que a tiverem)
const scrollWrapper = document.querySelector('.scroll-wrapper');
if (scrollWrapper) {
    scrollWrapper.addEventListener('scroll', () => {
        const currentX = scrollWrapper.scrollLeft;
        if (currentX !== lastScrollX) {
            lastScrollX = currentX;
            requestTick();
        }
    });
}
