const video = document.querySelector("video");
const videoController = document.getElementById("videoController");
const psBtn = videoController.querySelector("#playPauseBtn");
const volumeBtn = videoController.querySelector("#volume");
const volumeRange = videoController.querySelector("#volumeRange");
const currentTime = document.querySelector("#currentTime");
const totalTime = document.querySelector("#totalTime");
const timeline = document.querySelector("#timeline");
const fullScreen = document.querySelector("#fullScreen");
const videoContainer = document.querySelector("#videoContainer");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayAndStop = () => {
  if (video.paused) {
    video.play();
    psBtn.className = "fas fa-pause";
  } else {
    video.pause();
    psBtn.className = "fas fa-play";
  }
};

const handleSound = () => {
  if (video.muted) {
    video.muted = false;
    volumeRange.value = volumeValue;
    volumeBtn.className = "fas fa-volume-up";
  } else {
    video.muted = true;
    volumeRange.value = 0;
    volumeBtn.className = "fas fa-volume-mute";
  }
};

const handleVolume = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    volumeBtn.className = "fas fa-volume-mute";
  }
  if (value === "0") {
    volumeBtn.className = "fas fa-volume-off";
  } else {
    volumeBtn.className = "fas fa-volume-up";
  }
  video.volume = volumeValue = value;
};

//================================================================

const formatTime = (second) =>
  new Date(Math.floor(second) * 1000).toISOString().substring(14, 19);
const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(video.duration);
  timeline.max = video.duration;
};
const handleTimeupdate = () => {
  currentTime.innerText = formatTime(video.currentTime);
  timeline.value = video.currentTime;
};

const handleTimelineInput = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    fullScreen.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreen.classList = "fas fa-compress";
  }
};

const handleKeydown = (event) => {
  switch (event.keyCode) {
    case 70: // F
      handleFullScreen();
      break;
    case 32: // SPACE
      handlePlayAndStop();
      break;
    case 27: // ESC
      if (document.fullscreenElement) {
        document.exitFullscreen();
        fullScreen.classList = "fas fa-expand";
      }
      break;
    case 77: // M
      handleSound();
      break;
    case 37: // left arrow
      video.currentTime -= 5;
      break;
    case 39: // right arrow
      video.currentTime += 5;
      break;
    default:
      break;
  }
};

psBtn.addEventListener("click", handlePlayAndStop);
volumeBtn.addEventListener("click", handleSound);
volumeRange.addEventListener("input", handleVolume);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeupdate);
timeline.addEventListener("input", handleTimelineInput);
fullScreen.addEventListener("click", handleFullScreen);
window.addEventListener("keydown", handleKeydown);
