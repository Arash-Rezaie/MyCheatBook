export default class MockContext2d {
    data = {};

    setShape(shape) {
        this.shape = shape;
        return this;
    }

    render() {
        this.shape.render(this);
        return this.data;
    }

    setLineDash(value) {
    }

    stroke() {
    }

    beginPath() {
    }

    closePath() {
    }

    moveTo(x, y) {
        this.data['moveTo'] = [x, y];
    }

    quadraticCurveTo(qx, qy, x, y) {
        this.data['quadraticCurveTo'] = [qx, qy, x, y];
    }

    lineTo(x, y) {
        this.data['lineTo'] = [x, y];
    }
}