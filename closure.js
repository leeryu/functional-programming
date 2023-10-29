"use strict";

function outer(x) {
  var n = 5;

  return function (x) {
    return n * x;
  };
}

var inner = outer();

console.log(inner(10)); // 50
