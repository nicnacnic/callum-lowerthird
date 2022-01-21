const eventLogo = nodecg.Replicant('assets:eventLogo');
const messageDatabase = nodecg.Replicant('messageDatabase');
const lowerthirdText = nodecg.Replicant('lowerthirdText');
const settings = nodecg.Replicant('settings');

NodeCG.waitForReplicants(eventLogo, messageDatabase, settings).then(() => {
    eventLogo.on('change', (newVal) => {
        try { document.getElementById('eventLogo').src = newVal[0].url; } catch { }
    })
    settings.on('change', (newVal) => {
        try {
            document.body.style.backgroundColor = newVal.backgroundColor;
            document.getElementById('lowerthird').style.backgroundColor = newVal.foregroundColor;
        } catch { }
    })
    lowerthirdText.on('change', (newVal) => {
        document.getElementById('line1').innerHTML = `<b>${newVal[0]}</b>`;
        document.getElementById('line2').innerHTML = newVal[1]
    })
})