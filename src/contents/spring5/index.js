import React from "react";
import {MyButton} from "../../components/my-button";
import PopupHandler from "../../components/popup-handler";
import {CoreCheats} from "./core/core-cheats";
import {DbCheats} from "./db/db-cheats";
import {MvcCheats} from "./mvc/mvc-cheats";
import {BootCheats} from "./boot/boot-cheats";
import {Theory} from "./theory/theory";

export class Index extends MyButton {
    getTitle() {
        return 'Spring Cheats'
    }

    // suitable for develop time (it shows CoreCheats just after loading page without any extra click)
    // componentDidMount() {
    //     this.setContent(<CoreCheats/>)
    // }

    setContent(content) {
        PopupHandler.hidePopup('springMenu')
        super.setContent(content);
    }

    handleOnClick() {
        PopupHandler.showPopup('springMenu', this.r.current,
            <div className={'flex-column'}>
                <button onClick={() => this.setContent(<Theory/>)}>Theory</button>
                <button onClick={() => this.setContent(<CoreCheats/>)}>Core</button>
                <button onClick={() => this.setContent(<DbCheats/>)}>DB</button>
                <button onClick={() => this.setContent(<MvcCheats/>)}>MVC</button>
                <button onClick={() => this.setContent(<BootCheats/>)}>Boot</button>
            </div>,
            {
                arrow: true,
                className: 'arrowed-menu',
                onClickOutside: () => PopupHandler.hidePopup('springMenu'),
                modifiers: [{name: 'offset', options: {offset: [5, 5],},},],
            }
        )
    }
}