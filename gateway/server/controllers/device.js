const F = global.framework
exports.install = function () {
  F.route('/device/search', startSearch, ['post'])
  F.route('/device/search', searchList, ['json'])
  F.route('/device', addDevice, ['post', 'json'])
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
 * @api {post} /device/search Search Start
 * @apiDescription Start searching device
 * @apiGroup Device
 * @apiUse ExecError
 * @apiUse ResultOK
 *
 * */

function startSearch () {

}

/**
 * @api {get} /device/search Search List
 * @apiDescription Available device list
 * @apiGroup Device
 * @apiName SearchList
 * @apiUse ExecError
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "result": "OK",
 *    "data": [
 *      {
 *         "UUID": "1af33456...",
 *         "name": "meter"
 *      },
 *      {
 *          "UUID": "108dc3456...",
 *          "name": "relay"
 *      }
 *    ]
 * }
 * */

function searchList () {

}

/**
 * @api {post} /device Add device
 * @apiDescription Add device from list, please see {GET} /device/search
 * @apiGroup Device
 * @apiParam {String} UUID the target device UUID
 * @apiParam {String} alias the device alias display in list
 * @apiParam {String} area where is the device
 * @apiParam {String} type device type
 * @apiParamExample {json} Example
 * {
 *    "UUID": "108dc3456...",
 *    "alias": "溫濕度計-1",
 *    "area": "臥室",
 *    "type": "device type"
 * }
 * @apiUse ResultOK
 * @apiUse ExecError
 * @apiUse ParamError
 *
 * */

function addDevice () {

}