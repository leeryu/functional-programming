'use strict';

// 동시성 기본형(concurrency primitive)

function DroppingQueue(max, worker) {
  var queue_items = [];
  var working = false;

  function runNext() {
    if (working) return; // 작업중이면 아무것도 하지 않는다.
    if (queue_items.length === 0) return; // 큐가 비었으면 아무것도 하지 않는다.
    working = true;
    var item = queue_items.shift();

    worker(item.data, function (val) {
      working = false;
      setTimeout(item.callback, 0, val); //  다음 항목을 실행한다.(비동기로 실행)
      runNext();
    });
  }

  return function (data, callback) {
    queue_items.push({
      data: data,
      callback: callback || function () {},
    });
    while (queue_items.length > max) {
      //  큐에 추가한 후에 항목이 max를 넘는다면 모두 버린다.
      queue_items.shift();
    }
    setTimeout(runNext, 0); //  큐에 항목을 추가호고 워커를 시작한다.
  };
}

var q = DroppingQueue(1, function (item, done) {
  item(function (index) {
    done(index);
  });
});

for (let i = 0; i < 10; i++) {
  q(
    function (next) {
      setTimeout(function () {
        next(i);
      }, 1000);
    },
    function (index) {
      console.log(`done! index: ${index}`);
    },
  );
}
