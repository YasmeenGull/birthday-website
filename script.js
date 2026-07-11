"use strict";

const siteConfig = {
  birthdayDate: "2004-07-31T00:00:00",
  secretCode: "forever",
  letter:
    "My love, happy birthday. Today is about celebrating the person who makes my world softer, funnier, brighter, and a little more dramatic in the best way. I hope this year gives you success, peace, health, money, snacks, and enough happiness to make you suspicious. I love your smile, your heart, your weird jokes, your stubbornness, and the way you make ordinary days feel like memories. Thank you for existing. Thank you for being mine. Happy birthday, my favorite human.",
  wish:
    "I wish you a birthday as warm as your hugs, as bright as your smile, and as unforgettable as the way you make me feel loved.",
  quotes: [
    "You are my favorite chapter.",
    "You are my home.",
    "My heart smiles because of you.",
    "Every version of my future looks better with you.",
    "You are the calm and the butterflies."
  ],
  jokes: [
    "Breaking news: birthday boy remains cute despite advanced age.",
    "Your warranty has expired, but your charm is still under lifetime support.",
    "You are not old. You are just a limited edition with extra loading time.",
    "Age is just a number, but your knees have started fact-checking it.",
    "Congratulations, you can now say 'kids these days' with authority."
  ],
  songs: [
    {
      title: "Moonlit Heartbeats",
      tempo: 420,
      wave: "sine",
      notes: ["C5", "E5", "G5", "B5", "A5", "G5", "E5", "D5"]
    },
    {
      title: "Forever Sparkles",
      tempo: 360,
      wave: "triangle",
      notes: ["A4", "C5", "E5", "A5", "G5", "E5", "C5", "E5"]
    },
    {
      title: "Yes Celebration",
      tempo: 260,
      wave: "square",
      notes: ["G4", "B4", "D5", "G5", "D5", "B4", "A4", "D5"]
    }
  ]
};

const selectors = {
  loader: document.querySelector("#loader"),
  loaderProgress: document.querySelector("#loaderProgress"),
  loaderParticles: document.querySelector("#loaderParticles"),
  ambientLayer: document.querySelector("#ambientLayer"),
  effectLayer: document.querySelector("#effectLayer"),
  customCursor: document.querySelector("#customCursor"),
  cursorTrail: document.querySelector("#cursorTrail"),
  typedHero: document.querySelector("#typedHero"),
  heroMusicBtn: document.querySelector("#heroMusicBtn"),
  countdownSection: document.querySelector(".countdown"),
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
  envelope: document.querySelector("#envelope"),
  letterPanel: document.querySelector("#letterPanel"),
  letterText: document.querySelector("#letterText"),
  galleryCards: document.querySelectorAll(".gallery-card"),
  lightbox: document.querySelector("#lightbox"),
  lightboxImage: document.querySelector("#lightboxImage"),
  lightboxCaption: document.querySelector("#lightboxCaption"),
  lightboxClose: document.querySelector("#lightboxClose"),
  loveCards: document.querySelectorAll(".love-card"),
  wishTyping: document.querySelector("#wishTyping"),
  jokeBtn: document.querySelector("#jokeBtn"),
  emojiRainBtn: document.querySelector("#emojiRainBtn"),
  giftBox: document.querySelector("#giftBox"),
  giftMessage: document.querySelector("#giftMessage"),
  secretForm: document.querySelector("#secretForm"),
  secretCode: document.querySelector("#secretCode"),
  secretFeedback: document.querySelector("#secretFeedback"),
  secretPage: document.querySelector("#secretPage"),
  yesBtn: document.querySelector("#yesBtn"),
  noBtn: document.querySelector("#noBtn"),
  proposalMessage: document.querySelector("#proposalMessage"),
  quoteText: document.querySelector("#quoteText"),
  currentYear: document.querySelector("#currentYear"),
  songTitle: document.querySelector("#songTitle"),
  musicProgress: document.querySelector("#musicProgress"),
  toggleMusic: document.querySelector("#toggleMusic"),
  prevSong: document.querySelector("#prevSong"),
  nextSong: document.querySelector("#nextSong"),
  volumeRange: document.querySelector("#volumeRange")
};

