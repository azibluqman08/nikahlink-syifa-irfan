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
  }, 1500);
});

let autoScrollRunning = false;

function startAutoScroll() {
  autoScrollRunning = true;

  function scrollStep() {
    if (!autoScrollRunning) return;

    const page = document.documentElement || document.body;

    page.scrollTop += 2; // laju scroll, boleh naikkan ke 1.5 atau 2

    const bottomReached =
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;

    if (bottomReached) {
      autoScrollRunning = false;
      return;
    }

    requestAnimationFrame(scrollStep);
  }

  requestAnimationFrame(scrollStep);
}