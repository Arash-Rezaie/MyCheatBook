export class DrawBox {
    lst = [];

    addShape(shape) {
        this.lst.push(shape);
        return this;
    }

    render(canvas) {
        let ctx = canvas.getContext('2d');
        this.lst.forEach(v => v.render(ctx));
    }
}