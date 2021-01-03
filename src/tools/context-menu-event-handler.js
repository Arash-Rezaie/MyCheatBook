import Menu from "../components/menu";
import React from "react";
import PopupHandler from "../tools/popup-handler";


class ContextMenuEventHandler {
    constructor(e, requestDispatcher) {
        this.init(e, requestDispatcher)
    }

    init(e, requestDispatcher) {
        let name = 'operationsMenu';
        PopupHandler.showPopup(
            name,
            e.target,
            <Menu requestDispatcher={{
                setContent: c => requestDispatcher.setContent(c),
                hideMe: () => PopupHandler.hidePopup(name)
            }}/>,
            {
                onClickOutside: () => PopupHandler.hidePopup(name),
                arrow: true,
                className: 'arrowed-menu'
            }
        );
    }
}

export default ContextMenuEventHandler;