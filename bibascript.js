const productList = document.getElementById('productList');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('categoryFilter');
const sortSelect = document.getElementById('sortSelect');
const modal = document.getElementById('modal');
const closeBtn = modal.querySelector('.close');
const subscribeForm = document.getElementById('subscribeForm');

function updateProducts() {
  const searchText = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const sortOption = sortSelect.value;

  let cards = Array.from(productList.querySelectorAll('.card'));

  cards.forEach(card => {
    const title = card.querySelector('.product-title').textContent.toLowerCase();
    const matchesSearch = title.includes(searchText);
    const matchesCategory = (category === 'all' || card.dataset.category === category);
    card.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
  });

  if (sortOption !== 'default') {
    cards.sort((a, b) => {
      const priceA = +a.dataset.price;
      const priceB = +b.dataset.price;
      return sortOption === 'priceAsc' ? priceA - priceB : priceB - priceA;
    });
    cards.forEach(card => productList.appendChild(card));
  }
}

searchInput.addEventListener('input', updateProducts);
categoryFilter.addEventListener('change', updateProducts);
sortSelect.addEventListener('change', updateProducts);

window.onload = () => setTimeout(() => modal.style.display = 'flex', 5000);
closeBtn.addEventListener('click', () => modal.style.display = 'none');

subscribeForm.addEventListener('submit', e => {
  e.preventDefault();
  alert(`Дякуємо, ви підписані: ${subscribeForm.email.value}`);
  modal.style.display = 'none';
});