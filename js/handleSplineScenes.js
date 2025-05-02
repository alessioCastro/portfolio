import { Application } from 'https://unpkg.com/@splinetool/runtime@latest/build/runtime.js';
  
const introCanvas = document.getElementById('spline-welcome');
let app = new Application(introCanvas);

app.load('https://prod.spline.design/DnzAB-6z7jxJE8Nz/scene.splinecode').then(() => {
    introCanvas.style.animation = 'fadeIn 3s ease forwards 1s';
    const jaDeuBoasVindas = sessionStorage.getItem('jaDeuBoasVindas');

    const intro = document.getElementById('intro-screen');

    const conteudo = document.getElementById('conteudo');

    if (jaDeuBoasVindas) {
        intro.remove();
        conteudo.style.opacity = '1';
        return;
    }

    // Após 5 segundos (tempo da intro)
    setTimeout(finalizarIntro, 5000);
});

const canvas = document.getElementById('sp');
app = new Application(canvas);

app.load('https://prod.spline.design/jRgCwa1zLIxSMrBC/scene.splinecode').then(() => {
    /*app.addEventListener('mouseHover', (e) => {
        console.log('Evento mouseDown capturado:', e);
        // e.target contém o objeto clicado
        if (e.target && e.target.name === 'Button') {
            console.log('Objeto clicado:', e.target.name);
            // Execute ações específicas aqui
        }
    });

    canvas.addEventListener('wheel', (e) => {
        console.log(e)
        e.preventDefault();
    }, { passive: false })*/
});