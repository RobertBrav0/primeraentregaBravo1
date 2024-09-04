const express = require('express');
const router = express.Router();
const CartManager = require('../cartManager');

const cartManager = new CartManager('./data/carts.json');

// Crear un nuevo carrito
router.post('/', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.json(newCart);
});

// Obtener productos de un carrito por ID
router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  res.json(cart || { error: 'Carrito no encontrado' });
});

// Agregar producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartManager.addProductToCart(cid, pid);
  res.json(cart);
});

module.exports = router;