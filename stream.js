const video = document.getElementById("video");
const statusText = document.getElementById("stream-status");
const whepUrl = 'http://195.19.7.36:8889/live/stream/whep';

async function startPlayer() {
  shaka.polyfill.installAll();

  if (!shaka.Player.isBrowserSupported()) {
    statusText.textContent = "Плеер не поддерживается";
    return;
  }

  const player = new shaka.Player();

  player.addEventListener("error", (event) => {
    const error = event.detail;
    if (error.severity === shaka.util.Error.Severity.CRITICAL) {
      statusText.textContent = "Ошибка: перезапуск...";
      player.destroy();
      setTimeout(startPlayer, 5000);
    }
  });

  try {
    await player.attach(video);
    await player.load(whepUrl, null, 'application/sdp');
    statusText.textContent = "Трансляция активна";
  } catch (e) {
    if (e.code && e.severity === shaka.util.Error.Severity.CRITICAL) {
      statusText.textContent = "Ошибка: перезапуск...";
      player.destroy();
      setTimeout(startPlayer, 5000);
    } else {
      statusText.textContent = "Ошибка воспроизведения";
    }
  }
}

window.addEventListener("DOMContentLoaded", startPlayer);
