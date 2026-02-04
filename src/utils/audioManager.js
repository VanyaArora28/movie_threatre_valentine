import { Howl } from 'howler'

class AudioManager {
    constructor() {
        this.sounds = {}
        this.backgroundSound = null
    }

    /**
     * Initialize background projector sound
     */
    initBackgroundSound() {
        if (this.backgroundSound) return

        this.backgroundSound = new Howl({
            src: ['/audio/projector-loop.mp3'],
            loop: true,
            volume: 0.3,
            html5: true, // Better for streaming
        })
    }

    /**
     * Play background sound
     */
    playBackground() {
        if (!this.backgroundSound) {
            this.initBackgroundSound()
        }
        this.backgroundSound.play()
    }

    /**
     * Stop background sound
     */
    stopBackground() {
        if (this.backgroundSound) {
            this.backgroundSound.stop()
        }
    }

    /**
     * Load a sound
     */
    loadSound(key, src, options = {}) {
        this.sounds[key] = new Howl({
            src: [src],
            ...options
        })
        return this.sounds[key]
    }

    /**
     * Play a sound
     */
    play(key) {
        if (this.sounds[key]) {
            this.sounds[key].play()
        }
    }

    /**
     * Stop a sound
     */
    stop(key) {
        if (this.sounds[key]) {
            this.sounds[key].stop()
        }
    }

    /**
     * Pause a sound
     */
    pause(key) {
        if (this.sounds[key]) {
            this.sounds[key].pause()
        }
    }

    /**
     * Get a sound instance
     */
    getSound(key) {
        return this.sounds[key]
    }

    /**
     * Unload all sounds
     */
    unloadAll() {
        Object.values(this.sounds).forEach(sound => sound.unload())
        if (this.backgroundSound) {
            this.backgroundSound.unload()
        }
        this.sounds = {}
        this.backgroundSound = null
    }
}

// Export singleton instance
export default new AudioManager()
