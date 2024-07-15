// checkout.js
document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Giỏ hàng trống</p>';
            return;
        }

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'card mb-3';
            itemElement.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Giá: ${item.price.toLocaleString()}₫</p>
                    <p class="card-text">Số lượng: ${item.quantity}</p>
                    <p class="card-text">Tổng: ${(item.price * item.quantity).toLocaleString()}₫</p>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        updateTotalPrice();
    }

    function updateTotalPrice() {
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        document.getElementById('total-price').textContent = totalPrice.toLocaleString() + '₫';
    }

    document.getElementById('place-order-btn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng.');
            return;
        }

        alert('Bạn hãy chụp lại màn hình này. Trang web sẽ chuyển đến Facebook của chúng tôi.');
        
        // Hiển thị thông tin đơn hàng
        const orderSummary = cart.map(item => `${item.name} x ${item.quantity}: ${(item.price * item.quantity).toLocaleString()}₫`).join('\n');
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        
        alert(`Thông tin đơn hàng của bạn:\n\n${orderSummary}\n\nTổng cộng: ${totalPrice.toLocaleString()}₫`);

        // Đếm ngược 10 giây
        let countdown = 1;
        const countdownInterval = setInterval(() => {
            countdown--;
            if (countdown > 0) {
                alert(`Chuyển hướng sau ${countdown} `);
            } else {
                clearInterval(countdownInterval);
                // Chuyển hướng đến Facebook
                window.location.href = 'https://www.facebook.com/profile.php?id=100004800390296';
            }
        }, 1000);

        // Xóa giỏ hàng
        localStorage.removeItem('cart');
        cart = [];
        renderCartItems();
    });

    renderCartItems();
});