const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

const filters = [...document.querySelectorAll('.filter')];
const cards = [...document.querySelectorAll('.dish-card')];
const menuSearch = document.getElementById('menuSearch');
const noResults = document.getElementById('noResults');
let activeFilter = 'all';
function updateMenu() {
  const query = menuSearch.value.trim().toLowerCase();
  let shown = 0;
  cards.forEach(card => {
    const categoryMatches = activeFilter === 'all' || card.dataset.category === activeFilter;
    const searchMatches = card.dataset.name.includes(query) || card.querySelector('h3').textContent.toLowerCase().includes(query);
    card.hidden = !(categoryMatches && searchMatches);
    if (!card.hidden) shown++;
  });
  noResults.hidden = shown !== 0;
}
filters.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filters.forEach(item => item.classList.toggle('active', item === button));
  updateMenu();
}));
menuSearch.addEventListener('input', updateMenu);

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('newsletterForm').addEventListener('submit', event => {
  event.preventDefault();
  const email = document.getElementById('emailAddress');
  document.getElementById('newsletterMessage').textContent =
    `Thanks! ${email.value} passed the demo form validation. Connect a mailing-list service to save subscriptions.`;
  email.value = '';
});
document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = `Demo message prepared for Punjabi Tadka Kitchen\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nTopic: ${data.get('reason')}\nMessage: ${data.get('message')}`;
  const blob = new Blob([message], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'punjabi-tadka-enquiry-demo.txt';
  a.click();
  URL.revokeObjectURL(url);
  document.getElementById('contactMessage').textContent =
    'A demo enquiry text file was prepared for download. This form does not email the restaurant.';
});
