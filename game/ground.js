const ground = {
    height: 160,
    isDrawn: false,
    draw() {
        ctx.fillStyle = "gray";
        ctx.fillRect(0, canvas.height - this.height, canvas.width, this.height);
        this.isDrawn = true;
    }
}