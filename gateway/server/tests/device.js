const TEST = global.TEST
const WEBSOCKETCLIENT = global.WEBSOCKETCLIENT
TEST('device', () => {
  WEBSOCKETCLIENT(function (client) {
    client.connect('ws://localhost:8000/device')

    client.on('open', () => {
      client.send({
        cmd: 'start-scan'
      })
    })

    client.on('message', (msg) => {
      console.log(msg)
    })
  })
})