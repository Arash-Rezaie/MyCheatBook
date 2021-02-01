import {Rectangle} from "../simple/rectangle";
import {Text} from "../simple/shape";
import {WrapperLine} from "./wrapper-line";

export class WrapperCaption extends Rectangle {
    constructor(handler) {
        super();
        this.handler = handler;
    }

    getLabel() {
        let lbl = super.getLabel();
        if (typeof lbl === 'string') {
            lbl = new Text()
                .setLabel(lbl)
                .setOffset([0, 5])
                .setFontStyle('bold');
        } else {
            lbl = this.handler.generateShape(lbl);
        }
        return lbl.alignTo(this);
    }

    connectTo(refId) {
        this.drawBox.addDirectShape(new WrapperLine(this.handler)
            .between(this, this.handler.getTargetShape(refId), 5)
            .setStrokeColor('red')
            .setFillColor('red')
            .setStrokeWidth(1));
        return this;
    }
}