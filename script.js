//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//// NOTE TO SELF: SE ÖVER SPRÅKET!!! DU BLANDAR OCH HAR DIG. ////
///////// GÄRNA ASAP MEN INNAN DEADLINE ÄR ETT MÅSTE!!! //////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

// Variabler för tid och dag
const today = new Date();
const weekday = today.getDay();
const hours = today.getHours();
const minutes = today.getMinutes();

const weekend =
  weekday === 6 ||
  weekday === 0 ||
  (weekday === 5 && hours > 14) ||
  (weekday === 1 && hours < 3);

// Variabler för rabatter/prispåslag
const mondayDiscount = 0.9;
const weekendSurcharge = 1.15;

// -------------------------------------------------------
// ---------------- 15 MINUTERS TIMERN -------------------
// -------------------------------------------------------
let timer;
let timeLeft = 15 * 60;
let timerStarted = false;

function startTimer() {
  if (!timerStarted) {
    timerStarted = true;
    timer = setInterval(updateTimer, 1000);
  }
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const timerElement = document.querySelector("#timer");
  if (timerElement) {
    timerElement.textContent = `Återstående tid: ${minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  }
}

function updateTimer() {
  if (timeLeft === 0) {
    clearInterval(timer);
    showCartEmptyAlert();
    clearCart();
  } else {
    timeLeft--;
    updateTimerDisplay();
  }
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 15 * 60;
  timerStarted = false;
  updateTimerDisplay();
}

function showCartEmptyAlert() {
  alert("Du var för långsam. \nVarukorgen har tömts!");
  cartArray.length = 0;
  lockedCart = false;
  showCart();
}

let lockedCart = false;

// ----------------------------------------------------
// --------------- ARRAY FOR PRODUCTS -----------------
// ----------------------------------------------------

const productsArray = [
  {
    id: 0,
    name: "Veep Poster",
    price: 300,
    rating: 4.5,
    amount: 0,
    size: "50x70 cm",
    category: "poster",
    images: [
      {
        url: "assets/images/products/veep-poster.jpg",
        width: 500,
        height: 753,
        alt: "Framed Veep poster hanging on a wall.",
      },
      {
        url: "assets/images/products/veep-poster2.jpg",
        width: 500,
        height: 753,
        alt: "Close-up of Veep Poster.",
      },
    ],
  },
  {
    id: 1,
    name: "Veep Mug",
    price: 200,
    rating: 4,
    amount: 0,
    size: "one size",
    category: "mug",
    images: [
      {
        url: "assets/images/products/veep-mug.jpg",
        width: 500,
        height: 753,
        alt: "Veep Mug standing on a kitchen counter.",
      },
      {
        url: "assets/images/products/veep-mug2.jpg",
        width: 500,
        height: 753,
        alt: "Close-up of Veep Mug design.",
      },
    ],
  },
  {
    id: 2,
    name: "Parks and Rec Poster",
    price: 300,
    rating: 4,
    amount: 0,
    size: "30x40 cm",
    category: "poster",
    images: [
      {
        url: "assets/images/products/parks-poster.jpg",
        width: 500,
        height: 753,
        alt: "Framed Parks and Rec poster hanging on a wall.",
      },
      {
        url: "assets/images/products/parks-poster2.jpg",
        width: 500,
        height: 753,
        alt: "Close-up of Parks and Rec Poster.",
      },
    ],
  },
  {
    id: 3,
    name: "Parks and Rec Mug",
    price: 200,
    rating: 3.5,
    amount: 0,
    size: "one size",
    category: "mug",
    images: [
      {
        url: "assets/images/products/parks-mug.jpg",
        width: 500,
        height: 753,
        alt: "Parks and Rec Mug standing on a kitchen counter.",
      },
      {
        url: "assets/images/products/parks-mug2.jpg",
        width: 500,
        height: 500,
        alt: "Close-up of Parks and Rec Mug design.",
      },
    ],
  },
  {
    id: 4,
    name: "Parks and Rec Totebag",
    price: 200,
    rating: 3,
    amount: 0,
    size: "one size",
    category: "bag",
    images: [
      {
        url: "assets/images/products/parks-tote.jpg",
        width: 500,
        height: 753,
        alt: "Bild på Poster 5, Bild 1",
      },
      {
        url: "assets/images/products/parks-tote2.jpg",
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
        url: "assets/images/products/poster6-img1.jpg",
        width: 500,
        height: 753,
        alt: "Bild på Poster 6, Bild 1",
      },
      {
        url: "assets/images/products/poster6-img2.jpg",
        width: 500,
        height: 753,
        alt: "Bild på Poster 6, Bild 2",
      },
    ],
  },
];

// -------- Fredag 15:00 - Måndag 03:00: Prispåslag 15% ----------

if (weekend) {
  productsArray.forEach((product) => {
    product.price = product.price * weekendSurcharge;
    product.price = Math.floor(product.price);
  });
}

// -------------------------------------------------------
// ---------- FUNKTION FÖR ATT VISA PRODUKTER ------------
// -------------------------------------------------------

function generateProducts(products) {
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
        <input type="number" min="0" value="${product.amount}" id="count-${
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
    console.log("Produkter genererade.");
  });

  initCarousel();
}

generateProducts(productsArray);

// -------------------------------------------------------
// --------------- ÖKA ANTAL MED KNAPPEN -----------------
// -------------------------------------------------------
function addToCart(productId) {
  const count = document.querySelector(`#count-${productId}`);
  const product = productsArray.find((item) => item.id == productId);

  if (lockedCart) {
    alert(
      "Du håller på att lägga en beställning. \nTryck på 'Ändra varukorg' i beställningsöversikten om du vill fortsätta handla."
    );
    return;
  }

  if (count && product) {
    product.amount += 1;
    count.value = product.amount;

    totalPriceProduct(productId);
    totalAmountCart(productId, 1);
    addProductInfoToCart(productId, 1);
    showPayment();
  }
}

// -------------------------------------------------------
// -------------- MINSKA ANTAL MED KNAPPEN ---------------
// -------------------------------------------------------

function removeFromCart(productId) {
  const count = document.querySelector(`#count-${productId}`);
  const product = productsArray.find((item) => item.id == productId);

  if (lockedCart) {
    alert(
      "Du håller på att lägga en beställning. \nTryck på 'Ändra varukorg' i beställningsöversikten om du vill fortsätta handla."
    );
    return;
  }

  if (count && product && product.amount > 0) {
    product.amount -= 1;
    count.value = product.amount;

    if (product.amount === 0) {
      const existInCart = cartArray.findIndex((item) => item.id === productId);
      if (existInCart !== -1) {
        cartArray.splice(existInCart);
      }
    }

    totalPriceProduct(productId);
    totalAmountCart(productId, -1);
    addProductInfoToCart(productId, -1);
    showPayment();
  }
}

// -------------------------------------------------------
// ------------------ ARRAY FÖR VARUKORGEN ---------------
// -------------------------------------------------------
let cartArray = [];

function addProductInfoToCart(id, amount) {
  id = Number(id);
  const existInCart = cartArray.findIndex((product) => product.id === id);

  const product = productsArray.find((item) => item.id === id);

  if (!product) {
    console.error(`Produkt med id ${id} kunde inte hittas.`);
    return;
  }

  if (existInCart !== -1) {
    cartArray[existInCart].amount += amount;
  } else {
    cartArray.push({
      id: product.id,
      name: product.name,
      price: product.price,
      amount: amount,
    });
  }

  showCart();
  totalAmountCart();
}

// -------------------------------------------------------
// -------- EVENTLYSSNARE KNAPPARNA ÖKA/MINSKA -----------
// -------------------------------------------------------
document.querySelector("#products").addEventListener("click", function (e) {
  const button = e.target.closest("button");

  if (button && button.id) {
    const match = button.id.match(/\d+/);

    if (match) {
      const productId = match[0];

      if (button.id.startsWith("addera")) {
        addToCart(productId);
      } else if (button.id.startsWith("minska")) {
        removeFromCart(productId);
      }
    }
  }
});

// -------------------------------------------------------
// --------------- MODALRUTA FÖR VARUKORG ----------------
// -------------------------------------------------------
const shoppingCartBtn = document.getElementById("shopping-cart-btn");
const modalShoppingCart = document.getElementById("modal-shopping-cart");
const closeBtn = document.getElementById("close");
const checkoutBtn = document.getElementById("checkout-btn");
const checkout = document.getElementById("checkout");

shoppingCartBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  modalShoppingCart.style.display = "flex";
  showCart();
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
  if (cartArray.length > 0) {
    checkout.style.display = "flex";
    checkout.scrollIntoView({ behavior: "smooth" });
    lockedCart = true;
    modalShoppingCart.style.display = "none";

    // Starta timer när produkt finns i varukorgen & knappen för visa formulär triggas
    if (cartArray.length > 0) {
      startTimer();
    }

    orderSummary(cartArray);
    orderSummaryInfo.style.display = "flex";
  } else {
    alert("Du har inga produkter i varukorgen än!");
    modalShoppingCart.style.display = "none";
    return;
  }
});

