import {WrapperPath} from "./wrapper-path";
import {Utils} from "../../../tools/utils";

export class WrapperTypeRel extends WrapperPath {
    constructor(handler) {
        super(handler);
    }

    setPath(path) {
        throw new Error('you must use between')
    }

    /**
     *
     * @param shapeObject1 [shapeId, offsetX,offsetY]
     * @param shapeObject2 [shapeId, offsetX,offsetY]
     * @param breaker [distance from shape1,'_' or '|', fixation] : [30,'|']
     */
    between(shapeObject1, shapeObject2, breaker) {
        let s = 'm ' + this.getShapeString(shapeObject1) + ' ' +
            this.getLineString(shapeObject1, shapeObject2, breaker) + ' l ' +
            this.getShapeString(shapeObject2);
        super.setPath(s);
    }

    getTargetPoint(shape) {
        let p = this.getTargetShape(shape[0]).getCenterPoint();
        if (shape[1] != null && shape[2] != null) {
            p[0] += shape[1];
            p[1] += shape[2];
        }
        return p;
    }

    getShapeString(shapeInput,) {
        let s = shapeInput[0] + ' 2';
        if (shapeInput[1] != null && shapeInput[2] != null) {
            s += ` o ${shapeInput[1]} ${shapeInput[2]}`;
        }
        return s;
    }

    getLineString(shapeObject1, shapeObject2, breaker) {
        if(breaker[2])
            debugger
        let p1 = this.getTargetPoint(shapeObject1);
        let p2 = this.getTargetPoint(shapeObject2);
        let angle = Utils.normalizeDegree(Utils.rad2Deg(Utils.getAngleByPoint(p1, p2)));
        let s;
        if (breaker[1] === '_') {
            let [l, d] = this.processLen(p2[0] - p1[0], breaker, 0);
            s = angle < 180 ? `l 90d ${breaker[0]} l ${d}d ${l}` : `l 270d ${breaker[0]} l ${d}d ${l}`;
        } else {
            let [l, d] = this.processLen(p2[1] - p1[1], breaker, 90);
            s = (angle < 90 && angle > 270) ? `l 0d ${breaker[0]} l ${d}d ${l}` : `l 180d ${breaker[0]} l ${d}d ${l}`;
        }
        return s;
    }

    processLen(l, breaker, d) {
        if (l < 0) {
            l = -l;
            d += 180;
        }
        if (breaker[2] != null)
            l += breaker[2];
        return [l, d];
    }
}