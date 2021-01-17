const _pi6 = Math.PI / 6;   //30deg
// const _pi2 = Math.PI / 2;   //90deg
// const _3pi2 = 3 * _pi2;     //270deg
const _2pi = 2 * Math.PI;   //360deg

function getAngle(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    return Math.atan2(dy, dx);
}

function normalizeDegree(deg) {
    if (deg > 360)
        deg %= 360;
    else if (deg < 0)
        deg = deg % 360 + 360;
    return deg;
}

function normalizeRadian(rad) {
    if (rad > _2pi)
        rad %= _2pi;
    else if (rad < 0)
        rad = rad % _2pi + _2pi;
    return rad;
}

// function rad2Deg(rad) {
//     return 180 * rad / Math.PI;
// }

function deg2Rad(deg) {
    return Math.PI * normalizeDegree(deg) / 180;
}

class Shape {
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
        this.basePosition = position;
        this.calculateFinalPosition();
        return this;
    }

    /**
     * @param offset [xOffset,yOffset]
     * @returns {Shape}
     */
    setOffset(offset) {
        this.offset = offset;
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
        return this.xy;
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

export class Circle extends Shape {

    setRadius(radius) {
        this.r = radius;
        return this;
    }

    getExternalPoint(angle, gap) {
        let c = this.getPosition();
        return [c[0] + (this.r + gap) * Math.cos(angle), c[1] + (this.r + gap) * Math.sin(angle)]
    }

    render(canvasCtx) {
        canvasCtx.beginPath();
        let c = this.getPosition();
        canvasCtx.arc(c[0], c[1], this.r, 0, _2pi);
        canvasCtx.closePath();
        super.render(canvasCtx);
    }
}

export class Line extends Shape {
    constructor() {
        super();
        this.setStrokeWidth(1);
    }

    /**
     * @param shape1 shape 1
     * @param shape2 shape 2
     * @param gap the gap between line and target shapes. gap>=0
     */
    between(shape1, shape2, gap = 0) {
        let c1 = shape1.getCenterPoint();
        let c2 = shape2.getCenterPoint();
        c1 = shape1.getExternalPoint(getAngle(c1[0], c1[1], c2[0], c2[1]), gap);
        c2 = shape2.getExternalPoint(getAngle(c2[0], c2[1], c1[0], c1[1]), gap);
        this.setPosition(c1);
        this.lineTo(c2);
        return this;
    }

    /**
     * @param point [x,y] or [intR, length] for radian or [intD, length] for degree
     */
    lineTo(point) {
        if (typeof point[0] === 'string') {
            let i = point[0].length - 1;
            let c = point[0][i];
            let v = Number(point[0].substring(0, i));
            if (c === 'R' || c === 'r') {
                this.secondP = this.getTargetPoint(v, point[1]);
            } else if (c === 'D' || c === 'd') {
                this.secondP = this.getTargetPoint(deg2Rad(v), point[1]);
            } else {
                throw new Error('wrong input');
            }
        } else {
            this.secondP = point;
        }
    }

    getTargetPoint(r, d) {
        let p = this.getPosition();
        return [p[0] + Math.cos(r) * d, p[1] + Math.sin(r) * d];
    }

    getCenterPoint() {
        let p = this.getPosition();
        return [(p[0] + this.secondP[0]) / 2, (p[1] + this.secondP[1]) / 2]
    }

    /**
     * show arrows on the line
     * @param direction 0 or 1
     * @param places array of float values, each is 0 - 1;
     * @return Shape
     */
    showArrow(direction, places) {
        this.direction = direction;
        this.places = places;
        return this;
    }

    drawArrow(canvasCtx, length, angle, x, y) {
        canvasCtx.beginPath();
        let p1 = [x + length * Math.cos(angle - _pi6), y + length * Math.sin(angle - _pi6)];
        let p2 = [x + length * Math.cos(angle + _pi6), y + length * Math.sin(angle + _pi6)];
        canvasCtx.moveTo(x, y);
        canvasCtx.lineTo(p1[0], p1[1]);
        canvasCtx.lineTo(p2[0], p2[1]);
        canvasCtx.closePath();
        super.render(canvasCtx);
    }

    render(canvasCtx) {
        let p1 = this.getPosition();
        canvasCtx.beginPath();
        canvasCtx.moveTo(p1[0], p1[1]);
        canvasCtx.lineTo(this.secondP[0], this.secondP[1]);
        canvasCtx.closePath();
        super.render(canvasCtx);
        if (this.direction !== undefined && this.places !== undefined) {
            if (!this.places[0])
                this.places = [this.places];
            let angle = this.direction ? getAngle(this.secondP[0], this.secondP[1], p1[0], p1[1]) : getAngle(p1[0], p1[1], this.secondP[0], this.secondP[1]);
            for (let i = 0; i < this.places.length; i++) {
                let x = p1[0] + (this.secondP[0] - p1[0]) * this.places[i];
                let y = p1[1] + (this.secondP[1] - p1[1]) * this.places[i];
                this.drawArrow(canvasCtx, 10, angle, x, y);
            }
        }
    }
}

export class Rectangle extends Shape {

    setWidth(width) {
        this.width = width;
        return this;
    }

    setHeight(height) {
        this.height = height;
        return this;
    }

    getCenterPoint() {
        let p = this.getPosition();
        return [p[0] + this.width / 2, p[1] + this.height / 2]
    }

    getExternalPoint(angle, gap) {
        let c = this.getCenterPoint();
        let p = this.getPosition();
        let rbc = getAngle(c[0], c[1], p[0] + this.width, p[1] + this.height);//right-bottom corner
        let lbc = Math.PI - rbc;//left-bottom corner
        let ltc = Math.PI + rbc;//left-top corner
        let rtc = _2pi - rbc;//right-top corner

        angle = normalizeRadian(angle);//get angle between 0 - ~629

        if (angle >= rbc && angle < lbc) {//cross bottom edge
            return this.getTBTarget(c, angle, gap, 1);
        } else if (angle >= lbc && angle < ltc) {//cross left edge
            return this.getLRTarget(c, angle, gap, -1);
        } else if (angle >= ltc && angle < rtc) {//cross top edge
            return this.getTBTarget(c, angle, gap, -1);
        } else {//cross right edge
            return this.getLRTarget(c, angle, gap, 1);
        }
    }

    getTBTarget(c, angle, gap, sign) {
        let l = (this.height / 2) / Math.sin(angle);
        l += sign * gap;
        return [c[0] + sign * l * Math.cos(angle), c[1] + sign * l * Math.sin(angle)];
    }

    getLRTarget(c, angle, gap, sign) {
        let l = (this.width / 2) / Math.cos(angle)
        l += sign * gap;
        return [c[0] + sign * l * Math.cos(angle), c[1] + sign * l * Math.sin(angle)];
    }

    render(canvasCtx) {
        canvasCtx.beginPath();
        let p = this.getPosition();
        canvasCtx.rect(p[0], p[1], this.width, this.height);
        canvasCtx.closePath();
        super.render(canvasCtx);
    }
}

export class DrawBox {
    lst = [];

    addShape(shape) {
        this.lst.push(shape);
        return this;
    }

    render(canvas) {
        let ctx = canvas.getContext('2d');
        this.lst.forEach(v => v.render(ctx));
    }
}