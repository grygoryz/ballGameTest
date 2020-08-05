const obstacles = {
    list: [],
    color: "black",
    veloX: 6,
    timeout: null,
    minTimeout: 1000,
    maxTimeout: 2000,
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
        const width = Math.floor(10 + Math.random() * 70);
        const height = Math.floor(20 + Math.random() * 60);
        const x = canvas.width;
        const y = canvas.height - ground.height - height;
        const passed = false;

        return {
            width, height,
            x, y, passed,
            draw() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
    }
}