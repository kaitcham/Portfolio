import projectsArray from './data.js';

const body = document.querySelector('body');
const navMenu = document.querySelector('.navbar');
const navIcon = document.querySelector('.fa-bars');
const navLink = Array.from(document.querySelectorAll('.nav-items li a'));

window.displayMenu = () => {
  navMenu.classList.toggle('menu-active');
  navIcon.classList.add('is-active');
  body.style.overflow = 'hidden';
};

window.closeMenu = () => {
  navMenu.classList.toggle('menu-active');
  navIcon.classList.remove('is-active');
  body.style.overflow = 'visible';
};

navLink.forEach.call(navLink, (link) => {
  link.onclick = () => {
    navMenu.classList.toggle('menu-active');
    navIcon.classList.toggle('is-active');
    body.style.overflow = 'visible';
  };
});

const projectCards = document.querySelector('.project');
let htmlCode = '';

projectsArray.forEach((project) => {
  const {
    title, image, imageAlt, info, shortDesc, languages, more,
  } = project;

  if (projectsArray.indexOf(project) % 2 === 0) {
    htmlCode += `
    <div class='card'>
      <div class='card-img'>
        <img src='${image}' alt='${imageAlt}' />
      </div>
      <div class='project-intro'>
        <h2 class='project-title'>${title}</h2>
        <ul class='project-details'>
          ${info
    .map((item) => (item === info[0]
      ? `<li>${item}</li>`
      : `<li class='project-circle'></li><li>${item}</li>`))
    .join('')}
        </ul>
        <p class='project-desc'>
          ${shortDesc}
        </p>
        <ul class='project-tech'>
          ${languages
    .map((item) => `<li class='project-tag'>${item}</li>`)
    .join('')}
        </ul>
        <button id='${title}' type='button' class='project-button' onclick='showPopup("${title}")'>
          ${more}
        </button>
      </div>
    </div>
  `;
  } else {
    htmlCode += `
    <div class='card'>
      <div class='project-intro'>
        <h2 class='project-title'>${title}</h2>
        <ul class='project-details'>
          ${info
    .map((item) => (item === info[0]
      ? `<li>${item}</li>`
      : `<li class='project-circle'></li><li>${item}</li>`))
    .join('')}
        </ul>
        <p class='project-desc'>
          ${shortDesc}
        </p>
        <ul class='project-tech'>
          ${languages
    .map((item) => `<li class='project-tag'>${item}</li>`)
    .join('')}
        </ul>
        <button id='${title}' class='project-button' type='button' onclick='showPopup("${title}")'>
          ${more}
        </button>
      </div>
      <div class='card-img'>
        <img src='${image}' alt='${imageAlt}' />
      </div>
    </div>
  `;
  }
});

projectCards.innerHTML = htmlCode;

const popup = document.querySelector('.showPopup');
let popupCode = '';

window.showPopup = (string) => {
  const project = projectsArray.filter((project) => project.title === string);
  popup.style.display = 'block';
  body.style.overflow = 'hidden';
  project.forEach((elem) => {
    const {
      title, image, imageAlt, info, longDesc, languages,
    } = elem;
    popupCode += `
      <div class='popup-container'>
        <div class='popup'>
        <div class='popup-card'>
            <div class='popup-title'>
              <h2>${title}</h2>
              <p><i class='fa-solid fa-xmark close' onclick='closePopup()'></i></p>
            </div>
            <ul class='project-details'>
          ${info
    .map((item) => (item === info[0]
      ? `<li>${item}</li>`
      : `<li class='project-circle'></li><li>${item}</li>`))
    .join('')}
        </ul>
            <div class='popup-image'>
              <img src='${image}' alt='${imageAlt}' />
            </div>
            <div class='popup-description'>
              <p>
                ${longDesc}
              </p>
              <div class='popup-languages'>
                <ul class='project-tech'>
                  ${languages
    .map((item) => `<li class='project-tag'>${item}</li>`)
    .join('')}
                </ul>
                <hr class='popup-skills' />
                <div class='popup-buttons'>
                  <button class='popup-btn' type='button'>See Live<img src="images/icons/live.svg" alt="see live"/></button>
                  <button class='popup-btn' type='button'>See Source<img src="images/icons/git.png" alt="github"/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  `;
  });
  popup.innerHTML = popupCode;
};

window.closePopup = () => {
  popup.style.display = 'none';
  body.style.overflow = 'visible';
  popupCode = '';
};

const mailInput = document.getElementById('email');
const formSubmit = document.getElementById('form');

window.validateEmail = () => {
  if (mailInput.value.toLowerCase() === mailInput.value) {
    return true;
  }
  document.querySelector('.submit-validation p').style.display = 'block';
  mailInput.addEventListener('click', () => {
    document.querySelector('.submit-validation p').style.display = 'none';
    mailInput.value = '';
  });
  return false;
};

formSubmit.addEventListener('submit', (e) => {
  const valid = window.validateEmail();
  if (!valid) {
    e.preventDefault();
  } else {
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
    };
    localStorage.setItem('formData', JSON.stringify(formData));
  }
});

if (formSubmit) {
  const { name, email, message } = JSON.parse(localStorage.getItem('formData'));
  document.getElementById('name').value = name;
  document.getElementById('email').value = email;
  document.getElementById('message').value = message;
}