// -------------------------------------------------------
// ------------------ LISTA I VARKUKORGEN ----------------
// -------------------------------------------------------

let totalPrice = 0;
let itemTotalPrice = 0;
let shippingFee = 25;
let inclShipping = 0;
let itemDiscountInfo = "";
let shippingDiscountInfo = "";
let shippingTime = 30;

function showCart() {
  const cartList = document.querySelector("#cart");
  cartList.innerHTML = "";

  if (cartArray.length === 0) {
    cartList.innerHTML = "<p>Din varukorg är tom.</p>";
    return;
  }

  cartArray = cartArray.filter((item) => item.amount > 0);

  const totalItems = cartArray.reduce((sum, item) => sum + item.amount, 0);

  totalPrice = 0;

  itemDiscountInfo = "";
  shippingDiscountInfo = "";

  cartArray.forEach((item) => {
    const product = productsArray.find((p) => p.id === item.id);
    if (product && product.images.length > 0) {
      const image = product.images[0];

      let itemTotalPrice = item.amount * product.price;
      totalPrice += itemTotalPrice;

      if (item.amount > 9) {
        itemTotalPrice *= 0.9;
        itemDiscountInfo = "10% rabatt vid köp av 10st.";
      }

      if (totalItems > 14) {
        shippingFee = 0;
        shippingDiscountInfo = "Fri frakt vid köp av fler än 14 produkter!";
      } else {
        shippingFee = 25;
      }

      cartList.innerHTML += `
        <div class="cart-item">
          <div class="cart-item-details">
            <div class="cart-item-info">
              <h4 class="cart-item-name">${item.name}</h4>
              <h4 class="cart-item-amount">Antal: ${item.amount}</h4> 
              <h4 class="cart-item-price">Pris: ${itemTotalPrice} kr</h4>
            </div>
            <div class="thumb-img">
              <img src="${image.url}" alt="${image.alt}" width="${image.width}" height="${image.height}">
            </div>
          </div>
        </div>
      `;
    }
  });

  if (today.getDay() === 1 && today.getHours() > 0 && today.getHours() < 15) {
    console.log("Måndagsrabatt applicerad!");
    totalPrice = totalPrice * mondayDiscount;
    itemDiscountInfo = "Måndagsrabatt! 10% rabatt på hela varukorgen!";
  }

  if (today.getDay() === 6 || today.getDay() === 0) {
    console.log("Längre leveranstid på helgen.");
    shippingTime = 90;
  }

  // Visa rabattinfo om den finns
  if (itemDiscountInfo || shippingDiscountInfo) {
    cartList.innerHTML += `
    <div class="discount-box">
      <p class="discount">${itemDiscountInfo}</p>
      <p class="discount">${shippingDiscountInfo}</p>
    </div>
  `;
  }

  let shippingPartial = totalPrice * 0.1;
  shippingPartial = Math.floor(shippingPartial);
  let shippingTotal = shippingPartial + shippingFee;
  shippingTotal = Math.floor(shippingTotal);
  inclShipping = shippingTotal + totalPrice;

  // Visa totala priset + frakt + rensa-knappen
  cartList.innerHTML += `
    <div class="cart-total">
      <div class="summary">
        <div class="cart-sum"><h4>Summa: </h4><span class="black">${totalPrice} kr</span></div>
      </div>
    </div>
    <div id="deleteCart" aria-label="Rensa hela varukorgen">
      <button><i class="delete-cart fa-regular fa-trash-can" title="Töm varukorg"></i></button>
    </div>
  `;

  deleteCart();
}
// Totalpris per product
function totalPriceProduct(productId) {
  const product = productsArray.find((item) => item.id == productId);
  const totalElement = document.querySelector(`#total-${productId}`);
  if (product && totalElement) {
    totalElement.textContent = `Totalt: ${product.price * product.amount} kr`;
  }
}

