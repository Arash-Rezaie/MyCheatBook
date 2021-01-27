import {Rectangle} from "../simple/rectangle";
import {Text} from "../simple/text";
import {Line} from "../simple/line";
import {ExtendedLine} from "./extended-line";

export class Caption extends Rectangle {
    constructor(handler) {
        super();
        this.handler = handler;
    }

    setLabel(label) {
        if (typeof label === 'string') {
            label = new Text()
                .setPosition(this.getCenterPoint())
                .setLabel(label)
                .setOffset([0, 5])
                .setFontStyle('bold');
        } else {
            label = this.handler.generateShape(label);
        }
        return super.setLabel(label);
    }

    connectTo(refId) {
        this.drawBox.addDirectShape(new ExtendedLine(this.handler)
            .between(this, this.handler.getTargetShape(refId), 5)
            .setStrokeColor('red')
            .setFillColor('red')
            .setStrokeWidth(1));
        return this;
    }
}