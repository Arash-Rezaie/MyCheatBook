import React from "react";
import {MyButton} from "../../components/my-button";
import {JavaCheats} from "./java-cheats";

export class Index extends MyButton {
    getTitle() {
        return 'Java Cheats'
    }

    handleOnClick() {
        this.setContent(<JavaCheats/>);
    }
}