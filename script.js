document.addEventListener('DOMContentLoaded', () => {
    console.log("Magic Ordem: Sistemas Prontos! ✨");

    const titleImg = document.querySelector('.main-title-img');

    // 1. Efeito de Estrelas Coloridas ao Clicar no Título
    if (titleImg) {
        titleImg.addEventListener('click', (e) => {
            // Cria 12 estrelinhas coloridas por clique
            for (let i = 0; i < 12; i++) {
                createClickStar(e.clientX, e.clientY);
            }
        });
    }

    // 2. Iniciar partículas de fundo e estrelas automáticas no título
    createGlobalParticles();
    setInterval(createStarInTitle, 400);

    // 3. Animação suave na entrada da descrição
    const desc = document.querySelector('.description-box');
    if (desc) {
        desc.style.opacity = '0';
        desc.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            desc.style.transition = 'all 1s ease-out';
            desc.style.opacity = '1';
            desc.style.transform = 'translateX(0)';
        }, 500);
    }
});

// --- Função: Estrelas de Explosão (Clique) ---
function createClickStar(mouseX, mouseY) {
    const star = document.createElement('div');
    const cores = ['rosa', 'roxo', 'amarelo'];
    const corSorteada = cores[Math.floor(Math.random() * cores.length)];
    
    star.className = `star-click ${corSorteada}`;

    const size = Math.random() * 15 + 10;
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 120 + 60; // Força da explosão
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
    setTimeout(() => star.remove(), 800);
}

// --- Função: Estrelas Automáticas (No Título) ---
function createStarInTitle() {
    const wrapper = document.querySelector('.title-wrapper');
    if (!wrapper) return;

    const star = document.createElement('div');
    star.className = 'star rosa'; // Estrelas passivas são sempre rosas

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 10 + 5;

    Object.assign(star.style, {
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`
    });

    wrapper.appendChild(star);
    setTimeout(() => star.remove(), 1000);
}

// --- Função: Partículas de Fundo (Ambiente) ---
function createGlobalParticles() {
    const body = document.body;
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * -20;

        Object.assign(p.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: '#ff69b4',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: '0.3',
            zIndex: '1',
            pointerEvents: 'none',
            animation: `floatUp ${duration}s linear ${delay}s infinite`
        });
        body.appendChild(p);
    }
}

// Injetando animação das partículas de fundo
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes floatUp {
        0% { transform: translateY(110vh); opacity: 0; }
        50% { opacity: 0.4; }
        100% { transform: translateY(-10vh); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);