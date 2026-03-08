// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    console.log("Sistema Magic Ordem Inicializado... ✨");

    // 1. Efeito de Som ao passar o mouse nos botões (Opcional)
    const buttons = document.querySelectorAll('.btn-magic');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // Aqui você poderia tocar um som curto de "hover"
            // console.log("Hover no botão: " + button.innerText);
        });

        button.addEventListener('click', (e) => {
            // Efeito de clique antes de mudar de página
            console.log("Navegando para: " + button.getAttribute('href'));
        });
    });

    // 2. Animação de entrada suave para a descrição
    const description = document.querySelector('.description-box');
    if (description) {
        description.style.opacity = '0';
        description.style.transform = 'verticalY(20px)';
        
        setTimeout(() => {
            description.style.transition = 'all 1s ease-out';
            description.style.opacity = '1';
            description.style.transform = 'verticalY(0)';
        }, 300);
    }

    // 3. Sistema de "Partículas Mágicas" no fundo (Dinâmico)
    createParticles();
});

// Função para criar estrelas/partículas que flutuam no fundo
function createParticles() {
    const body = document.querySelector('body');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posicionamento aleatório
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 105, 180, 0.5);
            box-shadow: 0 0 10px #ff69b4;
            border-radius: 50%;
            top: ${y}%;
            left: ${x}%;
            opacity: 0;
            z-index: 0;
            pointer-events: none;
            animation: floatParticle ${duration}s linear ${delay}s infinite;
        `;

        body.appendChild(particle);
    }
}

// Adiciona a animação das partículas dinamicamente ao CSS via JS
const style = document.createElement('style');
style.innerHTML = `
    @keyframes floatParticle {
        0% { transform: translateY(0) scale(1); opacity: 0; }
        20% { opacity: 0.8; }
        80% { opacity: 0.8; }
        100% { transform: translateY(-100vh) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(style);