// main.js

async function checkLiveStatus() {
  try {
    const response = await fetch("https://mulberry-gusty-replace.glitch.me/check-twitch-status");
    const data = await response.json();
    const liveChannels = data.live;

    // Obtenemos todos los elementos con data-channel
    const channelLinks = document.querySelectorAll('[data-channel]');

    channelLinks.forEach(link => {
      const channel = link.getAttribute("data-channel");
      const indicator = link.querySelector(".live-indicator");

      if (!indicator) return; // Si no hay indicador, salir

      if (liveChannels.includes(channel)) {
        // EN VIVO
        indicator.classList.remove("offline");
        indicator.classList.add("live");
      } else {
        // OFFLINE
        indicator.classList.remove("live");
        indicator.classList.add("offline");
      }
    });
  } catch (error) {
    console.error("Error al obtener estado de Twitch:", error);
  }
}

checkLiveStatus();
// Repetimos cada minuto
setInterval(checkLiveStatus, 60000);