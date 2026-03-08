document.addEventListener('DOMContentLoaded', () => {
    const btnTitulo = document.getElementById('btn-titulo');

    // 1. Evento de Clique para a Explosão Mágica
    if (btnTitulo) {
        btnTitulo.addEventListener('click', (e) => {
            explosaoDeEstrelas(e.clientX, e.clientY);
        });
    }

    // 2. Partículas de fundo para dar vida ao menu
    criarParticulasDeFundo();
});

function explosaoDeEstrelas(x, y) {
    const totalEstrelas = 15; // Quantidade de estrelas na explosão
    const cores = ['rosa', 'roxo', 'amarelo'];

    for (let i = 0; i < totalEstrelas; i++) {
        const estrela = document.createElement('div');
        const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
        estrela.className = `star-click ${corAleatoria}`;

        // Tamanho variado
        const tamanho = Math.random() * 15 + 10;
        
        // Cálculo da direção da explosão (Círculo de 360 graus)
        const angulo = Math.random() * Math.PI * 2;
        const forca = Math.random() * 150 + 50; // Quão longe elas voam
        const tx = Math.cos(angulo) * forca + "px";
        const ty = Math.sin(angulo) * forca + "px";

        // Aplicar estilos e coordenadas
        Object.assign(estrela.style, {
            left: `${x - tamanho / 2}px`,
            top: `${y - tamanho / 2}px`,
            width: `${tamanho}px`,
            height: `${tamanho}px`,
            "--tx": tx,
            "--ty": ty
        });

        document.body.appendChild(estrela);

        // Remover a estrela após a animação para não pesar o site
        setTimeout(() => estrela.remove(), 800);
    }
}

function criarParticulasDeFundo() {
    const body = document.body;
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        const s = Math.random() * 3 + 1;
        p.style.cssText = `
            position: absolute; width: ${s}px; height: ${s}px; 
            background: #ff69b4; border-radius: 50%; opacity: 0.3;
            left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
            pointer-events: none; z-index: 1;
            animation: subir ${Math.random() * 10 + 10}s linear infinite;
        `;
        body.appendChild(p);
    }
}

// Injeção da animação de fundo
const style = document.createElement('style');
style.innerText = `@keyframes subir { 
    0% { transform: translateY(100vh); opacity: 0; } 
    50% { opacity: 0.5; } 
    100% { transform: translateY(-10vh); opacity: 0; } 
}`;
document.head.appendChild(style);