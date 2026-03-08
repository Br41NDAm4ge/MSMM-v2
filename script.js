document.addEventListener('DOMContentLoaded', () => {
    const btnTitulo = document.getElementById('btn-titulo');

    if (btnTitulo) {
        btnTitulo.addEventListener('click', (e) => {
            const x = e.clientX;
            const y = e.clientY;

            // Criar 7 estrelas para uma explosão volumosa
            for (let i = 0; i < 7; i++) {
                criarEstrela(x, y);
            }
        });
    }
});

function criarEstrela(x, y) {
    const estrela = document.createElement('div');
    
    const cores = ['rosa', 'roxo', 'amarelo'];
    const cor = cores[Math.floor(Math.random() * cores.length)];
    estrela.className = `star-click ${cor}`;

    // Direção aleatória total
    const angulo = Math.random() * Math.PI * 2;
    const forca = Math.random() * 250 + 80; // Aumentada a distância da explosão
    
    const destX = Math.cos(angulo) * forca + "px";
    const destY = Math.sin(angulo) * forca + "px";

    estrela.style.left = x + 'px';
    estrela.style.top = y + 'px';

    // Usando setProperty para garantir que o CSS receba os valores
    estrela.style.setProperty('--tx', destX);
    estrela.style.setProperty('--ty', destY);

    document.body.appendChild(estrela);

    setTimeout(() => {
        estrela.remove();
    }, 900);
}