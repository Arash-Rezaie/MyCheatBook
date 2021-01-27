export class DrawBox {
    lst = [];

    addShape(shape) {
        this.lst.push(shape);
        return this;
    }

    render(canvas) {
        let ctx = canvas.getContext('2d');
        this.len = this.lst.length;
        this.ctx = ctx;
        this.lst.forEach(v => v.render(ctx));
        this.finished = true;
        this.resumeRender();
    }

    resumeRender() {
        if (this.finished) {
            let l = this.lst.length;
            for (let i = this.len; i < l; i++) {
                this.lst[i].render(this.ctx);
            }
            this.len = l;
        }
    }
}