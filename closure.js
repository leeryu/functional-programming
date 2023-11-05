"use strict";

function outer(x) {
  var n = 5;

  return function (x) {
    return n * x;
  };
}

//var inner = outer();

//console.log(inner(10)); // 50

{
  function createCounter() {
    let count = 0;

    function increment() {
      count++;
      console.log(count);
    }

    function decrement() {
      count--;
      console.log(count);
    }

    return {
      increment,
      decrement,
    };
  }

  const counter1 = createCounter();

  counter1.increment(); // 1
}

{
  function asyncTask(callback) {
    setTimeout(function () {
      const data = "비동기 작업 완료!";
      callback(data);
    }, 2000);
  }

  function handleAsyncData() {
    asyncTask(function (result) {
      console.log(result);
    });
  }

  // handleAsyncData();
  // console.log("비동기 작업 시작");
}

{
  for (var i = 0; i < 5; i++) {
    (function (j) {
      setTimeout(function () {
        console.log(j);
      }, 1000);
    })(i);
  }
}
