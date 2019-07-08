export default class Controller {
    constructor() {
        this.moveKeys = new Map([[37, false], [38, false], [39, false], [40, false]]);
    }

    handleKeyInput() {
        document.addEventListener('keydown', e => {
            e.preventDefault();
            if (this.moveKeys.has(e.keyCode) && !this.moveKeys.get(e.keyCode)) {
                this.moveKeys.set(e.keyCode, true);
            }
        });
        document.addEventListener('keyup', e => {
            e.preventDefault();
            if (this.moveKeys.has(e.keyCode) && this.moveKeys.get(e.keyCode)) {
                this.moveKeys.set(e.keyCode, false);
            }
        });
    }
}