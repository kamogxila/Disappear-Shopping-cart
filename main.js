// Cart
let cartIcon = document.getElementById("cart-icon");
let cartActive = document.querySelector(".cart");
let closeCart = document.getElementById("close-cart");

// Open Cart
cartIcon.onclick = () => {
  cartActive.classList.add("active");
};

//Close Cart
closeCart.onclick = () => {
  cartActive.classList.remove("active");
};

const products = [
  {
    name: "T-shirt(Front Print)",
    price: 200,
    id: 1,
    quantity: 1,
    image: "t-shirt.jpg",
  },
  {
    name: "T-shirt(back to back)",
    price: 250,
    id: 2,
    quantity: 1,
    image: "t-shirt2.jpg",
  },
  {
    name: "Hoodies",
    price: 350,
    id: 3,
    quantity: 1,
    image: "hoodies.jpg",
  },
  {
    name: "Sweaters",
    price: 300,
    id: 4,
    quantity: 1,
    image: "Sweaters.jpg",
  },
  {
    name: "Caps",
    price: 175,
    id: 5,
    quantity: 1,
    image: "Caps.jpg",
  },
  {
    name: "Bucket Hat",
    price: 185,
    id: 6,
    quantity: 1,
    image: "bucket hat.jpg",
  },
];

// Cart Items
let cart = [];

const productsHTML = products.map(
  (product) =>
    `<div class="product-card">
        <img src="images/${product.image}"class="item-img"/>
        <h2 class="product-name">${product.name}</h2>
        <strong class="product-price">R${product.price}</strong>
        <button class="add-cart" id=${product.id}>Add to Cart</button>
    </div>`
);
const result = document.querySelector(".result");
result.innerHTML = productsHTML.join("");

// Add to Cart
function updateCart() {
  const cartHTML = cart.map(
    (item) => `<div class="cart-item">
            <img src="images/${item.image}"class="items-img"/>
            <div class="cart-detail"><div class="mid">
                <button onclick={decrItem(${item.id})} >-</button>
                <p>${item.quantity}</p>
                <button onclick={incrItem(${item.id})} >+</button>
            </div>
            <p>R${item.price}</p>
            <button onclick={deleteItem(${item.id})} class="cart-product" id=${item.id}><i class='bx bx-trash-alt'></i></button></div>
           </div>`
  );

  const cartItems = document.querySelector(".cart-items");
  cartItems.innerHTML = cartHTML.join("");
}

let num = document.querySelectorAll(".add-cart").length;
for (let i = 0; i < num; i++) {
  document
    .querySelectorAll(".add-cart")
    [i].addEventListener("click", function (cartHTML) {
      addToCart(products, parseInt(cartHTML.target.id));
    });
}

function addToCart(products, id) {
  const product = products.find((product) => product.id === id);
  const cartProduct = cart.find((product) => product.id === id);
  if (cartProduct != undefined && product.id == cartProduct.id) {
    incrItem(id);
  } else {
    cart.unshift(product);
  }
  updateCart();
  getTotal(cart);
}

function getTotal(cart) {
  let { totalItem, cartTotal } = cart.reduce(
    (total, cartItem) => {
      total.cartTotal += cartItem.price * cartItem.quantity;
      total.totalItem += cartItem.quantity;
      return total;
    },
    { totalItem: 0, cartTotal: 0 }
  );
  const totalItemsHTML = document.querySelector(".quantity");
  totalItemsHTML.innerHTML = `${totalItem} `;
  const totalAmountHTML = document.querySelector(".total");
  totalAmountHTML.innerHTML = `R${cartTotal}`;
}

function incrItem(id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i] && cart[i].id == id) {
      cart[i].quantity += 1;
    }
  }
  updateCart();
  getTotal(cart);
}

function decrItem(id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == id && cart[i].quantity > 1) {
      cart[i].quantity -= 1;
    }
  }
  updateCart();
  getTotal(cart);
}

function deleteItem(id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].quantity = 1;
      cart.splice(i, 1);
    }
  }
  updateCart();
  getTotal(cart);
}

function checkoutButton() {
  alert("YOUR ORDER HAS BEEN PLACED☺️");
}
