document.addEventListener('DOMContentLoaded', () => {
    console.log("Magic Ordem: Iniciando sistemas mágicos...");

    // 1. Iniciar partículas de fundo (Globais)
    createGlobalParticles();

    // 2. Iniciar efeito de estrelinhas no Título
    setInterval(createStarInTitle, 400);

    // 3. Animação de entrada da descrição
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

// --- Estrelinhas do Título ---
function createStarInTitle() {
    const wrapper = document.querySelector('.title-wrapper');
    if (!wrapper) return;

    const star = document.createElement('div');
    star.className = 'star';

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 12 + 6;

    Object.assign(star.style, {
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        boxShadow: '0 0 10px #ffffff'
    });

    wrapper.appendChild(star);
    setTimeout(() => star.remove(), 1000);
}

// --- Partículas Globais do Fundo ---
function createGlobalParticles() {
    const body = document.body;
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 3 + 2;
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
            opacity: '0.4',
            zIndex: '1',
            pointerEvents: 'none',
            animation: `floatUp ${duration}s linear ${delay}s infinite`
        });
        body.appendChild(p);
    }
}

// Injetando animação de subida das partículas
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes floatUp {
        0% { transform: translateY(100vh); opacity: 0; }
        50% { opacity: 0.5; }
        100% { transform: translateY(-10vh); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);