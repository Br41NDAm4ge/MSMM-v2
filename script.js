document.addEventListener('DOMContentLoaded', () => {
    const btnTitulo = document.getElementById('btn-titulo');

    // 1. Criar partículas de fundo (Nevoa Mágica)
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
        criarParticulaFundo();
    }

    // 2. Evento de Clique no Título
    if (btnTitulo) {
        btnTitulo.addEventListener('click', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            for (let i = 0; i < 20; i++) {
                criarEstrelaExplosao(x, y);
            }
        });
    }
});

function criarParticulaFundo() {
    const p = document.createElement('div');
    p.className = 'bg-particle';
    const size = Math.random() * 4 + 1 + "px";
    const duration = Math.random() * 10 + 10 + "s";
    
    p.style.width = size;
    p.style.height = size;
    p.style.left = Math.random() * 100 + "vw";
    p.style.setProperty('--d', duration);
    p.style.top = Math.random() * 100 + "vh"; // Começam em pontos variados
    
    document.body.appendChild(p);
}

function criarEstrelaExplosao(x, y) {
    const estrela = document.createElement('div');
    const cores = ['rosa', 'roxo', 'amarelo'];
    estrela.className = `star-click ${cores[Math.floor(Math.random() * 3)]}`;

    const angulo = Math.random() * Math.PI * 2;
    const forca = Math.random() * 250 + 100;
    const destX = Math.cos(angulo) * forca + "px";
    const destY = Math.sin(angulo) * forca + "px";

    estrela.style.left = x + 'px';
    estrela.style.top = y + 'px';
    estrela.style.setProperty('--tx', destX);
    estrela.style.setProperty('--ty', destY);

    document.body.appendChild(estrela);
    setTimeout(() => estrela.remove(), 900);
}