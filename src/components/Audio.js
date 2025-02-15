import { Audio, AudioListener, AudioLoader } from "three";

export default class AudioHelper {
  constructor(camera, filePath, options = {}) {
    this.camera = camera;
    this.filePath = filePath;
    this.options = {
      loop: options.loop || true,
      volume: options.volume || 0.5,
      autoplay: options.autoplay || false,
    };
    this.listener = new AudioListener();
    this.sound = null;

    this.init();
  }

  init() {
    this.camera.add(this.listener);
    this.sound = new Audio(this.listener);

    const audioLoader = new AudioLoader();
    audioLoader.load(
      this.filePath,
      (buffer) => {
        this.sound.setBuffer(buffer);
        this.sound.setLoop(this.options.loop);
        this.sound.setVolume(this.options.volume);

        if (this.options.autoplay) {
          this.play();
        }
      },
      undefined,
      (error) => {
        console.error("Error loading audio:", error);
      }
    );
  }

  play() {
    if (this.sound && !this.sound.isPlaying) {
      this.sound.play();
    }
  }

  stop() {
    if (this.sound && this.sound.isPlaying) {
      this.sound.stop();
    }
  }

  setVolume(volume) {
    if (this.sound) {
      this.sound.setVolume(volume);
    }
  }
}
