"use strict";

{
  function map(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
      result.push(callback(array[i]));
    }
    return result;
  }

  function pluck(array, key) {
    return map(array, (item) => item[key]);
  }

  function frequenciesBy(array, f) {
    var ret = {};
    for (let i = 0; i < array.length; i++) {
      var key = f(array[i]);

      if (ret[key] === undefined) {
        ret[key] = 0;
      }
      ret[key]++;
    }
    return ret;
  }

  function groupBy(array, f) {
    var ret = {};
    for (let i = 0; i < array.length; i++) {
      var key = f(array[i]);
      if (ret[key] === undefined) {
        ret[key] = [];
      }
      ret[key].push(array[i]);
    }
    return ret;
  }

  function forEach(arrays, f) {
    for (let i = 0; i < arrays.length; i++) {
      f(arrays[i]);
    }
  }

  function concat(arrays) {
    var ret = [];
    forEach(arrays, function (array) {
      forEach(array, function (element) {
        ret.push(element);
      });
    });
    return ret;
  }
}
