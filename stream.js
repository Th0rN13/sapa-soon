const STREAM_NAME = "live/stream1-webrtc";

const whepUrl = `${window.location.protocol}//${window.location.host}/webrtc/${STREAM_NAME}/whep`;

const video = document.getElementById("video");
const statusText = document.getElementById("stream-status");
let peerConnection = null;

async function startWebRTC() {
  if (peerConnection) {
    peerConnection.close();
  }

  statusText.textContent = "Подключение...";

  peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  peerConnection.addTransceiver("video", { direction: "recvonly" });
  peerConnection.addTransceiver("audio", { direction: "recvonly" });

  peerConnection.ontrack = (event) => {
    if (video.srcObject !== event.streams[0]) {
      video.srcObject = event.streams[0];
      statusText.textContent = "Трансляция активна";
    }
  };

  try {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    const response = await fetch(whepUrl, {
      method: "POST",
      headers: { "Content-Type": "application/sdp" },
      body: offer.sdp,
    });

    if (!response.ok) {
      throw new Error("Стрим не найден на сервере");
    }

    const answerSdp = await response.text();
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription({
        type: "answer",
        sdp: answerSdp,
      }),
    );
  } catch (error) {
    console.error(error);
    statusText.textContent = "Стрим не активен. Повтор через 5 сек...";
    setTimeout(startWebRTC, 5000);
  }
}

window.addEventListener("DOMContentLoaded", startWebRTC);
