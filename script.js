const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');

const sliders = player.querySelectorAll('.player__slider');

const skipButtons = player.querySelectorAll('[data-skip]');


// Toggle Play/Pause
function togglePlay() {

  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}


// Update Button
function updateButton() {

  toggle.textContent = video.paused ? '►' : '❚ ❚';
}


// Skip
function skip() {

  video.currentTime += parseFloat(this.dataset.skip);
}


// Handle Range Inputs
function handleRangeUpdate() {

  video[this.name] = this.value;
}


// Update Progress Bar
function handleProgress() {

  const percent =
    (video.currentTime / video.duration) * 100;

  progressFilled.style.flexBasis = `${percent}%`;
}


// Scrub
function scrub(e) {

  const scrubTime =
    (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = scrubTime;
}


// Event Listeners
video.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);

video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button =>
  button.addEventListener('click', skip)
);

sliders.forEach(slider =>
  slider.addEventListener('change', handleRangeUpdate)
);

sliders.forEach(slider =>
  slider.addEventListener('mousemove', handleRangeUpdate)
);

progress.addEventListener('click', scrub);