const player = document.querySelector('.player');
const video = player.querySelector('.player__video');

const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');

const sliders = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');


// ▶️ Play / Pause toggle
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}


// 🔁 Update play/pause button text
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}


// ⏪ ⏩ Skip buttons
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}


// 🎚️ Volume + Speed control
function handleRangeUpdate() {
  video[this.name] = this.value;
}


// 📊 Progress bar update
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}


// 🎯 Scrub video on progress bar click
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}


// =====================
// EVENT LISTENERS
// =====================

// Play/Pause
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// Update button icon
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Progress bar update
video.addEventListener('timeupdate', handleProgress);

// Skip buttons
skipButtons.forEach(button =>
  button.addEventListener('click', skip)
);

// Sliders (volume + speed)
sliders.forEach(slider =>
  slider.addEventListener('input', handleRangeUpdate)
);

// Progress bar click
progress.addEventListener('click', scrub);