'use strict';
// legacy code
{
  const shopping_cart = []; // A
  let shopping_cart_total = 0; // A

  // A
  function add_item_to_cart(name, price) {
    // 함수 추출
    shopping_cart.push({ name, price });
    calc_cart_total();
  }

  // A
  function calc_cart_total() {
    // 서브루틴 추출하기
    shopping_cart_total = shopping_cart.reduce(
      (total, item) => total + item.price,
      0,
    );

    set_cart_total_dom();
    update_shipping_icons();
    update_tax_dom();
  }
  // A
  function set_cart_total_dom() {
    document.querySelector('#cart-total').innerText = `${shopping_cart_total}`;
  }
  // 요구사항1. 무료 배송비 계산하기
  function update_shipping_icons() {
    // A
    var buy_buttons = get_buy_buttons_dom();
    for (let i = 0; i < buy_buttons.length; i++) {
      const button = buy_buttons[i];
      const item = button.item;
      if (item.price + shopping_cart_total >= 20)
        button.show_free_shipping_icon();
      else button.hide_free_shipping_icon();
    }
  }
  // 요구사항2. 세금 계산하기
  function update_tax_dom() {
    set_tex_dom(shopping_cart_total * 0.1);
  }

  var total = 0;
  // 함수에 암묵적 입력과 출력이 있으면 액션이 된다.
  function add_to_total(amount) {
    // 인자는 명식적 입력이다.
    console.log('add_to_total', amount + total); // 전역변수를 읽는 것은 암묵적 입력이다.
    total += amount; // 전역변수를 바꾸는 것도 암묵적 출력이다.
    return total; // 리턴값은 명시적 출력이다.
  }
}

// refactoring code
// 1.DOM 업데이트와 비즈니스 규칙 분리
// 2.전역변수 제거
// 3.순수 함수로 변환
{
  const shopping_cart = []; // A
  let shopping_cart_total = 0; // A
  // A
  function add_item_to_cart(name, price) {
    shopping_cart = add_item(shopping_cart, name, price);
    calc_cart_total();
  }
  // A
  function calc_cart_total() {
    // 1.서브루틴 추출
    shopping_cart_total = calc_total(shopping_cart);

    set_cart_total_dom();
    update_shipping_icons();
    update_tax_dom();
  }

  // C
  function add_item(cart, name, price) {
    const new_cart = cart.slice(); // 복사본을 만들어 지역변수에 할당
    new_cart.push({ name, price });
    return new_cart;
  }

  function update_shipping_icons() {
    // A
    var buy_buttons = get_buy_buttons_dom();
    for (let i = 0; i < buy_buttons.length; i++) {
      const button = buy_buttons[i];
      const item = button.item;
      if (is_free_delivery(shopping_cart_total, item.price))
        button.show_free_shipping_icon();
      else button.hide_free_shipping_icon();
    }
  }
  // 무료 배송 여부
  function is_free_delivery(total, price) {
    return price + amount >= 20;
  }
  // 계산 함수
  function calc_total(carts) {
    // 암묵적 입력 -> 명시적 입력으로 바꾸기
    // 암묵적 출력 -> 출력으로 바꾸기
    return carts.reduce((total, item) => total + item.price, 0);
  }
  // 연습 문제
  // 결제 부서에서 우리가 만든 세금 게산 코드를 쓰려고 한다. 하지만, DOM과 묶여있어
  // 바로 사용하기 어렵다. update_tax_dom() 함수에서 세금을 계산하는 부분을 추출하라.
  // 계산 추출하기
  // 1. 코드를 선택하고 빼낸다
  // 2. 암묵적 입력과 출력을 찾는다.
  // 3. 암묵적 입력은 인자로 암묵적 출력은 리턴값으로 바꾼다.
  function calc_tax(amount) {
    return amount * 0.1;
  }

  function update_tax_dom() {
    set_tax_dom(calc_tax(shopping_cart_total));
  }
}
