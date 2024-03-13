export class Terminal {

    private textarea: HTMLTextAreaElement;

    constructor(textareaId: string) {
        const element = document.getElementById(textareaId);
        if (element instanceof HTMLTextAreaElement) {
            this.textarea = element;
        } else {
            throw new Error('Provided ID does not correspond to a textarea element.');
        }
    }

    public appendText(text: string): void {
        this.textarea.value += text + '\n'; // Append text with a new line
        this.scrollToBottom();
    }

    private scrollToBottom(): void {
        this.textarea.scrollTop = this.textarea.scrollHeight;
    }
    public clear():void {
        this.textarea.value = "";
    }

}