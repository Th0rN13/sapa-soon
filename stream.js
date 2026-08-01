const video = document.getElementById("video");
const videoEl = document.getElementById('video');
// const statusText = document.getElementById("stream-status");
const whepUrl = 'https://sapa-tv.ru/whep/live/stream/whep';

async function startPlayer() {

  async function startWhep() {
    try {
      const pc = new RTCPeerConnection({
        iceServers: []
      });

      pc.addTransceiver('video', { direction: 'recvonly' });
      pc.addTransceiver('audio', { direction: 'recvonly' });

      pc.ontrack = (event) => {
        if (videoEl.srcObject !== event.streams[0]) {
          videoEl.srcObject = event.streams[0];
          console.log('WHEP Поток успешно получен!');
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const response = await fetch(whepUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/sdp' },
        body: offer.sdp
      });

      if (!response.ok) {
        throw new Error(`MediaMTX ответил ошибкой: ${response.status}`);
      }

      const answerSdp = await response.text();
      await pc.setRemoteDescription({
        type: 'answer',
        sdp: answerSdp
      });

    } catch (err) {
      console.error('Ошибка при запуске WHEP плеера:', err);
    }
  }

  startWhep();
}

window.addEventListener("DOMContentLoaded", startPlayer);