const state = {
  audioContext: null,
  masterGain: null,
  musicTimer: null,
  progressTimer: null,
  currentSong: 0,
  currentNote: 0,
  playing: false,
  startedAt: 0,
  songProgress: 0,
  volume: 0.55,
  softened: false,
  lastMouseParticle: 0,
  lastShake: 0,
  quoteIndex: 0
};

const noteMap = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.0,
  B5: 987.77
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  initLoader();
  initAmbientBackground();
  initHeroTyping();
  initCountdown();
  initLetter();
  initGallery();
  initCards();
  initWishes();
  initSurpriseBox();
  initSecretMessage();
  initProposal();
  initQuotes();
  initMusicPlayer();
  initCursor();
  initInteractions();
  initScrollReveal();
  selectors.currentYear.textContent = new Date().getFullYear();
  window.setTimeout(() => launchFireworks(4), 2800);
}

function initLoader() {
  createLoaderParticles();
  let progress = 0;
  const timer = window.setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 8;
    const safeProgress = Math.min(progress, 100);
    selectors.loaderProgress.style.width = `${safeProgress}%`;

    if (safeProgress >= 100) {
      window.clearInterval(timer);
      window.setTimeout(() => selectors.loader.classList.add("hidden"), 450);
    }
  }, 150);
}

function createLoaderParticles() {
  for (let i = 0; i < 34; i += 1) {
    const particle = document.createElement("span");
    particle.className = "loader-particle";
    particle.style.left = `${randomBetween(0, 100)}%`;
    particle.style.animationDelay = `${randomBetween(-4, 0)}s`;
    particle.style.animationDuration = `${randomBetween(3, 6)}s`;
    selectors.loaderParticles.appendChild(particle);
  }
}

function initAmbientBackground() {
  const icons = ["❤️", "✦", "♡", "✧", "○"];
  const colors = ["#ff78aa", "#f3c969", "#c9a7ff", "#85eadc", "#fff8fb"];

  for (let i = 0; i < 46; i += 1) {
    const item = document.createElement("span");
    item.className = "ambient-item";
    item.textContent = icons[i % icons.length];
    item.style.setProperty("--x", `${randomBetween(0, 100)}vw`);
    item.style.setProperty("--drift", `${randomBetween(-80, 80)}px`);
    item.style.setProperty("--size", `${randomBetween(0.7, 1.8)}rem`);
    item.style.setProperty("--duration", `${randomBetween(10, 24)}s`);
    item.style.setProperty("--delay", `${randomBetween(-24, 0)}s`);
    item.style.setProperty("--color", colors[i % colors.length]);
    selectors.ambientLayer.appendChild(item);
  }
}

function initHeroTyping() {
  typeText(selectors.typedHero, "Happy Birthday My Love", 72);
}

