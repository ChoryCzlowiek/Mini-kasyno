// Navigation

const navBoxLeft = document.querySelector('.navigation-box-left');
const navBoxRight = document.querySelector('.navigation-box-right');
const main = document.querySelector('.main');
const crossLeft = document.querySelector('.navigation-box-left__cross');
const crossRight = document.querySelector('.navigation-box-right__cross');
const hamburger = document.querySelector('.navbar__icon');
const loginIcon = document.querySelector('.navbar__icon--login');

function addLeftNav() {
    navBoxLeft.classList.add('navigation-box-left--active');
    main.classList.add('main--active-left');
    navBoxRight.classList.remove('navigation-box-right--active');
    main.classList.remove('main--active-right');
}

function removeLeftNav() {
    navBoxLeft.classList.remove('navigation-box-left--active');
    main.classList.remove('main--active-left');
}

function addRightNav() {
    navBoxRight.classList.add('navigation-box-right--active');
    main.classList.add('main--active-right');
    navBoxLeft.classList.remove('navigation-box-left--active');
    main.classList.remove('main--active-left');
    changeOnSignIn();
}

function removeRightNav() {
    navBoxRight.classList.remove('navigation-box-right--active');
    main.classList.remove('main--active-right');
}



hamburger.addEventListener('click', addLeftNav);
crossLeft.addEventListener('click', removeLeftNav);
loginIcon.addEventListener('click', addRightNav);
crossRight.addEventListener('click', removeRightNav);

// Sign in and Sign up Navigation

const signInBox = document.querySelector('.sign-in-form');
const signUpBox = document.querySelector('.sign-up-form');
const signIn = document.querySelector('.sign-container__text');
const signUp = document.querySelector('.sign-container__text--sign-up');
const textRightNav = document.querySelector('.navigation-box-right__text');

function changeOnSignUp() {
    signInBox.style.display = 'none';
    signUpBox.style.display = 'block';
    signIn.classList.remove('sign-container__text--active');
    signUp.classList.add('sign-container__text--active');
    textRightNav.textContent = 'Utwórz nowe konto';
}

signUp.addEventListener('click', changeOnSignUp);

function changeOnSignIn() {
    signUpBox.style.display = 'none';
    signInBox.style.display = 'block';
    signUp.classList.remove('sign-container__text--active');
    signIn.classList.add('sign-container__text--active');
    textRightNav.textContent = 'Zaloguj się do swojego konta';
}

signIn.addEventListener('click', changeOnSignIn);