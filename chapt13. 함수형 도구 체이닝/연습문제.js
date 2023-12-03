"use strict";

{
  var evaluations = [
    { name: "Jane", position: "catcher", score: 25 },
    { name: "Ellen", position: "first base", score: 10 },
    { name: "Angela", position: "pitcher", score: 3 },
    { name: "John", position: "catcher", score: 25 },
    { name: "Mark", position: "pitcher", score: 10 },
    { name: "Same", position: "first base", score: 2 },
  ];

  function map(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
      result.push(callback(array[i]));
    }
    return result;
  }

  function objectSet(object, key, value) {
    const objectCopy = Object.assign({}, object);
    objectCopy[key] = value;
    return objectCopy;
  }

  var roster = evaluations.reduce((acc, cur, i) => {
    var position = cur.position;
    if (acc[position]) {
      return acc;
    }
    return objectSet(acc, position, cur.name);
  }, {});

  function sortBy(array, f) {
    var ret = array.slice();
    for (let i = 0; i < ret.length; i++) {
      for (let j = i + 1; j < ret.length; j++) {
        if (f(ret[i], ret[j])) {
          var temp = ret[i];
          ret[i] = ret[j];
          ret[j] = temp;
        }
      }
    }
    return ret;
  }

  var arrays = [1, 3, 5, 2, 4];
  console.log(arrays.slice(1));
}
