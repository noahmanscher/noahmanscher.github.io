class TailSegment {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        fill(255);
        rect(this.x, this.y, scl, scl);
    }
}