'use strict';

class ChatMessage {
    constructor(sender, message) {
        this.sender = sender;
        this.message = message;
        this.timestamp = new Date().toISOString();
    }
}

module.exports = ChatMessage;
