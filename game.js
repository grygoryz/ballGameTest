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
let obstacles = [];
const veloX = 6;

const getObstacle = () => {
    const width = Math.floor(10 + Math.random() * 70);
    const height = Math.floor(20 + Math.random() * 60);
    const x = canvas.width;
    const y = canvas.height - groundHeight - height;
    const color = "black"
    const passed = false;

    return {
        width, height,
        x, y, passed,
        draw() {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

let timeout;
let startIndex = 0;

const drawObstacles = () => {

    if (!timeout) {
        timeout = Math.floor(1000 + Math.random() * 1500);
        setTimeout(() => {
            obstacles.push(getObstacle())
            timeout = null;
        }, timeout)
    }

    for (let i = startIndex; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        if (obstacle.x - veloX + obstacle.width > 0) {
            obstacle.x -= veloX;
            obstacle.draw();
        } else {
            ++startIndex;
        }
    }
}

// game
let frame;
let isPlaying = false;
let score = 0;

const drawGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height - groundHeight);

    ctx.font = "25px serif";
    ctx.fillText(`${score}`, 20, 30);

    drawObstacles();
    ball.draw()

    for (let i = startIndex; i < obstacles.length; i++) {
        const obstacle = obstacles[i];

        if (obstacle.passed) continue;

        if (isObstaclePassed(ball, obstacle)) {
            score++;
            obstacle.passed = true;
            continue
        }

        if (isCollisionHappened(ball, obstacle)) {
            cancelAnimationFrame(frame);
            isPlaying = false;
            gameOverCallback("fail");
            return;
        }
    }

    frame = requestAnimationFrame(drawGame);
}

const isObstaclePassed = (ball, obstacle) => {
    return obstacle.x + obstacle.width < (ball.x - ball.radius);
}

const isCollisionHappened = (ball, obstacle) => {
    return obstacle.x <= (ball.x + ball.radius) && obstacle.y <= (ball.y + ball.radius)
}

document.addEventListener("keydown", onKeyDown);

function onKeyDown(e) {
    if (e.code === "ArrowUp" || e.code === "KeyW") ball.jump();
}

const startGame = () => {
    isPlaying = true;
    drawGround();
    drawGame();
}

const restartGame = () => {
    // obstacles refresh
    obstacles = [];
    startIndex = 0;
    startGame()
}

let gameOverCallback;

const subscribeForResult = (f) => {
    gameOverCallback = f;
}












