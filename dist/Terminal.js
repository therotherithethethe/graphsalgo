"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terminal = void 0;
class Terminal {
    constructor(textareaId) {
        const element = document.getElementById(textareaId);
        if (element instanceof HTMLTextAreaElement) {
            this.textarea = element;
        }
        else {
            throw new Error('Provided ID does not correspond to a textarea element.');
        }
    }
    appendText(text) {
        this.textarea.value += text + '\n'; // Append text with a new line
        this.scrollToBottom();
    }
    scrollToBottom() {
        this.textarea.scrollTop = this.textarea.scrollHeight;
    }
}
exports.Terminal = Terminal;
