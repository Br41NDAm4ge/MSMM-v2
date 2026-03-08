document.addEventListener('DOMContentLoaded', () => {
    const btnTitulo = document.getElementById('btn-titulo');

    // 1. Criar Partículas de Fundo (Rosa, Amarelo, Azul Claro)
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
        criarParticulaFundo();
    }

    // 2. Evento de Clique (Explosão de Estrelas)
    if (btnTitulo) {
        btnTitulo.addEventListener('click', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            for (let i = 0; i < 15; i++) {
                criarEstrelaExplosao(x, y);
            }
        });
    }
});

function criarParticulaFundo() {
    const p = document.createElement('div');
    const cores = ['rosa', 'amarelo', 'azul']; // Rosa, Amarelo e Azul Claro
    const corSorteada = cores[Math.floor(Math.random() * cores.length)];
    
    p.className = `bg-particle ${corSorteada}`;
    
    const size = Math.random() * 3 + 1 + "px";
    const duration = Math.random() * 12 + 8 + "s";
    const delay = Math.random() * 15 + "s";

    Object.assign(p.style, {
        width: size,
        height: size,
        left: Math.random() * 100 + "vw",
        top: Math.random() * 100 + "vh",
        animationDelay: "-" + delay
    });
    
    p.style.setProperty('--duration', duration);
    document.body.appendChild(p);
}

function criarEstrelaExplosao(x, y) {
    const estrela = document.createElement('div');
    const cores = ['rosa', 'amarelo', 'azul'];
    const cor = cores[Math.floor(Math.random() * cores.length)];
    
    estrela.className = `star-click ${cor}`;

    const angulo = Math.random() * Math.PI * 2;
    const distancia = Math.random() * 200 + 50;
    
    const destX = Math.cos(angulo) * distancia + "px";
    const destY = Math.sin(angulo) * distancia + "px";

    estrela.style.left = x + 'px';
    estrela.style.top = y + 'px';
    estrela.style.setProperty('--tx', destX);
    estrela.style.setProperty('--ty', destY);

    document.body.appendChild(estrela);
    setTimeout(() => estrela.remove(), 800);
}