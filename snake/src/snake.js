class Snake {
    constructor() {
        this.x = floor(width / 2);
        this.y = floor(height / 2);
        this.reset();
    }

    show() {
        fill(255);

        for (let i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }

        rect(this.x, this.y, scl, scl);
    }

    update() {
        for (let pos of this.tail) {
            if (dist(this.x, this.y, pos.x, pos.y) < 1) {
                return this.reset();
            }
        }

        if (this.total == this.tail.length) {
            for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.total - 1] = createVector(this.x, this.y);
        if (this.total > this.highscore) this.highscore = this.total;

        switch(this.dir) {
            case "LEFT":
                this.x = constrain(this.x - scl, 0, width - scl);
                break;
            case "UP":
                this.y = constrain(this.y - scl, 0, height - scl)
                break;
            case "RIGHT":
                this.x = constrain(this.x + scl, 0, width - scl);
                break;
            case "DOWN":
                this.y = constrain(this.y + scl, 0, height - scl);
                break;
        }
    }

    collision(obj) {
        return this.x == obj.x && this.y == obj.y;
    }

    reset() {
        this.total = 0;
        this.tail = [];
    }

    get highscore() {
        return localStorage.getItem("highscore") || 0;
    }

    set highscore(score) {
        localStorage.setItem("highscore", score);
    }
}