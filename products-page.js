
/* =========================================
   FRIENDLY SURFACES
   Product Search and Category Filters
========================================= */

document.addEventListener("DOMContentLoaded", function () {
  const productGrid = document.getElementById("productGrid");
  const productFilters = document.getElementById("productFilters");
  const productSearch = document.getElementById("productSearch");
  const productCount = document.getElementById("productCount");

  if (!productGrid || !productFilters || !productSearch) {
    return;
  }

  let activeCategory = "all";

  function renderProducts() {
    const searchText = productSearch.value.trim();

    // Uses the verified product data in products.js
    const results =
      typeof filterProducts === "function"
        ? filterProducts(activeCategory, searchText)
        : [];

    productGrid.replaceChildren();

    if (results.length === 0) {
      const emptyState = document.createElement("div");
      emptyState.className = "empty-state";

      const heading = document.createElement("h3");
      heading.textContent = searchText
        ? "No matching products found."
        : "Our product collection is being prepared.";

      const message = document.createElement("p");
      message.textContent = searchText
        ? "Try another search or select a different category."
        : "Please explore our available catalogues to view product details.";

      emptyState.append(heading, message);

      if (!searchText) {
        const link = document.createElement("a");
        link.href = "catalogue.html";
        link.className = "btn btn-dark";
        link.style.marginTop = "20px";
        link.textContent = "View Catalogues ↗";
        emptyState.appendChild(link);
      }

      productGrid.appendChild(emptyState);

      if (productCount) {
        productCount.textContent = searchText
          ? "No matching products."
          : "Product details will appear here when added.";
      }

      return;
    }

    results.forEach(function (product) {
      const card = document.createElement("article");
      card.className = "product-card";

      const imageArea = document.createElement("div");
      imageArea.className = "product-card-image";

      if (product.image) {
        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name || "Product image";
        image.loading = "lazy";
        imageArea.appendChild(image);
      } else {
        imageArea.textContent = "Product image coming soon";
        imageArea.style.color = "#777a72";
        imageArea.style.fontSize = "12px";
      }

      const body = document.createElement("div");
      body.className = "product-card-body";

      const title = document.createElement("h3");
      title.textContent = product.name || "Product";

      const description = document.createElement("p");
      description.textContent =
        product.description || "Contact us for product details.";

      const enquiry = document.createElement("a");
      enquiry.className = "text-link";
      enquiry.href = "#";
      enquiry.textContent = "Enquire on WhatsApp ↗";

      enquiry.addEventListener("click", function (event) {
        event.preventDefault();

        const number = "91XXXXXXXXXX"; // Replace with your WhatsApp number
        const message =
          "Hello Friendly Surfaces! I would like to enquire about " +
          (product.name || "a product") +
          ".";

        if (number.includes("X")) {
          alert("Please add your WhatsApp number in products-page.js.");
          return;
        }

        const url =
          "https://wa.me/" +
          number +
          "?text=" +
          encodeURIComponent(message);

        window.open(url, "_blank", "noopener,noreferrer");
      });

      body.append(title, description, enquiry);
      card.append(imageArea, body);
      productGrid.appendChild(card);
    });

    if (productCount) {
      productCount.textContent =
        results.length + (results.length === 1 ? " product" : " products");
    }
  }

  productFilters.querySelectorAll("[data-category]").forEach(function (button) {
    button.addEventListener("click", function () {
      activeCategory = button.dataset.category || "all";

      productFilters.querySelectorAll("[data-category]").forEach(function (item) {
        item.classList.toggle("active", item === button);
      });

      renderProducts();
    });
  });

  productSearch.addEventListener("input", renderProducts);

  // Support category links such as products.html?category=laminates
  const requestedCategory =
    new URLSearchParams(window.location.search).get("category");

  const validCategories = [
    "all",
    "laminates",
    "plywood",
    "decorative"
  ];

  if (requestedCategory && validCategories.includes(requestedCategory)) {
    activeCategory = requestedCategory;

    productFilters.querySelectorAll("[data-category]").forEach(function (button) {
      button.classList.toggle(
        "active",
        button.dataset.category === activeCategory
      );
    });
  }

  renderProducts();
});
