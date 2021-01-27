import {Rectangle} from "./simple/rectangle";
import {Text} from "./simple/text";
import {Line} from "./simple/line";

export class Caption extends Rectangle {
    setLabel(label) {
        return super.setLabel(new Text()
            .setPosition(this.getCenterPoint())
            .setLabel(label)
            .setOffset([0, 5])
            .setFontStyle('bold'));
    }

    getConnectionLine(){

    }
}