function initCountdown() {
  const birthday = new Date(siteConfig.birthdayDate).getTime();

  function updateCountdown() {
    const diff = birthday - Date.now();

    if (Number.isNaN(birthday) || diff <= 0) {
      selectors.countdownSection.classList.add("birthday-arrived");
      return;
    }

    const secondsTotal = Math.floor(diff / 1000);
    const days = Math.floor(secondsTotal / 86400);
    const hours = Math.floor((secondsTotal % 86400) / 3600);
    const minutes = Math.floor((secondsTotal % 3600) / 60);
    const seconds = secondsTotal % 60;

    selectors.days.textContent = pad(days);
    selectors.hours.textContent = pad(hours);
    selectors.minutes.textContent = pad(minutes);
    selectors.seconds.textContent = pad(seconds);
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}

function initLetter() {
  selectors.envelope.addEventListener("click", () => {
    if (selectors.envelope.classList.contains("open")) {
      return;
    }

    selectors.envelope.classList.add("open");
    selectors.envelope.setAttribute("aria-expanded", "true");
    selectors.letterPanel.classList.add("visible");
    softenMusic(true);
    typeText(selectors.letterText, siteConfig.letter, 22);
    burstConfetti(window.innerWidth / 2, window.innerHeight * 0.4, 60);
  });
}

function initGallery() {
  selectors.galleryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const image = card.querySelector("img");
      selectors.lightboxImage.src = image.src;
      selectors.lightboxImage.alt = image.alt;
      selectors.lightboxCaption.textContent = card.dataset.caption;

      if (typeof selectors.lightbox.showModal === "function") {
        selectors.lightbox.showModal();
      } else {
        selectors.lightbox.setAttribute("open", "");
      }
    });
  });

  selectors.lightboxClose.addEventListener("click", () => closeLightbox());
  selectors.lightbox.addEventListener("click", (event) => {
    if (event.target === selectors.lightbox) {
      closeLightbox();
    }
  });
}

function closeLightbox() {
  if (typeof selectors.lightbox.close === "function") {
    selectors.lightbox.close();
  } else {
    selectors.lightbox.removeAttribute("open");
  }
}

function initCards() {
  selectors.loveCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
      sparkleAtCenter(card, 12);
    });
  });
}

function initWishes() {
  typeText(selectors.wishTyping, siteConfig.wish, 38);
}

function initSurpriseBox() {
  selectors.giftBox.addEventListener("click", () => {
    selectors.giftBox.classList.add("open");
    selectors.giftBox.setAttribute("aria-expanded", "true");
    selectors.giftMessage.classList.add("visible");
    burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 120);
    launchFireworks(5);
    heartRain(36);
    emojiRain("🎈", 22);
  });
}

function initSecretMessage() {
  selectors.secretForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const guess = selectors.secretCode.value.trim().toLowerCase();

    if (guess === siteConfig.secretCode.toLowerCase()) {
      selectors.secretFeedback.textContent = "Unlocked. Obviously your heart knows the password.";
      selectors.secretPage.classList.add("visible");
      launchFireworks(3);
      heartRain(28);
      selectors.secretPage.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      selectors.secretFeedback.textContent = "Almost. Try the word that sounds like us.";
      shakeElement(selectors.secretForm);
    }
  });
}

function initProposal() {
  selectors.yesBtn.addEventListener("click", () => {
    selectors.proposalMessage.textContent = "YAY. Contract accepted. Forever now has excellent taste.";
    state.currentSong = 2;
    playMusic();
    burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 160);
    launchFireworks(8);
    heartRain(70);
    emojiRain("💍", 18);
  });

  ["mouseenter", "focus", "touchstart"].forEach((eventName) => {
    selectors.noBtn.addEventListener(eventName, moveNoButton);
  });

  selectors.noBtn.addEventListener("click", (event) => {
    event.preventDefault();
    moveNoButton();
    selectors.proposalMessage.textContent = "Nice try. The no button has chosen peace.";
  });
}

function moveNoButton() {
  const card = selectors.noBtn.closest(".proposal-card");
  const cardRect = card.getBoundingClientRect();
  const buttonRect = selectors.noBtn.getBoundingClientRect();
  const x = randomBetween(0, Math.max(1, cardRect.width - buttonRect.width - 20));
  const y = randomBetween(0, Math.max(1, cardRect.height - buttonRect.height - 20));

  selectors.noBtn.style.position = "absolute";
  selectors.noBtn.style.left = `${x}px`;
  selectors.noBtn.style.top = `${y}px`;
}

function initQuotes() {
  window.setInterval(() => {
    state.quoteIndex = (state.quoteIndex + 1) % siteConfig.quotes.length;
    selectors.quoteText.style.opacity = "0";

    window.setTimeout(() => {
      selectors.quoteText.textContent = siteConfig.quotes[state.quoteIndex];
      selectors.quoteText.style.opacity = "1";
    }, 220);
  }, 4200);
}

