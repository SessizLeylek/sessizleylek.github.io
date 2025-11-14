const supportedLangs = ["en", "tr", "ru"];
const userLangs = navigator.languages.map(l => l.split("-")[0]);
var lang = userLangs.find(l => supportedLangs.includes(l)) || "en";

const selector = document.getElementById('lang-selector');
const currentFlag = document.getElementById('current-flag');
const menu = document.getElementById('flag-menu');

const langChangeCallbacks = [];

function addLangChangeCallback(callback) {
    langChangeCallbacks.push(callback);
}

function removeLangChangeCallback(callback) {
    let index = langChangeCallbacks.indexOf(callback);
    if (index > -1) {
    langChangeCallbacks.splice(index, 1);
    }
}

currentFlag.src = `res/flags/${lang}.png`;

const translate = (key) => dictionary[key][lang];

// Toggle menu
currentFlag.addEventListener('click', () => {
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});

// Handle flag selection
menu.querySelectorAll('img').forEach(flag => {
  flag.addEventListener('click', () => {
    lang = flag.dataset.lang;
    currentFlag.src = `res/flags/${lang}.png`;
    menu.style.display = 'none';

    langChangeCallbacks.forEach(f => f());
  });
});

// close menu if clicking outside
document.addEventListener('click', e => {
  if (!selector.contains(e.target)) {
    menu.style.display = 'none';
  }
});

function localizeNavButtons() {
    const portfolioButton = document.getElementById("nav-portfl");
    const worksButton = document.getElementById("nav-cworks");
    const blogsButton = document.getElementById("nav-bposts");
    const contactButton = document.getElementById("nav-contct");

    portfolioButton.textContent = translate("nav_portfolio");
    worksButton.textContent = translate("nav_works");
    blogsButton.textContent = translate("nav_blogs");
    contactButton.textContent = translate("nav_contact");
}

addLangChangeCallback(localizeNavButtons);
localizeNavButtons();
