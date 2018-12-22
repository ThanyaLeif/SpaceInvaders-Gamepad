var ship;
var flowers = [];
var drops = [];

function setup(){
	createCanvas(600, 400);
	ship = new Ship();
	for(var i=0; i<6; i++){
		flowers[i] = new Flower(i*80 + 80, 30);
	}
}

function draw(){
	background(51);
	ship.show();
	ship.move(0);

	for(var i=0; i<drops.length; i++){
		drops[i].show();
		drops[i].move();
		for(var j=0; j<flowers.length; j++){
			if(drops[i].hits(flowers[j])){
				flowers[j].grow();
				drops[i].evaporate();
			}
		}	
	}

	var edge = false;
	for(var i=0; i<flowers.length; i++){
		flowers[i].show();
		flowers[i].move();

		if(flowers[i].x + flowers[i].r > width || flowers[i].x - flowers[i].r < 0){
			edge = true;
		}

	}
	if(edge){
		for(var i=0; i<flowers.length; i++){
			flowers[i].shiftDown();
		}
	}

	for(var i=0; i<drops.length; i++){
		if(drops[i].toDelete){
			drops.splice(i, 1);
		}
	}
}

function keyReleased(){
	if(key != ' '){
		ship.setDir(0);
	}
}

function keyPressed(){
	if(key == ' '){
		var drop = new Drop(ship.x + 10, height - 20);
		drops.push(drop);
	}
	if(keyCode == RIGHT_ARROW){
		ship.setDir(1);
	}
	if(keyCode == LEFT_ARROW){
		ship.setDir(-1);
	}
}

var gp = navigator.getGamepads()[0];
var axes = document.querySelector("#axes");
console.log(gp);

function gamePad(){
	gp = navigator.getGamepads()[0];
	var btn = gp.buttons;

	console.log(Math.ceil(gp.axes[0]));

	if(Math.ceil(gp.axes[0])==1){
		ship.setDir(1);
	}
	else if(Math.ceil(gp.axes[0])==-1){
		ship.setDir(-1);
	}
	else{
		ship.setDir(0);
	}
	if(btn[0].pressed || btn[2].pressed){
		var drop = new Drop(ship.x + 10, height - 20);
		drops.push(drop);
	}
	/*if(btn[1].pressed){
		ship.setDir(-1);
	}
	else{
		ship.setDir(0);
	}*/
	//console.log(gp);
	//console.log(Math.floor(gp.axes[4]));
}

setInterval("gamePad()", 50);