


function renderTowers(context) {
  var canvas = document.getElementById('canvas');
  handleTowerMovement();
  var top = new Image();  //Get images from file
  var bottom = new Image();
  top.src = 'fork.jpg';
  bottom.src = 'fork2.jpg';
  context.drawImage(top, TOWER1.x, 0, TOWER1.width, TOWER1.height);  //Render top tower 1
  context.drawImage(bottom, TOWER1.x, TOWER1.height + 100, TOWER1.width, GAME.canvas.height - (TOWER1.height+100)); //Render bottom tower 1
  context.drawImage(top, TOWER2.x, 0, TOWER2.width, TOWER2.height); //Render top tower 2
  context.drawImage(bottom, TOWER2.x, TOWER2.height + 100, TOWER2.width, GAME.canvas.height - (TOWER2.height+100));//Render bottom tower 2
  context.drawImage(top, TOWER3.x, 0, TOWER3.width, TOWER3.height);  //Render top tower 3
  context.drawImage(bottom, TOWER3.x, TOWER3.height + 100, TOWER3.width, GAME.canvas.height - (TOWER3.height + 100));//Render bottom tower 3
}


function handleTowerMovement() {
  if (TOWER1.x < -1 * TOWER1.width){  //If towers go off of the screen, wrap around and give new random hole position
    TOWER1.x = GAME.canvas.width;
    TOWER1.height = Math.random() * (GAME.canvas.height-100);
  };
  if (TOWER2.x < -1 * TOWER2.width){
    TOWER2.x = GAME.canvas.width;
    TOWER2.height = Math.random() * (GAME.canvas.height-100);
  };
  if (TOWER3.x < -1 * TOWER3.width){
    TOWER3.x = GAME.canvas.width;
    TOWER3.height = Math.random() * (GAME.canvas.height-100);
  };
  TOWER1.x -= 2;//Move towers
  TOWER2.x -= 2;
  TOWER3.x -= 2;
}

/**
 *  handleShipAnimation moves the ship based on its direction and
 *    keyboard control
 *
 */
function handleShipAnimation() {
  if (CONTROLS.ship.forward) {
    var radians = (Math.PI / 180) * SPACE_SHIP.rotation,
        cos = Math.cos(radians),
        sin = Math.sin(radians);
    SPACE_SHIP.x += SPACE_SHIP.speed * sin;
    SPACE_SHIP.y +=  SPACE_SHIP.speed * cos;
  }
  if (CONTROLS.ship.backward) {
    var radians = (Math.PI / 180) * SPACE_SHIP.rotation,
        cos = Math.cos(radians),
        sin = Math.sin(radians);
    SPACE_SHIP.x -= SPACE_SHIP.speed * sin;
    SPACE_SHIP.y -=  SPACE_SHIP.speed * cos;
  }
  if (CONTROLS.ship.rotateClockwise) {
    SPACE_SHIP.rotation -= 4;
  }
  if (CONTROLS.ship.rotateCounterClockwise) {
    SPACE_SHIP.rotation += 4;
  }

  // Check if asteroid is leaving the boundary, if so, switch sides
  if (SPACE_SHIP.x > GAME.canvas.width) {
    SPACE_SHIP.x = 0;
  } else if (SPACE_SHIP.x < 0) {
    SPACE_SHIP.x = 600;
  } else if (SPACE_SHIP.y > GAME.canvas.height) {
    SPACE_SHIP.y = 0;
  } else if (SPACE_SHIP.y < 0) {
    SPACE_SHIP.y = 300;
  }
}
//creats and object of size hieght 20 and length 20 and NEW_OBJECT.x,NEW_OBJECT.y,20,20
function RenderNewObject(context) {
  var wolf = new Image();
  wolf.src = 'wolf.jpg';
context.drawImage(wolf, NEW_OBJECT.x,NEW_OBJECT.y,60,40);

  context.fillRect(OBSTACLE.x, OBSTACLE.y,20, 100);
  context.fillRect (OBSTACLE_BOTTOM.x, OBSTACLE_BOTTOM.y, 20,100);

}
// moves the object in a diagonal resetting when it hits the border at the top left corner
function HandleNewObjectMovement() {
  document.body.onkeyup = function(e){
    if(e.keyCode == 38){
        NEW_OBJECT.y-=10;
    }
}
document.body.onkeydown = function(e){
  if(e.keyCode == 40){
      NEW_OBJECT.y+=10;
  }
}


  OBSTACLE.x-=1;
  OBSTACLE_BOTTOM.x-=1;
  if (NEW_OBJECT.x>GAME.canvas.width) {
    OBSTACLE.x=0;
    OBSTACLE_BOTTOM.x=0;
  } else if (NEW_OBJECT.y>GAME.canvas.height) {
    OBSTACLE.y=0;
    OBSTACLE_BOTTOM.y=0;
  }
}


function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  if (GAME.started) {

    // 1 - Reposition the objects
    handleShipAnimation();
    HandleNewObjectMovement();

    // 2 - Clear the CANVAS
    context.clearRect(0, 0, 600, 300);

    // 3 - Draw new items
    renderTowers(context);
    RenderNewObject(context);

  } else {
    context.font = "30px Arial";
    context.fillText("Game Over      Level " + GAME.level, 135, 200);
  }
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(HandleNewObjectMovement);

window.requestAnimationFrame(runGame);
