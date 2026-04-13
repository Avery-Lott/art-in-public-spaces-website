// ── Gallery Filter Functionality ──

document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.gallery-card');

  if (!buttons.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active button
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Show/hide cards
      cards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
