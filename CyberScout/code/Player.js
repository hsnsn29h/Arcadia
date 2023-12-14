// Class representing the player character
class Player {
  // Constructor to initialize the player's position and speed
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
  }

  // Getter method to return the type of the player
  get type() {
    return "player";
  }

  // Static method to create a new player at a specified position
  static create(pos) {
    // Initialize the player with an adjusted position and zero speed
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
  }
}

// Set the size of the player character using a prototype property
Player.prototype.size = new Vec(0.9, 1.5);

// Set constants for player movement
var playerXSpeed = 7;
var gravity = 30;
var jumpSpeed = 14;

// Update method to handle player movement and physics
Player.prototype.update = function (time, state, keys) {
  // Check for movement keys
  const rightKey = keys.ArrowRight || keys.d;
  const leftKey = keys.ArrowLeft || keys.a;
  const upKey = keys.ArrowUp || keys.w;

  // Initialize horizontal speed
  let xSpeed = 0;
  // Adjust speed based on pressed keys
  if (leftKey) {
    xSpeed -= playerXSpeed;
  }
  if (rightKey) {
    xSpeed += playerXSpeed;
  }

  // Calculate new X position
  let pos = this.pos;
  let movedX = pos.plus(new Vec(xSpeed * time, 0));

  // Check for collisions with walls in the X direction
  if (!state.level.touches(movedX, this.size, "wall")) {
    pos = movedX;
  }

  // Calculate new Y speed based on gravity
  let ySpeed = this.speed.y + time * gravity;

  // Calculate new Y position
  let movedY = pos.plus(new Vec(0, ySpeed * time));

  // Check for collisions with walls in the Y direction
  if (!state.level.touches(movedY, this.size, "wall")) {
    pos = movedY;
  } else if (upKey && ySpeed > 0) {
    // If the player is pressing the jump key, apply upward speed
    ySpeed = -jumpSpeed;
  } else {
    // If there is a collision and not jumping, set Y speed to 0
    ySpeed = 0;
  }

  // Create and return a new player object with updated position and speed
  return new Player(pos, new Vec(xSpeed, ySpeed));
};
