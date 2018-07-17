const F = global.framework
const noble = require('noble')
exports.install = function () {
  F.websocket('device', deviceService, ['json'])
}

/**
 * @apiDefine ExecError
 * @apiErrorExample {json} Execution-Failed:
 * HTTP/1.1 500 Server Error
 * {
 *    "error": 500
 * }
 * */

/**
 * @apiDefine ParamError
 * @apiErrorExample {json} Parameter-Error:
 * HTTP/1.1 400 Server Error
 * {
 *    "error": 400
 * }
 *
 * */

/**
 * @apiDefine ResultOK
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "result": "OK"
 * }
 * */

/**
 * @api {websocket} /device ScanDevice
 * @apiGroup Device
 * @apiParamExample {json} StartScan:
 * {
 *    cmd: "start-scan",
 *    params: {
 *      uuids: [
 *        "uuid string .....",
 *        "uuid string ....."
 *      ]
 *    }
 * }
 *
 * @apiParamExample {json} StopScan:
 * {
 *    cmd: "stop-scan"
 * }
 *
 * @apiSuccessExample {json} discover:
 * {
 *    event: "discover",
 *    data: {
 *      id: "<id>",
 *      address: "<BT address">, // Bluetooth Address of device, or 'unknown' if not known
 *      addressType: "<BT address type>", // Bluetooth Address type (public, random), or 'unknown' if not known
 *      connectable: <connectable>, // true or false, or undefined if not known
 *      advertisement: {
 *        localName: "<name>",
 *        txPowerLevel: <int>,
 *        serviceUuids: ["<service UUID>", ...],
 *        serviceSolicitationUuid: ["<service solicitation UUID>", ...],
 *        manufacturerData: <Buffer>,
 *        serviceData: [
 *          {
 *            uuid: "<service UUID>"
 *            data: <Buffer>
 *          },
 *          ...
 *        ]
 *      },
 *      rssi: <rssi>
 *    }
 * }
 *
 * */

function deviceService() {
  const ctrl = this
  ctrl.on('message', (client, msg) => {
    const cmd = msg && msg.cmd
    const uuids = msg.params && msg.params.uuids
    switch (cmd) {
      case 'start-scan':
        noble.startScanning(uuids, false)
        break
      case 'stop-scan':
        noble.stopScanning()
        break
      default:
        console.error('unknown cmd ' + cmd)
        break
    }
  })

  noble.on('discover', (p) => {
    const data = {
      event: 'discover',
      data: {
        id: p.id,
        address: p.address,
        addressType: p.addressType,
        connectable: p.connectable,
        advertisement: p.advertisement,
        rssi: p.rssi
      }
    }
    ctrl.send(data)
    //Test: direct to connect peripheral
    if (p.advertisement.localName == 'HC-08')//'home-kit')
    {
      console.log('\nTry connecting:')
      p.connect(err => {
        if (err) {
          console.log(err)
        } else {
          console.log('connected !!')

          p.discoverServices(null, function (err, services) {
            if (err) {
              console.log('Error discovering services: ' + err)
              return
            }

            /*services.forEach(function(service) {
              if (service.uuid !== 'FFE0') {
                console.log('skip uuid: ' + service.uuid)
                return
              }*/
            const target = services.filter(s => s.uuid === 'ffe0')[0]
            if (target) {
              console.log('Discover uuid: ' + target)
              target.discoverCharacteristics(null, function (err, characteristics) {
                characteristics.forEach(function (characteristic) {
                  console.log('uuid:' + characteristic.uuid)
                  if ('ffe1' === characteristic.uuid) {
                    characteristic.notify(true)
                    characteristic.write(Buffer.from("test_cmd"))
                    console.log('write')
                    characteristic.on('read', function (data, notification) {
                      if (notification) {
                        console.log('notify')
                        //console.log(String(data))
                        console.log('humidity: ' + data[0] + ', temp: ' + data[1])
                      }
                    });
                  }
                });
              });
            }

            //});
          });
        }
      })
    } else {
      console.log('\nSkip:')
    }

  })
}

function OnConnect(error) {

}


