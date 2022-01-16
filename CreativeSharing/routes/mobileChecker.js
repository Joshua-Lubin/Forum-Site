function mobile(input1) {
  var device = require('device');
  var mydevice = device(input1);
  return !(mydevice.is('phone') || mydevice.is('tablet') || mydevice.is('mobile'))
}