function initMusicPlayer() {
  updateSongUi();
  selectors.toggleMusic.addEventListener("click", toggleMusic);
  selectors.heroMusicBtn.addEventListener("click", toggleMusic);
  selectors.prevSong.addEventListener("click", () => changeSong(-1));
  selectors.nextSong.addEventListener("click", () => changeSong(1));
  selectors.volumeRange.addEventListener("input", () => {
    state.volume = Number(selectors.volumeRange.value) / 100;
    updateVolume();
  });
}

function ensureAudio() {
  if (state.audioContext) {
    return;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    selectors.songTitle.textContent = "Audio is not supported in this browser";
    return;
  }

  state.audioContext = new AudioContextClass();
  state.masterGain = state.audioContext.createGain();
  state.masterGain.connect(state.audioContext.destination);
  updateVolume();
}

function toggleMusic() {
  if (state.playing) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  ensureAudio();

  if (!state.audioContext) {
    return;
  }

  if (state.audioContext.state === "suspended") {
    state.audioContext.resume();
  }

  pauseTimers();
  state.playing = true;
  state.currentNote = 0;
  state.startedAt = performance.now();
  selectors.toggleMusic.textContent = "⏸";
  selectors.heroMusicBtn.textContent = "⏸ Pause Music";
  updateSongUi();
  playNextNote();
  state.musicTimer = window.setInterval(playNextNote, currentTrack().tempo);
  state.progressTimer = window.setInterval(updateMusicProgress, 120);
}

function pauseMusic() {
  state.playing = false;
  pauseTimers();
  selectors.toggleMusic.textContent = "▶";
  selectors.heroMusicBtn.textContent = "▶ Play Music";
}

function pauseTimers() {
  window.clearInterval(state.musicTimer);
  window.clearInterval(state.progressTimer);
}

function changeSong(direction) {
  state.currentSong = wrapIndex(state.currentSong + direction, siteConfig.songs.length);
  updateSongUi();

  if (state.playing) {
    playMusic();
  }
}

function currentTrack() {
  return siteConfig.songs[state.currentSong];
}

function playNextNote() {
  const track = currentTrack();
  const note = track.notes[state.currentNote % track.notes.length];
  state.currentNote += 1;
  state.songProgress = ((state.currentNote % track.notes.length) / track.notes.length) * 100;
  playTone(noteMap[note] || noteMap.C5, track.tempo * 0.72, track.wave);
}

function playTone(frequency, duration, wave) {
  if (!state.audioContext || !state.masterGain) {
    return;
  }

  const now = state.audioContext.currentTime;
  const oscillator = state.audioContext.createOscillator();
  const gain = state.audioContext.createGain();

  oscillator.type = wave;
  oscillator.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.16, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration / 1000);
  oscillator.connect(gain);
  gain.connect(state.masterGain);
  oscillator.start(now);
  oscillator.stop(now + duration / 1000 + 0.03);
}

function updateVolume() {
  if (!state.masterGain) {
    return;
  }

  const target = state.softened ? state.volume * 0.35 : state.volume;
  state.masterGain.gain.setTargetAtTime(target, state.audioContext.currentTime, 0.08);
}

function softenMusic(soft) {
  state.softened = soft;
  updateVolume();
}

function updateSongUi() {
  selectors.songTitle.textContent = currentTrack().title;
}

function updateMusicProgress() {
  const trackDuration = currentTrack().notes.length * currentTrack().tempo;
  const elapsed = (performance.now() - state.startedAt) % trackDuration;
  selectors.musicProgress.style.width = `${(elapsed / trackDuration) * 100}%`;
}

