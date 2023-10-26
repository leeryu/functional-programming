"use strict";

{
  function arraySet(array, index, item) {
    const newArray = array.slice();
    newArray[index] = item;
    return newArray;
  }
}
// refactoring
{
  function arraySet(array, index, item) {
    return withArrayCopy(
      array,
      function (copy) {
        copy[index] = item;
      },
      item
    );
  }

  function withArrayCopy(array, modify) {
    const newArray = array.slice();
    modify(newArray);
    return newArray;
  }

  // 연습문제
  function drop_last(array) {
    return withArrayCopy(array, function (copy) {
      copy.pop();
    });
  }

  function drop_first(array) {
    return withArrayCopy(array, function (copy) {
      copy.shift();
    });
  }
}

{
  function objectSet(obj, item, value) {
    return withObjectCopy(obj, function (copy) {
      copy[item] = value;
    });
  }

  function withObjectCopy(obj, modify) {
    const newObj = Object.assign({}, obj);
    modify(newObj);
    return newObj;
  }

  /**
   *  함수를 인자로 받아서 함수를 리턴하는 함수
   * @returns {number}
   */
  function when() {
    const funcs = Array.from(arguments);
    return function (arg) {
      return funcs.reduce(function (prev, func) {
        return func(prev);
      }, arg);
    };
  }
  // console.log(
  //   when(objectSet)(function (v) {
  //     return v + 1;
  //   })(0)
  // );
}

// 함수를 리턴하는 함수
// {
//   var f = function (arg) {
//     try {
//       saveUserDateNoLogging(arg);
//     } catch (e) {
//       logToSnapErrors(e);
//     }
//   };

//   function wrapLogging(f) {
//     return function (arg) {
//       try {
//         f(arg);
//       } catch (e) {
//         logToSnapErrors(e);
//       }
//     };
//   }
// }

{
  function makeAdder(n) {
    return function (x) {
      console.log(Object.prototype.toString(n));
      return x + n;
    };
  }

  var increment = makeAdder(1);
  console.log(increment(10));
}
