"use strict";

{
  function objectSet(object, key, value) {
    const objectCopy = Object.assign({}, object);
    objectCopy[key] = value;
    return objectCopy;
  }

  function setPriceByName(cart, name, price) {
    const item = cart[name];
    const newItem = objectSet(item, "price", price);
    return objectSet(cart, name, newItem);
  }

  var validItemFields = ["name", "price", "quantity"];

  function setFieldByName(cart, name, field, value) {
    if (!validItemFields.includes(field))
      throw "Not a valid field: " + field + "";

    const item = cart[name];
    const newItem = objectSet(item, field, value);
    return objectSet(cart, name, newItem);
  }

  let cart = {};

  cart = setFieldByName(cart, "apple", "price", 1000);

  // 연습문제
  // 암묵적 인자 Four
  function multiplyByFour(x) {
    return x * 4;
  }
  // 암묵적 인자 12
  function multiplyBy12(x) {
    return x * 12;
  }

  function multiplyByN(x, n) {
    return x * n;
  }

  console.log(multiplyByN(3, 4));
}
