import { functional } from '../functional.js';

const object = {
  a: 1,
  b: 2,
  c: 3,
};
const newObject = functional.update(object, 'b', function (value) {
  return value + 1;
});

// 직원 데이터가 있고 직원의 월급을 10% 올려주려고 한다. 직원 데이터는 다음과 같다.
var employees = {
  name: 'Kim',
  salary: 120000,
};

var kim = functional.update(employees, 'salary', function (salary) {
  return salary * 1.1;
});

function ajax(options) {
  return function () {
    setTimeout(function () {
      console.log(options.name);
    }, options.delay || 1000);
  };
}

var queues = [];

queues.push(ajax({ name: 'foo', delay: 3000 }));
queues.push(ajax({ name: 'bar', delay: 500 }));
queues.push(ajax({ name: 'charry', delay: 1500 }));
queues.push(ajax({ name: 'david', delay: 2000 }));
queues.push(ajax({ name: 'e' }));

while (queues.length) {
  var f = queues.shift();
  (function (f) {
    setTimeout(function () {
      f();
    }, 1000);
  })(f);
}
