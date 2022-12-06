import { isRequired } from "./utils.js";

class ProductManager {
  constructor() {
    this.products = [];
    this.idCounter = 0;
  }

  addProduct(
    title = isRequired(),
    description = isRequired(),
    price = isRequired(),
    thumbnail = isRequired(),
    code = isRequired(),
    stock = isRequired()
  ) {
    if (this.products.find((e) => e.code === code)) {
      console.error(`Unable to add ${title}. Code ${code} already exists.`);
      process.exit(1);
    }

    const productObject = {
      title: title,
      id: this.idCounter,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };

    this.products.push(productObject);
    console.log(`${title} succesfully added to the list of products.`);
    this.idCounter++;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id = isRequired()) {
    if (this.products[id]) {
      return this.products[id];
    }
    return "Not found";
  }
}

// Instantiating class
const productManager = new ProductManager();

const addProduct = (title, description, price, thumbnail, code, stock) => {
  productManager.addProduct(title, description, price, thumbnail, code, stock);
};

const getProducts = productManager.getProducts();

const getProductById = (id) => productManager.getProductById(id);

// Adds product succesfully using terminal arguments. Example : node .\ProductManager.js "Silla" "Silla para exteriores" "100" "Thumbnail" "SKU1" "100"
addProduct(
  process.argv[2],
  process.argv[3],
  process.argv[4],
  process.argv[5],
  process.argv[6],
  process.argv[7]
);

// Adds product succesfully
addProduct(
  "Mueble",
  "Mueble para exteriores",
  "$100",
  "Thumbnail",
  "SKU2",
  "100"
);

// Throws error on same product code. Uncomment to run.
// addProduct("Mesa", "Mesa para exteriores", "$100", "Thumbnail", "SKU2", "100");

// Throws error on missing argument (Price). Uncomment to run.
// addProduct("Lavarropas", "Lavarropas 25L", "Thumbnail", "SKU3", "100");

console.log(getProducts);
console.log(getProductById(0));
console.log(getProductById(2));
