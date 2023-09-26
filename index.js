import fs from 'fs/promises';

class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
        this.path = 'productos.json';
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data) || [];
            console.log(`Productos cargados desde ${this.path}`);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    }

    async saveProducts() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            await fs.writeFile(this.path, data);
            console.log(`Productos guardados en ${this.path}`);
        } catch (error) {
            console.error('Error al guardar los productos:', error);
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const isCodeUnique = !this.products.some(product => product.code === code);

        if (!isCodeUnique) {
            console.error(`El código '${code}' ya existe en otro producto. No se puede agregar.`);
        }

        const product = {
            id: this.productIdCounter++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.products.push(product);
        return product;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);

        if (!product) {
            console.error(`No se encontró ningún producto con el ID '${id}'.`);
        }
        return product;
    }

    updateProduct(id, updatedProductInfo) {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            console.error(`No se encontró ningún producto con el ID '${id}'. No se puede actualizar.`);
        }

        const existingProduct = this.products[productIndex];

        this.products[productIndex] = {
            ...existingProduct,
            ...updatedProductInfo
        };

        return existingProduct;
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            console.error(`No se encontró ningún producto con el ID '${id}'. No se puede eliminar.`);
            return null;
        }

        const deletedProduct = this.products.splice(productIndex, 1)[0];
        return deletedProduct;
    }
}

const productManager = new ProductManager();


