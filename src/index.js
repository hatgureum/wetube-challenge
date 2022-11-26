const recordBtn = document.querySelector("#recordBtn");
const audio = document.querySelector("#audio");

let stream;
let audioFile;
let recorder;
let timeoutId;

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = audioFile;
  a.download = "myAudio.weba";
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  recordBtn.innerText = "Download Recording";
  recordBtn.removeEventListener("click", handleStop);
  recordBtn.addEventListener("click", handleDownload);
  clearTimeout(timeoutId);
  recorder.stop();
};

const handleStart = () => {
  recordBtn.innerText = "Stop Recording";
  recordBtn.removeEventListener("click", handleStart);
  recordBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    audioFile = URL.createObjectURL(event.data);
    audio.srcObject = null;
    audio.src = audioFile;
    audio.loop = true;
    audio.play();
  };
  recorder.start();
  timeoutId = setTimeout(handleStop, 5000);
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });
  audio.srcObject = stream;
};

init();

recordBtn.addEventListener("click", handleStart);
