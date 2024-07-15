// scripts.js
let products = [
    { id: 1, name: "Buộc tóc màu đỏ dễ thương", price: 25000, image: "picture/item/buoctocdo.jpg" },
    { id: 2, name: "Buộc tóc màu xanh thời trang ", price: 25000, image: "picture/item/buoctoc.jpg" },
    { id: 3, name: "Gương thời trang độc đáo ", price: 120000, image: "picture/item/guong.jpg" },
    { id: 4, name: "Gương xinh màu sắc thời trang ", price: 120000, image: "picture/item/guong2.jpg" },
    { id: 5, name: "Tổng hợp các sản phẩm", price: 160000, image: "picture/item/lonxon.jpg" },
    { id: 6, name: "Kẹp tóc vỏ sò nhỏ thời trang ", price: 25000, image: "picture/item/keptoc.jpg" },
    { id: 7, name: "Kẹp tóc vỏ sò nhỏ thời trang", price: 25000, image: "picture/item/keptoc2.jpg" },
    { id: 8, name: "Kẹp tóc vỏ sò thời trang mẫu 2", price: 25000, image: "picture/item/keptoc3.jpg" },
    { id: 9, name: "Kẹp tóc vỏ sò thời trang mẫu 3", price: 25000, image: "picture/item/keptoc5.jpg" },
    { id: 10, name: "Kẹp tóc vỏ sò thời trang mẫu 3", price: 25000, image: "picture/item/keptoc6.jpg" },
    // Thêm 5 sản phẩm mới
    { id: 11, name: "Buộc tóc màu hồng thời trang", price: 10000, image: "picture/item/buoctochong.jpg" },
    { id: 12, name: "Buộc tóc màu thời trang tự chọn", price: 10000, image: "picture/item/buoctoctuchon.jpg" },
    { id: 13, name: "Buộc tóc màu tím thời trang", price: 10000, image: "picture/item/buoctoctim.jpg" },
    { id: 14, name: "Buộc tóc màu xanh nhạt thời trang", price: 10000, image: "picture/item/buoctocxanhdam.jpg" },
    { id: 15, name: "Buộc tóc màu xanh lá thời trang", price: 10000, image: "picture/item/buoctocxanhla.jpg" },
];

let cart = [];

function renderProducts(productsToRender = products) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';
    productsToRender.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'col';
        productElement.innerHTML = `
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text price">${product.price.toLocaleString()}₫</p>
                    <button onclick="addToCart(${product.id})" class="btn btn-custom">Mua hàng</button>
                </div>
            </div>
        `;
        container.appendChild(productElement);
    });
}



function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
}

document.getElementById('search-btn').addEventListener('click', searchProducts);

document.getElementById('search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchProducts();
    }
});

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartCount();
    }
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

document.getElementById('cart-btn').addEventListener('click', () => {
    // This would typically navigate to a checkout page
    alert('Chuyển đến trang thanh toán');
});

document.getElementById('checkout-link').addEventListener('click', (e) => {
    e.preventDefault();
    // This would typically navigate to a checkout page
    alert('Chuyển đến trang thanh toán');
});



// Initialize the page
renderProducts();
// Thêm vào cuối file scripts.js

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartCount();
        saveCartToLocalStorage();
    }
}

document.getElementById('cart-btn').addEventListener('click', () => {
    window.location.href = 'checkout.html';
});

document.getElementById('checkout-link').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'checkout.html';
});

document.getElementById('home-link').addEventListener('click', function(e) {
    e.preventDefault();
    renderProducts(products);
});