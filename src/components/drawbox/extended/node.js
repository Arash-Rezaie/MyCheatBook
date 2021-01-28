import {Circle} from "../simple/circle";
import {Text} from "../simple/shape";
import {Caption} from "./caption";
import {ExtendedVector} from "./extended-line";

export class Node extends Circle {
    constructor(handler) {
        super();
        this.handler = handler;
        this.setRadius(20)
            .setStrokeWidth(3)
            .setStrokeColor('black')
            .setFillColor('yellow');
    }

    setLabel(label) {
        if (typeof label === 'string') {
            label = new Text()
                .setPosition(this.getCenterPoint())
                .setLabel(label)
                .setFontSize('20px')
                .setOffset([0, 6]);
        } else {
            label = this.handler.generateShape(label);
        }
        return super.setLabel(label);
    }

    connectTo(refId) {
        this.handler.addDirectShape(new ExtendedVector(this.handler)
            .between(this, this.handler.getTargetShape(refId), 5));
        return this;
    }

    setCaptions(caps) {
        if (caps[0] === undefined)
            caps = [caps];
        caps.forEach((v, i) => {
            this.handler.addDirectShape(
                new Caption(this.handler)
                    .alignTo(this)
                    .setOffset(v.offset ? v.offset : [28, (caps.length * -11.5 + (i * 25))])
                    .setWidth(v.w)
                    .setHeight(20)
                    .setLabel(v.t)
                    .setColor(v.c)
                    .setStrokeWidth(2)
            )
        });
        return this;
    }
}