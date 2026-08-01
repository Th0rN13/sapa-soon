const whepUrl = 'https://sapa-tv.ru/rtc/v1/whep/?app=live&stream=stream1';
const videoElem = document.getElementById('remoteVideo');

async function startWhep() {

  const pc = new RTCPeerConnection();

  pc.addTransceiver('video', { direction: 'recvonly' });
  pc.addTransceiver('audio', { direction: 'recvonly' });

  pc.ontrack = (event) => {
    if (videoElem.srcObject !== event.streams[0]) {
      videoElem.srcObject = event.streams[0];
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
    console.error('Ошибка WHEP:', response.status);
    return;
  }

  const answerSdp = await response.text();
  await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });
}

window.addEventListener("DOMContentLoaded", startWhep);