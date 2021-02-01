import {Line} from "../simple/line";
import {Text} from "../simple/shape";

export class WrapperLine extends Line {
    constructor(handler) {
        super();
        this.handler = handler;
    }

    getLabel() {
        let lbl = super.getLabel();
        if (lbl.label) {
            lbl = this.handler.generateShape(lbl);
            lbl.alignTo(this);
        }
        return lbl;
    }

    between(shape1, shape2, gap = 0) {
        this.setStart([shape1, gap]);
        this.setEnd([shape2, gap]);
        return this;
    }

    setStart(point) {
        return super.setStart([this.getTargetShape(point[0]), point[1]]);
    }

    setEnd(point) {
        return super.setEnd([this.getTargetShape(point[0]), point[1]]);
    }

    setQuadraticPoint(point) {
        return super.setQuadraticPoint([this.getTargetShape(point[0]), point[1]]);
    }

    getTargetShape(value) {
        return (typeof value === 'string' && !value.match('\\d+[dDrR]')) ? this.handler.getTargetShape(value) : value;
    }
}

export class WrapperHLine extends WrapperLine {
    setLength(l) {
        l > 0 ?
            this.setEnd(['0D', l]) :
            this.setEnd(['180D', -l])
        return this;
    }
}

export class WrapperVLine extends WrapperLine {
    setLength(l) {
        l > 0 ?
            this.setEnd(['90D', l]) :
            this.setEnd(['270D', -l])
        return this;
    }
}

export class WrapperVector extends WrapperLine {
    constructor(handler) {
        super(handler);
        this.setStrokeColor('black')
            .setFillColor('black')
            .setStrokeWidth(2)
            .showArrow(1, 1);
    }
}

export class WrapperHVector extends WrapperVector {
    setLength(l) {
        return (l > 0) ?
            this.setEnd(['0D', l]) :
            this.setEnd(['180D', -l])
    }

    getLabel() {
        let lbl = super.getLabel();
        if (typeof lbl === 'string') {
            lbl = new Text()
                .alignTo(this)
                .setLabel(lbl)
                .setOffset([0, -6])
                .setFontStyle('');
        }
        return lbl;
    }
}