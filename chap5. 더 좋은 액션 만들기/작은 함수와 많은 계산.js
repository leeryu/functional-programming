'use strict';
const shopping_cart = []; // 전역변수는 액션

function add_item_to_cart(name, price) {
  shopping_cart = add_item(shopping_cart, name, price); // 전역변수 읽기는 액션
  const total = calc_total(shopping_cart);
  set_cart_total_dom(total);
  update_shipping_icons(shopping_cart);
  update_tax_dom(total);
}

function update_shipping_icons(cart) {
  // A
  var buy_buttons = get_buy_buttons_dom(); // 2. 모든 버튼 가져오기
  for (let i = 0; i < buy_buttons.length; i++) {
    const button = buy_buttons[i];
    const item = button.item;
    // 3. item 생성
    // 4. cart에 item 추가 후 복사본 cart 반환
    // 5. 무료배송 여부 확인 후 아이콘 표시
    set_free_shipping_icon(
      button,
      hasFreeDelivery(add_item(cart, make_cart_item(item.name, item.price))),
    );
  }
}

function update_tax_dom(total) {
  set_tex_dom(calc_tax(total));
}

// cart 구조를 알고 잇는 함수
// 유틸리티성 함수
function add_element_last(array, element) {
  const new_array = array.slice();
  new_array.push(element);
  return new_array;
}
// cart 구조를 알고 있는 함수
// C
const add_item = (cart, item) => add_element_last(cart, item);

// item 구조를 알고 있는 함수
// item 생성 함수
// C
const make_cart_item = (name, price) => ({ name, price });

function calc_total(cart) {
  return cart.reduce((total, item) => total + item.price, 0);
}

function get_free_shipping(cart) {
  return calc_total(cart) >= 20;
}

function calc_tax(amount) {
  return amount * 0.1;
}

function set_free_shipping_icon(button, isShown) {
  if (isShown) button.show_free_shipping_icon();
  else button.hide_free_shipping_icon();
}
