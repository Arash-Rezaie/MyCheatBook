import {Path} from "../simple/path";
import {Utils} from "../../../tools/utils";

export class WrapperPath extends Path {
    constructor(handler) {
        super();
        this.handler = handler;
    }

    getLabel() {
        let lbl = super.getLabel();
        return (lbl.label) ? this.handler.generateShape(lbl).alignTo(this) : lbl;
    }

    /**
     * offset can come after each point, then offset affects the that point<br/>
     * quadratic can come before a line, then quadratic affects the proceeding line
     * x,y: [x,y] or [intR,length] for radian, [intD,length] for degree or [shape,gap].<br/>
     * ox,oy: [num,num]<br/>
     *
     * @param path
     *      'm x y':moveTo([x,y])<br/>
     *      'l x y':lineTo([x,y])<br/>
     *      'q x y':quadraticTo([x,y])<br/>
     *      'o ox oy':offset([ox,oy])<br/>
     *
     * @return {WrapperPath}
     */
    setPath(path) {
        let arr = path.split(/ +/);
        this.path = [];
        for (let i = 0; i < arr.length; i++) {
            switch (arr[i]) {
                case 'm':
                    this.path.push({m: 'moveTo', args: [[this.getTargetShape(arr[i + 1]), Number(arr[i + 2])]]});
                    break;
                case 'o':
                    Utils.last(Utils.last(this.path).args).push(Number(arr[i + 1]), Number(arr[i + 2]));
                    break;
                case 'q':
                    this.path.push({m: 'quadraticTo', args: [[this.getTargetShape(arr[i + 1]), Number(arr[i + 2])]]})
                    break;
                case 'l':
                    Utils.last(this.path).m === 'quadraticTo' ?
                        Utils.last(this.path).args.push([this.getTargetShape(arr[i + 1]), Number(arr[i + 2])]) :
                        this.path.push({m: 'lineTo', args: [[this.getTargetShape(arr[i + 1]), Number(arr[i + 2])]]})
                    break;
                default:
                    throw new Error('Wrong input')
            }
            i += 2;
        }
        return this;
    }

    getTargetShape(value) {
        return (typeof value === 'string' && !value.match('\\d+[dDrR]')) ? this.handler.getTargetShape(value) : value;
    }

    moveTo(points) {
        return super.moveTo(points[0]);
    }

    lineTo(points) {
        return super.lineTo(points[0]);
    }

    quadraticTo(points) {
        return super.quadraticTo(points[0], points[1]);
    }

    setType(type) {
        this.setStrokeWidth(1);
        switch (type) {
            case 'ii':
                this.setColor("green");
                this.showArrow(1, 1);
                break;
            case 'ci':
                this.setColor("green");
                this.setStrokeStyle([10, 5]);
                this.showArrow(1, 1);
                break;
            case 'cc':
                this.setColor("blue");
                this.showArrow(1, 1);
                break;
            case 'c@':
            case 'i@':
                this.setColor("green");
                this.setStrokeStyle([3, 3]);
                break;
            default:
                break;
        }
    }

    render(canvasCtx) {
        this.path.forEach(v => this[v.m](v.args));
        super.render(canvasCtx);
    }
}