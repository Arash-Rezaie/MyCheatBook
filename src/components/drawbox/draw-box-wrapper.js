import {Text} from "./simple/shape";
import {Circle} from "./simple/circle";
import {Rectangle} from "./simple/rectangle";
import {DrawBox} from "./draw-box";
import {WrapperHVector, WrapperLine, WrapperVector, WrapperVLine} from "./wrappered/wrapper-line";
import {WrapperNode} from "./wrappered/wrapper-node";
import {WrapperCaption} from "./wrappered/wrapper-caption";
import Dot from "./simple/dot";
import {WrapperPath} from "./wrappered/wrapper-path";
import {Type} from "./simple/type";
import {WrapperTypeRel} from "./wrappered/wrapper-type-rel";

export class DrawBoxWrapper {
    const
    METHOD_POINTERS = {
        text: () => new Text(),
        circle: () => new Circle(),
        line: () => new WrapperLine(this),
        rect: () => new Rectangle(),
        node: () => new WrapperNode(this),
        cap: () => new WrapperCaption(this),
        hline: () => new WrapperLine(this),
        vline: () => new WrapperVLine(this),
        vect: () => new WrapperVector(this),
        hvect: () => new WrapperHVector(this),
        dot: () => new Dot(),
        path: () => new WrapperPath(this),
        type: () => new Type(),
        typerel: () => new WrapperTypeRel(this),
        label: (d, o) => o.setLabel(d),
        color: (d, o) => o.setColor(d),
        fillColor: (d, o) => o.setFillColor(d),
        strokeColor: (d, o) => o.setStrokeColor(d),
        strokeWidth: (d, o) => o.setStrokeWidth(d),
        strokeStyle: (d, o) => o.setStrokeStyle(d),
        radius: (d, o) => o.setRadius(d),
        fontSize: (d, o) => o.setFontSize(d),
        fontStyle: (d, o) => o.setFontStyle(d),
        start: (d, o) => o.setStart(d),
        end: (d, o) => o.setEnd(d),
        qCurve: (d, o) => o.setQuadraticPoint(d),
        arrow: (d, o) => o.showArrow(d[0], d[1]),
        len: (d, o) => o.setLength(d),
        between: (d, o) => o.between(d[0], d[1], d[2]),
        width: (d, o) => o.setWidth(d),
        height: (d, o) => o.setHeight(d),
        conn: (d, o) => o.connectTo(d),
        captions: (d, o) => o.setCaptions(d),
        lineTo: (d, o) => o.lineTo(d),
        curveTo: (d, o) => o.quadraticTo(d[0], d[1]),
        t: (d, o) => o.setType(d),
        p: (d, o) => o.setPath(d),
    };

    constructor() {
        this.drawBox = new DrawBox();
        this.container = {};
    }

    /**
     * @param itemConf it is an object with fields:<br/>
     * {
     *    shape: ['text', 'circle', 'line', 'rect', 'node', 'cap', 'hline', 'vline', 'vect', 'hvect','dot','path', 'type', 'typerel']<br/>
     *
     *    --- generic ------<br/>
     *    id: string<br/>
     *    pos: [x, y]<br/>
     *    align: shape<br/>
     *    offset: [dx, dy]<br/>
     *    label: [string, Text-object<br/>
     *    color: ['green', 'blue', 'red', 'yellow', 'purple', 'brown', 'orange', 'pink', 'black', 'white'], (set fill & stroke together)<br/>
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
     *    --- all line types except path ------<br/>
     *    start, end ,qCurve: [x,y] or [intR, length] or [intD, length] or [shapeId, gap]<br/>
     *    arrow: [dir([true, false]), places([0 - 1])]<br/>
     *    between: [id1, id2, gap]<br/>
     *
     *    --- hline & vline & hvect ------<br/>
     *    len: int<br/>
     *
     *    --- path ------<br/>
     *    p: 'm x y':moveTo([x,y]) | 'l x y':lineTo([x,y]) | 'q x y':quadraticTo([x,y]) | 'o ox oy':offset([ox,oy])<br/>
     *    t: 'ii' | 'i@' | 'ci' | 'cc' | 'c@' (sides of a relationship)<br/>
     *
     *    --- typerel ------<br/>
     *    between: [[shapeId1,offsetX,offsetY],[shapeId2,offsetX,offsetY],[gap,'|' or '_']]<br/>
     *    t:'ii' | 'i@' | 'ci' | 'cc' | 'c@' (sides of a relationship)<br/>
     *
     *    --- rectangle ------<br/>
     *    width: int<br/>
     *    height: int<br/>
     *
     *    --- type ------<br/>
     *    t: 'c' for 'class', 'i' for 'interface', '@' for 'annotation'<br/>
     *    width: int<br/>
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
        for (t in itemConf)
            if (t !== 'shape' && t !== 'id' && t !== 'pos' && t !== 'align' && t !== 'offset')
                this.METHOD_POINTERS[t](itemConf[t], o);
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