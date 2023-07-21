'use strict';
// 의미 있는 계층을 만들어서 코드를 분류
{
  // C, I
  // add_item() 함수는 cart와 item구조를 모두 알고 있다.
  function add_item(cart, name, price) {
    const new_cart = cart.slice();
    new_cart.push({ name, price });
    return new_cart;
  }
  // C, I, B
  function calc_total(cart) {
    return cart.reduce((total, item) => total + item.price, 0);
  }
  // B
  function is_free_delivery(cart) {
    return calc_total(cart) >= 20;
  }
  // B
  function calc_tax(amount) {
    return amount * 0.1;
  }
}
// refactoring code
{
  // item 구조를 알고 있는 함수
  const make_cart_item = (name, price) => ({ name, price });
  // cart 구조를 알고 잇는 함수
  function add_element_last(array, element) {
    const new_array = array.slice();
    new_array.push(element);
    return new_array;
  }

  function add_item(cart, item) {
    return add_element_last(cart, item);
  }

  function hasFreeDelivery(cart) {
    return calc_total(cart) >= 20;
  }

  function set_free_shipping_icon(button, isShown) {
    if (isShown) button.show_free_shipping_icon();
    else button.hide_free_shipping_icon();
  }
  // 1. 구매하기버튼 동작
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
}
