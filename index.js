const winScore = 25;

const playGame = () => startGame(winScore, handleResult);

const startModalConfig = {
    title: "Прыгающий мяч",
    content: `Нажимай стрелку вверх или W на клавиатуре, чтобы мяч подпрыгивал и уворачивался от препятствий. 
    Для победы нужно набрать ${winScore} очков.`,
    button: {
        text: "Начать игру",
        onClick: playGame,
        destroyAfterClick: true
    }
}

const gameOverModalConfig = (title, content) => ({
    title, content,
    button: {
        text: "Рестарт",
        onClick: playGame,
        destroyAfterClick: true
    }
})

const startModal = new Modal(startModalConfig);

startModal.show()

const handleResult = (result, score) => {
    if (result === "fail") {
        const modal = new Modal(gameOverModalConfig("Вы проиграли.",
            `Вам не хватило ${winScore - score} очков. Попытайтесь еще раз!`))
        modal.show();
    } else if (result === "success") {
        const modal = new Modal(gameOverModalConfig("Вы победили!", "Можете сыграть еще раз."))
        modal.show();
    }
}





