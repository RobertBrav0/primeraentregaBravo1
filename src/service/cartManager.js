import fs from 'fs/promises';
import path from 'path';

const cartsFilePath = path.resolve('data', 'carts.json');

export default class CartManager {
  constructor() {
    this.carts = [];
    this.init();
  }

  async init() {
    try {
      const data = await fs.readFile(cartsFilePath, 'utf-8');
      this.carts = JSON.parse(data);
    } catch (error) {
      console.error('Error al leer el archivo de carritos:', error);
    }
  }

  async saveToFile() {
    try {
      await fs.writeFile(cartsFilePath, JSON.stringify(this.carts, null, 2));
    } catch (error) {
      console.error('Error al guardar en el archivo de carritos:', error);
    }
  }

  getAllCarts() {
    return this.carts;
  }

  getCartById(id) {
    return this.carts.find((cart) => cart.id === id);
  }

  addCart() {
    const newCart = {
      id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
      products: [],
    };

    this.carts.push(newCart);
    this.saveToFile();
    return newCart;
  }

  addProductToCart(cartId, productId) {
    const cart = this.getCartById(cartId);
    if (!cart) return { error: 'Carrito no encontrado' };

    const productIndex = cart.products.findIndex((p) => p.product === productId);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
     
      cart.products.push({ product: productId, quantity: 1 });
    }

    this.saveToFile();
    return cart;
  }
}