import React from "react";

/**
 * !!unsafe!!
 * Chrome and Firefox result are not the same when you use float for texts. It is recommended to hire this component on fixed coordination elements such as images
 * props:<br>
 *     l:number<br/>
 *     t:number<br/>
 *     lineto:[number, number]<br/>
 *     edge:[top,right,bottom,left]<br/>
 *
 */
export class Float extends React.Component {
    static padding = 2;
    static tPadding = 3 * Float.padding;
    static dtPadding = 2 * Float.tPadding;
    static color = '#1d72aa';

    constructor(props) {
        super(props);
        if (this.props.lineTo)
            this.r = React.createRef();
    }

    componentDidMount() {
        if (this.props.lineTo)
            this.drawLink();
    }

    getDistance(p1, p2) {
        return Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2);
    }

    drawLink() {
        let viewInfo = this.prepareView();
        let targetPoint = this.getBestTargetPoint(viewInfo.anchor, viewInfo.contentRect);
        let points = this.getLine(viewInfo.anchor, targetPoint.coordination, targetPoint.edge);

        let ctx = viewInfo.canvasElm.getContext('2d');
        this.drawCircle(ctx, points[0]);
        this.drawCircle(ctx, points[points.length - 1]);
        this.drawLine(ctx, points);
    }

    prepareView() {
        let cr = this.r.current.getBoundingClientRect();
        let canvasElm = this.r.current.previousSibling;
        let vr = canvasElm.getBoundingClientRect();
        let rr = {
            l: Math.min(vr.left, cr.left),
            r: Math.max(vr.right, cr.right) + Float.dtPadding,
            t: Math.min(vr.top, cr.top),
            b: Math.max(vr.bottom, cr.bottom) + Float.dtPadding
        };
        rr.w = rr.r - rr.l;
        rr.h = rr.b - rr.t;

        let rootElm = this.r.current.parentElement;
        rootElm.style.width = rr.w;
        rootElm.style.height = rr.h;

        canvasElm.style.left = 0;
        canvasElm.style.top = 0;
        canvasElm.width = rr.w;
        canvasElm.height = rr.h;
        return {
            canvasElm: canvasElm,
            anchor: [this.props.lineTo[0] - rootElm.offsetLeft, this.props.lineTo[1] - rootElm.offsetTop],
            contentRect: {
                left: this.r.current.offsetLeft,
                top: this.r.current.offsetTop,
                right: this.r.current.offsetLeft + cr.width,
                bottom: this.r.current.offsetTop + cr.height
            }
        };
    }

    getBestTargetPoint(anchor, targetRect) {
        let centerPoint = [(targetRect.left + targetRect.right) / 2, (targetRect.top + targetRect.bottom) / 2,];
        let pointsToCheck = {
            left: [targetRect.left, centerPoint[1]],//left edge center
            right: [targetRect.right, centerPoint[1]],//right edge center
            top: [centerPoint[0], targetRect.top],//top edge center
            bottom: [centerPoint[0], targetRect.bottom],//bottom edge center
        };

        let selectedEdge;
        if (this.props.edge) {
            selectedEdge = this.props.edge;
        } else {
            let minD = Infinity;
            let e, d;
            for (e in pointsToCheck) {
                d = this.getDistance(anchor, pointsToCheck[e]);
                if (d < minD) {
                    minD = d;
                    selectedEdge = e;
                }
            }
        }

        return {edge: selectedEdge, coordination: pointsToCheck[selectedEdge]};
    }

    getLine(p1, p2, edge) {
        return [
            p1,
            (edge === 'left' || edge === 'right') ? [p1[0] + (p2[0] - p1[0]) / 3, p2[1]] : [p2[0], p1[1] + (p2[1] - p1[1]) / 3],
            p2];
    }

    drawCircle(ctx, p) {
        ctx.beginPath();
        ctx.arc(p[0], p[1], Float.padding, 0, 2 * Math.PI, false);
        ctx.fillStyle = Float.color;
        ctx.fill();
    };

    drawLine(ctx, p) {
        ctx.moveTo(p[0][0], p[0][1]);
        for (let i = 1; i < p.length; i++) {
            ctx.lineTo(p[i][0], p[i][1]);
        }
        ctx.strokeStyle = Float.color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    render() {
        let view;
        if (this.props.lineTo) {
            let rr = {
                l: Math.min(this.props.lineTo[0], this.props.l) - Float.tPadding,
                t: Math.min(this.props.lineTo[1], this.props.t) - Float.tPadding
            };//root rect
            let cr = {l: this.props.l - rr.l, t: this.props.t - rr.t};//canvas rect
            let vr = {l: this.props.lineTo[0] - rr.l, t: this.props.lineTo[1] - rr.t};//view rect
            view = (
                <div className={'float-root'} style={{left: rr.l, top: rr.t}}>
                    <canvas width={0} height={0} style={{left: vr.l, top: vr.t}}/>
                    <div className={'float'} ref={this.r}
                         style={{left: cr.l, top: cr.t}}>{this.props.children}</div>
                </div>
            )
            ;
        } else {
            view = <div className={'float'}
                        style={{left: this.props.l, top: this.props.t}}>{this.props.children}</div>
        }
        return view;
    }
}