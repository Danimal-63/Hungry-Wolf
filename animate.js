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
context.fillRect(NEW_OBJECT.x,NEW_OBJECT.y,40,40);

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
    RenderSpaceship(context);
    RenderNewObject(context);
    RenderNewObject(context);

  } else {
    context.font = "30px Arial";
    context.fillText("Game Over      Level " + GAME.level, 135, 200);
  }
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(HandleNewObjectMovement);

window.requestAnimationFrame(runGame);
