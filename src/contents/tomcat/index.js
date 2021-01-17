import React from "react";
import {MyButton} from "../../components/my-button";
import {TomcatCheats} from "./tomcat-cheats";

export class Index extends MyButton {
    getTitle() {
        return 'Tomcat Cheats'
    }

    handleOnClick() {
        this.setContent(<TomcatCheats/>);
    }
}