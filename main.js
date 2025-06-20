// main.js
document.addEventListener('DOMContentLoaded', () => {
    // URL del endpoint de tu Glitch.
    // DEBES reemplazar esto con la URL real de tu proyecto de Glitch.
    // Por ejemplo: 'https://tu-proyecto-de-glitch.glitch.me/check-twitch-status'
    const GLITCH_API_URL = 'https://notch-sky-floss.glitch.me';

    // Selecciona todos los botones de Twitch que tienen un atributo data-channel
    const twitchButtons = document.querySelectorAll('.link-button.twitch[data-channel]');

    // Función para actualizar el estado "en vivo"
    async function updateTwitchLiveStatus() {
        try {
            const response = await fetch(GLITCH_API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const liveChannels = data.live || [];

            twitchButtons.forEach(button => {
                const channelName = button.dataset.channel;
                const liveIndicator = button.querySelector('.live-indicator');

                if (liveIndicator) {
                    if (liveChannels.includes(channelName)) {
                        liveIndicator.classList.remove('offline');
                        liveIndicator.classList.add('live');
                    } else {
                        liveIndicator.classList.remove('live');
                        liveIndicator.classList.add('offline');
                    }
                }
            });

        } catch (error) {
            console.error('Error al verificar el estado de Twitch:', error);
            // Si hay un error al obtener el estado, mostramos todos los indicadores como offline
            twitchButtons.forEach(button => {
                const liveIndicator = button.querySelector('.live-indicator');
                if (liveIndicator) {
                    liveIndicator.classList.remove('live');
                    liveIndicator.classList.add('offline');
                }
            });
        }
    }

    // Ejecuta la función al cargar la página
    updateTwitchLiveStatus();

    // Actualiza el estado cada 30 segundos
    setInterval(updateTwitchLiveStatus, 30 * 1000);
});