'use strict';

function Queue(item) {
  var queueItems = [];
  var working = false;

  function runNext() {
    if (working) return;
    if (queueItems.length === 0) return;
    working = true;
    var item = queueItems.shift();
    if (item) {
      item(function (index) {
        console.log(`index: ${index}`);
        working = false;
        runNext();
      });
    }
  }

  return function (item) {
    queueItems.push(item);
    setTimeout(runNext, 0);
  };
}

var q = Queue();

for (let i = 0; i < 5; i++) {
  q(function (next) {
    setTimeout(function () {
      next(i);
    }, 1000);
  });
}
