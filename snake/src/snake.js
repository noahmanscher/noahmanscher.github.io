/**
 * @typedef {Object} Vector
 * @property {number} x
 * @property {number} y
 * @property {number} z
 */

/**
 * 
 */

class Snake {
    constructor() {
        /** @type {number} */
        this.x = floor(width / 2);
        /** @type {number} */
        this.y = floor(height / 2)

        /** @type {number} */
        this.total = 0;
        /** @type {Vector[]} */
        this.tail = [];

        /** @type {string} */
        this.dir = "";
        /** @type {string} */
        this.currentDir = "";
    }

    /**
     * 
     * @param {number} x1 Start X
     * @param {number} y1 Start Y
     * @param {number} x2 End X
     * @param {number} y2 End Y
     */
    fillLine(x1, y1, x2, y2) {
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2 || y1);
        ctx.stroke();
    }

    show() {
        fill(255);

        for (let i = 0; i < this.tail.length; i++) {
            let current = this.tail[i];
            rect(current.x, current.y, scl, scl);
            
            let prev = this.tail[i+1] || {};
            let next = this.tail[i-1] || {};
            if(i == this.total - 1) prev = { x: this.x, y: this.y };

            if(!(prev.x == current.x - scl && prev.y == current.y) && !(next.x == current.x - scl && next.y == current.y)) this.fillLine(current.x, current.y, current.x, current.y + scl); // left
            if(!(prev.x == current.x + scl && prev.y == current.y) && !(next.x == current.x + scl && next.y == current.y)) this.fillLine(current.x + scl, current.y, current.x + scl, current.y + scl); // right
            if(!(prev.x == current.x && prev.y == current.y - scl) && !(next.x == current.x && next.y == current.y - scl)) this.fillLine(current.x, current.y, current.x + scl, current.y); // above
            if(!(prev.x == current.x && prev.y == current.y + scl) && !(next.x == current.x && next.y == current.y + scl)) this.fillLine(current.x, current.y + scl, current.x + scl, current.y + scl); // bottom
        }

        rect(this.x, this.y, scl, scl);

        let firstTail = this.tail[this.total - 1] || {};
        if(!(firstTail.x == this.x - scl && firstTail.y == this.y)) this.fillLine(this.x, this.y, this.x, this.y + scl); // left
        if(!(firstTail.x == this.x + scl && firstTail.y == this.y)) this.fillLine(this.x + scl, this.y, this.x + scl, this.y + scl); // right
        if(!(firstTail.x == this.x && firstTail.y == this.y - scl)) this.fillLine(this.x, this.y, this.x + scl, this.y); // above
        if(!(firstTail.x == this.x && firstTail.y == this.y + scl)) this.fillLine(this.x, this.y + scl, this.x + scl, this.y + scl); // bottom
    }

    update() {
        this.currentDir = this.dir;
        for (let pos of this.tail) {
            if (dist(this.x, this.y, pos.x, pos.y) < 1) return this.reset();
        }

        if (this.total == this.tail.length) {
            for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        if (this.total !== 0) this.tail[this.total - 1] = createVector(this.x, this.y);
        if (this.total > this.highscore) this.highscore = this.total;

        switch(this.dir) {
            case "LEFT":
                this.x -= scl // constrain(this.x - scl, 0, width - scl);
                break;
            case "UP":
                this.y -= scl // constrain(this.y - scl, 0, height - scl)
                break;
            case "RIGHT":
                this.x += scl //constrain(this.x + scl, 0, width - scl);
                break;
            case "DOWN":
                this.y += scl // constrain(this.y + scl, 0, height - scl);
                break;
        }

        if(this.x < 0) this.x = width - scl;
        if(this.y < 0) this.y = height - scl;
        if(this.x > width - scl) this.x = 0;
        if(this.y > width - scl) this.y = 0;
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