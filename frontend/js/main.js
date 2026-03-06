const API_BASE = window.location.origin.includes('localhost') ? 'http://localhost:5000/api' : 'https://khejur-ghee-semai.onrender.com/api';
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let token = localStorage.getItem('token');
let currentUser = token ? JSON.parse(localStorage.getItem('user')) : null;
let appliedCoupon = null;
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'bg-red-600' : 'bg-green-600'}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = totalItems);
}
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}
function updateUIForUser() {
  const wishlistIcons = document.querySelectorAll('.wishlist-icon');
  if (currentUser) {
    wishlistIcons.forEach(icon => icon.classList.remove('hidden'));
  } else {
    wishlistIcons.forEach(icon => icon.classList.add('hidden'));
  }
}
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateUIForUser();
  loadSharedData();
});
async function loadSharedData() {
  try {
    const productsRes = await fetch(`${API_BASE}/products`);
    window.allProducts = await productsRes.json();
  } catch (err) { console.error(err); }
}
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');
if (menuBtn) menuBtn.addEventListener('click', () => sidebar.classList.remove('hidden'));
if (closeSidebar) closeSidebar.addEventListener('click', () => sidebar.classList.add('hidden'));
window.addEventListener('click', (e) => {
  if (sidebar && !sidebar.contains(e.target) && !menuBtn?.contains(e.target)) sidebar.classList.add('hidden');
});
document.querySelectorAll('#searchForm').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = form.querySelector('input[name="q"]').value;
    window.location.href = `shop.html?q=${encodeURIComponent(query)}`;
  });
});
let currentSlide = 0;
const slides = document.querySelector('.slider-container');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
if (slides && prevBtn && nextBtn) {
  const slideCount = slides.children.length;
  function showSlide(index) {
    if (index >= slideCount) currentSlide = 0;
    if (index < 0) currentSlide = slideCount - 1;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  prevBtn.addEventListener('click', () => { currentSlide--; showSlide(currentSlide); });
  nextBtn.addEventListener('click', () => { currentSlide++; showSlide(currentSlide); });
  setInterval(() => { currentSlide++; showSlide(currentSlide); }, 5000);
}
function renderProductCard(product, showAddToCart = true, showWishlist = true) {
  const inWishlist = false; // will be handled separately
  return `<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition product-card" data-id="${product._id}"><div class="cursor-pointer" onclick="window.location.href='product.html?id=${product._id}'"><img src="${product.images?.[0] || 'https://via.placeholder.com/300'}" alt="${product.name}" class="w-full h-48 object-cover"></div><div class="p-4"><div onclick="window.location.href='product.html?id=${product._id}'" class="cursor-pointer"><h3 class="font-semibold text-lg mb-2 product-title">${product.name}</h3><p class="text-gray-600 text-sm mb-2">${product.weight || ''}</p><div class="flex items-center mb-2">${generateStarRating(product.rating)}<span class="text-gray-600 text-sm ml-2">(${product.rating})</span></div></div><div class="flex justify-between items-center"><span class="text-xl font-bold text-amber-800 product-price">৳${product.price}</span><div class="flex space-x-2">${showAddToCart ? `<button class="bg-amber-600 text-white px-3 py-1 rounded hover:bg-amber-700 add-to-cart" data-id="${product._id}"><i class="fas fa-shopping-cart"></i></button>` : ''}${showWishlist ? `<button class="border p-2 rounded hover:bg-gray-100 add-to-wishlist wishlist-icon ${!currentUser ? 'hidden' : ''}" data-id="${product._id}"><i class="far fa-heart text-red-500"></i></button>` : ''}</div></div></div></div>`;
}
function generateStarRating(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars += '<i class="fas fa-star"></i>';
    else if (i === Math.ceil(rating) && rating % 1 !== 0) stars += '<i class="fas fa-star-half-alt"></i>';
    else stars += '<i class="far fa-star"></i>';
  }
  return stars;
}
if (document.getElementById('featured-products')) {
  fetch(`${API_BASE}/products`).then(res => res.json()).then(products => {
    document.getElementById('featured-products').innerHTML = products.slice(0,4).map(p => renderProductCard(p)).join('');
  });
}
if (document.getElementById('related-products')) {
  fetch(`${API_BASE}/products`).then(res => res.json()).then(products => {
    document.getElementById('related-products').innerHTML = products.slice(0,3).map(p => renderProductCard(p, true, false)).join('');
  });
}
document.addEventListener('click', (e) => {
  if (e.target.closest('.add-to-cart')) {
    e.stopPropagation();
    const btn = e.target.closest('.add-to-cart');
    const id = btn.dataset.id;
    const product = window.allProducts?.find(p => p._id === id);
    if (!product) return;
    const existing = cart.find(item => item.id === id);
    if (existing) existing.quantity++;
    else cart.push({ ...product, id: product._id, quantity: 1, images: product.images });
    saveCart();
    showToast('Added to cart!');
  }
  if (e.target.closest('.add-to-wishlist')) {
    e.stopPropagation();
    if (!currentUser) { showToast('Please login to add to wishlist', 'error'); window.location.href = 'account.html'; return; }
    const btn = e.target.closest('.add-to-wishlist');
    const id = btn.dataset.id;
    fetch(`${API_BASE}/user/wishlist/${id}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(res => {
      if (res.ok) {
        btn.innerHTML = '<i class="fas fa-heart text-red-500"></i>';
        showToast('Added to wishlist');
      } else if (res.status === 400) {
        showToast('Already in wishlist', 'error');
      } else {
        showToast('Error', 'error');
      }
    }).catch(() => showToast('Error', 'error'));
  }
});
function initShopPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('q')?.toLowerCase() || '';
  let filteredProducts = [];
  let currentPage = 1;
  const productsPerPage = 6;
  async function filterAndRender() {
    const res = await fetch(`${API_BASE}/products`);
    const all = await res.json();
    filteredProducts = all.filter(p => {
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery) && !p.description?.toLowerCase().includes(searchQuery)) return false;
      const selectedCategories = Array.from(document.querySelectorAll('.filter-category:checked')).map(cb => cb.value);
      if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;
      const selectedSubCategories = Array.from(document.querySelectorAll('.filter-subcategory:checked')).map(cb => cb.value);
      if (selectedSubCategories.length && !p.subCategories?.some(sc => selectedSubCategories.includes(sc))) return false;
      const maxPrice = document.getElementById('priceRange')?.value || 5000;
      if (p.price > maxPrice) return false;
      const selectedRatings = Array.from(document.querySelectorAll('.filter-rating:checked')).map(cb => cb.value);
      if (selectedRatings.length) {
        if (selectedRatings.includes('5') && p.rating < 5) return false;
        if (selectedRatings.includes('4') && p.rating < 4) return false;
        if (selectedRatings.includes('3') && p.rating < 3) return false;
      }
      return true;
    });
    applySort();
    renderProductGrid();
  }
  function applySort() {
    const sortBy = document.getElementById('sortSelect')?.value;
    if (sortBy === 'priceLow') filteredProducts.sort((a,b) => a.price - b.price);
    else if (sortBy === 'priceHigh') filteredProducts.sort((a,b) => b.price - a.price);
    else if (sortBy === 'rating') filteredProducts.sort((a,b) => b.rating - a.rating);
  }
  function renderProductGrid() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const pageProducts = filteredProducts.slice(start, end);
    grid.innerHTML = pageProducts.map(p => renderProductCard(p)).join('');
    renderPagination();
  }
  function renderPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    let html = '';
    for (let i = 1; i <= totalPages; i++) {
      html += `<button class="px-4 py-2 border rounded hover:bg-amber-600 hover:text-white ${i === currentPage ? 'bg-amber-600 text-white' : ''}" data-page="${i}">${i}</button>`;
    }
    pagination.innerHTML = html;
    pagination.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => { currentPage = parseInt(btn.dataset.page); renderProductGrid(); });
    });
  }
  filterAndRender();
  document.getElementById('priceRange')?.addEventListener('input', function() {
    document.getElementById('priceValue').textContent = this.value;
    filterAndRender();
  });
  document.querySelectorAll('.filter-category, .filter-rating, .filter-subcategory').forEach(cb => cb.addEventListener('change', filterAndRender));
  document.getElementById('sortSelect')?.addEventListener('change', () => { currentPage = 1; filterAndRender(); });
  document.getElementById('clearFilters')?.addEventListener('click', function() {
    document.querySelectorAll('.filter-category, .filter-rating, .filter-subcategory').forEach(cb => cb.checked = false);
    document.getElementById('priceRange').value = 5000;
    document.getElementById('priceValue').textContent = 5000;
    filterAndRender();
  });
}
if (window.location.pathname.includes('shop.html')) initShopPage();
function loadCartPage() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = '<div class="p-8 text-center text-gray-500">Your cart is empty.</div>';
    updateCartSummary();
    return;
  }
  container.innerHTML = '';
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    container.innerHTML += `<div class="flex items-center p-4 border-b" data-id="${item.id}"><img src="${item.images[0]}" alt="${item.name}" class="w-20 h-20 object-cover rounded"><div class="flex-1 ml-4"><h3 class="font-semibold">${item.name}</h3><p class="text-sm text-gray-600">${item.weight}</p><p class="text-amber-800 font-bold">৳${item.price}</p></div><div class="flex items-center border rounded mx-4"><button class="px-3 py-1 border-r cart-decrease" data-id="${item.id}">-</button><input type="number" value="${item.quantity}" min="1" class="w-12 text-center border-0 cart-qty" readonly><button class="px-3 py-1 border-l cart-increase" data-id="${item.id}">+</button></div><div class="text-right"><p class="font-bold">৳${itemTotal}</p><button class="text-red-500 text-sm mt-2 remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button></div></div>`;
  });
  attachCartEvents();
  updateCartSummary();
}
function attachCartEvents() {
  document.querySelectorAll('.cart-increase').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.dataset.id;
      const item = cart.find(i => i.id === id);
      if (item) { item.quantity++; saveCart(); loadCartPage(); }
    });
  });
  document.querySelectorAll('.cart-decrease').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.dataset.id;
      const item = cart.find(i => i.id === id);
      if (item && item.quantity > 1) { item.quantity--; saveCart(); loadCartPage(); }
    });
  });
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.dataset.id;
      cart = cart.filter(i => i.id !== id);
      saveCart();
      loadCartPage();
      showToast('Item removed');
    });
  });
}
function updateCartSummary() {
  let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;
  if (appliedCoupon) { discount = Math.round(subtotal * (appliedCoupon / 100)); document.getElementById('discountRow').style.display = 'flex'; document.getElementById('discountAmount').textContent = `-৳${discount}`; }
  else document.getElementById('discountRow').style.display = 'none';
  const shipping = 60;
  const total = subtotal - discount + shipping;
  document.getElementById('cart-subtotal').textContent = `৳${subtotal}`;
  document.getElementById('cart-total').textContent = `৳${total}`;
}
document.getElementById('applyCoupon')?.addEventListener('click', async function() {
  const code = document.getElementById('couponCode').value.trim().toUpperCase();
  try {
    const res = await fetch(`${API_BASE}/coupons`);
    const coupons = await res.json();
    const found = coupons.find(c => c.code === code && c.active && (!c.expiry || new Date(c.expiry) > new Date()));
    if (found) {
      appliedCoupon = found.discount;
      document.getElementById('couponMessage').textContent = `Coupon applied: ${code} (${appliedCoupon}% off)`;
      document.getElementById('couponMessage').classList.remove('text-red-600'); document.getElementById('couponMessage').classList.add('text-green-600');
      updateCartSummary();
    } else {
      document.getElementById('couponMessage').textContent = 'Invalid coupon code';
      document.getElementById('couponMessage').classList.remove('text-green-600'); document.getElementById('couponMessage').classList.add('text-red-600');
    }
  } catch (err) { console.error(err); }
});
function loadCheckoutSummary() {
  const summaryContainer = document.getElementById('order-summary-items');
  const subtotalEl = document.getElementById('order-subtotal');
  const totalEl = document.getElementById('order-total');
  if (!summaryContainer) return;
  let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;
  if (appliedCoupon) discount = Math.round(subtotal * (appliedCoupon / 100));
  const shippingMethod = document.querySelector('input[name="shipping"]:checked')?.value || 'inside-dhaka';
  const shippingCost = shippingMethod === 'inside-dhaka' ? 80 : 130;
  const total = subtotal - discount + shippingCost;
  summaryContainer.innerHTML = '';
  cart.forEach(item => { summaryContainer.innerHTML += `<div class="flex justify-between"><span>${item.name} × ${item.quantity}</span><span>৳${item.price * item.quantity}</span></div>`; });
  if (subtotalEl) subtotalEl.textContent = `৳${subtotal}`;
  document.getElementById('order-shipping').textContent = `৳${shippingCost}`;
  if (totalEl) totalEl.textContent = `৳${total}`;
  document.querySelectorAll('input[name="shipping"]').forEach(radio => { radio.addEventListener('change', loadCheckoutSummary); });
}
document.getElementById('checkoutForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  if (!currentUser) { showToast('Please login to place order', 'error'); window.location.href = 'account.html'; return; }
  if (cart.length === 0) { showToast('Your cart is empty', 'error'); window.location.href = 'shop.html'; return; }
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  if (!firstName || !lastName || !phone || !address) { showToast('Please fill in all required fields', 'error'); return; }
  const shippingMethod = document.querySelector('input[name="shipping"]:checked').value;
  const shippingCost = shippingMethod === 'inside-dhaka' ? 80 : 130;
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;
  if (appliedCoupon) discount = Math.round(subtotal * (appliedCoupon / 100));
  const total = subtotal - discount + shippingCost;
  const orderData = {
    customerName: firstName + ' ' + lastName,
    phone,
    address,
    orderNotes: document.getElementById('orderNotes').value,
    paymentMethod,
    shippingMethod,
    shippingCost,
    items: cart.map(item => ({ product: item.id, name: item.name, price: item.price, quantity: item.quantity })),
    subtotal,
    discount,
    total
  };
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(orderData)
    });
    if (res.ok) {
      cart = []; saveCart(); appliedCoupon = null;
      showToast('Order placed successfully!');
      window.location.href = 'account.html?tab=orders';
    } else { showToast('Order failed', 'error'); }
  } catch (err) { showToast('Server error', 'error'); }
});
function initAccountPage() {
  const tabs = document.querySelectorAll('[data-tab]');
  const contents = document.querySelectorAll('.tab-content');
  const urlParams = new URLSearchParams(window.location.search);
  const activeTab = urlParams.get('tab') || (currentUser ? 'profile' : 'login');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabId = this.dataset.tab;
      tabs.forEach(t => { t.classList.remove('text-amber-600', 'border-b-2', 'border-amber-600'); t.classList.add('text-gray-600'); });
      this.classList.add('text-amber-600', 'border-b-2', 'border-amber-600'); this.classList.remove('text-gray-600');
      contents.forEach(content => content.classList.add('hidden'));
      document.getElementById(tabId).classList.remove('hidden');
      if (tabId === 'wishlist') loadWishlistTab();
      if (tabId === 'orders') loadOrdersTab();
    });
    if (tab.dataset.tab === activeTab) {
      tab.classList.add('text-amber-600', 'border-b-2', 'border-amber-600'); tab.classList.remove('text-gray-600');
    } else {
      tab.classList.add('text-gray-600'); tab.classList.remove('text-amber-600', 'border-b-2', 'border-amber-600');
    }
  });
  contents.forEach(content => content.classList.add('hidden'));
  document.getElementById(activeTab)?.classList.remove('hidden');
  if (currentUser) {
    document.querySelector('[data-tab="login"]').style.display = 'none';
    document.querySelector('[data-tab="register"]').style.display = 'none';
    document.getElementById('profileTab').style.display = 'block';
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profilePhone').textContent = currentUser.phone;
    if (activeTab === 'wishlist') loadWishlistTab();
    if (activeTab === 'orders') loadOrdersTab();
  } else {
    document.querySelector('[data-tab="login"]').style.display = 'block';
    document.querySelector('[data-tab="register"]').style.display = 'block';
    document.getElementById('profileTab').style.display = 'none';
  }
}
async function loadWishlistTab() {
  const container = document.getElementById('wishlistItems');
  if (!container) return;
  try {
    const res = await fetch(`${API_BASE}/user/wishlist`, { headers: { 'Authorization': `Bearer ${token}` } });
    const wishlist = await res.json();
    if (wishlist.length === 0) { container.innerHTML = '<p class="text-gray-500">Your wishlist is empty.</p>'; return; }
    container.innerHTML = wishlist.map(p => `<div class="flex items-center border rounded-lg p-4"><img src="${p.images[0]}" alt="${p.name}" class="w-16 h-16 object-cover rounded"><div class="ml-4 flex-1"><h3 class="font-semibold">${p.name}</h3><p class="text-amber-800 font-bold">৳${p.price}</p></div><button class="text-red-500 hover:text-red-700 remove-wishlist" data-id="${p._id}"><i class="fas fa-trash"></i></button></div>`).join('');
    document.querySelectorAll('.remove-wishlist').forEach(btn => {
      btn.addEventListener('click', async function() {
        const id = this.dataset.id;
        await fetch(`${API_BASE}/user/wishlist/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
        loadWishlistTab();
        showToast('Removed from wishlist');
      });
    });
  } catch (err) { console.error(err); }
}
async function loadOrdersTab() {
  const recentOrders = document.getElementById('recentOrders');
  if (!recentOrders) return;
  try {
    const res = await fetch(`${API_BASE}/orders/user`, { headers: { 'Authorization': `Bearer ${token}` } });
    const orders = await res.json();
    if (orders.length === 0) { recentOrders.innerHTML = '<p>No orders yet.</p>'; return; }
    recentOrders.innerHTML = orders.slice(0,5).map(order => `<div class="border rounded-lg p-4 cursor-pointer hover:shadow-md" onclick="viewOrderDetails('${order._id}')"><div class="flex justify-between mb-2"><span class="font-semibold">Order #${order.orderId || order._id.slice(-6)}</span><span class="text-${order.status === 'Delivered' ? 'green' : 'blue'}-600">${order.status}</span></div><p class="text-sm text-gray-600">Placed on: ${new Date(order.createdAt).toLocaleDateString()}</p><p class="text-sm text-gray-600">Total: ৳${order.total}</p><p class="text-sm text-gray-600">Items: ${order.items.length}</p></div>`).join('');
  } catch (err) { console.error(err); }
}
window.viewOrderDetails = async (id) => {
  const orderIdInput = document.getElementById('orderId');
  if (orderIdInput) { orderIdInput.value = id; document.querySelector('[data-tab="orders"]')?.click(); }
};
document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  try {
    const res = await fetch(`${API_BASE}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (res.ok) {
      token = data.token; currentUser = data.user;
      localStorage.setItem('token', token); localStorage.setItem('user', JSON.stringify(currentUser));
      showToast('Login successful'); window.location.href = 'account.html?tab=profile';
    } else { document.getElementById('loginMessage').textContent = data.message; }
  } catch (err) { document.getElementById('loginMessage').textContent = 'Server error'; }
});
document.getElementById('registerForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const phone = document.getElementById('regPhone').value;
  const password = document.getElementById('regPassword').value;
  const confirm = document.getElementById('regConfirm').value;
  if (password !== confirm) { document.getElementById('registerMessage').textContent = 'Passwords do not match'; return; }
  try {
    const res = await fetch(`${API_BASE}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password, phone }) });
    const data = await res.json();
    if (res.ok) {
      token = data.token; currentUser = data.user;
      localStorage.setItem('token', token); localStorage.setItem('user', JSON.stringify(currentUser));
      showToast('Registration successful'); window.location.href = 'account.html?tab=profile';
    } else { document.getElementById('registerMessage').textContent = data.message; }
  } catch (err) { document.getElementById('registerMessage').textContent = 'Server error'; }
});
document.getElementById('logoutBtn')?.addEventListener('click', function() {
  currentUser = null; token = null;
  localStorage.removeItem('token'); localStorage.removeItem('user');
  showToast('Logged out'); window.location.href = 'account.html';
});
async function loadProductPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  if (!productId) return;
  try {
    const productRes = await fetch(`${API_BASE}/products/${productId}`);
    const product = await productRes.json();
    const container = document.getElementById('productDetailContainer');
    if (!container) return;
    const mainImage = product.images[0];
    let thumbnails = '';
    product.images.forEach((img, index) => { thumbnails += `<img src="${img}" alt="Thumbnail ${index+1}" class="thumbnail ${index===0?'active':''}" onclick="changeMainImage(this.src, ${index})">`; });
    container.innerHTML = `<div class="product-gallery"><img src="${mainImage}" alt="${product.name}" class="main-image" id="mainProductImage"><div class="thumbnail-container">${thumbnails}</div><div class="share-buttons"><button class="share-btn share-facebook" onclick="shareProduct('facebook')"><i class="fab fa-facebook-f"></i></button><button class="share-btn share-twitter" onclick="shareProduct('twitter')"><i class="fab fa-twitter"></i></button><button class="share-btn share-whatsapp" onclick="shareProduct('whatsapp')"><i class="fab fa-whatsapp"></i></button><button class="share-btn share-copy" onclick="copyProductLink()"><i class="fas fa-link"></i></button></div></div><div><h1 class="text-3xl font-bold mb-4">${product.name}</h1><div class="flex items-center mb-4"><div class="flex text-yellow-400">${generateStarRating(product.rating)}</div><span class="ml-2 text-gray-600">(${product.rating}) <span id="reviewCount"></span> reviews</span></div><div class="mb-4"><span class="text-3xl font-bold text-amber-800">৳${product.price}</span><span class="text-gray-500 line-through ml-2">৳${product.price+100}</span></div><p class="text-gray-600 mb-6">${product.description}</p><div class="flex items-center space-x-4 mb-6"><div class="flex border rounded"><button class="px-3 py-2 border-r" id="decreaseQty">-</button><input type="number" value="1" min="1" class="w-16 text-center border-0 focus:ring-0" id="quantity"><button class="px-3 py-2 border-l" id="increaseQty">+</button></div><div class="action-buttons"><button class="add-to-cart-btn" id="addToCartBtn"><i class="fas fa-shopping-cart"></i> Add to Cart</button><button class="buy-now-btn" id="buyNowBtn"><i class="fas fa-bolt"></i> Buy Now</button></div><button class="border p-3 rounded-lg hover:bg-gray-100 add-to-wishlist wishlist-icon ${!currentUser ? 'hidden' : ''}" data-id="${product._id}"><i class="far fa-heart text-xl text-red-500"></i></button></div><div class="border-t pt-4"><p class="text-sm text-gray-600 mb-2"><span class="font-semibold">Category:</span> ${product.category}</p><p class="text-sm text-gray-600"><span class="font-semibold">Availability:</span> <span class="text-green-600">In Stock</span></p></div></div>`;
    document.getElementById('decreaseQty').addEventListener('click', () => { const qty = document.getElementById('quantity'); if (qty.value > 1) qty.value--; });
    document.getElementById('increaseQty').addEventListener('click', () => { const qty = document.getElementById('quantity'); qty.value++; });
    document.getElementById('addToCartBtn').addEventListener('click', function() {
      const quantity = parseInt(document.getElementById('quantity').value);
      const existing = cart.find(item => item.id === product._id);
      if (existing) existing.quantity += quantity;
      else cart.push({ ...product, id: product._id, quantity, images: product.images });
      saveCart();
      showToast(`Added ${quantity} item(s) to cart!`);
    });
    document.getElementById('buyNowBtn').addEventListener('click', function() {
      const quantity = parseInt(document.getElementById('quantity').value);
      const existing = cart.find(item => item.id === product._id);
      if (existing) existing.quantity += quantity;
      else cart.push({ ...product, id: product._id, quantity, images: product.images });
      saveCart();
      window.location.href = 'checkout.html';
    });
    const reviewsRes = await fetch(`${API_BASE}/reviews/product/${productId}`);
    const reviews = await reviewsRes.json();
    document.getElementById('reviewCount').textContent = reviews.length;
    const reviewsList = document.getElementById('reviewsList');
    if (reviewsList) {
      if (reviews.length === 0) reviewsList.innerHTML = '<p>No reviews yet.</p>';
      else reviewsList.innerHTML = reviews.map(r => `<div class="border-b pb-4"><div class="flex items-center mb-2"><div class="flex text-yellow-400">${generateStarRating(r.rating)}</div><span class="ml-2 font-semibold">${r.name}</span><span class="ml-auto text-sm text-gray-500">${r.date}</span></div><p class="text-gray-600">${r.text}</p></div>`).join('');
    }
    const relatedRes = await fetch(`${API_BASE}/products`);
    const allProducts = await relatedRes.json();
    const relatedContainer = document.getElementById('relatedProducts');
    if (relatedContainer) {
      relatedContainer.innerHTML = allProducts.filter(p => p._id !== product._id).slice(0,4).map(p => renderProductCard(p, true, false)).join('');
    }
  } catch (err) { console.error(err); }
}
if (window.location.pathname.includes('product.html')) loadProductPage();
window.changeMainImage = function(src, index) {
  document.getElementById('mainProductImage').src = src;
  document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
    if (i === index) thumb.classList.add('active');
    else thumb.classList.remove('active');
  });
};
window.shareProduct = function(platform) {
  const url = window.location.href;
  const title = document.querySelector('h1').textContent;
  let shareUrl = '';
  if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  else if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  else if (platform === 'whatsapp') shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
  if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400');
};
window.copyProductLink = function() {
  navigator.clipboard.writeText(window.location.href).then(() => showToast('Link copied to clipboard!'));
};
document.getElementById('submitReview')?.addEventListener('click', async function() {
  if (!currentUser) { showToast('Please login to review', 'error'); return; }
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const rating = getCurrentRating();
  if (rating === 0) { showToast('Please select a rating', 'error'); return; }
  const text = document.getElementById('reviewText').value.trim();
  if (!text) { showToast('Please write a review', 'error'); return; }
  try {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ productId, rating, text })
    });
    if (res.ok) {
      showToast('Review submitted');
      document.getElementById('reviewText').value = '';
      document.querySelectorAll('#ratingStars i').forEach(s => { s.classList.remove('fas'); s.classList.add('far'); });
      loadProductPage();
    } else { showToast('Failed to submit review', 'error'); }
  } catch (err) { showToast('Server error', 'error'); }
});
function getCurrentRating() {
  let rating = 0;
  document.querySelectorAll('#ratingStars i').forEach((star, index) => { if (star.classList.contains('fas')) rating = index + 1; });
  return rating;
}
if (document.getElementById('ratingStars')) {
  const stars = document.querySelectorAll('#ratingStars i');
  stars.forEach(star => {
    star.addEventListener('mouseenter', function () {
      const rating = parseInt(this.dataset.rating);
      stars.forEach((s, i) => {
        if (i < rating) { s.classList.remove('far'); s.classList.add('fas'); }
        else { s.classList.remove('fas'); s.classList.add('far'); }
      });
    });
    star.addEventListener('mouseleave', function () {
      const current = getCurrentRating();
      stars.forEach((s, i) => {
        if (i < current) { s.classList.add('fas'); s.classList.remove('far'); }
        else { s.classList.remove('fas'); s.classList.add('far'); }
      });
    });
    star.addEventListener('click', function () {
      const rating = parseInt(this.dataset.rating);
      stars.forEach((s, i) => {
        if (i < rating) { s.classList.add('fas'); s.classList.remove('far'); }
        else { s.classList.remove('fas'); s.classList.add('far'); }
      });
    });
  });
}
if (window.location.pathname.includes('cart.html')) loadCartPage();
if (window.location.pathname.includes('checkout.html')) loadCheckoutSummary();
if (window.location.pathname.includes('account.html')) initAccountPage();
if (window.location.pathname.includes('wishlist.html')) {
  if (!currentUser) { window.location.href = 'account.html'; }
  else {
    fetch(`${API_BASE}/user/wishlist`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.json()).then(wishlist => {
      const container = document.getElementById('wishlistContainer');
      if (container) {
        if (wishlist.length === 0) container.innerHTML = '<p>Your wishlist is empty.</p>';
        else container.innerHTML = wishlist.map(p => renderProductCard(p, true, false)).join('');
      }
    });
  }
}