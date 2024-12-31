// Initialize cart
let cart = [];
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');
const cartItemsElement = document.getElementById('cart-items');

function toggleCart() {
    const cartSection = document.getElementById('cart-section');
    cartSection.style.display = cartSection.style.display === 'none' ? 'block' : 'none';
}

function addToCart(productName, price) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: productName, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    cartCountElement.innerText = cart.reduce((count, item) => count + item.quantity, 0);
    cartTotalElement.innerText = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    renderCartItems();
}

function renderCartItems() {
    cartItemsElement.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerText = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItemsElement.appendChild(cartItem);
    });
}

function clearCart() {
    cart = [];
    updateCart();
}

// Example prices (you can set these to match your actual product prices)
document.querySelectorAll('.product-card').forEach((card, index) => {
    card.querySelector('.ca').addEventListener('click', () => {
        const productName = card.querySelector('h3').innerText;
        const price = 9.99; // Set a default price for each item (you can customize this)
        addToCart(productName, price);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const products = document.querySelectorAll('.product-card');
    
    const observerOptions = {
      threshold: 0.5, 
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);
  
    products.forEach((product) => {
      observer.observe(product);
    });
  });
