import {Rectangle} from "./simple/rectangle";
import {Text} from "./simple/shape";

export class Caption extends Rectangle {
    getLabel() {
        let lbl = super.getLabel();
        return new Text()
            .setPosition(this.getCenterPoint())
            .setLabel(lbl)
            .setOffset([0, 5])
            .setFontStyle('bold');
    }

    getConnectionLine() {

    }
}