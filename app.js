import express from 'express';
import ProductManager from './src/service/ProductManager.js';
import CartManager from './src/service/cartManager.js';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/cartRoustes.js';

const app = express();
const PORT = 8080;

app.use(express.json());

// Usamos los routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});