// Funktion som visar och uppdaterar antal produkter i varukorgen
function totalAmountCart() {
  const totalQuantity = cartArray.reduce(
    (total, item) => total + item.amount,
    0
  );
  const quantityElement = document.querySelector("#quantity");

  if (quantityElement) {
    if (totalQuantity > 0) {
      quantityElement.textContent = totalQuantity;
      quantityElement.style.display = "inline";
    } else {
      quantityElement.textContent = 0;
    }
  }
}

function deleteCart() {
  const deleteCurrentCart = document.querySelector("#deleteCart");

  deleteCurrentCart.addEventListener("click", () => {
    const confirmDeleteCart = window.confirm(
      "Är du säker på att du vill tömma hela varukorgen?"
    );

    if (confirmDeleteCart) {
      clearCart();
    }
  });
}

function clearCart() {
  cartArray.length = 0;

  lockedCart = false;
  resetTimer();
  checkout.style.display = "none";

  productsArray.forEach((product) => {
    product.amount = 0;
  });

  productsArray.forEach((product) => {
    const countElement = document.querySelector(`#count-${product.id}`);
    const totalElement = document.querySelector(`#total-${product.id}`);
    if (countElement) countElement.value = 0;
    if (totalElement) totalElement.textContent = `Totalt: 0 kr`;
  });

  const quantityElement = document.querySelector("#quantity");
  if (quantityElement) {
    quantityElement.textContent = 0;
    quantityElement.style.display = "none";
  }

  showCart();
  orderSummary(cartArray);
}

