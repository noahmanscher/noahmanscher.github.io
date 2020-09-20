let snake;
let food;
const scl = 20;

function setup() {
    createCanvas(600, 600);
    frameRate(10);
    // noStroke();

    snake = new Snake();
    food = new Food();
}

function draw() {
    background(50);

    snake.update();
    if (snake.collision(food)) {
        food.move();
        snake.total++;
    }

    snake.show();
    food.show();

    showScore();
}

function keyPressed() {
    switch(keyCode) {
        case 37:
            if(snake.dir !== "RIGHT") snake.dir = "LEFT";
            break;
        case 38:
            if(snake.dir !== "DOWN") snake.dir = "UP";
            break;
        case 39:
            if(snake.dir !== "LEFT") snake.dir = "RIGHT";
            break;
        case 40:
            if(snake.dir !== "UP") snake.dir = "DOWN";
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