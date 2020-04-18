// Ranking of most games

fetch('/api/user/mostgames')
    .then(res => res.json())
    .then(res => {
        let counter = 0;
        res.forEach(user => {
            const row = document.createElement('tr');
            const place = document.createElement('td');
            const userLogin = document.createElement('td');
            const numGames = document.createElement('td');

            row.classList.add('ranking__row');
            place.classList.add('ranking__item');
            userLogin.classList.add('ranking__item');
            numGames.classList.add('ranking__item');
            if (counter == 0) {
                row.classList.add('ranking__row--active');
                place.classList.add('ranking__item--active');
                userLogin.classList.add('ranking__item--active');
                numGames.classList.add('ranking__item--active');
            }

            place.innerHTML = counter + 1;
            userLogin.innerHTML = user.login;
            numGames.innerHTML = user.nOfGames;

            document.getElementById('games').appendChild(row);
            row.appendChild(place);
            row.appendChild(userLogin);
            row.appendChild(numGames);

            counter++;
        })
    });

// Ranking of most wins

fetch('/api/user/mostwins')
    .then(res => res.json())
    .then(res => {
        let counter = 0;
        res.forEach(user => {
            const row = document.createElement('tr');
            const place = document.createElement('td');
            const userLogin = document.createElement('td');
            const numWins = document.createElement('td');

            row.classList.add('ranking__row');
            place.classList.add('ranking__item');
            userLogin.classList.add('ranking__item');
            numWins.classList.add('ranking__item');
            if (counter == 0) {
                row.classList.add('ranking__row--active');
                place.classList.add('ranking__item--active');
                userLogin.classList.add('ranking__item--active');
                numWins.classList.add('ranking__item--active');
            }

            place.innerHTML = counter + 1;
            userLogin.innerHTML = user.login;
            numWins.innerHTML = user.nOfWins;

            document.getElementById('wins').appendChild(row);
            row.appendChild(place);
            row.appendChild(userLogin);
            row.appendChild(numWins);

            counter++;
        })
    });

// Ranking of most draws

fetch('/api/user/mostdraws')
    .then(res => res.json())
    .then(res => {
        let counter = 0;
        res.forEach(user => {
            const row = document.createElement('tr');
            const place = document.createElement('td');
            const userLogin = document.createElement('td');
            const numDraws = document.createElement('td');

            row.classList.add('ranking__row');
            place.classList.add('ranking__item');
            userLogin.classList.add('ranking__item');
            numDraws.classList.add('ranking__item');
            if (counter == 0) {
                row.classList.add('ranking__row--active');
                place.classList.add('ranking__item--active');
                userLogin.classList.add('ranking__item--active');
                numDraws.classList.add('ranking__item--active');
            }

            place.innerHTML = counter + 1;
            userLogin.innerHTML = user.login;
            numDraws.innerHTML = user.nOfDraws;

            document.getElementById('draws').appendChild(row);
            row.appendChild(place);
            row.appendChild(userLogin);
            row.appendChild(numDraws);

            counter++;
        })
    });

// Ranking of most losses

fetch('/api/user/mostlosses')
    .then(res => res.json())
    .then(res => {
        let counter = 0;
        res.forEach(user => {
            const row = document.createElement('tr');
            const place = document.createElement('td');
            const userLogin = document.createElement('td');
            const numLosses = document.createElement('td');

            row.classList.add('ranking__row');
            place.classList.add('ranking__item');
            userLogin.classList.add('ranking__item');
            numLosses.classList.add('ranking__item');
            if (counter == 0) {
                row.classList.add('ranking__row--active');
                place.classList.add('ranking__item--active');
                userLogin.classList.add('ranking__item--active');
                numLosses.classList.add('ranking__item--active');
            }

            place.innerHTML = counter + 1;
            userLogin.innerHTML = user.login;
            numLosses.innerHTML = user.nOfLosses;

            document.getElementById('losses').appendChild(row);
            row.appendChild(place);
            row.appendChild(userLogin);
            row.appendChild(numLosses);

            counter++;
        })
    });