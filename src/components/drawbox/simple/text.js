import {Shape} from "./shape";

export class Text extends Shape {
    constructor() {
        super();
        this.setFillColor('black');
        this.setFontSize('12px');
        this.setFontStyle('');
    }

    setLabel(label) {
        this.txt = label;
        return this;
    }

    /**
     * @param fontSize ex. 12px
     * @returns {Text}
     */
    setFontSize(fontSize) {
        this.fontSize = fontSize;
        return this;
    }

    /**
     * @param fontStyle ex. 'italic' or 'bold' or both 'italic bold'
     * * @returns {Text}
     */
    setFontStyle(fontStyle) {
        this.fontStyle = fontStyle;
        return this;
    }

    render(canvasCtx) {
        canvasCtx.beginPath();
        super.render(canvasCtx);
        canvasCtx.font = this.fontStyle + ' ' + this.fontSize + " Arial";
        canvasCtx.textAlign = "center";
        let c = this.getPosition();
        canvasCtx.fillText(this.txt, c[0], c[1]);
        canvasCtx.closePath();
    }
}