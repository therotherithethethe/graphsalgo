"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terminal = void 0;
var Terminal = /** @class */ (function () {
    function Terminal(textareaId) {
        var element = document.getElementById(textareaId);
        if (element instanceof HTMLTextAreaElement) {
            this.textarea = element;
        }
        else {
            throw new Error('Provided ID does not correspond to a textarea element.');
        }
    }
    Terminal.prototype.appendText = function (text) {
        this.textarea.value += text + '\n'; // Append text with a new line
        this.scrollToBottom();
    };
    Terminal.prototype.scrollToBottom = function () {
        this.textarea.scrollTop = this.textarea.scrollHeight;
    };
    Terminal.prototype.clear = function () {
        this.textarea.value = "";
    };
    return Terminal;
}());
exports.Terminal = Terminal;
