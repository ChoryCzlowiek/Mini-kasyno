// DOM Refenrences

const editLogin = document.querySelector('.data-container__data--login');
const editPassword = document.querySelector('.data-container__data--password');
const editName = document.querySelector('.data-container__data--name');
const editSurname = document.querySelector('.data-container__data--surname');
const editEmail = document.querySelector('.data-container__data--email');
const editDateOfBirth = document.querySelector('.data-container__data--birth');

// Show profile datas

function showUserDatas() {
    fetch('/api/me')
        .then(res => res.json())
        .then(res => {
            editLogin.innerHTML = res.login;
            editPassword.innerHTML = '*****';
            editName.innerHTML = res.name;
            editSurname.innerHTML = res.surname;
            editEmail.innerHTML = res.email || 'brak';
            editDateOfBirth.innerHTML = res.dateOfBirth || 'brak';
        })
}

showUserDatas();

// Show user pop-up

const openPopUpBtns = document.querySelectorAll('.data-container__button');

openPopUpBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const editPopUp = document.querySelector('.edit-popup');
        const main = document.querySelector('.data-container');

        editPopUp.style.display = 'block';
        main.style.filter = 'blur(5px)';
        main.style.pointerEvents = 'none';

        document.querySelector('.edit-popup__name').innerHTML = btn.id.slice(5);

        document.querySelector('.edit-popup__button').addEventListener('click', () => {
            const input = document.querySelector('.edit-popup__data');
            const body = {};

            if (input.value === '') alert('Nie wprowadzono danych!')
            else {
                const data = btn.id.slice(5);
                const user = JSON.parse(localStorage.getItem('user'));

                switch (data) {
                    case 'login':
                        body.login = input.value;
                        break;
                    case 'password':
                        body.password = input.value;
                        break;
                    case 'name':
                        body.name = input.value;
                        break;
                    case 'surname':
                        body.surname = input.value;
                        break;
                    case 'email':
                        body.email = input.value;
                        break;
                    case 'dateOfBirth':
                        body.dateOfBirth = input.value;
                        break;
                };

                fetch(`/api/user/changedata?id=${user._id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })

                editPopUp.style.display = 'none';
                main.style.filter = 'blur(0)';
                main.style.pointerEvents = 'auto';
            };

            showUserDatas();
        })
    })
});