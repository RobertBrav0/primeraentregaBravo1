import fs from 'fs/promises'; // Módulo de promesas de 'fs' para trabajar de forma asíncrona
import path from 'path';

const productosFilePath = path.resolve('data', 'productos.json');

export default class ProductManager {
  constructor() {
    this.products = [];
    this.init();
  }

  async init() {
    try {
      const data = await fs.readFile(productosFilePath, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.error('Error al leer el archivo:', error);
      this.products = []; // Inicializa como un array vacío si hay error
    }
  }

  async saveToFile() {
    try {
      await fs.writeFile(productosFilePath, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.error('Error al guardar en el archivo:', error);
    }
  }

  getAllProducts(limit) {
    if (limit) {
      return this.products.slice(0, limit);
    }
    return this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  async addProduct(product) {
    // Validaciones básicas
    if (!product.title || !product.description || !product.code || typeof product.price !== 'number' ||
        typeof product.stock !== 'number' || !product.category) {
      return { error: 'Faltan campos requeridos o tienen tipos incorrectos' };
    }

    const newProduct = {
      id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
      ...product,
      status: true,
    };

    this.products.push(newProduct);
    await this.saveToFile(); // Guardar cambios de manera asíncrona
    return newProduct;
  }

  async updateProduct(id, updateFields) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) return null;

    const updatedProduct = {
      ...this.products[productIndex],
      ...updateFields,
      id: this.products[productIndex].id, // No permitir la actualización del ID
    };

    this.products[productIndex] = updatedProduct;
    await this.saveToFile(); // Guardar cambios de manera asíncrona
    return updatedProduct;
  }

  async deleteProduct(id) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) return null;

    const deletedProduct = this.products.splice(productIndex, 1)[0];
    await this.saveToFile(); // Guardar cambios de manera asíncrona
    return deletedProduct;
  }
}