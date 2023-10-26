"use strict";

// 배열로 만든 장바구니
{
  function add_item(cart, item) {
    return add_element_last(cart, item);
  }

  function calc_total(cart) {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price;
    }
    return total;
  }

  function setPriceByName(cart, name, price) {
    const cartCopy = cart.slice();
    for (let i = 0; i < cartCopy.length; i++) {
      if (cartCopy[i].name === name) {
        cartCopy[i].price = price;
        return;
      }
    }
    return cartCopy;
  }

  function remove_item_by_name(cart, name) {
    const idx = indexOfItem(cart, name);
    if (idx !== null) {
      return splice(cart, idx, 1);
    }
    return cart;
  }

  function indexOfItem(cart, name) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === name) {
        return i;
      }
    }
    return null;
  }

  function splice(arr, start, deleteCount, ...items) {
    const newArr = arr.slice();
    newArr.splice(start, deleteCount, ...items);
    return newArr;
  }
}
/**
 * 객체로 만든 장바구니
 * 자바스크립트 객체로 만들면 더 효율적이고 첫번째 패턴인
 * 직접 구현 패턴에 더 가깝다. 배열보다 어떤 위치에 추가하거나 삭제하기 좋다.
 */
{
  function add_item(cart, item) {
    return objectSet(cart, item.name, item);
  }

  function objectSet(obj, key, value) {
    const newObj = Object.assign({}, obj);
    // const newObj = { ...obj};
    newObj[key] = value;
    return newObj;
  }

  function calc_total(cart) {
    let total = 0;
    const keys = Object.keys(cart);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      total += cart[key].price;
    }
    return total;
  }
  // 항목이 있는지 확인하는 자바스크립트 객체 메서드
  function isInCart(cart, name) {
    return cart.hasOwnProperty(name);
  }

  function setPriceByName(cart, name, price) {
    const cartCopy = Object.assign({}, cart);
    cartCopy[name].price = price;
    return cartCopy;
  }

  let cart = {};

  cart = add_item(cart, { name: "apple", price: 1000 });
  cart = add_item(cart, { name: "orange", price: 2000 });

  console.log(isInCart(cart, "watch"));
}
