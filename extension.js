module.exports = function (nodecg) {
    const messageDatabase = nodecg.Replicant('messageDatabase', { defaultValue: {} })
    const lowerthirdText = nodecg.Replicant('lowerthirdText', { defaultValue: ['', '']})
    const settings = nodecg.Replicant('settings', { defaultValue: { eventName: '', backgroundColor: '#000000', foregroundColor: '#00FFFF', time: '5000' }})
    nodecg.log.info('Lowerthird started!')
}