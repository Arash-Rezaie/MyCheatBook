import React from "react";
import {MyButton} from "../../components/my-button";
import {GitCheats} from "./git-cheats";

export class Index extends MyButton {
    getTitle() {
        return 'Git Cheats'
    }

    handleOnClick() {
        this.setContent(<GitCheats/>);
    }
}