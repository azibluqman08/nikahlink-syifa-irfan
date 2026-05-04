// Tukar tarikh majlis dekat sini
const weddingDate = new Date("July 4, 2026 11:30:00").getTime();

const countdownFunction = setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    clearInterval(countdownFunction);

    document.getElementById("days").innerHTML = "00";
    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = "00";

    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}, 1000);

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const welcomeScreen = document.getElementById("welcomeScreen");
const openCardBtn = document.getElementById("openCardBtn");

let isPlaying = false;
let autoScrollRunning = false;
let autoScrollPaused = false;
let resumeTimer = null;

musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    musicBtn.innerHTML = "▶ Play Music";
    isPlaying = false;
  } else {
    music.play();
    musicBtn.innerHTML = "⏸ Pause Music";
    isPlaying = true;
  }
});

openCardBtn.addEventListener("click", () => {
  welcomeScreen.style.display = "none";
  window.scrollTo(0, 0);

  music.play()
    .then(() => {
      musicBtn.innerHTML = "⏸ Pause Music";
      isPlaying = true;
    })
    .catch(() => {
      musicBtn.innerHTML = "▶ Play Music";
      isPlaying = false;
    });

  setTimeout(() => {
    startAutoScroll();
  }, 1800);
});

function startAutoScroll() {
  autoScrollRunning = true;
  autoScrollPaused = false;

  function step() {
    if (!autoScrollRunning) return;

    if (!autoScrollPaused) {
      window.scrollTo(0, window.scrollY + 2);
    }

    const bottomReached =
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;

    if (bottomReached) {
      autoScrollRunning = false;
      return;
    }

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function pauseAutoScroll() {
  if (!autoScrollRunning) return;

  autoScrollPaused = true;
  clearTimeout(resumeTimer);

  resumeTimer = setTimeout(() => {
    autoScrollPaused = false;
  }, 3500);
}

window.addEventListener("wheel", pauseAutoScroll, { passive: true });
window.addEventListener("touchmove", pauseAutoScroll, { passive: true });