document.addEventListener('DOMContentLoaded', () => {
    const btnTitulo = document.getElementById('btn-titulo');

    if (btnTitulo) {
        btnTitulo.addEventListener('click', (e) => {
            // Pegamos a posição exata do clique
            const x = e.clientX;
            const y = e.clientY;

            // Criamos 15 estrelas de uma vez
            for (let i = 0; i < 15; i++) {
                criarEstrela(x, y);
            }
        });
    }
});

function criarEstrela(x, y) {
    const estrela = document.createElement('div');
    
    // Sorteia cor
    const cores = ['rosa', 'roxo', 'amarelo'];
    const cor = cores[Math.floor(Math.random() * cores.length)];
    estrela.className = `star-click ${cor}`;

    // Sorteia direção (ângulo) e distância (força)
    const angulo = Math.random() * Math.PI * 2;
    const distancia = Math.random() * 180 + 50; // Quão longe ela vai
    
    // Calcula o destino final
    const destX = Math.cos(angulo) * distancia + "px";
    const destY = Math.sin(angulo) * distancia + "px";

    // Posiciona a estrela no local do clique
    estrela.style.left = x + 'px';
    estrela.style.top = y + 'px';

    // Passa as variáveis de destino para o CSS
    estrela.style.setProperty('--tx', destX);
    estrela.style.setProperty('--ty', destY);

    document.body.appendChild(estrela);

    // Remove após a animação
    setTimeout(() => {
        estrela.remove();
    }, 800);
}