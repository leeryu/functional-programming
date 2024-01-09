"use strict";

function Queue() {
  const queueItems = [];
  var working = false;

  function runNext() {
    if (working) return;
    if (queueItems.length === 0) return;

    var item = queueItems.shift();
    working = true;
    if (item) {
      item(function (arg) {
        working = false;
        runNext();
      });
    }
  }

  return function (item) {
    console.log("function(item)");
    queueItems.push(item);
    setTimeout(runNext, 0);
  };
}

var q = Queue();
for (var i = 0; i < 5; i++) {
  (function (index) {
    q(function (runNext) {
      console.log(`q ${index}`);
      setTimeout(runNext, 1000);
    });
  })(i);
}
