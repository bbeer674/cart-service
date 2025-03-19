const Cart = require("./Cart");

const cart = new Cart();

cart.addProduct("p1", 2);
cart.addProduct("p2", 3);
cart.updateProduct("p1", 5);
cart.removeProduct("p2");

console.log("Items:", cart.listItems());
console.log("Total unique items:", cart.countUniqueItems());
console.log("Total items quantity:", cart.totalItems());

cart.applyDiscount("fixed_discount", "fixed", 150);
cart.applyDiscount("percent_discount", "percentage", 10, 100);

console.log("Cart total after discount:", cart.calculateTotal());

cart.applyFreebieCondition("p1", "freebie1", 1);

console.log("Cart with freebies:", cart.getCartWithFreebies());
