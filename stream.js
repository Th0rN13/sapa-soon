const videoEl = document.getElementById('video');
const whepUrl = 'https://sapa-tv.ru/whep/live/stream/whep';

const FORCE_TCP = true;

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

      await new Promise((resolve) => {
        if (pc.iceGatheringState === 'complete') {
          resolve();
        } else {
          const checkState = () => {
            if (pc.iceGatheringState === 'complete') {
              pc.removeEventListener('icegatheringstatechange', checkState);
              resolve();
            }
          };
          pc.addEventListener('icegatheringstatechange', checkState);
        }
      });

      let localSdp = pc.localDescription.sdp;

      if (FORCE_TCP) {
        localSdp = localSdp
          .split('\r\n')
          .filter(line => !line.startsWith('a=candidate:') || line.includes('tcptype'))
          .join('\r\n');
      }

      const response = await fetch(whepUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/sdp' },
        body: localSdp
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
