document.addEventListener('DOMContentLoaded', () => {
    console.log("Iniciando Magia... ✨");

    // 1. Efeito de surgimento da descrição
    const description = document.querySelector('.description-box');
    if (description) {
        description.style.opacity = '0';
        description.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            description.style.transition = 'all 1.2s ease-out';
            description.style.opacity = '1';
            description.style.transform = 'translateY(0)';
        }, 400);
    }

    // 2. Chamar a criação de partículas
    createParticles();
});

function createParticles() {
    const body = document.body;
    const particleCount = 50; // Quantidade de partículas

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        // Valores aleatórios para cada partícula
        const size = Math.random() * 3 + 2; // Tamanho entre 2px e 5px
        const posX = Math.random() * 100; // Posição horizontal (0% a 100%)
        const posY = Math.random() * 100; // Posição vertical inicial
        const duration = Math.random() * 12 + 8; // Velocidade da subida
        const delay = Math.random() * -20; // Começa em tempos diferentes

        // Estilização direta para garantir que funcionem
        Object.assign(particle.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: '#ff69b4',
            borderRadius: '50%',
            filter: 'blur(1px)',
            boxShadow: '0 0 10px #ff69b4, 0 0 20px #ff1493',
            left: `${posX}%`,
            top: `${posY}%`,
            opacity: '0',
            zIndex: '1', // Fica atrás do menu-container (que é 10)
            pointerEvents: 'none',
            animation: `floatUp ${duration}s linear ${delay}s infinite`
        });

        body.appendChild(particle);
    }
}

// Injetando a animação de subida no CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes floatUp {
        0% {
            transform: translateY(110vh) scale(0);
            opacity: 0;
        }
        20% {
            opacity: 0.7;
        }
        80% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(-10vh) scale(1.2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);