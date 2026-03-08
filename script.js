document.addEventListener('DOMContentLoaded', () => {
    // Seleção de elementos
    const btnTitulo = document.getElementById('btn-titulo');
    const fichaForm = document.getElementById('ficha-form');

    // 1. Iniciar Partículas de Fundo (Rosa, Amarelo, Azul Claro)
    // Funciona em todas as páginas que tiverem o style.css vinculado
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
        criarParticulaFundo();
    }

    // 2. Evento de Clique no Título (Menu Principal)
    if (btnTitulo) {
        btnTitulo.addEventListener('click', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            // Gera a supernova de 15 estrelas
            for (let i = 0; i < 15; i++) {
                criarEstrelaExplosao(x, y);
            }
        });
    }

    // 3. Lógica do Formulário (Página Criar)
    if (fichaForm) {
        fichaForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Captura os dados dos inputs
            const formData = new FormData(fichaForm);
            const dadosFicha = Object.fromEntries(formData);

            console.log("Despertando Poder da Garota Mágica...", dadosFicha);

            // Efeito visual de confirmação: Explosão no centro
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    criarEstrelaExplosao(centerX, centerY);
                }, i * 20); // Efeito cascata
            }

            alert("Poder Despertado com Sucesso! ✨ Check o console (F12) para ver os dados.");
        });
    }
});

/**
 * Cria as partículas suaves que flutuam no fundo da tela
 */
function criarParticulaFundo() {
    const p = document.createElement('div');
    const cores = ['rosa', 'amarelo', 'azul'];
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
        animationDelay: "-" + delay // Inicia a animação em pontos diferentes
    });
    
    p.style.setProperty('--duration', duration);
    document.body.appendChild(p);
}

/**
 * Cria as estrelas que "explodem" a partir de um ponto de coordenadas (x, y)
 */
function criarEstrelaExplosao(x, y) {
    const estrela = document.createElement('div');
    const cores = ['rosa', 'amarelo', 'azul', 'roxo'];
    const cor = cores[Math.floor(Math.random() * cores.length)];
    
    estrela.className = `star-click ${cor}`;

    // Define uma direção aleatória em 360 graus
    const angulo = Math.random() * Math.PI * 2;
    // Define quão longe a estrela voará
    const distancia = Math.random() * 200 + 50;
    
    const destX = Math.cos(angulo) * distancia + "px";
    const destY = Math.sin(angulo) * distancia + "px";

    // Posiciona a estrela no ponto exato do clique/origem
    estrela.style.left = x + 'px';
    estrela.style.top = y + 'px';

    // Passa as coordenadas de destino para as variáveis do CSS
    estrela.style.setProperty('--tx', destX);
    estrela.style.setProperty('--ty', destY);

    document.body.appendChild(estrela);

    // Remove o elemento após a animação (800ms no CSS) para manter a performance
    setTimeout(() => {
        estrela.remove();
    }, 850);
}