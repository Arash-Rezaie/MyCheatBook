import {Circle} from "./circle";

export default class Dot extends Circle {
    constructor() {
        super();
        this.setRadius(1)
        this.setStrokeColor('red');
        this.setFillColor('red');
    }
}