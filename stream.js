const videoElem = document.getElementById('video');
const statusElem = document.getElementById('status');

async function startPlayer() {
  if (mpegts.js.isSupported()) {
    const player = mpegts.createPlayer({
      type: 'flv',
      isLive: true,
      url: 'https://sapa-tv.ru/live/stream1.flv'
    });
    player.attachMediaElement(videoElem);
    player.load();
    player.play();
  }
}

document.addEventListener('DOMContentLoaded', startPlayer);