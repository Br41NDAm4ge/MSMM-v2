document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleção de elementos (Garantindo que existem na página atual)
    const btnTitulo = document.getElementById('btn-titulo');
    const fichaForm = document.getElementById('ficha-form');

    // 2. Iniciar Partículas de Fundo
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
        criarParticulaFundo();
    }

    // 3. Evento de Clique no Título (Efeito Visual)
    if (btnTitulo) {
        btnTitulo.addEventListener('click', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            for (let i = 0; i < 15; i++) {
                criarEstrelaExplosao(x, y);
            }
        });
    }

    // 4. Lógica do Formulário (Onde o erro estava ocorrendo)
    if (fichaForm) {
        fichaForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const dadosFicha = Object.fromEntries(formData.entries());
            const nomePersonagem = dadosFicha.nome || "Ficha_Magica";

            // Feedback visual no botão
            const btnSubmit = this.querySelector('.btn-magic-submit');
            btnSubmit.innerHTML = "✨ Gerando Imagem... ✨";
            btnSubmit.disabled = true;

            // Efeito de estrelas no centro
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            for (let i = 0; i < 20; i++) {
                setTimeout(() => criarEstrelaExplosao(centerX, centerY), i * 30);
            }

            // Captura da imagem com html2canvas
            // Certifique-se de que a biblioteca está no HTML antes deste script!
            if (typeof html2canvas !== 'undefined') {
                html2canvas(fichaForm, {
                    backgroundColor: "#1a0a1a",
                    scale: 2,
                    useCORS: true,
                    allowTaint: true
                }).then(canvas => {
                    const imgData = canvas.toDataURL("image/png");
                    const link = document.createElement('a');
                    link.setAttribute('download', `${nomePersonagem}.png`);
                    link.setAttribute('href', imgData);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    btnSubmit.innerHTML = "✨ FICHA BAIXADA! ✨";
                    
                    setTimeout(() => {
                        btnSubmit.innerHTML = "Despertar Poder ✨";
                        btnSubmit.disabled = false;
                        fichaForm.reset();
                    }, 3000);
                }).catch(err => {
                    console.error("Erro no html2canvas:", err);
                    btnSubmit.disabled = false;
                    btnSubmit.innerHTML = "Erro ao baixar";
                });
            } else {
                alert("Erro: Biblioteca de captura não carregada. Verifique sua conexão.");
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = "Despertar Poder ✨";
            }
        });
    }
});

// --- FUNÇÕES AUXILIARES (Fora do DOMContentLoaded para organização) ---

function criarParticulaFundo() {
    const p = document.createElement('div');
    const cores = ['rosa', 'amarelo', 'azul'];
    const corSorteada = cores[Math.floor(Math.random() * cores.length)];
    p.className = `bg-particle ${corSorteada}`;
    const size = Math.random() * 3 + 1 + "px";
    const duration = Math.random() * 12 + 8 + "s";
    const delay = Math.random() * 15 + "s";
    Object.assign(p.style, {
        width: size, height: size,
        left: Math.random() * 100 + "vw",
        top: Math.random() * 100 + "vh",
        animationDelay: "-" + delay
    });
    p.style.setProperty('--duration', duration);
    document.body.appendChild(p);
}

function criarEstrelaExplosao(x, y) {
    const estrela = document.createElement('div');
    const cores = ['rosa', 'amarelo', 'azul', 'roxo'];
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
    setTimeout(() => { estrela.remove(); }, 850);
}