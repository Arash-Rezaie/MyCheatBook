import {Utils} from "../../../tools/utils";
import {Shape} from "./shape";

export class Rectangle extends Shape {
    setWidth(width) {
        this.width = width;
        return this;
    }

    setHeight(height) {
        this.height = height;
        return this;
    }

    getCenterPoint() {
        let p = this.getPosition();
        return [p[0] + this.width / 2, p[1] + this.height / 2]
    }

    getExternalPoint(angle, gap) {
        let c = this.getCenterPoint();
        let p = this.getPosition();
        let rbc = Utils.getAngle(c[0], c[1], p[0] + this.width, p[1] + this.height);//right-bottom corner
        let lbc = Math.PI - rbc;//left-bottom corner
        let ltc = Math.PI + rbc;//left-top corner
        let rtc = Utils._2PI - rbc;//right-top corner

        angle = Utils.normalizeRadian(angle);//get angle between 0 - ~629

        if (angle >= rbc && angle < lbc) {//cross bottom edge
            return this.getTBTarget(c, angle, gap, 1);
        } else if (angle >= lbc && angle < ltc) {//cross left edge
            return this.getLRTarget(c, angle, gap, -1);
        } else if (angle >= ltc && angle < rtc) {//cross top edge
            return this.getTBTarget(c, angle, gap, -1);
        } else {//cross right edge
            return this.getLRTarget(c, angle, gap, 1);
        }
    }

    getTBTarget(c, angle, gap, sign) {
        let l = (this.height / 2) / Math.sin(angle);
        l += sign * gap;
        return [c[0] + sign * l * Math.cos(angle), c[1] + sign * l * Math.sin(angle)];
    }

    getLRTarget(c, angle, gap, sign) {
        let l = (this.width / 2) / Math.cos(angle)
        l += sign * gap;
        return [c[0] + sign * l * Math.cos(angle), c[1] + sign * l * Math.sin(angle)];
    }

    render(canvasCtx) {
        canvasCtx.beginPath();
        let p = this.getPosition();
        canvasCtx.rect(p[0], p[1], this.width, this.height);
        canvasCtx.closePath();
        super.render(canvasCtx);
    }
}