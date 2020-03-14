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
  body.login = document.getElementById('register_login').value;
  body.password = document.getElementById('register_password').value;
  body.name = document.getElementById('name').value;
  body.surname = document.getElementById('surname').value;
  body.dateOfBirth = document.getElementById('dateOfBirth').value;
  body.email = document.getElementById('email').value;

  fetch('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(res => alert('Success'))
}

function login(e) {
  e.preventDefault();
  let body = {};
  body.login = document.getElementById('login_login').value;
  body.password = document.getElementById('login_password').value;

  fetch('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      fetch('/protected-path');
    }
    else {
      alert('Invalid login or password');
    }
  });
}
