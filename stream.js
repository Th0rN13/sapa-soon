const videoElem = document.getElementById('video');
const statusElem = document.getElementById('status');

async function startPlayer() {
  if (typeof mpegts !== 'undefined' && mpegts.isSupported()) {

    const player = mpegts.createPlayer({
      type: 'flv',
      isLive: true,
      url: 'https://sapa-tv.ru/live/stream1.flv'
    }, {
      enableStashBuffer: false,
      liveBufferLatencyChasing: true
    });

    player.attachMediaElement(videoElem);
    player.load();
    player.play().catch(e => console.log("Autoplay blocked:", e));
  } else {
    console.error("mpegts.js не загружен или не поддерживается браузером");
  }
}

function initChatTabs() {
  const tabs = document.querySelectorAll('.chat-tab');
  const panels = document.querySelectorAll('.chat-panel iframe');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      const name = tab.dataset.chat;
      panels.forEach(p => p.classList.toggle('active', p.dataset.chatPanel === name));
    });
  });
}

document.addEventListener('DOMContentLoaded', startPlayer);
document.addEventListener('DOMContentLoaded', initChatTabs);