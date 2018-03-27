const F = global.framework
exports.install = function () {
  F.route('/device', addDevice, ['post', 'json'])
}


function addDevice () {

}