import {Path} from "../simple/path";

export class WrapperPath extends Path {
    constructor(handler) {
        super();
        this.handler = handler;
    }

    getLabel() {
        let lbl = super.getLabel();
        return (lbl.label) ? this.handler.generateShape(lbl).alignTo(this) : lbl;
    }

    setStart(point) {
        point = [this.getTargetShape(point[0]), point[1]];
        return super.setStart(point);
    }

    /**
     * @param point [x,y] or [intR, length] for radian, [intD, length] for degree or [shape,gap].<br/>
     */
    lineTo(point) {
        point = [this.getTargetShape(point[0]), point[1]];
        return super.lineTo(point);
    }

    /**
     * @param curve [x,y] or [intR, length] for radian, [intD, length] for degree or [shape,gap].<br/>
     * @param end [x,y] or [intR, length] for radian, [intD, length] for degree or [shape,gap].<br/>
     */
    quadraticTo(curve, end) {
        curve = [this.getTargetShape(curve[0]), curve[1]];
        end = [this.getTargetShape(end[0]), end[1]];
        return super.quadraticTo(curve, end);
    }

    getTargetShape(value) {
        return (typeof value === 'string' && !value.match('\\d+[dDrR]')) ? this.handler.getTargetShape(value) : value;
    }
}