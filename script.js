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
    }, 1000);
}, 1500);

// Botão "Começar"
let player;
let videoIdAtual = 'yQFImndjBBw';

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtubePlayer', {
        height: '0',
        width: '0',
        videoId: '', // Inicialmente vazio
        playerVars: {
            autoplay: 0,
            controls: 0,
            modestbranding: 1,
        }
    });
}

// Quando o botão "Começar" for clicado
document.getElementById('playBtn').addEventListener('click', () => {
    if (player && videoIdAtual) {
        player.loadVideoById(videoIdAtual);
        document.getElementById('overlay').style.display = 'none';
    } else {
        alert("Escolha uma música primeiro!");
    }
});

// Controle do menu de áudio
const audioControl = document.getElementById('audioControl');
const audioMenu = document.getElementById('audioMenu');

audioControl.addEventListener('click', () => {
    audioMenu.classList.toggle('show');
});

// Trocar música pelo ID do vídeo do YouTube
function trocarMusica(videoId) {
    videoIdAtual = videoId;
    if (player && typeof player.loadVideoById === 'function') {
        player.loadVideoById(videoId);
    }
    audioMenu.classList.remove('show');
}