// -------------------------------------------------------
// ----------------- SORTERINGSFUNKTIONER ----------------
// -------------------------------------------------------
const sortFilter = document.getElementById("sort-filter");
let filteredProducts = productsArray;

sortFilter.addEventListener("change", (event) => {
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

  if (event.target.value === "sort-name") {
    console.log("Sortera efter namn (A-Ö)");
    filteredProducts.sort(sortByName);
  } else if (event.target.value === "sort-price") {
    console.log("Sortera efter pris");
    filteredProducts.sort(sortByPrice);
  } else if (event.target.value === "sort-rating") {
    console.log("Sortera efter betyg");
    filteredProducts.sort(sortByRating);
  }

  generateProducts(filteredProducts);
});

// -------------------------------------------------------
// --------------- FILTRERING AV KATEGORI ----------------
// -------------------------------------------------------

const categorySelect = document.getElementById("category");

const filterCategory = (category) => {
  if (category === "everything") {
    filteredProducts = productsArray;
  } else {
    filteredProducts = productsArray.filter(
      (product) => product.category === category
    );
  }
};

categorySelect.addEventListener("change", (event) => {
  const selectedCategory = event.target.value;
  filterCategory(selectedCategory);
  generateProducts(filteredProducts);
});

// -------------------------------------------------------
// --------------------- KARUSELLEN ----------------------
// -------------------------------------------------------
function initCarousel() {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((productCard, productIndex) => {
    const carouselImages = productCard.querySelectorAll(".carousel-images img");
    const carouselContainer = productCard.querySelector(".carousel-images");
    const prevBtn = productCard.querySelector(".prev-btn");
    const nextBtn = productCard.querySelector(".next-btn");

    if (
      !carouselContainer ||
      !prevBtn ||
      !nextBtn ||
      carouselImages.length === 0
    )
      return;

    let currentIndex = 0;

    function updateCarousel() {
      const offset = -currentIndex * 100;
      carouselContainer.style.transform = `translateX(${offset}%)`;
    }

    // Gå till föregående bild
    prevBtn.addEventListener("click", () => {
      currentIndex =
        currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1;
      updateCarousel();
    });

    // Gå till nästa bild
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % carouselImages.length;
      updateCarousel();
    });
  });
}

