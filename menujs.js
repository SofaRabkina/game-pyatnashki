const newGame = document.querySelector('.newGame');

newGame.onclick = function() {
    const name = document.getElementById('login').value;
    if (name === ''){
        alert('Введите имя');
        return;
    }
    else {
        localStorage.setItem('name', name);
        document.location.replace('game.html');
    }

}