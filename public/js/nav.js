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

// Clear forms inputs

function clearLoginAndRegisterInputs() {
    document.getElementById('register_login').value = '';
    document.getElementById('register_password').value = '';
    document.getElementById('name').value = '';
    document.getElementById('surname').value = '';
    document.getElementById('dateOfBirth').value = '';
    document.getElementById('email').value = '';
    document.getElementById('login_login').value = '';
    document.getElementById('login_password').value = '';
}

//  Register function

const logOutBtn = document.querySelector('.user-stats__button--log');
const userStatsBox = document.querySelector('.user-stats');
const navForms = document.querySelector('.navigation-box-right__forms');

function register(e) {
    e.preventDefault();
    let body = {};
    body.login = document.getElementById('register_login').value;
    body.password = document.getElementById('register_password').value;
    body.name = document.getElementById('name').value;
    body.surname = document.getElementById('surname').value;
    body.dateOfBirth = document.getElementById('dateOfBirth').value;
    body.email = document.getElementById('email').value;


    if (validateRegister()) {
        fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(res => {
                if (res.errors) {
                    alert(`Login ${body.login} jest już zajęty`)
                } else {
                    clearLoginAndRegisterInputs();
                    changeOnSignIn();
                    alert('Udało Ci się zarejestrować!')
                }
            })
    } else {
        alert('Nie wprowadziłeś wszystkich potrzebnych danych!')
    }

    function validateRegister() {
        if (body.login && body.password && body.name && body.surname != '') {
            return true
        } else {
            return false;
        };
    }
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
                clearLoginAndRegisterInputs();
                updateLoggedInView(res);
            } else {
                alert('Nieprawidłowy login lub hasło');
            }
        });
}

function updateLoggedInView(user) {
    userStatsBox.style.display = 'block';
    navForms.style.display = 'none';
    localStorage.setItem('user', JSON.stringify(user));
    setStatistics(user);
    document.getElementById('user-icon').className = "fas fa-user navbar__icon navbar__icon--login"
}

function updateLoggedOutView() {
    userStatsBox.style.display = 'none';
    navForms.style.display = 'block';
    document.getElementById('user-icon').className = "far fa-user navbar__icon navbar__icon--login"
}

function setStatistics() {
    const user = JSON.parse(localStorage.getItem('user'));
    // JSON.parse(string) = string => obj / JSON.stringify(obj) = obj => stg
    document.getElementById('balance').innerHTML = user.balance || 0;
    document.getElementById('nOfGames').innerHTML = user.nOfGames || 0;
    document.getElementById('nOfWins').innerHTML = user.nOfWins || 0;
    document.getElementById('nOfDraws').innerHTML = user.nOfDraws || 0;
    document.getElementById('nOfLosses').innerHTML = user.nOfLosses || 0;
}


// logout function

logOutBtn.addEventListener('click', function () {
    let body = {};
    localStorage.removeItem('user');
    fetch('/api/user/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    updateLoggedOutView();
})

// check loggin user

function checkIfLogin() {
    fetch('/api/me')
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                console.error(res.error);
            } else {
                updateLoggedInView(res)
            }
        })
        .catch(err => {
            console.error('ERROR = ', err);
        });
}

checkIfLogin();

// Reset saldo

document.querySelector('.user-stats__log-button--reset').addEventListener('click', () => {
    let saldo = document.getElementById('balance');
    body = {};

    if (Math.floor(saldo.innerHTML) === 0) {
        const user = JSON.parse(localStorage.getItem('user'));

        saldo.innerHTML = 1000;

        body.login = user.login;
        body.balance = Math.floor(saldo.innerHTML);

        fetch('/api/user/resetbalance?id=', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    } else alert('Nie możesz zresetować swojego salda, ponieważ nie przegrałeś wszystkich pieniędzy.');
});