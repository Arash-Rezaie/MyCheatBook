import {Utils} from "../src/tools/utils";

test('rad2Deg: Math.PI => 180', () => {
    expect(Utils.rad2Deg(Math.PI)).toBe(180);
})