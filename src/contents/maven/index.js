import React from "react";
import {MyButton} from "../../components/my-button";
import {MavenCheats} from "./maven-cheats";
import {JavaCheats} from "../java8/java-cheats";

export class Index extends MyButton {
    getTitle() {
        return 'Maven Cheats'
    }

    handleOnClick() {
        this.setContent(<MavenCheats/>)
    }
}