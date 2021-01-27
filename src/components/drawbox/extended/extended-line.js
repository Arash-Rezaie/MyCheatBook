import {Line} from "../simple/line";
import {Text} from "../simple/text";

export class ExtendedLine extends Line {
    constructor(handler) {
        super();
        this.handler = handler;
    }

    setLabel(label) {
        return (label.label) ? super.setLabel(this.handler.generateShape(label)) : super.setLabel(label);
    }

    between(shape1, shape2, gap = 0) {
        return super.between(this.getTargetShape(shape1), this.getTargetShape(shape2), gap);
    }

    getTargetShape(shape) {
        return (typeof shape === 'string') ? this.handler.getTargetShape(shape) : shape;
    }
}

export class ExtendedHLine extends ExtendedLine {
    setLength(l) {
        l > 0 ?
            this.lineTo(['0D', l]) :
            this.lineTo(['180D', -l])
        return this;
    }
}

export class ExtendedVLine extends ExtendedLine {
    setLength(l) {
        l > 0 ?
            this.lineTo(['90D', l]) :
            this.lineTo(['270D', -l])
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
            this.lineTo(['0D', l]) :
            this.lineTo(['180D', -l])
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