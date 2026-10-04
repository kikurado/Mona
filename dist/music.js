// The author's selected recording, self-hosted without modifying the MP3.
export class BackgroundMusic {
  constructor(audio) {
    this.audio = audio;
    this.context = null;
    this.master = null;
    this.muted = false;
    this.finished = false;
    this.playing = false;
    this.operation = 0;
    this.endingProgress = 0;
    this.volume = .5;
    this.revealed = false;
  }

  create() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) throw new Error("Audio is unavailable in this browser.");
    this.context = new AudioContextClass();
    this.master = this.context.createGain();
    this.master.gain.value = 0;
    this.context.createMediaElementSource(this.audio).connect(this.master);
    this.master.connect(this.context.destination);
  }

  async play() {
    if (!this.context) this.create();
    const operation = ++this.operation;
    this.playing = true;
    // Request both in the click handler so mobile browsers retain user activation.
    try {
      await Promise.all([this.context.resume(), this.audio.play()]);
    } catch (error) {
      if (operation !== this.operation || error.name === "AbortError") return;
      this.playing = false;
      throw error;
    }
    if (operation !== this.operation) {
      if (!this.playing) this.audio.pause();
      return;
    }
  }

  async start({deferred = false} = {}) {
    this.endingProgress = 0;
    if (!this.context) this.create();
    this.finished = false;
    this.revealed = !deferred;
    this.audio.currentTime = 0;
    this.audio.muted = this.muted;
    this.master.gain.cancelScheduledValues(this.context.currentTime);
    this.master.gain.setValueAtTime(0, this.context.currentTime);
    this.master.gain.setTargetAtTime(this.muted || !this.revealed ? 0 : this.volume, this.context.currentTime, .8);
    await this.play();
  }

  reveal() {
    if (this.revealed || this.finished || !this.context) return;
    this.revealed = true;
    // Playback was unlocked silently by the door click; start the recording here.
    this.audio.currentTime = 0;
    this.master.gain.cancelScheduledValues(this.context.currentTime);
    this.master.gain.setValueAtTime(0, this.context.currentTime);
    this.master.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.context.currentTime, .35);
  }

  async pause() {
    this.operation++;
    this.playing = false;
    this.audio.pause();
    if (this.context && this.context.state !== "closed") await this.context.suspend();
  }

  async resume() {
    if (this.finished) return;
    await this.play();
  }

  async reset() {
    this.endingProgress = 0;
    this.revealed = false;
    this.finished = false;
    if (this.master) {
      this.master.gain.cancelScheduledValues(this.context.currentTime);
      this.master.gain.setValueAtTime(0, this.context.currentTime);
    }
    const stopped = this.pause();
    this.audio.currentTime = 0;
    await stopped;
  }

  setMuted(muted) {
    this.muted = muted;
    this.audio.muted = muted;
    if (this.master && !this.finished) {
      this.master.gain.cancelScheduledValues(this.context.currentTime);
      this.master.gain.setTargetAtTime(muted || !this.revealed ? 0 : this.volume * (1 - this.endingProgress), this.context.currentTime, .12);
    }
  }

  setEndingProgress(progress) {
    this.endingProgress = Math.max(0, Math.min(1, progress));
    if (!this.master || this.finished) return;
    this.master.gain.cancelScheduledValues(this.context.currentTime);
    this.master.gain.setTargetAtTime(this.muted ? 0 : this.volume * (1 - this.endingProgress), this.context.currentTime, .04);
  }

  async finish() {
    this.finished = true;
    if (!this.context) return;
    this.master.gain.cancelScheduledValues(this.context.currentTime);
    this.master.gain.setValueAtTime(0, this.context.currentTime);
    await this.pause();
  }
}
