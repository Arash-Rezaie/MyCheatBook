import MockContext2d from "./mock-context-2d";
import {Line} from "../../components/drawbox/simple/line";
import {Circle} from "../../components/drawbox/simple/circle";
//three types of points are available. point[x,y], angle['int-d' or 'int-r',distance], shape[object, gap]
//start - end
test("line: [100,150]-[210,223]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([100, 150])
                .setEnd([210, 223])
        ).render()
    )
        .toEqual({"moveTo": [100, 150], "lineTo": [210, 223]});
});

test("line: [100,150]-['30d',100]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([100, 150])
                .setEnd(['30d', 100])
        ).render()
    )
        .toEqual({"moveTo": [100, 150], "lineTo": [186.60254037844388, 200.0]});
});

test("line: [100,150]-[circle(xy:[150,200], r:50),5]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([100, 150])
                .setEnd([new Circle().setPosition([150, 200]).setRadius(50), 5])
        ).render()
    )
        .toEqual({"moveTo": [100, 150], "lineTo": [111.10912703473988, 161.10912703473988]});
});

test("line: [circle(xy:[150,200], r:50),5]-[100,150]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([new Circle().setPosition([150, 200]).setRadius(50), 5])
                .setEnd([100, 150])
        ).render()
    )
        .toEqual({"moveTo": [111.10912703473988, 161.10912703473988], "lineTo": [100, 150]});
});

test("line: [circle(xy:[150,200], r:50),5]-['190d',50]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([new Circle().setPosition([150, 200]).setRadius(50), 5])
                .setEnd(['190d', 50])
        ).render()
    )
        .toEqual({
            "moveTo": [95.83557358432856, 190.44935022831885],
            "lineTo": [46.595185933718156, 181.7669413449723]
        });
});

test("line: [circle(xy:[150,200], r:50),5]-[circle(xy:[300,400], r:20),15]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([new Circle().setPosition([150, 200]).setRadius(50), 5])
                .setEnd([new Circle().setPosition([300, 400]).setRadius(20), 15])
        ).render()
    )
        .toEqual({
            "moveTo": [183, 244],
            "lineTo": [279, 372]
        });
});

// start - qCurve - end
test("line: [100,150]-[90,300]-[210,223]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([100, 150])
                .setQuadraticPoint([90, 300])
                .setEnd([210, 223])
        ).render()
    )
        .toEqual({
            "moveTo": [100, 150],
            "quadraticCurveTo": [90, 300, 210, 223]
        });
});

test("line: [100,150]-[90,300]-['65d',100]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([100, 150])
                .setQuadraticPoint([90, 300])
                .setEnd(['65d', 100])
        ).render()
    )
        .toEqual({
            "moveTo": [100, 150],
            "quadraticCurveTo": [90, 300, 142.26182617406994, 240.630778703665]
        });
});

test("line: [100,150]-[90,300]-[circle(xy:[300,400], r:20),5]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([100, 150])
                .setQuadraticPoint([90, 300])
                .setEnd([new Circle().setPosition([300, 400]).setRadius(20), 5])
        ).render()
    )
        .toEqual({
            "moveTo": [100, 150],
            "quadraticCurveTo": [90, 300, 277.42848702940177, 389.2516604901913]
        });
});

test("line: [100,150]-['65d',100]-[210, 223]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([100, 150])
                .setQuadraticPoint(['65d', 100])
                .setEnd([210, 223])
        ).render()
    )
        .toEqual({
            "moveTo": [100, 150],
            "quadraticCurveTo": [142.26182617406994, 240.630778703665, 210, 223]
        });
});

test("line: [100,150]-['65d',100]-['190d',150]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([100, 150])
                .setQuadraticPoint(['65d', 100])
                .setEnd(['190d', 150])
        ).render()
    )
        .toEqual({
            "moveTo": [100, 150],
            "quadraticCurveTo": [142.26182617406994, 240.630778703665, -47.72116295183119, 123.95277334996044,
            ]
        });
});

test("line: [100,150]-['65d',100]-[circle(xy:[300,400], r:20),5]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([100, 150])
                .setQuadraticPoint(['65d', 100])
                .setEnd([new Circle().setPosition([300, 400]).setRadius(20), 5])
        ).render()
    )
        .toEqual({
            "moveTo": [100, 150],
            "quadraticCurveTo": [142.26182617406994, 240.630778703665, 282.4134885056714, 382.2316401021409]
        });
});

test("line: [100,150]-[circle(xy:[300,400], r:20),5]-[210, 223]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([100, 150])
                .setQuadraticPoint([new Circle().setPosition([300, 400]).setRadius(20), 5])
                .setEnd([210, 223])
        ).render()
    )
        .toEqual({
            "moveTo": [100, 150],
            "quadraticCurveTo": [286.4550965688082, 378.98725170189084, 210, 223]
        });
});

test("line: [100,150]-[circle(xy:[300,400], r:20),5]-['65d',100]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([100, 150])
                .setQuadraticPoint([new Circle().setPosition([300, 400]).setRadius(20), 5])
                .setEnd(['65d', 100])
        ).render()
    )
        .toEqual({
            "moveTo": [100, 150],
            "quadraticCurveTo": [283.3749253403671, 381.32898255151497, 142.26182617406994, 240.630778703665]
        });
});

