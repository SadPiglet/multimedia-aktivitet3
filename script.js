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

// Funktion för att uppdatera progress bar för audio
audio.addEventListener("timeupdate", updateAudioProgress);

function updateAudioProgress() {
  const progress = (audio.currentTime / audio.duration) * 100;
  audioProgress.value = progress;
}

audioProgress.addEventListener("input", seekAudio);

function seekAudio() {
  const seekTime = (audioProgress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
}

video.addEventListener("ended", () => {
  videoPlayBtn.textContent = "Play";
  videoPlayBtn.setAttribute("aria-label", "Play");
});

audio.addEventListener("ended", () => {
  audioPlayBtn.textContent = "Play";
  audioPlayBtn.setAttribute("aria-label", "Play");
});


// Canvas
const canvas = document.querySelector("#canvas");

const canvasBtn = document.querySelector("#canvasBtn");
const ctx = canvas.getContext("2d");

let moonX = 500;

// Stjärnor
const stars = [
  { x: 65, y: 55, radius: 2 },
  { x: 145, y: 105, radius: 1 },
  { x: 235, y: 42, radius: 1.5 },
  { x: 315, y: 85, radius: 2 },
  { x: 430, y: 50, radius: 1 },
  { x: 555, y: 115, radius: 1.5 },
  { x: 490, y: 155, radius: 1 },
  { x: 190, y: 155, radius: 2 }
];

canvasBtn.addEventListener("click", () => {
  moonX += 20;

  if (moonX > canvas.width + 40) {
    moonX = -40;
  }

  drawScene();
});

function drawScene() {
    // Canvas funktionalitet
  ctx.fillStyle = "#071923";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Stjärnor

  ctx.fillStyle = "#fff";

  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  // Måne

  ctx.beginPath();
  ctx.arc(moonX, 100, 40, 0, Math.PI * 2);

  ctx.fillStyle = "#f5f3ce";
  ctx.shadowBlur = 40;
  ctx.shadowColor = "#e8edf0";

  ctx.fill();

  // Dimma
  const fog1 = ctx.createRadialGradient(180, 215, 5, 180, 215, 100);

  fog1.addColorStop(0, "rgba(80, 105, 115, 0.22)");
  fog1.addColorStop(0.6, "rgba(80, 105, 115, 0.10)");
  fog1.addColorStop(1, "rgba(80, 105, 115, 0)");

  ctx.beginPath();
  ctx.arc(180, 215, 100, 0, Math.PI * 2);
  ctx.fillStyle = fog1;
  ctx.fill();


  const fog2 = ctx.createRadialGradient(320, 210, 5, 320, 210, 120);

  fog2.addColorStop(0, "rgba(80, 105, 115, 0.25)");
  fog2.addColorStop(0.6, "rgba(80, 105, 115, 0.12)");
  fog2.addColorStop(1, "rgba(80, 105, 115, 0)");

  ctx.beginPath();
  ctx.arc(320, 210, 120, 0, Math.PI * 2);
  ctx.fillStyle = fog2;
  ctx.fill();


  const fog3 = ctx.createRadialGradient(480, 215, 5, 480, 215, 110);

  fog3.addColorStop(0, "rgba(80, 105, 115, 0.20)");
  fog3.addColorStop(0.6, "rgba(80, 105, 115, 0.08)");
  fog3.addColorStop(1, "rgba(80, 105, 115, 0)");

  ctx.beginPath();
  ctx.arc(480, 215, 110, 0, Math.PI * 2);
  ctx.fillStyle = fog3;
  ctx.fill();


  //horisonten
  const seaGradient = ctx.createLinearGradient(0, 200, 0, 360);

  seaGradient.addColorStop(0, "#16343e");
  seaGradient.addColorStop(0.2, "#102d38");
  seaGradient.addColorStop(1, "#0b2733");

  ctx.fillStyle = seaGradient;
  ctx.fillRect(0, 200, canvas.width, 160);

  // Våglinjer
  ctx.beginPath();

  ctx.moveTo(0, 250);

  ctx.bezierCurveTo(70, 235, 110, 265, 170, 250);
  ctx.bezierCurveTo(230, 235, 280, 270, 340, 250);
  ctx.bezierCurveTo(400, 235, 450, 265, 510, 250);
  ctx.bezierCurveTo(560, 240, 600, 260, 640, 250);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#2f4951";
  ctx.stroke();



  ctx.beginPath();

  ctx.moveTo(30, 280);

  ctx.bezierCurveTo(80, 270, 120, 290, 180, 280);
  ctx.bezierCurveTo(240, 265, 290, 295, 350, 280);
  ctx.bezierCurveTo(410, 270, 450, 288, 510, 280);
  ctx.bezierCurveTo(550, 272, 590, 290, 630, 280);

  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "#21373c";

  ctx.stroke();


  ctx.beginPath();

  ctx.moveTo(0, 320);

  ctx.bezierCurveTo(80, 300, 120, 340, 190, 320);
  ctx.bezierCurveTo(260, 295, 310, 345, 380, 320);
  ctx.bezierCurveTo(450, 300, 500, 340, 570, 320);
  ctx.bezierCurveTo(600, 310, 620, 330, 640, 320);

  ctx.lineWidth = 3;
  ctx.strokeStyle = "#182f35";

  ctx.stroke();

  // månens reflektion
  const moonReflection = ctx.createLinearGradient(0, 240, 0, 330);

  moonReflection.addColorStop(0, "rgba(159, 191, 199, 0.8)");
  moonReflection.addColorStop(0.5, "rgba(159, 191, 199, 0.4)");
  moonReflection.addColorStop(1, "rgba(159, 191, 199, 0)");

  ctx.beginPath();

  ctx.moveTo(moonX - 20, 245);
  ctx.lineTo(moonX + 20, 245);

  ctx.moveTo(moonX - 35, 258);
  ctx.lineTo(moonX + 35, 258);

  ctx.moveTo(moonX - 25, 272);
  ctx.lineTo(moonX + 25, 272);

  ctx.moveTo(moonX - 40, 287);
  ctx.lineTo(moonX + 40, 287);

  ctx.moveTo(moonX - 20, 302);
  ctx.lineTo(moonX + 30, 302);

  ctx.moveTo(moonX - 30, 318);
  ctx.lineTo(moonX + 20, 318);

  ctx.lineWidth = 2;
  ctx.strokeStyle = moonReflection;

  ctx.shadowBlur = 8;
  ctx.shadowColor = "#9fbfc7";

  ctx.stroke();

  ctx.shadowBlur = 0;


  // Dimma 2
  const seaFog = ctx.createRadialGradient(320, 245, 10, 320, 245, 220);

  seaFog.addColorStop(0, "rgba(120, 145, 150, 0.08)");
  seaFog.addColorStop(0.5, "rgba(120, 145, 150, 0.04)");
  seaFog.addColorStop(1, "rgba(120, 145, 150, 0)");

  ctx.fillStyle = seaFog;
  ctx.fillRect(0, 200, canvas.width, 160);

}

drawScene();