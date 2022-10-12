import { AssistantUI } from './assistant-UI.js';

export class XYPad {

    constructor(element, callback) {
        this.element = element;
        this.callback = callback;

        this.dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.dot.id = "cursor";
        this.element.appendChild(this.dot);
        this.updateDot(50, 50, 0.1);
        this.assistantUI = new AssistantUI(this.dot);
        //Step 1
        this.assistantUI.init();
               
        element.addEventListener("mousedown", (e) => {
            let [xPct, yPct] = this.getPositionInPercentages(e);
            this.updateDot(xPct, yPct, 0.5);
            this.callback({type: "down", xPct, yPct});
            //Step 3
            this.assistantUI.stepThree();
        });

        element.addEventListener("mouseenter", (e) => {
            //Step 2 
            this.assistantUI.stepTwo();
        });

        element.addEventListener("mouseleave", (e) => {
            let [xPct, yPct] = this.getPositionInPercentages(e);
            this.updateDot(50, 50, 0.1);
            this.assistantUI.handleLeave();
            //fix bug: audio should stop when mouse leaves xy-pad
            this.callback({type: "up", xPct, yPct});
        });

        element.addEventListener("mousemove", (e) => {
            let [xPct, yPct] = this.getPositionInPercentages(e);
            this.updateDot(xPct, yPct);
            this.callback({type: "move", xPct, yPct});
        });

        element.addEventListener("mouseup", (e) => {
            let [xPct, yPct] = this.getPositionInPercentages(e);
            this.updateDot(xPct, yPct, 0.1);
            this.callback({type: "up", xPct, yPct});
        });
    }

    getPositionInPercentages(e) {
        const clientRect = this.element.getBoundingClientRect();
        const xPct = (e.offsetX / clientRect.width) * 100;
        const yPct = (e.offsetY / clientRect.height) * 100;
        return [xPct, yPct];
    }

    updateDot(xPct, yPct, opacity) {
        this.dot.setAttribute("r", `20px`);
        this.dot.setAttribute("cx", `${xPct}%`);
        this.dot.setAttribute("cy", `${yPct}%`);
        if (opacity !== undefined) {
            this.dot.style.opacity = opacity;
        }
    }

    
}