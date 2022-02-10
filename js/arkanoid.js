var baller = new Baller(100, 400, 20, 50);
var ctx = document.getElementById("canvas").getContext("2d");
var everything = [];

export function init() {
    ctx = document.getElementById("canvas").getContext("2d");
    ctx.width = 1000;
    everything.push(baller);
    setInterval(drawall, 50);
}

function drawall() {
    ctx.clearRect(0, 0, 800, 500);
    var i;
    for (i = 0; i < everything.length; i++) {
        everything[i].draw();
        everything[i].moveit();
    }
}



function Baller(sx, sy, height, width) {
    this.sx = sx;
    this.sy = sy;
    this.height = height;
    this.width = width;
    this.draw = drawballer;
    this.moveit = moveballer;
    this.borderRight = this.width + this.height / 2;
    this.borderLeft = this.height / 2;;
    this.fillstyle = "rgb(255,10,10)";
}

function drawballer() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillstyle = this.fillstyle;
    ctx.beginPath();
    ctx.arc(this.sx, this.sy, this.height / 2, Math.PI / 2, 3 * Math.PI / 2, false);
    ctx.fillRect(this.sx, this.sy - this.height / 2, this.width, this.height);
    ctx.arc(this.sx + this.width, this.sy, this.height / 2, Math.PI / 2, 3 * Math.PI / 2, true);
    ctx.fill();
}

var direction = "left";

const directions = new Map();
directions.set("left", 10);
directions.set("right", -10);

function moveballer() {
    var changeDirection = false;
    if (this.sx + this.borderRight >= 800) {
        direction = "right";
    }
    if (this.sx - this.borderLeft <= 0) {
        direction = "left";
    }

    this.sx += directions.get(direction);
    //if(this.sx - this.borderLeft >= 0) {}

}