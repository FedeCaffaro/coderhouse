import { writeFile, readFile } from "fs/promises";
import { existsSync } from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    try {
      const productsArray = await this.getProducts();
      for (const key in product) {
        if (
          key !== "id" &&
          key !== "title" &&
          key !== "description" &&
          key !== "price" &&
          key !== "code" &&
          key !== "thumbnail" &&
          key !== "status" &&
          key !== "stock" &&
          key !== "category"
        ) {
          throw new Error(`${key} is not an allowed field`);
        }
      }
      if (product.id) {
        throw new Error("Id is autocompleted");
      }
      if (!product.title) {
        throw new Error("Title is required");
      }
      if (!product.description) {
        throw new Error("Description is required");
      }
      if (!product.price || typeof product.price !== "number") {
        throw new Error("Price is required and must be a number");
      }
      if (!product.stock || typeof product.stock !== "number") {
        throw new Error("Stock is required and must be a number");
      }
      if (!product.category) {
        throw new Error("Category is required");
      }
      if (!product.code) {
        throw new Error("Code is required");
      }

      if (productsArray.find((prod) => prod.code === product.code)) {
        throw new Error(
          `Unable to add ${product.title}. Code ${product.code} already exists.`
        );
      }
      const newProduct = {
        id: productsArray.length + 1,
        ...product,
      };
      productsArray.push(newProduct);
      const productsString = JSON.stringify(productsArray, null, "\t");
      await writeFile(this.path, productsString, "utf-8");
      console.log(
        `${newProduct.title} succesfully added to the list of products.`
      );
      return newProduct;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getProducts() {
    try {
      if (existsSync(this.path)) {
        const productsString = await readFile(this.path, "utf-8");
        const products = await JSON.parse(productsString);
        return products;
      } else {
        console.log(
          "Start adding products to the database or check if the path to the database is correct."
        );
        return [];
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getProductById(id) {
    try {
      const productsArray = await this.getProducts();
      const selectedProduct = productsArray.find((prod) => prod.id === id);
      if (selectedProduct) {
        return selectedProduct;
      }
      console.log(`Product with id : ${id} not found`);
      return `Product with id : ${id} not found`;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateProduct(id, product) {
    try {
      if (product.id) {
        throw new Error("ID must not be modified");
      }
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
      await writeFile(this.path, stringProducts, "utf-8");
      console.log(`Product with id: ${selectedProduct.id} updated`);
      return selectedProduct;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async deleteProduct(id) {
    try {
      const productArrays = await this.getProducts();
      const selectedProduct = await this.getProductById(id);
      const filteredProducts = productArrays.filter((e) => e.id !== id);
      const stringProducts = JSON.stringify(filteredProducts, null, "\t");
      await writeFile(this.path, stringProducts, "utf-8");
      console.log(`${selectedProduct.title} eliminado`);
      return selectedProduct;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default ProductManager;
