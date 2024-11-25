// Hitta element som behövs
const shoppingCartBtn = document.getElementById("shopping-cart-btn");
const modalShoppingCart = document.getElementById("modal-shopping-cart");
const closeBtn = document.getElementById("close");
const checkoutBtn = document.getElementById("checkout-btn");
const checkout = document.getElementById("checkout");
const invoicePayment = document.getElementById("payment-invoice");
const cardPayment = document.getElementById("payment-card");
const invoicePaymentInsert = document.getElementById("invoice-insert");
const cardPaymentInsert = document.getElementById("card-insert");

// -------------------------------------------------------
// --------------- ARRAY FÖR PRODUKTERNA -----------------
// -------------------------------------------------------

const products = [
  {
    id: 0,
    name: "Produkt Ett",
    price: 50,
    rating: 1,
    amount: 0,
    size: "50x70 cm",
    category: "poster",
    images: [
      {
        url: "assets/images/products/Poster1-Img1.jpg",
        width: 500,
        height: 753,
        alt: "Bild på Poster 1, Bild 1",
      },
      {
        url: "assets/images/products/Poster1-Img2.jpg",
        width: 500,
        height: 750,
        alt: "Bild på Poster 1, Bild 2",
      },
    ],
  },
  {
    id: 1,
    name: "Produkt Två",
    price: 100,
    rating: 4.5,
    amount: 0,
    size: "50x70 cm",
    category: "mug",
    images: [
      {
        url: "assets/images/products/Poster2-Img1.jpg",
        width: 500,
        height: 753,
        alt: "Bild på Poster 2, Bild 1",
      },
      {
        url: "assets/images/products/Poster2-Img2.jpg",
        width: 500,
        height: 753,
        alt: "Bild på Poster 2, Bild 2",
      },
    ],
  },
  {
    id: 2,
    name: "Produkt Tre",
    price: 200,
    rating: 4,
    amount: 0,
    size: "50x70 cm",
    category: "clothes",
    images: [
      {
        url: "assets/images/products/Poster3-Img1.jpg",
        width: 500,
        height: 753,
        alt: "Bild på Poster 3, Bild 1",
      },
      {
        url: "assets/images/products/Poster3-Img2.jpg",
        width: 500,
        height: 753,
        alt: "Bild på Poster 3, Bild 2",
      },
    ],
  },
  {
    id: 3,
    name: "Produkt Fyra",
    price: 200,
    rating: 4,
    amount: 0,
    size: "50x70 cm",
    category: "poster",
    images: [
      {
        url: "assets/images/products/Poster4-Img1.jpg",
        width: 500,
        height: 753,
        alt: "Bild på Poster 4, Bild 1",
      },
      {
        url: "assets/images/products/Poster4-Img2.jpg",
        width: 500,
        height: 753,
        alt: "Bild på Poster 4, Bild 2",
      },
    ],
  },
  {
    id: 4,
    name: "Produkt Fem",
    price: 200,
    rating: 4,
    amount: 0,
    size: "50x70 cm",
    category: "poster",
    images: [
      {
        url: "assets/images/products/Poster5-Img1.jpg",
        width: 500,
        height: 753,
        alt: "Bild på Poster 5, Bild 1",
      },
      {
        url: "assets/images/products/Poster5-Img2.jpg",
        width: 500,
        height: 753,
        alt: "Bild på Poster 5, Bild 2",
      },
    ],
  },
  {
    id: 5,
    name: "Produkt Sex",
    price: 200,
    rating: 4,
    amount: 0,
    size: "50x70 cm",
    category: "poster",
    images: [
      {
        url: "assets/images/products/Poster6-Img1.jpg",
        width: 500,
        height: 753,
        alt: "Bild på Poster 6, Bild 1",
      },
      {
        url: "assets/images/products/Poster6-Img2.jpg",
        width: 500,
        height: 753,
        alt: "Bild på Poster 6, Bild 2",
      },
    ],
  },
];

