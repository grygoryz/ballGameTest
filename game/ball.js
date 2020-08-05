const ball = {
    x: canvas.width / 2,
    y: canvas.height - ground.height - 25,
    radius: 25,
    color: "#620a0a",
    veloY: 10,
    jumpHeight: 270,
    isJumping: false,
    resistance: 0.3,
    angle: 0,

    draw() {
        ctx.beginPath();
        this.isJumping && this._handleJumping();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    },

    jump() {
        this.isJumping = true;
    },

    _handleJumping() {
        const isLanding = this.veloY < 0;

        this.veloY += this.resistance;
        this.resistance = isLanding ? this.resistance + 0.06 : this.resistance - 0.06;

        if (!isLanding) {
            const minY = canvas.height - ground.height - this.jumpHeight + this.radius;
            if (this.y - this.veloY < minY) this.vy = -this.veloY
        } else {
            const maxY = canvas.height - ground.height - this.radius;
            if (this.y + this.veloY + this.radius > maxY) {
                this.y = maxY;
                this.veloY = 10;
                this.resistance = 0.3;
                this.isJumping = false;
                return;
            }
        }

        this.y -= this.veloY;
    }
}