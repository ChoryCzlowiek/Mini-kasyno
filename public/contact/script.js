// Arrow
const openArrow = document.querySelector('.data-box__icon--open');
const closeArrow = document.querySelector('.data-box__icon--close');
const weekList = document.querySelector('.data-box__list');

function openWeekList() {
    weekList.style.display = 'block';
    openArrow.style.display = 'none';
    closeArrow.style.display = 'inline-block';
}

function closeWeekList() {
    weekList.style.display = 'none';
    openArrow.style.display = 'inline-block';
    closeArrow.style.display = 'none';
}

openArrow.addEventListener('click', openWeekList);
closeArrow.addEventListener('click', closeWeekList);

// Change active day

const activeDay = document.querySelector('.data-box__text--today');
const weekHours = document.querySelectorAll('.data-box__text--hours');

const today = new Date();

const indexOfToday = today.getDay();

weekHours.forEach(hours => {
    if (indexOfToday == hours.id) {
        activeDay.textContent = 'Dzisiaj: ' + hours.textContent;
    }
});

// Clear inputs

function clearInputs() {
    const name = document.querySelector('.contact-form__input--name');
    const surname = document.querySelector('.contact-form__input--surname');
    const email = document.querySelector('.contact-form__input--email');
    const message = document.querySelector('.contact-form__input--message');

    name.value = '';
    surname.value = '';
    email.value = '';
    message.value = '';
}

// Send Message

function sendMessage(e) {
    e.preventDefault();

    const name = document.querySelector('.contact-form__input--name').value;
    const surname = document.querySelector('.contact-form__input--surname').value;
    const email = document.querySelector('.contact-form__input--email').value;
    const message = document.querySelector('.contact-form__input--message').value;

    let body = {};

    body.name = name;
    body.surname = surname;
    body.email = email;
    body.message = message;
    console.log(body);

    if (name && surname && email && message != '') {
        fetch('/api/message/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    clearInputs();
                    alert('Wiadomość została wysłana. Odpowiemy tak szybko jak umiemy')
                }
            })
            .catch(err => {
                console.log('Error: ' + err);
                alert('Upsss, coś poszło nie tak. Spróbuj jeszcze raz.');
            })
    } else alert('Nie uzupełniłeś wszystkich danych do wysłania wiadomości')
}