function initCursor() {
  let trailX = 0;
  let trailY = 0;

  window.addEventListener("mousemove", (event) => {
    selectors.customCursor.style.left = `${event.clientX}px`;
    selectors.customCursor.style.top = `${event.clientY}px`;
    trailX += (event.clientX - trailX) * 0.18;
    trailY += (event.clientY - trailY) * 0.18;
    selectors.cursorTrail.style.left = `${trailX}px`;
    selectors.cursorTrail.style.top = `${trailY}px`;

    const now = performance.now();
    if (now - state.lastMouseParticle > 70) {
      state.lastMouseParticle = now;
      createMouseParticle(event.clientX, event.clientY);
    }
  });
}

function initInteractions() {
  window.addEventListener("click", (event) => {
    rippleAt(event.clientX, event.clientY);
    sparkleAt(event.clientX, event.clientY, 5);
  });

  window.addEventListener("dblclick", (event) => {
    heartExplosion(event.clientX, event.clientY);
  });

  selectors.jokeBtn.addEventListener("click", showRandomJoke);
  selectors.emojiRainBtn.addEventListener("click", () => emojiRain("😂", 34));

  window.setInterval(showRandomJoke, 18000);
  initShakeDetection();
}

function initShakeDetection() {
  const enableMotion = () => {
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission().catch(() => undefined);
    }
  };

  window.addEventListener("click", enableMotion, { once: true });

  window.addEventListener("devicemotion", (event) => {
    const acc = event.accelerationIncludingGravity;
    if (!acc) {
      return;
    }

    const strength = Math.abs(acc.x || 0) + Math.abs(acc.y || 0) + Math.abs(acc.z || 0);
    const now = Date.now();
    if (strength > 34 && now - state.lastShake > 1800) {
      state.lastShake = now;
      heartRain(44);
    }
  });
}

function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  items.forEach((item) => observer.observe(item));
}

function typeText(element, text, speed) {
  let index = 0;
  element.textContent = "";
  const timer = window.setInterval(() => {
    element.textContent += text.charAt(index);
    index += 1;

    if (index >= text.length) {
      window.clearInterval(timer);
    }
  }, speed);
}

function showRandomJoke() {
  const toast = document.createElement("div");
  toast.className = "joke-toast";
  toast.textContent = siteConfig.jokes[Math.floor(Math.random() * siteConfig.jokes.length)];
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 3300);
}

function burstConfetti(x, y, amount) {
  const colors = ["#ff78aa", "#f3c969", "#c9a7ff", "#85eadc", "#ffffff"];

  for (let i = 0; i < amount; i += 1) {
    const confetti = document.createElement("span");
    confetti.className = "confetti";
    confetti.style.setProperty("--x", `${x}px`);
    confetti.style.setProperty("--y", `${y}px`);
    confetti.style.setProperty("--dx", `${randomBetween(-240, 240)}px`);
    confetti.style.setProperty("--dy", `${randomBetween(-260, 220)}px`);
    confetti.style.setProperty("--duration", `${randomBetween(1, 2.2)}s`);
    confetti.style.setProperty("--color", colors[i % colors.length]);
    selectors.effectLayer.appendChild(confetti);
    window.setTimeout(() => confetti.remove(), 2300);
  }
}

function launchFireworks(count) {
  for (let i = 0; i < count; i += 1) {
    window.setTimeout(() => {
      const x = randomBetween(window.innerWidth * 0.12, window.innerWidth * 0.88);
      const y = randomBetween(window.innerHeight * 0.12, window.innerHeight * 0.58);
      fireworkAt(x, y);
    }, i * 260);
  }
}

function fireworkAt(x, y) {
  const colors = ["#ff78aa", "#f3c969", "#c9a7ff", "#85eadc"];

  for (let i = 0; i < 28; i += 1) {
    const angle = (Math.PI * 2 * i) / 28;
    const distance = randomBetween(54, 142);
    const spark = document.createElement("span");
    spark.className = "firework";
    spark.style.setProperty("--x", `${x}px`);
    spark.style.setProperty("--y", `${y}px`);
    spark.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    spark.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
    spark.style.setProperty("--color", colors[i % colors.length]);
    selectors.effectLayer.appendChild(spark);
    window.setTimeout(() => spark.remove(), 1000);
  }
}

