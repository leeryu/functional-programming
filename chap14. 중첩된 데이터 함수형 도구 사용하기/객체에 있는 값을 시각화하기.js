'use strict';
import { functional } from '../functional.js';

{
  var shoes = {
    name: 'shoes',
    quantity: 3,
    price: 7,
  };

  // console.log(functional.update(shoes, 'quantity', (q) => q + 1));

  var user = {
    firstName: 'Joe',
    lastName: 'Smith',
    email: 'JOE@EXAMPLE.COM',
  };

  // console.log(functional.update(user, 'email', (email) => email.toLowerCase()));

  var item = {
    name: 'shoes',
    price: 7,
    quantity: 2,
  };

  console.log(functional.update(item, 'quantity', (q) => q * 10));
}
