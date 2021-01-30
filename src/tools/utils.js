export class Utils {
    static _PI6 = Math.PI / 6;   //30deg
    static _2PI = 2 * Math.PI;   //360deg

    static getAngle(x1, y1, x2, y2) {
        let dx = x2 - x1;
        let dy = y2 - y1;
        return Math.atan2(dy, dx);
    }

    static getAngleByPoint(p1, p2) {
        return Utils.getAngle(p1[0], p1[1], p2[0], p2[1]);
    }

    static normalizeDegree(deg) {
        if (deg > 360)
            deg %= 360;
        else if (deg < 0)
            deg = deg % 360 + 360;
        return deg;
    }

    static normalizeRadian(rad) {
        if (rad > Utils._2PI)
            rad %= Utils._2PI;
        else if (rad < 0)
            rad = rad % Utils._2PI + Utils._2PI;
        return rad;
    }

    static rad2Deg(rad) {
        return 180 * rad / Math.PI;
    }

    static deg2Rad(deg) {
        return Math.PI * deg / 180;
    }

    static reverseRad(rad) {
        return rad - Math.PI;
    }

    static reverseDeg(deg) {
        return deg - 180;
    }

    static getPointByAngle(basePoint, angle, length) {
        return [basePoint[0] + length * Math.cos(angle), basePoint[1] + length * Math.sin(angle)];
    }

    static getLengthByPoints(p1, p2) {
        return Math.sqrt(Math.pow(Math.abs(p1[0] - p2[0]), 2) + Math.pow(Math.abs(p1[1] - p2[1]), 2));
    }

    static isEqual(arr1, arr2) {
        if (arr1.length !== arr2.length)
            return false;
        for (let i = 0; i < arr1.length; i++) {
            if (!arr2.includes(arr1[i]))
                return false;
        }
        return true;
    }
}