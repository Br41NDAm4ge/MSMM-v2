document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const status = document.getElementById('status');

    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) processarFicha(e.target.files[0]);
    });

    // Eventos de Drag and Drop
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drop-zone--over'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drop-zone--over'));
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drop-zone--over');
        if (e.dataTransfer.files.length) processarFicha(e.dataTransfer.files[0]);
    });

    async function processarFicha(file) {
        status.innerHTML = "✨ Lendo pergaminho antigo...";
        
        try {
            // Usando Tesseract para ler a imagem
            const { data: { text } } = await Tesseract.recognize(file, 'por');
            console.log("Texto extraído:", text);

            const dados = {
                nome: extrairCampo(text, "Nome"),
                descricao: extrairCampo(text, "Descrição"),
                causa: extrairCampo(text, "Causa"),
                fisico: extrairCampo(text, "Físico"),
                emocional: extrairCampo(text, "Emocional"),
                mental: extrairCampo(text, "Mental"),
                persona: extrairCampo(text, "Persona"),
                poder: extrairCampo(text, "Poder")
            };

            // Salva e redireciona
            localStorage.setItem('ficha_importada', JSON.stringify(dados));
            status.innerHTML = "✅ Ficha validada! Redirecionando...";
            setTimeout(() => window.location.href = 'criar.html', 1000);

        } catch (error) {
            console.error(error);
            status.innerHTML = "❌ Erro ao ler a imagem. Use o PNG original!";
        }
    }

    function extrairCampo(texto, campo) {
        // Busca o campo e ignora maiúsculas/minúsculas
        const regex = new RegExp(`${campo}:?\\s*(.*)`, 'i');
        const match = texto.match(regex);
        return match ? match[1].split('\n')[0].trim() : "";
    }
});