import {Shape} from "./shape";
import {Line} from "./line";

export class Path extends Shape {
    points = [];

    constructor() {
        super();
        this.setStrokeWidth(1);
    }

    /**
     * @param point [x,y,ox,oy]
     */
    setStart(point) {
        this.points[0] = point;
        return this;
    }

    setEnd(point) {
        throw new Error('use lineTo(point) instead');
    }

    setQuadraticPoint(point) {
        throw new Error('use quadraticTo(qCurvePoint, endPoint) instead');
    }

    /**
     * @param point [x,y,ox,oy] or [intR,length,ox,oy] for radian, [intD,length,ox,oy] for degree or [shape,gap,ox,oy].<br/>
     */
    lineTo(point) {
        this.points.push(new Line().setEnd(point));
        return this;
    }

    /**
     * @param curve [x,y,ox,oy] or [intR,length,ox,oy] for radian, [intD,length,ox,oy] for degree or [shape,gap,ox,oy].<br/>
     * @param end [x,y,ox,oy] or [intR,length,ox,oy] for radian, [intD,length,ox,oy] for degree or [shape,gap,ox,oy].<br/>
     */
    quadraticTo(curve, end) {
        this.points.push(new Line().setQuadraticPoint(curve).setEnd(end));
        return this;
    }

    /**
     * show arrows on the line
     * @param direction 0 or 1
     * @param places array of float values, each is 0 - 1;
     * @return Shape
     */
    showArrow(direction, places) {
        this.direction = direction;
        this.places = typeof places === 'number' ? [places] : places;
        return this;
    }

    render(canvasCtx) {
        this.prepareLines();
        for (let i = 1; i < this.points.length; i++) {
            this.points[i].render(canvasCtx);
        }
    }

    prepareLines() {
        let lengths = [0]; // extract each line length to determine exact place of arrow

        this.points[1].setStart(this.points[0]);
        this.points[1].setOffset(this.offset);
        this.initLine(this.points[1]);
        lengths.push(this.points[1].getLength());

        for (let i = 2; i < this.points.length; i++) {
            this.points[i].setStart(this.points[i - 1].getEnd());
            this.points[i].setOffset(this.offset);
            this.initLine(this.points[i]);
            lengths.push(lengths[i - 1] + this.points[i].getLength());
        }

        //deter mine arrow position
        if (this.places != null && this.places.length > 0) {
            let repo = this.getDistributedArrowPlaces(lengths);
            for (let k in repo) {
                this.points[repo[k].key + 1].showArrow(this.direction, repo[k].items);
            }
        }
    }

    getDistributedArrowPlaces(lengths) {
        let max = lengths[lengths.length - 1];
        let p, temp;
        let repo = [];
        for (let i = 0; i < this.places.length; i++) {
            p = this.places[i] * max;
            for (let j = 0; j < lengths.length - 1; j++) {
                if (p >= lengths[j] && p <= lengths[j + 1]) {
                    temp = this.getRepoObject(repo, j);
                    temp.items.push((p - lengths[j]) / (lengths[j + 1] - lengths[j]));
                    break;
                }
            }
        }
        return repo;
    }

    getRepoObject(repo, key) {
        if (repo[key] == null)
            repo[key] = {key: key, items: [], places: []};
        return repo[key];
    }

    initLine(line) {
        line.setFillColor(this.fillColor);
        line.setStrokeColor(this.strokeColor);
        line.setStrokeWidth(this.strokeWidth);
        line.setStrokeStyle(this.strokeStyle);
    }
}