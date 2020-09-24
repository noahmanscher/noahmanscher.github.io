let snake;
let food;
let ctx;
const scl = 20;

function mousePressed() {
    snake.total++;
}

function setup() {
    createCanvas(600, 600);
    frameRate(1);
    noStroke();
    ctx = drawingContext;

    snake = new Snake();
    food = new Food();
}

function draw() {
    background(50);

    snake.update();
    snake.show();

    if (snake.collision(food)) {
        food.move();
        snake.total++;
    }
    
    food.show();

    showScore();
}

function keyPressed() {
    switch(keyCode) {
        case 37:
        case 65:
            if(snake.currentDir !== "RIGHT") snake.dir = "LEFT";
            break;
        case 38:
        case 87:
            if(snake.currentDir !== "DOWN") snake.dir = "UP";
            break;
        case 39:
        case 68:
            if(snake.currentDir !== "LEFT") snake.dir = "RIGHT";
            break;
        case 40:
        case 83:
            if(snake.currentDir !== "UP") snake.dir = "DOWN";
            break;
    }
}

function showScore() {
    textSize(20);
    fill(200);
    textAlign(LEFT);
    text("Score: " + snake.total, 10, 25);
    textAlign(RIGHT);
    text("Highscore: " + snake.highscore, 590, 25);
}

document.querySelector("input").oninput = function() {
    frameRate(parseInt(document.querySelector("input").value));
}