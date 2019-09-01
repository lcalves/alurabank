class View {
    constructor(seletor) {
        this._elemento = document.querySelector(seletor);
    }
    update(modelo) {
        this._elemento.innerHTML = this.template(modelo);
    }
}
