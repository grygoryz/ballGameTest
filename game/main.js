const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let frame;
let isPlaying = false;

const startGame = (winScore, handleResult) => {
    obstacles.dirty && obstacles.clear();
    score.value && score.clear();

    isPlaying = true;
    drawGame(winScore, handleResult);
    document.addEventListener("keydown", onKeyDown);
}

function onKeyDown(e) {
    if (e.code === "ArrowUp" || e.code === "KeyW") ball.jump();
}

const stopGame = (callback) => {
    document.removeEventListener("keydown", onKeyDown)
    cancelAnimationFrame(frame);
    isPlaying = false;
    callback();
}

const drawGame = (winScore, handleResult) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height - ground.height);

    score.draw()

    if (score.value === winScore) {
        stopGame(() => handleResult("success"));
        return;
    }

    !ground.isDrawn && ground.draw();
    obstacles.draw();
    ball.draw()

    for (let i = obstacles.startIndex; i < obstacles.list.length; i++) {
        const obstacle = obstacles.list[i];

        if (obstacle.passed) continue;

        if (isObstaclePassed(ball, obstacle)) {
            score.value++;
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