// -------------------------------------------------------
// ---------- FUNKTION FÖR ATT VISA PRODUKTER ------------
// -------------------------------------------------------

function visaProdukter() {
  const productsList = document.querySelector("#products");
  productsList.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("section");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <h3>${product.name}</h3>
      <div class="images carousel">
        <button class="carousel-btn prev-btn">❮</button>
        <div class="carousel-images">
          ${product.images
            .map(
              (image) => `
            <img src="${image.url}" alt="${image.alt}" width="${image.width}" height="${image.height}">
          `
            )
            .join("")}
        </div>
        <button class="carousel-btn next-btn">❯</button>
      </div>
      
      <div class="size-price">
        <h3>${product.size}</h3>
        <p>${product.price} kr</p>
      </div>
      <p>Rating: ${
        Array(Math.floor(product.rating))
          .fill('<i class="fa-solid fa-star"></i>')
          .join("") +
        (product.rating % 1 !== 0
          ? '<i class="fa-solid fa-star-half-stroke"></i>'
          : "")
      }</p>

      <div class="add-amount">
        <button class="minska" id="minska${
          product.id
        }"><i class="fa-solid fa-minus"></i></button>
        <input type="number" min="0" value="${product.amount}" id="input-${
      product.id
    }">
        <button class="addera" id="addera${
          product.id
        }"><i class="fa-solid fa-plus"></i></button>
      </div>
      <div class="sum-product">
        <h4 id="total-${product.id}">Totalt: ${
      product.price * product.amount
    }kr</h4>
      </div>
    `;

    productsList.appendChild(productCard);
  });
}

visaProdukter();

// -------------------------------------------------------
// --------------- ÖKA ANTAL MED KNAPPEN -----------------
// -------------------------------------------------------
function increaseProductCount(productId) {
  const input = document.querySelector(`#input-${productId}`);
  const product = products.find((item) => item.id == productId);
  if (input && product) {
    product.amount += 1;
    input.value = product.amount;

    adderaTillVarukorg(productId, 1);

    summaProdukt(productId);
  }
}

// -------------------------------------------------------
// -------------- MINSKA ANTAL MED KNAPPEN ---------------
// -------------------------------------------------------

function decreaseProductCount(productId) {
  const input = document.querySelector(`#input-${productId}`);
  const product = products.find((item) => item.id == productId);
  if (input && product && product.amount > 0) {
    product.amount -= 1;
    input.value = product.amount;

    // Uppdatera varukorgen
    adderaTillVarukorg(productId, -1);

    summaProdukt(productId);
  }
}

// -------------------------------------------------------
// -------- EVENTLYSSNARE KNAPPARNA ÖKA/MINSKA -----------
// -------------------------------------------------------
document.querySelector("#products").addEventListener("click", function (e) {
  const button = e.target.closest("button");

  if (button) {
    const productId = button.id.match(/\d+/)[0];

    if (button.id.startsWith("addera")) {
      increaseProductCount(productId);
    } else if (button.id.startsWith("minska")) {
      decreaseProductCount(productId);
    }
  }
});

// -------------------------------------------------------
// --------------- MODALRUTA FÖR VARUKORG ----------------
// -------------------------------------------------------

shoppingCartBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  modalShoppingCart.style.display = "flex";
  visaVarukorg();
});

// Stäng modalrutan (CLOSE)
closeBtn.addEventListener("click", () => {
  modalShoppingCart.style.display = "none";
});

// Stäng modalrutan (klicka utanför rutan)
document.addEventListener("click", (event) => {
  if (
    !modalShoppingCart.contains(event.target) &&
    event.target !== shoppingCartBtn
  ) {
    modalShoppingCart.style.display = "none";
  }
});

checkoutBtn.addEventListener("click", () => {
  // Gör checkout synlig
  checkout.style.display = "flex";

  // Scrollas mjukt till checkout
  checkout.scrollIntoView({ behavior: "smooth" });
});

