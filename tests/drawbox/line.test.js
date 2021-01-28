// import MockContext2d from "./mock-context-2d";
// import {Line2} from "../../src/components/drawbox/simple/line2";
// import {Circle} from "../../src/components/drawbox/simple/circle";
//
// test("line: [100,150]-[210,223]", () => {
//     expect(new MockContext2d()
//         .setShape(
//             new Line2()
//                 .setStart([100, 150])
//                 .setEnd([210, 223])
//         ).render()
//     )
//         .toEqual({"moveTo": [100, 150], "lineTo": [210, 223]});
// });
//
// test("line: [100,150]-['30d',100]", () => {
//     expect(new MockContext2d()
//         .setShape(
//             new Line2()
//                 .setStart([100, 150])
//                 .setEnd(['30d', 100])
//         ).render()
//     )
//         .toEqual({"moveTo": [100, 150], "lineTo": [186.60254037844388, 200.0]});
// });
//
// test("line: [100,150]-[circle(xy:[150,200], r:50),5]", () => {
//     expect(new MockContext2d()
//         .setShape(
//             new Line2()
//                 .setStart([100, 150])
//                 .setEnd([new Circle().setPosition([150, 200]).setRadius(50), 5])
//         ).render()
//     )
//         .toEqual({"moveTo": [100, 150], "lineTo": [111.10912703473988, 161.10912703473988]});
// });
//
// test("line: [circle(xy:[150,200], r:50),5]-[100,150]", () => {
//     expect(new MockContext2d()
//         .setShape(
//             new Line2()
//                 .setStart([new Circle().setPosition([150, 200]).setRadius(50), 5])
//                 .setEnd([100, 150])
//         ).render()
//     )
//         .toEqual({"moveTo": [111.10912703473988, 161.10912703473988], "lineTo": [100, 150]});
// });
//
// test("line: [circle(xy:[150,200], r:50),5]-['190d',50]", () => {
//     expect(new MockContext2d()
//         .setShape(
//             new Line2()
//                 .setStart([new Circle().setPosition([150, 200]).setRadius(50), 5])
//                 .setEnd(['190d', 50])
//         ).render()
//     )
//         .toEqual({
//             "moveTo": [95.83557358432856, 190.44935022831885],
//             "lineTo": [46.595185933718156, 181.7669413449723]
//         });
// });
//
// test("line: [circle(xy:[150,200], r:50),5]-[circle(xy:[300,400], r:20),15]", () => {
//     expect(new MockContext2d()
//         .setShape(
//             new Line2()
//                 .setStart([new Circle().setPosition([150, 200]).setRadius(50), 5])
//                 .setEnd([new Circle().setPosition([300, 400]).setRadius(20), 15])
//         ).render()
//     )
//         .toEqual({
//             "moveTo": [183, 244],
//             "lineTo": [279, 372]
//         });
// });

// test("line: [100,150]-[90,300]-[210,223]", () => {
//     expect(new MockContext2d()
//         .setShape(
//             new Line2()
//                 .setStart([100, 150])
//                 .setQuadraticPoint([90, 300])
//                 .setEnd([210, 223])
//         ).render()
//     )
//         .toEqual({
//             "moveTo": [183, 244],
//             "quadraticCurveTo": [90, 300, 210, 223]
//         });
// });