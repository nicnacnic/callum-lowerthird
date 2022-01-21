const messageDatabase = nodecg.Replicant('messageDatabase');
const lowerthirdText = nodecg.Replicant('lowerthirdText');
const settings = nodecg.Replicant('settings')

function loadDropdown(type) {
    NodeCG.waitForReplicants(messageDatabase, lowerthirdText, settings).then(() => {
        messageDatabase.on('change', (newVal) => {
            let options = '';
            for (id in newVal) {
                let message = newVal[id];
                if (message.type === type) options = options + `<option value=${message.id}>${message.name}</option>`;
            }
            try { document.getElementById(`message`).innerHTML = options; } catch {}
            
        })
    })
}

function setText(uuid) {
    let message = messageDatabase.value[uuid];
    lowerthirdText.value[0] = message.line1;
    lowerthirdText.value[1] = message.line2;
}

function setCustomText(line1, line2) {
    lowerthirdText.value[0] = line1;
    lowerthirdText.value[1] = line2;
}

function setTextTimed(uuid) {
    setTimeout(() => {
        let message = messageDatabase.value[uuid];
        lowerthirdText.value[0] = message.line1;
        lowerthirdText.value[1] = message.line2;
    }, settings.value.time)
}

function setCustomTextTimed(line1, line2) {
    setTimeout(() => {
        lowerthirdText.value[0] = line1;
    lowerthirdText.value[1] = line2;
    }, settings.value.time)
}

function hideText() {
    lowerthirdText.value[0] = '';
    lowerthirdText.value[1] = '';
}
