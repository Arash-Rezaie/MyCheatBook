import React from "react";
import {createPopper} from '@popperjs/core';
import {EventDispatcher, Events} from "../tools/event-dispatcher";

class PopupHandler extends React.Component {
    static instance;

    constructor(props) {
        super(props);
        this.state = {items: []};
        PopupHandler.instance = this;
        this.shouldUpdate = false;
    }

    /**
     *
     * @param name this name must be unique
     * @param anchor element | 'cursor' | {getBoundingClientRect: ()=>{some rect}}
     * @param content the popup jsx which you wanna show
     * @param options popper options + the following:
     * <p>
     *     fields:<br>
     *     arrow: [true | false]: to show an arrow. declare 'modifiers: [{name: 'offset', options: {offset: [5, 5],},},]' to place your content as you wish<br>
     *     className: the css class name of yours<br>
     *     hideOnClick: [true | false]: to hide when user clicks anywhere<br>
     *     interactive: [true | false]: to hide when cursor moves outside automatically<br>
     * </p>
     * <br>
     * <p>
     *     methods:<br>
     *     onHideListener: method to be called on hide<br>
     *     onClickOutSide: method to be called on outside click<br>
     * </p>
     */
    static showPopup(name, anchor, content, options) {
        PopupHandler.instance.show(name, anchor, content, options);
    }

    static hidePopup(name) {
        PopupHandler.instance.hide(name);
    }

    show(name, anchor, content, options) {
        let a = this.state.items;
        if (!a[name]) {
            a[name] = {
                name: name,
                anchor: anchor,
                reference: undefined,
                content: content,
                options: options,
                r: React.createRef(),
                isVisible: false,
                isProcessed: false,
                popper: undefined,
                eventDispatcher: undefined,
            };
        } else {
            let t = a[name];
            t.anchor = anchor;
            t.content = content;
            t.options = options;
            t.isProcessed = false;
        }
        this.setState({items: a});
        this.shouldUpdate = true;
    }

    hide(name) {
        if (this.state.items[name]) {
            let temp = this.state.items;
            let item = temp[name];
            delete temp[name];

            if (item.eventDispatcher !== undefined) {
                this.clearEventDispatcher(item);
            }

            if (item.options && item.options.onHideListener) {
                item.options.onHideListener();
            }

            this.shouldUpdate = true;
            this.setState({items: temp});
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.shouldUpdate;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let i;
        for (i in this.state.items) {
            i = prevState.items[i];
            if (!i.isProcessed) {
                let readyToShow = this.prepare(i);
                if (!i.popper) {
                    i.popper = createPopper(i.reference, i.r.current, i.options);
                    if (readyToShow)
                        this.visible(i);
                } else {
                    i.popper.update();
                }

                i.isProcessed = true;
            }
        }
    }

    prepare(item) {
        let readyToShow = true;
        item.reference = item.anchor;
        if (item.reference === 'cursor') {
            this.trackMousePointer(item);
            readyToShow = false;
        }

        if (item.options) {
            if (item.options.onClickOutside || item.options.hideOnClick)
                this.handleOutsideClick(item);
            if (item.options.interactive)
                this.handleInteractive(item);
        }

        return readyToShow;
    }

    trackMousePointer(item) {
        let rect = {width: 5, height: 5, top: 0, right: 5, bottom: 5, left: 0};
        item.reference = {getBoundingClientRect: () => rect};
        this.getEventDispatcher(item).register(Events.MOUSE_MOVE, ({clientX: x, clientY: y}) => {
            try {
                if (!item.isVisible)
                    this.visible(item);
                rect.left = x;
                rect.top = y;
                rect.right = rect.left + rect.width;
                rect.bottom = rect.top + rect.height;
                item.popper.update();
            } catch (e) {
            }
        });
    }

    handleOutsideClick(item) {
        this.getEventDispatcher(item).register(Events.MOUSE_DOWN, ({pageX: x, pageY: y}) => {
            try {
                if (item.options.onClickOutside) {
                    let rect = item.r.current.getBoundingClientRect();
                    if (x <= rect.left || x >= rect.right || y <= rect.top || y >= rect.bottom)
                        item.options.onClickOutside();
                }
                if (item.options.hideOnClick)
                    this.hide(item.name);
            } catch (e) {
                console.error(e);
            }
        });
    }

    handleInteractive(item) {
        this.getEventDispatcher(item).register(Events.MOUSE_MOVE, ({clientX: x, clientY: y}) => {
            try {
                let rect1 = item.reference.getBoundingClientRect();
                let rect2 = item.r.current.getBoundingClientRect();
                if (!item.interactiveOffset) {
                    let min = 2;
                    item.interactiveOffset = [min, min];
                    try {
                        item.interactiveOffset = item.options.modifiers.filter(h => h.name === 'offset')[0].options.offset;
                        if (item.interactiveOffset[0] === 0)
                            item.interactiveOffset[0] = min;
                        if (item.interactiveOffset[1] === 0)
                            item.interactiveOffset[1] = min;
                    } catch (e) {
                    }
                }
                let o = item.interactiveOffset;
                if (!(
                    (x >= rect1.left - o[1] && x <= rect1.right + o[1] && y >= rect1.top - o[0] && y <= rect1.bottom + o[0]) ||
                    (x >= rect2.left - o[1] && x <= rect2.right + o[1] && y >= rect2.top - o[0] && y <= rect2.bottom + o[0])
                )) {
                    this.hide(item.name);
                }
            } catch (e) {
            }
        });
    }

    getEventDispatcher(item) {
        if (!item.eventDispatcher)
            item.eventDispatcher = new EventDispatcher();
        return item.eventDispatcher;
    }

    clearEventDispatcher(item) {
        item.eventDispatcher.unregister();
        item.eventDispatcher = undefined;
    }

    visible(item) {
        item.r.current.style.display = 'block';
        item.isVisible = true;
    }

    getItemsSJX() {
        let arr = [];
        let i;
        for (i in this.state.items) {
            i = this.state.items[i];
            if (i.options && i.options.arrow) {
                let cls;
                if (i.options.className)
                    cls = i.options.className;
                arr.push(
                    <div ref={i.r} className={'popup-window ' + cls} key={i.name}>
                        <div className={'arrow'} data-popper-arrow/>
                        <div className={'arrow-cover'}/>
                        {i.content}
                    </div>
                );
            } else {
                arr.push(<div ref={i.r} className={'popup-container'} key={i.name}>{i.content}</div>);
            }
        }

        return arr;
    }

    render() {
        return this.getItemsSJX();
    }
}

export default PopupHandler;