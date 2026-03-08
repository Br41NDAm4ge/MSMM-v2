document.addEventListener('DOMContentLoaded', () => {
    // 1. SELEÇÃO DE ELEMENTOS
    const btnTitulo = document.getElementById('btn-titulo');
    const fichaForm = document.getElementById('ficha-form');

    // 2. RECUPERAÇÃO DE DADOS (Vindo do carregar.html)
    // Este bloco roda assim que a página 'criar.html' carrega
    const dadosImportados = localStorage.getItem('ficha_importada');
    
    if (dadosImportados && fichaForm) {
        try {
            const dados = JSON.parse(dadosImportados);
            console.log("Magia detectada! Dados da imagem:", dados);

            // Função para preencher os campos com base no atributo 'name' do HTML
            const preencherCampos = (objDados) => {
                for (const campo in objDados) {
                    const input = fichaForm.querySelector(`[name="${campo}"]`);
                    if (input && objDados[campo]) {
                        input.value = objDados[campo];
                        console.log(`Campo [${campo}] preenchido com: ${objDados[campo]}`);
                    }
                }
            };

            preencherCampos(dados);

            // Feedback visual de sucesso na página
            const aviso = document.createElement('div');
            aviso.style = "position:fixed; top:80px; left:50%; transform:translateX(-50%); background:#ff69b4; color:white; padding:12px 25px; border-radius:30px; z-index:1000; box-shadow:0 0 20px #ff69b4; font-weight:600; pointer-events:none;";
            aviso.innerHTML = "✨ Ficha Restaurada com Sucesso!";
            document.body.appendChild(aviso);
            
            setTimeout(() => {
                aviso.style.opacity = '0';
                aviso.style.transition = '1s';
                setTimeout(() => aviso.remove(), 1000);
            }, 3000);

            // Limpa o localStorage para não preencher de novo na próxima visita
            localStorage.removeItem('ficha_importada');

        } catch (erro) {
            console.error("Erro ao processar dados importados:", erro);
        }
    }

    // 3. PARTÍCULAS DE FUNDO (Efeito visual)
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
        criarParticulaFundo();
    }

    // 4. EVENTO DO TÍTULO (Somente na Index)
    if (btnTitulo) {
        btnTitulo.addEventListener('click', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            for (let i = 0; i < 15; i++) {
                criarEstrelaExplosao(x, y);
            }
        });
    }

    // 5. ENVIO DO FORMULÁRIO + DOWNLOAD DA IMAGEM
    if (fichaForm) {
        fichaForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Captura os dados atuais do formulário
            const formData = new FormData(this);
            const dadosFicha = Object.fromEntries(formData.entries());
            const nomePersonagem = dadosFicha.nome || "Garota_Magica";

            const btnSubmit = this.querySelector('.btn-magic-submit');
            btnSubmit.innerHTML = "✨ Gerando Imagem... ✨";
            btnSubmit.disabled = true;

            // Efeito de explosão no centro ao salvar
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            for (let i = 0; i < 25; i++) {
                setTimeout(() => criarEstrelaExplosao(centerX, centerY), i * 30);
            }

            // Inicia a captura da tela com html2canvas
            if (typeof html2canvas !== 'undefined') {
                html2canvas(fichaForm, {
                    backgroundColor: "#1a0a1a",
                    scale: 2, // Melhora a nitidez para o OCR ler depois
                    useCORS: true,
                    allowTaint: true
                }).then(canvas => {
                    const imgData = canvas.toDataURL("image/png");
                    const link = document.createElement('a');
                    link.setAttribute('download', `${nomePersonagem}_ficha.png`);
                    link.setAttribute('href', imgData);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    btnSubmit.innerHTML = "✨ FICHA BAIXADA! ✨";
                    
                    setTimeout(() => {
                        btnSubmit.innerHTML = "Despertar Poder ✨";
                        btnSubmit.disabled = false;
                    }, 3000);
                }).catch(err => {
                    console.error("Erro ao gerar imagem:", err);
                    btnSubmit.disabled = false;
                    btnSubmit.innerHTML = "Erro ao baixar";
                });
            } else {
                alert("Erro: Biblioteca html2canvas não carregada.");
                btnSubmit.disabled = false;
            }
        });
    }
});

// --- FUNÇÕES AUXILIARES ---

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
    estrela.className = `star-click ${cores[Math.floor(Math.random() * 4)]}`;
    const angulo = Math.random() * Math.PI * 2;
    const distancia = Math.random() * 200 + 50;
    const destX = Math.cos(angulo) * distancia + "px";
    const destY = Math.sin(angulo) * distancia + "px";
    estrela.style.left = x + 'px';
    estrela.style.top = y + 'px';
    estrela.style.setProperty('--tx', destX);
    estrela.style.setProperty('--ty', destY);
    document.body.appendChild(estrela);
    setTimeout(() => estrela.remove(), 850);
}