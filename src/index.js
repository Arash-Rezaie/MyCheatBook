import React from "react";
import ReactDOM from 'react-dom';
import './res/styles/main.css';
import {Content} from "./components/content";
import PopupHandler from "./components/popup-handler";
import {DrawBoxComponent} from "./contents/git/git-components";
import {Circle} from "./components/drawbox/simple/circle";
import {Rectangle} from "./components/drawbox/simple/rectangle";
import {Utils} from "./tools/utils";
import {Line2} from "./components/drawbox/simple/line2";

function getMainContent() {
    return <><Content/><PopupHandler/></>;
}

function getScript() {
    let c1 = new Circle()
        .setPosition([150, 200])
        .setRadius(50)
        .setStrokeWidth(1);

    let c2 = new Circle()
        .setPosition([300, 400])
        .setRadius(20)
        .setStrokeWidth(1);

    let l1 = new Line2()
        .setStart([c1, 5])
        .setEnd([c2, 15])

    Utils.db
        .addShape(c1)
        .addShape(c2)
        .addShape(l1)

    return (
        <DrawBoxComponent wh={[500, 500]} shapeFactory={Utils.db}/>
    )
}

// ReactDOM.render(getMainContent(), document.querySelector('#root'));
ReactDOM.render(getScript(), document.querySelector('#root'));