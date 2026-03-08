document.addEventListener('DOMContentLoaded', () => {
    const fichaForm = document.getElementById('ficha-form');
    const btnTitulo = document.getElementById('btn-titulo');

    // --- 1. RECUPERAÇÃO DE DADOS (Vindo do carregar.html) ---
    const dadosImportados = localStorage.getItem('ficha_importada');
    
    if (dadosImportados && fichaForm) {
        try {
            const dados = JSON.parse(dadosImportados);
            console.log("Magia detectada! Preenchendo formulário...", dados);

            // Preenche cada campo baseado no atributo 'name' do HTML
            Object.keys(dados).forEach(key => {
                const input = fichaForm.querySelector(`[name="${key}"]`);
                if (input && dados[key]) {
                    input.value = dados[key];
                }
            });

            // Feedback visual de que a ficha foi carregada
            const aviso = document.createElement('div');
            aviso.style = "position:fixed; top:80px; left:50%; transform:translateX(-50%); background:#ff69b4; color:white; padding:12px 25px; border-radius:30px; z-index:1000; box-shadow:0 0 20px #ff69b4; font-weight:600;";
            aviso.innerHTML = "✨ Ficha Restaurada com Sucesso!";
            document.body.appendChild(aviso);
            setTimeout(() => aviso.remove(), 4000);

            localStorage.removeItem('ficha_importada');
        } catch (e) {
            console.error("Erro ao importar ficha:", e);
        }
    }

    // --- 2. EFEITOS VISUAIS (Partículas de Fundo) ---
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
        criarParticulaFundo();
    }

    if (btnTitulo) {
        btnTitulo.addEventListener('click', (e) => {
            for (let i = 0; i < 15; i++) criarEstrelaExplosao(e.clientX, e.clientY);
        });
    }

    // --- 3. DOWNLOAD DA FICHA (Layout Carta Colecionável) ---
    if (fichaForm) {
        fichaForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const dados = Object.fromEntries(formData.entries());
            const btnSubmit = this.querySelector('.btn-magic-submit');

            // Criar o Card de RPG Invisível (Otimizado para OCR e Estética)
            const cardPai = document.createElement('div');
            cardPai.id = "area-render-ficha";
            cardPai.style = `
                position: absolute; left: -9999px; 
                width: 450px; min-height: 600px; 
                background: #fdf5e6; padding: 30px; 
                border: 12px solid #2d0a3d;
                font-family: 'Georgia', serif; color: #1a0a1a;
            `;
            
            cardPai.innerHTML = `
                <div style="text-align: center; border-bottom: 2px solid #ff69b4; margin-bottom: 20px; padding-bottom: 10px;">
                    <h1 style="margin: 0; font-size: 28px; color: #4a0e2e;">${dados.nome || 'Sem Nome'}</h1>
                    <small style="color: #ff69b4; font-weight: bold; letter-spacing: 2px;">✦ FICHA MAGIC ORDEM ✦</small>
                </div>

                <div style="margin-bottom: 15px;">
                    <strong style="color: #4a0e2e;">Descrição:</strong> 
                    <p style="margin: 5px 0; font-style: italic; font-size: 14px;">${dados.descricao || '...'}</p>
                </div>

                <div style="background: rgba(255, 105, 180, 0.05); padding: 15px; border: 1px solid #ff69b455; border-radius: 8px; margin-bottom: 15px;">
                    <h3 style="margin: 0 0 10px 0; font-size: 16px; border-bottom: 1px solid #ff69b4;">Atributos</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <span><strong>Físico:</strong> ${dados.fisico}</span>
                        <span><strong>Emocional:</strong> ${dados.emocional}</span>
                        <span><strong>Mental:</strong> ${dados.mental}</span>
                        <span><strong>Persona:</strong> ${dados.persona}</span>
                    </div>
                </div>

                <div style="margin-bottom: 15px;">
                    <strong style="color: #4a0e2e;">Causa:</strong>
                    <p style="margin: 5px 0; font-size: 14px;">${dados.causa || '...'}</p>
                </div>

                <div style="background: white; border-left: 4px solid #ff69b4; padding: 10px; font-size: 14px;">
                    <strong style="color: #4a0e2e;">Poder:</strong>
                    <p style="margin: 5px 0;">${dados.poder || '...'}</p>
                </div>

                <div style="margin-top: 30px; text-align: center; font-size: 10px; color: #9370db; opacity: 0.7;">
                    Documento Mágico Gerado por MSMM Studios
                </div>
            `;

            document.body.appendChild(cardPai);
            btnSubmit.innerHTML = "✨ Selando Contrato... ✨";

            // Captura com html2canvas
            html2canvas(cardPai, { 
                scale: 2, 
                backgroundColor: "#fdf5e6" 
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = `Ficha_${dados.nome || 'Magica'}.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
                
                document.body.removeChild(cardPai);
                btnSubmit.innerHTML = "✨ FICHA BAIXADA! ✨";
                setTimeout(() => btnSubmit.innerHTML = "Despertar Poder ✨", 3000);
            });
        });
    }
});

// --- FUNÇÕES DE APOIO ---
function criarParticulaFundo() {
    const p = document.createElement('div');
    const cores = ['rosa', 'amarelo', 'azul'];
    p.className = `bg-particle ${cores[Math.floor(Math.random() * 3)]}`;
    const size = Math.random() * 3 + 2 + "px";
    Object.assign(p.style, {
        width: size, height: size,
        left: Math.random() * 100 + "vw", top: Math.random() * 100 + "vh",
        animationDelay: "-" + (Math.random() * 15) + "s"
    });
    p.style.setProperty('--duration', (Math.random() * 10 + 10) + "s");
    document.body.appendChild(p);
}

function criarEstrelaExplosao(x, y) {
    const s = document.createElement('div');
    const cores = ['rosa', 'amarelo', 'azul', 'roxo'];
    s.className = `star-click ${cores[Math.floor(Math.random() * 4)]}`;
    const ang = Math.random() * Math.PI * 2;
    const dist = Math.random() * 150 + 50;
    s.style.left = x + 'px'; s.style.top = y + 'px';
    s.style.setProperty('--tx', Math.cos(ang) * dist + "px");
    s.style.setProperty('--ty', Math.sin(ang) * dist + "px");
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 850);
}