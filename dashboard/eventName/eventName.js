const settings = nodecg.Replicant('settings')

NodeCG.waitForReplicants(settings).then(() => {
    settings.on('change', (newVal) => document.getElementById('eventName').innerHTML = `${newVal.eventName} GFX Control`)
})