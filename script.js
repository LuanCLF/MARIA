// Gerar imagens aleatórias no mosaico
const imagens = [];
const totalImagens = 72;
for (let i = 1; i <= totalImagens; i++) {
    imagens.push(`imagens/image${i}.jpg`);
}

const numCelas = 28; // 7 colunas x 4 linhas
const container = document.getElementById('mosaico');

for (let i = 0; i < numCelas; i++) {
    const img = document.createElement('img');
    img.src = imagens[Math.floor(Math.random() * imagens.length)];
    container.appendChild(img);
}

setInterval(() => {
    const allImgs = document.querySelectorAll('#mosaico img');
    const index = Math.floor(Math.random() * allImgs.length);

    const imagensAtuais = Array.from(allImgs).map(img => {
        return img.src.split('/').pop();
    });

    let novaImagem;
    let tentativas = 0;
    const maxTentativas = 20;

    do {
        const candidata = imagens[Math.floor(Math.random() * imagens.length)];
        novaImagem = candidata.split('/').pop();
        tentativas++;
    } while (imagensAtuais.includes(novaImagem) && tentativas < maxTentativas);

    const novaSrcCompleta = `imagens/${novaImagem}`;

    allImgs[index].style.opacity = 0;
    setTimeout(() => {
        allImgs[index].src = novaSrcCompleta;
        allImgs[index].style.opacity = 1;
    }, 1500);
}, 1500);

// Botão "Começar"
document.getElementById('playBtn').addEventListener('click', () => {
    const musica = document.getElementById('musica');
    musica.play().then(() => {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('audioWrapper').style.display = 'block';
    }).catch((err) => {
        console.error('Erro ao tentar tocar áudio:', err);
    });
});

// Controle de áudio (abrir/fechar menu com clique)
const audioControl = document.getElementById('audioControl');
const audioMenu = document.getElementById('audioMenu');

audioControl.addEventListener('click', () => {
    audioMenu.classList.toggle('show'); // troca a classe 'show'
});

// Trocar música
function trocarMusica(src) {
    const musica = document.getElementById('musica');
    const wasPlaying = !musica.paused;
    musica.pause();
    musica.src = src;
    if (wasPlaying) {
        musica.play();
    }
    audioMenu.classList.remove('show'); // fecha o menu depois de clicar
}