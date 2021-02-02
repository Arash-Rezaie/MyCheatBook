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
    moveTo(point) {
        this.points.push({type: 'm', point: point});
        return this;
    }

    /**
     * @param point [x,y,ox,oy] or [intR,length,ox,oy] for radian, [intD,length,ox,oy] for degree or [shape,gap,ox,oy].<br/>
     */
    lineTo(point) {
        this.points.push({type: 'l', point: new Line().setEnd(point)});
        return this;
    }

    /**
     * @param curve [x,y,ox,oy] or [intR,length,ox,oy] for radian, [intD,length,ox,oy] for degree or [shape,gap,ox,oy].<br/>
     * @param end [x,y,ox,oy] or [intR,length,ox,oy] for radian, [intD,length,ox,oy] for degree or [shape,gap,ox,oy].<br/>
     */
    quadraticTo(curve, end) {
        this.points.push({type: 'l', point: new Line().setQuadraticPoint(curve).setEnd(end)});
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
        this.generateLines().forEach(v => v.render(canvasCtx));
    }

    generateLines() {
        let lines = this.getLines();
        let lengths = lines.lengths;
        lines = lines.lines;

        //deter mine arrow position
        if (this.places != null && this.places.length > 0) {
            let repo = this.getDistributedArrowPlaces(lengths);
            for (let k in repo) {
                lines[repo[k].key].showArrow(this.direction, repo[k].items);
            }
        }

        return lines;
    }

    getLines() {
        let lines = [];
        let lengths = [0];

        let temp = null, line, len;
        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i].type === 'm') {
                temp = this.points[i].point;
            } else {
                line = this.points[i].point;
                line.setStart(temp != null ? temp : lines[lines.length - 1].getEnd());
                temp = null;
                line.setOffset(this.offset);
                this.initLine(line);
                lengths.push(line.getLength() + lengths[lengths.length - 1]);
                lines.push(line);
            }
        }
        return {lines: lines, lengths: lengths}
    }

    getDistributedArrowPlaces(lengths) {
        let max = lengths[lengths.length - 1];
        let p, temp, repo = [];
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