const messageDatabase = nodecg.Replicant('messageDatabase');
const lowerthirdText = nodecg.Replicant('lowerthirdText');

function loadDropdown(type) {
    NodeCG.waitForReplicants(messageDatabase).then(() => {
        messageDatabase.on('change', (newVal) => {
            let options = '';
            for (id in newVal) {
                let message = newVal[id];
                if (message.type === type) options = options + `<option value=${message.id}>${message.name}</option>`;
            }
            document.getElementById(`message`).innerHTML = options;
        })
    })
}

function setText(uuid) {
    let message = messageDatabase.value[uuid];
    lowerthirdText.value[0] = message.line1;
    lowerthirdText.value[1] = message.line2;
}

function hideText() {
    lowerthirdText.value[0] = '';
    lowerthirdText.value[1] = '';
}
