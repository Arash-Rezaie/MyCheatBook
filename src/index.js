import React from "react";
import ReactDOM from 'react-dom';
import './res/styles/main.css';
import {Content} from "./components/content";
import PopupHandler from "./components/popup-handler";
import {DrawBox} from "./components/drawbox/draw-box";
import {DrawBoxComponent} from "./contents/git/git-components";
import {Line} from "./components/drawbox/simple/line";
import {Circle} from "./components/drawbox/simple/circle";
import {Rectangle} from "./components/drawbox/simple/rectangle";
import {Utils} from "./tools/utils";

function getMainContent() {
    return <><Content/><PopupHandler/></>;
}

function getScript() {
    let p1 = [100, 120];
    let p2 = [300, 420];
    let p3 = [0, 60];
    let dir = 1;
    let places = 1;
    let c1 = new Circle()
        .setPosition([100, 100])
        .setRadius(50)
        .setStrokeWidth(1);

    let c2 = new Circle()
        .setPosition([400, 170])
        .setRadius(50)
        .setStrokeWidth(1);

    let r1 = new Rectangle()
        .setPosition([200, 300])
        .setWidth(50)
        .setHeight(30)
        .setStrokeWidth(1);

    let r2 = new Rectangle()
        .setPosition([20, 210])
        .setWidth(50)
        .setHeight(30)
        .setStrokeWidth(1);

    let l1 = new Line()
        .setStart([c1, 0])
        .setEnd(['60D', 200])
        .setQuadraticPoint(['340d', 100])
        .showArrow(dir, places)
        .setFillColor('black');

    let l2 = new Line()
        .setStart([c1, 0])
        .setEnd(['60D', 200])
        .showArrow(dir, places)
        .setFillColor('black');

    Utils.db.addShape(c1)
        .addShape(c2)
        .addShape(r1)
        .addShape(r2)
        .addShape(l1)
        .addShape(l2)

    return (
        <DrawBoxComponent wh={[500, 500]} shapeFactory={Utils.db}/>
    )
}

// ReactDOM.render(getMainContent(), document.querySelector('#root'));
ReactDOM.render(getScript(), document.querySelector('#root'));