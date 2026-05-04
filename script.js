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

let isPlaying = false;

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

const welcomeScreen = document.getElementById("welcomeScreen");
const openCardBtn = document.getElementById("openCardBtn");

openCardBtn.addEventListener("click", () => {
  welcomeScreen.style.display = "none";

  music.play()
    .then(() => {
      musicBtn.innerHTML = "⏸ Pause Music";
      isPlaying = true;
    })
    .catch(() => {
      musicBtn.innerHTML = "▶ Play Music";
      isPlaying = false;
    });
});
// Auto-scroll smooth untuk phone & laptop
let autoScrollFrame;
let autoScrollActive = false;
let lastTime = null;
let pauseTimeout;

const speed = 45; // pixel per second. Naikkan kalau nak lebih laju, contoh 45

function autoScrollStep(timestamp) {
  if (!autoScrollActive) return;

  if (!lastTime) lastTime = timestamp;
  const delta = timestamp - lastTime;
  lastTime = timestamp;

  window.scrollBy(0, (speed * delta) / 1000);

  const sampaiBawah =
    window.innerHeight + window.scrollY >= document.body.scrollHeight - 5;

  if (sampaiBawah) {
    autoScrollActive = false;
    return;
  }

  autoScrollFrame = requestAnimationFrame(autoScrollStep);
}

function startAutoScroll() {
  cancelAnimationFrame(autoScrollFrame);
  autoScrollActive = true;
  lastTime = null;
  autoScrollFrame = requestAnimationFrame(autoScrollStep);
}

function pauseThenResumeAutoScroll() {
  if (!autoScrollActive) return;

  autoScrollActive = false;
  cancelAnimationFrame(autoScrollFrame);

  clearTimeout(pauseTimeout);
  pauseTimeout = setTimeout(() => {
    startAutoScroll();
  }, 2500);
}

// Start selepas tekan Buka Kad
const autoOpenBtn = document.getElementById("openCardBtn");

if (autoOpenBtn) {
  autoOpenBtn.addEventListener("click", () => {
    setTimeout(() => {
      startAutoScroll();
    }, 1500);
  });
}

// Pause hanya bila user scroll manual, bukan masa tekan Buka Kad
window.addEventListener("wheel", pauseThenResumeAutoScroll, { passive: true });
window.addEventListener("touchmove", pauseThenResumeAutoScroll, { passive: true });