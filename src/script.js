const productList = document.getElementById('productList');
const categoryFilter = document.getElementById('categoryFilter');

/* MODAL */
const modal = document.getElementById('productModal');
const closeBtn = document.querySelector('.closeBtn');
const backBtn = document.querySelector('.btn-back');

const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');

let products = [];

/* LOAD JSON */
fetch('product.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    renderCategories();
  })
  .catch(err => console.error('Gagal load product.json', err));

/* RENDER KATEGORI */
function renderCategories() {
  const categories = [...new Set(products.map(p => p.kategori))];

  categoryFilter.innerHTML = `
    <button class="btn-order" onclick="renderProducts('all')">All</button>
    ${categories.map(cat =>
      `<button class="btn-order" onclick="renderProducts('${cat}')">${cat}</button>`
    ).join('')}
  `;
}

/* RENDER PRODUK */
function renderProducts(category) {
  productList.innerHTML = '';

  const filtered =
    category === 'all'
      ? products
      : products.filter(p => p.kategori === category);

  if (filtered.length === 0) {
    productList.innerHTML = `<p style="text-align:center;">Produk belum tersedia</p>`;
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.gambar}">
      <h3>${product.nama}</h3>
      <p>${product.deskripsi1}</p>
      <button class="openModalBtn">Cek Harga</button>
    `;

    card.querySelector('.openModalBtn').addEventListener('click', () => {
      openModal(product);
    });

    productList.appendChild(card);
  });
}

/* OPEN MODAL */
function openModal(product) {
  modal.style.display = 'flex';
  modalTitle.textContent = product.nama;
  modalPrice.textContent = product.harga;
  modalDesc.innerHTML = product.deskripsi2;
  modalImg.src = product.gambar;
}

/* CLOSE MODAL */
closeBtn.onclick = backBtn.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = e => {
  if (e.target === modal) modal.style.display = 'none';
};