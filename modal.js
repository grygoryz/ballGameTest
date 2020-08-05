class Modal {
    constructor(options) {
        this.title = options.title;
        this.content = options.content;
        this.button = options.button;
        this.createModal()
    }

    createModal() {
        this.modal = document.createElement("div");
        this.modal.classList.add("modal");
        this.modal.innerHTML = `<div class="modal__container">
        <h1 class="modal__title">${this.title}</h1>
        <div class="modal__content">${this.content}</div>
            <button class="modal__button">${this.button.text}</button>
        </div>`

        const button = this.modal.querySelector(".modal__button");
        const onClick = this.button.onClick;
        const destroyAfterClick = this.button.destroyAfterClick;

        button.onclick = () => {
            onClick();
            destroyAfterClick && this.destroy();
        };
    }

    show() {
        document.body.prepend(this.modal);
        this.modalNode = document.querySelector(".modal");
    }

    destroy() {
        this.modalNode.remove()
        this.modal = null;
    }
}