// Main JavaScript File

// ==================== Global Variables ====================
let products = [
    { 
        id: '1', 
        name: 'Premium Khejur Ghee Semai', 
        price: 450, 
        images: [
            'https://images.unsplash.com/photo-1606318801954-f46e86d4f81a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1606318801954-f46e86d4f81a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        ],
        category: 'Premium',
        subCategories: ['dates', 'ghee'],
        rating: 4.5, 
        description: 'Traditional Khejur Ghee Semai made with premium quality dates, pure deshi ghee, and fine semai. Perfect for special occasions and festivals.',
        weight: '500g',
        inStock: true
    },
    { 
        id: '2', 
        name: 'Special Eid Pack', 
        price: 850, 
        images: [
            'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1606318801954-f46e86d4f81a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        ],
        category: 'Family',
        subCategories: ['dates', 'honey'],
        rating: 5.0, 
        description: 'Special Eid Pack with extra dates and ghee. Perfect for celebrations.',
        weight: '1kg',
        inStock: true
    },
    { 
        id: '3', 
        name: 'Family Pack', 
        price: 1600, 
        images: [
            'https://images.unsplash.com/photo-1606318801954-f46e86d4f81a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1606318801954-f46e86d4f81a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        ],
        category: 'Family',
        subCategories: ['ghee', 'oil'],
        rating: 4.8, 
        description: 'Family size pack for gatherings.',
        weight: '2kg',
        inStock: true
    },
    { 
        id: '4', 
        name: 'Gift Box', 
        price: 1200, 
        images: [
            'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1606318801954-f46e86d4f81a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        ],
        category: 'Gift',
        subCategories: ['dates', 'honey', 'ghee'],
        rating: 5.0, 
        description: 'Beautifully packaged gift box with premium semai.',
        weight: 'Premium Packaging',
        inStock: true
    },
    { 
        id: '5', 
        name: 'Bulk Order Pack', 
        price: 3800, 
        images: [
            'https://images.unsplash.com/photo-1606318801954-f46e86d4f81a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1606318801954-f46e86d4f81a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        ],
        category: 'Bulk',
        subCategories: ['oil', 'ghee'],
        rating: 4.7, 
        description: 'Bulk pack for events and parties.',
        weight: '5kg',
        inStock: true
    },
    { 
        id: '6', 
        name: 'Ramadan Special', 
        price: 650, 
        images: [
            'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1606318801954-f46e86d4f81a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        ],
        category: 'Ramadan',
        subCategories: ['dates', 'honey'],
        rating: 5.0, 
        description: 'Special Ramadan pack with extra dates.',
        weight: '750g',
        inStock: true
    }
];

// Default reviews for each product
let defaultReviews = {
    '1': [
        { name: 'Rahim Khan', rating: 5, text: 'Excellent quality! The taste is just like homemade.', date: '2024-01-15' },
        { name: 'Salma Begum', rating: 4, text: 'Very good product. My family loved it.', date: '2024-01-10' }
    ],
    '2': [
        { name: 'Karim Ahmed', rating: 5, text: 'Perfect for Eid. Everyone enjoyed it.', date: '2024-01-05' },
        { name: 'Fatema Akter', rating: 5, text: 'Best semai I have ever tasted.', date: '2024-01-01' }
    ],
    '3': [
        { name: 'Nazrul Islam', rating: 4, text: 'Good quantity and taste.', date: '2023-12-28' },
        { name: 'Shahinur Rahman', rating: 5, text: 'Worth the money. Will buy again.', date: '2023-12-20' }
    ],
    '4': [
        { name: 'Tahmina Akter', rating: 5, text: 'Beautiful packaging. Perfect for gift.', date: '2023-12-15' },
        { name: 'Rafiqul Islam', rating: 4, text: 'Nice presentation and taste.', date: '2023-12-10' }
    ],
    '5': [
        { name: 'Habib Rahman', rating: 5, text: 'Great for bulk orders. Fresh product.', date: '2023-12-05' },
        { name: 'Shamima Khatun', rating: 4, text: 'Good quality and timely delivery.', date: '2023-12-01' }
    ],
    '6': [
        { name: 'Mizanur Rahman', rating: 5, text: 'Perfect for Ramadan. Very tasty.', date: '2023-11-25' },
        { name: 'Ayesha Siddika', rating: 5, text: 'Excellent product. Highly recommended.', date: '2023-11-20' }
    ]
};

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let wishlist = [];
if (currentUser) {
    wishlist = JSON.parse(localStorage.getItem(`wishlist_${currentUser.email}`)) || [];
}
let coupons = { 'SAVE10': 10, 'WELCOME5': 5, 'DISCOUNT10': 10 };
let appliedCoupon = null;

// Initialize reviews with default reviews
let reviews = JSON.parse(localStorage.getItem('reviews')) || {};
// Merge default reviews with existing reviews
Object.keys(defaultReviews).forEach(productId => {
    if (!reviews[productId]) {
        reviews[productId] = defaultReviews[productId];
    }
});
localStorage.setItem('reviews', JSON.stringify(reviews));

let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Sample order tracking data with detailed information
let orderTrackingData = {
    'ORD123456': {
        customerName: 'Rahim Khan',
        phone: '01712345678',
        address: '123 Gulshan Avenue, Dhaka',
        orderDate: '2024-01-15 10:30 AM',
        total: 890,
        products: [
            { name: 'Premium Khejur Ghee Semai', quantity: 2, price: 450 }
        ],
        paymentMethod: 'cod',
        status: 'shipped',
        subtotal: 900,
        discount: 90,
        shipping: 80
    },
    'ORD789012': {
        customerName: 'Salma Begum',
        phone: '01812345678',
        address: '456 Chittagong Road, Chittagong',
        orderDate: '2024-01-16 03:20 PM',
        total: 3055,
        products: [
            { name: 'Special Eid Pack', quantity: 1, price: 850 },
            { name: 'Gift Box', quantity: 2, price: 1200 }
        ],
        paymentMethod: 'bkash',
        status: 'processing',
        subtotal: 3250,
        discount: 325,
        shipping: 130
    },
    'ORD345678': {
        customerName: 'Karim Ahmed',
        phone: '01912345678',
        address: '789 Sylhet Road, Sylhet',
        orderDate: '2024-01-10 11:15 AM',
        total: 1730,
        products: [
            { name: 'Family Pack', quantity: 1, price: 1600 }
        ],
        paymentMethod: 'nagad',
        status: 'delivered',
        subtotal: 1600,
        discount: 0,
        shipping: 130
    }
};

// ==================== Utility Functions ====================
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

function updateWishlistIcon() {
    document.querySelectorAll('.wishlist-icon').forEach(icon => {
        if (currentUser) {
            icon.classList.remove('hidden');
        } else {
            icon.classList.add('hidden');
        }
    });
}

// ==================== Header & Sidebar ====================
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');
if (menuBtn) menuBtn.addEventListener('click', () => sidebar.classList.remove('hidden'));
if (closeSidebar) closeSidebar.addEventListener('click', () => sidebar.classList.add('hidden'));

window.addEventListener('click', (e) => {
    if (sidebar && !sidebar.contains(e.target) && !menuBtn?.contains(e.target)) {
        sidebar.classList.add('hidden');
    }
});

document.querySelectorAll('#searchForm').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = form.querySelector('input[name="q"]').value;
        window.location.href = `shop.html?q=${encodeURIComponent(query)}`;
    });
});

// ==================== Slider ====================
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
    
    prevBtn.addEventListener('click', () => {
        currentSlide--;
        showSlide(currentSlide);
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide++;
        showSlide(currentSlide);
    });
    
    setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
}

// ==================== Product Display Helpers ====================
function renderProductCard(product, showAddToCart = true, showWishlist = true) {
    const inWishlist = currentUser && wishlist.some(p => p.id === product.id);
    
    return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition product-card" data-id="${product.id}">
            <div class="cursor-pointer" onclick="window.location.href='product.html?id=${product.id}'">
                <img src="${product.images[0]}" alt="${product.name}" class="w-full h-48 object-cover">
            </div>
            <div class="p-4">
                <div onclick="window.location.href='product.html?id=${product.id}'" class="cursor-pointer">
                    <h3 class="font-semibold text-lg mb-2 product-title">${product.name}</h3>
                    <p class="text-gray-600 text-sm mb-2">${product.weight}</p>
                    <div class="flex items-center mb-2">
                        ${generateStarRating(product.rating)}
                        <span class="text-gray-600 text-sm ml-2">(${product.rating})</span>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-xl font-bold text-amber-800 product-price">৳${product.price}</span>
                    <div class="flex space-x-2">
                        ${showAddToCart ? `<button class="bg-amber-600 text-white px-3 py-1 rounded hover:bg-amber-700 add-to-cart" data-id="${product.id}"><i class="fas fa-shopping-cart"></i></button>` : ''}
                        ${showWishlist ? `<button class="border p-2 rounded hover:bg-gray-100 add-to-wishlist wishlist-icon ${!currentUser ? 'hidden' : ''}" data-id="${product.id}"><i class="fa${inWishlist ? 's' : 'r'} fa-heart text-red-500"></i></button>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (container) {
        container.innerHTML = products.slice(0, 4).map(p => renderProductCard(p)).join('');
    }
    const related = document.getElementById('related-products');
    if (related) {
        related.innerHTML = products.slice(0, 3).map(p => renderProductCard(p, true, false)).join('');
    }
}

// ==================== Shop Page Filters & Sorting ====================
let filteredProducts = [...products];
let currentPage = 1;
const productsPerPage = 6;

function filterProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q')?.toLowerCase() || '';
    const selectedCategories = Array.from(document.querySelectorAll('.filter-category:checked')).map(cb => cb.value);
    const selectedSubCategories = Array.from(document.querySelectorAll('.filter-subcategory:checked')).map(cb => cb.value);
    const maxPrice = document.getElementById('priceRange')?.value || 5000;
    const selectedRatings = Array.from(document.querySelectorAll('.filter-rating:checked')).map(cb => cb.value);

    filteredProducts = products.filter(p => {
        if (searchQuery && !p.name.toLowerCase().includes(searchQuery) && !p.description.toLowerCase().includes(searchQuery)) return false;
        if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;
        if (selectedSubCategories.length) {
            const hasSubCategory = p.subCategories.some(sc => selectedSubCategories.includes(sc));
            if (!hasSubCategory) return false;
        }
        if (p.price > maxPrice) return false;
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
    if (sortBy === 'priceLow') filteredProducts.sort((a, b) => a.price - b.price);
    else if (sortBy === 'priceHigh') filteredProducts.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') filteredProducts.sort((a, b) => b.rating - a.rating);
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
        btn.addEventListener('click', () => {
            currentPage = parseInt(btn.dataset.page);
            renderProductGrid();
        });
    });
}

// ==================== Cart Functionality ====================
document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart')) {
        e.stopPropagation();
        const btn = e.target.closest('.add-to-cart');
        const id = btn.dataset.id;
        const product = products.find(p => p.id === id);
        if (!product) return;
        const existing = cart.find(item => item.id === id);
        if (existing) existing.quantity++;
        else cart.push({ ...product, quantity: 1, images: product.images });
        saveCart();
        showToast('Added to cart!');
    }
});

// ==================== Wishlist Functionality ====================
document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-wishlist')) {
        e.stopPropagation();
        if (!currentUser) {
            showToast('Please login to add to wishlist', 'error');
            window.location.href = 'account.html';
            return;
        }
        const btn = e.target.closest('.add-to-wishlist');
        const id = btn.dataset.id;
        const product = products.find(p => p.id === id);
        const index = wishlist.findIndex(p => p.id === id);
        if (index === -1) {
            wishlist.push(product);
            btn.innerHTML = '<i class="fas fa-heart text-red-500"></i>';
            showToast('Added to wishlist');
        } else {
            wishlist.splice(index, 1);
            btn.innerHTML = '<i class="far fa-heart text-red-500"></i>';
            showToast('Removed from wishlist');
        }
        localStorage.setItem(`wishlist_${currentUser.email}`, JSON.stringify(wishlist));
    }
});

// ==================== Cart Page ====================
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
        container.innerHTML += `
            <div class="flex items-center p-4 border-b" data-id="${item.id}">
                <img src="${item.images[0]}" alt="${item.name}" class="w-20 h-20 object-cover rounded">
                <div class="flex-1 ml-4">
                    <h3 class="font-semibold">${item.name}</h3>
                    <p class="text-sm text-gray-600">${item.weight}</p>
                    <p class="text-amber-800 font-bold">৳${item.price}</p>
                </div>
                <div class="flex items-center border rounded mx-4">
                    <button class="px-3 py-1 border-r cart-decrease" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="w-12 text-center border-0 cart-qty" readonly>
                    <button class="px-3 py-1 border-l cart-increase" data-id="${item.id}">+</button>
                </div>
                <div class="text-right">
                    <p class="font-bold">৳${itemTotal}</p>
                    <button class="text-red-500 text-sm mt-2 remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
    });
    attachCartEvents();
    updateCartSummary();
}

