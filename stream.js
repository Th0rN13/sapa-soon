async function startWhep() {
  const whepUrl = 'https://sapa-tv.ru/rtc/v1/whep/?app=live&stream=stream1';
  const videoElem = document.getElementById('remoteVideo');

  // Обязательно указываем rtcpMuxPolicy: 'require'
  const pc = new RTCPeerConnection({
    rtcpMuxPolicy: 'require'
  });

  pc.addTransceiver('video', { direction: 'recvonly' });
  pc.addTransceiver('audio', { direction: 'recvonly' });

  pc.ontrack = (event) => {
    if (videoElem.srcObject !== event.streams[0]) {
      videoElem.srcObject = event.streams[0];
    }
  };

  let offer = await pc.createOffer();

  // Подстраховка: если браузер не добавил a=rtcp-mux в секции m=video/m=audio
  let sdp = offer.sdp;
  if (!sdp.includes('a=rtcp-mux')) {
    sdp = sdp.replace(/(m=(video|audio) .*\r\n)/g, '$1a=rtcp-mux\r\n');
  }

  await pc.setLocalDescription({ type: 'offer', sdp: sdp });

  const response = await fetch(whepUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/sdp' },
    body: sdp
  });

  if (!response.ok) {
    console.error('Ошибка WHEP:', response.status);
    return;
  }

  const answerSdp = await response.text();
  await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });
}

startWhep();