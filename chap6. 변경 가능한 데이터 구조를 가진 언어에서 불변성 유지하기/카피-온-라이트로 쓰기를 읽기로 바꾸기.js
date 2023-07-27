'use strict';

var shopping_cart = [
  { name: 'barrel수영모자' },
  { name: 'barrel수영바지' },
  { name: 'nike swim 고글' },
]; // 전역변수는 액션
// copy-on-write 적용 전
{
  function remove_item_by_name(cart, name) {
    let idx = null;
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      if (item.name === name) {
        idx = i;
        break;
      }
    }

    if (idx !== null) {
      cart.splice(idx, 1);
    }
  }
}
// copy-on-write 적용 후
function remove_item_by_name(cart, name) {
  return cart.filter((item) => item.name !== name);
}

function remove_item_by_predicate(cart, predicate) {
  return cart.filter((item) => !predicate(item));
}

const new_cart = remove_item_by_predicate(
  shopping_cart,
  (item) => item.name === 'barrel수영바지',
);

Array.prototype.empty = function () {
  console.log(`this.length: ${this.length}`);
  this.splice(0, this.length);

  return this;
};

function removeItems(array, idx, count) {
  return array.slice(idx, count);
}
