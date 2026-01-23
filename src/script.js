const openBtns = document.querySelectorAll('.openModalBtn');
const modal = document.getElementById('productModal');
const closeBtn = document.querySelector('.closeBtn');
const backBtn = document.querySelector('.btn-back');

const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');

openBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.style.display = 'flex';

    modalTitle.textContent = btn.getAttribute('data-title') || '';
    modalPrice.textContent = btn.getAttribute('data-price') || '';

    // FIX: ubah "\n" (teks) jadi baris baru asli
    modalDesc.textContent =
      (btn.getAttribute('data-desc') || '').replace(/\\n/g, '\n');

    modalImg.src = btn.getAttribute('data-img') || '';
  });
});

closeBtn?.addEventListener('click', () => {
  modal.style.display = 'none';
});

backBtn?.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
