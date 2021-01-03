const Events = {
    /**Triggered when the mouse button is clicked and released*/
    CLICK: 'click',
    /**Triggered when the mouse button is clicked and released twice.*/
    DB_CLICK: 'dbclick',
    /**Triggered when the mouse button is clicked*/
    MOUSE_DOWN: 'mousedown',
    /**Triggered when the pointer is moved to be within the screen region occupied by the element or one of its descendants*/
    MOUSE_ENTER: 'mouseenter',
    /**Triggered when the pointer is moved to be outside the screen region occupied by the element and all its descendants.*/
    MOUSE_LEAVE: 'mouseleave',
    /**Triggered when the pointer is moved while over the element*/
    MOUSE_MOVE: 'mousemove',
    /**This is the same as for mouseleave, except that this event will trigger while the pointer still over the descendant element.*/
    MOUSE_OUT: 'mouseout',
    /**This is the same as for mouseenter, except that this event will trigger while the pointer is still over a descendant element.*/
    MOUSE_OVER: 'mouseover',
    /**Trigger when the mouse button is released*/
    MOUSE_UP: 'mouseup',
    /**Trigger when right mouse button is pressed*/
    CONTEXT_MENU: 'contextmenu',
    /**Check if target mouse button is the primary one*/
    IS_MOUSE_LEFT: 0,
    /**Check if target mouse button is the middle one*/
    IS_MOUSE_MIDDLE: 1,
    /**Check if target mouse button is the secondary one*/
    IS_MOUSE_RIGHT: 2,
    /**Check if target mouse button is the back one*/
    IS_MOUSE_X1: 3,
    /**Check if target mouse button is the forward one*/
    IS_MOUSE_X2: 4,
    /**Tiggered when the user presses a key*/
    KEY_DOWN: 'keydown',
    /**Triggered when the user presses and releases a key.*/
    KEY_PRESS: 'keypress',
    /**Triggered when the user releases the key*/
    KEY_UP: 'keyup',
    /**Is Triggered when the element loses the focus*/
    BLUR: 'blur',
    /**Is Triggered when the element gains the focus*/
    FOCUS: 'focus',
    /**Is triggered when the element is just about to gain the focus.*/
    FOCUS_IN: 'focusin',
    /**Is Triggered when the element is just about the lose focus*/
    FOCUS_OUT: 'focusout',
    /**The element that is about to gain or lose the focus.*/
    RELATED_TARGET: 'relatedTarget',
    /**Triggered if the target button is shift*/
    SHIFT: 'Shift',
    /**Triggered if the target button is left-shift*/
    SHIFT_LEFT: 'ShiftLeft',
    /**Triggered if the target button is right-shift*/
    SHIFT_RIGHT: 'ShiftRight',
    /**Triggered if the target button is Alt*/
    ALT: 'Alt',
    /**Triggered if the target button is ctrl*/
    CTRL: 'Ctrl',
    /**Triggered if the target button is cmd in Mac Os*/
    META: 'Cmd',
    /**Triggered if the target button is a digit*/
    DIGIT: 'Digit',
    /**Triggered if the target button is enter*/
    ENTER: 'Enter',
    /**Triggered if the target button is backspace*/
    BACKSPACE: 'Backspace',
    /**Triggered if the target button is tab*/
    TAB: 'Tap',
    /**Triggered if the target button is space*/
    SPACE: 'Space',
    /**Triggered when user scrolls*/
    SCROLL: 'scroll',
};

class EventDispatcher {
    eventDispatchers = [];

    register(event, listener, name = null) {
        if (!this.eventDispatchers[event]) {
            let listeners = [];
            this.eventDispatchers[event] = {
                listeners: listeners, docListener: e => listeners.forEach(k => k.listener(e))
            };
        }
        if (name != null && this.exists(event, name) >= 0) {
            throw new Error('This event dispatcher has declared before');
        }

        this.eventDispatchers[event].listeners.push({listener: listener, name: name});
        document.addEventListener(event, this.eventDispatchers[event].docListener);
    }

    unregister(event = null, name = null) {
        if (event != null) {
            if (name != null) {
                let i = this.exists(event, name);
                if (i >= 0)
                    this.eventDispatchers[event].listeners.splice(i, 1);
                if (this.eventDispatchers[event].listeners.length === 0)
                    this.removeEvent(event);
            } else {
                this.removeEvent(event);
            }
            for (let i in this.eventDispatchers) return;//to check if arr is empty
            this.eventDispatchers = [];
        } else {
            for (let d in this.eventDispatchers)
                this.removeDocListener(d);
            this.eventDispatchers = [];
        }
    }

    exists(event, name = null) {
        if (this.eventDispatchers[event]) {
            if (name == null) {
                return 0;
            } else {
                let a = this.eventDispatchers[event].listeners;
                for (let i = a.length - 1; i >= 0; i--)
                    if (a[i].name === name)
                        return i;
            }
        }
        return -1;
    }

    removeEvent(event) {
        this.removeDocListener(event);
        delete this.eventDispatchers[event];
    }

    removeDocListener(eventName) {
        document.removeEventListener(eventName, this.eventDispatchers[eventName].docListener);
    }
}

export {
    EventDispatcher
    ,
    Events
};