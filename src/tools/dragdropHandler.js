import Utils from "../tools/utils";
import {EventDispatcher, Events} from "./event-dispatcher";


class AbstractEventHandler {
    next(x, y) {
    }

    complete(e) {
    }

    error(e) {
    }
}

class DragdropHandler {
    eventDispatcher = new EventDispatcher();

    setHandler(handler) {
        this.handler = handler;
        return this;
    }

    startListening(){
        this.eventDispatcher
            .register(Events.MOUSE_MOVE, e => this.onMoveHandler(e))
            // .register(Events.SCROLL, e => this.onScrollHandler(e))
            .register(Events.MOUSE_UP, e => this.onUpHandler(e));
    }

    onScrollHandler(e) {
        try {
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            this.handler.next(e.pageX, e.pageY);
        }catch (e) {
            this.handler.error();
            this.cleanUp();
        }
    }

    onMoveHandler(e) {
        try {
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            this.handler.next(e.pageX, e.pageY);
        } catch (e) {
            this.handler.error(e);
            this.cleanUp();
        }
    }

    onUpHandler(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        this.handler.complete(e);
        this.cleanUp();
    }

    cleanUp() {
        this.eventDispatcher.unregister();
        Utils.setCursor('auto');
    }
}

export {DragdropHandler, AbstractEventHandler};