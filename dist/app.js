import { poemLines, experience } from "./poem.js";
import { BackgroundMusic } from "./music.js";
import { createTimeline, verseAt, verseOpacity } from "./timeline.js";

const body = document.body;
const enter = document.querySelector("#enter");
const entrance = document.querySelector(".entrance");
const theater = document.querySelector(".theater");
const poemStage = document.querySelector(".poem-stage");
const poemLine = document.querySelector("#poem-line");
const dedicationStage = document.querySelector(".dedication-stage");
const dedicationLine = document.querySelector("#dedication-line");
const liveLine = document.querySelector("#live-line");
const ui = document.querySelector(".performance-ui");
const pauseButton = document.querySelector("#pause");
const soundButton = document.querySelector("#sound");
const dialog = document.querySelector("#poem-dialog");
const progress = document.querySelector(".progress-track");
const progressFill = document.querySelector(".progress-fill");
const music = new BackgroundMusic(document.querySelector("#background-music"));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reducedMotion) body.classList.add("reduced-motion");
const dedicationStart = reducedMotion ? 1800 : 4200;
const dedicationFade = 800;
const dedicationEnd = dedicationStart + dedicationFade * 2 + experience.visibleLineMilliseconds;
const curtainTime = dedicationEnd + 250;
const performanceTime = reducedMotion ? 2300 : 4700;
const musicTime = curtainTime + (reducedMotion ? 1900 : 4700);
const poemTime = musicTime + 2800;
const timeline = createTimeline(poemLines, experience, poemTime);
const closingMessage = "كل سنه و انتى طيبة يا بنت الاصول و كاملة الاوصاف";
const closingStart = timeline.end + experience.fadeMilliseconds + 250;
const closingEnd = closingStart + experience.fadeMilliseconds * 2 + 7000;
const curtainCloseStart = closingEnd + 250;
const curtainCloseDuration = reducedMotion ? 3000 : 6500;
const endingEnd = curtainCloseStart + curtainCloseDuration;
body.dataset.musicStart = String(musicTime);
body.dataset.poemStart = String(poemTime);
body.dataset.dedicationStart = String(dedicationStart);
body.dataset.dedicationEnd = String(dedicationEnd);
body.dataset.curtainStart = String(curtainTime);
body.dataset.closingStart = String(closingStart);
body.dataset.closingEnd = String(closingEnd);
body.dataset.curtainCloseStart = String(curtainCloseStart);
body.dataset.endingEnd = String(endingEnd);
body.dataset.endingPhase = "waiting";

let mode = "entrance";
let elapsed = 0;
let paused = false;
let lastFrame = 0;
let frameRequest = 0;
let currentVerse = -1;
let lastProgress = -1;
let playingBeforeRead = false;
let controlsReady = false;
let dedicationAnnounced = false;

const completePoem = document.querySelector("#complete-poem");
for (const line of poemLines) {
  const paragraph = document.createElement("p");
  paragraph.textContent = line;
  completePoem.append(paragraph);
}

function reportAudioFailure() {
  soundButton.disabled = true;
  soundButton.setAttribute("aria-label", "الموسيقى غير متاحة في هذا المتصفح");
  document.querySelector("#playback-status").textContent = "الموسيقى غير متاحة";
}

function begin() {
  if (mode !== "entrance" || enter.disabled) return;
  mode = "playing";
  body.dataset.state = mode;
  entrance.inert = true;
  entrance.setAttribute("aria-hidden", "true");
  theater.setAttribute("aria-hidden", "false");
  body.classList.add("opening");
  music.start({deferred: true}).catch(reportAudioFailure);
  lastFrame = performance.now();
  frameRequest = requestAnimationFrame(tick);
}

function tick(now) {
  if (mode === "entrance" || mode === "finished") return;
  if (!paused) {
    elapsed += Math.max(0, now - lastFrame);
    render();
  }
  lastFrame = now;
  if (mode !== "finished") frameRequest = requestAnimationFrame(tick);
}

