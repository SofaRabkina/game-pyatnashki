var startbutton = document.querySelector(".newGame");//Выбрали кнопку

window.addEventListener("load", startGame);

startbutton.onclick = function(){//При нажатии кнопки запускаем функцию
	
	startGame();
	//alert('ОАОАОАОАОА');
};

function startGame(){
	const field = document.querySelector(".field");//Выбрали поле
	let time = performance.now();//старт отсчета времени
	field.innerHTML = "";//Опустошаем поле
	field.innerHTML = "<button></button>".repeat(16);//Создаем 16 кнопок
	const buttons = [...field.children];//Создали массив из кнопок
	let nums = [...Array(17).keys()].slice(1, 17);//Массив, в котором хранятся значения от 1 до 16
	nums[17] = 0;//Последним будет нуль

	size = 4;
	let space_x, space_y;//координаты пустой ячейки
	var map = new Array(4);

	for (var i = 0; i < map.length; i++) {
		map[i] = new Array(4);
	} 

	start();
	//console.log(map);
	for (i=0; i<50; i++){
		shift_random();
	}
	refresh();
	console.log(map);

	field.addEventListener("click", (event) => {
		if (event.target.tagName !== "BUTTON"){
			return;
			console.log("RETURN");
		}
		const position = buttons.indexOf(event.target);
		shift(position);
		refresh();
		if (check()){
			win();
		}
	});


	function start()
	{
		for (x = 0; x < size; x++)
			for (y = 0; y < size; y++)
				map[x][y] = cord_to_pos(x, y)+1;
		space_x = size - 1;
		space_y = size - 1;
		map[space_x][space_y] = 0;
	}

	//при нажатии премещяем номерок
	function shift (pos)
	{
		x = Math.floor((pos) / size);
		y = (pos) % size;
		if (Math.abs(space_x - x) + Math.abs(space_y-y) != 1)
			return;
		map[space_x][space_y] = map[x][y];
		map[x][y] = 0;
		space_x = x;
		space_y = y;

	}

	//перемешивает пятнашки
	function shift_random()
	{
		a = Math.floor(Math.random() * Math.floor(4));
		x = space_x;
		y = space_y;
		switch (a)
		{
			case 0: x--; break;//влево
			case 1: x++; break;//вправо
			case 2: y--; break;//вверх
			case 3: y++; break;//вниз
		}
		shift(cord_to_pos(x, y));
	}

	function check()
	{
		if (!(space_x == size - 1 && space_y == size - 1)) {
						console.log('first false');
						return false;
					}
		for (x = 0; x < size; x++)
			for (y = 0; y < size; y++)
				if (!(x === size - 1 && y === size - 1)) 
					if (map[x][y] !== cord_to_pos(x, y)+1) {
						console.log('x='+x+'y='+y+' ; ' + map[x][y] + '\ncord_to_pos(x,y)=' + cord_to_pos(x, y));
						return false;
					}
		console.log('true');
		return true;
	}

	//по номеру позиции возвращает само число из матрицы
	function get_number(pos)
	{
		x = Math.floor((pos) / size);
		y = (pos) % size;
		//console.log('x: '+x+' y: '+y);
		//console.log(map[x][y]);
		if (x < 0 || x > size) return 0;
		if (y < 0 || y > size) return 0;
		return map[x][y];
	}

	//x - номер строки
	//y - номер столбца
	//преобразуцет координаты в позицию
	function cord_to_pos (x, y)
	{
		if (x < 0) x = 0;
		if (x > size - 1) x = size - 1;
		if (y < 0) y = 0;
		if (y > size - 1) y = size - 1;
		return x * size + y;//мб наоборот x и y
	}
	
	function refresh(){//Функция для обновления текста кнопок
		for (i = 0; i < 16; i++){
			if (get_number(i)===0){
				buttons[i].innerHTML = '';
				//console.log(get_number[i]);
			}
			else {
				buttons[i].innerHTML = get_number(i);
			}
		}
		
	}

	function win() {
		time = Math.floor(performance.now() - time) / 1000;
		const name = localStorage.getItem('name');
		if( window.localStorage.getItem("table")){
			const score = window.localStorage.getItem("table");
			const jsonScore = JSON.parse(score);
			jsonScore[name] = time;
			window.localStorage.setItem("table", JSON.stringify(jsonScore));
        } else {
			const jsonScore = {};
			jsonScore[name] = time;
			window.localStorage.setItem("table", JSON.stringify(jsonScore));
		}
		document.location.replace('record.html');

	}
}

