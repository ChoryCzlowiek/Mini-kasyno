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