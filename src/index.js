import React from "react";
import ReactDOM from 'react-dom';
import './res/styles/main.css';
import {Content} from "./components/content";
import PopupHandler from "./components/popup-handler";
import {DrawBox} from "./components/drawbox/draw-box";
import {Type} from "./components/drawbox/simple/type";
import {DrawBoxComponent} from "./contents/git/git-components";
import {Path} from "./components/drawbox/simple/path";

function getMainContent() {
    return <><Content/><PopupHandler/></>;
}

function getScript() {
    let t1 = new Type()
        .setPosition([200, 200])
        .setWidth(100)
        .setType('interface')
        .setLabel("Runnable")

    let t2 = new Type()
        .setPosition([200, 230])
        .setWidth(100)
        .setType('class')
        .setLabel("Main")

    let t3 = new Type()
        .setPosition([200, 260])
        .setWidth(100)
        .setType('annotation')
        .setLabel("Configurer")

    let p1 = new Path()
        .moveTo([100, 100])
        .setColor('blue')
        .lineTo([150, 130])
        .lineTo(['40d', 100])
        .lineTo([t3, 0])
        .quadraticTo([t1, 5], ['-30d', 100])
        .moveTo([200,50])
        .quadraticTo(['180d',100],[300,150])
        .setStrokeStyle([5, 10])
        .showArrow(1, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1])

    let db = new DrawBox()
        .addShape(t1)
        .addShape(t2)
        .addShape(t3)
        .addShape(p1)


    return (
        <DrawBoxComponent wh={[500, 500]} shapeFactory={db}/>
    )
}

ReactDOM.render(getMainContent(), document.querySelector('#root'));
// ReactDOM.render(getScript(), document.querySelector('#root'));