const messageDatabase = nodecg.Replicant('messageDatabase');

NodeCG.waitForReplicants(messageDatabase).then(() => {
    messageDatabase.on('change', (newVal) => updateCard(newVal))
})

function updateCard(newVal) {
    let messageBankDiv = document.getElementById('messageBankDiv');
    messageBankDiv.innerHTML = '';
    for (const id in newVal) {
        const message = newVal[id];
        let type;
        switch (message.type) {
            case 'title': type = 'Title'; break;
            case 'upNext': type = 'Up Next'; break;
            case 'message': type = 'Message'; break;
        }
        messageBankDiv.innerHTML = messageBankDiv.innerHTML + `
        <button noRipple class="collapseButton" onClick="toggleCollapse(this)"><span class="buttonText">${message.name}</span><span class="material-icons collapseButtonIcon">expand_more</span></button>
            <div class="collapseContent">
            <div class="collapseText"><b>Type: </b> ${type}</div>
            <div class="collapseText"><b>Line 1: </b> ${message.line1}</div>
            <div class="collapseText"><b>Line 2: </b> ${message.line2}</div>
                <div class="collapseButtonDiv">
                    <button noRipple class="roundButton" onClick="nodecg.sendMessage('editMessage', '${message.id}')"><span class="material-icons collapseContentIcon">edit</span></button>
                    <button noRipple class="roundButton" onClick="deleteMessage('${message.id}')"><span class="material-icons collapseContentIcon">delete_outline</span></button>
                </div>
            </div>
        `;
    }
}

function search(value) {
    let collapseButton = document.getElementsByClassName('collapseButton')
    for (let button of collapseButton) {
        if (button.querySelector('.buttonText').innerHTML.toUpperCase().includes(value.toUpperCase()))
            button.style.display = 'inherit';
        else
            button.style.display = 'none';
    }
}

function toggleCollapse(element) {
    const collapseButton = document.querySelectorAll('button.collapseButton');
    for (let button of collapseButton) {
        if (button !== element && button.classList.contains('buttonActive')) {
            button.classList.remove('buttonActive');
            button.querySelector('.collapseButtonIcon').classList.remove('arrowActive')
            button.nextElementSibling.style.maxHeight = null;
            button.nextElementSibling.classList.remove('collapseActive');
        }
    }
    element.classList.toggle('buttonActive')
    switch (element.classList.contains('buttonActive')) {
        case false: element.nextElementSibling.style.maxHeight = null; element.nextElementSibling.classList.remove('collapseActive'); element.querySelector('.collapseButtonIcon').classList.remove('arrowActive'); break;
        case true: element.nextElementSibling.style.maxHeight = element.nextElementSibling.scrollHeight + 'px'; element.nextElementSibling.classList.add('collapseActive'); element.querySelector('.collapseButtonIcon').classList.add('arrowActive'); break;
    }
}

async function createMessage() {
    let uuid = uuidV4();
    messageDatabase.value[uuid] = { id: uuid, type: 'title', name: '', line1: '', line2: '' }
    setTimeout(() => nodecg.sendMessage('editMessage', uuid), 250)
}

function deleteMessage(uuid) {
    delete messageDatabase.value[uuid];
}

function uuidV4(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}