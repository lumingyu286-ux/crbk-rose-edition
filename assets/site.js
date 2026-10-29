const search = document.querySelector('#site-search');
const filters = [...document.querySelectorAll('.filter')];
const covers = [...document.querySelectorAll('.cover')];
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');
let currentFilter = 'all';

function render() {
  const query = search.value.trim().toLocaleLowerCase('zh-CN');
  let total = 0;
  for (const cover of covers) {
    const matchCategory = currentFilter === 'all' || cover.dataset.category === currentFilter;
    const matchQuery = !query || cover.dataset.search.toLocaleLowerCase('zh-CN').includes(query);
    cover.hidden = !(matchCategory && matchQuery);
    if (!cover.hidden) total += 1;
  }
  resultCount.textContent = `共 ${total} 个网站`;
  emptyState.hidden = total !== 0;
}

for (const filter of filters) {
  filter.addEventListener('click', () => {
    currentFilter = filter.dataset.filter;
    for (const button of filters) {
      const active = button === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    }
    render();
  });
}
search.addEventListener('input', render);
