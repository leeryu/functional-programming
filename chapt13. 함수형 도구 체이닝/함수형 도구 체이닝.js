'use strict';

{
  // 1. 우수 고객(3개 이상 구매)를 거릅니다.
  // 2. 우수 고객을 가장 비싼 구매로 바꿉니다.(map)
  function biggestPurchasesBestCustomers(customers) {
    const bestCustomers = customers.filter(
      (customer) => customer.purchases.length >= 3,
    );
    const bestCustomersWithBiggestPurchase = bestCustomers.map((customer) => {
      const biggestPurchase = customer.purchases.reduce((acc, cur) =>
        acc.price > cur.price ? acc : cur,
      );
      return { ...customer, biggestPurchase };
    });
    return bestCustomersWithBiggestPurchase;
  }

  var array = [1, 2, 3, 4, 5, 6, 7, 8];
  var answer = [];
  var window = 5;

  var indices = [];
  for (var i = 0; i < array.length; i++) {
    indices.push(i);
  }

  answer = indices.map((index) => {
    return average(array.slice(index, index + window));
  });

  // console.log(answer);

  function average(array) {
    return array.reduce((acc, cur) => acc + cur) / array.length;
  }

  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }
}

{
  function shoesAndSocksInventory(products) {
    var inventory = 0;
    for (let p = 0; p < products.length; p++) {
      const product = products[p];
      if (product.type === 'shoes' || product.type === 'socks') {
        inventory += product.inventory;
      }
    }
    return inventory;
  }

  //refactoring
  function filteredInventory(products, predicate) {
    return products
      .filter(predicate)
      .reduce((acc, cur) => acc + cur.inventory, 0);
  }

  const products = [
    { name: 'Shoes', type: 'shoes', inventory: 10 },
    { name: 'Shirts', type: 'shirts', inventory: 15 },
    { name: 'Socks', type: 'socks', inventory: 5 },
    { name: 'Sweaters', type: 'sweaters', inventory: 0 },
  ];

  console.log('filteredInventory');
  console.log(
    filteredInventory(
      products,
      (product) => product.type === 'shoes' || product.type === 'socks',
    ),
  );

  console.log('shoesAndSocksInventory');
  console.log(shoesAndSocksInventory(products));
}
