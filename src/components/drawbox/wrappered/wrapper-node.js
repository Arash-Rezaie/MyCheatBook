import {Circle} from "../simple/circle";
import {Text} from "../simple/shape";
import {WrapperCaption} from "./wrapper-caption";
import {WrapperVector} from "./wrapper-line";

export class WrapperNode extends Circle {
    constructor(handler) {
        super();
        this.handler = handler;
        this.setRadius(20)
            .setStrokeWidth(3)
            .setStrokeColor('black')
            .setFillColor('yellow');
    }

    getLabel() {
        let lbl = super.getLabel();
        if (typeof lbl === 'string') {
            lbl = new Text()
                .setLabel(lbl)
                .setFontSize('20px')
                .setOffset([0, 6]);
        } else {
            lbl = this.handler.generateShape(lbl);
        }
        return lbl.alignTo(this);
    }

    connectTo(refId) {
        this.handler.addDirectShape(new WrapperVector(this.handler)
            .between(this, this.handler.getTargetShape(refId), 5));
        return this;
    }

    setCaptions(caps) {
        if (caps[0] === undefined)
            caps = [caps];
        caps.forEach((v, i) => {
            this.handler.addDirectShape(
                new WrapperCaption(this.handler)
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