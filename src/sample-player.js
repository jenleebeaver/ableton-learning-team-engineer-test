export class SamplePlayer {

    audioBuffer = undefined;
    source = undefined;

    constructor(audioContext) {
        this.audioContext = audioContext;
        this.filter = new BiquadFilterNode(this.audioContext);
        this.filter.type = "lowpass";
        this.filter.connect(this.audioContext.destination);
    }

    loadSample() {
        return fetch("/assets/drum-loop-102-bpm.wav")
            .then(response => response.arrayBuffer())
            .then(audioData => this.audioContext.decodeAudioData(audioData))
            .then(audioBuffer => this.audioBuffer = audioBuffer);
    }

    startPlayback() {
        this.source = this.audioContext.createBufferSource();
        this.source.buffer = this.audioBuffer;
        this.source.loop = true;
        this.source.connect(this.filter);
        this.source.start();
    }

    stopPlayback() {
        this.source.stop();
    }

    setFilterCutoff(frequency) {
        this.filter.frequency.value = frequency;
        //STEP 3: show frequency value  - HORIZONTAL 
        document.getElementById("frequency").innerHTML = Math.round(frequency);
    }

    setPlaybackRate(pct) {
        if (this.source) {
            this.source.playbackRate.value = pct;
            //STEP 3: show the playback rate- VERTICAL; 
            document.getElementById("pct").innerHTML = Math.round(pct * 100)/100;
        }
    }
}