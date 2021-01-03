import React from "react";
import {MyButton} from "../../components/my-button";
import {TomcatCheats} from "./tomcat-cheats";
import {JavaCheats} from "../java8/java-cheats";

export class Index extends MyButton {
    getTitle() {
        return 'Tomcat Cheats'
    }

    handleOnClick() {
        this.setContent(<TomcatCheats/>);
    }
}