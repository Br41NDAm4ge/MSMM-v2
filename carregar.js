document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const status = document.getElementById('status');

    // Click para abrir seletor de arquivo
    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (fileInput.files.length) processarImagem(fileInput.files[0]);
    });

    // Drag and Drop Effects
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drop-zone--over');
    });

    ['dragleave', 'dragend'].forEach(type => {
        dropZone.addEventListener(type, () => dropZone.classList.remove('drop-zone--over'));
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drop-zone--over');
        if (e.dataTransfer.files.length) {
            processarImagem(e.dataTransfer.files[0]);
        }
    });

    async function processarImagem(file) {
        if (!file.type.includes('image')) {
            status.innerHTML = "❌ Por favor, envie uma imagem PNG.";
            return;
        }

        status.innerHTML = "✨ Decifrando pergaminho (Lendo imagem)...";
        
        try {
            // Inicializa o Tesseract (Língua Portuguesa)
            const result = await Tesseract.recognize(file, 'por');
            const textoLido = result.data.text;
            
            console.log("Texto detectado:", textoLido);

            // Extração de dados via Regex
            const dados = {
                nome: extrairInfo(textoLido, ["Nome", "Personagem"]),
                descricao: extrairInfo(textoLido, ["Descrição", "Identidade"]),
                causa: extrairInfo(textoLido, ["Causa", "Objetivo"]),
                fisico: extrairNumero(textoLido, "Físico"),
                emocional: extrairNumero(textoLido, "Emocional"),
                mental: extrairNumero(textoLido, "Mental"),
                persona: extrairNumero(textoLido, "Persona"),
                poder: extrairInfo(textoLido, ["Poder", "Essência"])
            };

            // Salva para a página criar.html ler
            localStorage.setItem('ficha_importada', JSON.stringify(dados));
            
            status.innerHTML = "✅ Magia reconhecida! Redirecionando...";
            setTimeout(() => {
                window.location.href = 'criar.html';
            }, 1500);

        } catch (error) {
            console.error("Erro no OCR:", error);
            status.innerHTML = "❌ Erro ao ler imagem. Tente uma foto mais clara.";
        }
    }

    // Funções auxiliares para limpar o texto lido
    function extrairInfo(texto, chaves) {
        for (let chave of chaves) {
            const regex = new RegExp(`${chave}[:\\s]+([^\\n]+)`, 'i');
            const match = texto.match(regex);
            if (match) return match[1].trim();
        }
        return "";
    }

    function extrairNumero(texto, chave) {
        const regex = new RegExp(`${chave}[:\\s]+(\\d+)`, 'i');
        const match = texto.match(regex);
        return match ? match[1] : "0";
    }
});