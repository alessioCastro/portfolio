const form = document.getElementById('form-contato');
const mensagem = document.getElementById('mensagem-sucesso');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // impede envio automático

    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            mensagem.textContent = 'Mensagem enviada com sucesso!';
            mensagem.style.color = '#00ff00';
            mensagem.style.display = 'block'; // mostra a mensagem
            form.reset(); // limpa o formulário
        } else {
            mensagem.textContent = 'Houve um problema ao enviar. Tente novamente.';
            mensagem.style.color = '#ff0000';
            mensagem.style.display = 'block'; // mostra a mensagem
        }
    }).catch(error => {
        mensagem.textContent = 'Erro ao enviar o formulário.';
        mensagem.style.color = '#ff0000';
        mensagem.style.display = 'block'; // mostra a mensagem
    });
});