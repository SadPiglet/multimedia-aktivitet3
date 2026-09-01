const video = document.querySelector("#video");
const audio = document.querySelector("#audio");

const videoPlayBtn = document.querySelector("#videoPlayBtn");
const audioPlayBtn = document.querySelector("#audioPlayBtn");
const audioVolume = document.querySelector("#audioVolume");
const audioMute = document.querySelector("#audioMute");
const audioProgress = document.querySelector("#audioProgress");
const videoProgress = document.querySelector("#videoProgress");

// Funktion för att spela upp videon och toggla "Pause"/"Play" samt aria-labels
function playVideo() {
  if (video.paused) {
    video.play();
    videoPlayBtn.textContent = "Pause";
    videoPlayBtn.setAttribute("aria-label", "Pause");
  } else {
    video.pause();
    videoPlayBtn.textContent = "Play";
    videoPlayBtn.setAttribute("aria-label", "Play");
  }
}

videoPlayBtn.addEventListener("click", playVideo);

// Funktion för att spela audio och toggla "Pause"/"Play" samt aria-labels
function playAudio() {
  if (audio.paused) {
    audio.play();
    audioPlayBtn.textContent = "Pause";
    audioPlayBtn.setAttribute("aria-label", "Pause");
  } else {
    audio.pause();
    audioPlayBtn.textContent = "Play";
    audioPlayBtn.setAttribute("aria-label", "Play");
  }
}

audioPlayBtn.addEventListener("click", playAudio);


// Funktion för att ändra ljud
function changeVolume() {
  audio.volume = audioVolume.value / 100;
}

audioVolume.addEventListener("input", changeVolume);

// Mute knapp
function muteAudio() {
  if (audio.muted) {
    audio.muted = false;
    audioMute.textContent = "Mute";
    audioMute.setAttribute("aria-label", "Mute");
  } else {
    audio.muted = true;
    audioMute.textContent = "Unmute";
    audioMute.setAttribute("aria-label", "Unmute");
  }
}

audioMute.addEventListener("click", muteAudio);

// Funktion för att uppdatera progress bar för video
video.addEventListener("timeupdate", updateVideoProgress);

function updateVideoProgress() {
  const progress = (video.currentTime / video.duration) * 100;
  videoProgress.value = progress;
}

videoProgress.addEventListener("input", seekVideo);

function seekVideo() {
  const seekTime = (videoProgress.value / 100) * video.duration;
  video.currentTime = seekTime;
}