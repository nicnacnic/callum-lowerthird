const messageDatabase = nodecg.Replicant('messageDatabase')
let id;

nodecg.listenFor('editMessage', (value, ack) => {
    id = value;
    let message = messageDatabase.value[id];
    document.getElementById("name").value = message.name;
    document.getElementById("type").value = message.type;
    document.getElementById("line1").value = message.line1;
    document.getElementById("line2").value = message.line2;
    nodecg.getDialog('editMessage').open();
});

function save() {
    messageDatabase.value[id].name = document.getElementById("name").value;
    messageDatabase.value[id].type = document.getElementById("type").value;
    messageDatabase.value[id].line1 = document.getElementById("line1").value;
    messageDatabase.value[id].line2 = document.getElementById("line2").value;
    nodecg.getDialog('editMessage').close();
}