import React from "react";
import ReactDOM from 'react-dom';
import './res/styles/main.css';
import {Content} from "./components/content";
import PopupHandler from "./components/popup-handler";

function getMainContent() {
    return <><Content/><PopupHandler/></>;
}

// function getScript() {
//     let c1 = new Circle()
//         .setPosition([300, 400])
//         .setRadius(20)
//         .setStrokeWidth(1);
//
//     let c2 = new Circle()
//         .setPosition([150, 200])
//         .setRadius(50)
//         .setStrokeWidth(1);
//
//     let c3 = new Circle()
//         .setPosition([200, 310])
//         .setRadius(10)
//         .setStrokeWidth(1);
//
//     let p1 = [100, 150];
//     let p2 = [90, 300];
//     let p3 = [210, 223];
//     let p4 = ['65d', 100];
//     let p5 = ['190d', 150];
//     let p6 = [c1, 5];//[300,400] r:20 gap:5
//     let p7 = [c2, 15];//[150,200] r:50 gap:15
//     let p8 = [c3, 0];//[200,310] r:10 gap:0
//
//     let l1 = new Line()
//         .setStart(p6)
//         .setQuadraticPoint(p7)
//         .setEnd(p8);
//
//     Utils.db
//         .addShape(c1)
//         .addShape(c2)
//         .addShape(c3)
//         .addShape(l1)
//
//     return (
//         <DrawBoxComponent wh={[500, 500]} shapeFactory={Utils.db}/>
//     )
// }

ReactDOM.render(getMainContent(), document.querySelector('#root'));
// ReactDOM.render(getScript(), document.querySelector('#root'));