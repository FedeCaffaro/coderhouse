function isRequired() {
  console.error(`Missing a required argument.`);
}

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
      console.error(`Code ${code} already exists`);
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
    this.idCounter++;
  }
  getProducts() {
    return this.products;
  }
  getProductById(id = isRequired("id")) {
    if (this.products[id]) {
      return this.products[id];
    }
    return "Not found";
  }
}

const productManager = new ProductManager();

const addProduct = (title, description, price, thumbnail, code, stock) => {
  productManager.addProduct(title, description, price, thumbnail, code, stock);
};

const getProducts = productManager.getProducts();

const getProductById = (id) => productManager.getProductById(id);

addProduct(
  "Silla",
  "Silla para exteriores",
  "$100",
  "Thumbnail",
  "SKU1",
  "100"
);
addProduct(
  "Mueble",
  "Mueble para exteriores",
  "$100",
  "Thumbnail",
  "SKU2",
  "100"
);
addProduct(
  "Mueble",
  "Mueble para exteriores",
  "$100",
  "Thumbnail",
  "SKU2",
  "100"
);
addProduct("Mueble", "Mueble para exteriores", "Thumbnail", "SKU3", "100");
console.log(getProducts);
console.log(getProductById(0));
console.log(getProductById(2));
