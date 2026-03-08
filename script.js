document.addEventListener('DOMContentLoaded', () => {
    const titleImg = document.getElementById('main-title');

    // 1. Evento de Clique: Explosão de Estrelas
    if (titleImg) {
        titleImg.addEventListener('click', (e) => {
            createSupernova(e.clientX, e.clientY);
        });
    }

    // 2. Iniciar elementos de ambiente (partículas de fundo)
    initBackground();
});

function createSupernova(x, y) {
    const starCount = 16; // Número de estrelas por explosão
    const colors = ['rosa', 'roxo', 'amarelo'];

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const colorClass = colors[Math.floor(Math.random() * colors.length)];
        star.className = `star-particle ${colorClass}`;

        // Tamanho aleatório para cada estrela da explosão
        const size = Math.random() * 15 + 8;
        
        // Ângulo e distância aleatórios para o efeito de expansão
        const angle = Math.random() * Math.PI * 2; // 360 graus
        const velocity = Math.random() * 140 + 60; // Distância que a estrela percorre
        const tx = Math.cos(angle) * velocity + "px";
        const ty = Math.sin(angle) * velocity + "px";

        Object.assign(star.style, {
            left: `${x - size / 2}px`,
            top: `${y - size / 2}px`,
            width: `${size}px`,
            height: `${size}px`,
            "--tx": tx,
            "--ty": ty
        });

        document.body.appendChild(star);

        // Remove o elemento após o fim da animação (800ms)
        setTimeout(() => star.remove(), 800);
    }
}

function initBackground() {
    const body = document.body;
    const particleLimit = 35;

    for (let i = 0; i < particleLimit; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 3 + 1;
        
        Object.assign(p.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: '#ff69b4',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: '0.3',
            pointerEvents: 'none',
            zIndex: '1',
            animation: `floatAmbient ${Math.random() * 15 + 10}s linear infinite`
        });
        
        body.appendChild(p);
    }
}

// Injeção da animação de subida das partículas de fundo
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes floatAmbient {
        0% { transform: translateY(100vh); opacity: 0; }
        50% { opacity: 0.5; }
        100% { transform: translateY(-10vh); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);