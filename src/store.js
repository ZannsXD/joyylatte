// store.js
const productList = document.querySelector('.product-list');
const categoryFilter = document.getElementById('categoryFilter');
let products = [];

fetch('produk.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    generateCategories();
    displayProducts('All');
  });

function generateCategories() {
  const categories = ['All', ...new Set(products.map(p => p.kategori))];
  categoryFilter.innerHTML = '';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.classList.add('category-btn');
    if (cat === 'All') btn.classList.add('active');
    btn.addEventListener('click', () => {
      document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      displayProducts(cat);
    });
    categoryFilter.appendChild(btn);
  });
}

function displayProducts(category) {
  productList.innerHTML = '';
  const filtered = category === 'All'
    ? products
    : products.filter(p => p.kategori === category);

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${p.thumbnail}">
      <h3>${p.nama}</h3>
      <p>${p.desc}</p>
      <button class="openModalBtn"
        data-title="${p.nama}"
        data-price="${p.harga}"
        data-desc="${p.descmodal}"
        data-img="${p.thumbnail}">
        Cek Harga
      </button>
    `;
    productList.appendChild(card);
  });
}