function attachCartEvents() {
    document.querySelectorAll('.cart-increase').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.id;
            const item = cart.find(i => i.id === id);
            if (item) {
                item.quantity++;
                saveCart();
                loadCartPage();
            }
        });
    });
    document.querySelectorAll('.cart-decrease').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.id;
            const item = cart.find(i => i.id === id);
            if (item && item.quantity > 1) {
                item.quantity--;
                saveCart();
                loadCartPage();
            }
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
    if (appliedCoupon) {
        discount = Math.round(subtotal * (appliedCoupon / 100));
        document.getElementById('discountRow').style.display = 'flex';
        document.getElementById('discountAmount').textContent = `-৳${discount}`;
    } else {
        document.getElementById('discountRow').style.display = 'none';
    }
    const shipping = 60;
    const total = subtotal - discount + shipping;
    document.getElementById('cart-subtotal').textContent = `৳${subtotal}`;
    document.getElementById('cart-total').textContent = `৳${total}`;
}

document.getElementById('applyCoupon')?.addEventListener('click', function() {
    const code = document.getElementById('couponCode').value.trim().toUpperCase();
    if (coupons[code]) {
        appliedCoupon = coupons[code];
        document.getElementById('couponMessage').textContent = `Coupon applied: ${code} (${appliedCoupon}% off)`;
        document.getElementById('couponMessage').classList.remove('text-red-600');
        document.getElementById('couponMessage').classList.add('text-green-600');
        updateCartSummary();
    } else {
        document.getElementById('couponMessage').textContent = 'Invalid coupon code';
        document.getElementById('couponMessage').classList.remove('text-green-600');
        document.getElementById('couponMessage').classList.add('text-red-600');
    }
});

// ==================== Checkout Page ====================
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
    cart.forEach(item => {
        summaryContainer.innerHTML += `<div class="flex justify-between"><span>${item.name} × ${item.quantity}</span><span>৳${item.price * item.quantity}</span></div>`;
    });
    
    if (subtotalEl) subtotalEl.textContent = `৳${subtotal}`;
    document.getElementById('order-shipping').textContent = `৳${shippingCost}`;
    if (totalEl) totalEl.textContent = `৳${total}`;
    
    document.querySelectorAll('input[name="shipping"]').forEach(radio => {
        radio.addEventListener('change', loadCheckoutSummary);
    });
}

document.getElementById('checkoutForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showToast('Please login to place order', 'error');
        window.location.href = 'account.html';
        return;
    }
    
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        window.location.href = 'shop.html';
        return;
    }
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    
    if (!firstName || !lastName || !phone || !address) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    const shippingMethod = document.querySelector('input[name="shipping"]:checked').value;
    const shippingCost = shippingMethod === 'inside-dhaka' ? 80 : 130;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let discount = 0;
    if (appliedCoupon) discount = Math.round(subtotal * (appliedCoupon / 100));
    const total = subtotal - discount + shippingCost;
    
    const orderId = 'ORD' + Math.floor(Math.random() * 1000000);
    const orderDate = new Date().toLocaleString();
    
    const order = {
        id: orderId,
        date: orderDate,
        customerName: firstName + ' ' + lastName,
        phone: phone,
        address: address,
        orderNotes: document.getElementById('orderNotes').value,
        paymentMethod: paymentMethod,
        shippingMethod: shippingMethod,
        shippingCost: shippingCost,
        items: [...cart],
        subtotal: subtotal,
        discount: discount,
        total: total,
        status: 'Processing'
    };
    
    const userOrders = JSON.parse(localStorage.getItem(`orders_${currentUser.email}`)) || [];
    userOrders.push(order);
    localStorage.setItem(`orders_${currentUser.email}`, JSON.stringify(userOrders));
    
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    orderTrackingData[orderId] = {
        customerName: order.customerName,
        phone: order.phone,
        address: order.address,
        orderDate: orderDate,
        total: total,
        products: order.items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        paymentMethod: paymentMethod,
        status: 'processing',
        subtotal: subtotal,
        discount: discount,
        shipping: shippingCost
    };
    
    cart = [];
    saveCart();
    appliedCoupon = null;
    
    showToast(`Order placed successfully! Your order ID: ${orderId}`);
    window.location.href = `account.html?tab=orders&orderId=${orderId}`;
});

