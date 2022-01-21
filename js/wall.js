import { getKeyAndMove } from "./eventlisteners.js";
import { drawall, everything } from "./labirynth.js";

export var walls = [];
export const wallwidth = 5;
export const wallstyle = "rgb(200,0,200)";


export function Wall(sx, sy, fx, fy, width, stylestring) {
    this.sx = sx;
    this.sy = sy;
    this.fx = fx;
    this.fy = fy;
    this.width = width;
    this.draw = drawAline;
    this.strokestyle = stylestring;
}

function drawAline() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.lineWidth = this.width;
    ctx.strokeStyle = this.strokestyle;
    ctx.beginPath();
    ctx.moveTo(this.sx, this.sy);
    ctx.lineTo(this.fx, this.fy);
    ctx.stroke();
}

export function savewalls() {
    var w = [];
    var allw = [];
    var sw, onewall, i;
    var lsname = document.sf.slname.value;
    for (i = 0; i < walls.length; i++) {
        w.push(walls[i].sx);
        w.push(walls[i].sy);
        w.push(walls[i].fx);
        w.push(walls[i].fy);
        onewall = w.join("+");
        allw.push(onewall);
        w = [];
    }
    sw = allw.join(";");
    try {
        localStorage.setItem(lsname, sw);
    } catch (e) {
        alert("Danie nie zostały zapisane, wystąpił błąd: " + e);
    }
    return false;
}

export function getwalls() {
    var swalls, sw, i, sx, sy, fx, fy, curwall;
    var lsname = document.gf.glname.value;
    swalls = localStorage.getItem(lsname);
    if (swalls !== null) {
        var wallstgs = swalls.split(";");
        for (i = 0; i < wallstgs.length; i++) {
            sw = wallstgs[i].split("+");
            sx = Number(sw[0]);
            sy = Number(sw[1]);
            fx = Number(sw[2]);
            fy = Number(sw[3]);
            curwall = new Wall(sx, sy, fx, fy, wallwidth, wallstyle);
            walls.push(curwall);
            everything.push(curwall);
        }
        drawall();
    } else {
        alert("Nie odnaleziono danych.");
    }
    window.addEventListener('keydown', getKeyAndMove, false);
    return false;
}