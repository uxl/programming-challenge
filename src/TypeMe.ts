//load palletes
export class TypeMe {

    //typing animation
    constructor(textObj: PIXI.Text, message: string, messageLength: number, delay: number) {
        if (messageLength === undefined) {
            textObj.text = "";
            messageLength = 0;
        }

        //loop through typing
        let newString: string = message.substring(0, messageLength);
        textObj.text = newString;
        if (messageLength >= 1) {
            this.sounds.play("keypress");
        }

        //increment length of message
        messageLength++;

        if (messageLength < message.length + 1) {
            setTimeout(this.typeMe.bind(this, textObj, message, messageLength, 50), delay);
        }
    }
}
