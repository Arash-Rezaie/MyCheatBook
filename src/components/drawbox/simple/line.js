import {Utils} from "../../../tools/utils";
import {Shape,Text} from "./shape";

export class Line extends Shape {
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
        let ans = {};
        switch (this.getTypeOf(point)) {
            case "number,number"://[x,y]
                ans["xy"] = point;
                break;
            case "string,number"://[intR,length] or [intD,length]
                let i = point[0].length - 1;
                let c = point[0][i];
                let v = Number(point[0].substring(0, i));
                if (c === 'R' || c === 'r') {
                    ans["angle"] = Utils.normalizeRadian(v);
                    ans["gap"] = point[1];
                } else if (c === 'D' || c === 'd') {
                    ans["angle"] = Utils.normalizeRadian(Utils.deg2Rad(v));
                    ans["gap"] = point[1];
                } else {
                    throw new Error('wrong input');
                }
                break;
            case "object,number"://[shape,gap]
                ans["shape"] = point[0];
                ans["gap"] = point[1];
                break;
            default:
                throw new Error('wrong input');
        }
        return ans;
    }

    getTypeOf(point) {
        return typeof point[0] + ',' + typeof point[1]
    }

    render(canvasCtx) {
        this.preparePoints();
        canvasCtx.beginPath();
        canvasCtx.fillStyle = 'transparent';
        canvasCtx.moveTo(this.start["xy"][0], this.start["xy"][1]);
        if (this.qCurve)
            canvasCtx.quadraticCurveTo(this.qCurve["xy"][0], this.qCurve["xy"][1], this.end["xy"][0], this.end["xy"][1]);
        else
            canvasCtx.lineTo(this.end["xy"][0], this.end["xy"][1]);
        // canvasCtx.closePath();
        this.fillColor2 = this.fillColor;
        this.fillColor = undefined;
        super.render(canvasCtx);
        this.fillColor = this.fillColor2;
        if (this.direction !== undefined && this.places !== undefined) {
            let info = this.getArrowInfo();
            let p1 = this.start["xy"];
            let p2 = this.end["xy"];
            let x, y;
            for (let i = 0; i < info.length; i++) {
                x = p1[0] + (p2[0] - p1[0]) * info[i][0];
                y = p1[1] + (p2[1] - p1[1]) * info[i][0];
                this.drawArrow(canvasCtx, 10, info[i][1], x, y);
            }
        }
    }

    preparePoints() {
        debugger
        if (!this.processed) {
            if (this.qCurve != null) {
                //! end must be calculated based on start, but there is a situation than end is shape and the angle could be dynamic, so end can be calculated by curve
                if (this.qCurve["shape"] != null) {
                    this.process2PointsXY(this.qCurve, this.start, true);
                    this.process2PointsXY((this.end["shape"] != null ? this.qCurve : this.start), this.end, true);
                    this.processCurveAsShape(this.start, this.qCurve, this.end);//pick an accurate point for curve between 2 angles
                } else {
                    this.process2PointsXY(this.start, this.qCurve);
                    this.process2PointsXY((this.end["shape"] != null ? this.qCurve : this.start), this.end);
                }
            } else {
                this.process2PointsXY(this.start, this.end);
            }
            this.processed = true;
        }
    }

    process2PointsXY(p1, p2, ignoreP1XYModification = false) {
        let c1;
        if (p2["xy"] == null) {
            if (p2["angle"] != null) {
                let angle = p2["angle"];
                p2["xy"] = Utils.getPointByAngle(this.getTargetXY(p1, angle), angle, p2["gap"]);
            } else if (p2["shape"] != null) {
                c1 = this.getPointCenter(p1);
                let c2 = p2["shape"].getCenterPoint();
                let angle = Utils.getAngle(c2[0], c2[1], c1[0], c1[1]);//angle from p2 to p1
                p2["xy"] = this.getTargetXY(p2, angle);
            } else {
                throw new Error("no way to calculate point.xy");
            }
        }

        if (!ignoreP1XYModification && p1["xy"] == null) {
            if (c1 == null)
                c1 = this.getPointCenter(p1);
            let angle = Utils.getAngleByPoint(c1, p2["xy"]);
            p1["xy"] = this.getTargetXY(p1, angle);
        }
    }

    getPointCenter(p) {
        if (p["xy"]) {
            return p["xy"];
        } else if (p["shape"] != null) {
            return p["shape"].getCenterPoint();
        } else {
            throw new Error("p1 is not acceptable. It must be a point or a shape")
        }
    }

    processCurveAsShape(start, curve, end) {
        let t = this.qCurve["shape"].getCenterPoint();
        let angle1 = Utils.getAngleByPoint(t, start["xy"]);
        let angle2 = Utils.getAngleByPoint(t, end["xy"]);
        curve["xy"] = this.getTargetXY(curve["shape"], this.getMidAngle(angle1, angle2));
    }

    getMidAngle(angle1, angle2) {
        let midAngle = (angle1 + angle2) / 2;
        if (Math.abs(angle1 - angle2) > Math.PI) //if angle1 - angle3 > 180deg => correct mid angle
            midAngle = Utils.reverseRad(midAngle);
        return midAngle;
    }
    
    getTargetXY(p, angle) {
        if (p["shape"] != null) {
            return p["shape"]["getExternalPoint"] != null ?
                p["shape"].getExternalPoint(angle, p["gap"]) :
                Utils.getPointByAngle(p["shape"].getCenterPoint(), angle, p["gap"])
        } else {
            return p["xy"];
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
                Utils.getAngleByPoint(this.start["xy"], this.end["xy"]) :
                Utils.getAngleByPoint(this.end["xy"], this.start["xy"]);
            this.places.forEach(v => ans.push([v, angle]));
        }
        this.length = Utils.getLengthByPoints(this.start["xy"], this.end["xy"]);
        return ans;
    }

    getArrowAngleForQCurve(place) {
        if (this.direction) {
            return place <= 0.5 ?
                Utils.getAngleByPoint(this.start["xy"], this.qCurve["xy"]) :
                Utils.getAngleByPoint(this.qCurve["xy"], this.end["xy"]);
        } else {
            return place <= 0.5 ?
                Utils.getAngleByPoint(this.qCurve["xy"], this.start["xy"]) :
                Utils.getAngleByPoint(this.end["xy"], this.qCurve["xy"]);
        }
    }

    shrinkTo01(a) {
        let ans = [];
        a.forEach(v => v <= 0.5 ? ans[0] = 0 : ans[1] = 1);
        return ans[0] == null ? [1] : ans;
    }
}

export class HLine
    extends Line {
    setLength(l) {
        l > 0 ?
            this.lineTo(['0D', l]) :
            this.lineTo(['180D', -l])
        return this;
    }
}

export class VLine extends Line {
    setLength(l) {
        l > 0 ?
            this.lineTo(['90D', l]) :
            this.lineTo(['270D', -l])
        return this;
    }
}

export class Vector extends Line {
    constructor() {
        super();
        this.setStrokeColor('black')
            .setFillColor('black')
            .setStrokeWidth(2)
            .showArrow(1, 1);
    }
}

export class HVector extends Vector {
    setLabel(label) {
        if (typeof label === 'string')
            label = new Text()
                .setPosition(this.getCenterPoint())
                .setLabel(label)
                .setOffset([0, -6])
                .setFontStyle('');
        return super.setLabel(label);
    }

    setLength(l) {
        return (l > 0) ?
            this.lineTo(['0D', l]) :
            this.lineTo(['180D', -l])
    }
}