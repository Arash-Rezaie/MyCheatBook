import {Line} from "../simple/line";
import {Text} from "../simple/shape";

export class ExtendedLine extends Line {
    constructor(handler) {
        super();
        this.handler = handler;
    }

    setLabel(label) {
        return (label.label) ? super.setLabel(this.handler.generateShape(label)) : super.setLabel(label);
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

export class ExtendedHLine extends ExtendedLine {
    setLength(l) {
        l > 0 ?
            this.setEnd(['0D', l]) :
            this.setEnd(['180D', -l])
        return this;
    }
}

export class ExtendedVLine extends ExtendedLine {
    setLength(l) {
        l > 0 ?
            this.setEnd(['90D', l]) :
            this.setEnd(['270D', -l])
        return this;
    }
}

export class ExtendedVector extends ExtendedLine {
    constructor(handler) {
        super(handler);
        this.setStrokeColor('black')
            .setFillColor('black')
            .setStrokeWidth(2)
            .showArrow(1, 1);
    }
}

export class ExtendedHVector extends ExtendedVector {
    setLength(l) {
        return (l > 0) ?
            this.setEnd(['0D', l]) :
            this.setEnd(['180D', -l])
    }

    setLabel(label) {
        if (typeof label === 'string') {
            label = new Text()
                .setPosition(this.getCenterPoint())
                .setLabel(label)
                .setOffset([0, -6])
                .setFontStyle('');
        } else {
            label = this.handler.generateShape(label);
        }
        return super.setLabel(label);
    }
}