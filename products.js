
/* =========================================
   FRIENDLY SURFACES
   Product Catalogue Data
========================================= */

// Add verified products from your actual catalogues here.
// Do not invent product names, codes or specifications.

const products = [];


// Category names used by the website
const productCategories = [
  {
    id: "all",
    name: "All Products"
  },
  {
    id: "laminates",
    name: "Laminates & Mica"
  },
  {
    id: "plywood",
    name: "Plywood"
  },
  {
    id: "decorative",
    name: "Decorative Surfaces"
  }
];


// Find a product using its unique ID
function getProductById(productId) {
  return products.find(function (product) {
    return product.id === productId;
  }) || null;
}


// Filter products by category and search text
function filterProducts(category, searchText) {
  const query = (searchText || "").trim().toLowerCase();

  return products.filter(function (product) {
    const matchesCategory =
      !category ||
      category === "all" ||
      product.category === category;

    const searchableText = [
      product.name,
      product.brand,
      product.description,
      product.code
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !query || searchableText.includes(query);

    return matchesCategory && matchesSearch;
  });
}
