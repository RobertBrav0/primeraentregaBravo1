import fs from 'fs'
import path from 'path'

const productosFilePath = path.resolve('data', 'productos.json')

export default class ProductManager {
    constructor() {
        this.products = []
        this.init()
    }
    async init() {
        try{
            const data = await fs.readFile(productosFilePath, 'utf-8')
            this.products = JSON.parse(data)
        } catch (error) {

        }
    }

saveTofile(){
    fs.writeFile(productosFilePath, JSON.stringify(this.products, null,2));
 }    

getAllProducts(limit){
    if (limit) {
        return this.products.slice(0, limit)
    }
    return this.products
}

getProductById(id){
    return this.products.find(product => product.id === id )
}
addProduct(product) {
    const newProduct = {
        id: this.products.length ? this.products(this.products.length -1).id + 1 : 1,
        ...product,
        status: true
    };
    this.products.push()
    this.saveTofile()
    return newProduct;

    //faltaria validaciones
}

updateProduct(id, updateFields) {
    const productIndex = this.products.findIndex(product => product.id === id)
    if (productIndex === -1) return null;

    const updateProduct = {
        ...this.products[productIndex],
        ...updateFields,
        id: this.products[productIndex].id
    }
    this.products[productIndex] = updateProduct;
    this.saveTofile()
    return updateProduct;
}

deleteProduc(id) {
    const productIndex = this.products.findIndex(product => product.id === id)
    if (productIndex === -1) return null;

    const deleteProduct = this.products.slice(productIndex, 1);
    this.saveTofile()
    return deleteProduct(0);
}

}
