// script.js
const modal = document.getElementById('productModal');
const closeBtn = document.querySelector('.closeBtn');
const backBtn = document.querySelector('.btn-back');

const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.openModalBtn');
  if (!btn) return;

  modal.style.display = 'flex';
  modalTitle.textContent = btn.dataset.title || '';
  modalPrice.textContent = btn.dataset.price || '';
  modalDesc.textContent = btn.dataset.desc || '';
  modalImg.src = btn.dataset.img || '';
});

closeBtn.addEventListener('click', () => modal.style.display = 'none');
backBtn.addEventListener('click', () => modal.style.display = 'none');

window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});