test("line: [100,150]-[circle(xy:[300,400], r:20),5]-[circle(xy:[150,200], r:50),15]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([100, 150])
                .setQuadraticPoint([new Circle().setPosition([300, 400]).setRadius(20), 5])
                .setEnd([new Circle().setPosition([150, 200]).setRadius(50), 15])
        ).render()
    )
        .toEqual({
            "moveTo": [100, 150],
            "quadraticCurveTo": [284.68944419507585, 380.23672899178115, 189, 252]
        });
});

test("line: [circle(xy:[300,400], r:20),5]-[100,150]-[90,300]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([new Circle().setPosition([300, 400]).setRadius(20), 5])
                .setQuadraticPoint([100, 150])
                .setEnd([90, 300])
        ).render()
    )
        .toEqual({
            "moveTo": [284.3826238111394, 380.47827976392426],
            "quadraticCurveTo": [100, 150, 90, 300]
        });
});

test("line: [circle(xy:[300,400], r:20),5]-[100,150]-['65d',100]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([new Circle().setPosition([300, 400]).setRadius(20), 5])
                .setQuadraticPoint([100, 150])
                .setEnd(['65d', 100])
        ).render()
    )
        .toEqual({
            "moveTo": [284.3826238111394, 380.47827976392426],
            "quadraticCurveTo": [100, 150, 352.8272827175874, 513.2884733795812]
        });
});

test("line: [circle(xy:[300,400], r:20),5]-[100,150]-[circle(xy:[200,310], r:10),0]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([new Circle().setPosition([300, 400]).setRadius(20), 5])
                .setQuadraticPoint([100, 150])
                .setEnd([new Circle().setPosition([200, 310]).setRadius(10), 0])
        ).render()
    )
        .toEqual({
            "moveTo": [284.3826238111394, 380.47827976392426],
            "quadraticCurveTo": [100, 150, 194.7000105999682, 301.52001695994915]
        });
});

test("line: [circle(xy:[300,400], r:20),5]-['65d',100]-[100,150]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([new Circle().setPosition([300, 400]).setRadius(20), 5])
                .setQuadraticPoint(['65d', 100])
                .setEnd([100, 150])
        ).render()
    )
        .toEqual({
            "moveTo": [310.5654565435175, 422.6576946759162],
            "quadraticCurveTo": [352.8272827175874, 513.2884733795812, 100, 150]
        });
});

test("line: [circle(xy:[300,400], r:20),5]-['65d',100]-['190d',150]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([new Circle().setPosition([300, 400]).setRadius(20), 5])
                .setQuadraticPoint(['65d', 100])
                .setEnd(['190d', 150])
        ).render()
    )
        .toEqual({
            "moveTo": [310.5654565435175, 422.6576946759162],
            "quadraticCurveTo": [352.8272827175874, 513.2884733795812, 127.65864322286362, 369.61156890828715]
        });
});

test("line: [circle(xy:[300,400], r:20),5]-['65d',100]-[circle(xy:[150,200], r:50),15]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([new Circle().setPosition([300, 400]).setRadius(20), 5])
                .setQuadraticPoint(['65d', 100])
                .setEnd([new Circle().setPosition([150, 200]).setRadius(50), 15])
        ).render()
    )
        .toEqual({
            "moveTo": [310.5654565435175, 422.6576946759162,],
            "quadraticCurveTo": [352.8272827175874, 513.2884733795812, 185.32498472411248, 254.56322437540894]
        });
});

test("line: [circle(xy:[300,400], r:20),5]-[circle(xy:[150,200], r:50),15]-[100,150]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([new Circle().setPosition([300, 400]).setRadius(20), 5])
                .setQuadraticPoint([new Circle().setPosition([150, 200]).setRadius(50), 15])
                .setEnd([100, 150])
        ).render()
    )
        .toEqual({
            "moveTo": [285, 380],
            "quadraticCurveTo": [100.89549292527907, 242.58811318840839, 100, 150]
        });
});

test("line: [circle(xy:[300,400], r:20),5]-[circle(xy:[150,200], r:50),15]-['65d',100]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([new Circle().setPosition([300, 400]).setRadius(20), 5])
                .setQuadraticPoint([new Circle().setPosition([150, 200]).setRadius(50), 15])
                .setEnd(['65d', 100])
        ).render()
    )
        .toEqual({
            "moveTo": [285, +380],
            "quadraticCurveTo": [187.18458509059315, 253.31328757111532, 352.8272827175874, 513.2884733795812]
        });
});

test("line: [circle(xy:[300,400], r:20),5]-[circle(xy:[150,200], r:50),15]-[circle(xy:[200,310], r:10),0]", () => {
    expect(new MockContext2d()
        .setShape(
            new Line()
                .setStart([new Circle().setPosition([300, 400]).setRadius(20), 5])
                .setQuadraticPoint([new Circle().setPosition([150, 200]).setRadius(50), 15])
                .setEnd([new Circle().setPosition([200, 310]).setRadius(10), 0])
        ).render()
    )
        .toEqual({
            "moveTo": [285, 380],
            "quadraticCurveTo": [183.1432630407742, 255.915329874821, 195.86197055698815, 300.89633522537395]
        });
});