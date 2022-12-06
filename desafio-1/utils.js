export function isRequired() {
  console.error(
    `Missing a required argument. Please make sure to enter title, description, price, thumbnail, code and stock.`
  );
  process.exit(1);
}
