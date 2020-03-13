// Curtain

const curtain = document.querySelector('.curtain');

function disableCurtain() {
    curtain.style.display = 'none';
}

setTimeout(disableCurtain, 6500);

// Sign in and Sign up Buttons

const signUpBtn = document.querySelector('.header__button--sign-up');
const signInBtn = document.querySelector('.header__button--sign-in');

function goToSignUpBox() {
    addRightNav();
    changeOnSignUp();
}

signUpBtn.addEventListener('click', goToSignUpBox);

function goToSignInBox() {
    addRightNav();
    changeOnSignIn();
}

signInBtn.addEventListener('click', goToSignInBox);

function register(e) {
  e.preventDefault();
  let body = {};
  body.login = document.getElementById('login').value;
  body.password = document.getElementById('password').value;
  body.name = document.getElementById('name').value;
  body.surname = document.getElementById('surname').value;
  body.dateOfBirth = document.getElementById('dateOfBirth').value;
  body.email = document.getElementById('email').value;
  console.log('register', body);
}

function login(e) {
  e.preventDefault();
  let body = {};
  body.login = document.getElementById('login').value;
  body.password = document.getElementById('password').value;
  console.log('login', body);
}
