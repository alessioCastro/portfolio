addEventListener('load', () => {
    //document.getElementById('sp').shadowRoot.querySelector("#logo").remove()

    const jaDeuBoasVindas = sessionStorage.getItem('jaDeuBoasVindas');
    
    const intro = document.getElementById('intro-screen');

    const conteudo = document.getElementById('conteudo');

    if (jaDeuBoasVindas) {
        intro.remove();
        conteudo.style.opacity = '1';
        return;
    }

    // Após 5 segundos (tempo da intro)
    setTimeout(() => {
        intro.style.opacity = '0';
        conteudo.style.animation = 'fadeIn 3s ease forwards 1s';

        // Remove completamente o intro-screen depois da transição
        setTimeout(() => {
            intro.remove();
            sessionStorage.setItem('jaDeuBoasVindas', true);
        }, 2000);
    }, 5000); // tempo total da intro
})