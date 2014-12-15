var enemyHor = [60, 140, 220, 300]; //row array for enemies to be assigned to without touching hero start block or water
var startPositions = [-150, -140, -130, -120, -100]; //starts enemies at different neg horizontal positions so they appear on screen at different times due to starting at different positions
var enemyMove = [100, 150, 180, 200, 250, 350];  //different assigned speeds at which the bugs can move
var resetPlayerPos = [1, 100, 300, 400];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //same functions to ramdomize enemy start positions and movements
    this.x = startPositions[Math.floor(Math.random()*3)];
    this.y = enemyHor[Math.floor(Math.random()*4)];
    this.speed = enemyMove[Math.floor(Math.random()*5)];
}

/*decided not to use this when setting collisionCheck, but didn't want to delete it since it works and could be used later down the road
Enemy.prototype.startOverBug = function() {
    this.x = startPositions[Math.floor(Math.random()*4)];
}*/

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
      if (this.x > 480) {
        this.x = startPositions[Math.floor(Math.random()*4)];
        this.y = enemyHor[Math.floor(Math.random()*4)];
        this.speed = enemyMove[Math.floor(Math.random()*5)];
      }
      var collisionCheck = function() {
        if(player.x <= (enemyOne.x + 40) && enemyOne.x <= (player.x + 50) && player.y <= (enemyOne.y + 40) && enemyOne.y <= (player.y + 44)) {
        player.reset();
      }
        else if(player.x <= (enemyTwo.x + 40) && enemyTwo.x <= (player.x + 50) && player.y <= (enemyTwo.y + 40) && enemyTwo.y <= (player.y + 44)) {
        player.reset();
      }
        else if(player.x <= (enemyThree.x + 40) && enemyThree.x <= (player.x + 50) && player.y <= (enemyThree.y + 40) && enemyThree.y <= (player.y + 44)) {
        player.reset();
      }
        else if(player.x <= (enemyFour.x + 40) && enemyFour.x <= (player.x + 50) && player.y <= (enemyFour.y + 40) && enemyFour.y <= (player.y + 44)) {
        player.reset();
      }
      //using 44 for player.y based on 88 pixel measurement of supposed 'box' around hero
    }
    collisionCheck();
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 430;   
}

Player.prototype.update = function(dt) {
    this.x * (dt);
    this.y * (dt);
}


Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//When the player strikes a bug, they are reset to a random block at the bottom that is not the middle block where they started
Player.prototype.reset = function() {
  this.x = resetPlayerPos[Math.floor(Math.random()*4)];;
  this.y = 430;
}

//functions to handle movement of player based on keystroke

Player.prototype.handleInput = function(playMove) {
  if (playMove == 'left' && this.x > 0) {
    this.x -= 100;
    }
  else if (playMove == 'right' && this.x < 400) {
    this.x += 100;
  }
  else if (playMove == 'up' &&  this.y > 30) {
    this.y -= 100;
  }
  else if (playMove == 'down' && this.y < 430) {
    this.y += 100;
  }
}

// Now instantiate your obj.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var enemyOne = new Enemy();
var enemyTwo = new Enemy();
var enemyThree = new Enemy();
var enemyFour = new Enemy();
var allEnemies = [enemyOne, enemyTwo, enemyThree, enemyFour];
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
