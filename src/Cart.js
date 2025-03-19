class Cart {
  constructor() {
    this.items = {};
    this.discounts = {};
    this.freebies = {};
  }

  addProduct(productId, quantity = 1) {
    this.items[productId] = (this.items[productId] || 0) + quantity;
  }

  updateProduct(productId, quantity) {
    if (quantity <= 0) delete this.items[productId];
    else this.items[productId] = quantity;
  }

  removeProduct(productId) {
    delete this.items[productId];
  }

  isProductExist(productId) {
    return !!this.items[productId];
  }

  isCartEmpty() {
    return Object.keys(this.items).length === 0;
  }

  listItems() {
    return this.items;
  }

  countUniqueItems() {
    return Object.keys(this.items).length;
  }

  totalItems() {
    return Object.values(this.items).reduce((a, b) => a + b, 0);
  }

  applyDiscount(name, type, amount, maxDiscount = null) {
    this.discounts[name] = { type, amount, maxDiscount };
  }

  removeDiscount(name) {
    delete this.discounts[name];
  }

  calculateTotal() {
    let total = this.totalItems() * 100;

    Object.values(this.discounts).forEach((discount) => {
      if (discount.type === "fixed") {
        total -= discount.amount;
      } else if (discount.type === "percentage") {
        let discountValue = (total * discount.amount) / 100;
        if (discount.maxDiscount !== null) {
          discountValue = Math.min(discountValue, discount.maxDiscount);
        }
        total -= discountValue;
      }
    });

    return total > 0 ? total : 0;
  }

  destroyCart() {
    this.items = {};
    this.discounts = {};
    this.freebies = {};
  }

  applyFreebieCondition(productId, freebieProductId, freebieQuantity = 1) {
    if (this.isProductExist(productId)) {
      this.freebies[freebieProductId] = freebieQuantity;
    }
  }

  getCartWithFreebies() {
    return {
      items: this.items,
      freebies: this.freebies,
    };
  }
}

module.exports = Cart;
