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
const weekDays = document.querySelectorAll('.data-box__text--day');

const today = new Date();

const indexOfToday = today.getDay();

weekDays.forEach(day => {
    if (indexOfToday == day.id) {
        activeDay.textContent = day.textContent;
    }
});