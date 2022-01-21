import { startwall, stretchwall, finish, getKeyAndMove, mypent } from './eventlisteners.js';
import { savewalls, getwalls } from './wall.js';


export var everything = [];


export function init() {
    var canvas1 = document.getElementById("canvas");
    everything.push(mypent);
    canvas1.addEventListener('mousedown', startwall, false);
    canvas1.addEventListener('mousemove', stretchwall, false);
    canvas1.addEventListener('mouseup', finish, false);
    window.addEventListener('keydown', getKeyAndMove, false);
    const sf = document.getElementsByName("sf")[0];
    sf.onsubmit = savewalls;
    const gf = document.getElementsByName("gf")[0];
    gf.onsubmit = getwalls;
    drawall();
}

export function drawall() {
    const cwidth = 900;
    const cheight = 350;
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.clearRect(0, 0, cwidth, cheight);
    var i;
    for (i = 0; i < everything.length; i++) {
        everything[i].draw();
    }
}