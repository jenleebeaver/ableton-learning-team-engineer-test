export class AssistantUI {

    constructor(dotEl){
        this.timer = null;
        this.pulse = gsap.to(dotEl, {scale: 1.5, repeat: -1, duration: 1, yoyo: true, transformOrigin: "center"}); 
        this.hasUserSeenStep2 = false;  
    }

    //states
    init() {
        document.getElementById("loading_indicator").classList.add("hide");
        document.getElementById("step_1").classList.remove("hide");
    }

    stepTwo() {
        if(!this.hasUserSeenStep2) {
             // Step triggers after .5 second to account for edge case of mouse move
            this.timer = setTimeout(()=> {
                this.pulse.pause();
                document.getElementById("step_1").classList.add("hide");
                document.getElementById("step_2").classList.remove("hide");
                this.hasUserSeenStep2 = true;
            }, 500);
         }
    }

    handleLeave(){
        clearTimeout(this.timer);
        this.pulse.play();
    }

    stepThree() {
        gsap.to(".hr-line", {scaleX: 2, duration: 2});
        gsap.to(".vr-line", {scaleY: 2, duration: 2});
        document.getElementById("step_2").classList.add("hide");
        document.getElementById("step_3").classList.remove("hide");
        document.getElementById("show-frequency").classList.remove("hide");
        document.getElementById("show-rate").classList.remove("hide");  
    }
}