'use strict';
import { functional } from '../functional.js';

{
  function incrementSize(item) {
    var options = item.options; // 조회
    var size = options.size; // 조회
    var newSize = size + 1; // 증가
    var newOptions = functional.objectSet(options, 'size', newSize); // 변경
    var newItem = functional.objectSet(item, 'options', newOptions); // 변경
    return newItem;
  }

  var shirt = {
    name: 'shirt',
    price: 13,
    options: {
      size: 3,
      color: 'blue',
      length: {
        min: 2,
        max: 5,
      },
    },
  };

  function update2(item, key1, key2, modify) {
    return functional.update(item, key1, function (options) {
      return functional.update(options, key2, modify);
    });
  }

  function update3(item, key1, key2, key3, modify) {
    return functional.update(item, key1, function (options) {
      return update2(options, key2, key3, modify);
    });
  }

  function update4(item, k1, k2, k3, k4, modify) {
    return functional.update(item, k1, function (options) {
      return update3(options, k2, k3, k4, modify);
    });
  }

  function netstedUpdate(object, keys, modify) {
    if (keys.length === 0) return modify(object);

    var key1 = keys.shift();
    var restOfKeys = [...keys];
    return functional.update(object, key1, function (options) {
      return netstedUpdate(options, restOfKeys, modify);
    });
  }

  // shirt = incrementSize(shirt);
  console.log(
    netstedUpdate(shirt, ['options', 'length', 'min'], function (x) {
      return x * 2;
    }),
  );
}
