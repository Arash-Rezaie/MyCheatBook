import React from "react";
import {MyButton} from "../../components/my-button";
import {RegexCheats} from "./regex-cheats";

export class Index extends MyButton {
    getTitle() {
        return 'Regex Cheats'
    }

    handleOnClick() {
        this.setContent(<RegexCheats/>);
    }
}