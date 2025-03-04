
let products = [];
let filteredProducts = [];
let cart = [];

const apiURL = '<Enter you url>'; // change this URL as needed

// For demonstration, if API is not available, use sample data:
const sampleData = [
  {
    "id": 1,
    "name": "Coffee",
    "category": "Beverages",
    "image_url": "https://www.vittoriacoffee.com/cdn/shop/articles/australian-coffee-types_1x.svg?v=1725341955",
    "varieties": [
      { "id": 101, "name": "Small", "price": 50 },
      { "id": 102, "name": "Medium", "price": 100 },
      { "id": 103, "name": "Large", "price": 150 }
    ]
  },
  {
    "id": 2,
    "name": "Tea",
    "category": "Beverages",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwiRhz89-MIlatLwwcCftgN5_wm3ZSCqpK7e8CkNVPY22nXksxkBnZM6c&s=10",
    "varieties": [
      { "id": 201, "name": "Regular", "price": 30 },
      { "id": 202, "name": "Large", "price": 60 }
    ]
  },
  {
    "id": 3,
    "name": "Sandwich",
    "category": "Food",
    "image_url": "https://recipesblob.oetker.in/assets/f7ea4ac65c534c1492d156dfac9db2ad/1272x764/sandwichetojpg.webp",
    "varieties": [
      { "id": 301, "name": "Veg", "price": 70 },
      { "id": 302, "name": "Non-Veg", "price": 90 }
    ]
  }
];
async function fetchProducts() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error('Network response was not ok');
    products = await response.json();
  } catch (error) {
    console.error('Error fetching products, using sample data:', error);
    products = sampleData;
  }
  filteredProducts = products; // Initialize filtered products
  renderProducts(filteredProducts);
  populateFilters(products);
}

function renderProducts(productArray) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  if (productArray.length === 0) {
    productList.innerHTML = '<p>No products found.</p>';
    return;
  }

  productArray.forEach(product => {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-12';

    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.image_url}" alt="${product.name}">
      <h5>${product.name}</h5>
      <p>Category: ${product.category}</p>
      <div class="varieties">
        ${product.varieties.map(variety => `
          <div class="variety">
            <span>${variety.name} - Rs${variety.price}</span>
            <button class="btn btn-sm btn-outline-primary" onclick="addToCart(${product.id}, ${variety.id})">Add to Cart</button>
          </div>
        `).join('')}
      </div>
    `;

    colDiv.appendChild(card);
    productList.appendChild(colDiv);
  });
}

function populateFilters(products) {
  const categoryFilter = document.getElementById('categoryFilter');
  const categories = [...new Set(products.map(product => product.category))];
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}
function filterProducts() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const selectedCategory = document.getElementById('categoryFilter').value;
  const sortBy = document.getElementById('sortBy').value;

  filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  if (sortBy === 'priceLowHigh') {
    filteredProducts.sort((a, b) => {
      // Compare lowest price from varieties
      const aMin = Math.min(...a.varieties.map(v => v.price));
      const bMin = Math.min(...b.varieties.map(v => v.price));
      return aMin - bMin;
    });
  } else if (sortBy === 'priceHighLow') {
    filteredProducts.sort((a, b) => {
      const aMax = Math.max(...a.varieties.map(v => v.price));
      const bMax = Math.max(...b.varieties.map(v => v.price));
      return bMax - aMax;
    });
  }

  renderProducts(filteredProducts);
}

function addToCart(productId, varietyId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const variety = product.varieties.find(v => v.id === varietyId);
  if (!variety) return;

  const cartItem = cart.find(item => item.productId === productId && item.varietyId === varietyId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({
      productId: product.id,
      varietyId: variety.id,
      name: product.name,
      varietyName: variety.name,
      price: variety.price,
      quantity: 1
    });
  }
  saveCart();
  renderCart();
}

function renderCart() {
  const cartItemsDiv = document.getElementById('cartItems');
  cartItemsDiv.innerHTML = '';

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('cartTotal').textContent = '0';
    return;
  }

  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <strong>${item.name} (${item.varietyName})</strong>
      <span>Price: Rs${item.price}</span>
      <span>Quantity: 
        <button class="btn btn-sm btn-secondary" onclick="decreaseQuantity(${index})">-</button>
        ${item.quantity}
        <button class="btn btn-sm btn-secondary" onclick="increaseQuantity(${index})">+</button>
      </span>
      <button class="btn btn-sm btn-danger mt-2" onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });


  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  document.getElementById('cartTotal').textContent = total.toFixed(2);
}


function increaseQuantity(index) {
  cart[index].quantity++;
  saveCart();
  renderCart();
}


function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {

    cart.splice(index, 1);
  }
  saveCart();
  renderCart();
}


function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}


function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty.');
    return;
  }
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  alert(`Checkout successful! Total amount: Rs${total.toFixed(2)}`);
  cart = [];
  saveCart();
  renderCart();
}


document.getElementById('search').addEventListener('input', filterProducts);
document.getElementById('categoryFilter').addEventListener('change', filterProducts);
document.getElementById('sortBy').addEventListener('change', filterProducts);
document.getElementById('checkoutBtn').addEventListener('click', checkout);

loadCart();
fetchProducts();
renderCart();
