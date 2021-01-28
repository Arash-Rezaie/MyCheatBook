import {Utils} from "../../../tools/utils";
import {Shape} from "./shape";

class Point {
    pos;

    constructor(initValues) {
        this.pos = initValues;
    }

    locateByPoint(point) {
    }

    getPosition() {
        return this.pos;
    }

    getAnchorPointByAngle(angle) {
        return this.pos;
    }

    getAnchorPointByPoint(point) {
        return this.pos;
    }

    locateAnchor(...points) {
    }

    getAnchor() {
        return this.pos;
    }
}

class AnglePoint extends Point {
    constructor(initValues) {
        super();
        let i = initValues[0].length - 1;
        let c = initValues[0][i];
        let v = Number(initValues[0].substring(0, i));
        if (c === 'R' || c === 'r') {
            this.angle = Utils.normalizeRadian(v);
            this.distance = initValues[1];
        } else if (c === 'D' || c === 'd') {
            this.angle = Utils.normalizeRadian(Utils.deg2Rad(v));
            this.distance = initValues[1];
        } else {
            throw new Error('wrong input');
        }
    }

    locateByPoint(point) {
        let anchor = point.getAnchorPointByAngle(this.angle);
        this.pos = Utils.getPointByAngle(anchor, this.angle, this.distance);
    }
}

class ShapePoint extends Point {
    cache = []; //item sample: [angles] => {points: [p], anchor: a}

    constructor(initValues) {
        super();
        this.shape = initValues[0];
        this.gap = initValues[1];
    }

    locateByPoint(point) {
        this.pos = this.shape.getCenterPoint();
    }

    getAnchorPointByAngle(angle) {
        if (this.cache[angle] == null)
            this.cache[angle] = {'pos': this.shape.getExternalPoint(angle, this.gap)};
        return this.cache[angle]['pos'];
    }

    getAnchorPointByPoint(point) {
        let angle = this.cachePointAndGetAngle(point);
        return this.cache[angle]['pos'];
    }

    cachePointAndGetAngle(point) {
        let angle = this.searchCacheByPoint(point);

        //catch the angle
        if (angle == null) {
            angle = Utils.getAngleByPoint(this.shape.getCenterPoint(), point.getPosition());

            //store angle-pos pair
            this.getAnchorPointByAngle(angle);
        }

        //store angle-point pair
        this.cache[angle]['point'] = point;

        return angle;
    }

    searchCacheByPoint(point) {
        for (let k in this.cache)
            if (this.cache[k]['point'] === point)
                return k;
    }

    getAvgAngle(angles) {
        let avg = angles[0];
        for (let i = 1; i < angles.length; i++) {
            let midAngle = (avg + angles[i]) / 2;
            if (Math.abs(avg - angles[i]) > Math.PI) //if angle1 - angle3 > 180deg => correct mid angle
                midAngle = Utils.reverseRad(midAngle);
            avg = midAngle;
        }
        return avg;
    }

    locateAnchor(...points) {
        let angles = [];
        points.forEach(v => angles.push(this.cachePointAndGetAngle(v)));
        if (angles.length > 1)
            angles = this.getAvgAngle(angles);
        this.anchor = this.getAnchorPointByAngle(angles);
    }

    getAnchor() {
        return this.anchor;
    }
}


export class Line2 extends Shape {
    start;
    end;
    qCurve;
    processed = false;

    constructor() {
        super();
        this.setStrokeWidth(1);
    }

    setPosition(position) {
        this.start = this.getPointObject(position);
        return this;
    }

    setStart(point) {
        return this.setPosition(point);
    }

    setEnd(point) {
        this.end = this.getPointObject(point);
        return this;
    }

    setQuadraticPoint(point) {
        this.qCurve = this.getPointObject(point);
        return this;
    }

    /**
     * @param point [x,y] or [intR, length] for radian, [intD, length] for degree or [shape,gap].<br/>
     */
    getPointObject(point) {
        switch (this.getTypeOf(point)) {
            case "number,number"://[x,y]
                return new Point(point);
            case "string,number"://[intR,length] or [intD,length]
                return new AnglePoint(point);
            case "object,number"://[shape,gap]
                return new ShapePoint(point);
            default:
                throw new Error('wrong input');
        }
    }