// ==================== Order Tracking ====================
document.getElementById('trackOrderForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const orderId = document.getElementById('orderId').value.trim().toUpperCase();
    trackOrder(orderId);
});

function trackOrder(orderId) {
    const orderResult = document.getElementById('orderResult');
    
    let order = orderTrackingData[orderId];
    
    if (!order) {
        const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
        order = allOrders.find(o => o.id === orderId);
    }
    
    if (!order) {
        orderResult.innerHTML = '<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Order not found. Please check your order ID.</div>';
        return;
    }
    
    let productsHtml = '';
    order.products.forEach(product => {
        productsHtml += `
            <tr class="border-b">
                <td class="py-2">${product.name}</td>
                <td class="py-2 text-center">${product.quantity}</td>
                <td class="py-2 text-right">৳${product.price}</td>
                <td class="py-2 text-right">৳${product.price * product.quantity}</td>
            </tr>
        `;
    });
    
    const statusClass = order.status === 'delivered' ? 'text-green-600' : 
                       (order.status === 'shipped' ? 'text-blue-600' : 'text-orange-600');
    
    orderResult.innerHTML = `
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-xl font-bold mb-4">Order Details - ${orderId}</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded">
                <div>
                    <p class="mb-1"><span class="font-semibold">Customer Name:</span> ${order.customerName}</p>
                    <p class="mb-1"><span class="font-semibold">Phone Number:</span> ${order.phone}</p>
                    <p class="mb-1"><span class="font-semibold">Delivery Address:</span> ${order.address}</p>
                </div>
                <div>
                    <p class="mb-1"><span class="font-semibold">Order Date:</span> ${order.orderDate || order.date}</p>
                    <p class="mb-1"><span class="font-semibold">Total Amount:</span> ৳${order.total}</p>
                    <p class="mb-1"><span class="font-semibold">Status:</span> <span class="${statusClass} font-semibold">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></p>
                    <p class="mb-1"><span class="font-semibold">Payment Method:</span> ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}</p>
                </div>
            </div>
            
            <h4 class="font-semibold mb-3">Ordered Items:</h4>
            <div class="overflow-x-auto">
                <table class="w-full mb-4">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="py-2 text-left">Product</th>
                            <th class="py-2 text-center">Quantity</th>
                            <th class="py-2 text-right">Unit Price</th>
                            <th class="py-2 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productsHtml}
                    </tbody>
                    <tfoot class="bg-gray-50 font-semibold">
                        <tr>
                            <td colspan="3" class="py-2 text-right">Subtotal:</td>
                            <td class="py-2 text-right">৳${order.subtotal || order.total}</td>
                        </tr>
                        ${order.discount ? `
                        <tr>
                            <td colspan="3" class="py-2 text-right text-green-600">Discount:</td>
                            <td class="py-2 text-right text-green-600">-৳${order.discount}</td>
                        </tr>
                        ` : ''}
                        <tr>
                            <td colspan="3" class="py-2 text-right">Shipping:</td>
                            <td class="py-2 text-right">৳${order.shipping || 0}</td>
                        </tr>
                        <tr class="text-lg">
                            <td colspan="3" class="py-2 text-right">Total:</td>
                            <td class="py-2 text-right font-bold">৳${order.total}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    `;
}

