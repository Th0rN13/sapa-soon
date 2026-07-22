const STREAM_URL = "/live/stream1/index.m3u8";

const video = document.getElementById("video");
const statusText = document.getElementById("stream-status");

async function startPlayer() {
  shaka.polyfill.installAll();

  if (!shaka.Player.isBrowserSupported()) {
    statusText.textContent = "Плеер не поддерживается";
    return;
  }

  const player = new shaka.Player();

  player.configure({
    manifest: {
      retryParameters: {
        timeout: 30000,
        stallTimeout: 10000,
        connectionTimeout: 15000,
        maxAttempts: 10,
        baseDelay: 500,
        backoffFactor: 2,
        fuzzFactor: 0.5
      }
    },
    streaming: {
      lowLatency: false,
      retryParameters: {
        timeout: 45000,
        stallTimeout: 10000,
        connectionTimeout: 15000,
        maxAttempts: 10,
        baseDelay: 500,
        backoffFactor: 2,
        fuzzFactor: 0.5
      },
      rebufferingGoal: 5,
      segmentPrefetchLimit: 3,
      liveSync: {
        enabled: true,
        targetLatency: 5,
        maxLatency: 20
      },
      inaccurateManifestTolerance: 2,
      updateIntervalSeconds: 1,
      stallEnabled: true,
      stallThreshold: 0.5
    },
    drm: {
      retryParameters: {
        timeout: 30000,
        maxAttempts: 10,
        baseDelay: 500,
        backoffFactor: 2
      }
    }
  });

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
    await player.load(STREAM_URL);
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
