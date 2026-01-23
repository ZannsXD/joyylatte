const categoryFilter = document.getElementById('categoryFilter');
const productList = document.querySelector('.product-list');

const modal = document.getElementById('productModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const closeBtn = document.querySelector('.closeBtn');
const backBtn = document.querySelector('.btn-back');
const continueOrder = document.getElementById('continueOrder');

let products = [];
let currentCategory = 'All';

fetch('produk.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    createCategories();
    displayProducts();
  });

function createCategories() {
  const categories = ['All', ...new Set(products.map(p => p.kategori))];
  categoryFilter.innerHTML = '';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'category-btn';
    if (cat === 'All') btn.classList.add('active');
    btn.textContent = cat;
    btn.onclick = () => {
      currentCategory = cat;
      document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      displayProducts();
    };
    categoryFilter.appendChild(btn);
  });
}

function displayProducts() {
  productList.innerHTML = '';
  const filtered = currentCategory === 'All'
    ? products
    : products.filter(p => p.kategori === currentCategory);

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.thumbnail}">
      <h3>${p.nama}</h3>
      <p>${p.harga}</p>
      <button class="openModalBtn">Cek Detail</button>
    `;
    card.querySelector('button').onclick = () => openModal(p);
    productList.appendChild(card);
  });
}

function openModal(p) {
  modal.style.display = 'flex';
  modalImg.src = p.thumbnail;
  modalTitle.textContent = p.nama;
  modalPrice.textContent = p.harga;
  modalDesc.innerHTML = p.descmodal.replace(/\n/g, '<br>');
}

closeBtn.onclick = backBtn.onclick = () => modal.style.display = 'none';

continueOrder.onclick = () => {
  const params = new URLSearchParams({
    product: modalTitle.textContent
  });
  window.location.href = `checkout.html?${params.toString()}`;
};
