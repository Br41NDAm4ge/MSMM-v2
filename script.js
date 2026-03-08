document.addEventListener('DOMContentLoaded', () => {
    const fichaForm = document.getElementById('ficha-form');
    const btnTitulo = document.getElementById('btn-titulo');

    // --- 1. RECUPERAÇÃO DE DADOS (Vindo do carregar.html) ---
    const dadosImportados = localStorage.getItem('ficha_importada');
    if (dadosImportados && fichaForm) {
        const dados = JSON.parse(dadosImportados);
        
        // Preenche os campos usando o atributo 'name'
        Object.keys(dados).forEach(key => {
            const input = fichaForm.querySelector(`[name="${key}"]`);
            if (input) input.value = dados[key];
        });

        localStorage.removeItem('ficha_importada');
        alert("✨ Magia Restaurada! A ficha foi preenchida.");
    }

    // --- 2. EFEITOS VISUAIS (Partículas) ---
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
        criarParticulaFundo();
    }

    if (btnTitulo) {
        btnTitulo.addEventListener('click', (e) => {
            for (let i = 0; i < 15; i++) criarEstrelaExplosao(e.clientX, e.clientY);
        });
    }

    // --- 3. DOWNLOAD DA FICHA (Layout de Exportação) ---
    if (fichaForm) {
        fichaForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const dados = Object.fromEntries(formData.entries());
            const btnSubmit = this.querySelector('.btn-magic-submit');

            // Criar container temporário para o print (Otimizado para OCR)
            const printArea = document.createElement('div');
            printArea.style = "position:absolute; left:-9999px; width:500px; padding:40px; background:white; color:black; font-family:serif; line-height:1.6;";
            
            printArea.innerHTML = `
                <h1 style="border-bottom:2px solid black;">MAGIC ORDEM - FICHA</h1>
                <p><strong>Nome:</strong> ${dados.nome}</p>
                <p><strong>Descrição:</strong> ${dados.descricao}</p>
                <p><strong>Causa:</strong> ${dados.causa}</p>
                <p><strong>Físico:</strong> ${dados.fisico}</p>
                <p><strong>Emocional:</strong> ${dados.emocional}</p>
                <p><strong>Mental:</strong> ${dados.mental}</p>
                <p><strong>Persona:</strong> ${dados.persona}</p>
                <p><strong>Poder:</strong> ${dados.poder}</p>
                <hr>
                <p style="font-size:10px; text-align:center;">Gerado por Magic Ordem System</p>
            `;
            document.body.appendChild(printArea);

            btnSubmit.innerHTML = "✨ Gerando Pergaminho...";

            html2canvas(printArea, { scale: 2 }).then(canvas => {
                const link = document.createElement('a');
                link.download = `${dados.nome || 'ficha'}_magic_ordem.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
                
                document.body.removeChild(printArea);
                btnSubmit.innerHTML = "✨ FICHA BAIXADA!";
                setTimeout(() => btnSubmit.innerHTML = "Despertar Poder ✨", 3000);
            });
        });
    }
});

// Funções Auxiliares
function criarParticulaFundo() {
    const p = document.createElement('div');
    const cores = ['rosa', 'amarelo', 'azul'];
    p.className = `bg-particle ${cores[Math.floor(Math.random() * 3)]}`;
    Object.assign(p.style, {
        width: Math.random() * 3 + 2 + "px", height: Math.random() * 3 + 2 + "px",
        left: Math.random() * 100 + "vw", top: Math.random() * 100 + "vh",
        animationDelay: "-" + (Math.random() * 15) + "s"
    });
    p.style.setProperty('--duration', (Math.random() * 10 + 10) + "s");
    document.body.appendChild(p);
}

function criarEstrelaExplosao(x, y) {
    const s = document.createElement('div');
    s.className = `star-click rosa`;
    const ang = Math.random() * Math.PI * 2;
    const dist = Math.random() * 150 + 50;
    s.style.left = x + 'px'; s.style.top = y + 'px';
    s.style.setProperty('--tx', Math.cos(ang) * dist + "px");
    s.style.setProperty('--ty', Math.sin(ang) * dist + "px");
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 800);
}