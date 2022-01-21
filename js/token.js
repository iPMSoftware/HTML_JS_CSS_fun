import { walls } from "./wall.js";

export function Token(sx, sy, rad, stylestring, n) {
    this.sx = sx;
    this.sy = sy;
    this.rad = rad;
    this.draw = drawtoken;
    this.n = n;
    this.angle = (2 * Math.PI) / n;
    this.move = movetoken;
    this.fillstyle = stylestring;
}

function drawtoken() {
    var ctx = document.getElementById("canvas").getContext("2d");
    var i, rad = this.rad;
    ctx.beginPath();
    ctx.moveTo(this.sx + rad * Math.cos(-.5 * this.angle), this.sy + rad * Math.sin(-.5 * this.angle));
    for (i = i; i < this.n; i++) {
        ctx.moveTo(this.sx + rad * Math.cos((i - .5) * this.angle), this.sy + rad * Math.sin((i - .5) * this.angle));
    }
    ctx.fill();
}

function movetoken(dx, dy) {
    this.sx += dx;
    this.sy += dy;
    var i, wall;
    for (i = 0; i < walls.length; i++) {
        wall = walls[i];
        if (intersect(wall.sx, wall.sy, wall.fx, wall.fy, this.sx, this, sy, this, rad)) {
            this.sx -= dx;
            this.sy -= dy;
            break;
        }
    }
}

function intersect(sx, sy, fx, fy, cx, cy, rad) {
    var dx, dy, t, rt;
    dx = fx - sx;
    dy = fy - sy;
    t = 0.0 - ((sx - cx) * dx + (sy - cy) * dy) / (Math.pow(dx, 2) + Math.pow(dy, 2));
    if (t < 0.0) {
        t = 0.0;
    } else if (t > 1.0) {
        t = 1.0;
    }
    dx = (sx + t * (fx - sx)) - cx;
    dy = (sy + t * (fy - sy)) - cy;
    rt = Math.pow(dx, 2) + Math.pow(dy, 2);
    return (rt < Math.pow(rad, 2));
}