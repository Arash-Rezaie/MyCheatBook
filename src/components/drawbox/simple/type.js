import {Text} from "./shape";
import {Rectangle} from "./rectangle";
import {Circle} from "./circle";

export class Type extends Rectangle {
    type;
    r = 9;

    constructor(handler) {
        super();
        this.handler = handler;
        this.setFillColor('#ffffe4');
        this.setStrokeColor('#cbcac6');
        this.setStrokeWidth(2);
        this.setHeight(this.r * 2 + 6)
    }

    getLabel() {
        let lbl = super.getLabel();
        if (typeof lbl === 'string') {
            lbl = new Text()
                .alignTo(this)
                .setOffset([this.r + 5, 4])
                .setLabel(lbl)
                .setColor('black')
        }
        return lbl;
    }

    setType(type) {
        this.type = type;
        return this;
    }

    getTagShape(text, color) {
        let circle = new Circle()
            .setPosition(this.getCenterPoint())
            .setOffset([-this.width / 2 + this.r + 3, 0])
            .setRadius(this.r)
            .setFillColor(color);
        circle.setLabel(
            new Text()
                .setPosition(circle.getCenterPoint())
                .setOffset([0, 4])
                .setLabel(text)
        )
        return circle;
    }

    render(canvasCtx) {
        super.render(canvasCtx);
        if (this.type != null)
            this.createTag(this.type).render(canvasCtx);
    }

    createTag(type) {
        switch (type) {
            case 'c':
            case 'class':
                return this.getTagShape('C', '#659199')
            case 'i':
            case 'interface':
                return this.getTagShape('I', '#a1d383')
            case '@':
            case 'annotation':
                return this.getTagShape('@', '#8ab472')
            default:
                break;
        }
    }
}