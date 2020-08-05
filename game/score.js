const score = {
    value: 0,
    font: "25px serif",
    x: 20,
    y: 35,
    color: "black",

    draw() {
        ctx.fillStyle = this.color;
        ctx.font = "25px serif";
        ctx.fillText(`${this.value}`, this.x, this.y);
    },

    clear() {
        this.value = 0;
    }
}