// -------------------------------------------------------
// --------------- ORDERBEKRÄFTELSE/FORMULÄR -------------
// -------------------------------------------------------

const form = document.getElementById("order-form");
const submitButton = form.querySelector(".confirm");
const invoice = document.getElementById("invoice-btn");
const card = document.getElementById("card-btn");
const payment = document.querySelector(".payment");
const insertCard = document.getElementById("insert-card-info");
const insertInvoice = document.getElementById("insert-invoice-info");

payment.style.display = "none";
invoice.style.display = "none";
card.style.display = "none";
insertInvoice.style.display = "none";
insertCard.style.display = "none";

document.addEventListener("input", showPayment);

function validateCustomerInfo() {
  const fields = [
    form.querySelector("#first-name"),
    form.querySelector("#last-name"),
    form.querySelector("#street-address"),
    form.querySelector("#postal-code"),
    form.querySelector("#city"),
    form.querySelector("#mobile"),
    form.querySelector("#email"),
    form.querySelector("#data-approval"),
  ];
  return fields.every((field) => field.checkValidity());
}

let validationOK = false;

function showPayment() {
  if (validateCustomerInfo() & (totalPrice < 800)) {
    payment.style.display = "flex";
    card.style.display = "flex";
    invoice.style.display = "flex";
  } else if (validateCustomerInfo() & (totalPrice >= 800)) {
    payment.style.display = "flex";
    card.style.display = "none";
    invoice.style.display = "none";
    insertCard.style.display = "flex";
  } else {
    payment.style.display = "none";
  }
}

card.addEventListener("click", () => {
  insertCard.style.display = "flex";
  insertInvoice.style.display = "none";
});

invoice.addEventListener("click", () => {
  insertInvoice.style.display = "flex";
  insertCard.style.display = "none";
});

function validateInvoice() {
  const personalID = form.querySelector("#personal-id");
  if (personalID.checkValidity()) {
    validationOK = true;
  } else {
    validationOK = false;
  }
}

// Funktion för att validera att kortinfortmation är korrekt inmatad
function validateCard() {
  const cardNo = form.querySelector("#cardNo");
  const expDate = form.querySelector("#expDate");
  const cvc = form.querySelector("#cvc");
  let expDateIsValid = false;
  const expDateValue = expDate.value;

  //Kontroll av utgångsdatum, månad samt år
  if (expDateValue.length === 5 && expDateValue[2] === "/") {
    const month = parseInt(expDateValue.substring(0, 2));
    const year = parseInt(expDateValue.substring(3, 5));

    if (month >= 1 && month <= 12 && year >= 24 && year <= 32) {
      expDateIsValid = true;
    }
  }
  if (cardNo.checkValidity() && expDateIsValid && cvc.checkValidity()) {
    validationOK = true;
  } else {
    validationOK = false;
  }
}

function validatePayment() {
  if (validationOK == true) {
    submitButton.style.backgroundColor = "green";
    submitButton.style.cursor = "pointer";
  } else {
    submitButton.style.backgroundColor = "grey";
    submitButton.style.cursor = "not-allowed";
  }
}

