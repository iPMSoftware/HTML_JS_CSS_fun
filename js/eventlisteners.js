import { Token } from './token.js';
import { Wall, walls, wallwidth, wallstyle } from './wall.js';
import { everything, drawall } from './labirynth.js';

var curwall;
var inmotion = false;
var unit = 10;

export var mypent = new Token(100, 100, 20, "rgb(0,0,250)", 5);

export function startwall(ev) {
    var mx, my;
    if (ev.layerX || ev.layerX == 0) {
        mx = ev.layerX;
        my = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) {
        mx = ev.offsetX;
        my = ev.offsetY;
    }
    curwall = new Wall(mx, my, mx + 1, my + 1, wallwidth, wallstyle);
    inmotion = true;
    everything.push(curwall);
    drawall();
}

export function stretchwall(ev) {
    if (inmotion) {
        var mx, my;
        if (ev.layerX || ev.layerX == 0) {
            mx = ev.layerX;
            my = ev.layerY;
        } else if (ev.offsetX || ev.offsetX == 0) {
            mx = ev.offsetX;
            my = ev.offsetY;
        }
        curwall.fx = mx;
        curwall.fy = my;
        drawall();
    }
}

export function finish(ev) {
    inmotion = false;
    walls.push(curwall);
}

export function getKeyAndMove(ev) {
    var keyCode;
    if (ev === null) {
        keyCode = window.event.keyCode;
        window.event.preventDefault();
    } else {
        keyCode = ev.keyCode;
        ev.preventDefault();
    }
    switch (keyCode) {
        case 37:
            mypent.moveit(-unit, 0);
            break;
        case 38:
            mypent.moveit(0, -unit);
            break;
        case 39:
            mypent.moveit(unit, 0);
            break;
        case 40:
            mypent.moveit(0, unit);
            break;
        default:
            window.removeEventListener('keydown', getKeyAndMove, false);

    }
    drawall();
}