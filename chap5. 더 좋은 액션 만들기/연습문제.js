'use strict';

{
  const shopping_cart = []; // A
  // A
  function add_item_to_cart(name, price) {
    shopping_cart = add_item(shopping_cart, name, price);

    // 1.서브루틴 추출
    const total = calc_total(shopping_cart);

    // set_cart_total_dom(total);
    update_shipping_icons(shopping_cart);
    // update_tax_dom(total);
  }

  const calc_total = (cart) => {
    return cart.reduce((total, item) => item.price + total, 0);
  };

  function update_shipping_icons(cart) {
    // A
    let buy_buttons = get_buy_buttons_dom();
    for (let i = 0; i < buy_buttons.length; i++) {
      const button = buy_buttons[i];
      const item = button.item;
      const new_cart = add_item(cart, item.name, item.price);

      if (is_free_delivery(new_cart)) button.show_free_shipping_icon();
      else button.hide_free_shipping_icon();
    }
  }

  function add_item(cart, name, price) {
    const new_cart = cart.slice();
    new_cart.push({ name, price });
    return new_cart;
  }
}
