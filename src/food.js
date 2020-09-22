class Food {
    constructor() {
        this.move();
    }

    show() {
        fill(255, 0, 100);
        rect(this.x, this.y, scl, scl, 10);
    }

    move() {
        this.x = floor(random(0, width) / scl) * scl;
        this.y = floor(random(0, height) / scl) * scl;

        if (this.x == snake.x && this.y == snake.y) this.move();
    }
}