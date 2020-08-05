const obstacles = {
    list: [],
    color: "black",
    veloX: 8,
    timeout: null,
    minTimeout: 900,
    maxTimeout: 1500,
    minHeight: 40,
    maxHeight: 140,
    minWidth: 50,
    maxWidth: 80,
    startIndex: 0,
    dirty: false,

    draw() {
        if (!this.timeout) {
            this.timeout = Math.floor(this.minTimeout + Math.random() * (this.maxTimeout - this.minTimeout));
            setTimeout(() => {
                this.list.push(this._getObstacle())
                this.timeout = null;
                if (!this.dirty) this.dirty = true;
            }, this.timeout)
        }

        for (let i = this.startIndex; i < this.list.length; i++) {
            const obstacle = this.list[i];
            if (obstacle.x - this.veloX + obstacle.width > 0) {
                obstacle.x -= this.veloX;
                obstacle.draw();
            } else {
                ++this.startIndex;
            }
        }
    },

    clear() {
        this.list = [];
        this.timeout = null;
        this.startIndex = 0;
        this.dirty = false;
    },

    _getObstacle() {
        const width = Math.floor(this.minWidth + Math.random() * (this.maxWidth - this.minWidth));
        const height = Math.floor(this.minHeight + Math.random() * (this.maxHeight - this.minHeight));
        const x = canvas.width;
        const y = canvas.height - ground.height - height;

        return {
            width, height, x, y,
            passed: false,
            color: this.color,
            draw() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
    }
}