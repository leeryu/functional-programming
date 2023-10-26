"use strict";
{
  var object = { a: 1, b: 2 };
  var object_copy = Object.assign({}, object);
  var array = [1, 2, 3];

  // function objectSet(object, key, value) {
  //   return Object.assign({}, object, { [key]: value });
  // }

  // function objectSet(object, key, value) {
  //   return { ...object, [key]: value };
  // }

  function objectSet(object, key, value) {
    const object_copy = Object.assign({}, object);
    object_copy[key] = value;

    return object_copy;
  }

  // function objectDelete(object, key) {
  //   const object_copy = Object.assign({}, object);
  //   delete object_copy[key];
  //   return object_copy;
  // }

  // function objectDelete(object, key) {
  //   return (() => {
  //     const object_copy = Object.assign({}, object);
  //     delete object_copy[key];
  //     return object_copy;
  //   })();
  // }
}

{
  // function setPriceByName(cart, name, price) {
  //   for (const c of cart) {
  //     if (c.name === name) {
  //       c.price = price;
  //     }
  //   }
  // }
  // copy-on-write
  function setPriceByName(cart, name, price) {
    const copy = cart.slice();
    // const copy = [...cart];
    for (let i = 0; i < copy.length; i++) {
      const c = copy[i];
      if (c.name === name) {
        copy[i] = setPrice(c, price);
      }
    }

    return copy;
  }

  function setPrice(item, price) {
    return Object.assign({}, item, { price });
  }

  const carts = [
    { name: "t-shirt", price: 9.95 },
    { name: "socks", price: 22.95 },
    { name: "computer", price: 200.95 },
  ];

  const updatedCarts = setPriceByName(carts, "socks", 100);

  carts[1].price = 40;

  // console.log(carts);
  // console.log(updatedCarts);

  let originalObject = {
    prop1: "value1",
    prop2: {
      nestedProp: "nestedValue",
    },
  };

  let shallowCopy = Object.assign({}, originalObject);

  originalObject.prop1 = "modifiedValue";
  originalObject.prop2.nestedProp = "modifiedNestedValue";

  console.log(shallowCopy.prop1); // Output: 'modifiedValue'
  console.log(shallowCopy.prop2.nestedProp); // Output: 'modifiedNestedValue'
  // exercise

  function setQuantityByName(cart, name, quantity) {
    const copy = cart.slice();
    for (let i = 0; i < copy.length; i++) {
      const c = copy[i];
      if (c.name === name) {
        copy[i] = objectSet(c, "quantity", quantity);
      }
    }

    return copy;
  }

  function objectSet(object, key, value) {
    return Object.assign({}, object, { [key]: value });
  }
}
