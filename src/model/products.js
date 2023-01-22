const db = require("../database/db.js");

module.exports = { listProducts, searchProducts, getProduct};

//CHALLENGE 1, 5 and 6
const select_products = db.prepare(/*sql*/ `
  SELECT
    id,
    name,
    quantity_per_unit,
    unit_price,
    FORMAT('£%.2f', unit_price) AS unit_price,
    units_in_stock,
    units_on_order,
    FORMAT('£%.2f', unit_price * units_in_stock) AS stock_value
  FROM products
`);

function listProducts() {
  return select_products.all();
}

//CHALLENGE 2
const search_products = db.prepare(/*sql*/ `
  SELECT
    id,
    name
  FROM products
  WHERE name LIKE ?
`);

function searchProducts(search_term) {
  return search_products.all("%" + search_term + "%");
}

//CHALLENGE 3 and 4
const select_product = db.prepare(/*sql*/ `
  SELECT
    products.id,
    products.name,
    categories.name AS category_name,
    categories.description AS category_description
  FROM products
  JOIN categories ON products.category_id = categories.id
  WHERE products.id = ?
`);

function getProduct(id) {
  return select_product.get(id);
}

