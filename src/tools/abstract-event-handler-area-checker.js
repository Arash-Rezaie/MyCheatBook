import {AbstractEventHandler} from "./dragdropHandler";

class AbstractEventHandlerAreaChecker extends AbstractEventHandler {
    area;

    init() {
        this.area = this.getArea();
    }

    getArea() {
    }

    next(x, y) {
        if (!this.isInsideCell(this.area, x, y)) {
            throw new Error('out of boundaries');
        }
    }

    isInsideCell(area, x, y) {
        return x > area.left && x < area.right && y > area.top && y < area.bottom;
    }
}

export default AbstractEventHandlerAreaChecker;