// ==================== Account Page ====================
function initAccountPage() {
    const tabs = document.querySelectorAll('[data-tab]');
    const contents = document.querySelectorAll('.tab-content');
    const urlParams = new URLSearchParams(window.location.search);
    const activeTab = urlParams.get('tab') || (currentUser ? 'profile' : 'login');
    const orderId = urlParams.get('orderId');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            tabs.forEach(t => {
                t.classList.remove('text-amber-600', 'border-b-2', 'border-amber-600');
                t.classList.add('text-gray-600');
            });
            this.classList.add('text-amber-600', 'border-b-2', 'border-amber-600');
            this.classList.remove('text-gray-600');
            contents.forEach(content => content.classList.add('hidden'));
            document.getElementById(tabId).classList.remove('hidden');
            if (tabId === 'wishlist') loadWishlistTab();
            if (tabId === 'orders') {
                loadOrdersTab();
                if (orderId) {
                    document.getElementById('orderId').value = orderId;
                    trackOrder(orderId);
                }
            }
        });
        
        if (tab.dataset.tab === activeTab) {
            tab.classList.add('text-amber-600', 'border-b-2', 'border-amber-600');
            tab.classList.remove('text-gray-600');
        } else {
            tab.classList.add('text-gray-600');
            tab.classList.remove('text-amber-600', 'border-b-2', 'border-amber-600');
        }
    });
    
    contents.forEach(content => {
        content.classList.add('hidden');
    });
    document.getElementById(activeTab)?.classList.remove('hidden');

    if (currentUser) {
        document.querySelector('[data-tab="login"]').style.display = 'none';
        document.querySelector('[data-tab="register"]').style.display = 'none';
        document.getElementById('profileTab').style.display = 'block';
        document.getElementById('profileName').textContent = currentUser.name;
        document.getElementById('profileEmail').textContent = currentUser.email;
        document.getElementById('profilePhone').textContent = currentUser.phone;
        loadWishlistTab();
        loadOrdersTab();
        
        if (activeTab === 'orders' && orderId) {
            document.getElementById('orderId').value = orderId;
            trackOrder(orderId);
        }
    } else {
        document.querySelector('[data-tab="login"]').style.display = 'block';
        document.querySelector('[data-tab="register"]').style.display = 'block';
        document.getElementById('profileTab').style.display = 'none';
    }
}