    getTypeOf(point) {
        return typeof point[0] + ',' + typeof point[1]
    }

    render(canvasCtx) {
        this.preparePoints();
        let ps = this.start.getAnchor();
        let pe = this.end.getAnchor();

        canvasCtx.beginPath();
        canvasCtx.fillStyle = 'transparent';
        canvasCtx.moveTo(ps[0], ps[1]);
        if (this.qCurve) {
            let p2 = this.qCurve.getAnchor();
            canvasCtx.quadraticCurveTo(p2[0], p2[1], pe[0], pe[1]);
        } else {
            canvasCtx.lineTo(pe[0], pe[1]);
        }
        this.fillColor2 = this.fillColor;
        this.fillColor = undefined;
        super.render(canvasCtx);
        this.fillColor = this.fillColor2;
        if (this.direction !== undefined && this.places !== undefined) {
            let info = this.getArrowInfo();
            let x, y;
            for (let i = 0; i < info.length; i++) {
                x = ps[0] + (pe[0] - ps[0]) * info[i][0];
                y = ps[1] + (pe[1] - ps[1]) * info[i][0];
                this.drawArrow(canvasCtx, 10, info[i][1], x, y);
            }
        }
    }

    preparePoints() {
        debugger
        if (!this.processed) {
            this.start.locateByPoint();
            this.end.locateByPoint(this.start);
            if (this.qCurve != null) {
                this.qCurve.locateByPoint(this.start);
                this.qCurve.locateAnchor(this.start, this.end);
                this.end.locateAnchor(this.qCurve);
                this.start.locateAnchor(this.qCurve);
            } else {
                this.end.locateAnchor(this.start);
                this.start.locateAnchor(this.end);
            }
            this.processed = true;
        }
    }

    getCenterPoint() {
        this.preparePoints();
        return [(this.start[0] + this.end[0]) / 2, (this.start[1] + this.end[1]) / 2]
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
        let p1 = [x - length * Math.cos(angle - Utils._PI6), y - length * Math.sin(angle - Utils._PI6)];
        let p2 = [x - length * Math.cos(angle + Utils._PI6), y - length * Math.sin(angle + Utils._PI6)];
        canvasCtx.moveTo(x, y);
        canvasCtx.lineTo(p1[0], p1[1]);
        canvasCtx.lineTo(p2[0], p2[1]);
        canvasCtx.closePath();
        super.render(canvasCtx);
    }

    getArrowInfo() {
        let ans = [];

        if (typeof this.places === 'number')
            this.places = [this.places];

        if (this.qCurve != null) {
            this.places = this.shrinkTo01(this.places);
            this.places.forEach(v => ans.push([v, this.getArrowAngleForQCurve(v)]));
        } else {
            let angle = this.direction ?
                Utils.getAngleByPoint(this.start.getAnchor(), this.end.getAnchor()) :
                Utils.getAngleByPoint(this.end.getAnchor(), this.start.getAnchor());
            this.places.forEach(v => ans.push([v, angle]));
        }
        this.length = Utils.getLengthByPoints(this.start.getAnchor(), this.end.getAnchor());
        return ans;
    }

    getArrowAngleForQCurve(place) {
        if (this.direction) {
            return place <= 0.5 ?
                Utils.getAngleByPoint(this.start.getAnchor(), this.qCurve.getAnchor()) :
                Utils.getAngleByPoint(this.qCurve.getAnchor(), this.end.getAnchor());
        } else {
            return place <= 0.5 ?
                Utils.getAngleByPoint(this.qCurve.getAnchor(), this.start.getAnchor()) :
                Utils.getAngleByPoint(this.end.getAnchor(), this.qCurve.getAnchor());
        }
    }

    shrinkTo01(a) {
        let ans = [];
        a.forEach(v => v <= 0.5 ? ans[0] = 0 : ans[1] = 1);
        return ans[0] == null ? [1] : ans;
    }
}