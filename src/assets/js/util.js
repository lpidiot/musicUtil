export default {
  //生成uiid
  //len 位数
  //radix 进制
  createUuid: function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
      i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  },
  //本地存储工具
  //key key值
  //data 储存的内容 无则返回存储的key 有则覆写并返回
  //type 为空时的内容类型 数组'[]'或对象'{}' 默认[]
  localUtil: function (key, data, type) {
    if (type == undefined) {
      type = '[]';
    }
    var localData = JSON.parse(window.localStorage.getItem(key) || type);
    if (data == undefined) {
      return localData;
    }
    localData = data;
    window.localStorage.setItem(key, JSON.stringify(localData));
    return localData;
  },
  //获得字符串实际长度，中文2，英文1
  //要获得长度的字符串
  getLength: function (str) {
    var realLength = 0,
      len = str.length,
      charCode = -1;
    for (var i = 0; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128) realLength += 1;
      else realLength += 2;
    }
    return realLength;
  },

  //歌曲json串解析
  
}
