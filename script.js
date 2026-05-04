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
openCardBtn.addEventListener("click", () => {
  welcomeScreen.style.display = "none";

  // Pastikan mula dari atas
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

  // Auto-scroll mula selepas kad dibuka
  setTimeout(() => {
    startAutoScroll();
  }, 1800);
});


// AUTO SCROLL UNTUK PHONE & LAPTOP
let autoScrollTimer;
let resumeTimer;
let isAutoScrolling = false;

function startAutoScroll() {
  clearInterval(autoScrollTimer);
  isAutoScrolling = true;

  autoScrollTimer = setInterval(() => {
    window.scrollBy(0, 2); // laju scroll

    const bottomReached =
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;

    if (bottomReached) {
      clearInterval(autoScrollTimer);
      isAutoScrolling = false;
    }
  }, 25);
}

function pauseAutoScroll() {
  if (!isAutoScrolling) return;

  clearInterval(autoScrollTimer);
  isAutoScrolling = false;

  clearTimeout(resumeTimer);
  resumeTimer = setTimeout(() => {
    startAutoScroll();
  }, 3000);
}

// User masih boleh scroll manual
window.addEventListener("wheel", pauseAutoScroll, { passive: true });
window.addEventListener("touchmove", pauseAutoScroll, { passive: true });