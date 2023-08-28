class player {
    constructor(){
        this.pos = createVector(20, 20);
    }
    
    
    show(){
        fill(255, 0, 100);
        rect(this.pos.x, this.pos.y, 20, 20);
    }


    update(){
        this.pos.x = constrain(this.pos.x, 0, 580);
        this.pos.y = constrain(this.pos.y, 0, 580);
    }

}

function getRandomMultiple(min, max, multiple) {
    const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    return Math.floor(randomNum / multiple) * multiple;
}

function goal(){
    this.set = function set(){
        this.x = 400;
        this.y = 400;
    }

    this.show = function show(){
        fill(0, 255, 90);
        rect(this.x, this.y, 20, 20);
    }
}

var neku
var final
var positions = [];

function pathfind(){
    var pos_up = createVector(neku.pos.x, neku.pos.y - 20);
    var pos_down = createVector(neku.pos.x, neku.pos.y + 20);
    var pos_left = createVector(neku.pos.x - 20, neku.pos.y);
    var pos_right = createVector(neku.pos.x + 20, neku.pos.y);

    var pos_top_right = createVector(neku.pos.x + 20, neku.pos.y - 20);
    var pos_top_left = createVector(neku.pos.x - 20, neku.pos.y - 20);
    var pos_bottom_left = createVector(neku.pos.x - 20, neku.pos.y + 20);
    var pos_bottom_right = createVector(neku.pos.x + 20, neku.pos.y + 20);
    
    var h_score_up = dist(final.x, final.y, pos_up.x, pos_up.y);
    var h_score_down = dist(final.x, final.y, pos_down.x, pos_down.y);
    var h_score_left = dist(final.x, final.y, pos_left.x, pos_left.y);
    var h_score_right = dist(final.x, final.y, pos_right.x, pos_right.y);

    var h_score_bottom_left = dist(final.x, final.y, pos_bottom_left.x, pos_bottom_left.y);
    var h_score_bottom_right = dist(final.x, final.y, pos_bottom_right.x, pos_bottom_right.y);
    var h_score_top_left = dist(final.x, final.y, pos_top_left.x, pos_top_left.y);
    var h_score_top_right = dist(final.x, final.y, pos_top_right.x, pos_top_right.y);

    var arr = [h_score_up, h_score_down, h_score_left, h_score_right, h_score_bottom_left, h_score_bottom_right, h_score_top_left, h_score_top_right];
    var minimum = min(arr);

    
    positions.push(neku.pos);

    if (minimum == h_score_up){
        neku.pos = pos_up;
    } else if (minimum == h_score_down){
        neku.pos = pos_down;
    } else if (minimum == h_score_left){
        neku.pos = pos_left;
    } else if (minimum == h_score_right){
        neku.pos = pos_right;
    } else if (minimum == h_score_top_left){
        neku.pos = pos_top_left;
    } else if (minimum == h_score_top_right){
        neku.pos = pos_top_left;
    } else if (minimum == h_score_bottom_left){
        neku.pos = pos_bottom_left;
    } else if (minimum == h_score_bottom_right){
        neku.pos = pos_bottom_right;
    }
}

function collide(){
    if (dist(final.x, final.y, neku.pos.x, neku.pos.y) <= 10){
        final.x = getRandomMultiple(0, 580, 20);
        final.y = getRandomMultiple(0, 580, 20);
        positions = [];
    }
}

function trail(){
    for (var i = 0; i < positions.length-1; i++){
        fill(255, 100, 100, 100);
        rect(positions[i].x, positions[i].y, 20, 20);
    }
}

function setup() {
    createCanvas(600, 600);
    neku = new player();
    final = new goal();
    final.set();
}

function grid(){
    for (var i = 0; i < 600; i+=20){
        for (var j = 0; j < 600; j+=20){
            fill(0, 0, 255);
            rect(i, j, 20, 20);
        }
        
    }
}
  
function draw() {
    frameRate(12);
    grid();
    neku.show();
    final.show();
    collide();
    pathfind();
    neku.update();
    trail();
}
