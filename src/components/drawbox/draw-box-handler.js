import {Text} from "./simple/shape";
import {Circle} from "./simple/circle";
import {Rectangle} from "./simple/rectangle";
import {DrawBox} from "./draw-box";
import {ExtendedHVector, ExtendedLine, ExtendedVector, ExtendedVLine} from "./extended/extended-line";
import {Node} from "./extended/node";
import {Caption} from "./extended/caption";
import {Utils} from "../../tools/utils";

export class DrawBoxHandler {
    const
    METHOD_POINTERS = {
        text: () => new Text(),
        circle: () => new Circle(),
        line: () => new ExtendedLine(this),
        rect: () => new Rectangle(),
        node: () => new Node(this),
        cap: () => new Caption(this),
        hline: () => new ExtendedLine(this),
        vline: () => new ExtendedVLine(this),
        vect: () => new ExtendedVector(this),
        hvect: () => new ExtendedHVector(this),
        label: (d, o) => o.setLabel(d),
        color: (d, o) => o.setColor(d),
        fillColor: (d, o) => o.setFillColor(d),
        strokeColor: (d, o) => o.setStrokeColor(d),
        strokeWidth: (d, o) => o.setStrokeWidth(d),
        strokeStyle: (d, o) => o.setStrokeStyle(d),
        radius: (d, o) => o.setRadius(d),
        fontSize: (d, o) => o.setFontSize(d),
        fontStyle: (d, o) => o.setFontStyle(d),
        s:(d, o) => o.setStart(d),
        e:(d, o) => o.setEnd(d),
        q:(d, o) => o.setQuadraticPoint(d),
        arrow: (d, o) => o.showArrow(d[0], d[1]),
        len: (d, o) => o.setLength(d),
        between: (d, o) => o.between(d[0], d[1], d[2]),
        width: (d, o) => o.setWidth(d),
        height: (d, o) => o.setHeight(d),
        conn: (d, o) => o.connectTo(d),
        captions: (d, o) => o.setCaptions(d),
    };

    constructor() {
        this.drawBox = new DrawBox();
        this.container = {};
    }

    /**
     * @param itemConf it is an object with fields:<br/>
     * {
     *    shape: ['text', 'circle', 'line', 'rect', 'node', 'cap', 'hline', 'vline', 'vect', 'hvect']<br/>
     *
     *    --- generic ------<br/>
     *    id: string<br/>
     *    pos: [x, y]<br/>
     *    align: shape<br/>
     *    offset: [dx, dy]<br/>
     *    label: [string, Text-object<br/>
     *    color: ['green', 'blue', 'red', 'yellow', 'purple', 'brown', 'orange', 'pink'], (set fill & stroke together)<br/>
     *    fillColor: color<br/>
     *    strokeColor: color<br/>
     *    strokeWidth: int<br/>
     *    strokeStyle: [int, int], (make stroke dashed)<br/>
     *
     *    --- circle ------<br/>
     *    radius: int<br/>
     *
     *    --- Text ------<br/>
     *    fontSize: value, (ex. '20px' or '12em'<br/>
     *    fontStyle: ['bold', 'italic', 'bold italic'<br/>
     *
     *    --- all line types ------<br/>
     *    s,e,q: [x,y] or [intR, length] or [intD, length]<br/>
     *    arrow: [dir([true, false]), places([0 - 1])]<br/>
     *    between: [id1, id2, gap]<br/>
     *
     *    --- hline & vline & hvect ------<br/>
     *    len: int<br/>
     *
     *    --- rectangle ------<br/>
     *    width: int<br/>
     *    height: int<br/>
     *
     *    --- node & cap ------<br/>
     *    conn: ref-id. (connect to the aligned shape)<br/>
     *    captions: [{t:string, c: 'color string', w:width, offset:[x=0,y=0]}]<br/>
     * }
     */
    addShape(itemConf) {
        this.drawBox.addShape(this.generateShape(itemConf));
        return this;
    }

    addDirectShape(shape) {
        this.drawBox.addShape(shape);
        return this;
    }

    generateShape(itemConf) {
        let o = this.METHOD_POINTERS[itemConf.shape](itemConf);
        this.initShape(itemConf, o);
        let t;
        for (t in itemConf) {
            if (t !== 'shape' && t !== 'id' && t !== 'pos' && t !== 'align' && t !== 'offset') {
                this.METHOD_POINTERS[t](itemConf[t], o);
            }
        }
        return o;
    }

    initShape(conf, o) {
        if (conf.id)
            this.container[conf.id] = o;
        if (conf.pos)
            o.setPosition(conf.pos);
        if (conf.align)
            o.alignTo(this.container[conf.align]);
        if (conf.offset) {
            o.setOffset(conf.offset);
        }
        return o;
    }

    getTargetShape(id) {
        return this.container[id];
    }

    render(canvas) {
        this.drawBox.render(canvas);
    }
}