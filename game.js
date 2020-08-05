const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ground
const groundHeight = 160;

const drawGround = () => {
    ctx.fillStyle = "gray";
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
}

// ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height - groundHeight - 25,
    radius: 25,
    color: "black",
    veloY: 10,
    jumpHeight: 270,
    isJumping: false,
    resistance: 0.3,

    draw() {
        ctx.beginPath();
        this.isJumping && this.handleJumping();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    },

    jump() {
        this.isJumping = true;
    },

    handleJumping() {
        const isLanding = this.veloY < 0;
        this.veloY += this.resistance;
        this.resistance = isLanding ? this.resistance + 0.06 : this.resistance - 0.06;

        if (!isLanding) {
            const minY = canvas.height - groundHeight - this.jumpHeight + this.radius;
            if (this.y - this.veloY < minY) this.vy = -this.veloY
        } else {
            const maxY = canvas.height - groundHeight - this.radius;
            if (this.y + this.veloY + this.radius > maxY) {
                this.y = maxY;
                //this.veloY = -this.vy;

                this.veloY = 10;
                this.resistance = 0.3;

                this.isJumping = false;
                return;
            }
        }

        this.y -= this.veloY;
    }
}

// obstacles
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
        const y = canvas.height - groundHeight - height;
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

// score
const score = {
    value: 0,
    font: "25px serif",
    x: 20,
    y: 35,
    draw() {
        ctx.font = "25px serif";
        ctx.fillText(`${this.value}`, this.x, this.y);
    },
    increment() {
        this.value++;
    },
    clear() {
        this.value = 0;
    }
}

// game
let frame;
let isPlaying = false;

const drawGame = (winScore, handleResult) => {

    ctx.clearRect(0, 0, canvas.width, canvas.height - groundHeight);

    obstacles.draw();
    ball.draw()
    score.draw()

    if (score.value === winScore) {
        stopGame(() => handleResult("success"));
        return;
    }

    for (let i = obstacles.startIndex; i < obstacles.list.length; i++) {
        const obstacle = obstacles.list[i];

        if (obstacle.passed) continue;

        if (isObstaclePassed(ball, obstacle)) {
            score.increment();
            obstacle.passed = true;
            continue
        }

        if (isCollisionHappened(ball, obstacle)) {
            stopGame(() => handleResult("fail", score.value))
            return;
        }
    }

    frame = requestAnimationFrame(() => drawGame(winScore, handleResult));
}

const isObstaclePassed = (ball, obstacle) => {
    return obstacle.x + obstacle.width < (ball.x - ball.radius);
}

const isCollisionHappened = (ball, obstacle) => {
    return obstacle.x <= (ball.x + ball.radius) && obstacle.y <= (ball.y + ball.radius)
}

const stopGame = (callback) => {
    cancelAnimationFrame(frame);
    isPlaying = false;
    callback();
}

document.addEventListener("keydown", onKeyDown);

function onKeyDown(e) {
    if (e.code === "ArrowUp" || e.code === "KeyW") ball.jump();
}

const startGame = (winScore, handleResult) => {
    obstacles.dirty && obstacles.clear();
    score.value && score.clear();

    isPlaying = true;
    drawGround();
    drawGame(winScore, handleResult);
}











