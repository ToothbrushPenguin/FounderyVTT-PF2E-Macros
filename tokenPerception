main()

async function main(){


    if (canvas.tokens.controlled.length < 0) {
        ui.notifications.warn("Please select one or more tokens.");
        return;
    }

    const tokens = canvas.tokens.controlled;
    let  messageContent = '';
    const messageHeader = '<b>Perception</b><br>';


    for(let token of tokens) {
        const aMod = token.actor.perception.check.mod;
        const {total} = await new Roll(`1d20 + ${aMod}`).evaluate({async: true});
        messageContent += `<h4>${token.actor.name}</h4>`;
        messageContent += `Rolled  Perception : <b>${total}</b> <br>`;
        messageContent += `Passive Perception : <b>${10 + aMod}</b> <br>`;
        messageContent += `Max Perception    : <b>${20 + aMod}</b> <br>`;
        messageContent += `<br>`;
    }


    if(messageContent !== '') {
        let chatData = {
            user: game.userId,
            speaker: ChatMessage.getSpeaker(),
            content: messageHeader + messageContent,
            whisper: ChatMessage.getWhisperRecipients("GM")
        };
        ChatMessage.create(chatData);
    }

}