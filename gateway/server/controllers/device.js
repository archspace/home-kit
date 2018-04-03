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

function deviceService () {
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
  })
}