function loadWishlistTab() {
    const container = document.getElementById('wishlistItems');
    if (!container) return;
    if (wishlist.length === 0) {
        container.innerHTML = '<p class="text-gray-500">Your wishlist is empty.</p>';
        return;
    }
    container.innerHTML = wishlist.map(p => `
        <div class="flex items-center border rounded-lg p-4">
            <img src="${p.images[0]}" alt="${p.name}" class="w-16 h-16 object-cover rounded">
            <div class="ml-4 flex-1">
                <h3 class="font-semibold">${p.name}</h3>
                <p class="text-amber-800 font-bold">৳${p.price}</p>
            </div>
            <button class="text-red-500 hover:text-red-700 remove-wishlist" data-id="${p.id}"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');
    document.querySelectorAll('.remove-wishlist').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.id;
            wishlist = wishlist.filter(p => p.id !== id);
            localStorage.setItem(`wishlist_${currentUser.email}`, JSON.stringify(wishlist));
            loadWishlistTab();
            showToast('Removed from wishlist');
        });
    });
}

function loadOrdersTab() {
    const recentOrders = document.getElementById('recentOrders');
    if (!recentOrders) return;
    const orders = JSON.parse(localStorage.getItem(`orders_${currentUser?.email}`)) || [];
    if (orders.length === 0) {
        recentOrders.innerHTML = '<p>No orders yet.</p>';
        return;
    }
    recentOrders.innerHTML = orders.slice(0, 5).map(order => `
        <div class="border rounded-lg p-4 cursor-pointer hover:shadow-md track-order-btn" data-id="${order.id}">
            <div class="flex justify-between mb-2">
                <span class="font-semibold">Order #${order.id}</span>
                <span class="text-${order.status === 'Delivered' ? 'green' : 'blue'}-600">${order.status}</span>
            </div>
            <p class="text-sm text-gray-600">Placed on: ${order.date}</p>
            <p class="text-sm text-gray-600">Total: ৳${order.total}</p>
            <p class="text-sm text-gray-600">Items: ${order.items.length}</p>
        </div>
    `).join('');
    
    document.querySelectorAll('.track-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.id;
            document.getElementById('orderId').value = orderId;
            trackOrder(orderId);
        });
    });
}

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        wishlist = JSON.parse(localStorage.getItem(`wishlist_${email}`)) || [];
        showToast('Login successful');
        window.location.href = 'account.html?tab=profile';
    } else {
        document.getElementById('loginMessage').textContent = 'Invalid email or password';
    }
});

document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;
    if (password !== confirm) {
        document.getElementById('registerMessage').textContent = 'Passwords do not match';
        return;
    }
    if (users.find(u => u.email === email)) {
        document.getElementById('registerMessage').textContent = 'Email already registered';
        return;
    }
    const newUser = { name, email, phone, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    wishlist = [];
    showToast('Registration successful');
    window.location.href = 'account.html?tab=profile';
});

document.getElementById('logoutBtn')?.addEventListener('click', function() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    wishlist = [];
    showToast('Logged out');
    window.location.href = 'account.html';
});

// ==================== Product Page ====================
function loadProductPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || '1';
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const container = document.getElementById('productDetailContainer');
    if (!container) return;
    
    let mainImage = product.images[0];
    let thumbnails = '';
    product.images.forEach((img, index) => {
        thumbnails += `<img src="${img}" alt="Thumbnail ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage(this.src, ${index})">`;
    });
    
    const inWishlist = currentUser && wishlist.some(p => p.id === product.id);
    const hasPurchased = checkIfUserPurchasedProduct(productId);
    
    container.innerHTML = `
        <div class="product-gallery">
            <img src="${mainImage}" alt="${product.name}" class="main-image" id="mainProductImage">
            <div class="thumbnail-container">
                ${thumbnails}
            </div>
            <div class="share-buttons">
                <button class="share-btn share-facebook" onclick="shareProduct('facebook')"><i class="fab fa-facebook-f"></i></button>
                <button class="share-btn share-twitter" onclick="shareProduct('twitter')"><i class="fab fa-twitter"></i></button>
                <button class="share-btn share-whatsapp" onclick="shareProduct('whatsapp')"><i class="fab fa-whatsapp"></i></button>
                <button class="share-btn share-copy" onclick="copyProductLink()"><i class="fas fa-link"></i></button>
            </div>
        </div>
        <div>
            <h1 class="text-3xl font-bold mb-4">${product.name}</h1>
            <div class="flex items-center mb-4">
                <div class="flex text-yellow-400">${generateStarRating(product.rating)}</div>
                <span class="ml-2 text-gray-600">(${product.rating}) ${getReviewCount(productId)} reviews</span>
            </div>
            <div class="mb-4">
                <span class="text-3xl font-bold text-amber-800">৳${product.price}</span>
                <span class="text-gray-500 line-through ml-2">৳${product.price + 100}</span>
            </div>
            <p class="text-gray-600 mb-6">${product.description}</p>
            <div class="flex items-center space-x-4 mb-6">
                <div class="flex border rounded">
                    <button class="px-3 py-2 border-r" id="decreaseQty">-</button>
                    <input type="number" value="1" min="1" class="w-16 text-center border-0 focus:ring-0" id="quantity">
                    <button class="px-3 py-2 border-l" id="increaseQty">+</button>
                </div>
                <div class="action-buttons">
                    <button class="add-to-cart-btn" id="addToCartBtn"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                    <button class="buy-now-btn" id="buyNowBtn"><i class="fas fa-bolt"></i> Buy Now</button>
                </div>
                <button class="border p-3 rounded-lg hover:bg-gray-100 add-to-wishlist wishlist-icon ${!currentUser ? 'hidden' : ''}" data-id="${product.id}"><i class="fa${inWishlist ? 's' : 'r'} fa-heart text-xl text-red-500"></i></button>
            </div>
            <div class="border-t pt-4">
                <p class="text-sm text-gray-600 mb-2"><span class="font-semibold">Category:</span> ${product.category}</p>
                <p class="text-sm text-gray-600"><span class="font-semibold">Availability:</span> <span class="text-green-600">In Stock</span></p>
            </div>
        </div>
    `;
    
    const decrease = document.getElementById('decreaseQty');
    const increase = document.getElementById('increaseQty');
    const qtyInput = document.getElementById('quantity');
    if (decrease && increase) {
        decrease.addEventListener('click', () => { if (qtyInput.value > 1) qtyInput.value--; });
        increase.addEventListener('click', () => qtyInput.value++);
    }
    
    document.getElementById('addToCartBtn').addEventListener('click', function() {
        const quantity = parseInt(document.getElementById('quantity').value);
        addToCartWithQuantity(product, quantity);
    });
    
    document.getElementById('buyNowBtn').addEventListener('click', function() {
        const quantity = parseInt(document.getElementById('quantity').value);
        addToCartWithQuantity(product, quantity);
        window.location.href = 'checkout.html';
    });
    
    const relatedContainer = document.getElementById('relatedProducts');
    if (relatedContainer) {
        relatedContainer.innerHTML = products.filter(p => p.id !== product.id).slice(0, 4).map(p => renderProductCard(p, true, false)).join('');
    }
    
    loadProductReviews(productId, hasPurchased);
}

function checkIfUserPurchasedProduct(productId) {
    if (!currentUser) return false;
    const userOrders = JSON.parse(localStorage.getItem(`orders_${currentUser.email}`)) || [];
    return userOrders.some(order => 
        order.items.some(item => item.id === productId)
    );
}

function addToCartWithQuantity(product, quantity) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ ...product, quantity: quantity, images: product.images });
    }
    saveCart();
    showToast(`Added ${quantity} item(s) to cart!`);
}

window.changeMainImage = function(src, index) {
    document.getElementById('mainProductImage').src = src;
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
};

window.shareProduct = function(platform) {
    const url = window.location.href;
    const title = document.querySelector('h1').textContent;
    let shareUrl = '';
    
    if (platform === 'facebook') {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === 'twitter') {
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    } else if (platform === 'whatsapp') {
        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
};

window.copyProductLink = function() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('Link copied to clipboard!');
    });
};

function getReviewCount(productId) {
    return (reviews[productId] || []).length;
}

function loadProductReviews(productId, hasPurchased = false) {
    const list = document.getElementById('reviewsList');
    const reviewForm = document.getElementById('reviewForm');
    if (!list) return;
    
    const productReviews = reviews[productId] || [];
    
    if (reviewForm) {
        if (hasPurchased) {
            reviewForm.classList.remove('hidden');
        } else {
            reviewForm.classList.add('hidden');
        }
    }
    
    if (productReviews.length === 0) {
        list.innerHTML = '<p>No reviews yet.</p>';
    } else {
        list.innerHTML = productReviews.map(r => `
            <div class="border-b pb-4">
                <div class="flex items-center mb-2">
                    <div class="flex text-yellow-400">${generateStarRating(r.rating)}</div>
                    <span class="ml-2 font-semibold">${r.name}</span>
                    <span class="ml-auto text-sm text-gray-500">${r.date}</span>
                </div>
                <p class="text-gray-600">${r.text}</p>
            </div>
        `).join('');
    }
}

// Initialize rating stars functionality
function initRatingStars() {
    const stars = document.querySelectorAll('#ratingStars i');
    if (!stars.length) return;
    
    stars.forEach(star => {
        star.addEventListener('mouseenter', function () {
            const rating = parseInt(this.dataset.rating);
            stars.forEach((s, i) => {
                if (i < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });

        star.addEventListener('mouseleave', function () {
            const currentRating = getCurrentRating();
            stars.forEach((s, i) => {
                if (i < currentRating) {
                    s.classList.add('fas');
                    s.classList.remove('far');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });

        star.addEventListener('click', function () {
            const rating = parseInt(this.dataset.rating);
            stars.forEach((s, i) => {
                if (i < rating) {
                    s.classList.add('fas');
                    s.classList.remove('far');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });
}

function getCurrentRating() {
    const stars = document.querySelectorAll('#ratingStars i');
    let rating = 0;
    stars.forEach((star, index) => {
        if (star.classList.contains('fas')) rating = index + 1;
    });
    return rating;
}

document.getElementById('submitReview')?.addEventListener('click', function() {
    if (!currentUser) {
        showToast('Please login to review', 'error');
        return;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || '1';
    
    const hasPurchased = checkIfUserPurchasedProduct(productId);
    if (!hasPurchased) {
        showToast('You can only review products you have purchased', 'error');
        return;
    }
    
    const rating = getCurrentRating();
    
    if (rating === 0) {
        showToast('Please select a rating', 'error');
        return;
    }
    
    const text = document.getElementById('reviewText').value.trim();
    if (!text) {
        showToast('Please write a review', 'error');
        return;
    }
    
    saveReview(productId, rating, text);
});

function saveReview(productId, rating, text) {
    const review = {
        name: currentUser.name,
        rating: rating,
        text: text,
        date: new Date().toLocaleDateString()
    };
    
    if (!reviews[productId]) reviews[productId] = [];
    reviews[productId].push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    
    loadProductReviews(productId, true);
    document.getElementById('reviewText').value = '';
    document.querySelectorAll('#ratingStars i').forEach(s => {
        s.classList.remove('fas');
        s.classList.add('far');
    });
    
    showToast('Review submitted successfully!');
}

// ==================== Initialize based on page ====================
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateWishlistIcon();
    initRatingStars();
    
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        loadFeaturedProducts();
    }
    
    if (window.location.pathname.includes('shop.html')) {
        filterProducts();
        document.getElementById('priceRange')?.addEventListener('input', function() {
            document.getElementById('priceValue').textContent = this.value;
            filterProducts();
        });
        document.querySelectorAll('.filter-category, .filter-rating, .filter-subcategory').forEach(cb => cb.addEventListener('change', filterProducts));
        document.getElementById('sortSelect')?.addEventListener('change', () => { currentPage = 1; filterProducts(); });
        document.getElementById('clearFilters')?.addEventListener('click', function() {
            document.querySelectorAll('.filter-category, .filter-rating, .filter-subcategory').forEach(cb => cb.checked = false);
            document.getElementById('priceRange').value = 5000;
            document.getElementById('priceValue').textContent = 5000;
            filterProducts();
        });
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('q')) {
            filterProducts();
        }
    }
    
    if (window.location.pathname.includes('cart.html')) {
        loadCartPage();
    }
    
    if (window.location.pathname.includes('checkout.html')) {
        loadCheckoutSummary();
    }
    
    if (window.location.pathname.includes('account.html')) {
        initAccountPage();
    }
    
    if (window.location.pathname.includes('product.html')) {
        loadProductPage();
    }
    
    if (window.location.pathname.includes('wishlist.html')) {
        if (!currentUser) {
            window.location.href = 'account.html';
            return;
        }
        const container = document.getElementById('wishlistContainer');
        if (container) {
            if (wishlist.length === 0) container.innerHTML = '<p>Your wishlist is empty.</p>';
            else container.innerHTML = wishlist.map(p => renderProductCard(p, true, false)).join('');
        }
    }
});