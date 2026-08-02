const videoElem = document.getElementById('video');
const statusElem = document.getElementById('status');

async function startPlayer() {
  if (typeof mpegts !== 'undefined' && mpegts.isSupported()) {
    const videoElement = document.getElementById('videoElement'); // Проверь ID своего <video>

    const player = mpegts.createPlayer({
      type: 'flv',
      isLive: true,
      url: 'https://sapa-tv.ru/live/stream1.flv' // Твой URL FLV-потока
    }, {
      enableStashBuffer: false, // Отключает буферизацию для минимальной задержки (~1 сек)
      liveBufferLatencyChasing: true // Автоматически подтягивает отстающий поток
    });

    player.attachMediaElement(videoElement);
    player.load();
    player.play().catch(e => console.log("Autoplay blocked:", e));
  } else {
    console.error("mpegts.js не загружен или не поддерживается браузером");
  }
}

document.addEventListener('DOMContentLoaded', startPlayer);