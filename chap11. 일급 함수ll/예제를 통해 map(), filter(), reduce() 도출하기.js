"use strict";

/**
 * 함수 본문을 콜백으로 바꾸기 리펙터링 단계
 * 1. 본문과 앞부분, 뒷부분을 확인하기
 * 2. 함수 빼내기
 * 3. 콜백 빼내기
 */
{
  function forEach(array, action) {
    for (let i of array) {
      action(i);
    }
  }

  var emails = ["sexyuck@gmail.com", "leeeryu@gmail.com"];

  function emailForCustomer(customer, goods, bests) {
    // 2. 함수 빼내기
  }

  // function emailsForCustomers(customers, goods, bests) {
  //   var emails = [];
  //   forEach(customers, function (customer) {
  //     var email = emailForCustomer(customer, goods, bests);
  //     emails.push(email);
  //   });

  //   return emails;
  // }

  function emailsForCustomers(customers, goods, bests) {
    return map(customers, function (customer) {
      return emailForCustomer(customer, goods, bests);
    });
  }
  // 함수형 도구: map()
  function map(array, f) {
    var newArray = [];
    forEach(array, function (element) {
      newArray.push(f(element));
    });

    return newArray;
  }

  // 연습 문제
  // 엽서를 보내기 위해 만들어야 하는 객체에는 각 곡객의 성, 이름, 주소가 이썽야 한다.map()을 사용해
  // 필요한 객체가 들어 있는 배열을 만들어 보세요.

  // 주어진 것
  // 모든 고객 배열인 customers
  // 필요한 데이터는 customers의 각 고객의 성, 이름, 주소

  const customers = [
    { firstName: "lee", lastName: "sanguck", address: "korea" },
    { firstName: "son", lastName: "heungmin", address: "england" },
  ];

  const postForCustomers = map(customers, function (customer) {
    return {
      to:
        customer.firstName +
        " " +
        customer.lastName +
        "<" +
        customer.email +
        ">",
      subject:
        "안녕하세요, " +
        customer.firstName +
        " " +
        customer.lastName +
        "님. 가장 좋아하는 고객님",
      body:
        "안녕하세요, " +
        customer.firstName +
        " " +
        customer.lastName +
        "님. 가장 좋아하는 고객님",
    };
  });

  function filter(array, action) {
    var newArray = [];
    forEach(array, function (element) {
      if (action(element)) {
        newArray.push(element);
      }
    });

    return newArray;
  }

  function reduce(array, action, start) {
    let result = start;
    forEach(array, function (element) {
      result = action(result, element);
    });

    return result;
  }

  const nubmers = [1, 3, 5, 7, 9];

  const sum = reduce(
    nubmers,
    function (start, element) {
      return start + element;
    },
    0
  );

  const product = reduce(
    nubmers,
    function (accm, element) {
      return accm * element;
    },
    1
  );

  const max = reduce(
    nubmers,
    function (accm, element) {
      return accm > element ? accm : element;
    },
    Number.MIN_VALUE
  );
}
