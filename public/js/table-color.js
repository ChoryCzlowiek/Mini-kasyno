// Change Table Color

const table = document.querySelector('.background__table');
const circles = document.querySelectorAll('.circles-container__circle');

function showAndHideCircles() {
    circles.forEach(circle => {
        const color = circle.getAttribute('id');
        circle.classList.toggle(`circles-container__circle--${color}-active`);
    });
}

circles[3].addEventListener('click', showAndHideCircles);

circles.forEach(circle => {
    const color = circle.getAttribute('id');

    circle.addEventListener('click', () => {
        if (color != null) {
            table.style.backgroundImage = `url(../images/${color}-table.png)`;
        }
    })
})