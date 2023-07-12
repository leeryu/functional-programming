'use strict';
const goods = [
  { name: '함수형 코딩', price: 21000 },
  { name: 'java 디자인 패턴', price: 30000 },
  { name: '리팩토링', price: 25000 },
  { name: '심리학에게 묻다', price: 15000 },
  { name: '도메인 주도 설계 철저 입문', price: 23000 },
];
// legacy code
{
  const shopping_cart = []; // A
  // C
  function add_item(cart, name, price) {
    const new_cart = cart.slice(); // 복사본을 만들어 지역변수에 할당
    new_cart.push({ name, price });
    return new_cart;
  }

  function calc_total(cart) {
    return cart.reduce((total, item) => total + item.price, 0);
  }
  function is_free_delivery(total, price) {
    return total + price >= 40_000;
  }
}

// refactoring code
{
  const shopping_cart = []; // A
  // C
  function add_item(cart, name, price) {
    const new_cart = cart.slice(); // 복사본을 만들어 지역변수에 할당
    new_cart.push({ name, price });
    return new_cart;
  }

  function calc_total(cart) {
    return cart.reduce((total, item) => total + item.price, 0);
  }
  // 무료 배송 여부
  function is_free_delivery(cart) {
    return calc_total(cart) >= 20;
  }

  function update_shipping_icons() {
    // A
    var buy_buttons = get_buy_buttons_dom();
    for (let i = 0; i < buy_buttons.length; i++) {
      const button = buy_buttons[i];
      const item = button.item;
      const new_cart = add_item(shopping_cart, item.name, item.price);

      if (is_free_delivery(new_cart)) button.show_free_shipping_icon();
      else button.hide_free_shipping_icon();
    }
  }
}