function render() {
  const dedicationOpacity = Math.max(0, Math.min(1, (elapsed - dedicationStart) / dedicationFade, (dedicationEnd - elapsed) / dedicationFade));
  dedicationStage.style.setProperty("--dedication-opacity", String(dedicationOpacity));
  if (elapsed >= dedicationStart && elapsed < dedicationEnd && !dedicationAnnounced) {
    dedicationAnnounced = true;
    liveLine.textContent = dedicationLine.textContent;
  }
  body.classList.toggle("curtains-open", elapsed >= curtainTime);
  body.classList.toggle("performing", elapsed >= performanceTime);
  if (elapsed >= musicTime) music.reveal();
  if (elapsed >= performanceTime && !controlsReady) {
    controlsReady = true;
    ui.inert = false;
    pauseButton.focus({preventScroll:true});
  }
  const verse = elapsed < closingStart ? verseAt(timeline, elapsed) : null;
  if (verse) {
    if (currentVerse !== verse.index) {
      currentVerse = verse.index;
      poemLine.textContent = verse.text;
      liveLine.textContent = verse.text;
      poemLine.dataset.index = String(verse.index);
    }
    let opacity = verseOpacity(verse, elapsed, experience.fadeMilliseconds, verse.index === poemLines.length - 1);
    if (elapsed >= timeline.end) opacity = Math.max(0, 1 - (elapsed - timeline.end) / experience.fadeMilliseconds);
    poemStage.style.setProperty("--line-opacity", String(opacity));
  }
  if (elapsed >= closingStart) {
    if (currentVerse !== poemLines.length) {
      currentVerse = poemLines.length;
      poemLine.textContent = closingMessage;
      poemLine.classList.add("closing-line");
      liveLine.textContent = closingMessage;
      delete poemLine.dataset.index;
    }
    const opacity = Math.max(0, Math.min(1, (elapsed - closingStart) / experience.fadeMilliseconds, (closingEnd - elapsed) / experience.fadeMilliseconds));
    poemStage.style.setProperty("--line-opacity", String(opacity));
    body.dataset.endingPhase = elapsed < curtainCloseStart ? "message" : "curtains";
  }
  if (elapsed >= curtainCloseStart) {
    body.classList.add("closing");
    const progress = Math.max(0, Math.min(1, (elapsed - curtainCloseStart) / curtainCloseDuration));
    const easedProgress = progress * progress * (3 - 2 * progress);
    body.style.setProperty("--curtain-close", String(easedProgress));
    poemStage.style.opacity = String(1 - easedProgress);
    music.setEndingProgress(easedProgress);
  }
  const completion = Math.max(0, Math.min(100, (elapsed - timeline.start) / (timeline.end - timeline.start) * 100));
  progressFill.style.width = `${completion}%`;
  if (Math.floor(completion) !== lastProgress) {
    lastProgress = Math.floor(completion);
    progress.setAttribute("aria-valuenow", String(lastProgress));
  }
  if (elapsed >= endingEnd) {
    mode = "finished";
    body.dataset.state = mode;
    body.classList.add("finished");
    pauseButton.disabled = true;
    body.dataset.endingPhase = "finished";
    music.finish().catch(reportAudioFailure);
    if (document.activeElement === pauseButton) document.querySelector("#encore").focus({preventScroll:true});
  }
}

function setPaused(value) {
  if (mode !== "playing" || paused === value) return;
  paused = value;
  body.classList.toggle("paused", paused);
  body.dataset.state = paused ? "paused" : "playing";
  pauseButton.setAttribute("aria-pressed", String(paused));
  pauseButton.setAttribute("aria-label", paused ? "متابعة العرض" : "إيقاف العرض مؤقتًا");
  pauseButton.title = paused ? "متابعة العرض" : "إيقاف مؤقت";
  document.querySelector("#playback-status").textContent = paused ? "متوقف مؤقتًا" : "";
  lastFrame = performance.now();
  if (paused) {
    music.pause().catch(reportAudioFailure);
  } else {
    music.resume().catch(reportAudioFailure);
  }
}

