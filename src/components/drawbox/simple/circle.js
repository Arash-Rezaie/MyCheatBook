import {Utils} from "../../../tools/utils";
import {Shape} from "./shape";

export class Circle extends Shape {
    setRadius(radius) {
        this.r = radius;
        return this;
    }

    getExternalPoint(angle, gap) {
        let c = this.getPosition();
        return [c[0] + (this.r + gap) * Math.cos(angle), c[1] + (this.r + gap) * Math.sin(angle)]
    }

    render(canvasCtx) {
        canvasCtx.beginPath();
        let c = this.getPosition();
        canvasCtx.arc(c[0], c[1], this.r, 0, Utils._2PI);
        canvasCtx.closePath();
        super.render(canvasCtx);
    }
}