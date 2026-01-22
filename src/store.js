const productList = document.getElementById('productList');
const categoryFilter = document.getElementById('categoryFilter');
const modal = document.getElementById('productModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const closeBtn = modal.querySelector('.closeBtn');
const backBtn = modal.querySelector('.btn-back');

let products = [];
let categories = [];

// Load products from produk.json
fetch('produk.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    renderCategories();
    renderProducts();
  });

// Render category buttons
function renderCategories() {
  categories = [...new Set(products.map(p => p.kategori))];
  categoryFilter.innerHTML = `<button class="category-btn active" data-cat="all">All</button>`;
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'category-btn';
    btn.textContent = cat;
    btn.setAttribute('data-cat', cat);
    categoryFilter.appendChild(btn);
  });

  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-cat');
      renderProducts(cat);
    });
  });
}

// Render products (optionally filtered by category)
function renderProducts(filter = 'all') {
  productList.innerHTML = '';
  const filtered = filter === 'all' ? products : products.filter(p => p.kategori === filter);
  filtered.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${prod.thumbnail}">
      <h3>${prod.nama}</h3>
      <p>${prod.desc}</p>
      <button class="openModalBtn"
        data-title="${prod.nama}"
        data-price="${prod.harga}"
        data-desc="${prod.descmodal}"
        data-img="${prod.thumbnail}">
        Cek Harga
      </button>
    `;
    productList.appendChild(card);
  });

  const openBtns = document.querySelectorAll('.openModalBtn');
  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalTitle.textContent = btn.getAttribute('data-title');
      modalPrice.textContent = btn.getAttribute('data-price');
      modalDesc.innerHTML = btn.getAttribute('data-desc');
      modalImg.src = btn.getAttribute('data-img');
    });
  });
}

closeBtn.addEventListener('click', () => modal.style.display = 'none');
backBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });