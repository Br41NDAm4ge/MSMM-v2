document.addEventListener('DOMContentLoaded', () => {
    console.log("Magic Ordem: Sistemas Prontos! ✨");

    const titleImg = document.querySelector('.main-title-img');

    // 1. Efeito de Estrelas ao Clicar no Título
    if (titleImg) {
        titleImg.style.cursor = "pointer"; // Indica que é clicável
        titleImg.addEventListener('click', (e) => {
            // Criamos 10 estrelinhas por clique
            for (let i = 0; i < 10; i++) {
                createClickStar(e.clientX, e.clientY);
            }
        });
    }

    // 2. Iniciar partículas de fundo e estrelas automáticas do título
    createGlobalParticles();
    setInterval(createStarInTitle, 400);
});

// --- Função para criar estrelas no clique do mouse ---
function createClickStar(mouseX, mouseY) {
    const star = document.createElement('div');
    
    // Sorteia a cor
    const cores = ['rosa', 'roxo', 'amarelo'];
    const corSorteada = cores[Math.floor(Math.random() * cores.length)];
    
    star.className = `star-click ${corSorteada}`;

    // Define tamanho aleatório
    const size = Math.random() * 15 + 10;
    
    // Define uma direção aleatória para a "explosão" usando variáveis CSS
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 100 + 50;
    const tx = Math.cos(angle) * velocity + "px";
    const ty = Math.sin(angle) * velocity + "px";

    Object.assign(star.style, {
        left: `${mouseX - size / 2}px`,
        top: `${mouseY - size / 2}px`,
        width: `${size}px`,
        height: `${size}px`,
        "--tx": tx,
        "--ty": ty
    });

    document.body.appendChild(star);

    // Remove após a animação
    setTimeout(() => star.remove(), 800);
}

// --- (Funções anteriores permanecem iguais) ---
function createStarInTitle() {
    const wrapper = document.querySelector('.title-wrapper');
    if (!wrapper) return;
    const star = document.createElement('div');
    star.className = 'star rosa'; // Estrelas automáticas continuam rosas
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 12 + 6;
    Object.assign(star.style, {
        left: `${x}%`, top: `${y}%`, width: `${size}px`, height: `${size}px`
    });
    wrapper.appendChild(star);
    setTimeout(() => star.remove(), 1000);
}

function createGlobalParticles() {
    const body = document.body;
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        Object.assign(p.style, {
            position: 'absolute', width: '3px', height: '3px', backgroundColor: '#ff69b4',
            borderRadius: '50%', left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            opacity: '0.4', zIndex: '1', pointerEvents: 'none',
            animation: `floatUp ${Math.random() * 15 + 10}s linear infinite`
        });
        body.appendChild(p);
    }
}