document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('showMessage');
    const musicButton = document.getElementById('showMusic');
    const message = document.querySelector('.message');
    const floatingHearts = document.querySelector('.floating-hearts');
    const card = document.querySelector('.card');
    const audio = document.getElementById('backgroundMusic');
    const stitchContainer = document.querySelector('.stitch-container');
    let isMusicPlaying = false;
    let stitchTimeout;

    // Configurar el audio
    audio.volume = 0.5; // Volumen al 50%
    audio.preload = 'auto'; // Precargar el audio

    // Crear estrellas
    createStars();

    // Efecto de aparición inicial
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);

    button.addEventListener('click', () => {
        message.classList.add('show');
        createHearts();
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);

        // Mostrar Stitch
        stitchContainer.classList.remove('hide');
        stitchContainer.classList.add('show');

        // Ocultar Stitch después de 3 segundos
        clearTimeout(stitchTimeout);
        stitchTimeout = setTimeout(() => {
            stitchContainer.classList.remove('show');
            stitchContainer.classList.add('hide');
        }, 3000);
    });

    // Manejar errores de audio
    audio.addEventListener('error', (e) => {
        console.error('Error al cargar el audio:', e);
        musicButton.style.display = 'none'; // Ocultar el botón si hay error
    });

    musicButton.addEventListener('click', async () => {
        try {
            if (isMusicPlaying) {
                // Fade out
                const fadeOut = setInterval(() => {
                    if (audio.volume > 0.1) {
                        audio.volume -= 0.1;
                    } else {
                        audio.pause();
                        audio.volume = 0.5;
                        clearInterval(fadeOut);
                    }
                }, 100);
                musicButton.classList.remove('playing');
            } else {
                // Fade in
                audio.volume = 0;
                await audio.play();
                const fadeIn = setInterval(() => {
                    if (audio.volume < 0.5) {
                        audio.volume += 0.1;
                    } else {
                        clearInterval(fadeIn);
                    }
                }, 100);
                musicButton.classList.add('playing');
            }
            isMusicPlaying = !isMusicPlaying;
        } catch (error) {
            console.error('Error al reproducir el audio:', error);
            musicButton.style.display = 'none'; // Ocultar el botón si hay error
        }
    });

    function createStars() {
        const starsContainer = document.querySelector('.stars');
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            starsContainer.appendChild(star);
        }
    }

    function createHearts() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '❤️';
                heart.style.position = 'absolute';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = Math.random() * 100 + '%';
                heart.style.fontSize = Math.random() * 20 + 10 + 'px';
                heart.style.opacity = '0';
                heart.style.transform = 'scale(0)';
                heart.style.animation = `float ${Math.random() * 3 + 2}s ease-out`;
                floatingHearts.appendChild(heart);

                // Efecto de aparición suave
                requestAnimationFrame(() => {
                    heart.style.opacity = '1';
                    heart.style.transform = 'scale(1)';
                });

                setTimeout(() => {
                    heart.style.opacity = '0';
                    heart.style.transform = 'scale(0)';
                    setTimeout(() => {
                        heart.remove();
                    }, 300);
                }, 4000);
            }, i * 150);
        }
    }

    // Funcionalidad para mostrar la foto de Yeilym
    const dedication = document.getElementById('dedication');
    const yeilymPhoto = document.getElementById('yeilymPhoto');
    let photoTimeout;

    dedication.addEventListener('click', () => {
        // Limpiar el timeout anterior si existe
        clearTimeout(photoTimeout);
        
        // Mostrar la foto
        yeilymPhoto.classList.add('show');
        
        // Ocultar la foto después de 2 segundos
        photoTimeout = setTimeout(() => {
            yeilymPhoto.classList.remove('show');
        }, 2000);
    });

    // Agregar las animaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 1;
            }
            50% {
                transform: translateY(-50px) rotate(180deg) scale(1.2);
                opacity: 0.8;
            }
            100% {
                transform: translateY(-100px) rotate(360deg) scale(0);
                opacity: 0;
            }
        }

        .card {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            animation: twinkle 1.5s infinite;
        }

        @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
        }
    `;
    document.head.appendChild(style); 
}); 