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
// --------------- MODALRUTA FÖR VARUKORG ----------------
// -------------------------------------------------------
shoppingCartBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  modalShoppingCart.style.display = "flex";
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