function replay() {
  cancelAnimationFrame(frameRequest);
  elapsed = 0;
  paused = false;
  currentVerse = -1;
  lastProgress = -1;
  playingBeforeRead = false;
  mode = "entrance";
  dedicationAnnounced = false;
  dedicationStage.style.setProperty("--dedication-opacity", "0");
  body.dataset.state = mode;
  body.dataset.endingPhase = "waiting";
  body.style.setProperty("--curtain-close", "0");
  body.classList.add("resetting");
  body.classList.remove("opening", "paused", "finished", "curtains-open", "performing", "closing");
  controlsReady = false;
  ui.inert = true;
  entrance.inert = false;
  entrance.setAttribute("aria-hidden", "false");
  theater.setAttribute("aria-hidden", "true");
  if (dialog.open) dialog.close();
  poemLine.textContent = "";
  poemLine.classList.remove("closing-line");
  liveLine.textContent = "";
  delete poemLine.dataset.index;
  poemStage.style.setProperty("--line-opacity", "0");
  poemStage.style.removeProperty("opacity");
  pauseButton.disabled = false;
  pauseButton.setAttribute("aria-pressed", "false");
  pauseButton.setAttribute("aria-label", "إيقاف العرض مؤقتًا");
  pauseButton.title = "إيقاف مؤقت";
  document.querySelector("#playback-status").textContent = "";
  progressFill.style.width = "0%";
  progress.setAttribute("aria-valuenow", "0");
  music.reset().catch(reportAudioFailure);
  // Apply the closed entrance before restoring its opening transitions.
  void entrance.offsetWidth;
  requestAnimationFrame(() => body.classList.remove("resetting"));
  enter.focus({preventScroll:true});
}

enter.addEventListener("click", begin);
pauseButton.addEventListener("click", () => setPaused(!paused));
document.querySelector("#encore").addEventListener("click", replay);
soundButton.addEventListener("click", () => {
  const muted = !music.muted;
  music.setMuted(muted);
  body.classList.toggle("muted", muted);
  soundButton.setAttribute("aria-pressed", String(muted));
  soundButton.setAttribute("aria-label", muted ? "تشغيل الصوت" : "كتم الصوت");
});

document.querySelector("#read").addEventListener("click", () => {
  playingBeforeRead = mode === "playing" && !paused;
  setPaused(true);
  dialog.showModal();
});
document.querySelector("#close-poem").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }
});
dialog.addEventListener("close", () => {
  if (playingBeforeRead && !document.hidden) setPaused(false);
  playingBeforeRead = false;
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) setPaused(true);
});
document.addEventListener("keydown", event => {
  const interactiveTarget = event.target.closest("button,a,input,textarea,select");
  if (event.code === "Space" && !interactiveTarget && !dialog.open && mode === "playing") {
    event.preventDefault(); setPaused(!paused);
  }
});

const fullscreenButton = document.querySelector("#fullscreen");
if (!document.documentElement.requestFullscreen) fullscreenButton.hidden = true;
fullscreenButton.addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  } catch { /* The performance still works if fullscreen is unavailable. */ }
});
document.addEventListener("fullscreenchange", () => fullscreenButton.setAttribute("aria-label", document.fullscreenElement ? "الخروج من ملء الشاشة" : "ملء الشاشة"));

function loadImage(source) {
  return new Promise((resolve,reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load ${source}`));
    image.src = source;
  });
}
Promise.all(["palace-door.png", "theater.png", "velvet.png"].map(file => loadImage(`assets/${file}`)))
  .then(async () => {
    try { await document.fonts.load("32px Amiri"); } catch { /* Use the readable local fallback. */ }
    body.classList.remove("loading");
    document.querySelector("#entry-caption").textContent = experience.invitation;
    enter.disabled = false;
    body.dataset.state = "entrance";
  })
  .catch(() => {
    document.querySelector("#entry-caption").textContent = "تعذّر تحميل المشهد، أعيدي تحميل الصفحة.";
  });
