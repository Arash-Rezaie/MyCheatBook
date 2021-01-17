import {Circle, DrawBox, Line, Rectangle, Text} from "../../components/draw-box";

export class DrawBoxHandler {
    const
    METHOD_POINTERS = {
        text: () => new Text(),
        circle: () => new Circle(),
        line: () => this.generateLine(),
        rect: () => new Rectangle(),
        node: () => this.generateNode(),
        cap: () => this.generateCaption(),
        hline: () => this.generateHLine(),
        vline: () => this.generateVLine(),
        vect: () => this.generateVector(),
        hvect: () => this.generateHVector(),
        // id: (d, o) => this.container[d] = o,
        // pos: (d, o) => o.setPosition(d),
        // align: (d, o) => o.alignTo(d),
        // offset: (d, o) => o.setOffset(d),
        label: (d, o) => o.setLabel(d),
        color: (d, o) => o.setColor(d),
        fillColor: (d, o) => o.setFillColor(d),
        strokeColor: (d, o) => o.setStrokeColor(d),
        strokeWidth: (d, o) => o.setStrokeWidth(d),
        strokeStyle: (d, o) => o.setStrokeStyle(d),
        radius: (d, o) => o.setRadius(d),
        fontSize: (d, o) => o.setFontSize(d),
        fontStyle: (d, o) => o.setFontStyle(d),
        lineto: (d, o) => o.lineto(d),
        arrow: (d, o) => o.showArrow(d[0], d[1]),
        len: (d, o) => o.setLength(d),
        between: (d, o) => o.between(d),
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
     *    lineto: [x,y] or [intR, length] or [intD, length]<br/>
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

    generateNode() {
        //crate new circle
        let o = new Circle()
            .setRadius(20)
            .setStrokeWidth(3)
            .setStrokeColor('black')
            .setFillColor('yellow');

        //redirect setLabel to a new method
        this.applyCustomLabel(o, lbl =>
            new Text()
                .setPosition(o.getCenterPoint())
                .setLabel(lbl)
                .setFontSize('20px')
                .setOffset([0, 6]));
        o['connectTo'] = refId => {
            this.drawBox.addShape(this.generateVector()
                .superBetween(o, this.container[refId], 5));
            return o;
        };
        o['setCaptions'] = caps => {
            if (caps[0] === undefined)
                caps = [caps];
            caps.forEach((v, i) => {
                this.drawBox.addShape(
                    this.generateCaption()
                        .alignTo(o)
                        .setOffset(v.offset ? v.offset : [28, (caps.length * -11.5 + (i * 25))])
                        .setWidth(v.w)
                        .setHeight(20)
                        .setLabel(v.t)
                        .setColor(v.c)
                        .setStrokeWidth(2)
                )
            })
            return o;
        };
        return o;
    }

    generateCaption() {
        let o = new Rectangle()
        this.applyCustomLabel(o, lbl =>
            new Text()
                .setPosition(o.getCenterPoint())
                .setLabel(lbl)
                .setOffset([0, 5])
                .setFontStyle('bold'));
        o['connectTo'] = refId => {
            this.drawBox.addShape(new Line()
                .between(o, this.container[refId], 5)
                .setStrokeColor('red')
                .setFillColor('red')
                .setStrokeWidth(1));
            return o;
        };
        return o;
    }

    generateLine(labelProducer = null) {
        let o = new Line();
        o['superBetween'] = o.between;
        o["between"] = data => o.superBetween(this.container[data[0]], this.container[data[1]], data[2]);
        this.applyCustomLabel(o, labelProducer);
        return o;
    }

    generateHLine() {
        let o = this.generateLine()
        o['setLength'] = l =>
            l > 0 ?
                o.lineTo(['0D', l]) :
                o.lineTo(['180D', -l])
        return o;
    }

    generateVLine() {
        let o = this.generateLine()
        o['setLength'] = l =>
            l > 0 ?
                o.lineTo(['90D', l]) :
                o.lineTo(['270D', -l])
        return o;
    }

    generateVector(labelProducer = null) {
        return this.generateLine(labelProducer)
            .setStrokeColor('black')
            .setFillColor('black')
            .setStrokeWidth(2)
            .showArrow(1, 1);
    }

    generateHVector() {
        let o = this.generateVector(lbl =>
            new Text()
                .setPosition(o.getCenterPoint())
                .setLabel(lbl)
                .setOffset([0, -6])
                .setFontStyle(''));
        o['setLength'] = l =>
            l > 0 ?
                o.lineTo(['0D', l]) :
                o.lineTo(['180D', -l])
        return o;
    }

    applyCustomLabel(shape, inCaseOfSimpleText = null) {
        shape['setText'] = shape.setLabel;
        shape['setLabel'] = lbl => {
            return (typeof lbl === 'string') ?
                shape.setText(inCaseOfSimpleText ? inCaseOfSimpleText(lbl) : lbl) :
                shape.setText(this.generateShape(lbl).alignTo(shape))
        };
    }

    alterShape(id, m) {
        m(this.container[id]);
        return this;
    }

    render(canvas) {
        this.drawBox.render(canvas);
    }
}