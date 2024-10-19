document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('.btn-neon');
    
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.1)';
        });
        
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const href = button.getAttribute('href');
            window.open(href, '_blank');
        });

        const text = button.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}:"<>?|[];\',./`~';
        
        button.addEventListener('mouseover', function() {
            let iteration = 0;
            const interval = setInterval(() => {
                button.textContent = button.textContent.split('')
                    .map((letter, index) => {
                        if(index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                if(iteration >= text.length) clearInterval(interval);
                
                iteration += 1 / 3;
            }, 30);
        });

        button.addEventListener('mouseout', function() {
            button.textContent = text;
        });
    });

    // Player de música
    const playlist = [
        { title: "Dark", file: "Dark.mp3" },
        { title: "Música 2", file: "caminho/para/musica2.mp3" },
        { title: "Música 3", file: "caminho/para/musica3.mp3" },
        // Adicione mais músicas conforme necessário
    ];

    let currentTrack = 0;
    const audio = new Audio();
    const playPauseBtn = document.getElementById('play-pause');
    const nextTrackBtn = document.getElementById('next-track');
    const nowPlaying = document.getElementById('now-playing');
    const volumeControl = document.getElementById('volume-control');

    function loadTrack(trackIndex) {
        audio.src = playlist[trackIndex].file;
        nowPlaying.textContent = `Tocando: ${playlist[trackIndex].title}`;
    }

    function playPause() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = "Pause";
        } else {
            audio.pause();
            playPauseBtn.textContent = "Play";
        }
    }

    function nextTrack() {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
        audio.play();
        playPauseBtn.textContent = "Pause";
    }

    function setVolume() {
        audio.volume = volumeControl.value;
        volumeControl.style.setProperty('--volume', (volumeControl.value * 100) + '%');
    }

    playPauseBtn.addEventListener('click', playPause);
    nextTrackBtn.addEventListener('click', nextTrack);
    audio.addEventListener('ended', nextTrack);
    volumeControl.addEventListener('input', setVolume);

    // Carrega a primeira música e define o volume inicial
    loadTrack(currentTrack);
    setVolume();

    // Garanta que o vídeo de fundo comece a ser reproduzido
    const video = document.getElementById('background-video');
    video.play().catch(error => {
        console.error("Erro ao iniciar o vídeo:", error);
    });

    // Adicione este evento para atualizar a aparência ao mover o controle
    volumeControl.addEventListener('input', function() {
        this.style.setProperty('--volume', (this.value * 100) + '%');
    });

    function showRandomError() {
        const buttons = document.querySelectorAll('.btn-neon');
        const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
        const originalText = randomButton.textContent;
        
        randomButton.textContent = 'Error';
        randomButton.style.color = '#ff0000';
        randomButton.style.textShadow = '0 0 5px #ff0000, 0 0 10px #ff0000';
        
        setTimeout(() => {
            randomButton.textContent = originalText;
            randomButton.style.color = '';
            randomButton.style.textShadow = '';
        }, 1000);
    }

    // Executar a função a cada 10 segundos
    setInterval(showRandomError, 10000);
});
