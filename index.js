const startModalConfig = {
    title: "Прыгающий мяч",
    content: "Нажимай стрелку вверх или W на клавиатуре, чтобы мяч подпрыгивал и уворачивался от препятствий." +
        " Продержись минуту, чтобы выиграть.",
    button: {
        text: "Начать игру",
        onClick: startGame,
        destroyAfterClick: true
    }
}

const gameOverModalConfig = (title, content) => ({
    title, content,
    button: {
        text: "Рестарт",
        onClick: restartGame,
        destroyAfterClick: true
    }
})

const startModal = new Modal(startModalConfig);
startModal.show()

const handleResult = (result) => {
    if (result === "fail") {
        const modal = new Modal(gameOverModalConfig("Вы проиграли.", "Попытайтесь еще раз!"))
        modal.show();
    }
}
subscribeForResult(handleResult);




