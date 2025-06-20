// script.js
document.addEventListener('DOMContentLoaded', () => {
    // URL del endpoint de tu Glitch.
    // DEBES reemplazar esto con la URL real de tu proyecto de Glitch.
    // Por ejemplo: 'https://tu-proyecto-de-glitch.glitch.me/check-twitch-status'
    const GLITCH_API_URL = 'https://miniature-alder-wallflower.glitch.me';

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
            const liveChannels = data.live || []; // Asegúrate de que liveChannels sea un array

            twitchButtons.forEach(button => {
                const channelName = button.dataset.channel;
                const liveIndicator = button.querySelector('.live-indicator');

                if (liveChannels.includes(channelName)) {
                    // Si el canal está en vivo, añade la clase 'live'
                    if (liveIndicator && !liveIndicator.classList.contains('live')) {
                        liveIndicator.classList.add('live');
                    }
                } else {
                    // Si no está en vivo, quita la clase 'live'
                    if (liveIndicator && liveIndicator.classList.contains('live')) {
                        liveIndicator.classList.remove('live');
                    }
                }
            });

        } catch (error) {
            console.error('Error al verificar el estado de Twitch:', error);
            // Opcional: mostrar un mensaje de error al usuario o loguearlo
        }
    }

    // Ejecuta la función al cargar la página
    updateTwitchLiveStatus();

    // Actualiza el estado cada 30 segundos (puedes ajustar este tiempo)
    // No hagas las peticiones demasiado frecuentes para no sobrecargar la API ni tu servicio.
    setInterval(updateTwitchLiveStatus, 30 * 1000); // 30 segundos
});