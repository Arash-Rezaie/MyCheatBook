import {Utils} from "../../src/tools/utils";

test("utils: rad2Deg must be 180: ", () => {
    expect(Utils.rad2Deg(Math.PI)).toBe(180)
})