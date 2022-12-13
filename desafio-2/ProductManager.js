import * as fs from "fs/promises";
import * as path from "path";
import { existsSync } from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    try {
      const productsArray = await this.getProducts();
      const productKeys = Object.keys(product);
      if (productKeys.length < 6) {
        console.log("Missing product field");
        process.exit(1);
      }
      if (productsArray.find((prod) => prod.code === product.code)) {
        console.log(
          `Unable to add ${product.title}. Code ${product.code} already exists.`
        );
        process.exit(1);
      }
      const newProduct = {
        id: productsArray.length + 1,
        ...product,
      };
      productsArray.push(newProduct);
      const productsString = JSON.stringify(productsArray, null, "\t");
      await fs.writeFile(this.path, productsString, "utf-8");
      console.log(
        `${product.title} succesfully added to the list of products.`
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      if (existsSync(this.path)) {
        const productsString = await fs.readFile(this.path, "utf-8");
        const products = await JSON.parse(productsString);
        return products;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const productsArray = await this.getProducts();
      const selectedProduct = productsArray.find((prod) => prod.id === id);
      if (selectedProduct) {
        return selectedProduct;
      }
      return `Product with id : ${id} not found`;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, product) {
    try {
      const productArrays = await this.getProducts();
      const selectedProduct = await this.getProductById(id);
      const updatedProduct = { ...selectedProduct, ...product };
      const updatedProducts = productArrays.map((prod) => {
        if (prod.id === id) {
          return updatedProduct;
        } else {
          return prod;
        }
      });
      const stringProducts = JSON.stringify(updatedProducts, null, "\t");
      await fs.writeFile(this.path, stringProducts, "utf-8");
      console.log(`Product with id: ${selectedProduct.id} updated`);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProduct(id) {
    try {
      const productArrays = await this.getProducts();
      const selectedProduct = await this.getProductById(id);
      const filteredProducts = productArrays.filter((e) => e.id !== id);
      const stringProducts = JSON.stringify(filteredProducts, null, "\t");
      await fs.writeFile(this.path, stringProducts, "utf-8");
      console.log(`${selectedProduct.title} eliminado`);
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductManager;