insertCard.addEventListener("input", () => {
  validateCard();
  validatePayment();
});

insertInvoice.addEventListener("input", () => {
  validateInvoice();
  validatePayment();
});

showPayment();
validatePayment();

//Rensa formuläret
const deleteForm = document.getElementById("clear-form");

deleteForm.addEventListener("click", () => {
  window.confirm("Är du säker på att du vill rensa forumläret?");
  form.reset();
  payment.style.display = "none";
});

let orderSummaryInfo = document.querySelector("#order-info");

// FUNKTION för ordersammanfattning
function orderSummary(cartArray) {
  orderSummaryInfo.innerHTML = "";

  let totalPrice = 0;
  let itemDiscountInfo = "";
  let shippingDiscountInfo = "";

  cartArray.forEach((item) => {
    const product = productsArray.find((p) => p.id === item.id);
    if (product && product.images.length > 0) {
      const image = product.images[0];

      let itemTotalPrice = item.amount * product.price;
      totalPrice += itemTotalPrice;

      // Rabatt vid köp av fler än 9 stycken
      if (item.amount > 9) {
        itemTotalPrice *= 0.9; // 10% rabatt
        itemDiscountInfo = "10% rabatt vid köp av 10st.";
      }

      // Rabatt vid fler än 14 produkter för fri frakt
      const totalItems = cartArray.reduce((sum, item) => sum + item.amount, 0);
      let shippingFee = 25; // Standard frakt
      if (totalItems > 14) {
        shippingFee = 0; // Fri frakt vid köp av fler än 14 produkter
        shippingDiscountInfo = "Fri frakt vid köp av fler än 14 produkter!";
      }

      orderSummaryInfo.innerHTML += `
        <div class="summary-container">
          <div class="cart-item-details">
            <div class="summary-item">
              <h4 class="cart-item-name">${item.name}</h4>
              <h4 class="red">x${item.amount}</h4>
              <h4 class="price-product">Pris: ${itemTotalPrice} kr</h4>
            </div>
          </div>
        </div>`;
    }
  });

  // Lägg till rabatt- och fraktinfo om de finns
  if (itemDiscountInfo || shippingDiscountInfo) {
    orderSummaryInfo.innerHTML += `
      <div class="discount-box">
        <p class="discount">${itemDiscountInfo}</p>
        <p class="discount">${shippingDiscountInfo}</p>
      </div>
    `;
  }

  // Frakt och leveranstid
  let shippingPartial = totalPrice * 0.1;
  shippingPartial = Math.floor(shippingPartial);
  let shippingTotal = shippingPartial + (cartArray.length > 14 ? 0 : 25);
  shippingTotal = Math.floor(shippingTotal);

  // Totalsumma inklusive frakt
  let inclShipping = totalPrice + shippingTotal;

  // Visa totala priset + frakt i sammanfattningen
  orderSummaryInfo.innerHTML += `
    <div class="cart-total">
      <div class="summary">
        <div class="cart-sum"><h4>Summa: </h4><span class="black">${totalPrice} kr</span></div>
        <div class="cart-sum"><h4>Frakt: </h4><span class="black">${shippingFee} + ${shippingPartial} kr</span></div>
        <div class="cart-sum total-cart"><h4>Totalt: </h4><span>${inclShipping} kr</span></div>
       <h4 class="right">Leveranstid: ${shippingTime} min</h4>
        <button class="edit-cart" aria-label="Ändra varukorg">Ändra varukorg</button>

      </div>
    </div>
  `;

  const editCart = document.querySelector(".edit-cart");

  editCart.addEventListener("click", () => {
    console.log("Ändra kundkorg = OK");
    lockedCart = false;
    orderSummaryInfo.innerHTML = "";
    orderSummaryInfo.style.display = "none";
    checkout.style.display = "none";
    resetTimer();
  });

  console.log("Här ska visas en sammanfattning.");
}