function heartRain(amount) {
  for (let i = 0; i < amount; i += 1) {
    window.setTimeout(() => {
      const heart = document.createElement("span");
      heart.className = "heart-drop";
      heart.textContent = "❤️";
      heart.style.setProperty("--x", `${randomBetween(0, 100)}vw`);
      heart.style.setProperty("--size", `${randomBetween(1, 2.4)}rem`);
      heart.style.setProperty("--duration", `${randomBetween(2.2, 4.5)}s`);
      selectors.effectLayer.appendChild(heart);
      window.setTimeout(() => heart.remove(), 4700);
    }, i * 36);
  }
}

function emojiRain(emoji, amount) {
  for (let i = 0; i < amount; i += 1) {
    window.setTimeout(() => {
      const item = document.createElement("span");
      item.className = "emoji-drop";
      item.textContent = emoji;
      item.style.setProperty("--x", `${randomBetween(0, 100)}vw`);
      item.style.setProperty("--size", `${randomBetween(1.2, 2.5)}rem`);
      item.style.setProperty("--duration", `${randomBetween(2.4, 4.2)}s`);
      selectors.effectLayer.appendChild(item);
      window.setTimeout(() => item.remove(), 4400);
    }, i * 42);
  }
}

function heartExplosion(x, y) {
  for (let i = 0; i < 38; i += 1) {
    const angle = (Math.PI * 2 * i) / 38;
    const heart = document.createElement("span");
    heart.className = "spark-pop";
    heart.textContent = "❤️";
    heart.style.setProperty("--x", `${x}px`);
    heart.style.setProperty("--y", `${y}px`);
    heart.style.setProperty("--dx", `${Math.cos(angle) * randomBetween(50, 170)}px`);
    heart.style.setProperty("--dy", `${Math.sin(angle) * randomBetween(50, 170)}px`);
    selectors.effectLayer.appendChild(heart);
    window.setTimeout(() => heart.remove(), 900);
  }
}

function sparkleAt(x, y, amount) {
  for (let i = 0; i < amount; i += 1) {
    const spark = document.createElement("span");
    spark.className = "spark-pop";
    spark.textContent = i % 2 ? "✦" : "✧";
    spark.style.setProperty("--x", `${x}px`);
    spark.style.setProperty("--y", `${y}px`);
    spark.style.setProperty("--dx", `${randomBetween(-46, 46)}px`);
    spark.style.setProperty("--dy", `${randomBetween(-60, 28)}px`);
    selectors.effectLayer.appendChild(spark);
    window.setTimeout(() => spark.remove(), 850);
  }
}

function sparkleAtCenter(element, amount) {
  const rect = element.getBoundingClientRect();
  sparkleAt(rect.left + rect.width / 2, rect.top + rect.height / 2, amount);
}

function rippleAt(x, y) {
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.setProperty("--x", `${x}px`);
  ripple.style.setProperty("--y", `${y}px`);
  selectors.effectLayer.appendChild(ripple);
  window.setTimeout(() => ripple.remove(), 760);
}

function createMouseParticle(x, y) {
  const colors = ["#ff78aa", "#f3c969", "#c9a7ff", "#85eadc"];
  const particle = document.createElement("span");
  particle.className = "particle";
  particle.style.setProperty("--x", `${x}px`);
  particle.style.setProperty("--y", `${y}px`);
  particle.style.setProperty("--dx", `${randomBetween(-24, 24)}px`);
  particle.style.setProperty("--dy", `${randomBetween(-28, 8)}px`);
  particle.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);
  selectors.effectLayer.appendChild(particle);
  window.setTimeout(() => particle.remove(), 850);
}

function shakeElement(element) {
  element.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-8px)" },
      { transform: "translateX(8px)" },
      { transform: "translateX(0)" }
    ],
    { duration: 280, easing: "ease-in-out" }
  );
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function wrapIndex(index, length) {
  return (index + length) % length;
}
