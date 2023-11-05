"use strict";
// 웹사이트에서 사용자의 방문 횟수를 세늩 코드 조각을 생각해보겠습니ㅏㄷ.
{
  // 1. 전역변수
  let visitCount = 0;

  function increaseCount() {
    return ++visitCount;
  }

  //console.log(increaseCount()); // 1

  // 2. closure
  function counter() {
    let count = 0;

    function increment() {
      return ++count;
    }

    function decrement() {
      return --count;
    }

    return {
      increment,
      decrement,
    };
  }
  // const visitCounter = counter();
  // console.log(visitCounter.increment()); // 1
  // 3. IIFE
  var visitCounter = (function () {
    var count = 0;

    return {
      increment: function () {
        return ++count;
      },
      decrement: function () {
        return --count;
      },
    };
  })();

  console.log(visitCounter.increment()); // 1
  console.log(visitCounter.increment());
}
