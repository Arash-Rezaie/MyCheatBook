export class Shape {
    static colors = {
        'green': ['rgb(51, 204, 51)', 'rgb(0, 153, 51)'],
        'blue': ['rgb(51, 102, 255)', 'rgb(0, 0, 255)'],
        'red': ['rgb(255,0,0)', 'rgb(137,16,16)'],
        'yellow': ['rgb(255, 255, 102)', 'rgb(255, 204, 0)'],
        'purple': ['rgb(153, 51, 255)', 'rgb(121,7,191)'],
        'brown': ['rgb(153, 102, 0)', 'rgb(102, 51, 0)'],
        'orange': ['rgb(255, 153, 51)', 'rgb(255, 102, 0)'],
        'pink': ['rgb(255, 102, 153)', 'rgb(255, 51, 153)'],
    };

    constructor() {
        this.fillColor = undefined;
        this.label = undefined;
        this.strokeWidth = 0;
        this.strokeColor = '#000';
        this.strokeStyle = [1, 0];
        this.offset = [0, 0];
        this.basePosition = [0, 0];
        this.xy = [0, 0];
    }

    /**
     * calculate final position
     */
    calculateFinalPosition() {
        this.xy = [this.basePosition[0] + this.offset[0], this.basePosition[1] + this.offset[1]];
    }

    /**
     * @param fillColor internal color. ex. 'black' or '#000' or rgb(0,0,0) or hsl(0,0%,0%)
     * @returns {Shape}
     */
    setFillColor(fillColor) {
        this.fillColor = fillColor;
        return this;
    }

    /**
     * @param strokeWidth int value
     * @returns {Shape}
     */
    setStrokeWidth(strokeWidth) {
        this.strokeWidth = strokeWidth;
        return this;
    }

    /**
     * set both fill color and stroke color
     * @param color [green, blue, red, yellow, purple, brown, orange, pink]
     * @return {Shape}
     */
    setColor(color) {
        this.setFillColor(Shape.colors[color][0]);
        this.setStrokeColor(Shape.colors[color][1]);
        return this;
    }

    /**
     * @param strokeColor stroke color. ex. 'black' or '#000' or rgb(0,0,0) or hsl(0,0%,0%)
     * @returns {Shape}
     */
    setStrokeColor(strokeColor) {
        this.strokeColor = strokeColor;
        return this;
    }

    /**
     * make line dashed
     * @param strokeStyle [int,int]. It means [fill, empty]
     * @returns {Shape}
     */
    setStrokeStyle(strokeStyle) {
        this.strokeStyle = strokeStyle;
        return this;
    }

    /**
     * label is going to be shown at center of this shape
     * @param label string or Text object
     * @returns {Shape}
     */
    setLabel(label) {
        if (typeof label === "string") {
            label = new Text()
                .setPosition(this.getCenterPoint())
                .setLabel(label)
        }
        this.label = label;
        return this;
    }

    /**
     * @param position [x,y]
     * @returns {Shape}
     */
    setPosition(position) {
        this.basePosition = [position[0], position[1]];
        this.calculateFinalPosition();
        return this;
    }

    /**
     * @param offset [xOffset,yOffset]
     * @returns {Shape}
     */
    setOffset(offset) {
        this.offset = [offset[0], offset[1]];
        this.calculateFinalPosition();
        return this;
    }

    /**
     * @param shape another shape object
     * @returns {Shape}
     */
    alignTo(shape) {
        this.setPosition(shape.getCenterPoint());
        return this;
    }

    /**
     * get final position
     * @returns {*[]}
     */
    getPosition() {
        return [this.xy[0], this.xy[1]];
    }

    /**
     * get center point of this shape
     */
    getCenterPoint() {
        return this.getPosition();
    }

    getExternalPoint(angle, gap) {
        return this.getPosition();
    }

    /**
     * render label object
     * @param ctx
     */
    showLabel(ctx) {
        let p = this.getCenterPoint();
        this.label.setPosition(p);
        this.label.render(ctx);
    }

    /**
     * apply configurations
     * @param canvasCtx
     */
    render(canvasCtx) {
        canvasCtx.fillStyle = this.fillColor;
        canvasCtx.lineWidth = this.strokeWidth;
        canvasCtx.strokeStyle = this.strokeColor;
        canvasCtx.setLineDash(this.strokeStyle);
        if (this.fillColor)
            canvasCtx.fill();
        if (this.strokeWidth > 0)
            canvasCtx.stroke();
        if (this.label)
            this.showLabel(canvasCtx);
    }
}

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