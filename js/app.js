var score = 0;
document.getElementById('playersScore').innerHTML = score;

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.x = x;
	this.y = y;
	this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += dt * this.speed;
	
	//If enemy moves off screen, calls reset function to reset enemy
	if(this.x > 400){
		this.reset();
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Function to reset the enemy when moves off screen
Enemy.prototype.reset = function(){
	this.x = -50;
	this.speed = Math.floor(Math.random() * 500);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Player function to create and control the player

var Player = function(x,y) {
	
	this.x = x;
	this.y = y;
	this.speed = 50;
	this.sprite = 'images/char-boy.png';
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//updates/moves player across the canvas
Player.prototype.update = function(dt) {
	//prevent player from moving outside canvas
    if (this.y > 380) {
        this.y = 380;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
	
	//player reaches water and wins
	if (this.y < 0) {
		score += 1;
		document.getElementById('playersScore').innerHTML = score;
        player.reset();

    }
	 
	 //if player collides with enemy, game lost; reset the player
	 allEnemies.forEach(function(enemy) {
		if(enemy.x < player.x + 50 && enemy.x + 50 > player.x 
		   && enemy.y < player.y + 25 && 25 + enemy.y > player.y){
			 score = 0;
			 document.getElementById('playersScore').innerHTML = score;
			 player.reset();
		 }
	 });
	 
};


//function to handle the user input to move player up, down, left and right
Player.prototype.handleInput = function(userInput) {
	switch (userInput) {
		case 'left':
			this.x -= this.speed + 50;
			break;
		case 'up':
			this.y -= this.speed + 50;
			break;
		case 'right':
			this.x += this.speed + 50;
			break;
		case 'down':
			this.y += this.speed + 50;
			break;
	}
};

//resets player back to beginning. 
Player.prototype.reset = function() {
	 this.x = 200;
     this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
//array to contain starting y position of enemy
var enemyStart = [50, 150, 200];
//calls player function to create a new player and sets their starting position
var player = new Player(200, 400);
var enemy;

//Loop to call the enemy funciton for each enemy; passes in starting x, y and speed

enemyStart.forEach(function(startY) {
    enemy = new Enemy(0, startY, Math.floor(Math.random() * 500));
    allEnemies.push(enemy);
});




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
