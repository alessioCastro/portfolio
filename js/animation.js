function finalizarIntro() {
    const intro = document.getElementById('intro-screen');
    const conteudo = document.getElementById('conteudo');

    intro.style.opacity = '0';
    conteudo.style.animation = 'fadeIn 3s ease forwards 1s';

    setTimeout(() => {
        intro.remove();
        sessionStorage.setItem('jaDeuBoasVindas', true);
    }, 2000);
}
