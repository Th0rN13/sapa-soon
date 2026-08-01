document.addEventListener('DOMContentLoaded', async () => {
  const videoElem = document.getElementById('video');
  const statusElem = document.getElementById('status');

  const whepUrl = 'https://sapa-tv.ru/rtc/v1/whep/?app=live&stream=stream1';

  try {
    const pc = new RTCPeerConnection({
      rtcpMuxPolicy: 'require'
    });

    pc.addTransceiver('video', { direction: 'recvonly' });
    pc.addTransceiver('audio', { direction: 'recvonly' });

    pc.ontrack = (event) => {
      if (videoElem && event.streams && event.streams[0]) {
        videoElem.srcObject = event.streams[0];
        statusElem.innerText = 'Трансляция подключена!';
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
        setTimeout(resolve, 1000);
      }
    });

    const response = await fetch(whepUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/sdp' },
      body: pc.localDescription.sdp
    });

    if (!response.ok) {
      throw new Error(`SRS вернул код: ${response.status}`);
    }

    const answerSdp = await response.text();
    await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });

  } catch (err) {
    console.error(err);
    statusElem.innerText = 'Ошибка: ' + err.message;
  }
});