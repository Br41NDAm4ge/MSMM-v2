document.addEventListener('DOMContentLoaded', () => {
    const btnTitulo = document.getElementById('btn-titulo');
    const fichaForm = document.getElementById('ficha-form');

    // 1. Iniciar Partículas de Fundo
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
        criarParticulaFundo();
    }

    // 2. Evento de Clique no Título (Efeito Visual)
    if (btnTitulo) {
        btnTitulo.addEventListener('click', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            for (let i = 0; i < 15; i++) {
                criarEstrelaExplosao(x, y);
            }
        });
    }

    // 3. Lógica do Formulário
    if (fichaForm) {
        fichaForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Captura automática de todos os campos que possuem "name"
            const formData = new FormData(fichaForm);
            const dadosFicha = Object.fromEntries(formData.entries());

            console.log("Dados capturados:", dadosFicha);

            // Efeito visual de confirmação
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    criarEstrelaExplosao(centerX, centerY);
                }, i * 25);
            }

            // Salvar no Navegador (LocalStorage)
            const fichasSalvas = JSON.parse(localStorage.getItem('fichas_magic_ordem') || '[]');
            fichasSalvas.push(dadosFicha);
            localStorage.setItem('fichas_magic_ordem', JSON.stringify(fichasSalvas));

            // Feedback no Botão
            const btnSubmit = fichaForm.querySelector('.btn-magic-submit');
            const textoOriginal = btnSubmit.innerHTML;
            btnSubmit.innerHTML = "✨ PODER DESPERTADO! ✨";
            btnSubmit.style.background = "linear-gradient(90deg, #00ffff, #9370db)";

            setTimeout(() => {
                alert(`A personagem ${dadosFicha.nome} foi despertada com sucesso!`);
                btnSubmit.innerHTML = textoOriginal;
                btnSubmit.style.background = "";
                fichaForm.reset();
            }, 1000);
        });
    }
});

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

if (fichaForm) {
    fichaForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(fichaForm);
        const dadosFicha = Object.fromEntries(formData.entries());
        const nomePersonagem = dadosFicha.nome || "Ficha_Magica";

        // Feedback visual imediato
        const btnSubmit = fichaForm.querySelector('.btn-magic-submit');
        btnSubmit.innerHTML = "✨ Gerando Imagem... ✨";
        btnSubmit.disabled = true; // Evita múltiplos cliques

        const areaFicha = document.querySelector('#ficha-form');

        // Configurações otimizadas para Web/Vercel
        html2canvas(areaFicha, {
            backgroundColor: "#1a0a1a",
            scale: 2,
            useCORS: true,      // Ajuda a carregar fontes/imagens externas
            allowTaint: true,   // Permite capturar elementos "sujos" por domínios diferentes
            logging: false
        }).then(canvas => {
            try {
                const imgData = canvas.toDataURL("image/png");
                const link = document.createElement('a');
                
                // Força o download no navegador
                link.setAttribute('download', `${nomePersonagem}.png`);
                link.setAttribute('href', imgData);
                document.body.appendChild(link); // Necessário para alguns navegadores
                link.click();
                document.body.removeChild(link);

                // Sucesso
                btnSubmit.innerHTML = "✨ FICHA BAIXADA! ✨";
            } catch (err) {
                console.error("Erro ao gerar imagem:", err);
                alert("Houve um erro ao gerar a imagem. Tente novamente.");
                btnSubmit.innerHTML = "Tentar Novamente";
            }

            // Salvar no LocalStorage e Resetar
            setTimeout(() => {
                btnSubmit.innerHTML = "Despertar Poder ✨";
                btnSubmit.disabled = false;
                fichaForm.reset();
            }, 3000);
        });
    });
}