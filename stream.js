const HLS_STREAM_URL = "/live/stream1/index.m3u8";

const video = document.getElementById("video");
const statusText = document.getElementById("stream-status");

function startHLS() {
  if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = HLS_STREAM_URL;
    video.addEventListener("loadedmetadata", () => {
      statusText.textContent = "Трансляция активна";
    });
    video.addEventListener("error", () => {
      statusText.textContent = "Ошибка воспроизведения";
    });
  } else if (Hls.isSupported()) {
    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true,

      liveSyncDurationCount: 3,
      liveMaxLatencyDurationCount: 5,
      maxBufferLength: 10,
      maxMaxBufferLength: 20
    }
    );
    hls.loadSource(HLS_STREAM_URL);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      statusText.textContent = "Трансляция активна";
    });
    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        statusText.textContent = "Ошибка: перезапуск...";
        hls.destroy();
        setTimeout(startHLS, 5000);
      }
    });
  } else {
    statusText.textContent = "HLS не поддерживается";
  }
}

window.addEventListener("DOMContentLoaded", startHLS);
