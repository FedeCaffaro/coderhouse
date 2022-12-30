import { writeFile, readFile } from "fs/promises";
import { existsSync } from "fs";
import ProductManager from "./ProductManager.js";

const productManager = new ProductManager("./src/Database/Products.json");

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async addCart() {
    try {
      const cartsArray = await this.getCarts();
      const newCart = {
        id: cartsArray.length + 1,
        products: [],
      };
      cartsArray.push(newCart);
      const cartsArrayString = JSON.stringify(cartsArray, null, "\t");
      await writeFile(this.path, cartsArrayString);
      console.log(`Cart with ${newCart.id} successfully added`);
      return newCart;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getCarts() {
    try {
      if (existsSync(this.path)) {
        const cartsString = await readFile(this.path, "utf-8");
        const carts = await JSON.parse(cartsString);
        return carts;
      } else {
        console.log(
          "Start adding carts to the database or check if the path to the database is correct."
        );
        return [];
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getCartById(cid) {
    try {
      const cartsArray = await this.getCarts();
      const selectedCart = cartsArray.find((cart) => cart.cid === +cid);
      if (!selectedCart) {
        throw new Error(`There is no cart with id:${cid}`);
      }
      return selectedCart;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const product = await productManager.getProductById(pid);
      if (!product.id) {
        throw new Error(`Product with id: ${id} non existent`);
      }
      const cartsArray = await this.getCarts();
      const selectedCart = await this.getCartById(cid);

      const selectedProduct = await selectedCart.products.find(
        (product) => product.product == pid
      );
      const updatedProduct = selectedProduct
        ? {
            product: selectedProduct.product,
            quantity: selectedProduct.quantity + 1,
          }
        : { product: pid, quantity: 1 };

      const selectedCartFilter = await selectedCart.products.filter(
        (id) => id.product !== pid
      );
      const updatedCart = {
        ...selectedCart,
        products: [...selectedCartFilter, updatedProduct],
      };
      const updatedList = cartsArray.map((cart) => {
        if (cart.id === cid) {
          return updatedCart;
        } else {
          return cart;
        }
      });
      const cartListString = JSON.stringify(updatedList, null, "\t");
      await writeFile(this.path, cartListString);
      console.log(`Product id: ${pid} add to cart id: ${targetCart.id}`);
      return updatedCart;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default CartManager;
