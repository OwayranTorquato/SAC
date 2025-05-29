document.getElementById('feedback-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    // Para checkboxes de satisfação
    let satisfacoes = [];
    form.querySelectorAll('input[name="satisfacao"]:checked').forEach(cb => {
        satisfacoes.push(cb.value);
    });
    data.set('satisfacao', satisfacoes.join(', '));

    // Monta objeto para enviar
    const body = {};
    data.forEach((value, key) => {
        body[key] = value;
    });

    // Envia para o backend
    const parabensDiv = document.getElementById('parabens');
    parabensDiv.innerHTML = '';
    try {
        const response = await fetch('/api/enviar-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const result = await response.json();
        parabensDiv.innerHTML = `<div class="parabens">${result.message}</div>`;
        form.reset();
    } catch (err) {
        parabensDiv.innerHTML = `<div class="parabens">Ocorreu um erro ao enviar o feedback.</div>`;
    }
});
