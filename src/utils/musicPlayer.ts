/**
 * Background Audio Player for "Chờ Chút..." (CONGB)
 * Plays the song from /audio/background.mp3 with seamless looping and audio element management.
 */

class AudioTrackPlayer {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private isLoaded = false;

  private initAudio() {
    if (this.audio) return this.audio;
    if (typeof window === 'undefined') return null;

    try {
      this.audio = new Audio('/audio/background.mp3');
      this.audio.loop = true;
      this.audio.volume = 0.6;
      this.audio.preload = 'auto';

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
      });

      this.audio.addEventListener('canplaythrough', () => {
        this.isLoaded = true;
      });

      return this.audio;
    } catch (e) {
      console.warn('Audio initialization notice:', e);
      return null;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      const started = await this.play();
      return started;
    }
  }

  public async play(): Promise<boolean> {
    const audio = this.initAudio();
    if (!audio) return false;

    try {
      await audio.play();
      this.isPlaying = true;
      return true;
    } catch (err) {
      console.warn('Autoplay prevented or audio playback issue:', err);
      this.isPlaying = false;
      return false;
    }
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
    }
    this.isPlaying = false;
  }
}

export const musicBox = new AudioTrackPlayer();
