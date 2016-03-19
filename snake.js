var color_option = ["yellow", "#87CEFA", "red", "#1fe30d", "#FF8C00", "#48D1CC", "#00008B"];
var canvas, ctx, width, height;
var info, shut;
var snake =[];
var unit = 10, len = 5;
var direction, score, clr_food, clr_snake, choice;
var level = 1, speed = 350, aim = 2, stage=2; 
var game;
function createSnake(){
	for(var i=len-1;i>=0;i--){
		snake.push({x:i, y:0});
	}
}
function createFood(){
	food = {
		x:Math.floor(Math.random()*(width-unit)/unit),
		y:Math.floor(Math.random()*(height-unit)/unit)
	};
	for(var j =0;j<len;j++){
		var a = snake[j];
		if(food.x==a.x && food.y==a.y){
			createFood();
		}
	}
	choice = Math.floor(Math.random()*6);//隨機顏色
	clr_food = color_option[choice];
}
function move(nx, ny){//去掉原本的尾巴 加上新的頭
	  snake.pop();
	  snake.unshift({x:nx, y:ny});
	}
function draw(x, y, paint){
	    ctx.fillStyle = paint;
		ctx.fillRect(x*unit, y*unit, unit, unit);
}
function write(){
	var text = document.getElementById('score');
	text.innerHTML = "Score: "+score+"<br>Level: "+level;
}
function control(e){
	
	e = e || window.event;
	key = e.keyCode;
		
	if(key=="37" && direction !="right") direction = "left";
	else if(key=="38" && direction !="down") direction = "up";
	else if(key=="39" && direction !="left") direction = "right";
	else if(key=="40" && direction !="up") direction = "down";
}
function collision(x, y, array){//判斷是某有跟自己的身體重疊
	for(var i=0;i<array.length;i++){
		if(array[i].x==x && array[i].y==y)
			return true;
		}
		return false;
}
function show(){//顯示原本藏起來的help提示
	var x =document.getElementById("info_text");
	x.style.visibility="visible";
}
function close(){//點選右上角的"X"即可關閉
	var x = document.getElementById("info_text");
	x.style.visibility = "hidden";
}
function output(){//遊戲的主程式
	
	//取蛇的頭 作為移動的依據
	 var nx = snake[0].x;
	 var ny = snake[0].y;
	  
	 if(window.addEventListener){
		window.addEventListener("keydown", control);
	}
	if(info){
		info.addEventListener("click", show);
	}
	if(shut){
		shut.addEventListener("click", close);
	}
	
	
	switch(direction){
	  case "right": nx++;
	               break;
	  case "left": nx--;
	               break;
	  case "up": ny--;
	               break;
	  case "down": ny++;
	               break;
	 }
	 
	 //判斷是否撞牆或自撞
	if(nx==-1 ||ny ==-1 || nx==width/unit || ny==height/unit||collision(nx, ny,snake)){
		var answer = confirm("Sorry you lose. Have another try?");
		if(answer){
			window.location.reload();
		}
		else{
			clearInterval(game);
		}
	}
	
	if(nx==food.x && ny ==food.y){
			
		snake.push({x:snake[len-1],y:snake[len-1]});
		clr_snake = clr_food;
		len++;
		score++;
		if(score==aim){
			level++;//晉級到level:2需要吃兩個 
			stage++;//晉級level:3要再吃三個 以此類推
			aim = aim+stage;//stage是晉級門檻
			speed = speed/2;
			//console.log(speed);
		}
		createFood();
	}
	move(nx, ny);//移動蛇
	  
	ctx.clearRect(0, 0, width, height);//清除前一次的畫面
		  
	for(var i=0;i<len;i++){
	   cell = snake[i];
	   draw(cell.x, cell.y, clr_snake);
	}
	draw(food.x, food.y, clr_food);
	write();

}

function SnakeGame(){
	canvas = document.getElementById("canvas");
	info = document.getElementById("help");
	shut = document.getElementById("close");
	ctx = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;
	
		
	function play(){
	    direction = "right";
		score = 0;
		createSnake();
		createFood();
		clr_snake = "#1fe30d";
		
		draw(food.x, food.y, clr_food);
		var cell;
		for(var i=0;i<len;i++){
		  cell = snake[i];
		  draw(cell.x, cell.y, clr_snake);
		}
		
		game = window.setInterval("output()", speed);
		
	}
	
		
	play();
}
window.onload = SnakeGame;