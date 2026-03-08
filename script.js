document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleção de Elementos
    const btnTitulo = document.getElementById('btn-titulo');
    const fichaForm = document.getElementById('ficha-form');

    // 2. Verificação de Dados Importados (Vindo do carregar.html)
    const dadosImportados = localStorage.getItem('ficha_importada');
    if (dadosImportados && fichaForm) {
        const dados = JSON.parse(dadosImportados);
        
        // Preenchimento automático dos campos pelo atributo 'name'
        if(dados.nome) fichaForm.nome.value = dados.nome;
        if(dados.descricao) fichaForm.descricao.value = dados.descricao;
        if(dados.causa) fichaForm.causa.value = dados.causa;
        if(dados.fisico) fichaForm.fisico.value = dados.fisico;
        if(dados.emocional) fichaForm.emocional.value = dados.emocional;
        if(dados.mental) fichaForm.mental.value = dados.mental;
        if(dados.persona) fichaForm.persona.value = dados.persona;
        if(dados.poder) fichaForm.poder.value = dados.poder;

        // Limpa o cache de importação após usar
        localStorage.removeItem('ficha_importada');
        console.log("Magia de restauração concluída!");
    }

    // 3. Partículas de Fundo
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
        criarParticulaFundo();
    }

    // 4. Clique no Título (Index)
    if (btnTitulo) {
        btnTitulo.addEventListener('click', (e) => {
            for (let i = 0; i < 15; i++) {
                criarEstrelaExplosao(e.clientX, e.clientY);
            }
        });
    }

    // 5. Envio do Formulário (Criar Ficha + Download)
    if (fichaForm) {
        fichaForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const dadosFicha = Object.fromEntries(formData.entries());
            const nomePersonagem = dadosFicha.nome || "Garota_Magica";

            const btnSubmit = this.querySelector('.btn-magic-submit');
            btnSubmit.innerHTML = "✨ Gerando Imagem... ✨";
            btnSubmit.disabled = true;

            // Efeito de estrelas no centro da tela
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            for (let i = 0; i < 20; i++) {
                setTimeout(() => criarEstrelaExplosao(centerX, centerY), i * 30);
            }

            // Lógica de Download com html2canvas
            if (typeof html2canvas !== 'undefined') {
                html2canvas(fichaForm, {
                    backgroundColor: "#1a0a1a",
                    scale: 2,
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
                        // Opcional: fichaForm.reset();
                    }, 3000);
                });
            } else {
                alert("Erro: Biblioteca de captura não encontrada.");
                btnSubmit.disabled = false;
            }
        });
    }
});

// Funções de Efeitos Visuais
function criarParticulaFundo() {
    const p = document.createElement('div');
    const cores = ['rosa', 'amarelo', 'azul'];
    p.className = `bg-particle ${cores[Math.floor(Math.random() * cores.length)]}`;
    const size = Math.random() * 3 + 1 + "px";
    Object.assign(p.style, {
        width: size, height: size,
        left: Math.random() * 100 + "vw",
        top: Math.random() * 100 + "vh",
        animationDelay: "-" + (Math.random() * 15) + "s"
    });
    p.style.setProperty('--duration', (Math.random() * 12 + 8) + "s");
    document.body.appendChild(p);
}

function criarEstrelaExplosao(x, y) {
    const estrela = document.createElement('div');
    estrela.className = `star-click ${['rosa', 'amarelo', 'azul', 'roxo'][Math.floor(Math.random() * 4)]}`;
    const angulo = Math.random() * Math.PI * 2;
    const dist = Math.random() * 200 + 50;
    estrela.style.left = x + 'px';
    estrela.style.top = y + 'px';
    estrela.style.setProperty('--tx', Math.cos(angulo) * dist + "px");
    estrela.style.setProperty('--ty', Math.sin(angulo) * dist + "px");
    document.body.appendChild(estrela);
    setTimeout(() => estrela.remove(), 850);
}