// -------------------------------------------------------
// ------------------ ARRAY FÖR VARUKORGEN ---------------
// -------------------------------------------------------
let varukorg = [];

function adderaTillVarukorg(id, amount) {
  id = Number(id);
  const existingProductIndex = varukorg.findIndex(
    (product) => product.id === id
  );

  const product = products.find((item) => item.id === id);

  if (!product) {
    console.error(`Produkt med id ${id} kunde inte hittas.`);
    return;
  }

  if (existingProductIndex !== -1) {
    varukorg[existingProductIndex].amount += amount;
  } else {
    varukorg.push({
      id: product.id,
      name: product.name,
      price: product.price,
      amount: amount,
    });
  }

  visaVarukorg();
}

// -------------------------------------------------------
// ------------------ LISTA I VARKUKORGEN ----------------
// -------------------------------------------------------
function visaVarukorg() {
  const varukorgLista = document.querySelector("#cart");

  varukorgLista.innerHTML = "";

  // Debugging för att kontrollera innehållet i varukorgen
  console.log("Innehåll i varukorg:", varukorg);

  varukorg.forEach((item) => {
    const product = products.find((p) => p.id === item.id);
    if (product && product.images.length > 0) {
      const image = product.images[0];

      varukorgLista.innerHTML += `
        <div class="cart-item">
          <div class="cart-item-details">
            <div class="cart-item-info">
              <h4 class="cart-item-name">${item.name}</h4>
              <h4 class="cart-item-amount">Antal: ${item.amount}</h4> 
              <h4 class="cart-item-price">Pris: ${
                item.price * item.amount
              } kr</h4>
            </div>
            <div class="thumb-img">
              <img src="${image.url}" alt="${image.alt}" width="${
        image.width
      }" height="${image.height}">
            </div>
          </div>
        </div>
      `;
    }
  });

  const totalPrice = varukorg.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );
  varukorgLista.innerHTML += ` 
    <div class="cart-total">
      <h4>Totalt: </h4>
      <span>${totalPrice} kr</span>
    </div>`;
}

// -------------------------------------------------------
// ----------------- TOTALPRIS I VARUKORG ----------------
// -------------------------------------------------------
function summaProdukt(productId) {
  const product = products.find((item) => item.id == productId);
  const totalElement = document.querySelector(`#total-${productId}`);
  if (product && totalElement) {
    totalElement.textContent = `Totalt: ${product.price * product.amount} kr`;
  }
}

// -------------------------------------------------------
// ----------------- SORTERINGSFUNKTIONER ----------------
// -------------------------------------------------------

//Variabeldeklarationer
const sorteraNamn = document.getElementById("sort-name");
const sorteraPris = document.getElementById("sort-price");
const sorteraRating = document.getElementById("sort-rating");

const sortByName = (a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

const sortByPrice = (a, b) => {
  if (a.price < b.price) return -1;
  if (a.price > b.price) return 1;
  return 0;
};

const sortByRating = (a, b) => {
  if (a.rating < b.rating) return 1;
  if (a.rating > b.rating) return -1;
  return 0;
};

sorteraNamn.addEventListener("click", () => {
  products.sort(sortByName);
  visaProdukter();
});

sorteraPris.addEventListener("click", () => {
  products.sort(sortByPrice);
  visaProdukter();
});

sorteraRating.addEventListener("click", () => {
  products.sort(sortByRating);
  visaProdukter();
});

// -------------------------------------------------------
// --------------- ORDERBEKRÄFTELSE/FORMULÄR -------------
// -------------------------------------------------------

// Visa kortinfo
cardPayment.addEventListener("click", () => {
  cardPaymentInsert.style.display = "flex";
  invoicePaymentInsert.style.display = "none";
});

// Visa fakturainfo
invoicePayment.addEventListener("click", () => {
  invoicePaymentInsert.style.display = "flex";
  cardPaymentInsert.style.display = "none";
});
